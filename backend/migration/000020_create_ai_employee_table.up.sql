CREATE TABLE IF NOT EXISTS ai_employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(50) NOT NULL, -- 研发工程师, 产品经理, 设计师
    repository_url TEXT NOT NULL,
    repository_user VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL, -- github, gitlab, bitbucket
    token TEXT NOT NULL,
    webhook_secret VARCHAR(64) NOT NULL,
    webhook_url TEXT NOT NULL,
    parameters JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_employees_position ON ai_employees (position);
CREATE INDEX IF NOT EXISTS idx_ai_employees_platform ON ai_employees (platform);
CREATE INDEX IF NOT EXISTS idx_ai_employees_repository_url ON ai_employees (repository_url);
CREATE INDEX IF NOT EXISTS idx_ai_employees_token ON ai_employees (token);
CREATE INDEX IF NOT EXISTS idx_ai_employees_admin_id ON ai_employees (admin_id);
CREATE INDEX IF NOT EXISTS idx_ai_employees_webhook_secret ON ai_employees (webhook_secret);

CREATE TABLE IF NOT EXISTS ai_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL, -- init, running, success, failed
    output TEXT,
    logs TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_tasks_employee_id ON ai_tasks (employee_id);
CREATE INDEX IF NOT EXISTS idx_ai_tasks_status ON ai_tasks (status);
