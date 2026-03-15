package usecase

import (
	"context"

	"github.com/chaitin/MonkeyCode/backend/domain"
)

type BillingUsecase struct {
	repo domain.BillingRepo
}

func NewBillingUsecase(repo domain.BillingRepo) domain.BillingUsecase {
	return &BillingUsecase{repo: repo}
}

// ListChatRecord implements domain.BillingUsecase.
func (b *BillingUsecase) ListChatRecord(ctx context.Context, req domain.ListRecordReq) (*domain.ListChatRecordResp, error) {
	return b.repo.ListChatRecord(ctx, req)
}

// ListCompletionRecord implements domain.BillingUsecase.
func (b *BillingUsecase) ListCompletionRecord(ctx context.Context, req domain.ListRecordReq) (*domain.ListCompletionRecordResp, error) {
	return b.repo.ListCompletionRecord(ctx, req)
}

// CompletionInfo implements domain.BillingUsecase.
func (b *BillingUsecase) CompletionInfo(ctx context.Context, id, userID string) (*domain.CompletionInfo, error) {
	return b.repo.CompletionInfo(ctx, id, userID)
}

// ChatInfo implements domain.BillingUsecase.
func (b *BillingUsecase) ChatInfo(ctx context.Context, id, userID string) (*domain.ChatInfo, error) {
	return b.repo.ChatInfo(ctx, id, userID)
}
