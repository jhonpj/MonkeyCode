package repo

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"

	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/db/workspace"
	"github.com/chaitin/MonkeyCode/backend/db/workspacefile"
	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/pkg/entx"
)

type WorkspaceRepo struct {
	db *db.Client
}

type WorkspaceFileRepo struct {
	db *db.Client
}

func NewWorkspaceRepo(db *db.Client) domain.WorkspaceRepo {
	return &WorkspaceRepo{db: db}
}

func NewWorkspaceFileRepo(db *db.Client) domain.WorkspaceFileRepo {
	return &WorkspaceFileRepo{db: db}
}

// WorkspaceRepo methods

func (r *WorkspaceRepo) Create(ctx context.Context, req *domain.CreateWorkspaceReq) (*db.Workspace, error) {
	userID, err := uuid.Parse(req.UserID)
	if err != nil {
		return nil, fmt.Errorf("invalid user ID: %w", err)
	}

	return r.db.Workspace.Create().
		SetUserID(userID).
		SetName(req.Name).
		SetDescription(req.Description).
		SetRootPath(req.RootPath).
		SetSettings(req.Settings).
		Save(ctx)
}

func (r *WorkspaceRepo) Update(ctx context.Context, id string, fn func(*db.WorkspaceUpdateOne) error) (*db.Workspace, error) {
	workspaceID, err := uuid.Parse(id)
	if err != nil {
		return nil, fmt.Errorf("invalid workspace ID: %w", err)
	}

	var workspace *db.Workspace
	err = entx.WithTx(ctx, r.db, func(tx *db.Tx) error {
		old, err := tx.Workspace.Get(ctx, workspaceID)
		if err != nil {
			return err
		}

		up := tx.Workspace.UpdateOneID(old.ID)
		if err := fn(up); err != nil {
			return err
		}

		if updated, err := up.Save(ctx); err != nil {
			return err
		} else {
			workspace = updated
		}
		return nil
	})
	return workspace, err
}

func (r *WorkspaceRepo) Delete(ctx context.Context, id string) error {
	workspaceID, err := uuid.Parse(id)
	if err != nil {
		return fmt.Errorf("invalid workspace ID: %w", err)
	}

	return r.db.Workspace.DeleteOneID(workspaceID).Exec(ctx)
}

func (r *WorkspaceRepo) GetByID(ctx context.Context, id string) (*db.Workspace, error) {
	workspaceID, err := uuid.Parse(id)
	if err != nil {
		return nil, fmt.Errorf("invalid workspace ID: %w", err)
	}

	return r.db.Workspace.Query().
		Where(workspace.ID(workspaceID)).
		Only(ctx)
}

func (r *WorkspaceRepo) GetByUserAndPath(ctx context.Context, userID, rootPath string) (*db.Workspace, error) {
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return nil, fmt.Errorf("invalid user ID: %w", err)
	}

	return r.db.Workspace.Query().
		Where(
			workspace.UserID(userUUID),
			workspace.RootPath(rootPath),
		).
		Only(ctx)
}

func (r *WorkspaceRepo) List(ctx context.Context, req *domain.ListWorkspaceReq) ([]*db.Workspace, *db.PageInfo, error) {
	q := r.db.Workspace.Query()

	// 添加筛选条件
	if req.UserID != "" {
		userID, err := uuid.Parse(req.UserID)
		if err != nil {
			return nil, nil, fmt.Errorf("invalid user ID: %w", err)
		}
		q = q.Where(workspace.UserID(userID))
	}

	if req.Search != "" {
		q = q.Where(
			workspace.Or(
				workspace.NameContains(req.Search),
				workspace.DescriptionContains(req.Search),
			),
		)
	}

	if req.RootPath != "" {
		q = q.Where(workspace.RootPath(req.RootPath))
	}

	// 排序
	q = q.Order(workspace.ByLastAccessedAt(sql.OrderDesc()))

	// 分页查询
	return q.Page(ctx, req.Page, req.Size)
}

// WorkspaceFileRepo methods

func (r *WorkspaceFileRepo) Create(ctx context.Context, req *domain.CreateWorkspaceFileReq) (*db.WorkspaceFile, error) {
	userID, err := uuid.Parse(req.UserID)
	if err != nil {
		return nil, fmt.Errorf("invalid user ID: %w", err)
	}

	workspaceID, err := uuid.Parse(req.WorkspaceID)
	if err != nil {
		return nil, fmt.Errorf("invalid workspace ID: %w", err)
	}

	return r.db.WorkspaceFile.Create().
		SetUserID(userID).
		SetWorkspaceID(workspaceID).
		SetPath(req.Path).
		SetContent(req.Content).
		SetHash(req.Hash).
		SetLanguage(req.Language).
		SetSize(req.Size).
		Save(ctx)
}

func (r *WorkspaceFileRepo) Update(ctx context.Context, id string, fn func(*db.WorkspaceFileUpdateOne) error) (*db.WorkspaceFile, error) {
	fileID, err := uuid.Parse(id)
	if err != nil {
		return nil, fmt.Errorf("invalid file ID: %w", err)
	}

	var file *db.WorkspaceFile
	err = entx.WithTx(ctx, r.db, func(tx *db.Tx) error {
		old, err := tx.WorkspaceFile.Get(ctx, fileID)
		if err != nil {
			return err
		}

		up := tx.WorkspaceFile.UpdateOneID(old.ID)
		if err := fn(up); err != nil {
			return err
		}

		if updated, err := up.Save(ctx); err != nil {
			return err
		} else {
			file = updated
		}
		return nil
	})
	return file, err
}

