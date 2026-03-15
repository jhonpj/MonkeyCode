package repo

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect/sql"

	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/db/extension"
	"github.com/chaitin/MonkeyCode/backend/domain"
)

type ExtensionRepo struct {
	db *db.Client
}

func NewExtensionRepo(db *db.Client) domain.ExtensionRepo {
	return &ExtensionRepo{
		db: db,
	}
}

// Latest implements domain.ExtensionRepo.
func (e *ExtensionRepo) Latest(ctx context.Context) (*db.Extension, error) {
	es, err := e.db.Extension.
		Query().
		Order(extension.ByCreatedAt(sql.OrderDesc())).
		Limit(1).
		All(ctx)
	if err != nil {
		return nil, err
	}
	if len(es) == 0 {
		return nil, fmt.Errorf("extension not found")
	}
	return es[0], nil
}

// Save implements domain.ExtensionRepo.
func (e *ExtensionRepo) Save(ctx context.Context, ext *db.Extension) (*db.Extension, error) {
	return e.db.Extension.Create().
		SetVersion(ext.Version).
		SetPath(ext.Path).
		Save(ctx)
}

func (e *ExtensionRepo) GetByVersion(ctx context.Context, version string) (*db.Extension, error) {
	if version == "" {
		return e.Latest(ctx)
	}
	return e.db.Extension.Query().Where(extension.Version(version)).Only(ctx)
}
