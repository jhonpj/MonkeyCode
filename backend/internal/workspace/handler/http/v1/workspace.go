package v1

import (
	"fmt"
	"log/slog"

	"github.com/GoYoko/web"

	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/internal/middleware"
)

type WorkspaceFileHandler struct {
	usecase domain.WorkspaceFileUsecase
	logger  *slog.Logger
}

func NewWorkspaceFileHandler(
	w *web.Web,
	usecase domain.WorkspaceFileUsecase,
	auth *middleware.AuthMiddleware,
	active *middleware.ActiveMiddleware,
	logger *slog.Logger,
) *WorkspaceFileHandler {
	h := &WorkspaceFileHandler{
		usecase: usecase,
		logger:  logger.With("handler", "workspace_file"),
	}

	// 设置路由
	g := w.Group("/api/v1/workspace/files")
	g.Use(auth.Auth(), active.Active("user"))

	g.POST("", web.BindHandler(h.Create))
	g.GET("/:id", web.BindHandler(h.GetByID))
	g.PUT("/:id", web.BindHandler(h.Update))
	g.DELETE("/:id", web.BaseHandler(h.Delete))
	g.GET("", web.BindHandler(h.List))
	g.POST("/batch", web.BindHandler(h.BatchCreate))
	g.PUT("/batch", web.BindHandler(h.BatchUpdate))
	g.POST("/sync", web.BindHandler(h.Sync))
	g.GET("/by-path", web.BindHandler(h.GetByPath))

	return h
}

// Create 创建工作区文件
//
//	@Tags			WorkspaceFile
//	@Summary		创建工作区文件
//	@Description	创建一个新的工作区文件
//	@ID				create-workspace-file
//	@Accept			json
//	@Produce		json
//	@Param			file	body		domain.CreateWorkspaceFileReq	true	"文件信息"
//	@Success		200		{object}	web.Resp{data=domain.WorkspaceFile}
//	@Router			/api/v1/workspace/files [post]
func (h *WorkspaceFileHandler) Create(c *web.Context, req domain.CreateWorkspaceFileReq) error {
	user := middleware.GetUser(c)
	req.UserID = user.ID

	file, err := h.usecase.Create(c.Request().Context(), &req)
	if err != nil {
		h.logger.Error("failed to create workspace file", "error", err, "path", req.Path)
		return err
	}

	return c.Success(file)
}

// GetByID 根据ID获取工作区文件
//
//	@Tags			WorkspaceFile
//	@Summary		根据ID获取工作区文件
//	@Description	根据文件ID获取工作区文件详情
//	@ID				get-workspace-file-by-id
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"文件ID"
//	@Success		200	{object}	web.Resp{data=domain.WorkspaceFile}
//	@Router			/api/v1/workspace/files/{id} [get]
func (h *WorkspaceFileHandler) GetByID(c *web.Context, req struct {
	ID string `param:"id" validate:"required"`
},
) error {
	file, err := h.usecase.GetByID(c.Request().Context(), req.ID)
	if err != nil {
		h.logger.Error("failed to get workspace file", "error", err, "id", req.ID)
		return err
	}

	return c.Success(file)
}

// GetAndSave
//
//	@Tags		WorkspaceFile
//	@Summary	获取并保存工作区文件
//	@Accept		json
//	@Produce	json
//	@Param		req	body		domain.GetAndSaveReq	true	"请求参数"
//	@Success	200	{object}	web.Resp{}
//	@Router		/api/v1/workspace/files/get-and-save [post]
func (h *WorkspaceFileHandler) GetAndSave(ctx *web.Context, req *domain.GetAndSaveReq) error {
	err := h.usecase.GetAndSave(ctx.Request().Context(), req)
	if err != nil {
		h.logger.Error("failed to get and save workspace files", "error", err, "count", len(req.FileMetas))
		return err
	}
	return ctx.Success(nil)
}

// Update 更新工作区文件
//
//	@Tags			WorkspaceFile
//	@Summary		更新工作区文件
//	@Description	更新指定的工作区文件
//	@ID				update-workspace-file
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string							true	"文件ID"
//	@Param			file	body		domain.UpdateWorkspaceFileReq	true	"更新信息"
//	@Success		200		{object}	web.Resp{data=domain.WorkspaceFile}
//	@Router			/api/v1/workspace/files/{id} [put]
func (h *WorkspaceFileHandler) Update(c *web.Context, req struct {
	ID string `param:"id" validate:"required"`
	domain.UpdateWorkspaceFileReq
},
) error {
	req.UpdateWorkspaceFileReq.ID = req.ID

	file, err := h.usecase.Update(c.Request().Context(), &req.UpdateWorkspaceFileReq)
	if err != nil {
		h.logger.Error("failed to update workspace file", "error", err, "id", req.ID)
		return err
	}

	return c.Success(file)
}

// Delete 删除工作区文件
//
//	@Tags			WorkspaceFile
//	@Summary		删除工作区文件
//	@Description	删除指定的工作区文件
//	@ID				delete-workspace-file
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"文件ID"
//	@Success		200	{object}	web.Resp{}
//	@Router			/api/v1/workspace/files/{id} [delete]
func (h *WorkspaceFileHandler) Delete(c *web.Context) error {
	id := c.Param("id")
	if id == "" {
		return fmt.Errorf("file ID is required")
	}

	err := h.usecase.Delete(c.Request().Context(), id)
	if err != nil {
		h.logger.Error("failed to delete workspace file", "error", err, "id", id)
		return err
	}

	return c.Success(nil)
}

