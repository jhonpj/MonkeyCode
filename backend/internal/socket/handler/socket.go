package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"sync"
	"time"

	"github.com/chaitin/MonkeyCode/backend/config"
	"github.com/chaitin/MonkeyCode/backend/db"
	"github.com/chaitin/MonkeyCode/backend/domain"
	socketio "github.com/doquangtan/socket.io/v4"
)

type FileUpdateData struct {
	ID            string `json:"id"`
	FilePath      string `json:"filePath"`
	Hash          string `json:"hash"`
	Event         string `json:"event"`
	Content       string `json:"content,omitempty"`
	PreviousHash  string `json:"previousHash,omitempty"`
	Timestamp     int64  `json:"timestamp"`
	ApiKey        string `json:"apiKey,omitempty"`
	WorkspacePath string `json:"workspacePath,omitempty"`
}

type AckResponse struct {
	ID      string `json:"id"`
	Status  string `json:"status"`
	Message string `json:"message,omitempty"`
}

type TestPingData struct {
	Timestamp int64  `json:"timestamp"`
	Message   string `json:"message"`
	SocketID  string `json:"socketId"`
}

type HeartbeatData struct {
	Type      string `json:"type"`
	Timestamp int64  `json:"timestamp"`
	ClientID  string `json:"clientId"`
}

type SocketHandler struct {
	config              *config.Config
	logger              *slog.Logger
	workspaceService    domain.WorkspaceFileUsecase
	workspaceUsecase    domain.WorkspaceUsecase
	userService         domain.UserUsecase
	io                  *socketio.Io
	mu                  sync.Mutex
	workspaceCache      map[string]*domain.Workspace
	cacheMutex          sync.RWMutex
	workspaceProcessing sync.Map
}

func NewSocketHandler(config *config.Config, logger *slog.Logger, workspaceService domain.WorkspaceFileUsecase, workspaceUsecase domain.WorkspaceUsecase, userService domain.UserUsecase) (*SocketHandler, error) {
	// 创建Socket.IO服务器
	io := socketio.New()

	handler := &SocketHandler{
		config:           config,
		logger:           logger,
		workspaceService: workspaceService,
		workspaceUsecase: workspaceUsecase,
		userService:      userService,
		io:               io,
		mu:               sync.Mutex{}, // 初始化互斥锁
		workspaceCache:   make(map[string]*domain.Workspace),
		cacheMutex:       sync.RWMutex{},
	}

	// 设置事件处理器
	handler.setupEventHandlers()

	return handler, nil
}

func (h *SocketHandler) setupEventHandlers() {
	h.io.OnConnection(h.handleConnection)
}

func (h *SocketHandler) handleConnection(socket *socketio.Socket) {
	h.logger.Debug("Client connected", "socketId", socket.Id)
	h.sendServerStatus(socket, "ready", "Server is ready to receive updates")

	// 注册事件处理器
	h.registerDisconnectHandler(socket)
	h.registerFileUpdateHandler(socket)
	h.registerTestPingHandler(socket)
	h.registerHeartbeatHandler(socket)
	h.registerWorkspaceStatsHandler(socket)
}

func (h *SocketHandler) registerDisconnectHandler(socket *socketio.Socket) {
	socket.On("disconnect", func(data *socketio.EventPayload) {
		reason := "unknown"
		if len(data.Data) > 0 {
			if r, ok := data.Data[0].(string); ok {
				reason = r
			}
		}
		h.logger.Debug("Client disconnected", "socketId", socket.Id, "reason", reason)
	})
}

func (h *SocketHandler) registerFileUpdateHandler(socket *socketio.Socket) {
	socket.On("file:update", func(data *socketio.EventPayload) {
		if len(data.Data) == 0 {
			h.sendErrorACK(data, "No data provided")
			return
		}

		h.processFileUpdateData(socket, data)
	})
}

func (h *SocketHandler) processFileUpdateData(socket *socketio.Socket, data *socketio.EventPayload) {
	switch v := data.Data[0].(type) {
	case map[string]interface{}:
		response := h.handleFileUpdateFromObject(socket, *data)
		h.sendACKWithLock(data, response)
	case string:
		response := h.handleFileUpdate(socket, v)
		h.sendACKWithLock(data, response)
	default:
		h.logger.Error("Data is neither string nor object",
			"socketId", socket.Id,
			"dataType", fmt.Sprintf("%T", v))
		h.sendErrorACK(data, "Invalid data format - expected string or object")
	}
}

