package repo

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"

	"entgo.io/ent/dialect/sql"
	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/db/codesnippet"
	"github.com/chaitin/MonkeyCode/backend/db/predicate"
	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/google/uuid"
	pgvector "github.com/pgvector/pgvector-go"
)

type CodeSnippetRepo struct {
	client *db.Client
	logger *slog.Logger
}

func NewCodeSnippetRepo(client *db.Client, logger *slog.Logger) domain.CodeSnippetRepo {
	return &CodeSnippetRepo{
		client: client,
		logger: logger.With("repo", "codesnippet"),
	}
}

func (r *CodeSnippetRepo) Create(ctx context.Context, req *domain.CreateCodeSnippetReq) (*db.CodeSnippet, error) {
	// 将 workspaceFileID 字符串转换为 UUID
	workspaceFileUUID, err := uuid.Parse(req.WorkspaceFileID)
	if err != nil {
		r.logger.Error("failed to parse workspace file ID", "error", err, "id", req.WorkspaceFileID)
		return nil, fmt.Errorf("invalid workspace file ID: %w", err)
	}

	// 添加调试日志
	r.logger.Info("creating code snippet in database",
		"workspaceFileID", req.WorkspaceFileID,
		"workspacePath", req.WorkspacePath,
		"name", req.Name,
		"language", req.Language)

	create := r.client.CodeSnippet.Create().
		SetWorkspaceFileID(workspaceFileUUID).
		SetWorkspacePath(req.WorkspacePath).
		SetName(req.Name).
		SetSnippetType(req.SnippetType).
		SetLanguage(req.Language).
		SetContent(req.Content).
		SetHash(req.Hash).
		SetStartLine(req.StartLine).
		SetEndLine(req.EndLine).
		SetStartColumn(req.StartColumn).
		SetEndColumn(req.EndColumn).
		SetNamespace(req.Namespace).
		SetContainerName(req.ContainerName).
		SetScope(req.Scope).
		SetDependencies(req.Dependencies).
		SetParameters(req.Parameters).
		SetSignature(req.Signature).
		SetDefinitionText(req.DefinitionText).
		SetStructuredInfo(req.StructuredInfo)

	// 只有当embedding不为空时才设置嵌入字段
	if len(req.Embedding) > 0 {
		create.SetEmbedding(pgvector.NewVector(req.Embedding))
	}

	snippet, err := create.Save(ctx)
	if err != nil {
		r.logger.Error("failed to create code snippet", "error", err)
		return nil, err
	}

	return snippet, nil
}

func (r *CodeSnippetRepo) ListByWorkspaceFile(ctx context.Context, workspaceFileID string) ([]*db.CodeSnippet, error) {
	// 将 workspaceFileID 字符串转换为 UUID
	workspaceFileUUID, err := uuid.Parse(workspaceFileID)
	if err != nil {
		r.logger.Error("failed to parse workspace file ID", "error", err, "id", workspaceFileID)
		return nil, fmt.Errorf("invalid workspace file ID: %w", err)
	}

	// 查询特定工作区文件的所有代码片段
	snippets, err := r.client.CodeSnippet.Query().
		Where(codesnippet.WorkspaceFileID(workspaceFileUUID)).
		All(ctx)
	if err != nil {
		r.logger.Error("failed to list code snippets by workspace file", "error", err, "workspaceFileID", workspaceFileID)
		return nil, fmt.Errorf("failed to list code snippets: %w", err)
	}

	return snippets, nil
}

func (r *CodeSnippetRepo) GetByID(ctx context.Context, id string) (*db.CodeSnippet, error) {
	// 检查ID是否为空
	if id == "" {
		r.logger.Error("code snippet ID is empty", "id", id)
		return nil, fmt.Errorf("invalid code snippet ID: empty ID")
	}

	// 将 id 字符串转换为 UUID
	uuid, err := uuid.Parse(id)
	if err != nil {
		r.logger.Error("failed to parse code snippet ID", "error", err, "id", id)
		return nil, fmt.Errorf("invalid code snippet ID: %w", err)
	}

	// 根据 ID 获取代码片段
	snippet, err := r.client.CodeSnippet.Get(ctx, uuid)
	if err != nil {
		r.logger.Error("failed to get code snippet by ID", "error", err, "id", id)
		return nil, fmt.Errorf("failed to get code snippet: %w", err)
	}

	return snippet, nil
}

