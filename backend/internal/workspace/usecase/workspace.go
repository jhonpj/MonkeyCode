package usecase

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log/slog"
	"math"
	"strings"
	"sync"
	"time"

	"github.com/chaitin/MonkeyCode/backend/config"
	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/pkg/cli"
)

type WorkspaceUsecase struct {
	repo        domain.WorkspaceRepo
	config      *config.Config
	logger      *slog.Logger
	ensureLocks sync.Map // map[string]*sync.Mutex
}

type WorkspaceFileUsecase struct {
	repo           domain.WorkspaceFileRepo
	workspaceSvc   domain.WorkspaceUsecase
	codeSnippetSvc domain.CodeSnippetUsecase
	config         *config.Config
	logger         *slog.Logger
}

func NewWorkspaceUsecase(
	repo domain.WorkspaceRepo,
	config *config.Config,
	logger *slog.Logger,
) domain.WorkspaceUsecase {
	return &WorkspaceUsecase{
		repo:   repo,
		config: config,
		logger: logger.With("usecase", "workspace"),
	}
}

func NewWorkspaceFileUsecase(
	repo domain.WorkspaceFileRepo,
	workspaceSvc domain.WorkspaceUsecase,
	codeSnippetSvc domain.CodeSnippetUsecase,
	config *config.Config,
	logger *slog.Logger,
) domain.WorkspaceFileUsecase {
	return &WorkspaceFileUsecase{
		repo:           repo,
		workspaceSvc:   workspaceSvc,
		codeSnippetSvc: codeSnippetSvc,
		config:         config,
		logger:         logger.With("usecase", "workspace_file"),
	}
}

// WorkspaceUsecase methods

func (u *WorkspaceUsecase) Create(ctx context.Context, req *domain.CreateWorkspaceReq) (*domain.Workspace, error) {
	workspace, err := u.repo.Create(ctx, req)
	if err != nil {
		u.logger.Error("failed to create workspace", "error", err, "name", req.Name, "root_path", req.RootPath)
		return nil, fmt.Errorf("failed to create workspace: %w", err)
	}

	u.logger.Info("workspace created", "id", workspace.ID, "name", req.Name, "root_path", req.RootPath)
	return (&domain.Workspace{}).From(workspace), nil
}

func (u *WorkspaceUsecase) GetByID(ctx context.Context, id string) (*domain.Workspace, error) {
	workspace, err := u.repo.GetByID(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get workspace: %w", err)
	}

	return (&domain.Workspace{}).From(workspace), nil
}

func (u *WorkspaceUsecase) GetByUserAndPath(ctx context.Context, userID, rootPath string) (*domain.Workspace, error) {
	workspace, err := u.repo.GetByUserAndPath(ctx, userID, rootPath)
	if err != nil {
		return nil, fmt.Errorf("failed to get workspace by user and path: %w", err)
	}

	return (&domain.Workspace{}).From(workspace), nil
}

func (u *WorkspaceUsecase) List(ctx context.Context, req *domain.ListWorkspaceReq) (*domain.ListWorkspaceResp, error) {
	workspaces, pageInfo, err := u.repo.List(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("failed to list workspaces: %w", err)
	}

	return &domain.ListWorkspaceResp{
		PageInfo:   pageInfo,
		Workspaces: domain.FromWorkspaces(workspaces),
	}, nil
}

func (u *WorkspaceUsecase) Update(ctx context.Context, req *domain.UpdateWorkspaceReq) (*domain.Workspace, error) {
	workspace, err := u.repo.Update(ctx, req.ID, func(up *db.WorkspaceUpdateOne) error {
		if req.Name != nil {
			up.SetName(*req.Name)
		}
		if req.Description != nil {
			up.SetDescription(*req.Description)
		}
		if req.Settings != nil {
			up.SetSettings(req.Settings)
		}
		return nil
	})
	if err != nil {
		u.logger.Error("failed to update workspace", "error", err, "id", req.ID)
		return nil, fmt.Errorf("failed to update workspace: %w", err)
	}

	u.logger.Info("workspace updated", "id", req.ID)
	return (&domain.Workspace{}).From(workspace), nil
}

func (u *WorkspaceUsecase) Delete(ctx context.Context, id string) error {
	err := u.repo.Delete(ctx, id)
	if err != nil {
		u.logger.Error("failed to delete workspace", "error", err, "id", id)
		return fmt.Errorf("failed to delete workspace: %w", err)
	}

	u.logger.Info("workspace deleted", "id", id)
	return nil
}

