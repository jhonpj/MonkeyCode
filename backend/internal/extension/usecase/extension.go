package usecase

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"strings"
	"sync"

	"github.com/chaitin/MonkeyCode/backend/config"
	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/domain"
	"github.com/chaitin/MonkeyCode/backend/pkg/cvt"
	"github.com/chaitin/MonkeyCode/backend/pkg/version"
	"github.com/chaitin/MonkeyCode/backend/pkg/vsix"
)

type ExtensionUsecase struct {
	logger *slog.Logger
	repo   domain.ExtensionRepo
	config *config.Config
	mu     sync.Mutex
}

func NewExtensionUsecase(
	repo domain.ExtensionRepo,
	config *config.Config,
	logger *slog.Logger,
) domain.ExtensionUsecase {
	e := &ExtensionUsecase{
		repo:   repo,
		config: config,
		mu:     sync.Mutex{},
		logger: logger,
	}
	return e
}

// GetByVersion implements domain.ExtensionUsecase.
func (e *ExtensionUsecase) GetByVersion(ctx context.Context, version string) (*domain.Extension, error) {
	ee, err := e.repo.GetByVersion(ctx, version)
	if err != nil {
		return nil, err
	}

	return cvt.From(ee, &domain.Extension{}), nil
}

// Latest implements domain.ExtensionUsecase.
func (e *ExtensionUsecase) Latest(ctx context.Context) (*domain.Extension, error) {
	ee, err := e.repo.Latest(ctx)
	if err != nil {
		return nil, err
	}

	return cvt.From(ee, &domain.Extension{}), nil
}

func (e *ExtensionUsecase) SyncLatest() {
	e.innerSync()
}

func (e *ExtensionUsecase) innerSync() {
	v := strings.ReplaceAll(version.Version, "v", "")
	logger := e.logger.With("fn", "syncLatest").With("current", v)
	latest, err := e.repo.Latest(context.Background())
	if err != nil {
		if strings.Contains(err.Error(), "extension not found") {
			latest = &db.Extension{}
		} else {
			logger.With("error", err).Error("获取最新插件版本失败")
			return
		}
	}

	if v == latest.Version {
		return
	}

	e.download(v)
}

func (e *ExtensionUsecase) download(version string) {
	logger := e.logger.With("fn", "download")
	url := fmt.Sprintf("%s/monkeycode/vsixs/monkeycode-%s.vsix", e.config.Extension.Baseurl, version)
	logger.With("url", url).With("version", version).Debug("发现新版本，开始下载")
	resp, err := http.Get(url)
	if err != nil {
		logger.With("error", err).Error("下载插件失败")
		return
	}
	defer resp.Body.Close()
	filename := fmt.Sprintf("/app/static/monkeycode-%s.vsix", version)
	f, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		logger.With("error", err).Error("创建文件失败")
		return
	}
	_, err = io.Copy(f, resp.Body)
	if err != nil {
		logger.With("error", err).Error("复制文件内容失败")
		return
	}
	f.Close()
	logger.Debug("下载插件成功")

	if err := vsix.ValidateVsix(filename); err != nil {
		logger.With("error", err).Error("校验插件失败")
		os.Remove(filename)
		return
	}

	if _, err := e.repo.Save(context.Background(), &db.Extension{
		Version: version,
		Path:    filename,
	}); err != nil {
		logger.With("error", err).Error("保存插件版本信息失败")
		os.Remove(filename)
		return
	}
}
