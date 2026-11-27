CREATE TABLE IF NOT EXISTS clients_leads (
    id SERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    lift_type TEXT,
    inquiry TEXT,
    status TEXT DEFAULT 'New',
    feedback_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_resources (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    total_qty INT NOT NULL DEFAULT 1,
    used_today INT NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'Available',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    lead_id INT REFERENCES clients_leads(id) ON DELETE CASCADE,
    service_type TEXT NOT NULL,
    scheduled_date DATE NOT NULL,
    assigned_staff TEXT,
    assigned_equipment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO inventory_resources (name, category, total_qty, used_today, status)
VALUES
    ('Lead Installation Engineer', 'Staff', 4, 0, 'Available'),
    ('Electrical & Drive Technician', 'Staff', 3, 0, 'Available'),
    ('Heavy Hoist & Chain Block Kit', 'Equipment', 3, 0, 'Available'),
    ('Shaft Scaffolding Set', 'Equipment', 4, 0, 'Available'),
    ('Diagnostic Multimeter & Fault Kit', 'Equipment', 5, 0, 'Available')
ON CONFLICT DO NOTHING;
