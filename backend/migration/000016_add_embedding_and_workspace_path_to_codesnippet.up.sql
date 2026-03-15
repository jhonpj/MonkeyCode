-- Install pgvector extension for vector similarity search
-- Note: This requires pgvector to be installed on the PostgreSQL server
CREATE EXTENSION IF NOT EXISTS vector;
-- Add embedding column to code_snippets table for semantic search
-- Using vector type for pgvector compatibility
ALTER TABLE code_snippets
ADD COLUMN IF NOT EXISTS embedding vector(1024);
-- Default dimension, adjust as needed
-- Add workspace_path column to code_snippets table for faster lookup
ALTER TABLE code_snippets
ADD COLUMN IF NOT EXISTS workspace_path TEXT;
-- Create an index for the embedding column to improve search performance
CREATE INDEX IF NOT EXISTS idx_code_snippets_embedding ON code_snippets USING hnsw (embedding vector_cosine_ops);
-- Create an index for the workspace_path column to improve search performance
CREATE INDEX IF NOT EXISTS idx_code_snippets_workspace_path ON code_snippets (workspace_path);