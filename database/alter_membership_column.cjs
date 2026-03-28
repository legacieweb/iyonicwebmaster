// Migration script to alter membership_tier column - remove default 'free'
// Run with: node database/alter_membership_column.cjs

require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function runMigration() {
  try {
    console.log('Altering membership_tier column to remove default...')
    
    // Alter the column to remove default value
    await pool.query(`
      ALTER TABLE users ALTER COLUMN membership_tier DROP DEFAULT;
    `)
    
    console.log('✅ Column altered successfully!')
    
    // Verify the column definition
    const result = await pool.query(`
      SELECT column_name, column_default, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'membership_tier'
    `)
    
    if (result.rows.length > 0) {
      console.log('✅ Column definition:', result.rows[0])
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
