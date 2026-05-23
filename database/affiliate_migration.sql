-- Affiliate System Migration

-- Add is_affiliate to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_affiliate BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_code VARCHAR(50) UNIQUE;

-- Affiliates table
CREATE TABLE IF NOT EXISTS affiliates (
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(id) UNIQUE,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    total_earnings DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Referrals table (links clients to affiliates)
CREATE TABLE IF NOT EXISTS referrals (
    id SERIAL PRIMARY KEY,
    affiliate_id INTEGER REFERENCES affiliates(id),
    referred_user_id INTEGER REFERENCES users(id) UNIQUE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Affiliate Earnings/Commissions
CREATE TABLE IF NOT EXISTS affiliate_earnings (
    id SERIAL PRIMARY KEY,
    affiliate_id INTEGER REFERENCES affiliates(id),
    order_id INTEGER REFERENCES orders(id),
    amount DECIMAL(15,2) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    type VARCHAR(50), -- 'sale' (30%) or 'membership' (10%)
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_affiliates_userid ON affiliates(userid);
CREATE INDEX IF NOT EXISTS idx_affiliates_referral_code ON affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_affiliate_id ON referrals(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user_id ON referrals(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_earnings_affiliate_id ON affiliate_earnings(affiliate_id);
