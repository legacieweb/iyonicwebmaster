// Migration script to update existing free_period_end to 30 days from now
// Run with: node database/update_free_period.cjs

require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function runMigration() {
  try {
    console.log('Updating existing free_period_end to 30 days from now...')
    
    // Calculate new free period end (30 days from now)
    const newFreePeriodEnd = new Date()
    newFreePeriodEnd.setDate(newFreePeriodEnd.getDate() + 30)
    const newFreePeriodEndStr = newFreePeriodEnd.toISOString()
    
    // Update users who have a free_period_end in the future (still on trial)
    const result = await pool.query(
      `UPDATE users 
       SET free_period_end = $1, next_billing_date = $1
       WHERE free_period_end > NOW()
       RETURNING id, email, free_period_end`,
      [newFreePeriodEndStr]
    )
    
    console.log(`✅ Updated ${result.rowCount} users to have 30-day free trial`)
    
    if (result.rows.length > 0) {
      console.log('Updated users:')
      result.rows.forEach(row => {
        console.log(`  - ${row.email}: ${row.free_period_end}`)
      })
    }
    
    process.exit(0)
  } catch (err) {
    console.error('❌ Migration failed:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

runMigration()
