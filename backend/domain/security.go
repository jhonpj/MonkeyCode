package domain

import (
	"context"
	"path"

	"github.com/GoYoko/web"
	"github.com/google/uuid"

	"github.com/chaitin/MonkeyCode/backend/consts"
	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/ent/types"
	"github.com/chaitin/MonkeyCode/backend/pkg/cvt"
	"github.com/chaitin/MonkeyCode/backend/pkg/scan"
)

type SecurityScanningUsecase interface {
	List(ctx context.Context, req ListSecurityScanningReq) (*ListSecurityScanningResp, error)
	Detail(ctx context.Context, userID, id string) ([]*SecurityScanningRiskDetail, error)
}

type SecurityScanningRepo interface {
	Get(ctx context.Context, id string) (*db.SecurityScanning, error)
	Create(ctx context.Context, req CreateSecurityScanningReq) (string, error)
	Update(ctx context.Context, id string, fileMap map[string]string, status consts.SecurityScanningStatus, result *scan.Result) error
	List(ctx context.Context, req ListSecurityScanningReq) (*ListSecurityScanningResp, error)
	ListDetail(ctx context.Context, req ListSecurityScanningDetailReq) (*ListSecurityScanningDetailResp, error)
	Detail(ctx context.Context, userID, id string) ([]*SecurityScanningRiskDetail, error)
	ListBrief(ctx context.Context, req ListSecurityScanningReq) (*ListSecurityScanningBriefResp, error)
	AllRunning(ctx context.Context) ([]*db.SecurityScanning, error)
	PageWorkspaceFiles(ctx context.Context, id string, size int, fn func([]*db.WorkspaceFile) error) error
}

type ListSecurityScanningReq struct {
	web.Pagination
	UserID      string `json:"-"`
	BaseURL     string `json:"-"`
	Author      string `json:"author" query:"author"`             // 作者
	ProjectName string `json:"project_name" query:"project_name"` // 项目名称
}

type ListSecurityScanningDetailReq struct {
	web.Pagination
	ID     string `json:"id" query:"id"` // 扫描任务id
	UserID string `json:"-"`
}

type ListSecurityScanningResp struct {
	*db.PageInfo

	Items []*SecurityScanningResult `json:"items"`
}

type ListSecurityScanningBriefResp struct {
	*db.PageInfo

	Items []*SecurityScanningBrief `json:"items"`
}

type ListSecurityScanningDetailResp struct {
	*db.PageInfo

	Items []*SecurityScanningRiskDetail `json:"items"`
}

type SecurityScanningBrief struct {
	ID        string                        `json:"id"`         // 扫描任务id
	Workspace string                        `json:"workspace"`  // 项目目录
	Status    consts.SecurityScanningStatus `json:"status"`     // 扫描状态
	ReportURL string                        `json:"report_url"` // 报告url
	CreatedAt int64                         `json:"created_at"` // 创建时间
}

func (s *SecurityScanningBrief) From(e *db.SecurityScanning) *SecurityScanningBrief {
	if e == nil {
		return s
	}

	s.ID = e.ID.String()
	s.Status = e.Status
	s.Workspace = e.Workspace
	s.CreatedAt = e.CreatedAt.Unix()

	return s
}

type ScanReq struct {
	TaskID    string `json:"task_id"`
	UserID    string `json:"user_id"`
	Workspace string `json:"workspace"` // 项目目录
	Language  string `json:"language"`  // 扫描语言
}

type CreateSecurityScanningReq struct {
	UserID    string                          `json:"user_id"`
	Workspace string                          `json:"workspace"` // 项目目录
	Language  consts.SecurityScanningLanguage `json:"language"`  // 扫描语言
}

type SecurityScanningResult struct {
	ID          string                        `json:"id"`           // 扫描任务id
	Name        string                        `json:"name"`         // 扫描任务
	ProjectName string                        `json:"project_name"` // 项目名称
	Path        string                        `json:"path"`         // 项目路径
	Status      consts.SecurityScanningStatus `json:"status"`       // 扫描状态
	Risk        SecurityScanningRiskResult    `json:"risk"`         // 风险结果
	User        *User                         `json:"user"`         // 用户
	Error       string                        `json:"error"`        // 错误信息
	CreatedAt   int64                         `json:"created_at"`   // 扫描开始时间
}

func (s *SecurityScanningResult) From(e *db.SecurityScanning) *SecurityScanningResult {
	if e == nil {
		return s
	}

	s.ID = e.ID.String()
	s.Name = e.Language.RuleName()
	s.ProjectName = path.Base(e.Workspace)
	s.Path = e.Workspace
	s.Status = e.Status
	s.User = cvt.From(e.Edges.User, &User{})
	s.Error = e.ErrorMessage
	s.CreatedAt = e.CreatedAt.Unix()

	return s
}

type SecurityScanningRiskResult struct {
	ID            uuid.UUID `json:"id"`
	SevereCount   int       `json:"severe_count"`   // 严重数
	CriticalCount int       `json:"critical_count"` // 高危数
	SuggestCount  int       `json:"suggest_count"`  // 建议数
}

type SecurityScanningRiskDetail struct {
	ID       string                           `json:"id"`       // 风险id
	Level    consts.SecurityScanningRiskLevel `json:"level"`    // 风险等级
	Desc     string                           `json:"desc"`     // 风险描述
	Lines    string                           `json:"lines"`    // 风险代码行
	Start    *types.Position                  `json:"start"`    // 风险代码行开始位置
	End      *types.Position                  `json:"end"`      // 风险代码行结束位置
	Fix      string                           `json:"fix"`      // 修复建议
	Filename string                           `json:"filename"` // 风险文件名
	Content  string                           `json:"content"`  // 代码内容
}

func (s *SecurityScanningRiskDetail) From(e *db.SecurityScanningResult) *SecurityScanningRiskDetail {
	if e == nil {
		return s
	}

	s.ID = e.ID.String()
	switch e.Severity {
	case "ERROR", "CRITICAL":
		s.Level = consts.SecurityScanningRiskLevelSevere
	case "WARNING":
		s.Level = consts.SecurityScanningRiskLevelCritical
	case "INFO":
		s.Level = consts.SecurityScanningRiskLevelSuggest
	}
	s.Desc = e.AbstractZh
	s.Lines = e.Lines
	s.Start = e.StartPosition
	s.End = e.EndPosition
	s.Filename = e.Path
	s.Fix = e.MessageZh
	s.Content = e.FileContent

	return s
}
