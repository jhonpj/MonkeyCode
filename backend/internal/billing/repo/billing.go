package repo

import (
	"context"
	"strings"

	"entgo.io/ent/dialect/sql"

	"github.com/chaitin/MonkeyCode/backend/consts"
	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/db/task"
	"github.com/chaitin/MonkeyCode/backend/db/taskrecord"
	"github.com/chaitin/MonkeyCode/backend/db/user"
	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/pkg/cvt"
	"github.com/chaitin/MonkeyCode/backend/pkg/entx"
	"github.com/google/uuid"
)

type BillingRepo struct {
	db *db.Client
}

func NewBillingRepo(db *db.Client) domain.BillingRepo {
	return &BillingRepo{db: db}
}

// ChatInfo implements domain.BillingRepo.
func (b *BillingRepo) ChatInfo(ctx context.Context, id, userID string) (*domain.ChatInfo, error) {
	q := b.db.Task.Query().
		WithTaskRecords(func(trq *db.TaskRecordQuery) {
			trq.Order(taskrecord.ByCreatedAt(sql.OrderAsc()))
		}).
		Where(task.TaskID(id))
	if userID != "" {
		uid, err := uuid.Parse(userID)
		if err != nil {
			return nil, err
		}
		q.Where(task.UserID(uid))
	}
	record, err := q.First(ctx)
	if err != nil {
		return nil, err
	}

	return cvt.From(record, &domain.ChatInfo{}), nil
}

// CompletionInfo implements domain.BillingRepo.
func (b *BillingRepo) CompletionInfo(ctx context.Context, id, userID string) (*domain.CompletionInfo, error) {
	q := b.db.Task.Query().
		WithTaskRecords(func(trq *db.TaskRecordQuery) {
			trq.Order(taskrecord.ByCreatedAt(sql.OrderAsc()))
		}).
		Where(task.TaskID(id))
	if userID != "" {
		uid, err := uuid.Parse(userID)
		if err != nil {
			return nil, err
		}
		q.Where(task.UserID(uid))
	}
	record, err := q.First(ctx)
	if err != nil {
		return nil, err
	}

	return cvt.From(record, &domain.CompletionInfo{}), nil
}

// ListChatRecord implements domain.BillingRepo.
func (b *BillingRepo) ListChatRecord(ctx context.Context, req domain.ListRecordReq) (*domain.ListChatRecordResp, error) {
	ctx = entx.SkipSoftDelete(ctx)
	q := b.db.Task.Query().
		WithUser().
		WithModel().
		WithTaskRecords(func(trq *db.TaskRecordQuery) {
			trq.Order(taskrecord.ByCreatedAt(sql.OrderAsc()))
		}).
		Where(task.ModelType(consts.ModelTypeLLM)).
		Order(task.ByCreatedAt(sql.OrderDesc()))

	filterTask(q, req)

	records, p, err := q.Page(ctx, req.Page, req.Size)
	if err != nil {
		return nil, err
	}

	return &domain.ListChatRecordResp{
		PageInfo: p,
		Records: cvt.Iter(records, func(_ int, r *db.Task) *domain.ChatRecord {
			return cvt.From(r, &domain.ChatRecord{})
		}),
	}, nil
}

func filterTask(q *db.TaskQuery, req domain.ListRecordReq) {
	if req.IsAccept != nil {
		q.Where(task.IsAccept(*req.IsAccept))
	}

	if req.UserID != "" {
		if uid, err := uuid.Parse(req.UserID); err == nil {
			q.Where(task.UserID(uid))
		}
	}

	if req.Author != "" {
		q.Where(task.HasUserWith(func(s *sql.Selector) {
			s.Where(sql.Like(s.C(user.FieldUsername), "%"+req.Author+"%"))
		}))
	}

	if req.Language != "" {
		lang := strings.ToLower(req.Language)
		q.Where(func(s *sql.Selector) {
			s.Where(
				sql.Like(s.C(task.FieldProgramLanguage), "%"+lang+"%"),
			)
		})
	}

	if req.WorkMode != "" {
		q.Where(task.WorkMode(req.WorkMode))
	}
}

// ListCompletionRecord implements domain.BillingRepo.
func (b *BillingRepo) ListCompletionRecord(ctx context.Context, req domain.ListRecordReq) (*domain.ListCompletionRecordResp, error) {
	ctx = entx.SkipSoftDelete(ctx)
	q := b.db.Task.Query().
		WithUser().
		WithModel().
		WithTaskRecords(func(trq *db.TaskRecordQuery) {
			trq.Order(taskrecord.ByCreatedAt(sql.OrderAsc()))
		}).
		Where(task.ModelType(consts.ModelTypeCoder)).
		Where(task.IsSuggested(true)).
		Order(task.ByCreatedAt(sql.OrderDesc()))

	filterTask(q, req)

	records, p, err := q.Page(ctx, req.Page, req.Size)
	if err != nil {
		return nil, err
	}

	return &domain.ListCompletionRecordResp{
		PageInfo: p,
		Records: cvt.Iter(records, func(_ int, r *db.Task) *domain.CompletionRecord {
			return cvt.From(r, &domain.CompletionRecord{})
		}),
	}, nil
}
