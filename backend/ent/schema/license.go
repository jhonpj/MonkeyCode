package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/field"
	"github.com/chaitin/MonkeyCode/backend/consts"
)

// License holds the schema definition for the License entity.
type License struct {
	ent.Schema
}

func (License) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "license",
		},
	}
}

// Fields of the License.
func (License) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Positive().Unique(),
		field.String("type").GoType(consts.LicenseType("")),
		field.Bytes("data").Optional(),
		field.String("code").Optional(),
		field.Time("created_at").Default(time.Now),
	}
}

// Edges of the License.
func (License) Edges() []ent.Edge {
	return nil
}
