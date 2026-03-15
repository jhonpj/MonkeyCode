package domain

import (
	"context"

	"github.com/GoYoko/web"

	"github.com/chaitin/MonkeyCode/backend/db"
)

// WorkspaceUsecase 定义 Workspace 业务逻辑接口
type WorkspaceUsecase interface {
	Create(ctx context.Context, req *CreateWorkspaceReq) (*Workspace, error)
	GetByID(ctx context.Context, id string) (*Workspace, error)
	GetByUserAndPath(ctx context.Context, userID, rootPath string) (*Workspace, error)
	List(ctx context.Context, req *ListWorkspaceReq) (*ListWorkspaceResp, error)
	Update(ctx context.Context, req *UpdateWorkspaceReq) (*Workspace, error)
	Delete(ctx context.Context, id string) error
	EnsureWorkspace(ctx context.Context, userID, rootPath, name string) (*Workspace, error)
}

// WorkspaceRepo 定义 Workspace 数据访问接口
type WorkspaceRepo interface {
	Create(ctx context.Context, req *CreateWorkspaceReq) (*db.Workspace, error)
	GetByID(ctx context.Context, id string) (*db.Workspace, error)
	GetByUserAndPath(ctx context.Context, userID, rootPath string) (*db.Workspace, error)
	List(ctx context.Context, req *ListWorkspaceReq) ([]*db.Workspace, *db.PageInfo, error)
	Update(ctx context.Context, id string, fn func(*db.WorkspaceUpdateOne) error) (*db.Workspace, error)
	Delete(ctx context.Context, id string) error
}

// WorkspaceFileUsecase 定义 WorkspaceFile 业务逻辑接口
type WorkspaceFileUsecase interface {
	Create(ctx context.Context, req *CreateWorkspaceFileReq) (*WorkspaceFile, error)
	Update(ctx context.Context, req *UpdateWorkspaceFileReq) (*WorkspaceFile, error)
	Delete(ctx context.Context, id string) error
	GetAndSave(ctx context.Context, req *GetAndSaveReq) error
	GetByID(ctx context.Context, id string) (*WorkspaceFile, error)
	GetByPath(ctx context.Context, userID, workspaceID, path string) (*WorkspaceFile, error)
	List(ctx context.Context, req *ListWorkspaceFileReq) (*ListWorkspaceFileResp, error)
	BatchCreate(ctx context.Context, req *BatchCreateWorkspaceFileReq) ([]*WorkspaceFile, error)
	BatchUpdate(ctx context.Context, req *BatchUpdateWorkspaceFileReq) ([]*WorkspaceFile, error)
	Sync(ctx context.Context, req *SyncWorkspaceFileReq) (*SyncWorkspaceFileResp, error)
}

// WorkspaceFileRepo 定义 WorkspaceFile 数据访问接口
type WorkspaceFileRepo interface {
	Create(ctx context.Context, req *CreateWorkspaceFileReq) (*db.WorkspaceFile, error)
	Update(ctx context.Context, id string, fn func(*db.WorkspaceFileUpdateOne) error) (*db.WorkspaceFile, error)
	Delete(ctx context.Context, id string) error
	GetByID(ctx context.Context, id string) (*db.WorkspaceFile, error)
	GetByPath(ctx context.Context, userID, workspaceID, path string) (*db.WorkspaceFile, error)
	List(ctx context.Context, req *ListWorkspaceFileReq) ([]*db.WorkspaceFile, *db.PageInfo, error)
	BatchCreate(ctx context.Context, files []*CreateWorkspaceFileReq) ([]*db.WorkspaceFile, error)
	GetByHashes(ctx context.Context, workspaceID string, hashes []string) (map[string]*db.WorkspaceFile, error)
	CountByWorkspace(ctx context.Context, workspaceID string) (int64, error)
	GetWorkspaceFiles(ctx context.Context, workspaceID string) ([]*db.WorkspaceFile, error)
}

// 请求结构体

type CreateWorkspaceReq struct {
	UserID      string         `json:"user_id" validate:"required"`   // 用户ID
	Name        string         `json:"name" validate:"required"`      // 工作区名称
	Description string         `json:"description"`                   // 工作区描述
	RootPath    string         `json:"root_path" validate:"required"` // 工作区根路径
	Settings    map[string]any `json:"settings"`                      // 工作区设置
}

