package usecase

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"github.com/redis/go-redis/v9"

	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/pkg/report"
	"github.com/chaitin/MonkeyCode/backend/pkg/version"
)

type ReportUsecase struct {
	repo     domain.ReportRepo
	logger   *slog.Logger
	reporter *report.Reporter
	redis    *redis.Client
}

func NewReportUsecase(
	repo domain.ReportRepo,
	logger *slog.Logger,
	reporter *report.Reporter,
	redis *redis.Client,
) domain.ReportUsecase {
	r := &ReportUsecase{
		repo:     repo,
		logger:   logger,
		reporter: reporter,
		redis:    redis,
	}
	go r.Report()
	return r
}

func (r *ReportUsecase) Report() {
	ticker := time.NewTicker(1 * time.Hour)
	defer ticker.Stop()
	report := func() {
		ok, err := r.shouldReport()
		if err != nil {
			r.logger.With("error", err).Error("check report time failed")
		}
		if ok {
			if err := r.innerReport(); err != nil {
				r.logger.With("error", err).Error("report failed")
			} else {
				if err := r.recordReportTime(); err != nil {
					r.logger.With("error", err).Error("record report time failed")
				}
			}
		}
	}
	report()

	for range ticker.C {
		report()
	}
}

func (r *ReportUsecase) shouldReport() (bool, error) {
	ctx := context.Background()
	key := "monkeycode:last_report_time"

	ts, err := r.redis.Get(ctx, key).Result()
	if err != nil {
		if err == redis.Nil {
			return true, nil
		}
		return false, fmt.Errorf("get last report time from redis failed: %w", err)
	}

	t, err := time.Parse(time.RFC3339, ts)
	if err != nil {
		return false, fmt.Errorf("parse last report time failed: %w", err)
	}

	return time.Since(t) >= 24*time.Hour, nil
}

func (r *ReportUsecase) recordReportTime() error {
	ctx := context.Background()
	key := "monkeycode:last_report_time"
	now := time.Now().Format(time.RFC3339)

	err := r.redis.Set(ctx, key, now, 48*time.Hour).Err()
	if err != nil {
		return fmt.Errorf("set last report time to redis failed: %w", err)
	}
	return nil
}

func (r *ReportUsecase) innerReport() error {
	admins, err := r.repo.GetAdminCount(context.Background())
	if err != nil {
		return fmt.Errorf("get admin count failed: %w", err)
	}
	models, err := r.repo.GetCurrentModels(context.Background())
	if err != nil {
		return fmt.Errorf("get current models failed: %w", err)
	}
	stats, err := r.repo.GetLast24HoursStats(context.Background())
	if err != nil {
		return fmt.Errorf("get last 24 hours stats failed: %w", err)
	}
	members, err := r.repo.GetMemberCount(context.Background())
	if err != nil {
		return fmt.Errorf("get member count failed: %w", err)
	}

	data := domain.ReportData{
		Timestamp:     time.Now().Format(time.RFC3339),
		Version:       version.Version,
		MachineID:     r.reporter.GetMachineID(),
		AdminCount:    admins,
		MemberCount:   members,
		Last24Hours:   stats,
		CurrentModels: models,
	}

	if err := r.reporter.Report("monkeycode-metrics", data); err != nil {
		return fmt.Errorf("report failed: %w", err)
	}

	r.logger.With("data", data).Debug("上报数据成功")
	return nil
}
