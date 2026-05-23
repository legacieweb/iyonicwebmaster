import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, './.env') });

const { Pool } = pg;

console.log('Testing connection to:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000
});

async function test() {
  try {
    console.log('Attempting to connect...');
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful!', res.rows[0]);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await pool.end();
  }
}

test();
