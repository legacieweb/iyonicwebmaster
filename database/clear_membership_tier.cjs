// Migration script to clear membership_tier from existing users
// Run with: node database/clear_membership_tier.js

require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function runMigration() {
  try {
    console.log('Clearing membership_tier from existing users...')
    
    // Update all users who have 'free' membership tier to NULL
    const result = await pool.query(`
      UPDATE users SET membership_tier = NULL WHERE membership_tier = 'free';
    `)
    
    console.log(`✅ Updated ${result.rowCount} users to have NULL membership_tier`)
    
    // Verify the changes
    const verifyResult = await pool.query(`
      SELECT membership_tier, COUNT(*) as count 
      FROM users 
      GROUP BY membership_tier
    `)
    
    console.log('✅ Current membership_tier distribution:')
    verifyResult.rows.forEach(row => {
      console.log(`  - ${row.membership_tier || 'NULL'}: ${row.count} users`)
    })
    
    process.exit(0)
  } catch (err) {
    console.error('❌ Migration failed:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

runMigration()
