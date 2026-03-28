-- Migration to add coupon codes table
-- Run with: psql $DATABASE_URL -f database/coupon_migration.sql

-- Create coupon codes table
CREATE TABLE IF NOT EXISTS coupon_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percentage DECIMAL(5,2) NOT NULL,
    discount_type VARCHAR(20) DEFAULT 'percentage', -- 'percentage' or 'fixed'
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    expires_at TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    description TEXT,
    -- New user only restriction
    new_users_only BOOLEAN DEFAULT true,
    -- Tier restrictions (which tiers this coupon applies to)
    applicable_tiers TEXT[] DEFAULT ARRAY['free', 'premium', 'premium_plus', 'enterprise']
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_coupon_codes_code ON coupon_codes(code);
CREATE INDEX IF NOT EXISTS idx_coupon_codes_active ON coupon_codes(is_active);

-- Add coupon_code field to users table (to track which coupon was used)
ALTER TABLE users ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS coupon_discount_applied DECIMAL(5,2);

-- Add used_coupons table to track who used which coupon
CREATE TABLE IF NOT EXISTS used_coupons (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    coupon_id INTEGER REFERENCES coupon_codes(id),
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, coupon_id)
);