func (u *WorkspaceUsecase) EnsureWorkspace(ctx context.Context, userID, rootPath, name string) (*domain.Workspace, error) {
	// 创建锁的唯一键
	lockKey := fmt.Sprintf("%s:%s", userID, rootPath)

	// 获取或创建针对这个 userID+rootPath 的锁
	lockValue, _ := u.ensureLocks.LoadOrStore(lockKey, &sync.Mutex{})
	lock := lockValue.(*sync.Mutex)

	// 加锁，防止并发创建
	lock.Lock()
	defer lock.Unlock()

	// 自动生成工作区名称（如果未提供）
	if name == "" {
		name = u.generateWorkspaceName(rootPath)
	}

	// 首先尝试获取已存在的工作区
	workspace, err := u.repo.GetByUserAndPath(ctx, userID, rootPath)
	if err == nil {
		// 工作区已存在，更新最后访问时间
		updated, err := u.repo.Update(ctx, workspace.ID.String(), func(up *db.WorkspaceUpdateOne) error {
			up.SetLastAccessedAt(time.Now())
			return nil
		})
		if err != nil {
			u.logger.Warn("failed to update workspace last accessed time", "error", err, "id", workspace.ID)
			// 即使更新访问时间失败，也返回工作区
			return (&domain.Workspace{}).From(workspace), nil
		}
		return (&domain.Workspace{}).From(updated), nil
	}

	// 如果工作区不存在，创建新的工作区
	if !db.IsNotFound(err) {
		return nil, fmt.Errorf("failed to check workspace existence: %w", err)
	}

	// 使用改进的重试机制来处理并发创建的情况
	maxRetries := 5
	for i := range maxRetries {
		createReq := &domain.CreateWorkspaceReq{
			UserID:      userID,
			Name:        name,
			Description: fmt.Sprintf("Auto-created workspace for %s", rootPath),
			RootPath:    rootPath,
			Settings:    map[string]any{},
		}

		workspace, err := u.Create(ctx, createReq)
		if err == nil {
			u.logger.Info("workspace created successfully", "userID", userID, "rootPath", rootPath, "retry", i)
			return workspace, nil
		}

		// 如果是唯一约束错误，说明工作区已经被其他请求创建了
		if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
			u.logger.Debug("workspace creation conflict, retrying", "userID", userID, "rootPath", rootPath, "retry", i, "error", err)

			// 使用指数退避等待
			waitTime := time.Duration(math.Pow(2, float64(i))) * 25 * time.Millisecond
			if waitTime > 500*time.Millisecond {
				waitTime = 500 * time.Millisecond
			}
			time.Sleep(waitTime)

			// 尝试获取已创建的工作区
			existing, err := u.repo.GetByUserAndPath(ctx, userID, rootPath)
			if err == nil {
				u.logger.Info("found existing workspace after conflict", "userID", userID, "rootPath", rootPath, "retry", i)
				// 更新最后访问时间
				updated, err := u.repo.Update(ctx, existing.ID.String(), func(up *db.WorkspaceUpdateOne) error {
					up.SetLastAccessedAt(time.Now())
					return nil
				})
				if err != nil {
					u.logger.Warn("failed to update workspace last accessed time", "error", err, "id", existing.ID)
					// 即使更新访问时间失败，也返回工作区
					return (&domain.Workspace{}).From(existing), nil
				}
				return (&domain.Workspace{}).From(updated), nil
			} else {
				u.logger.Warn("failed to get workspace after conflict", "userID", userID, "rootPath", rootPath, "retry", i, "error", err)
			}

			// 如果是最后一次重试，返回错误
			if i == maxRetries-1 {
				u.logger.Error("failed to resolve workspace creation conflict after all retries", "userID", userID, "rootPath", rootPath, "maxRetries", maxRetries)
				return nil, fmt.Errorf("workspace creation conflict persists after %d retries: %w", maxRetries, err)
			}
			continue
		}

		// 如果不是唯一约束错误，直接返回错误
		u.logger.Error("workspace creation failed with non-conflict error", "userID", userID, "rootPath", rootPath, "retry", i, "error", err)
		return nil, fmt.Errorf("failed to create workspace: %w", err)
	}

	return nil, fmt.Errorf("failed to create workspace after %d retries", maxRetries)
}

func (u *WorkspaceUsecase) generateWorkspaceName(rootPath string) string {
	// 从路径中提取最后一个目录名作为工作区名称
	parts := strings.Split(rootPath, "/")
	if len(parts) > 0 {
		name := parts[len(parts)-1]
		if name != "" {
			return name
		}
	}
	return "Untitled Workspace"
}

