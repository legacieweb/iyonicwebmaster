import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function checkPassword() {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', ['test@example.com']);
    const user = result.rows[0];
    if (!user) {
      console.log('User not found');
      return;
    }
    const match = bcrypt.compareSync('password123', user.password);
    console.log('Password match:', match);
    console.log('Hash in DB:', user.password);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

checkPassword();
