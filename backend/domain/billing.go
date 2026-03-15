package domain

import (
	"context"

	"github.com/GoYoko/web"

	"github.com/chaitin/MonkeyCode/backend/consts"
	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/pkg/cvt"
)

type BillingUsecase interface {
	ListChatRecord(ctx context.Context, req ListRecordReq) (*ListChatRecordResp, error)
	ListCompletionRecord(ctx context.Context, req ListRecordReq) (*ListCompletionRecordResp, error)
	CompletionInfo(ctx context.Context, id, userID string) (*CompletionInfo, error)
	ChatInfo(ctx context.Context, id, userID string) (*ChatInfo, error)
}

type BillingRepo interface {
	ListChatRecord(ctx context.Context, req ListRecordReq) (*ListChatRecordResp, error)
	ListCompletionRecord(ctx context.Context, req ListRecordReq) (*ListCompletionRecordResp, error)
	CompletionInfo(ctx context.Context, id, userID string) (*CompletionInfo, error)
	ChatInfo(ctx context.Context, id, userID string) (*ChatInfo, error)
}

type ListRecordReq struct {
	*web.Pagination
	UserID   string `json:"-"`
	Author   string `json:"author" query:"author"`       // 作者
	Language string `json:"language" query:"language"`   // 语言
	WorkMode string `json:"work_mode" query:"work_mode"` // 工作模式
	IsAccept *bool  `json:"is_accept" query:"is_accept"` // 是否接受筛选
}

type ListChatRecordResp struct {
	*db.PageInfo

	Records []*ChatRecord `json:"records"`
}

type ListCompletionRecordResp struct {
	*db.PageInfo

	Records []*CompletionRecord `json:"records"`
}

type ChatRecord struct {
	ID           string `json:"id"`            // 记录ID
	User         *User  `json:"user"`          // 用户
	Model        *Model `json:"model"`         // 模型
	Question     string `json:"question"`      // 问题
	WorkMode     string `json:"work_mode"`     // 工作模式
	InputTokens  int64  `json:"input_tokens"`  // 输入token
	OutputTokens int64  `json:"output_tokens"` // 输出token
	CreatedAt    int64  `json:"created_at"`    // 创建时间
}

func (c *ChatRecord) From(e *db.Task) *ChatRecord {
	if e == nil {
		return c
	}
	c.ID = e.TaskID
	if len(e.Edges.TaskRecords) > 0 {
		c.Question = e.Edges.TaskRecords[0].Prompt
	}
	c.User = cvt.From(e.Edges.User, &User{})
	c.Model = cvt.From(e.Edges.Model, &Model{})
	c.WorkMode = e.WorkMode
	c.InputTokens = e.InputTokens
	c.OutputTokens = e.OutputTokens
	c.CreatedAt = e.CreatedAt.Unix()
	return c
}

type CompletionRecord struct {
	ID              string `json:"id"`               // 记录ID
	User            *User  `json:"user"`             // 用户
	IsAccept        bool   `json:"is_accept"`        // 是否采纳
	ProgramLanguage string `json:"program_language"` // 编程语言
	InputTokens     int64  `json:"input_tokens"`     // 输入token
	OutputTokens    int64  `json:"output_tokens"`    // 输出token
	CreatedAt       int64  `json:"created_at"`       // 创建时间
}

func (c *CompletionRecord) From(e *db.Task) *CompletionRecord {
	if e == nil {
		return c
	}
	c.ID = e.TaskID
	c.IsAccept = e.IsAccept
	c.User = cvt.From(e.Edges.User, &User{})
	c.ProgramLanguage = e.ProgramLanguage
	c.InputTokens = e.InputTokens
	c.OutputTokens = e.OutputTokens
	c.CreatedAt = e.CreatedAt.Unix()
	return c
}

type CompletionInfo struct {
	ID        string `json:"id"`
	Prompt    string `json:"prompt"`
	Content   string `json:"content"`
	CreatedAt int64  `json:"created_at"`
}

func (c *CompletionInfo) From(e *db.Task) *CompletionInfo {
	if e == nil {
		return c
	}
	c.ID = e.TaskID
	if len(e.Edges.TaskRecords) > 0 {
		c.Prompt = e.Edges.TaskRecords[0].Prompt
		c.Content = e.Edges.TaskRecords[0].Completion
	}
	c.CreatedAt = e.CreatedAt.Unix()
	return c
}

type ChatContent struct {
	Role      consts.ChatRole `json:"role"`    // 角色，如user: 用户的提问 assistant: 机器人回复 system: 系统消息
	Content   string          `json:"content"` // 内容
	CreatedAt int64           `json:"created_at"`
}

func (c *ChatContent) From(e *db.TaskRecord) *ChatContent {
	if e == nil {
		return c
	}
	c.Role = e.Role
	switch e.Role {
	case consts.ChatRoleUser:
		c.Content = e.Prompt
	case consts.ChatRoleAssistant:
		c.Content = e.Completion
	case consts.ChatRoleSystem:
		c.Content = e.Completion
	}
	c.CreatedAt = e.CreatedAt.Unix()
	return c
}

type ChatInfo struct {
	ID       string         `json:"id"`
	Contents []*ChatContent `json:"contents"` // 消息内容
}

func (c *ChatInfo) From(e *db.Task) *ChatInfo {
	if e == nil {
		return c
	}
	c.ID = e.TaskID
	c.Contents = cvt.Iter(e.Edges.TaskRecords, func(_ int, r *db.TaskRecord) *ChatContent {
		return cvt.From(r, &ChatContent{})
	})
	c.Contents = cvt.Filter(c.Contents, func(_ int, r *ChatContent) (*ChatContent, bool) {
		return r, r.Content != ""
	})
	return c
}

type BillingUsage struct {
	ID        string `json:"id"`
	CreatedAt int64  `json:"created_at"`
	UpdatedAt int64  `json:"updated_at"`
	UserID    string `json:"user_id"`
	ModelName string `json:"model_name"`
	Tokens    int64  `json:"tokens"`
	Operation string `json:"operation"`
}

type BillingQuota struct {
	ID        string `json:"id"`
	CreatedAt int64  `json:"created_at"`
	UpdatedAt int64  `json:"updated_at"`
	UserID    string `json:"user_id"`
	Total     int64  `json:"total"`
	Used      int64  `json:"used"`
	Remain    int64  `json:"remain"`
}

func (b *BillingQuota) From(e *db.BillingQuota) *BillingQuota {
	if e == nil {
		return b
	}
	b.ID = e.ID
	b.UserID = e.UserID
	b.Total = e.Total
	b.Used = e.Used
	b.Remain = e.Remain
	b.CreatedAt = e.CreatedAt.Unix()
	b.UpdatedAt = e.UpdatedAt.Unix()
	return b
}

type ApiKey struct {
	ID        string `json:"id"`
	CreatedAt int64  `json:"created_at"`
	UpdatedAt int64  `json:"updated_at"`
	UserID    string `json:"user_id"`
	Key       string `json:"key"`
}

func (a *ApiKey) From(e *db.ApiKey) *ApiKey {
	if e == nil {
		return a
	}
	a.ID = e.ID.String()
	a.UserID = e.UserID.String()
	a.Key = e.Key
	a.CreatedAt = e.CreatedAt.Unix()
	a.UpdatedAt = e.UpdatedAt.Unix()
	return a
}