// WorkspaceFileUsecase methods

func (u *WorkspaceFileUsecase) Create(ctx context.Context, req *domain.CreateWorkspaceFileReq) (*domain.WorkspaceFile, error) {
	// 验证和计算哈希
	if req.Hash == "" {
		req.Hash = u.calculateHash(req.Content)
	} else if !u.verifyHash(req.Content, req.Hash) {
		return nil, fmt.Errorf("provided hash does not match content")
	}

	// 计算文件大小
	if req.Size == 0 {
		req.Size = int64(len(req.Content))
	}

	// 推断编程语言
	if req.Language == "" {
		req.Language = u.inferLanguage(req.Path)
	}

	// 确保工作区存在
	// 首先通过workspace ID获取workspace信息，然后使用其root path来确保workspace存在
	workspace, err := u.workspaceSvc.GetByID(ctx, req.WorkspaceID)
	if err != nil {
		return nil, fmt.Errorf("failed to get workspace by ID: %w", err)
	}

	_, err = u.workspaceSvc.EnsureWorkspace(ctx, req.UserID, workspace.RootPath, "")
	if err != nil {
		return nil, fmt.Errorf("failed to ensure workspace exists: %w", err)
	}

	file, err := u.repo.Create(ctx, req)
	if err != nil {
		u.logger.Error("failed to create workspace file", "error", err, "path", req.Path)
		return nil, fmt.Errorf("failed to create file: %w", err)
	}

	u.logger.Info("workspace file created", "id", file.ID, "path", req.Path)
	return (&domain.WorkspaceFile{}).From(file), nil
}

func (u *WorkspaceFileUsecase) Update(ctx context.Context, req *domain.UpdateWorkspaceFileReq) (*domain.WorkspaceFile, error) {
	file, err := u.repo.Update(ctx, req.ID, func(up *db.WorkspaceFileUpdateOne) error {
		if req.Content != nil {
			up.SetContent(*req.Content)
			// 更新内容时重新计算哈希和大小
			if req.Hash != nil {
				if !u.verifyHash(*req.Content, *req.Hash) {
					return fmt.Errorf("provided hash does not match content")
				}
				up.SetHash(*req.Hash)
			} else {
				up.SetHash(u.calculateHash(*req.Content))
			}
			if req.Size != nil {
				up.SetSize(*req.Size)
			} else {
				up.SetSize(int64(len(*req.Content)))
			}
		} else if req.Hash != nil {
			up.SetHash(*req.Hash)
		}

		if req.Language != nil {
			up.SetLanguage(*req.Language)
		}

		if req.Size != nil && req.Content == nil {
			up.SetSize(*req.Size)
		}

		// AST field has been removed from the domain model

		return nil
	})
	if err != nil {
		u.logger.Error("failed to update workspace file", "error", err, "id", req.ID)
		return nil, fmt.Errorf("failed to update file: %w", err)
	}

	u.logger.Info("workspace file updated", "id", req.ID)
	return (&domain.WorkspaceFile{}).From(file), nil
}

func (u *WorkspaceFileUsecase) Delete(ctx context.Context, id string) error {
	err := u.repo.Delete(ctx, id)
	if err != nil {
		u.logger.Error("failed to delete workspace file", "error", err, "id", id)
		return fmt.Errorf("failed to delete file: %w", err)
	}

	u.logger.Info("workspace file deleted", "id", id)
	return nil
}

func (u *WorkspaceFileUsecase) GetByID(ctx context.Context, id string) (*domain.WorkspaceFile, error) {
	file, err := u.repo.GetByID(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get file: %w", err)
	}

	return (&domain.WorkspaceFile{}).From(file), nil
}

