-- Add payment_reference column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS payment_reference VARCHAR(100);
