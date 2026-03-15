package usecase

import (
	"context"

	"github.com/chaitin/MonkeyCode/backend/domain"
)

type SecurityScanningUsecase struct {
	repo domain.SecurityScanningRepo
}

func NewSecurityScanningUsecase(repo domain.SecurityScanningRepo) domain.SecurityScanningUsecase {
	return &SecurityScanningUsecase{
		repo: repo,
	}
}

// Detail implements domain.SecurityScanningUsecase.
func (s *SecurityScanningUsecase) Detail(ctx context.Context, userID, id string) ([]*domain.SecurityScanningRiskDetail, error) {
	return s.repo.Detail(ctx, userID, id)
}

// List implements domain.SecurityScanningUsecase.
func (s *SecurityScanningUsecase) List(ctx context.Context, req domain.ListSecurityScanningReq) (*domain.ListSecurityScanningResp, error) {
	return s.repo.List(ctx, req)
}
