package v1

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/GoYoko/web"

	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/internal/codesnippet/service"
	"github.com/chaitin/MonkeyCode/backend/internal/middleware"
	"github.com/chaitin/MonkeyCode/backend/pkg/logger"
)

type CodeSnippetHandler struct {
	usecase   domain.CodeSnippetUsecase
	embedding service.EmbeddingService
	logger    *slog.Logger
}

func NewCodeSnippetHandler(
	w *web.Web,
	usecase domain.CodeSnippetUsecase,
	embeddingService service.EmbeddingService,
	auth *middleware.AuthMiddleware,
	active *middleware.ActiveMiddleware,
	readonly *middleware.ReadOnlyMiddleware,
	proxy *middleware.ProxyMiddleware,
	logger *slog.Logger,
) *CodeSnippetHandler {
	h := &CodeSnippetHandler{
		usecase:   usecase,
		embedding: embeddingService,
		logger:    logger.With("handler", "codesnippet"),
	}

	// 设置路由 - 使用API Key认证的接口（IDE端使用）
	ide := w.Group("/api/v1/ide/codesnippet")
	ide.Use(proxy.Auth(), active.Active("apikey"), readonly.Guard())

	// IDE端上下文检索接口
	ide.POST("/context", web.BindHandler(h.GetContext))

	// IDE端语义搜索接口
	ide.POST("/semantic", web.BindHandler(h.GetSemanticContext))

	return h
}

// GetContextReq IDE端上下文检索请求
type GetContextReq struct {
	// 批量查询参数
	Queries []Query `json:"queries,omitempty"` // 批量查询条件

	// 单个查询参数
	Query Query `json:"query,omitempty"` // 单个查询条件

	Limit         int    `json:"limit"`         // 返回结果数量限制，默认10
	WorkspacePath string `json:"workspacePath"` // 工作区路径（必填）
}

// Query 批量查询条件
type Query struct {
	Name        string `json:"name,omitempty"`        // 代码片段名称（可选）
	SnippetType string `json:"snippetType,omitempty"` // 代码片段类型（可选）
	Language    string `json:"language,omitempty"`    // 编程语言（可选）
}

// GetSemanticContextReq IDE端语义搜索请求
type GetSemanticContextReq struct {
	Query         string `json:"query"`         // 搜索查询文本（必填）
	WorkspacePath string `json:"workspacePath"` // 工作区路径（必填）
	Limit         int    `json:"limit"`         // 返回结果数量限制，默认10
}

// GetContext IDE端上下文检索接口
//
//	@Tags			CodeSnippet
//	@Summary		IDE端上下文检索
//	@Description	为IDE端提供代码片段上下文检索功能，使用API Key认证。支持单个查询和批量查询。
//	@ID				get-context
//	@Accept			json
//	@Produce		json
//	@Param			request	body		GetContextReq	true	"检索请求参数"
//	@Success		200		{object}	web.Resp{data=[]domain.CodeSnippet}
//	@Router			/api/v1/ide/codesnippet/context [post]
//	@Security		ApiKeyAuth
func (h *CodeSnippetHandler) GetContext(c *web.Context, req GetContextReq) error {
	h.logger.Info("GetContext called", "request", req)

	// 设置默认限制
	if req.Limit <= 0 {
		req.Limit = 10
	}
	if req.Limit > 50 {
		req.Limit = 50
	}

	// 提取workspacePath变量
	workspacePath := req.WorkspacePath

	// 如果没有提供workspacePath，则返回错误
	if workspacePath == "" {
		h.logger.Warn("Workspace path is required but not provided")
		return fmt.Errorf("workspacePath is required")
	}

	// 获取用户ID，主要使用API Key认证
	var userID string
	if ctxUserID := c.Request().Context().Value(logger.UserIDKey{}); ctxUserID != nil {
		userID = ctxUserID.(string)
	} else {
		h.logger.Error("API Key authentication required for IDE context retrieval")
		return fmt.Errorf("API Key authentication required")
	}

	var allSnippets []*domain.CodeSnippet

	// 如果提供了批量查询条件，则执行批量查询
	if len(req.Queries) > 0 {
		// 执行批量查询
		for _, query := range req.Queries {
			snippets, err := h.usecase.SearchByWorkspace(c.Request().Context(), userID, workspacePath, query.Name, query.SnippetType, query.Language)
			if err != nil {
				h.logger.Error("failed to get context for IDE", "error", err)
				return err
			}
			allSnippets = append(allSnippets, snippets...)
		}
	} else {
		// 执行单个查询
		snippets, err := h.usecase.SearchByWorkspace(c.Request().Context(), userID, workspacePath, req.Query.Name, req.Query.SnippetType, req.Query.Language)
		if err != nil {
			h.logger.Error("failed to get context for IDE", "error", err)
			return err
		}
		allSnippets = snippets
	}

	// 限制返回结果数量
	if len(allSnippets) > req.Limit {
		allSnippets = allSnippets[:req.Limit]
	}
	h.logger.Info("Returning context for IDE", "count", len(allSnippets))
	return c.Success(allSnippets)
}