func (r *CodeSnippetRepo) Delete(ctx context.Context, id string) error {
	// 检查ID是否为空
	if id == "" {
		r.logger.Error("code snippet ID is empty", "id", id)
		return fmt.Errorf("invalid code snippet ID: empty ID")
	}

	// 将 id 字符串转换为 UUID
	uuid, err := uuid.Parse(id)
	if err != nil {
		r.logger.Error("failed to parse code snippet ID", "error", err, "id", id)
		return fmt.Errorf("invalid code snippet ID: %w", err)
	}

	// 删除代码片段
	err = r.client.CodeSnippet.DeleteOneID(uuid).Exec(ctx)
	if err != nil {
		// 如果代码片段不存在，不返回错误，因为这可能是因为并发操作导致的竞态条件
		if db.IsNotFound(err) {
			r.logger.Debug("code snippet not found, possibly due to concurrent deletion", "id", id)
			return nil
		}
		r.logger.Error("failed to delete code snippet", "error", err, "id", id)
		return fmt.Errorf("failed to delete code snippet: %w", err)
	}

	return nil
}

// Search 根据名称、类型和语言搜索代码片段
func (r *CodeSnippetRepo) Search(ctx context.Context, name, snippetType, language string) ([]*db.CodeSnippet, error) {
	// 构建查询
	query := r.client.CodeSnippet.Query()

	// 创建一个切片来存储所有谓词
	var predicates []predicate.CodeSnippet

	// 如果提供了名称参数，则添加名称过滤条件
	if name != "" {
		predicates = append(predicates, codesnippet.Name(name))
	}

	// 如果提供了类型参数，则添加类型过滤条件
	if snippetType != "" {
		predicates = append(predicates, codesnippet.SnippetType(snippetType))
	}

	// 如果提供了语言参数，则添加语言过滤条件
	if language != "" {
		predicates = append(predicates, codesnippet.Language(language))
	}

	// 如果有任何谓词，将它们添加到查询中
	if len(predicates) > 0 {
		query = query.Where(codesnippet.And(predicates...))
	}

	// 执行查询并返回结果
	return query.All(ctx)
}

// SearchByWorkspace 根据用户ID、工作区路径和搜索条件搜索代码片段
// 只有在提供了至少一个搜索条件时才返回结果，否则返回空数组
func (r *CodeSnippetRepo) SearchByWorkspace(ctx context.Context, userID, workspacePath, name, snippetType, language string) ([]*db.CodeSnippet, error) {
	// 检查是否提供了至少一个搜索条件
	if name == "" && snippetType == "" && language == "" {
		// 如果没有提供任何搜索条件，返回空结果
		return []*db.CodeSnippet{}, nil
	}

	// 直接使用 workspacePath 字段查询代码片段
	query := r.client.CodeSnippet.Query().
		Where(codesnippet.WorkspacePath(workspacePath)).
		WithSourceFile() // 预加载WorkspaceFile信息

	// 创建一个切片来存储所有谓词
	var predicates []predicate.CodeSnippet

	// 如果提供了名称参数，则添加名称过滤条件
	if name != "" {
		predicates = append(predicates, codesnippet.Name(name))
	}

	// 如果提供了类型参数，则添加类型过滤条件
	if snippetType != "" {
		predicates = append(predicates, codesnippet.SnippetType(snippetType))
	}

	// 如果提供了语言参数，则添加语言过滤条件
	if language != "" {
		predicates = append(predicates, codesnippet.Language(language))
	}

	// 添加谓词到查询中（这里总是会添加，因为我们已经检查了至少有一个条件）
	query = query.Where(codesnippet.And(predicates...))

	// 执行查询并返回结果
	return query.All(ctx)
}

// SemanticSearch performs a vector similarity search for code snippets
func (r *CodeSnippetRepo) SemanticSearch(ctx context.Context, embedding []float32, limit int) ([]*db.CodeSnippet, error) {
	// 首先检查 pgvector 扩展是否可用
	rows, err := r.client.QueryContext(ctx, "SELECT COUNT(*) FROM pg_extension WHERE extname = 'vector'")
	if err != nil {
		r.logger.Warn("failed to check pgvector extension", "error", err)
		return nil, fmt.Errorf("vector search not available: pgvector extension not installed")
	}
	defer rows.Close()

	var extensionCount int
	if rows.Next() {
		if err := rows.Scan(&extensionCount); err != nil {
			r.logger.Warn("failed to scan pgvector extension count", "error", err)
			return nil, fmt.Errorf("vector search not available: pgvector extension not installed")
		}
	}

	if extensionCount == 0 {
		r.logger.Warn("pgvector extension not available, falling back to text search")
		return nil, fmt.Errorf("vector search not available: pgvector extension not installed")
	}

	// 检查embedding是否为空
	if len(embedding) == 0 {
		r.logger.Warn("empty embedding provided for semantic search")
		return []*db.CodeSnippet{}, nil
	}

	// 构建向量相似性查询
	query := r.client.CodeSnippet.Query().
		Where(codesnippet.EmbeddingNotNil()).
		Order(func(s *sql.Selector) {
			// 使用pgvector的"<->"操作符计算余弦距离
			// 直接使用embedding，让pgvector自动处理类型
			s.OrderExpr(sql.ExprP("embedding <-> ?", pgvector.NewVector(embedding)))
		}).
		Limit(limit)

	// 执行查询并返回结果
	snippets, err := query.All(ctx)
	if err != nil {
		r.logger.Error("failed to perform semantic search", "error", err)
		return nil, fmt.Errorf("failed to perform semantic search: %w", err)
	}

	return snippets, nil
}

