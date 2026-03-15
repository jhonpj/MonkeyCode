//go:build wireinject
// +build wireinject

package main

import (
	"log/slog"

	"github.com/google/wire"

	"github.com/GoYoko/web"

	"github.com/chaitin/MonkeyCode/backend/config"
	v1 "github.com/chaitin/MonkeyCode/backend/internal/scanner/handler/http/v1"
	"github.com/chaitin/MonkeyCode/backend/pkg/version"
)

type Server struct {
	config  *config.Config
	web     *web.Web
	logger  *slog.Logger
	version *version.VersionInfo
	scanner *v1.ScannerHandler
}

func newServer() (*Server, error) {
	wire.Build(
		wire.Struct(new(Server), "*"),
		AppSet,
	)
	return &Server{}, nil
}
