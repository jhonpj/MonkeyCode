-- Alter workspace_files table to change path column from VARCHAR(255) to TEXT
ALTER TABLE workspace_files
ALTER COLUMN path TYPE TEXT;