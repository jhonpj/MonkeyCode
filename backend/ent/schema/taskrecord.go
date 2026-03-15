package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"

	"github.com/chaitin/MonkeyCode/backend/consts"
)

// TaskRecord holds the schema definition for the TaskRecord entity.
type TaskRecord struct {
	ent.Schema
}

func (TaskRecord) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "task_records",
		},
	}
}

// Fields of the TaskRecord.
func (TaskRecord) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Unique(),
		field.UUID("task_id", uuid.UUID{}).Optional(),
		field.String("prompt").Optional(),
		field.String("role").GoType(consts.ChatRole("")),
		field.String("completion").Optional(),
		field.Int64("output_tokens").Default(0),
		field.Int64("code_lines").Default(0),
		field.String("code").Optional(),
		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

// Edges of the TaskRecord.
func (TaskRecord) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).Ref("task_records").Field("task_id").Unique(),
	}
}