// SemanticSearchByWorkspace performs a vector similarity search for code snippets within a specific workspace
func (r *CodeSnippetRepo) SemanticSearchByWorkspace(ctx context.Context, userID, workspacePath string, embedding []float32, limit int) ([]*db.CodeSnippet, error) {
	// 首先检查 pgvector 扩展是否可用
	rows, err := r.client.QueryContext(ctx, "SELECT COUNT(*) FROM pg_extension WHERE extname = 'vector'")
	if err != nil {
		r.logger.Warn("failed to check pgvector extension", "error", err)
		return nil, fmt.Errorf("vector search not available: pgvector extension not installed")
	}
	defer rows.Close()

	var extensionCount int
	if rows.Next() {
		if err := rows.Scan(&extensionCount); err != nil {
			r.logger.Warn("failed to scan pgvector extension count", "error", err)
			return nil, fmt.Errorf("vector search not available: pgvector extension not installed")
		}
	}

	if extensionCount == 0 {
		r.logger.Warn("pgvector extension not available, falling back to text search")
		return nil, fmt.Errorf("vector search not available: pgvector extension not installed")
	}

	// 检查embedding是否为空
	if len(embedding) == 0 {
		r.logger.Warn("empty embedding provided for semantic search")
		return []*db.CodeSnippet{}, nil
	}

	// 使用原生SQL查询来避免Ent ORM的语法问题
	vec := pgvector.NewVector(embedding)
	vecStr := vec.String()

	// 构建原生SQL查询
	sqlQuery := `
		SELECT id, workspace_file_id, name, snippet_type, language, content, hash, 
		       start_line, end_line, start_column, end_column, namespace, container_name, 
		       scope, dependencies, parameters, signature, definition_text, structured_info, 
		       workspace_path, embedding <=> $2::vector as cosine_distance
		FROM code_snippets 
		WHERE workspace_path = $1 AND embedding IS NOT NULL
		ORDER BY embedding <=> $2::vector
		LIMIT $3
	`

	rows, err = r.client.QueryContext(ctx, sqlQuery, workspacePath, vecStr, limit)
	if err != nil {
		r.logger.Error("failed to perform semantic search by workspace", "error", err, "userID", userID, "workspacePath", workspacePath)
		return nil, fmt.Errorf("failed to perform semantic search: %w", err)
	}
	defer rows.Close()

	// 手动扫描结果
	var snippets []*db.CodeSnippet
	for rows.Next() {
		var snippet db.CodeSnippet
		var scopeBytes, dependenciesBytes, parametersBytes, structuredInfoBytes []byte
		var cosineDistance float64

		err := rows.Scan(
			&snippet.ID, &snippet.WorkspaceFileID, &snippet.Name, &snippet.SnippetType, &snippet.Language,
			&snippet.Content, &snippet.Hash, &snippet.StartLine, &snippet.EndLine, &snippet.StartColumn,
			&snippet.EndColumn, &snippet.Namespace, &snippet.ContainerName, &scopeBytes,
			&dependenciesBytes, &parametersBytes, &snippet.Signature, &snippet.DefinitionText,
			&structuredInfoBytes, &snippet.WorkspacePath, &cosineDistance,
		)
		if err != nil {
			r.logger.Error("failed to scan code snippet", "error", err)
			continue
		}

		// 解析JSON字段
		if err := json.Unmarshal(scopeBytes, &snippet.Scope); err != nil {
			r.logger.Error("failed to unmarshal scope", "error", err)
		}
		if err := json.Unmarshal(dependenciesBytes, &snippet.Dependencies); err != nil {
			r.logger.Error("failed to unmarshal dependencies", "error", err)
		}
		if err := json.Unmarshal(parametersBytes, &snippet.Parameters); err != nil {
			r.logger.Error("failed to unmarshal parameters", "error", err)
		}
		if err := json.Unmarshal(structuredInfoBytes, &snippet.StructuredInfo); err != nil {
			r.logger.Error("failed to unmarshal structuredInfo", "error", err)
		}

		// 将相似度评分添加到结构化信息中
		if snippet.StructuredInfo == nil {
			snippet.StructuredInfo = make(map[string]interface{})
		}
		snippet.StructuredInfo["cosine_distance"] = cosineDistance
		snippet.StructuredInfo["similarity_score"] = 1.0 - cosineDistance // 转换为余弦相似度（0-1范围）

		snippets = append(snippets, &snippet)
	}

	if err = rows.Err(); err != nil {
		r.logger.Error("error iterating over rows", "error", err)
		return nil, fmt.Errorf("failed to iterate over rows: %w", err)
	}

	return snippets, nil
}