func (h *SocketHandler) registerTestPingHandler(socket *socketio.Socket) {
	socket.On("test:ping", func(data *socketio.EventPayload) {
		if len(data.Data) > 0 {
			if dataStr, ok := data.Data[0].(string); ok {
				h.handleTestPing(socket, dataStr)
			}
		}
	})
}

func (h *SocketHandler) registerHeartbeatHandler(socket *socketio.Socket) {
	socket.On("heartbeat", func(data *socketio.EventPayload) {
		if len(data.Data) == 0 {
			h.sendErrorACK(data, "No heartbeat data")
			return
		}

		// 直接传递第一个数据元素，支持对象和字符串
		response := h.handleHeartbeat(socket, data.Data[0])
		if data.Ack != nil {
			data.Ack(response)
		}
	})
}

func (h *SocketHandler) registerWorkspaceStatsHandler(socket *socketio.Socket) {
	socket.On("workspace:stats", func(data *socketio.EventPayload) {
		// Note: GetWorkspaceStats is not in the new interface.
		// This will need to be implemented or removed.
		// For now, returning a placeholder.
		response := map[string]interface{}{
			"status":  "not_implemented",
			"message": "Workspace stats functionality is not available.",
		}

		if data.Ack != nil {
			data.Ack(response)
		}
	})
}

func (h *SocketHandler) handleFileUpdate(socket *socketio.Socket, data string) interface{} {
	var updateData FileUpdateData
	if err := json.Unmarshal([]byte(data), &updateData); err != nil {
		h.logger.Error("Failed to parse file update data", "error", err, "data", data)
		return map[string]interface{}{
			"status":  "error",
			"message": "Invalid data format",
		}
	}

	// 立即返回确认收到
	immediateAck := AckResponse{
		ID:      updateData.ID,
		Status:  "received",
		Message: "File update received, processing...",
	}

	// 异步处理文件操作
	go h.processFileUpdateAsync(socket, updateData)

	return immediateAck
}

func (h *SocketHandler) handleFileUpdateFromObject(socket *socketio.Socket, data socketio.EventPayload) interface{} {
	// 从数据中获取第一个元素（应该是map）
	if len(data.Data) == 0 {
		h.logger.Error("No data provided for file update")
		return AckResponse{
			Status:  "error",
			Message: "No data provided",
		}
	}

	dataMap, ok := data.Data[0].(map[string]interface{})
	if !ok {
		h.logger.Error("Invalid data format for file update", "type", fmt.Sprintf("%T", data.Data[0]))
		return AckResponse{
			Status:  "error",
			Message: "Invalid data format",
		}
	}

	// 解析数据字段
	var updateData FileUpdateData

	// 使用类型断言提取字段
	if id, ok := dataMap["id"].(string); ok {
		updateData.ID = id
	}
	if filePath, ok := dataMap["filePath"].(string); ok {
		updateData.FilePath = filePath
	}
	if event, ok := dataMap["event"].(string); ok {
		updateData.Event = event
	}
	if hash, ok := dataMap["hash"].(string); ok {
		updateData.Hash = hash
	}
	if content, ok := dataMap["content"].(string); ok {
		updateData.Content = content
	}
	if timestamp, ok := dataMap["timestamp"].(float64); ok {
		updateData.Timestamp = int64(timestamp)
	}
	if apiKey, ok := dataMap["apiKey"].(string); ok {
		updateData.ApiKey = apiKey
	}
	if workspacePath, ok := dataMap["workspacePath"].(string); ok {
		updateData.WorkspacePath = workspacePath
	}

	// 立即返回确认收到
	immediateAck := AckResponse{
		ID:      updateData.ID,
		Status:  "received",
		Message: "File update received, processing...",
	}

	// 异步处理文件操作
	go h.processFileUpdateAsync(socket, updateData)

	return immediateAck
}

