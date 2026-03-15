package v1

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/GoYoko/web"

	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/pkg/scan"
)

type ScannerHandler struct {
	logger *slog.Logger
}

func NewScannerHandler(w *web.Web, logger *slog.Logger) *ScannerHandler {
	s := &ScannerHandler{
		logger: logger,
	}

	w.POST("/api/v1/scan", web.BindHandler(s.Scan))

	return s
}

func (s *ScannerHandler) Scan(ctx *web.Context, req domain.ScanReq) error {
	result, err := scan.Scan(req.TaskID, req.Workspace, req.Language)
	if err != nil {
		s.logger.With("id", req.TaskID).With("error", err).ErrorContext(ctx.Request().Context(), "failed to scan")
		return fmt.Errorf("failed to scan: %w", err)
	}
	s.logger.With("id", req.TaskID).InfoContext(ctx.Request().Context(), "task done")
	return ctx.JSON(http.StatusOK, result)
}
