import pg from 'pg';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;

async function createTestUser() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Creating test user...');

    const hashedPassword = bcrypt.hashSync('password123', 10);

    const result = await pool.query(
      'INSERT INTO users (email, password, first_name, last_name, phone_number, name) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password RETURNING id, email, name',
      ['test@example.com', hashedPassword, 'Test', 'User', '+1234567890', 'Test User']
    );

    if (result.rows.length > 0) {
      console.log('✅ Test user created successfully!');
      console.log('Email: test@example.com');
      console.log('Password: password123');
    } else {
      console.log('ℹ️  Test user already exists');
    }

  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    await pool.end();
  }
}

createTestUser();