func (h *SocketHandler) processFileUpdateAsync(socket *socketio.Socket, updateData FileUpdateData) {
	// 处理文件操作
	var finalStatus, message string
	ctx := context.Background()

	// 通过ApiKey获取用户信息
	user, err := h.userService.GetUserByApiKey(ctx, updateData.ApiKey)
	if err != nil {
		finalStatus = "error"
		message = fmt.Sprintf("Invalid API key: %v", err)
		h.logger.Error("Failed to get user by API key", "apiKey", updateData.ApiKey, "error", err)
		h.sendFinalResult(socket, updateData, finalStatus, message)
		return
	}

	userID := user.ID.String()

	// 确保workspace存在
	workspaceID, err := h.ensureWorkspace(ctx, userID, updateData.WorkspacePath)
	if err != nil {
		finalStatus = "error"
		message = fmt.Sprintf("Failed to ensure workspace: %v", err)
		h.logger.Error("Failed to ensure workspace", "error", err)
		h.sendFinalResult(socket, updateData, finalStatus, message)
		return
	}

	// Workspace ID obtained

	switch updateData.Event {
	case "initial_scan", "added":
		existingFile, err := h.workspaceService.GetByPath(ctx, userID, workspaceID, updateData.FilePath)

		if err != nil {
			// "Not Found"，文件不存在，执行创建逻辑
			if db.IsNotFound(err) {
				createReq := &domain.CreateWorkspaceFileReq{
					Path:        updateData.FilePath,
					Content:     updateData.Content,
					Hash:        updateData.Hash,
					UserID:      userID,
					WorkspaceID: workspaceID,
				}
				_, createErr := h.workspaceService.Create(ctx, createReq)
				if createErr != nil {
					finalStatus = "error"
					message = fmt.Sprintf("Failed to create file: %v", createErr)
					h.logger.Error("Failed to create file", "path", updateData.FilePath, "error", createErr)
				} else {
					// 调用GetAndSave处理新创建的文件
					fileExtension := h.getFileExtension(updateData.FilePath)
					codeFiles := domain.CodeFiles{
						Files: []domain.FileMeta{
							{
								FilePath: updateData.FilePath,
								// FileExtension: fileExtension,
								Language: h.getFileLanguage(fileExtension),
								Content:  updateData.Content,
							},
						},
					}
					getAndSaveReq := &domain.GetAndSaveReq{
						UserID:      userID,
						WorkspaceID: workspaceID,
						FileMetas:   codeFiles.Files,
					}
					err = h.workspaceService.GetAndSave(ctx, getAndSaveReq)
					if err != nil {
						h.logger.Debug("Failed to process file with GetAndSave", "path", updateData.FilePath, "error", err)
					}

					finalStatus = "success"
					message = "File created successfully"
				}
			} else {
				// 其他错误
				finalStatus = "error"
				message = fmt.Sprintf("Error checking for existing file: %v", err)
				h.logger.Error("Error checking for existing file", "path", updateData.FilePath, "error", err)
			}
		} else {
			// 文件已存在，检查是否需要更新
			if existingFile.Hash == updateData.Hash {
				finalStatus = "success"
				message = "File is already up-to-date"
			} else {
				updateReq := &domain.UpdateWorkspaceFileReq{
					ID:      existingFile.ID,
					Content: &updateData.Content,
					Hash:    &updateData.Hash,
				}
				_, updateErr := h.workspaceService.Update(ctx, updateReq)
				if updateErr != nil {
					finalStatus = "error"
					message = fmt.Sprintf("Failed to update existing file: %v", updateErr)
					h.logger.Error("Failed to update existing file", "path", updateData.FilePath, "error", updateErr)
				} else {
					finalStatus = "success"
					message = "File updated successfully"
				}
			}
		}

	case "modified":
		// First, get the file by path to find its ID
		file, err := h.workspaceService.GetByPath(ctx, userID, workspaceID, updateData.FilePath)
		if err != nil {
			finalStatus = "error"
			message = fmt.Sprintf("Failed to find file for update: %v", err)
			h.logger.Error("Failed to find file for update", "path", updateData.FilePath, "error", err)
			break
		}

		req := &domain.UpdateWorkspaceFileReq{
			ID:      file.ID,
			Content: &updateData.Content,
			Hash:    &updateData.Hash,
		}
		_, err = h.workspaceService.Update(ctx, req)
		if err != nil {
			finalStatus = "error"
			message = fmt.Sprintf("Failed to update file: %v", err)
			h.logger.Error("Failed to update file", "path", updateData.FilePath, "error", err)
		} else {
			finalStatus = "success"
			message = "File updated successfully"

			// 调用GetAndSave处理更新的文件
			fileExtension := h.getFileExtension(updateData.FilePath)
			codeFiles := domain.CodeFiles{
				Files: []domain.FileMeta{
					{
						FilePath: updateData.FilePath,
						// FileExtension: fileExtension,
						Language: h.getFileLanguage(fileExtension),
						Content:  updateData.Content,
					},
				},
			}
			getAndSaveReq := &domain.GetAndSaveReq{
				UserID:      userID,
				WorkspaceID: workspaceID,
				FileMetas:   codeFiles.Files,
			}
			err = h.workspaceService.GetAndSave(ctx, getAndSaveReq)
			if err != nil {
				h.logger.Debug("Failed to process file with GetAndSave", "path", updateData.FilePath, "error", err)
			}
		}

	case "deleted":
		// First, get the file by path to find its ID
		file, err := h.workspaceService.GetByPath(ctx, userID, workspaceID, updateData.FilePath)
		if err != nil {
			finalStatus = "error"
			message = fmt.Sprintf("Failed to find file for deletion: %v", err)
			h.logger.Error("Failed to find file for deletion", "path", updateData.FilePath, "error", err)
			break
		}

		err = h.workspaceService.Delete(ctx, file.ID)
		if err != nil {
			finalStatus = "error"
			message = fmt.Sprintf("Failed to delete file: %v", err)
			h.logger.Error("Failed to delete file", "path", updateData.FilePath, "error", err)
		} else {
			finalStatus = "success"
			message = "File deleted successfully"
		}

	default:
		finalStatus = "error"
		message = fmt.Sprintf("Unknown event type: %s", updateData.Event)
	}

	// 发送最终处理结果
	h.sendFinalResult(socket, updateData, finalStatus, message)
}

