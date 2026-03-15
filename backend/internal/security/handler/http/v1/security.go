package v1

import (
	"github.com/GoYoko/web"

	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/internal/middleware"
)

type SecurityHandler struct {
	usecase domain.SecurityScanningUsecase
}

func NewSecurityHandler(
	w *web.Web,
	usecase domain.SecurityScanningUsecase,
	auth *middleware.AuthMiddleware,
	active *middleware.ActiveMiddleware,
) *SecurityHandler {
	s := &SecurityHandler{
		usecase: usecase,
	}

	g := w.Group("/api/v1/security/scanning")
	g.Use(auth.Auth(), active.Active("admin"))

	g.GET("", web.BindHandler(s.List))
	g.GET("/detail", web.BaseHandler(s.Detail))

	return s
}

// List 获取扫描结果
//
//	@Tags			Security Scanning
//	@Summary		获取扫描结果
//	@Description	获取扫描结果
//	@ID				security-scanning-list
//	@Accept			json
//	@Produce		json
//	@Param			page	query		domain.ListSecurityScanningReq	true	"参数"
//	@Success		200		{object}	web.Resp{data=domain.ListSecurityScanningResp}
//	@Failure		401		{object}	string
//	@Router			/api/v1/security/scanning [get]
func (s *SecurityHandler) List(c *web.Context, req domain.ListSecurityScanningReq) error {
	resp, err := s.usecase.List(c.Request().Context(), req)
	if err != nil {
		return err
	}
	return c.Success(resp)
}

// Detail 获取扫描风险详情
//
//	@Tags			Security Scanning
//	@Summary		获取扫描风险详情
//	@Description	获取扫描风险详情
//	@ID				security-scanning-detail
//	@Accept			json
//	@Produce		json
//	@Param			id	query		string	true	"扫描任务id"
//	@Success		200	{object}	web.Resp{data=[]domain.SecurityScanningRiskDetail}
//	@Failure		401	{object}	string
//	@Router			/api/v1/security/scanning/detail [get]
func (s *SecurityHandler) Detail(c *web.Context) error {
	resp, err := s.usecase.Detail(c.Request().Context(), "", c.QueryParam("id"))
	if err != nil {
		return err
	}
	return c.Success(resp)
}