func (r *WorkspaceFileRepo) Delete(ctx context.Context, id string) error {
	fileID, err := uuid.Parse(id)
	if err != nil {
		return fmt.Errorf("invalid file ID: %w", err)
	}

	return r.db.WorkspaceFile.DeleteOneID(fileID).Exec(ctx)
}

func (r *WorkspaceFileRepo) GetByID(ctx context.Context, id string) (*db.WorkspaceFile, error) {
	fileID, err := uuid.Parse(id)
	if err != nil {
		return nil, fmt.Errorf("invalid file ID: %w", err)
	}

	return r.db.WorkspaceFile.Query().
		Where(workspacefile.ID(fileID)).
		Only(ctx)
}

func (r *WorkspaceFileRepo) GetByPath(ctx context.Context, userID, workspaceID, path string) (*db.WorkspaceFile, error) {
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return nil, fmt.Errorf("invalid user ID: %w", err)
	}

	workspaceUUID, err := uuid.Parse(workspaceID)
	if err != nil {
		return nil, fmt.Errorf("invalid workspace ID: %w", err)
	}

	return r.db.WorkspaceFile.Query().
		Where(
			workspacefile.UserID(userUUID),
			workspacefile.WorkspaceID(workspaceUUID),
			workspacefile.Path(path),
		).
		Only(ctx)
}

func (r *WorkspaceFileRepo) List(ctx context.Context, req *domain.ListWorkspaceFileReq) ([]*db.WorkspaceFile, *db.PageInfo, error) {
	q := r.db.WorkspaceFile.Query()

	// 添加筛选条件
	if req.UserID != "" {
		userID, err := uuid.Parse(req.UserID)
		if err != nil {
			return nil, nil, fmt.Errorf("invalid user ID: %w", err)
		}
		q = q.Where(workspacefile.UserID(userID))
	}

	if req.WorkspaceID != "" {
		workspaceID, err := uuid.Parse(req.WorkspaceID)
		if err != nil {
			return nil, nil, fmt.Errorf("invalid project ID: %w", err)
		}
		q = q.Where(workspacefile.WorkspaceID(workspaceID))
	}

	if req.Language != "" {
		q = q.Where(workspacefile.Language(req.Language))
	}

	if req.Search != "" {
		q = q.Where(workspacefile.PathContains(req.Search))
	}

	// 排序
	q = q.Order(workspacefile.ByUpdatedAt(sql.OrderDesc()))

	// 分页查询
	return q.Page(ctx, req.Page, req.Size)
}

func (r *WorkspaceFileRepo) BatchCreate(ctx context.Context, files []*domain.CreateWorkspaceFileReq) ([]*db.WorkspaceFile, error) {
	if len(files) == 0 {
		return []*db.WorkspaceFile{}, nil
	}

	var results []*db.WorkspaceFile
	err := entx.WithTx(ctx, r.db, func(tx *db.Tx) error {
		for _, file := range files {
			userID, err := uuid.Parse(file.UserID)
			if err != nil {
				return fmt.Errorf("invalid user ID for file %s: %w", file.Path, err)
			}

			workspaceID, err := uuid.Parse(file.WorkspaceID)
			if err != nil {
				return fmt.Errorf("invalid project ID for file %s: %w", file.Path, err)
			}

			created, err := tx.WorkspaceFile.Create().
				SetUserID(userID).
				SetWorkspaceID(workspaceID).
				SetPath(file.Path).
				SetContent(file.Content).
				SetHash(file.Hash).
				SetLanguage(file.Language).
				SetSize(file.Size).
				Save(ctx)
			if err != nil {
				return fmt.Errorf("failed to create file %s: %w", file.Path, err)
			}

			results = append(results, created)
		}
		return nil
	})

	return results, err
}

func (r *WorkspaceFileRepo) GetByHashes(ctx context.Context, workspaceID string, hashes []string) (map[string]*db.WorkspaceFile, error) {
	if len(hashes) == 0 {
		return make(map[string]*db.WorkspaceFile), nil
	}

	workspaceUUID, err := uuid.Parse(workspaceID)
	if err != nil {
		return nil, fmt.Errorf("invalid project ID: %w", err)
	}

	files, err := r.db.WorkspaceFile.Query().
		Where(
			workspacefile.WorkspaceID(workspaceUUID),
			workspacefile.HashIn(hashes...),
		).
		All(ctx)
	if err != nil {
		return nil, err
	}

	result := make(map[string]*db.WorkspaceFile)
	for _, file := range files {
		result[file.Hash] = file
	}

	return result, nil
}

func (r *WorkspaceFileRepo) CountByWorkspace(ctx context.Context, workspaceID string) (int64, error) {
	workspaceUUID, err := uuid.Parse(workspaceID)
	if err != nil {
		return 0, fmt.Errorf("invalid workspace ID: %w", err)
	}

	count, err := r.db.WorkspaceFile.Query().
		Where(workspacefile.WorkspaceID(workspaceUUID)).
		Count(ctx)
	return int64(count), err
}

func (r *WorkspaceFileRepo) GetWorkspaceFiles(ctx context.Context, workspaceID string) ([]*db.WorkspaceFile, error) {
	workspaceUUID, err := uuid.Parse(workspaceID)
	if err != nil {
		return nil, fmt.Errorf("invalid workspace ID: %w", err)
	}

	return r.db.WorkspaceFile.Query().
		Where(workspacefile.WorkspaceID(workspaceUUID)).
		Order(workspacefile.ByPath(sql.OrderAsc())).
		All(ctx)
}