// ensureWorkspace ensures that a workspace exists for the given workspacePath
func (h *SocketHandler) ensureWorkspace(ctx context.Context, userID, workspacePath string) (string, error) {
	if workspacePath == "" {
		return "", fmt.Errorf("no workspace path provided")
	}

	// 创建处理键，防止同一个 workspace 的并发处理
	processingKey := fmt.Sprintf("%s:%s", userID, workspacePath)

	// 检查是否已经在处理中
	if _, processing := h.workspaceProcessing.LoadOrStore(processingKey, true); processing {
		h.logger.Debug("workspace already being processed, waiting", "userID", userID, "workspacePath", workspacePath)

		// 等待一段时间后重试
		maxWaitRetries := 10
		for i := 0; i < maxWaitRetries; i++ {
			time.Sleep(50 * time.Millisecond)
			if _, stillProcessing := h.workspaceProcessing.Load(processingKey); !stillProcessing {
				break
			}
		}

		// 如果仍在处理中，直接调用 EnsureWorkspace（此时应该会很快返回现有的workspace）
		h.logger.Debug("proceeding with workspace creation after wait", "userID", userID, "workspacePath", workspacePath)
	}

	// 确保在函数结束时清理处理标记
	defer h.workspaceProcessing.Delete(processingKey)

	// Use EnsureWorkspace to create or update workspace based on path
	workspace, err := h.workspaceUsecase.EnsureWorkspace(ctx, userID, workspacePath, "")
	if err != nil {
		h.logger.Error("Error ensuring workspace", "userID", userID, "path", workspacePath, "error", err)
		return "", fmt.Errorf("failed to ensure workspace: %w", err)
	}

	h.logger.Debug("workspace ensured successfully", "userID", userID, "workspacePath", workspacePath, "workspaceID", workspace.ID)
	return workspace.ID, nil
}

func (h *SocketHandler) handleTestPing(socket *socketio.Socket, data string) {
	var pingData TestPingData
	if err := json.Unmarshal([]byte(data), &pingData); err != nil {
		h.logger.Error("Failed to parse test ping data", "error", err)
		return
	}

	// 发送pong响应
	pongData := map[string]interface{}{
		"timestamp":    time.Now().UnixMilli(),
		"serverTime":   time.Now().Format(time.RFC3339),
		"message":      "Pong from MonkeyCode server",
		"receivedPing": pingData,
		"socketId":     socket.Id,
		"serverStatus": "ok",
	}

	h.mu.Lock()
	socket.Emit("test:pong", pongData)
	h.mu.Unlock()
}

