package repo

import (
	"context"
	"time"

	"github.com/chaitin/MonkeyCode/backend/consts"
	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/db/task"
	"github.com/chaitin/MonkeyCode/backend/db/user"
	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/pkg/cvt"
)

type ReportRepo struct {
	db *db.Client
}

func NewReportRepo(db *db.Client) domain.ReportRepo {
	r := &ReportRepo{db: db}
	return r
}

// GetAdminCount implements domain.ReportRepo.
func (r *ReportRepo) GetAdminCount(ctx context.Context) (int64, error) {
	count, err := r.db.Admin.Query().Count(ctx)
	return int64(count), err
}

// GetCurrentModels implements domain.ReportRepo.
func (r *ReportRepo) GetCurrentModels(ctx context.Context) ([]*domain.ReportModelUsage, error) {
	now := time.Now()
	models, err := r.db.Model.Query().
		WithTasks(func(tq *db.TaskQuery) {
			tq.Where(task.CreatedAtGTE(now.Add(-24 * time.Hour)))
		}).
		All(ctx)
	if err != nil {
		return nil, err
	}

	return cvt.Iter(models, func(_ int, m *db.Model) *domain.ReportModelUsage {
		return &domain.ReportModelUsage{
			ModelID:   m.ID.String(),
			ModelName: m.ModelName,
			ModelType: m.ModelType,
		}
	}), nil
}

// GetLast24HoursStats implements domain.ReportRepo.
func (r *ReportRepo) GetLast24HoursStats(ctx context.Context) (*domain.ActivityStats, error) {
	now := time.Now()
	last24Hours := now.Add(-24 * time.Hour)

	// 获取最近24小时的任务统计
	tasks, err := r.db.Task.Query().
		Where(task.CreatedAtGTE(last24Hours)).
		All(ctx)
	if err != nil {
		return nil, err
	}

	stats := &domain.ActivityStats{}
	var completionCount, acceptedCount, totalCodeLines int64

	for _, t := range tasks {
		switch t.ModelType {
		case consts.ModelTypeLLM:
			stats.ChatCount++
		case consts.ModelTypeCoder:
			completionCount++
			if t.IsAccept {
				acceptedCount++
			}
		}
		totalCodeLines += t.CodeLines
	}

	stats.CompletionCount = completionCount
	stats.AcceptedCount = acceptedCount
	stats.TotalCodeLines = totalCodeLines

	// 计算采纳率
	if completionCount > 0 {
		stats.AcceptanceRate = float64(acceptedCount) / float64(completionCount)
	}

	return stats, nil
}

// GetMemberCount implements domain.ReportRepo.
func (r *ReportRepo) GetMemberCount(ctx context.Context) (int64, error) {
	count, err := r.db.User.Query().
		Where(user.Status(consts.UserStatusActive)).
		Count(ctx)
	return int64(count), err
}