type UpdateWorkspaceReq struct {
	ID          string         `json:"id" validate:"required"` // 工作区ID
	Name        *string        `json:"name"`                   // 工作区名称
	Description *string        `json:"description"`            // 工作区描述
	Settings    map[string]any `json:"settings"`               // 工作区设置
}

type ListWorkspaceReq struct {
	*web.Pagination
	UserID   string `json:"user_id" query:"user_id"`     // 用户ID
	Search   string `json:"search" query:"search"`       // 搜索关键词（工作区名称或描述）
	RootPath string `json:"root_path" query:"root_path"` // 根路径筛选
}

type CreateWorkspaceFileReq struct {
	UserID      string `json:"user_id" validate:"required"`      // 用户ID
	WorkspaceID string `json:"workspace_id" validate:"required"` // 工作区ID
	Path        string `json:"path" validate:"required"`         // 文件路径
	Content     string `json:"content"`                          // 文件内容
	Hash        string `json:"hash" validate:"required"`         // 文件哈希
	Language    string `json:"language"`                         // 编程语言
	Size        int64  `json:"size"`                             // 文件大小
}

type UpdateWorkspaceFileReq struct {
	ID       string  `json:"id" validate:"required"` // 文件ID
	Content  *string `json:"content"`                // 文件内容
	Hash     *string `json:"hash"`                   // 文件哈希
	Language *string `json:"language"`               // 编程语言
	Size     *int64  `json:"size"`                   // 文件大小
}

type ListWorkspaceFileReq struct {
	*web.Pagination
	UserID      string `json:"user_id" query:"user_id"`           // 用户ID
	WorkspaceID string `json:"workspace_id" query:"workspace_id"` // 工作区ID
	Language    string `json:"language" query:"language"`         // 编程语言筛选
	Search      string `json:"search" query:"search"`             // 搜索关键词（文件路径）
}

type BatchCreateWorkspaceFileReq struct {
	UserID      string                    `json:"user_id" validate:"required"`      // 用户ID
	WorkspaceID string                    `json:"workspace_id" validate:"required"` // 工作区ID
	Files       []*CreateWorkspaceFileReq `json:"files" validate:"required,dive"`   // 文件列表
}

type BatchUpdateWorkspaceFileReq struct {
	Files []*UpdateWorkspaceFileReq `json:"files" validate:"required,dive"` // 文件列表
}

type SyncWorkspaceFileReq struct {
	UserID      string                    `json:"user_id" validate:"required"`      // 用户ID
	WorkspaceID string                    `json:"workspace_id" validate:"required"` // 工作区ID
	Files       []*CreateWorkspaceFileReq `json:"files" validate:"required,dive"`   // 要同步的文件列表
}

type GetAndSaveReq struct {
	FileMetas   []FileMeta `json:"code_files"   validate:"required"` // 代码文件信息
	UserID      string     `json:"user_id"      validate:"required"` // 用户ID
	WorkspaceID string     `json:"workspace_id" validate:"required"` // 项目ID
}

// 响应结构体

type ListWorkspaceResp struct {
	*db.PageInfo
	Workspaces []*Workspace `json:"workspaces"`
}

type ListWorkspaceFileResp struct {
	*db.PageInfo
	Files []*WorkspaceFile `json:"files"`
}

type SyncWorkspaceFileResp struct {
	Created []*WorkspaceFile `json:"created"` // 新创建的文件
	Updated []*WorkspaceFile `json:"updated"` // 更新的文件
	Deleted []string         `json:"deleted"` // 删除的文件ID
	Total   int              `json:"total"`   // 处理的文件总数
}

// 数据模型

type Workspace struct {
	ID             string         `json:"id"`               // 工作区ID
	UserID         string         `json:"user_id"`          // 用户ID
	Name           string         `json:"name"`             // 工作区名称
	Description    string         `json:"description"`      // 工作区描述
	RootPath       string         `json:"root_path"`        // 工作区根路径
	Settings       map[string]any `json:"settings"`         // 工作区设置
	LastAccessedAt int64          `json:"last_accessed_at"` // 最后访问时间
	CreatedAt      int64          `json:"created_at"`       // 创建时间
	UpdatedAt      int64          `json:"updated_at"`       // 更新时间
}