func (u *WorkspaceFileUsecase) GetAndSave(ctx context.Context, req *domain.GetAndSaveReq) error {
	// 获取workspace信息以获取RootPath
	workspace, err := u.workspaceSvc.GetByID(ctx, req.WorkspaceID)
	if err != nil {
		u.logger.Error("failed to get workspace by ID", "error", err, "workspaceID", req.WorkspaceID)
		return fmt.Errorf("failed to get workspace: %w", err)
	}

	results, err := cli.RunCli("index", "", req.FileMetas)
	if err != nil {
		return err
	}
	for _, res := range results {
		file, err := u.repo.GetByPath(ctx, req.UserID, req.WorkspaceID, res.FilePath)
		if err != nil {
			return err
		}

		// 先删除与该文件关联的所有旧代码片段
		existingSnippets, err := u.codeSnippetSvc.ListByWorkspaceFile(ctx, file.ID.String())
		if err != nil {
			u.logger.Error("failed to list existing code snippets", "error", err, "fileID", file.ID)
			// 继续处理，不因错误而中断整个流程
		} else {
			for _, snippet := range existingSnippets {
				// 检查snippet ID是否为空
				if snippet.ID == "" {
					u.logger.Warn("skipping deletion of code snippet with empty ID", "fileID", file.ID)
					continue
				}
				err := u.codeSnippetSvc.Delete(ctx, snippet.ID)
				if err != nil {
					u.logger.Error("failed to delete existing code snippet", "error", err, "snippetID", snippet.ID)
					// 继续处理其他片段，不因单个错误而中断整个流程
				}
			}
		}

		// 创建新的CodeSnippet，传递workspacePath
		_, err = u.codeSnippetSvc.CreateFromIndexResult(ctx, file.ID.String(), &res, workspace.RootPath)
		if err != nil {
			u.logger.Error("failed to create code snippet from index result", "error", err, "filePath", res.FilePath)
			// 继续处理其他结果，不因单个错误而中断整个流程
		}
	}
	return nil
}

func (u *WorkspaceFileUsecase) GetByPath(ctx context.Context, userID, workspaceID, path string) (*domain.WorkspaceFile, error) {
	file, err := u.repo.GetByPath(ctx, userID, workspaceID, path)
	if err != nil {
		return nil, fmt.Errorf("failed to get file by path: %w", err)
	}

	return (&domain.WorkspaceFile{}).From(file), nil
}

func (u *WorkspaceFileUsecase) List(ctx context.Context, req *domain.ListWorkspaceFileReq) (*domain.ListWorkspaceFileResp, error) {
	files, pageInfo, err := u.repo.List(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("failed to list files: %w", err)
	}

	return &domain.ListWorkspaceFileResp{
		PageInfo: pageInfo,
		Files:    domain.FromWorkspaceFiles(files),
	}, nil
}

func (u *WorkspaceFileUsecase) BatchCreate(ctx context.Context, req *domain.BatchCreateWorkspaceFileReq) ([]*domain.WorkspaceFile, error) {
	// 确保工作区存在
	// 首先通过workspace ID获取workspace信息，然后使用其root path来确保workspace存在
	workspace, err := u.workspaceSvc.GetByID(ctx, req.WorkspaceID)
	if err != nil {
		return nil, fmt.Errorf("failed to get workspace by ID: %w", err)
	}

	_, err = u.workspaceSvc.EnsureWorkspace(ctx, req.UserID, workspace.RootPath, "")
	if err != nil {
		return nil, fmt.Errorf("failed to ensure workspace exists: %w", err)
	}

	// 验证和预处理文件
	for _, file := range req.Files {
		if file.Hash == "" {
			file.Hash = u.calculateHash(file.Content)
		} else if !u.verifyHash(file.Content, file.Hash) {
			return nil, fmt.Errorf("hash mismatch for file %s", file.Path)
		}

		if file.Size == 0 {
			file.Size = int64(len(file.Content))
		}

		if file.Language == "" {
			file.Language = u.inferLanguage(file.Path)
		}

		// 设置用户ID和工作区ID
		file.UserID = req.UserID
		file.WorkspaceID = req.WorkspaceID
	}

	files, err := u.repo.BatchCreate(ctx, req.Files)
	if err != nil {
		u.logger.Error("failed to batch create workspace files", "error", err, "count", len(req.Files))
		return nil, fmt.Errorf("failed to batch create files: %w", err)
	}

	u.logger.Info("workspace files batch created", "count", len(files))
	return domain.FromWorkspaceFiles(files), nil
}

func (u *WorkspaceFileUsecase) BatchUpdate(ctx context.Context, req *domain.BatchUpdateWorkspaceFileReq) ([]*domain.WorkspaceFile, error) {
	var results []*domain.WorkspaceFile

	for _, updateReq := range req.Files {
		file, err := u.Update(ctx, updateReq)
		if err != nil {
			return nil, fmt.Errorf("failed to update file %s: %w", updateReq.ID, err)
		}
		results = append(results, file)
	}

	u.logger.Info("workspace files batch updated", "count", len(results))
	return results, nil
}

