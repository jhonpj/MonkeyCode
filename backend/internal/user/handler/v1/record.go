package v1

import (
	"github.com/GoYoko/web"
	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/internal/middleware"
)

// ListChatRecord 获取用户对话记录
//
//	@Tags			User Record
//	@Summary		获取用户对话记录
//	@Description	获取用户对话记录
//	@ID				user-list-chat-record
//	@Accept			json
//	@Produce		json
//	@Param			page	query		domain.ListRecordReq	true	"参数"
//	@Success		200		{object}	web.Resp{data=domain.ListChatRecordResp}
//	@Failure		401		{object}	string
//	@Router			/api/v1/user/chat/record [get]
func (h *UserHandler) ListChatRecord(c *web.Context, req domain.ListRecordReq) error {
	req.Pagination = c.Page()
	req.UserID = middleware.GetUser(c).ID
	records, err := h.buse.ListChatRecord(c.Request().Context(), req)
	if err != nil {
		return err
	}
	return c.Success(records)
}

// ListCompletionRecord 获取补全记录
//
//	@Tags			User Record
//	@Summary		获取补全记录
//	@Description	获取补全记录
//	@ID				user-list-completion-record
//	@Accept			json
//	@Produce		json
//	@Param			page	query		domain.ListRecordReq	true	"参数"
//	@Success		200		{object}	web.Resp{data=domain.ListCompletionRecordResp}
//	@Failure		401		{object}	string
//	@Router			/api/v1/user/completion/record [get]
func (h *UserHandler) ListCompletionRecord(c *web.Context, req domain.ListRecordReq) error {
	req.Pagination = c.Page()
	req.UserID = middleware.GetUser(c).ID
	records, err := h.buse.ListCompletionRecord(c.Request().Context(), req)
	if err != nil {
		return err
	}
	return c.Success(records)
}

// CompletionInfo 获取补全内容
//
//	@Tags			User Record
//	@Summary		获取补全内容
//	@Description	获取补全内容
//	@ID				user-completion-info
//	@Accept			json
//	@Produce		json
//	@Param			id	query		string	true	"补全记录ID"
//	@Success		200	{object}	web.Resp{data=domain.CompletionInfo}
//	@Failure		401	{object}	string
//	@Router			/api/v1/user/completion/info [get]
func (h *UserHandler) CompletionInfo(c *web.Context) error {
	info, err := h.buse.CompletionInfo(c.Request().Context(), c.QueryParam("id"), middleware.GetUser(c).ID)
	if err != nil {
		return err
	}
	return c.Success(info)
}

// ChatInfo 获取对话内容
//
//	@Tags			User Record
//	@Summary		获取对话内容
//	@Description	获取对话内容
//	@ID				user-chat-info
//	@Accept			json
//	@Produce		json
//	@Param			id	query		string	true	"对话记录ID"
//	@Success		200	{object}	web.Resp{data=domain.ChatInfo}
//	@Failure		401	{object}	string
//	@Router			/api/v1/user/chat/info [get]
func (h *UserHandler) ChatInfo(c *web.Context) error {
	info, err := h.buse.ChatInfo(c.Request().Context(), c.QueryParam("id"), middleware.GetUser(c).ID)
	if err != nil {
		return err
	}
	return c.Success(info)
}
