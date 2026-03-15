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
	"github.com/chaitin/MonkeyCode/backend/ent/types"
)

// AIEmployee holds the schema definition for the AIEmployee entity.
type AIEmployee struct {
	ent.Schema
}

func (AIEmployee) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "ai_employees",
		},
	}
}

// Fields of the AIEmployee.
func (AIEmployee) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}),
		field.UUID("admin_id", uuid.UUID{}).Optional(),
		field.UUID("user_id", uuid.UUID{}).Optional(),
		field.String("name"),
		field.String("position").GoType(consts.AIEmployeePosition("")),
		field.String("repository_url"),
		field.String("repository_user"),
		field.String("platform").GoType(consts.RepoPlatform("")),
		field.String("token"),
		field.String("webhook_secret"),
		field.String("webhook_url"),
		field.String("created_by").GoType(consts.CreatedBy("")),
		field.JSON("parameters", &types.AIEmployeeParam{}),
		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

// Edges of the AIEmployee.
func (AIEmployee) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("admin", Admin.Type).Ref("aiemployees").Field("admin_id").Unique(),
		edge.From("user", User.Type).Ref("aiemployees").Field("user_id").Unique(),
	}
}
