CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    city TEXT,
    budget TEXT,
    start_date TEXT,
    task TEXT,
    intent TEXT,
    source TEXT,
    page TEXT,
    brief JSONB,
    selection JSONB,
    utm JSONB,
    consent_version TEXT,
    delivered_telegram BOOLEAN NOT NULL DEFAULT false,
    delivered_max BOOLEAN NOT NULL DEFAULT false,
    delivery_error TEXT,
    request_id TEXT
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_intent_idx ON leads (intent);