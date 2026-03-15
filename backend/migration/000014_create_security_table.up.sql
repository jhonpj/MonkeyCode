CREATE TABLE IF NOT EXISTS security_scannings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    workspace_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL,
    workspace TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    rule TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_scanning_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    security_scanning_id UUID NOT NULL,
    check_id VARCHAR(128),
    engine_kind VARCHAR(32),
    lines TEXT,
    path TEXT,
    message TEXT,
    message_zh TEXT,
    severity VARCHAR(50),
    abstract_en TEXT,
    abstract_zh TEXT,
    category_en TEXT,
    category_zh TEXT,
    confidence VARCHAR(50),
    cwe JSONB,
    impact VARCHAR(50),
    owasp JSONB,
    start_position JSONB,
    end_position JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS security_scanning_results_owner_id ON security_scanning_results (security_scanning_id);