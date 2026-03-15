-- Create license table
CREATE TABLE IF NOT EXISTS license (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL,
    data BYTEA,
    code VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_license_type ON license (type);
CREATE INDEX IF NOT EXISTS idx_license_code ON license (code);
CREATE INDEX IF NOT EXISTS idx_license_created_at ON license (created_at);
