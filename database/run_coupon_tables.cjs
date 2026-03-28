require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function runCouponMigration() {
  try {
    console.log('Creating coupon tables...')
    
    // Create coupon_codes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS coupon_codes (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_percentage DECIMAL(5,2) NOT NULL,
        discount_type VARCHAR(20) DEFAULT 'percentage',
        description TEXT,
        expires_at TIMESTAMP,
        new_users_only BOOLEAN DEFAULT true,
        applicable_tiers TEXT[],
        current_uses INTEGER DEFAULT 0,
        max_uses INTEGER,
        is_active BOOLEAN DEFAULT true,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ coupon_codes table created')
    
    // Create used_coupons table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS used_coupons (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        coupon_id INTEGER REFERENCES coupon_codes(id),
        used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ used_coupons table created')
    
    // Create indexes
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_coupon_codes_code ON coupon_codes(code)`)
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_coupon_codes_active ON coupon_codes(is_active)`)
    console.log('✅ Indexes created')
    
    console.log('\n🎉 Coupon tables migration completed!')
  } catch (err) {
    console.error('Migration error:', err)
  } finally {
    await pool.end()
  }
}

runCouponMigration()
