// Migration script to add coupon tables
// Run with: node database/run_coupon_migration.cjs

require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function runMigration() {
  try {
    console.log('Running coupon migration...')
    
    // Create coupon_codes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS coupon_codes (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_percentage DECIMAL(5,2) NOT NULL,
        discount_type VARCHAR(20) DEFAULT 'percentage',
        max_uses INTEGER,
        current_uses INTEGER DEFAULT 0,
        expires_at TIMESTAMP,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT true,
        description TEXT,
        new_users_only BOOLEAN DEFAULT true,
        applicable_tiers TEXT[]
      )
    `)
    console.log('✅ Created coupon_codes table')
    
    // Create index
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_coupon_codes_code ON coupon_codes(code)
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_coupon_codes_active ON coupon_codes(is_active)
    `)
    console.log('✅ Created indexes')
    
    // Add coupon fields to users table
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50)
    `)
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS coupon_discount_applied DECIMAL(5,2)
    `)
    console.log('✅ Added coupon fields to users table')
    
    // Create used_coupons table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS used_coupons (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        coupon_id INTEGER REFERENCES coupon_codes(id),
        used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, coupon_id)
      )
    `)
    console.log('✅ Created used_coupons table')
    
    // Insert some sample coupon codes
    const existingCoupons = await pool.query(`SELECT code FROM coupon_codes LIMIT 1`)
    if (existingCoupons.rows.length === 0) {
      // Add welcome coupon for new users - 20% off
      await pool.query(`
        INSERT INTO coupon_codes (code, discount_percentage, description, new_users_only, applicable_tiers, expires_at)
        VALUES ('WELCOME20', 20, 'Welcome discount for new users', true, ARRAY['free', 'premium'], NOW() + INTERVAL '90 days')
      `)
      // Add launch coupon - 30% off for premium tiers
      await pool.query(`
        INSERT INTO coupon_codes (code, discount_percentage, description, new_users_only, applicable_tiers, expires_at)
        VALUES ('LAUNCH30', 30, 'Launch special discount', true, ARRAY['premium_plus', 'enterprise'], NOW() + INTERVAL '90 days')
      `)
      console.log('✅ Added sample coupon codes')
    }
    
    console.log('✅ Coupon migration completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Migration failed:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

runMigration()
