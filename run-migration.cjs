// Migration script to add free_period_end column
// Run with: node run-migration.cjs

require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function runMigration() {
  try {
    console.log('Running migration to add free_period_end column...')
    
    // Add the column if it doesn't exist
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS free_period_end TIMESTAMP;
    `)
    
    console.log('✅ Migration completed successfully!')
    console.log('The free_period_end column has been added to the users table.')
    
    // Verify the column was added
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'free_period_end'
    `)
    
    if (result.rows.length > 0) {
      console.log('✅ Column verified:', result.rows[0])
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
