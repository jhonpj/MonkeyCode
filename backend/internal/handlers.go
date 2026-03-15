package internal

import (
	billingv1 "github.com/chaitin/MonkeyCode/backend/internal/billing/handler/http/v1"
	codesnippetv1 "github.com/chaitin/MonkeyCode/backend/internal/codesnippet/handler/http/v1"
	dashv1 "github.com/chaitin/MonkeyCode/backend/internal/dashboard/handler/v1"
	modelv1 "github.com/chaitin/MonkeyCode/backend/internal/model/handler/http/v1"
	v1 "github.com/chaitin/MonkeyCode/backend/internal/openai/handler/v1"
	securityv1 "github.com/chaitin/MonkeyCode/backend/internal/security/handler/http/v1"
	sockethandler "github.com/chaitin/MonkeyCode/backend/internal/socket/handler"
	userV1 "github.com/chaitin/MonkeyCode/backend/internal/user/handler/v1"
	workspacehandlerv1 "github.com/chaitin/MonkeyCode/backend/internal/workspace/handler/http/v1"
)

// APIHandlers 包含所有API处理器
type APIHandlers struct {
	OpenAIV1Handler      *v1.V1Handler
	UserHandler          *userV1.UserHandler
	ModelHandler         *modelv1.ModelHandler
	DashboardHandler     *dashv1.DashboardHandler
	CodeSnippetHandler   *codesnippetv1.CodeSnippetHandler
	SocketHandler        *sockethandler.SocketHandler
	BillingHandler       *billingv1.BillingHandler
	WorkspaceFileHandler *workspacehandlerv1.WorkspaceFileHandler
	SecurityHandler      *securityv1.SecurityHandler
}
