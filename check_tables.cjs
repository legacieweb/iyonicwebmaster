require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function checkTables() {
  try {
    const result = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name LIKE 'coupon%'
    `)
    console.log('Coupon tables:', result.rows)
    
    // Check if coupon_codes has correct columns
    const columns = await pool.query(`
      SELECT column_name, data_type FROM information_schema.columns 
      WHERE table_name = 'coupon_codes' ORDER BY ordinal_position
    `)
    console.log('\nCoupon codes columns:')
    console.log(columns.rows)
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await pool.end()
  }
}

checkTables()
