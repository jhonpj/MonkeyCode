-- Alter workspace_files table to change path column from TEXT to VARCHAR(255)
-- Note: This operation may fail if any existing path values exceed 255 characters
ALTER TABLE workspace_files
ALTER COLUMN path TYPE VARCHAR(255);