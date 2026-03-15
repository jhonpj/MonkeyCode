package domain

import (
	"context"

	"github.com/chaitin/MonkeyCode/backend/consts"
	"github.com/chaitin/MonkeyCode/backend/db"
)

type ProxyUsecase interface {
	SelectModelWithLoadBalancing(modelName string, modelType consts.ModelType) (*Model, error)
	Record(ctx context.Context, record *RecordParam) error
	ValidateApiKey(ctx context.Context, key string) (*ApiKey, error)
	AcceptCompletion(ctx context.Context, req *AcceptCompletionReq) error
	Report(ctx context.Context, req *ReportReq) error
	CreateSecurityScanning(ctx context.Context, req *CreateSecurityScanningReq) (string, error)
	ListSecurityScanning(ctx context.Context, req *ListSecurityScanningReq) (*ListSecurityScanningBriefResp, error)
	ListSecurityDetail(ctx context.Context, req *ListSecurityScanningDetailReq) (*ListSecurityScanningDetailResp, error)
}

type ProxyRepo interface {
	Record(ctx context.Context, record *RecordParam) error
	UpdateByTaskID(ctx context.Context, taskID string, fn func(*db.TaskUpdateOne)) error
	AcceptCompletion(ctx context.Context, req *AcceptCompletionReq) error
	Report(ctx context.Context, model *db.Model, req *ReportReq) error
	SelectModelWithLoadBalancing(modelName string, modelType consts.ModelType) (*db.Model, error)
	ValidateApiKey(ctx context.Context, key string) (*db.ApiKey, error)
}

type VersionInfo struct {
	Version string `json:"version"`
	URL     string `json:"url"`
}

type AcceptCompletionReq struct {
	ID         string `json:"id"`         // 记录ID
	Completion string `json:"completion"` // 补全内容
}

type ReportReq struct {
	Action         consts.ReportAction `json:"action"`
	ID             string              `json:"id"`              // task_id or resp_id
	Content        string              `json:"content"`         // 内容
	Tool           string              `json:"tool"`            // 工具
	UserInput      string              `json:"user_input"`      // 用户输入的新文本（用于reject action）
	SourceCode     string              `json:"source_code"`     // 当前文件的原文（用于reject action）
	CursorPosition map[string]any      `json:"cursor_position"` // 光标位置（用于reject action）
	Mode           string              `json:"mode"`            // 模式
	UserID         string              `json:"-"`
}

type RecordParam struct {
	RequestID       string
	TaskID          string
	UserID          string
	ModelID         string
	ModelType       consts.ModelType
	Role            consts.ChatRole
	Prompt          string
	ProgramLanguage string
	InputTokens     int64
	OutputTokens    int64
	IsAccept        bool
	Completion      string
	WorkMode        string
	CodeLines       int64
	Code            string
	SourceCode      string         // 当前文件的原文
	CursorPosition  map[string]any // 光标位置
	UserInput       string         // 用户实际输入的内容
}

func (r *RecordParam) Clone() *RecordParam {
	return &RecordParam{
		RequestID:       r.RequestID,
		TaskID:          r.TaskID,
		UserID:          r.UserID,
		ModelID:         r.ModelID,
		ModelType:       r.ModelType,
		Role:            r.Role,
		Prompt:          r.Prompt,
		ProgramLanguage: r.ProgramLanguage,
		InputTokens:     r.InputTokens,
		OutputTokens:    r.OutputTokens,
		IsAccept:        r.IsAccept,
		Completion:      r.Completion,
		WorkMode:        r.WorkMode,
		CodeLines:       r.CodeLines,
		SourceCode:      r.SourceCode,
		CursorPosition:  r.CursorPosition,
		UserInput:       r.UserInput,
	}
}
