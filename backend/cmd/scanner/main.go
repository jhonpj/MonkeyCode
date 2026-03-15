package main

import (
	"context"

	"github.com/google/wire"

	"github.com/chaitin/MonkeyCode/backend/config"
	v1 "github.com/chaitin/MonkeyCode/backend/internal/scanner/handler/http/v1"
	"github.com/chaitin/MonkeyCode/backend/pkg"
	"github.com/chaitin/MonkeyCode/backend/pkg/logger"
	"github.com/chaitin/MonkeyCode/backend/pkg/service"
	"github.com/chaitin/MonkeyCode/backend/pkg/version"
)

func main() {
	s, err := newServer()
	if err != nil {
		panic(err)
	}

	s.version.Print()
	s.logger.With("config", s.config).Debug("config")
	s.web.PrintRoutes()

	svc := service.NewService(service.WithPprof())
	svc.Add(s)
	if err := svc.Run(); err != nil {
		panic(err)
	}
}

// Name implements service.Servicer.
func (s *Server) Name() string {
	return "Scanner Server"
}

// Start implements service.Servicer.
func (s *Server) Start() error {
	return s.web.Run(s.config.Server.Addr)
}

// Stop implements service.Servicer.
func (s *Server) Stop() error {
	return s.web.Echo().Shutdown(context.Background())
}

var AppSet = wire.NewSet(
	wire.FieldsOf(new(*config.Config), "Logger"),
	config.Init,
	pkg.NewWeb,
	logger.NewLogger,
	version.NewVersionInfo,
	v1.NewScannerHandler,
)
