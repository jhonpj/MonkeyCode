package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/chaitin/MonkeyCode/backend/consts"
	"github.com/google/uuid"
)

// Task holds the schema definition for the Task entity.
type Task struct {
	ent.Schema
}

func (Task) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "tasks",
		},
	}
}

// Fields of the Task.
func (Task) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}),
		field.String("task_id").Unique(),
		field.UUID("user_id", uuid.UUID{}).Optional(),
		field.UUID("model_id", uuid.UUID{}).Optional(),
		field.String("request_id").Optional(),
		field.String("model_type").GoType(consts.ModelType("")),
		field.Bool("is_accept").Default(false),
		field.String("program_language").Optional(),
		field.String("work_mode").Optional(),
		field.String("prompt").Optional(), // 用户输入的提示
		field.String("completion").Optional(),
		field.Int64("code_lines").Optional(),
		field.Int64("input_tokens").Optional(),
		field.Int64("output_tokens").Optional(),
		field.Bool("is_suggested").Default(false),
		field.String("source_code").Optional(),                     // 当前文件的原文
		field.JSON("cursor_position", map[string]any{}).Optional(), // 光标位置 {"line": 10, "column": 5}
		field.String("user_input").Optional(),                      // 用户实际输入的内容
		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

// Edges of the Task.
func (Task) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("task_records", TaskRecord.Type),
		edge.From("user", User.Type).Ref("tasks").Field("user_id").Unique(),
		edge.From("model", Model.Type).Ref("tasks").Field("model_id").Unique(),
	}
}
