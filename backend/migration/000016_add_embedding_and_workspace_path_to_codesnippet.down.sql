-- Remove embedding column from code_snippets table
ALTER TABLE code_snippets DROP COLUMN IF EXISTS embedding;
-- Remove workspace_path column from code_snippets table
ALTER TABLE code_snippets DROP COLUMN IF EXISTS workspace_path;
-- Optionally drop the extension if it's no longer needed
-- DROP EXTENSION IF EXISTS vector;