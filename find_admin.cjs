require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function findAdmin() {
  try {
    const result = await pool.query(`
      SELECT id, email, role FROM users WHERE role = 'admin' LIMIT 1
    `)
    console.log('Admin users:', result.rows)
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await pool.end()
  }
}

findAdmin()
