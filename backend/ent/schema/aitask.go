package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// AITask holds the schema definition for the AITask entity.
type AITask struct {
	ent.Schema
}

func (AITask) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{Table: "ai_tasks"},
	}
}

// Fields of the AITask.
func (AITask) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}),
		field.UUID("employee_id", uuid.UUID{}),
		field.String("status").Default("pending"),
		field.Text("output").Optional().Nillable(),
		field.Text("logs").Optional().Nillable(),
		field.Text("error_message").Optional().Nillable(),
		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now),
	}
}

// Edges of the AITask.
func (AITask) Edges() []ent.Edge {
	return nil
}
