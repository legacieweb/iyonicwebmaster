require('dotenv').config()
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function createAdmin() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    // Insert admin user
    const result = await pool.query(`
      INSERT INTO users (email, password, name, role, created_at)
      VALUES ($1, $2, 'Admin', 'admin', NOW())
      RETURNING id, email, role
    `, ['admin@iyonicorp.com', hashedPassword])
    
    console.log('Admin user created:', result.rows[0])
    console.log('Admin user ID:', result.rows[0].id)
  } catch (err) {
    // Check if user already exists
    if (err.code === '23505') {
      console.log('User already exists, updating role to admin...')
      const updateResult = await pool.query(`
        UPDATE users SET role = 'admin' 
        WHERE email = 'admin@iyonicorp.com'
        RETURNING id, email, role
      `)
      console.log('Updated:', updateResult.rows[0])
    } else {
      console.error('Error:', err.message)
    }
  } finally {
    await pool.end()
  }
}

createAdmin()
