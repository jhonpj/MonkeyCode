package proxy

import (
	"bytes"
	"context"
	"io"
	"log/slog"
)

type RespLog struct {
	ctx    context.Context
	logger *slog.Logger
	src    io.ReadCloser
}

var _ io.ReadCloser = &RespLog{}

func NewRespLog(ctx context.Context, logger *slog.Logger, src io.ReadCloser) *RespLog {
	return &RespLog{ctx: ctx, logger: logger, src: src}
}

// Close implements io.ReadCloser.
func (r *RespLog) Close() error {
	return r.src.Close()
}

// Read implements io.ReadCloser.
func (r *RespLog) Read(p []byte) (n int, err error) {
	buf := bytes.NewBuffer([]byte(""))
	n, err = r.src.Read(p)
	if n > 0 {
		buf.Write(p[:n])
	}
	if err != nil {
		r.logger.ErrorContext(r.ctx, "read response failed", "error", err, "response", buf.String())
		return
	}
	return
}