func (u *WorkspaceFileUsecase) Sync(ctx context.Context, req *domain.SyncWorkspaceFileReq) (*domain.SyncWorkspaceFileResp, error) {
	// 确保工作区存在
	// 首先通过workspace ID获取workspace信息，然后使用其root path来确保workspace存在
	workspace, err := u.workspaceSvc.GetByID(ctx, req.WorkspaceID)
	if err != nil {
		return nil, fmt.Errorf("failed to get workspace by ID: %w", err)
	}

	_, err = u.workspaceSvc.EnsureWorkspace(ctx, req.UserID, workspace.RootPath, "")
	if err != nil {
		return nil, fmt.Errorf("failed to ensure workspace exists: %w", err)
	}

	// 获取要同步的文件哈希列表
	var hashes []string
	fileMap := make(map[string]*domain.CreateWorkspaceFileReq)
	for _, file := range req.Files {
		if file.Hash == "" {
			file.Hash = u.calculateHash(file.Content)
		}
		hashes = append(hashes, file.Hash)
		fileMap[file.Hash] = file
	}

	// 查找工作区中已存在的文件
	existing, err := u.repo.GetByHashes(ctx, req.WorkspaceID, hashes)
	if err != nil {
		return nil, fmt.Errorf("failed to get existing files: %w", err)
	}

	var toCreate []*domain.CreateWorkspaceFileReq
	var toUpdate []*domain.UpdateWorkspaceFileReq

	// 分类处理：创建新文件或更新现有文件
	for hash, file := range fileMap {
		file.UserID = req.UserID
		file.WorkspaceID = req.WorkspaceID

		if existingFile, exists := existing[hash]; exists {
			// 文件已存在，检查是否需要更新
			if existingFile.Path != file.Path || existingFile.Language != file.Language {
				updateReq := &domain.UpdateWorkspaceFileReq{
					ID: existingFile.ID.String(),
				}
				if existingFile.Path != file.Path {
					updateReq.Content = &file.Content
				}
				if existingFile.Language != file.Language {
					updateReq.Language = &file.Language
				}
				toUpdate = append(toUpdate, updateReq)
			}
		} else {
			// 新文件，需要创建
			if file.Language == "" {
				file.Language = u.inferLanguage(file.Path)
			}
			if file.Size == 0 {
				file.Size = int64(len(file.Content))
			}
			toCreate = append(toCreate, file)
		}
	}

	resp := &domain.SyncWorkspaceFileResp{}

	// 批量创建新文件
	if len(toCreate) > 0 {
		created, err := u.repo.BatchCreate(ctx, toCreate)
		if err != nil {
			return nil, fmt.Errorf("failed to create new files: %w", err)
		}
		resp.Created = domain.FromWorkspaceFiles(created)
	}

	// 批量更新现有文件
	if len(toUpdate) > 0 {
		updated, err := u.BatchUpdate(ctx, &domain.BatchUpdateWorkspaceFileReq{Files: toUpdate})
		if err != nil {
			return nil, fmt.Errorf("failed to update existing files: %w", err)
		}
		resp.Updated = updated
	}

	resp.Total = len(resp.Created) + len(resp.Updated)

	u.logger.Info("workspace files synced",
		"created", len(resp.Created),
		"updated", len(resp.Updated),
		"total", resp.Total)

	return resp, nil
}

// 辅助方法

func (u *WorkspaceFileUsecase) calculateHash(content string) string {
	hash := sha256.Sum256([]byte(content))
	return hex.EncodeToString(hash[:])
}

func (u *WorkspaceFileUsecase) verifyHash(content, expectedHash string) bool {
	actualHash := u.calculateHash(content)
	return actualHash == expectedHash
}

func (u *WorkspaceFileUsecase) inferLanguage(path string) string {
	// 简单的文件扩展名到语言的映射
	if idx := strings.LastIndex(path, "."); idx != -1 {
		ext := strings.ToLower(path[idx+1:])
		switch ext {
		case "go":
			return "go"
		case "js", "mjs":
			return "javascript"
		case "ts":
			return "typescript"
		case "py":
			return "python"
		case "java":
			return "java"
		case "cpp", "cc", "cxx":
			return "cpp"
		case "c":
			return "c"
		case "rs":
			return "rust"
		case "php":
			return "php"
		case "rb":
			return "ruby"
		case "swift":
			return "swift"
		case "kt":
			return "kotlin"
		case "cs":
			return "csharp"
		case "sh", "bash":
			return "shell"
		case "sql":
			return "sql"
		case "yaml", "yml":
			return "yaml"
		case "json":
			return "json"
		case "xml":
			return "xml"
		case "html":
			return "html"
		case "css":
			return "css"
		case "md":
			return "markdown"
		case "toml":
			return "toml"
		case "ini":
			return "ini"
		default:
			return "text"
		}
	}
	return "text"
}
