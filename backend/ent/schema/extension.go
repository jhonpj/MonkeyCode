package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Extension holds the schema definition for the Extension entity.
type Extension struct {
	ent.Schema
}

func (Extension) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "extensions",
		},
	}
}

// Fields of the Extension.
func (Extension) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}),
		field.String("version"),
		field.String("path"),
		field.Time("created_at").Default(time.Now),
	}
}

// Edges of the Extension.
func (Extension) Edges() []ent.Edge {
	return nil
}
