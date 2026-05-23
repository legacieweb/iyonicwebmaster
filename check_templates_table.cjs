require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function checkTemplates() {
  try {
    const columns = await pool.query(`
      SELECT column_name, data_type FROM information_schema.columns 
      WHERE table_name = 'templates' ORDER BY ordinal_position
    `)
    console.log('\nTemplates columns:')
    console.log(columns.rows)
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await pool.end()
  }
}

checkTemplates()
