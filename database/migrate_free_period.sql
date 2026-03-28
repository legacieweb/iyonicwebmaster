-- Migration: Add free_period_end column to users table
-- Run this script to add the 6-month free period feature

ALTER TABLE users ADD COLUMN IF NOT EXISTS free_period_end TIMESTAMP;

-- Optional: Set free_period_end for existing users (6 months from now)
-- UPDATE users SET free_period_end = NOW() + INTERVAL '6 months' WHERE free_period_end IS NULL AND membership_tier = 'free';
