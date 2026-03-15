package domain

import (
	"context"

	"github.com/chaitin/MonkeyCode/backend/db"
)

// CodeSnippetUsecase 定义 CodeSnippet 业务逻辑接口
type CodeSnippetUsecase interface {
	CreateFromIndexResult(ctx context.Context, workspaceFileID string, indexResult *IndexResult, workspacePath string) (*CodeSnippet, error)
	ListByWorkspaceFile(ctx context.Context, workspaceFileID string) ([]*CodeSnippet, error)
	GetByID(ctx context.Context, id string) (*CodeSnippet, error)
	Delete(ctx context.Context, id string) error
	Search(ctx context.Context, name, snippetType, language string) ([]*CodeSnippet, error)
	SearchByWorkspace(ctx context.Context, userID, workspacePath, name, snippetType, language string) ([]*CodeSnippet, error)
	SemanticSearch(ctx context.Context, embedding []float32, limit int) ([]*CodeSnippet, error)
	SemanticSearchByWorkspace(ctx context.Context, userID, workspacePath string, embedding []float32, limit int) ([]*CodeSnippet, error)
}

// CodeSnippetRepo 定义 CodeSnippet 数据访问接口
type CodeSnippetRepo interface {
	Create(ctx context.Context, req *CreateCodeSnippetReq) (*db.CodeSnippet, error)
	ListByWorkspaceFile(ctx context.Context, workspaceFileID string) ([]*db.CodeSnippet, error)
	GetByID(ctx context.Context, id string) (*db.CodeSnippet, error)
	Delete(ctx context.Context, id string) error
	Search(ctx context.Context, name, snippetType, language string) ([]*db.CodeSnippet, error)
	SearchByWorkspace(ctx context.Context, userID, workspacePath, name, snippetType, language string) ([]*db.CodeSnippet, error)
	SemanticSearch(ctx context.Context, embedding []float32, limit int) ([]*db.CodeSnippet, error)
	SemanticSearchByWorkspace(ctx context.Context, userID, workspacePath string, embedding []float32, limit int) ([]*db.CodeSnippet, error)
}

// 请求结构体
type CreateCodeSnippetReq struct {
	WorkspaceFileID string           `json:"workspace_file_id" validate:"required"` // 关联的workspace file ID
	WorkspacePath   string           `json:"workspace_path"`                        // 工作区路径
	Name            string           `json:"name"`                                  // 代码片段名称
	SnippetType     string           `json:"snippet_type"`                          // 代码片段类型 (function, class, variable, etc.)
	Language        string           `json:"language"`                              // 编程语言
	Content         string           `json:"content"`                               // 代码片段内容
	Hash            string           `json:"hash"`                                  // 内容哈希
	StartLine       int              `json:"start_line"`                            // 起始行号
	EndLine         int              `json:"end_line"`                              // 结束行号
	StartColumn     int              `json:"start_column"`                          // 起始列号
	EndColumn       int              `json:"end_column"`                            // 结束列号
	Namespace       string           `json:"namespace"`                             // 命名空间
	ContainerName   string           `json:"container_name"`                        // 容器名称 (类名、模块名等)
	Scope           []string         `json:"scope"`                                 // 作用域信息
	Dependencies    []string         `json:"dependencies"`                          // 依赖项
	Parameters      []map[string]any `json:"parameters"`                            // 参数列表
	Signature       string           `json:"signature"`                             // 函数签名
	DefinitionText  string           `json:"definition_text"`                       // 定义文本
	StructuredInfo  map[string]any   `json:"structured_info"`                       // 结构化信息
	Embedding       []float32        `json:"embedding,omitempty"`                   // 向量嵌入
}

// 数据模型
type CodeSnippet struct {
	ID              string           `json:"id"`                  // 代码片段ID
	WorkspaceFileID string           `json:"workspace_file_id"`   // 关联的workspace file ID
	Name            string           `json:"name"`                // 代码片段名称
	SnippetType     string           `json:"type"`                // 代码片段类型
	Language        string           `json:"language"`            // 编程语言
	Content         string           `json:"rangeText"`           // 代码片段内容
	Hash            string           `json:"fileHash"`            // 内容哈希
	StartLine       int              `json:"startLine"`           // 起始行号
	EndLine         int              `json:"endLine"`             // 结束行号
	StartColumn     int              `json:"startColumn"`         // 起始列号
	EndColumn       int              `json:"endColumn"`           // 结束列号
	FilePath        string           `json:"filePath"`            // 文件路径
	Namespace       string           `json:"namespace"`           // 命名空间
	ContainerName   string           `json:"field"`               // 容器名称
	Scope           []string         `json:"scope"`               // 作用域信息
	Dependencies    []string         `json:"dependencies"`        // 依赖项
	Parameters      []map[string]any `json:"parameters"`          // 参数列表
	Signature       string           `json:"signature"`           // 函数签名
	DefinitionText  string           `json:"definitionText"`      // 定义文本
	StructuredInfo  map[string]any   `json:"definition"`          // 结构化信息
	Embedding       []float32        `json:"embedding,omitempty"` // 向量嵌入
}

func (c *CodeSnippet) From(e *db.CodeSnippet) *CodeSnippet {
	if e == nil {
		return c
	}

	c.ID = e.ID.String()
	c.WorkspaceFileID = e.WorkspaceFileID.String()
	c.Name = e.Name
	c.SnippetType = e.SnippetType
	c.Language = e.Language
	c.Content = e.Content
	c.Hash = e.Hash
	c.StartLine = e.StartLine
	c.EndLine = e.EndLine
	c.StartColumn = e.StartColumn
	c.EndColumn = e.EndColumn
	c.Namespace = e.Namespace
	c.ContainerName = e.ContainerName
	c.Scope = e.Scope
	c.Dependencies = e.Dependencies
	c.Parameters = e.Parameters
	c.Signature = e.Signature
	c.DefinitionText = e.DefinitionText
	c.StructuredInfo = e.StructuredInfo

	// 检查embedding是否为空，避免空指针引用
	embeddingSlice := e.Embedding.Slice()
	if len(embeddingSlice) > 0 {
		c.Embedding = embeddingSlice
	} else {
		c.Embedding = []float32{}
	}

	return c
}

// 从包含WorkspaceFile信息的CodeSnippet创建domain对象
func (c *CodeSnippet) FromWithFile(e *db.CodeSnippet) *CodeSnippet {
	if e == nil {
		return c
	}

	c.From(e)

	// 设置文件路径
	if e.Edges.SourceFile != nil {
		c.FilePath = e.Edges.SourceFile.Path
		c.WorkspaceFileID = e.Edges.SourceFile.Path
	}

	return c
}

// 工具函数
func FromCodeSnippets(snippets []*db.CodeSnippet) []*CodeSnippet {
	result := make([]*CodeSnippet, len(snippets))
	for i, e := range snippets {
		result[i] = (&CodeSnippet{}).From(e)
	}
	return result
}
