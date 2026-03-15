ALTER TABLE ai_employees ALTER COLUMN admin_id SET NOT NULL;
ALTER TABLE ai_employees DROP COLUMN IF EXISTS user_id;
ALTER TABLE ai_employees DROP COLUMN IF EXISTS created_by;