type WorkspaceFile struct {
	ID          string `json:"id"`           // 文件ID
	UserID      string `json:"user_id"`      // 用户ID
	WorkspaceID string `json:"workspace_id"` // 工作区ID
	Path        string `json:"path"`         // 文件路径
	Content     string `json:"content"`      // 文件内容
	Hash        string `json:"hash"`         // 文件哈希
	Language    string `json:"language"`     // 编程语言
	Size        int64  `json:"size"`         // 文件大小
	CreatedAt   int64  `json:"created_at"`   // 创建时间
	UpdatedAt   int64  `json:"updated_at"`   // 更新时间
}

type CodeLanguageType string

const (
	CodeLanguageTypeGo         CodeLanguageType = "go"
	CodeLanguageTypePython     CodeLanguageType = "python"
	CodeLanguageTypeJava       CodeLanguageType = "java"
	CodeLanguageTypeJavaScript CodeLanguageType = "javascript"
	CodeLanguageTypeTypeScript CodeLanguageType = "typescript"
	CodeLanguageTypeJSX        CodeLanguageType = "jsx"
	CodeLanguageTypeTSX        CodeLanguageType = "tsx"
	CodeLanguageTypeHTML       CodeLanguageType = "html"
	CodeLanguageTypeCSS        CodeLanguageType = "css"
	CodeLanguageTypePHP        CodeLanguageType = "php"
	CodeLanguageTypeRust       CodeLanguageType = "rust"
	CodeLanguageTypeSwift      CodeLanguageType = "swift"
	CodeLanguageTypeKotlin     CodeLanguageType = "kotlin"
	CodeLanguageTypeC          CodeLanguageType = "c"
	CodeLanguageTypeCpp        CodeLanguageType = "cpp"
)

type CodeFiles struct {
	Files []FileMeta `json:"files"`
}
type FileMeta struct {
	FilePath      string           `json:"filePath"`
	FileExtension string           `json:"fileExtension"`
	Language      CodeLanguageType `json:"language"` // 语言类型（可选）
	FileHash      string           `json:"fileHash"` // 文件哈希（可选）
	Content       string           `json:"content"`  // 文件内容（可选）
}
type IndexResult struct {
	Name           string `json:"name"`
	Type           string `json:"type"`
	FilePath       string `json:"filePath"`
	StartLine      int    `json:"startLine"`
	EndLine        int    `json:"endLine"`
	RangeText      string `json:"rangeText"`
	DefinitionText string `json:"definitionText"`
	Scope          any    `json:"scope"`
	FileHash       string `json:"fileHash"`
	Definition     struct {
		Name       string `json:"name"`
		Type       string `json:"type"`
		ReturnType string `json:"returnType"`
	} `json:"definition"`
	Signature     string `json:"signature"`
	Language      string `json:"language"`
	ImplementText string `json:"implementText"`
}

func (w *Workspace) From(e *db.Workspace) *Workspace {
	if e == nil {
		return w
	}

	w.ID = e.ID.String()
	w.UserID = e.UserID.String()
	w.Name = e.Name
	w.Description = e.Description
	w.RootPath = e.RootPath
	w.Settings = e.Settings
	w.LastAccessedAt = e.LastAccessedAt.Unix()
	w.CreatedAt = e.CreatedAt.Unix()
	w.UpdatedAt = e.UpdatedAt.Unix()

	return w
}

func (w *WorkspaceFile) From(e *db.WorkspaceFile) *WorkspaceFile {
	if e == nil {
		return w
	}

	w.ID = e.ID.String()
	w.UserID = e.UserID.String()
	w.WorkspaceID = e.WorkspaceID.String()
	w.Path = e.Path
	w.Content = e.Content
	w.Hash = e.Hash
	w.Language = e.Language
	w.Size = e.Size
	w.CreatedAt = e.CreatedAt.Unix()
	w.UpdatedAt = e.UpdatedAt.Unix()

	return w
}

// 工具函数
func FromWorkspaces(workspaces []*db.Workspace) []*Workspace {
	result := make([]*Workspace, len(workspaces))
	for i, e := range workspaces {
		result[i] = (&Workspace{}).From(e)
	}
	return result
}

func FromWorkspaceFiles(files []*db.WorkspaceFile) []*WorkspaceFile {
	result := make([]*WorkspaceFile, len(files))
	for i, e := range files {
		result[i] = (&WorkspaceFile{}).From(e)
	}
	return result
}
