package usecase

import (
	"context"
	"slices"

	"github.com/chaitin/MonkeyCode/backend/domain"
)

type DashboardUsecase struct {
	repo domain.DashboardRepo
}

func NewDashboardUsecase(repo domain.DashboardRepo) domain.DashboardUsecase {
	return &DashboardUsecase{
		repo: repo,
	}
}

func (u *DashboardUsecase) Statistics(ctx context.Context) (*domain.Statistics, error) {
	return u.repo.Statistics(ctx)
}

func (u *DashboardUsecase) CategoryStat(ctx context.Context, req domain.StatisticsFilter) (*domain.CategoryStat, error) {
	return u.repo.CategoryStat(ctx, req)
}

func (u *DashboardUsecase) TimeStat(ctx context.Context, req domain.StatisticsFilter) (*domain.TimeStat, error) {
	return u.repo.TimeStat(ctx, req)
}

func (u *DashboardUsecase) UserStat(ctx context.Context, req domain.StatisticsFilter) (*domain.UserStat, error) {
	return u.repo.UserStat(ctx, req)
}

func (u *DashboardUsecase) UserEvents(ctx context.Context, req domain.StatisticsFilter) ([]*domain.UserEvent, error) {
	return u.repo.UserEvents(ctx, req)
}

func (u *DashboardUsecase) UserCodeRank(ctx context.Context, req domain.StatisticsFilter) ([]*domain.UserCodeRank, error) {
	return u.repo.UserCodeRank(ctx, req)
}

func (u *DashboardUsecase) UserHeatmap(ctx context.Context, userID string) (*domain.UserHeatmapResp, error) {
	rs, err := u.repo.UserHeatmap(ctx, userID)
	if err != nil {
		return nil, err
	}
	var count int64
	if len(rs) > 0 {
		maxCount := slices.MaxFunc(rs, func(a, b *domain.UserHeatmap) int {
			return int(a.Count - b.Count)
		})
		count = maxCount.Count
	}
	return &domain.UserHeatmapResp{
		MaxCount: count,
		Points:   rs,
	}, nil
}
