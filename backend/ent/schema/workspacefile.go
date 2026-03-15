package schema

import (
	"fmt"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

// WorkspaceFile holds the schema definition for the WorkspaceFile entity.
type WorkspaceFile struct {
	ent.Schema
}

func (WorkspaceFile) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "workspace_files",
		},
	}
}

// Fields of the WorkspaceFile.
func (WorkspaceFile) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}),
		field.UUID("user_id", uuid.UUID{}).Comment("关联的用户ID"),
		field.UUID("workspace_id", uuid.UUID{}).Comment("关联的工作区ID"),
		field.Text("path").Validate(func(s string) error {
			if s == "" {
				return fmt.Errorf("path cannot be empty")
			}
			return nil
		}).Comment("文件在工作区中的相对路径"),
		field.Text("content").Optional().Comment("文件内容"),
		field.String("hash").Validate(func(s string) error {
			if len(s) != 64 {
				return fmt.Errorf("invalid SHA-256 hash length: expected 64, got %d", len(s))
			}
			return nil
		}).Comment("文件内容的 SHA-256 哈希值"),
		field.String("language").Optional().Comment("代码语言类型，如 go, typescript, python"),
		field.Int64("size").Default(0).Comment("文件大小（字节）"),
		field.Time("created_at").Default(time.Now).Immutable().Comment("创建时间"),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now).Comment("更新时间"),
	}
}

// Edges of the WorkspaceFile.
func (WorkspaceFile) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("owner", User.Type).Ref("workspace_files").Field("user_id").Unique().Required(),
		edge.From("workspace", Workspace.Type).Ref("files").Field("workspace_id").Unique().Required(),
		edge.To("snippets", CodeSnippet.Type),
	}
}

// Indexes of the WorkspaceFile.
func (WorkspaceFile) Indexes() []ent.Index {
	return []ent.Index{
		// 用户ID + 工作区ID + 路径的复合索引
		index.Fields("user_id", "workspace_id", "path").Unique(),
		// hash 索引，用于去重和快速查找
		index.Fields("hash"),
		// 工作区ID + hash 索引，防止同一工作区重复存储相同内容
		index.Fields("workspace_id", "hash"),
		// 语言类型索引
		index.Fields("language"),
		// 更新时间索引
		index.Fields("updated_at"),
		// 文件大小索引，便于统计和限制
		index.Fields("size"),
		// 工作区ID 索引（用于查询工作区下的所有文件）
		index.Fields("workspace_id"),
	}
}