// GetSemanticContext IDE端语义搜索接口
//
//	@Tags			CodeSnippet
//	@Summary		IDE端语义搜索
//	@Description	为IDE端提供代码片段语义搜索功能，使用API Key认证。通过向量相似性搜索找到相关的代码片段。
//	@ID				get-semantic-context
//	@Accept			json
//	@Produce		json
//	@Param			request	body		GetSemanticContextReq	true	"语义搜索请求参数"
//	@Success		200		{object}	web.Resp{data=[]domain.CodeSnippet}
//	@Router			/api/v1/ide/codesnippet/semantic [post]
//	@Security		ApiKeyAuth
func (h *CodeSnippetHandler) GetSemanticContext(c *web.Context, req GetSemanticContextReq) error {
	h.logger.Info("GetSemanticContext called", "request", req)

	// 设置默认限制
	if req.Limit <= 0 {
		req.Limit = 10
	}
	if req.Limit > 50 {
		req.Limit = 50
	}

	// 检查必需参数
	if req.Query == "" {
		h.logger.Warn("Query is required but not provided")
		return fmt.Errorf("query is required")
	}

	if req.WorkspacePath == "" {
		h.logger.Warn("Workspace path is required but not provided")
		return fmt.Errorf("workspacePath is required")
	}

	// 获取用户ID，主要使用API Key认证
	var userID string
	if ctxUserID := c.Request().Context().Value(logger.UserIDKey{}); ctxUserID != nil {
		userID = ctxUserID.(string)
	} else {
		h.logger.Error("API Key authentication required for IDE semantic search")
		return fmt.Errorf("API Key authentication required")
	}

	// 生成查询文本的向量嵌入
	embedding, err := h.generateEmbeddingFromQuery(c.Request().Context(), req.Query)
	if err != nil {
		h.logger.Error("failed to generate embedding for query", "error", err, "query", req.Query)
		return fmt.Errorf("failed to generate embedding: %w", err)
	}

	// 执行语义搜索
	snippets, err := h.usecase.SemanticSearchByWorkspace(c.Request().Context(), userID, req.WorkspacePath, embedding, req.Limit)
	if err != nil {
		h.logger.Error("failed to perform semantic search", "error", err)
		return err
	}

	h.logger.Info("Returning semantic search results", "count", len(snippets))
	return c.Success(snippets)
}

// generateEmbeddingFromQuery 为查询文本生成向量嵌入
func (h *CodeSnippetHandler) generateEmbeddingFromQuery(ctx context.Context, query string) ([]float32, error) {
	// 直接调用embedding服务生成向量
	return h.embedding.GenerateEmbeddingFromContent(ctx, query)
}
