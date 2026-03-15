package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
	"github.com/pgvector/pgvector-go"
)

// CodeSnippet holds the schema definition for the CodeSnippet entity.
type CodeSnippet struct {
	ent.Schema
}

func (CodeSnippet) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entsql.Annotation{
			Table: "code_snippets",
		},
	}
}

// Fields of the CodeSnippet.
func (CodeSnippet) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}),
		field.UUID("workspace_file_id", uuid.UUID{}).Comment("关联的源文件ID"),

		// Basic Info
		field.String("name").Comment("符号名称 (e.g., function name, class name)"),
		field.String("snippet_type").Comment("片段类型 (e.g., import_or_include, function_or_method)"),
		field.String("language").Comment("代码语言"),
		field.Text("content").Comment("代码片段原文 (rangeText)"),
		field.String("hash").Comment("代码片段内容的哈希值，用于去重"),

		// Position Info
		field.Int("start_line").Comment("在源文件中的起始行号"),
		field.Int("end_line").Comment("在源文件中的结束行号"),
		field.Int("start_column").Comment("在源文件中的起始列号"),
		field.Int("end_column").Comment("在源文件中的结束列号"),

		// Context Info
		field.String("namespace").Optional().Comment("所处的namespace名称"),
		field.String("container_name").Optional().Comment("所处的class/struct/interface名称"),
		field.JSON("scope", []string{}).Optional().Comment("作用域链"),
		field.JSON("dependencies", []string{}).Optional().Comment("依赖项"),

		// Structured Info
		field.JSON("parameters", []map[string]any{}).Optional().Comment("参数信息列表 (ParameterInfo[])"),
		field.Text("signature").Optional().Comment("函数/方法签名"),
		field.Text("definition_text").Optional().Comment("定义文本，用于提供定义参考"),
		field.JSON("structured_info", map[string]any{}).Optional().Comment("结构化信息 (definition)"),

		// Vector embedding for semantic search
		field.Other("embedding", pgvector.Vector{}).
			SchemaType(map[string]string{
				dialect.Postgres: "vector(1024)",
			}).
			Optional().
			Comment("Vector embedding for semantic search"),

		// Workspace path for faster lookup
		field.String("workspacePath").Optional().Comment("工作区路径，用于快速查找"),
	}
}

// Edges of the CodeSnippet.
func (CodeSnippet) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("source_file", WorkspaceFile.Type).
			Ref("snippets").
			Field("workspace_file_id").
			Unique().
			Required(),
	}
}

// Indexes of the CodeSnippet.
func (CodeSnippet) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("hash"),
		index.Fields("workspace_file_id"),
		index.Fields("language", "snippet_type"),
		index.Fields("language", "name"),
		index.Fields("embedding").
			Annotations(
				entsql.IndexType("hnsw"),
				entsql.OpClass("vector_cosine_ops"),
			),
		index.Fields("workspacePath"),
	}
}
