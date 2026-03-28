-- PostgreSQL Schema for Iyonicorp Website Builder
-- Compatible with Neon DB

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    membership_tier VARCHAR(50) DEFAULT NULL,
    role VARCHAR(50) DEFAULT 'user',
    unlocked_tools JSONB DEFAULT '[]',
    activated_tools JSONB DEFAULT '[]',
    next_billing_date TIMESTAMP,
    free_period_end TIMESTAMP,
    subscription_status VARCHAR(50) DEFAULT 'inactive',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table (for portfolio/projects)
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    thumbnail VARCHAR(500),
    status VARCHAR(50) DEFAULT 'draft',
    template VARCHAR(100),
    userid INTEGER REFERENCES users(id),
    data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads table (contact form submissions)
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table (purchase orders)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    service_id VARCHAR(100),
    service_name VARCHAR(255),
    plan_name VARCHAR(255),
    amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    userid INTEGER REFERENCES users(id),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'open',
    userid INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Templates table (predefined templates)
CREATE TABLE IF NOT EXISTS templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    thumbnail VARCHAR(500),
    html_content TEXT,
    css_content TEXT,
    js_content TEXT,
    deployed BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partnership requests table
CREATE TABLE IF NOT EXISTS partnership_requests (
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(id),
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100),
    description TEXT,
    credentials TEXT,
    -- Business verification fields
    annual_revenue DECIMAL(15,2),
    revenue_currency VARCHAR(10) DEFAULT 'USD',
    social_media_facebook VARCHAR(255),
    social_media_twitter VARCHAR(255),
    social_media_instagram VARCHAR(255),
    social_media_linkedin VARCHAR(255),
    website VARCHAR(255),
    is_registered BOOLEAN DEFAULT false,
    registration_number VARCHAR(100),
    registration_document_path VARCHAR(500),
    bank_statement_path VARCHAR(500),
    mobile_money_statement_path VARCHAR(500),
    priority BOOLEAN DEFAULT false,
    admin_notes TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_projects_userid ON projects(userid);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_orders_userid ON orders(userid);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_userid ON support_tickets(userid);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_templates_deployed ON templates(deployed);
CREATE INDEX IF NOT EXISTS idx_templates_status ON templates(status);