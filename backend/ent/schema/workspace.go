package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

// Workspace holds the schema definition for the Workspace entity.
type Workspace struct {
	ent.Schema
}

func (Workspace) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "workspaces",
		},
	}
}

// Fields of the Workspace.
func (Workspace) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}),
		field.UUID("user_id", uuid.UUID{}).Comment("工作区所有者ID"),
		field.String("name").Optional().Comment("工作区名称"),
		field.String("description").Optional().Comment("工作区描述"),
		field.String("root_path").NotEmpty().Comment("工作区根路径"),
		field.JSON("settings", map[string]any{}).Optional().Comment("工作区设置"),
		field.Time("last_accessed_at").Default(time.Now).Comment("最后访问时间"),
		field.Time("created_at").Default(time.Now).Immutable().Comment("创建时间"),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now).Comment("更新时间"),
	}
}

// Edges of the Workspace.
func (Workspace) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("owner", User.Type).Ref("workspaces").Field("user_id").Unique().Required(),
		edge.To("files", WorkspaceFile.Type),
		edge.To("security_scannings", SecurityScanning.Type),
	}
}

// Indexes of the Workspace.
func (Workspace) Indexes() []ent.Index {
	return []ent.Index{
		// 用户ID + 根路径的唯一约束（同一用户不能有相同根路径的工作区）
		index.Fields("user_id", "root_path").Unique(),
		// 用户ID 索引
		index.Fields("user_id"),
		// 最后访问时间索引
		index.Fields("last_accessed_at"),
		// 工作区名称索引（用于按名称搜索）
		index.Fields("name"),
		// 根路径索引
		index.Fields("root_path"),
	}
}