// List 获取工作区文件列表
//
//	@Tags			WorkspaceFile
//	@Summary		获取工作区文件列表
//	@Description	分页获取工作区文件列表
//	@ID				list-workspace-files
//	@Accept			json
//	@Produce		json
//	@Param			query	query		domain.ListWorkspaceFileReq	true	"查询参数"
//	@Success		200		{object}	web.Resp{data=domain.ListWorkspaceFileResp}
//	@Router			/api/v1/workspace/files [get]
func (h *WorkspaceFileHandler) List(c *web.Context, req domain.ListWorkspaceFileReq) error {
	user := middleware.GetUser(c)
	// 如果没有指定用户ID，则使用当前用户ID
	if req.UserID == "" {
		req.UserID = user.ID
	}

	resp, err := h.usecase.List(c.Request().Context(), &req)
	if err != nil {
		h.logger.Error("failed to list workspace files", "error", err)
		return err
	}

	return c.Success(resp)
}

// BatchCreate 批量创建工作区文件
//
//	@Tags			WorkspaceFile
//	@Summary		批量创建工作区文件
//	@Description	批量创建多个工作区文件
//	@ID				batch-create-workspace-files
//	@Accept			json
//	@Produce		json
//	@Param			files	body		domain.BatchCreateWorkspaceFileReq	true	"文件列表"
//	@Success		200		{object}	web.Resp{data=[]domain.WorkspaceFile}
//	@Router			/api/v1/workspace/files/batch [post]
func (h *WorkspaceFileHandler) BatchCreate(c *web.Context, req domain.BatchCreateWorkspaceFileReq) error {
	user := middleware.GetUser(c)
	req.UserID = user.ID

	files, err := h.usecase.BatchCreate(c.Request().Context(), &req)
	if err != nil {
		h.logger.Error("failed to batch create workspace files", "error", err, "count", len(req.Files))
		return err
	}

	return c.Success(files)
}

// BatchUpdate 批量更新工作区文件
//
//	@Tags			WorkspaceFile
//	@Summary		批量更新工作区文件
//	@Description	批量更新多个工作区文件
//	@ID				batch-update-workspace-files
//	@Accept			json
//	@Produce		json
//	@Param			files	body		domain.BatchUpdateWorkspaceFileReq	true	"文件列表"
//	@Success		200		{object}	web.Resp{data=[]domain.WorkspaceFile}
//	@Router			/api/v1/workspace/files/batch [put]
func (h *WorkspaceFileHandler) BatchUpdate(c *web.Context, req domain.BatchUpdateWorkspaceFileReq) error {
	files, err := h.usecase.BatchUpdate(c.Request().Context(), &req)
	if err != nil {
		h.logger.Error("failed to batch update workspace files", "error", err, "count", len(req.Files))
		return err
	}

	return c.Success(files)
}

// Sync 同步工作区文件
//
//	@Tags			WorkspaceFile
//	@Summary		同步工作区文件
//	@Description	同步本地文件到工作区，智能检测新增、修改和删除
//	@ID				sync-workspace-files
//	@Accept			json
//	@Produce		json
//	@Param			sync	body		domain.SyncWorkspaceFileReq	true	"同步信息"
//	@Success		200		{object}	web.Resp{data=domain.SyncWorkspaceFileResp}
//	@Router			/api/v1/workspace/files/sync [post]
func (h *WorkspaceFileHandler) Sync(c *web.Context, req domain.SyncWorkspaceFileReq) error {
	user := middleware.GetUser(c)
	req.UserID = user.ID

	resp, err := h.usecase.Sync(c.Request().Context(), &req)
	if err != nil {
		h.logger.Error("failed to sync workspace files", "error", err, "count", len(req.Files))
		return err
	}

	return c.Success(resp)
}

// GetByPath 根据路径获取工作区文件
//
//	@Tags			WorkspaceFile
//	@Summary		根据路径获取工作区文件
//	@Description	根据用户ID、项目ID和文件路径获取工作区文件
//	@ID				get-workspace-file-by-path
//	@Accept			json
//	@Produce		json
//	@Param			user_id		query		string	false	"用户ID"
//	@Param			project_id	query		string	true	"项目ID"
//	@Param			path		query		string	true	"文件路径"
//	@Success		200			{object}	web.Resp{data=domain.WorkspaceFile}
//	@Router			/api/v1/workspace/files/by-path [get]
func (h *WorkspaceFileHandler) GetByPath(c *web.Context, req struct {
	UserID      string `query:"user_id"`
	WorkspaceID string `query:"workspace_id" validate:"required"`
	Path        string `query:"path" validate:"required"`
},
) error {
	user := middleware.GetUser(c)
	// 如果没有指定用户ID，则使用当前用户ID
	if req.UserID == "" {
		req.UserID = user.ID
	}

	file, err := h.usecase.GetByPath(c.Request().Context(), req.UserID, req.WorkspaceID, req.Path)
	if err != nil {
		h.logger.Error("failed to get workspace file by path", "error", err, "path", req.Path)
		return err
	}

	return c.Success(file)
}
