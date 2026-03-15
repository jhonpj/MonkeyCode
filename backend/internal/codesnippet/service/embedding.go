package service

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/chaitin/MonkeyCode/backend/config"
	"github.com/chaitin/MonkeyCode/backend/domain"
)

// EmbeddingService 定义向量嵌入服务接口
type EmbeddingService interface {
	// GenerateEmbedding 为代码片段生成向量嵌入
	GenerateEmbedding(ctx context.Context, snippet *domain.CodeSnippet) ([]float32, error)

	// GenerateEmbeddingFromContent 为代码内容生成向量嵌入
	GenerateEmbeddingFromContent(ctx context.Context, content string) ([]float32, error)
}

// OpenAIEmbeddingService 实现向量嵌入服务
type OpenAIEmbeddingService struct {
	config *config.Config
}

// NewOpenAIEmbeddingService 创建新的向量嵌入服务实例
func NewOpenAIEmbeddingService(cfg *config.Config) EmbeddingService {
	return &OpenAIEmbeddingService{
		config: cfg,
	}
}

// GenerateEmbedding 为代码片段生成向量嵌入
func (s *OpenAIEmbeddingService) GenerateEmbedding(ctx context.Context, snippet *domain.CodeSnippet) ([]float32, error) {
	// 只使用content生成embedding
	content := snippet.Content
	return s.GenerateEmbeddingFromContent(ctx, content)
}

// GenerateEmbeddingFromContent 为代码内容生成向量嵌入
func (s *OpenAIEmbeddingService) GenerateEmbeddingFromContent(ctx context.Context, content string) ([]float32, error) {
	// 检查配置是否完整
	if s.config.Embedding.APIEndpoint == "" {
		return nil, fmt.Errorf("embedding API endpoint not configured")
	}
	if s.config.Embedding.APIKey == "" {
		return nil, fmt.Errorf("embedding API key not configured")
	}
	if s.config.Embedding.ModelName == "" {
		return nil, fmt.Errorf("embedding model name not configured")
	}

	// 构造请求体
	requestBody := map[string]interface{}{
		"input": content,
		"model": s.config.Embedding.ModelName,
	}

	// 将请求体序列化为JSON
	jsonBody, err := json.Marshal(requestBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	// 创建HTTP请求
	req, err := http.NewRequestWithContext(ctx, "POST", s.config.Embedding.APIEndpoint, bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, fmt.Errorf("failed to create HTTP request: %w", err)
	}

	// 设置请求头
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+s.config.Embedding.APIKey)

	// 创建带超时的HTTP客户端
	client := &http.Client{
		Timeout: 30 * time.Second, // 30秒超时
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send HTTP request: %w", err)
	}
	defer resp.Body.Close()

	// 读取响应体
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	// 检查响应状态码
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code %d: %s", resp.StatusCode, string(body))
	}

	// 解析响应
	var embeddingResponse struct {
		Data []struct {
			Embedding []float32 `json:"embedding"`
		} `json:"data"`
	}

	if err := json.Unmarshal(body, &embeddingResponse); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	// 检查是否有嵌入向量返回
	if len(embeddingResponse.Data) == 0 || len(embeddingResponse.Data[0].Embedding) == 0 {
		return nil, fmt.Errorf("no embedding data returned from API")
	}

	// 直接返回float32数组
	return embeddingResponse.Data[0].Embedding, nil
}
