package v1

import (
	"github.com/GoYoko/web"

	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/internal/middleware"
)

// UserStat 获取用户统计信息
//
//	@Tags			User Dashboard
//	@Summary		获取用户统计信息
//	@Description	获取用户统计信息
//	@ID				user-dashboard-stat
//	@Accept			json
//	@Produce		json
//	@Param			filter	query		domain.StatisticsFilter	true	"筛选参数"
//	@Success		200		{object}	web.Resp{data=domain.UserStat}
//	@Failure		401		{object}	string
//	@Router			/api/v1/user/dashboard/stat [get]
func (h *UserHandler) UserStat(c *web.Context, req domain.StatisticsFilter) error {
	req.UserID = middleware.GetUser(c).ID
	userStat, err := h.duse.UserStat(c.Request().Context(), req)
	if err != nil {
		return err
	}
	return c.Success(userStat)
}

// UserEvents 获取用户事件
//
//	@Tags			User Dashboard
//	@Summary		获取用户事件
//	@Description	获取用户事件
//	@ID				user-dashboard-events
//	@Accept			json
//	@Produce		json
//	@Param			filter	query		domain.StatisticsFilter	true	"筛选参数"
//	@Success		200		{object}	web.Resp{data=[]domain.UserEvent}
//	@Failure		401		{object}	string
//	@Router			/api/v1/user/dashboard/events [get]
func (h *UserHandler) UserEvents(c *web.Context) error {
	userEvents, err := h.duse.UserEvents(c.Request().Context(), domain.StatisticsFilter{
		Precision: "day",
		Duration:  90,
		UserID:    middleware.GetUser(c).ID,
	})
	if err != nil {
		return err
	}
	return c.Success(userEvents)
}

// UserHeatmap 用户热力图
//
//	@Tags			User Dashboard
//	@Summary		用户热力图
//	@Description	用户热力图
//	@ID				user-dashboard-heatmap
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	web.Resp{data=domain.UserHeatmapResp}
//	@Failure		401	{object}	string
//	@Router			/api/v1/user/dashboard/heatmap [get]
func (h *UserHandler) UserHeatmap(c *web.Context) error {
	userID := middleware.GetUser(c).ID
	userHeatmap, err := h.duse.UserHeatmap(c.Request().Context(), userID)
	if err != nil {
		return err
	}
	return c.Success(userHeatmap)
}
