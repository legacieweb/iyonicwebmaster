require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function makeAdmin() {
  try {
    // Make the first user an admin
    const result = await pool.query(`
      UPDATE users SET role = 'admin' 
      WHERE email = 'andreawellsin99@gmail.com' 
      RETURNING id, email, role
    `)
    console.log('User updated to admin:', result.rows[0])
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await pool.end()
  }
}

makeAdmin()
