package queuerunner

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"

	"github.com/chaitin/MonkeyCode/backend/config"
)

const (
	DefaultQueueName  = "monkeycode:tasks:default"
	ProcessingSetName = "monkeycode:tasks:processing"
	TaskKeyPrefix     = "monkeycode:task:"
)

type TaskStatus string

const (
	TaskStatusPending    TaskStatus = "pending"
	TaskStatusProcessing TaskStatus = "processing"
	TaskStatusCompleted  TaskStatus = "completed"
	TaskStatusFailed     TaskStatus = "failed"
)

type Task[T any] struct {
	ID        string     `json:"id"`
	Status    TaskStatus `json:"status"`
	Data      T          `json:"data"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	Error     string     `json:"error,omitempty"`
}

type TaskHandler[T any] func(ctx context.Context, task *Task[T]) error

type QueueRunner[T any] struct {
	rdb        *redis.Client
	name       string
	handlers   map[string]TaskHandler[T]
	logger     *slog.Logger
	concurrent int
	mu         *sync.RWMutex
}

func NewQueueRunner[T any](
	cfg *config.Config,
	rdb *redis.Client,
	logger *slog.Logger,
) *QueueRunner[T] {
	return &QueueRunner[T]{
		rdb:        rdb,
		name:       DefaultQueueName,
		handlers:   make(map[string]TaskHandler[T]),
		logger:     logger,
		concurrent: cfg.Security.QueueLimit,
		mu:         &sync.RWMutex{},
	}
}

func (r *QueueRunner[T]) addHandler(id string, h TaskHandler[T]) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.handlers[id] = h
}

func (r *QueueRunner[T]) getHandler(id string) (TaskHandler[T], bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	handler, exists := r.handlers[id]
	return handler, exists
}

func (r *QueueRunner[T]) delHandler(id string) {
	r.mu.Lock()
	defer r.mu.Unlock()
	delete(r.handlers, id)
}

func (r *QueueRunner[T]) Enqueue(ctx context.Context, id string, data T, h TaskHandler[T]) (string, error) {
	task := &Task[T]{
		ID:        id,
		Status:    TaskStatusPending,
		Data:      data,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	r.addHandler(id, h)

	taskBytes, err := json.Marshal(task)
	if err != nil {
		return "", fmt.Errorf("marshal task: %w", err)
	}

	pipe := r.rdb.Pipeline()

	taskKey := fmt.Sprintf("%s%s", TaskKeyPrefix, id)
	pipe.Set(ctx, taskKey, taskBytes, 24*time.Hour) // 设置24小时过期时间

	pipe.LPush(ctx, r.name, id)

	_, err = pipe.Exec(ctx)
	if err != nil {
		return "", fmt.Errorf("enqueue task: %w", err)
	}

	return id, nil
}

func (r *QueueRunner[T]) GetTask(ctx context.Context, taskID string) (*Task[T], error) {
	taskKey := fmt.Sprintf("%s%s", TaskKeyPrefix, taskID)
	taskBytes, err := r.rdb.Get(ctx, taskKey).Bytes()
	if err != nil {
		if err == redis.Nil {
			return nil, fmt.Errorf("task not found: %s", taskID)
		}
		return nil, fmt.Errorf("get task: %w", err)
	}

	var task Task[T]
	if err := json.Unmarshal(taskBytes, &task); err != nil {
		return nil, fmt.Errorf("unmarshal task: %w", err)
	}

	return &task, nil
}

func (r *QueueRunner[T]) UpdateTaskStatus(ctx context.Context, taskID string, status TaskStatus, err error) error {
	task, getErr := r.GetTask(ctx, taskID)
	if getErr != nil {
		return getErr
	}

	task.Status = status
	task.UpdatedAt = time.Now()
	if err != nil {
		task.Error = err.Error()
	}

	taskBytes, marshalErr := json.Marshal(task)
	if marshalErr != nil {
		return fmt.Errorf("marshal task: %w", marshalErr)
	}

	taskKey := fmt.Sprintf("%s%s", TaskKeyPrefix, taskID)
	if setErr := r.rdb.Set(ctx, taskKey, taskBytes, 24*time.Hour).Err(); setErr != nil {
		return fmt.Errorf("update task status: %w", setErr)
	}

	return nil
}

func (r *QueueRunner[T]) processTask(ctx context.Context, taskID string) error {
	task, err := r.GetTask(ctx, taskID)
	if err != nil {
		return fmt.Errorf("get task: %w", err)
	}

	handler, ok := r.getHandler(task.ID)
	if !ok {
		err := fmt.Errorf("no handler for task id: %s", task.ID)
		_ = r.UpdateTaskStatus(ctx, taskID, TaskStatusFailed, err)
		r.delHandler(taskID)
		return err
	}

	if err := r.UpdateTaskStatus(ctx, taskID, TaskStatusProcessing, nil); err != nil {
		r.delHandler(taskID)
		return fmt.Errorf("update task status: %w", err)
	}

	handleErr := handler(ctx, task)

	if handleErr != nil {
		if err := r.UpdateTaskStatus(ctx, taskID, TaskStatusFailed, handleErr); err != nil {
			r.logger.ErrorContext(ctx, "Failed to update task status", "error", err, "task_id", taskID)
		}
		r.delHandler(taskID)
		return handleErr
	}

	if err := r.UpdateTaskStatus(ctx, taskID, TaskStatusCompleted, nil); err != nil {
		r.logger.ErrorContext(ctx, "Failed to update task status", "error", err, "task_id", taskID)
		r.delHandler(taskID)
		return err
	}

	// Task processed successfully, remove handler
	r.delHandler(taskID)
	return nil
}

func (r *QueueRunner[T]) Run(ctx context.Context) error {
	r.logger.InfoContext(ctx, "Starting queue runner", "queue", r.name, "concurrent", r.concurrent)

	for i := 0; i < r.concurrent; i++ {
		go func(workerID int) {
			r.logger.InfoContext(ctx, "Starting worker", "worker_id", workerID)
			for {
				select {
				case <-ctx.Done():
					r.logger.InfoContext(ctx, "Worker stopped", "worker_id", workerID)
					return
				default:
				}

				result, err := r.rdb.BRPop(ctx, 5*time.Second, r.name).Result()
				if err != nil {
					if err == redis.Nil {
						continue
					}
					r.logger.ErrorContext(ctx, "Failed to pop task from queue", "error", err, "worker_id", workerID)
					time.Sleep(time.Second)
					continue
				}

				if len(result) != 2 {
					r.logger.ErrorContext(ctx, "Invalid result from BRPOP", "result", result, "worker_id", workerID)
					continue
				}

				taskID := result[1]
				r.logger.InfoContext(ctx, "Processing task", "task_id", taskID, "worker_id", workerID)

				if err := r.processTask(ctx, taskID); err != nil {
					r.logger.ErrorContext(ctx, "Failed to process task", "error", err, "task_id", taskID, "worker_id", workerID)
				}
			}
		}(i)
	}

	return nil
}