func (h *SocketHandler) handleHeartbeat(socket *socketio.Socket, data interface{}) interface{} {
	var heartbeatData HeartbeatData

	// 处理不同类型的数据
	switch v := data.(type) {
	case string:
		if err := json.Unmarshal([]byte(v), &heartbeatData); err != nil {
			h.logger.Error("Failed to parse heartbeat data from string", "error", err)
			return map[string]interface{}{
				"status":  "error",
				"message": "Invalid heartbeat data format",
			}
		}
	case map[string]interface{}:
		// 直接从map中提取数据
		if clientID, ok := v["clientId"].(string); ok {
			heartbeatData.ClientID = clientID
		}
		if timestamp, ok := v["timestamp"].(float64); ok {
			heartbeatData.Timestamp = int64(timestamp)
		}
		if typeStr, ok := v["type"].(string); ok {
			heartbeatData.Type = typeStr
		}
	default:
		h.logger.Error("Unexpected heartbeat data type", "type", fmt.Sprintf("%T", data))
		return map[string]interface{}{
			"status":  "error",
			"message": "Invalid heartbeat data type",
		}
	}

	// 返回心跳响应
	response := map[string]interface{}{
		"status":     "ok",
		"serverTime": time.Now().UnixMilli(),
		"socketId":   socket.Id,
		"clientId":   heartbeatData.ClientID,
	}

	return response
}

func (h *SocketHandler) sendServerStatus(socket *socketio.Socket, status, message string) {
	statusData := map[string]string{
		"status":  status,
		"message": message,
	}
	socket.Emit("server:status", statusData)
}

// GetServer 返回Socket.IO服务器实例
func (h *SocketHandler) GetServer() *socketio.Io {
	return h.io
}

// BroadcastServerStatus 向所有连接的客户端广播服务器状态
func (h *SocketHandler) BroadcastServerStatus(status, message string) {
	statusData := map[string]interface{}{
		"status":  status,
		"message": message,
	}
	h.io.Emit("server:status", statusData)
}

// GetConnectedClients 获取连接的客户端数量
func (h *SocketHandler) GetConnectedClients() int {
	sockets := h.io.Sockets()
	return len(sockets)
}

// 辅助方法：发送错误ACK
func (h *SocketHandler) sendErrorACK(data *socketio.EventPayload, message string) {
	if data.Ack != nil {
		errorResp := map[string]interface{}{
			"status":  "error",
			"message": message,
		}
		data.Ack(errorResp)
	}
}

// 辅助方法：带锁发送ACK
func (h *SocketHandler) sendACKWithLock(data *socketio.EventPayload, response interface{}) {
	if data.Ack != nil {
		h.mu.Lock()
		data.Ack(response)
		h.mu.Unlock()
	}
}

// 发送最终处理结果
func (h *SocketHandler) sendFinalResult(socket *socketio.Socket, updateData FileUpdateData, status, message string) {
	finalResponse := map[string]interface{}{
		"id":      updateData.ID,
		"status":  status,
		"message": message,
		"file":    updateData.FilePath,
	}

	// 使用互斥锁保护Socket写入
	h.mu.Lock()
	socket.Emit("file:update:ack", finalResponse)
	h.mu.Unlock()
}

// getFileExtension 获取文件扩展名
func (h *SocketHandler) getFileExtension(filePath string) string {
	ext := ""
	if len(filePath) > 0 {
		for i := len(filePath) - 1; i >= 0; i-- {
			if filePath[i] == '.' {
				ext = filePath[i+1:]
				break
			}
		}
	}
	return ext
}

// getFileLanguage 根据文件扩展名获取编程语言类型
func (h *SocketHandler) getFileLanguage(fileExtension string) domain.CodeLanguageType {
	switch fileExtension {
	case "go":
		return domain.CodeLanguageTypeGo
	case "py":
		return domain.CodeLanguageTypePython
	case "java":
		return domain.CodeLanguageTypeJava
	case "js":
		return domain.CodeLanguageTypeJavaScript
	case "ts":
		return domain.CodeLanguageTypeTypeScript
	case "jsx":
		return domain.CodeLanguageTypeJSX
	case "tsx":
		return domain.CodeLanguageTypeTSX
	case "html":
		return domain.CodeLanguageTypeHTML
	case "css":
		return domain.CodeLanguageTypeCSS
	case "php":
		return domain.CodeLanguageTypePHP
	case "rs":
		return domain.CodeLanguageTypeRust
	case "swift":
		return domain.CodeLanguageTypeSwift
	case "kt":
		return domain.CodeLanguageTypeKotlin
	case "c":
		return domain.CodeLanguageTypeC
	case "cpp", "cc", "cxx":
		return domain.CodeLanguageTypeCpp
	default:
		return ""
	}
}
