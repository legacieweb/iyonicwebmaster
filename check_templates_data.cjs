require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function checkTemplatesData() {
  try {
    const result = await pool.query('SELECT id, name, url, pages FROM templates')
    console.log('\nTemplates Data:')
    result.rows.forEach(row => {
      console.log(`ID: ${row.id}, Name: ${row.name}`)
      console.log(`URL: ${row.url || 'None'}`)
      console.log(`Pages Type: ${typeof row.pages}`)
      console.log(`Pages Content: ${JSON.stringify(row.pages).substring(0, 100)}...`)
      console.log('---')
    })
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await pool.end()
  }
}

checkTemplatesData()
