package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/chaitin/MonkeyCode/backend/ent/types"
	"github.com/google/uuid"
)

// SecurityScanningResult holds the schema definition for the SecurityScanningResult entity.
type SecurityScanningResult struct {
	ent.Schema
}

func (SecurityScanningResult) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{Table: "security_scanning_results"},
	}
}

// Fields of the SecurityScanningResult.
func (SecurityScanningResult) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}),
		field.UUID("security_scanning_id", uuid.UUID{}),
		field.String("check_id"),
		field.String("engine_kind"),
		field.Text("lines"),
		field.Text("path"),
		field.Text("message"),
		field.Text("message_zh"),
		field.String("severity"),
		field.Text("abstract_en"),
		field.Text("abstract_zh"),
		field.Text("category_en"),
		field.Text("category_zh"),
		field.String("confidence"),
		field.JSON("cwe", []any{}),
		field.String("impact"),
		field.JSON("owasp", []any{}),
		field.Text("file_content"),
		field.JSON("start_position", &types.Position{}),
		field.JSON("end_position", &types.Position{}),
		field.Time("created_at").Default(time.Now),
	}
}

// Edges of the SecurityScanningResult.
func (SecurityScanningResult) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("security_scanning", SecurityScanning.Type).Ref("results").Unique().Field("security_scanning_id").Required(),
	}
}
