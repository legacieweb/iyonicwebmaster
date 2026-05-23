require('dotenv').config()
const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function runMigration() {
  try {
    console.log('Running affiliate system migration...')
    
    const migrationPath = path.join(__dirname, 'database', 'affiliate_migration.sql')
    const sql = fs.readFileSync(migrationPath, 'utf8')
    
    await pool.query(sql)
    
    console.log('✅ Affiliate migration completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Migration failed:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

runMigration()
