package domain

import (
	"context"

	"github.com/google/uuid"

	"github.com/chaitin/MonkeyCode/backend/db"
)

type ExtensionUsecase interface {
	Latest(ctx context.Context) (*Extension, error)
	SyncLatest()
	GetByVersion(ctx context.Context, version string) (*Extension, error)
}

type ExtensionRepo interface {
	Latest(ctx context.Context) (*db.Extension, error)
	Save(ctx context.Context, ext *db.Extension) (*db.Extension, error)
	GetByVersion(ctx context.Context, version string) (*db.Extension, error)
}

type Extension struct {
	ID        uuid.UUID `json:"id"`
	Version   string    `json:"version"`
	Path      string    `json:"path"`
	CreatedAt int64     `json:"created_at"`
}

func (et *Extension) From(e *db.Extension) *Extension {
	if e == nil {
		return et
	}
	et.ID = e.ID
	et.Version = e.Version
	et.Path = e.Path
	et.CreatedAt = e.CreatedAt.Unix()
	return et
}
