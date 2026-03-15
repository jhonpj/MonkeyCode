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

// SecurityScanning holds the schema definition for the SecurityScanning entity.
type SecurityScanning struct {
	ent.Schema
}

func (SecurityScanning) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "security_scannings",
		},
	}
}

// Fields of the SecurityScanning.
func (SecurityScanning) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}),
		field.UUID("user_id", uuid.UUID{}),
		field.UUID("workspace_id", uuid.UUID{}),
		field.String("status").GoType(consts.SecurityScanningStatus("")),
		field.String("workspace"),
		field.String("language").GoType(consts.SecurityScanningLanguage("")),
		field.String("rule").Optional(),
		field.String("error_message").Optional(),
		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now),
	}
}

// Edges of the SecurityScanning.
func (SecurityScanning) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Field("user_id").Ref("security_scannings").Unique().Required(),
		edge.To("results", SecurityScanningResult.Type),
		edge.From("workspace_edge", Workspace.Type).Field("workspace_id").Ref("security_scannings").Unique().Required(),
	}
}
