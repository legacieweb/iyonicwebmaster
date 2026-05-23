import express from 'express';
import cors from 'cors';
import pg from 'pg';
const { Pool } = pg;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 5000;

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'iyonicpay@gmail.com',
    pass: process.env.EMAIL_PASS || 'fhzwxumoymnakkww'
  }
});

// Modern Email Template Builder
const createEmailTemplate = (options) => {
  const { 
    title, 
    subtitle, 
    userName, 
    content, 
    actionText, 
    actionUrl, 
    footerText, 
    type // 'welcome', 'notification', 'alert', 'success', 'info'
  } = options;
  
  const currentYear = new Date().getFullYear();
  
  // Color scheme based on type
  const colors = {
    welcome: { primary: '#6366f1', secondary: '#4f46e5', gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' },
    notification: { primary: '#0ea5e9', secondary: '#0284c7', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)' },
    alert: { primary: '#ef4444', secondary: '#dc2626', gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' },
    success: { primary: '#22c55e', secondary: '#16a34a', gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)' },
    info: { primary: '#8b5cf6', secondary: '#7c3aed', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' }
  };
  
  const theme = colors[type] || colors.info;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      background: #f8fafc; 
      line-height: 1.6; 
      color: #334155;
    }
    .email-wrapper { 
      width: 100%; 
      background: #f8fafc; 
      padding: 40px 20px;
    }
    .email-container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: #ffffff; 
      border-radius: 24px; 
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    }
    .email-header { 
      background: ${theme.gradient}; 
      padding: 50px 40px; 
      text-align: center;
      position: relative;
    }
    .email-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/></svg>');
      background-size: 200px;
      opacity: 0.5;
    }
    .logo { 
      position: relative; 
      z-index: 1;
    }
    .logo-text { 
      font-size: 32px; 
      font-weight: 800; 
      color: white; 
      letter-spacing: -1px;
    }
    .email-header h1 { 
      position: relative; 
      z-index: 1;
      font-size: 28px; 
      font-weight: 700; 
      color: white; 
      margin-bottom: 8px;
    }
    .email-header p { 
      position: relative; 
      z-index: 1;
      color: rgba(255, 255, 255, 0.9); 
      font-size: 16px;
    }
    .email-body { 
      padding: 50px 40px; 
    }
    .greeting { 
      font-size: 24px; 
      font-weight: 700; 
      color: #1e293b; 
      margin-bottom: 24px;
    }
    .content-text { 
      font-size: 16px; 
      color: #475569; 
      margin-bottom: 24px;
      line-height: 1.8;
    }
    .content-box { 
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
      border-radius: 16px; 
      padding: 24px; 
      margin: 24px 0;
      border: 1px solid #e2e8f0;
    }
    .content-box h3 { 
      font-size: 14px; 
      font-weight: 600; 
      color: #64748b; 
      text-transform: uppercase; 
      letter-spacing: 1px;
      margin-bottom: 16px;
    }
    .detail-row { 
      display: flex; 
      justify-content: space-between; 
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .detail-row:last-child { 
      border-bottom: none;
    }
    .detail-label { 
      font-weight: 600; 
      color: #475569;
    }
    .detail-value { 
      color: #1e293b;
      font-weight: 500;
    }
    .cta-button { 
      display: inline-block; 
      background: ${theme.gradient}; 
      color: white; 
      padding: 16px 40px; 
      border-radius: 12px; 
      text-decoration: none; 
      font-weight: 600; 
      font-size: 16px;
      margin: 24px 0;
      box-shadow: 0 10px 30px ${theme.primary}40;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .cta-button:hover { 
      transform: translateY(-2px);
      box-shadow: 0 15px 40px ${theme.primary}50;
    }
    .alert-box { 
      background: ${theme.primary}10; 
      border-left: 4px solid ${theme.primary}; 
      padding: 20px; 
      border-radius: 8px; 
      margin: 20px 0;
    }
    .email-footer { 
      background: #0f172a; 
      padding: 40px; 
      text-align: center;
    }
    .footer-logo { 
      font-size: 24px; 
      font-weight: 800; 
      color: white; 
      letter-spacing: -0.5px;
      margin-bottom: 16px;
    }
    .footer-text { 
      color: #94a3b8; 
      font-size: 14px;
      margin-bottom: 8px;
    }
    .footer-links { 
      margin-top: 20px;
    }
    .footer-links a { 
      color: #6366f1; 
      text-decoration: none; 
      margin: 0 12px;
      font-size: 14px;
    }
    .social-links { 
      margin-top: 24px;
    }
    .social-links a { 
      display: inline-block; 
      width: 40px; 
      height: 40px; 
      background: rgba(255, 255, 255, 0.1); 
      border-radius: 50%; 
      line-height: 40px; 
      color: white; 
      text-decoration: none; 
      margin: 0 6px;
      font-size: 18px;
    }
    .divider { 
      height: 1px; 
      background: linear-gradient(90deg, transparent, #e2e8f0, transparent); 
      margin: 30px 0;
    }
    @media (max-width: 600px) {
      .email-header { padding: 40px 24px; }
      .email-body { padding: 40px 24px; }
      .email-footer { padding: 30px 24px; }
      .detail-row { flex-direction: column; }
      .detail-value { margin-top: 4px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <div class="email-header">
        <div class="logo">
          <span class="logo-text">Iyonicorp</span>
        </div>
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ''}
      </div>
      
      <div class="email-body">
        <p class="greeting">Hi ${userName || 'there'}! 👋</p>
        
        <div class="content-text">
          ${content}
        </div>
        
        ${actionText && actionUrl ? `
          <center>
            <a href="${actionUrl}" class="cta-button">${actionText}</a>
          </center>
        ` : ''}
        
        <div class="divider"></div>
        
        <p style="font-size: 14px; color: #94a3b8; text-align: center;">
          ${footerText || 'If you have any questions, reply to this email or contact our support team.'}
        </p>
      </div>
      
      <div class="email-footer">
        <div class="footer-logo">Iyonicorp</div>
        <p class="footer-text">Defined by Innovation</p>
        <p class="footer-text">© ${currentYear} Iyonicorp. All rights reserved.</p>
        <div class="social-links">
          <a href="https://twitter.com/iyonicorp">𝕏</a>
          <a href="https://www.linkedin.com/company/iyonicorp">in</a>
          <a href="https://www.instagram.com/iyonicorp">📷</a>
          <a href="https://www.youtube.com/@iyonicorp">▶</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

// Email helper function with modern templates
const sendEmail = async (to, subject, html, type = 'info') => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'iyonicpay@gmail.com',
      to,
      subject,
      html
    });
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Configure multer for file uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images and PDF documents are allowed'));
  }
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000, // Increased from 10s to 30s
  keepAlive: true
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
});

// Retry helper for database queries
const queryWithRetry = async (text, params, retries = 2) => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      const isTransient = err.code === 'ECONNRESET' || 
                         err.code === 'ETIMEDOUT' || 
                         err.code === 'ENOTFOUND' ||
                         err.message.includes('Connection terminated unexpectedly') ||
                         err.message.includes('Client network socket disconnected');
      
      if (i === retries || !isTransient) throw err;
      
      console.warn(`Database query failed (attempt ${i + 1}/${retries + 1}), retrying...`, err.message);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential-ish backoff
    }
  }
};

// Test database connection
// Test and Initialize database schema
async function initializeDatabase() {
  try {
    await queryWithRetry('SELECT NOW()');
    console.log('db connected');
    
    // Ensure 'suspended' column exists for users
    await queryWithRetry('ALTER TABLE users ADD COLUMN IF NOT EXISTS suspended BOOLEAN DEFAULT false');
    
    // Create withdrawals table
    await queryWithRetry(`
      CREATE TABLE IF NOT EXISTS withdrawals (
        id SERIAL PRIMARY KEY,
        affiliate_id INTEGER REFERENCES affiliates(id),
        amount DECIMAL(15,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'completed'
        payment_method VARCHAR(100),
        payment_details TEXT,
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create payments table
    await queryWithRetry(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        amount DECIMAL(15,2) NOT NULL,
        payment_method VARCHAR(100),
        transaction_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'completed',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure status column in affiliate_earnings allows 'available' status
    // Statuses: 'pending' (client hasn't paid), 'available' (client paid, ready for withdrawal), 'withdrawn' (added to a withdrawal request)
    
    // Ensure pages column exists for templates
    await queryWithRetry('ALTER TABLE templates ADD COLUMN IF NOT EXISTS pages JSONB DEFAULT \'[]\'');
    await queryWithRetry('ALTER TABLE templates ADD COLUMN IF NOT EXISTS url TEXT');
    
    // Ensure new project columns exist
    await queryWithRetry('ALTER TABLE projects ADD COLUMN IF NOT EXISTS domain TEXT');
    await queryWithRetry('ALTER TABLE projects ADD COLUMN IF NOT EXISTS progress_status TEXT');
    await queryWithRetry('ALTER TABLE projects ADD COLUMN IF NOT EXISTS latest_update TEXT');
    await queryWithRetry('ALTER TABLE projects ADD COLUMN IF NOT EXISTS recommended_modules JSONB');
    
    // Ensure Admin User exists
    const adminEmail = process.env.VITE_ADMIN_EMAIL;
    const adminPassword = process.env.VITE_ADMIN_PASSWORD;

    if (adminEmail && adminPassword) {
      console.log('Checking for admin user:', adminEmail);
      const adminCheck = await queryWithRetry('SELECT id FROM users WHERE LOWER(email) = LOWER($1)', [adminEmail]);
      
      if (adminCheck.rows.length === 0) {
        console.log('Creating admin user...');
        const hashedPassword = bcrypt.hashSync(adminPassword, 10);
        await queryWithRetry(
          "INSERT INTO users (email, password, name, first_name, last_name, role, subscription_status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [adminEmail, hashedPassword, 'Admin User', 'Admin', 'User', 'admin', 'active']
        );
        console.log('Admin user created successfully');
      } else {
        // Ensure the existing user has admin role
        await queryWithRetry("UPDATE users SET role = 'admin' WHERE LOWER(email) = LOWER($1)", [adminEmail]);
        console.log('Admin user verified');
      }
    }

    console.log('Database schema checks completed');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
}

initializeDatabase();

pool.on('error', (err) => {
  console.error('Unexpected error on idle pool client', err);
});

// Middleware for authentication
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  // Allow mock admin token
  if (token === 'admin-mock-token') {
    req.userId = 'admin-id';
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    
    // Check if user is suspended
    try {
      const result = await queryWithRetry('SELECT suspended FROM users WHERE id = $1', [decoded.id]);
      if (result.rows.length > 0 && result.rows[0].suspended) {
        return res.status(403).json({ message: 'Account suspended. Please contact support.' });
      }
    } catch (err) {
      console.error('Auth suspension check error:', err);
    }

    req.userId = decoded.id;
    next();
  });
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, passwordReceived: !!password });

  // Fallback for Admin from environment variables
  const envAdminEmail = process.env.VITE_ADMIN_EMAIL;
  const envAdminPassword = process.env.VITE_ADMIN_PASSWORD;

  if (envAdminEmail && envAdminPassword && 
      email?.toLowerCase() === envAdminEmail.toLowerCase() && 
      password === envAdminPassword) {
    console.log('Admin login via environment variables successful');
    
    // Try to get existing user ID or use a placeholder
    let adminId = 999;
    try {
      const adminCheck = await queryWithRetry('SELECT id FROM users WHERE LOWER(email) = LOWER($1)', [envAdminEmail]);
      if (adminCheck.rows.length > 0) adminId = adminCheck.rows[0].id;
    } catch (e) {
      console.error('Error fetching admin ID during fallback login:', e);
    }

    const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      token,
      user: {
        id: adminId,
        email: envAdminEmail,
        name: 'Admin User',
        role: 'admin',
        membership_tier: 'admin'
      }
    });
  }

  try {
    const result = await queryWithRetry('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    const user = result.rows[0];

    if (!user || !bcrypt.compareSync(password, user.password)) {
      console.log('Login failed: Invalid credentials for', email);
      return res.status(400).json({ 
        message: 'Invalid email or password',
        received: { email, hasPassword: !!password }
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Send login notification email
    const loginTime = new Date().toLocaleString();
    sendEmail(
      email,
      'New Login to Your Iyonicorp Account',
      createEmailTemplate({
        title: 'New Login Detected',
        subtitle: 'We noticed a new sign-in to your account',
        userName: user.name || user.first_name || 'there',
        content: `
          <p>We noticed a new login to your Iyonicorp account. Here are the details:</p>
          <div class="content-box">
            <h3>Login Information</h3>
            <div class="detail-row">
              <span class="detail-label">Time</span>
              <span class="detail-value">${loginTime}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email</span>
              <span class="detail-value">${email}</span>
            </div>
          </div>
          <div class="alert-box">
            <strong>🛡️ Security Notice:</strong><br>
            If this was you, you can safely ignore this email. If you didn't log in, please secure your account immediately by changing your password.
          </div>
        `,
        type: 'info'
      })
    ).catch(e => console.error('Email background error:', e));
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        membership_tier: user.membership_tier,
        unlocked_tools: user.unlocked_tools,
        activated_tools: user.activated_tools,
        next_billing_date: user.next_billing_date,
        subscription_status: user.subscription_status,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  const { email, password, first_name, last_name, phone_number } = req.body;
  console.log('Signup attempt:', { email, hasPassword: !!password, first_name, last_name });
  try {
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const name = `${first_name || ''} ${last_name || ''}`.trim() || email.split('@')[0];
    const result = await queryWithRetry(
      'INSERT INTO users (email, password, first_name, last_name, phone_number, name, subscription_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, name, first_name, last_name, phone_number, membership_tier, unlocked_tools, activated_tools, next_billing_date, subscription_status, created_at',
      [email, hashedPassword, first_name, last_name, phone_number, name, 'inactive']
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Send welcome email
    sendEmail(
      email,
      'Welcome to Iyonicorp - Account Created Successfully!',
      createEmailTemplate({
        title: 'Welcome to Iyonicorp! 🎉',
        subtitle: 'Your account has been created successfully',
        userName: name,
        content: `
          <p>Thank you for joining Iyonicorp! We're thrilled to have you on board. Get ready to transform your digital presence with our cutting-edge solutions.</p>
          <div class="content-box">
            <h3>Your Account Details</h3>
            <div class="detail-row">
              <span class="detail-label">Email</span>
              <span class="detail-value">${email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Name</span>
              <span class="detail-value">${name}</span>
            </div>
          </div>
          <p>Here's what you can do next:</p>
          <p>✨ Explore our premium services and solutions</p>
          <p>🎨 Browse our design templates and blueprints</p>
          <p>🚀 Launch your custom web project</p>
        `,
        actionText: 'Explore Our Services',
        actionUrl: 'https://iyonicorp.com',
        type: 'welcome'
      })
    ).catch(e => console.error('Email background error:', e));
    
    // Notify admin
    sendEmail(
      'iyonicpay@gmail.com',
      `New User Registration - ${email}`,
      createEmailTemplate({
        title: 'New User Registered 🚀',
        subtitle: 'A new account has been created',
        userName: 'Admin',
        content: `
          <p>A new user has registered on Iyonicorp:</p>
          <div class="content-box">
            <h3>User Information</h3>
            <div class="detail-row">
              <span class="detail-label">Email</span>
              <span class="detail-value">${email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Name</span>
              <span class="detail-value">${name}</span>
            </div>
          </div>
        `,
        type: 'notification'
      })
    ).catch(e => console.error('Email background error:', e));
    
    res.json({ token, user });
  } catch (err) {
    console.error('Signup error DETAILS:', err);
    if (err.code === '23505') return res.status(400).json({ message: 'Email already exists' });
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Affiliate Routes
app.get('/api/affiliate/status', authenticate, async (req, res) => {
  try {
    const result = await queryWithRetry('SELECT * FROM affiliates WHERE userid = $1', [req.userId]);
    if (result.rows.length === 0) {
      return res.json({ isAffiliate: false });
    }
    res.json({ isAffiliate: true, affiliate: result.rows[0] });
  } catch (err) {
    console.error('Affiliate status error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/affiliate/signup', authenticate, async (req, res) => {
  try {
    // Check if already an affiliate
    const check = await queryWithRetry('SELECT * FROM affiliates WHERE userid = $1', [req.userId]);
    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Already an affiliate' });
    }

    // Generate referral code
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const result = await queryWithRetry(
      'INSERT INTO affiliates (userid, referral_code) VALUES ($1, $2) RETURNING *',
      [req.userId, referralCode]
    );
    
    await queryWithRetry('UPDATE users SET is_affiliate = true, referral_code = $1 WHERE id = $2', [referralCode, req.userId]);

    res.json({ message: 'Signed up as affiliate successfully', affiliate: result.rows[0] });
  } catch (err) {
    console.error('Affiliate signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/affiliate/stats', authenticate, async (req, res) => {
  try {
    const affiliateResult = await queryWithRetry('SELECT id FROM affiliates WHERE userid = $1', [req.userId]);
    if (affiliateResult.rows.length === 0) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    const affiliateId = affiliateResult.rows[0].id;

    const statsResult = await queryWithRetry(`
      SELECT 
        (SELECT COUNT(*) FROM referrals WHERE affiliate_id = $1) as total_referrals,
        COALESCE((SELECT SUM(amount) FROM affiliate_earnings WHERE affiliate_id = $1 AND status != 'pending'), 0) as total_earnings,
        COALESCE((SELECT SUM(amount) FROM affiliate_earnings WHERE affiliate_id = $1 AND status = 'pending'), 0) as pending_earnings,
        (SELECT current_balance FROM affiliates WHERE id = $1) as current_balance
    `, [affiliateId]);

    res.json(statsResult.rows[0]);
  } catch (err) {
    console.error('Affiliate stats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/affiliate/referrals', authenticate, async (req, res) => {
  try {
    const affiliateResult = await queryWithRetry('SELECT id FROM affiliates WHERE userid = $1', [req.userId]);
    if (affiliateResult.rows.length === 0) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    const affiliateId = affiliateResult.rows[0].id;

    const referralsResult = await queryWithRetry(`
      SELECT u.id, u.name, u.email, u.subscription_status, r.created_at
      FROM referrals r
      JOIN users u ON r.referred_user_id = u.id
      WHERE r.affiliate_id = $1
      ORDER BY r.created_at DESC
    `, [affiliateId]);

    res.json(referralsResult.rows);
  } catch (err) {
    console.error('Affiliate referrals error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/affiliate/earnings', authenticate, async (req, res) => {
  try {
    const affiliateResult = await queryWithRetry('SELECT id FROM affiliates WHERE userid = $1', [req.userId]);
    if (affiliateResult.rows.length === 0) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    const affiliateId = affiliateResult.rows[0].id;

    const earningsResult = await queryWithRetry(`
      SELECT e.*, o.order_number, o.service_name, o.plan_name
      FROM affiliate_earnings e
      LEFT JOIN orders o ON e.order_id = o.id
      WHERE e.affiliate_id = $1
      ORDER BY e.created_at DESC
    `, [affiliateId]);

    res.json(earningsResult.rows);
  } catch (err) {
    console.error('Affiliate earnings error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Refer user by code
app.post('/api/affiliate/refer', async (req, res) => {
  const { referralCode, userId } = req.body;
  try {
    const affiliateResult = await queryWithRetry('SELECT id FROM affiliates WHERE referral_code = $1', [referralCode]);
    if (affiliateResult.rows.length === 0) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }
    const affiliateId = affiliateResult.rows[0].id;

    // Check if user already referred
    const check = await queryWithRetry('SELECT * FROM referrals WHERE referred_user_id = $1', [userId]);
    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'User already referred' });
    }

    await queryWithRetry(
      'INSERT INTO referrals (affiliate_id, referred_user_id) VALUES ($1, $2)',
      [affiliateId, userId]
    );

    res.json({ message: 'User referred successfully' });
  } catch (err) {
    console.error('Refer user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Affiliate Routes
app.get('/api/admin/affiliates', authenticate, async (req, res) => {
  try {
    const result = await queryWithRetry(`
      SELECT a.*, u.name, u.email, 
        (SELECT COUNT(*) FROM referrals WHERE affiliate_id = a.id) as referral_count
      FROM affiliates a
      JOIN users u ON a.userid = u.id
      ORDER BY a.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Admin fetch affiliates error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/earnings', authenticate, async (req, res) => {
  try {
    const result = await queryWithRetry(`
      SELECT e.*, a.referral_code, u.name as affiliate_name, o.order_number, o.service_name, o.amount as order_amount
      FROM affiliate_earnings e
      JOIN affiliates a ON e.affiliate_id = a.id
      JOIN users u ON a.userid = u.id
      LEFT JOIN orders o ON e.order_id = o.id
      ORDER BY e.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Admin fetch earnings error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/admin/earnings/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const earningResult = await queryWithRetry('SELECT amount, affiliate_id, status FROM affiliate_earnings WHERE id = $1', [id]);
    const earning = earningResult.rows[0];

    if (!earning) {
      return res.status(404).json({ message: 'Earning not found' });
    }

    // If changing from pending to available, increment current_balance
    if (status === 'available' && earning.status === 'pending') {
      await queryWithRetry('UPDATE affiliates SET current_balance = current_balance + $1 WHERE id = $2', [earning.amount, earning.affiliate_id]);
    }
    
    // If marking as paid (from available/pending), it doesn't necessarily change balance 
    // because withdrawals already handle balance decrement.
    // However, if we're manually marking it as 'paid' and it was 'pending', 
    // maybe we should assume it's settled.
    
    const result = await queryWithRetry(
      'UPDATE affiliate_earnings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Admin update earning status error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdrawal Routes
app.post('/api/affiliate/withdraw', authenticate, async (req, res) => {
  const { amount, paymentMethod, paymentDetails } = req.body;
  try {
    const affiliateResult = await queryWithRetry('SELECT id, current_balance FROM affiliates WHERE userid = $1', [req.userId]);
    if (affiliateResult.rows.length === 0) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    const affiliate = affiliateResult.rows[0];

    if (parseFloat(amount) > parseFloat(affiliate.current_balance)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    if (parseFloat(amount) < 10) {
      return res.status(400).json({ message: 'Minimum withdrawal is $10' });
    }

    // Start a transaction would be better here, but using queryWithRetry for now
    await queryWithRetry('BEGIN');
    
    const withdrawalResult = await queryWithRetry(
      'INSERT INTO withdrawals (affiliate_id, amount, payment_method, payment_details, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [affiliate.id, amount, paymentMethod, paymentDetails, 'pending']
    );

    await queryWithRetry(
      'UPDATE affiliates SET current_balance = current_balance - $1 WHERE id = $2',
      [amount, affiliate.id]
    );

    await queryWithRetry('COMMIT');

    res.json(withdrawalResult.rows[0]);
  } catch (err) {
    await queryWithRetry('ROLLBACK').catch(() => {});
    console.error('Withdrawal error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/affiliate/withdrawals', authenticate, async (req, res) => {
  try {
    const affiliateResult = await queryWithRetry('SELECT id FROM affiliates WHERE userid = $1', [req.userId]);
    if (affiliateResult.rows.length === 0) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    const affiliateId = affiliateResult.rows[0].id;

    const result = await queryWithRetry(
      'SELECT * FROM withdrawals WHERE affiliate_id = $1 ORDER BY created_at DESC',
      [affiliateId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch withdrawals error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Withdrawal Routes
app.delete('/api/admin/earnings/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await queryWithRetry('DELETE FROM affiliate_earnings WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Admin delete earning error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/affiliates/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    // Get affiliate info to update user table
    const affiliateResult = await queryWithRetry('SELECT userid FROM affiliates WHERE id = $1', [id]);
    const affiliate = affiliateResult.rows[0];

    if (!affiliate) {
      return res.status(404).json({ message: 'Affiliate not found' });
    }

    // Delete related data first
    await queryWithRetry('DELETE FROM withdrawals WHERE affiliate_id = $1', [id]);
    await queryWithRetry('DELETE FROM affiliate_earnings WHERE affiliate_id = $1', [id]);
    await queryWithRetry('DELETE FROM referrals WHERE affiliate_id = $1', [id]);
    
    // Delete the affiliate record
    await queryWithRetry('DELETE FROM affiliates WHERE id = $1', [id]);
    
    // Update user record
    await queryWithRetry('UPDATE users SET is_affiliate = false, referral_code = NULL WHERE id = $1', [affiliate.userid]);

    res.status(204).end();
  } catch (err) {
    console.error('Admin delete affiliate error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/withdrawals', authenticate, async (req, res) => {
  try {
    const result = await queryWithRetry(`
      SELECT w.*, u.name as affiliate_name, u.email as affiliate_email, a.referral_code
      FROM withdrawals w
      JOIN affiliates a ON w.affiliate_id = a.id
      JOIN users u ON a.userid = u.id
      ORDER BY w.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Admin fetch withdrawals error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/admin/withdrawals/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  try {
    const withdrawalResult = await queryWithRetry('SELECT * FROM withdrawals WHERE id = $1', [id]);
    const withdrawal = withdrawalResult.rows[0];

    if (!withdrawal) {
      return res.status(404).json({ message: 'Withdrawal not found' });
    }

    // If rejecting, return funds to affiliate balance
    if (status === 'rejected' && withdrawal.status !== 'rejected') {
      await queryWithRetry(
        'UPDATE affiliates SET current_balance = current_balance + $1 WHERE id = $2',
        [withdrawal.amount, withdrawal.affiliate_id]
      );
    }

    const result = await queryWithRetry(
      'UPDATE withdrawals SET status = $1, admin_notes = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [status, adminNotes, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Admin update withdrawal error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Routes
app.get('/api/users', authenticate, async (req, res) => {
  try {
    const result = await queryWithRetry(
      'SELECT id, email, name, first_name, last_name, phone_number, membership_tier, unlocked_tools, activated_tools, next_billing_date, subscription_status, role, is_affiliate, referral_code, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch all users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  if (parseInt(id) !== req.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const result = await queryWithRetry(
      'SELECT id, email, name, first_name, last_name, phone_number, membership_tier, unlocked_tools, activated_tools, next_billing_date, subscription_status, role, is_affiliate, referral_code, created_at FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Fetch user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const isAdminRequest = req.userId === 'admin-id';
  
  // Only allow self-update or admin-update
  if (!isAdminRequest && parseInt(id) !== req.userId) { 
    return res.status(403).json({ message: 'Forbidden' });
  }
  
  const fields = req.body;
  // Allow admin to update any field, but restrict normal users
  const restrictedKeys = ['role', 'suspended'];
  const keys = Object.keys(fields).filter(k => {
    if (k === 'id' || k === 'created_at') return false;
    if (!isAdminRequest && restrictedKeys.includes(k)) return false;
    return true;
  });
  
  if (keys.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  // Get current user data before update for comparison
  const currentUserResult = await queryWithRetry('SELECT * FROM users WHERE id = $1', [id]);
  const currentUser = currentUserResult.rows[0];
  
  const values = keys.map(k => {
    const val = fields[k];
    // If value is an object or array, stringify it for JSONB columns
    if (val && typeof val === 'object') {
      return JSON.stringify(val);
    }
    // Convert Unix timestamps to ISO format string for timestamp columns
    if (k === 'next_billing_date') {
      // If it's already a string in ISO format, use it directly
      if (typeof val === 'string') return val;
      // If it's a number (Unix timestamp in seconds), convert to ISO string
      if (typeof val === 'number') {
        return new Date(val * 1000).toISOString();
      }
      return val;
    }
    return val;
  });
  
  // Handle type casting for specific columns
  const setClause = keys.map((key, i) => {
    const paramNum = i + 1;
    // Cast boolean fields
    if (key === 'suspended' || key === 'is_admin') {
      return `${key} = $${paramNum}::boolean`;
    }
    // Cast timestamp fields
    if (key === 'next_billing_date') {
      return `${key} = $${paramNum}::timestamp`;
    }
    return `${key} = $${paramNum}`;
  }).join(', ');

  try {
    const result = await queryWithRetry(
      `UPDATE users SET ${setClause} WHERE id = $${keys.length + 1} RETURNING id, email, name, first_name, last_name, phone_number, membership_tier, unlocked_tools, activated_tools, next_billing_date, subscription_status, role, created_at`,
      [...values, id]
    );
    const updatedUser = result.rows[0];
    
    // Send email notifications based on what was updated
    
    // Check for suspension
    if (isAdminRequest && fields.suspended !== undefined) {
      if (fields.suspended === true) {
        // Account suspended
        sendEmail(
          currentUser.email,
          'Your Iyonicorp Account Has Been Suspended',
          createEmailTemplate({
            title: 'Account Suspended ⚠️',
            subtitle: 'Your access has been temporarily restricted',
            userName: currentUser.name || 'User',
            content: `
              <p>Your Iyonicorp account has been suspended. You may not be able to access certain features or services until the suspension is lifted.</p>
              <div class="alert-box">
                <strong>📋 What happened?</strong><br>
                Your account has been temporarily restricted by an administrator.
              </div>
              <p>If you believe this was a mistake or would like to appeal this decision, please contact our support team. We're here to help resolve any issues.</p>
            `,
            actionText: 'Contact Support',
            actionUrl: 'https://iyonicorp.com/contact',
            type: 'alert'
          })
        ).catch(e => console.error('Email background error:', e));
      } else if (fields.suspended === false) {
        // Account reactivated
        sendEmail(
          currentUser.email,
          'Your Iyonicorp Account Has Been Reactivated',
          createEmailTemplate({
            title: 'Account Reactivated! ✅',
            subtitle: 'Welcome back! Your access has been restored',
            userName: currentUser.name || 'User',
            content: `
              <p>Great news! Your Iyonicorp account has been reactivated and you now have full access to all your account features and services.</p>
              <p>Thank you for your patience during the review process. We're glad to have you back!</p>
              <div class="content-box">
                <h3>What's Next?</h3>
                <p>You can now:</p>
                <p>✅ Access your dashboard</p>
                <p>✅ Manage your projects</p>
                <p>✅ Explore our services</p>
              </div>
            `,
            actionText: 'Go to Dashboard',
            actionUrl: 'https://iyonicorp.com/dashboard',
            type: 'success'
          })
        ).catch(e => console.error('Email background error:', e));
      }
    }
    
    // Check for membership/subscription changes
    if (fields.membership_tier !== undefined || fields.subscription_status !== undefined) {
      const newTier = fields.membership_tier || currentUser.membership_tier;
      const newStatus = fields.subscription_status || currentUser.subscription_status;

      // Handle commission if it's a new membership or status is active
      if (fields.membership_tier && newStatus === 'active' && currentUser.membership_tier !== newTier) {
        try {
          const referralResult = await queryWithRetry('SELECT affiliate_id FROM referrals WHERE referred_user_id = $1', [id]);
          if (referralResult.rows.length > 0) {
            const affiliateId = referralResult.rows[0].affiliate_id;
            // Membership prices mapping
            const membershipPrices = {
              'basic': 12,
              'premium': 25,
              'premium_plus': 60,
              'enterprise': 130
            };
            const price = membershipPrices[newTier.toLowerCase()] || 0;
            const commissionAmount = price * 0.10;

            if (commissionAmount > 0) {
              await queryWithRetry(
                'INSERT INTO affiliate_earnings (affiliate_id, amount, percentage, type) VALUES ($1, $2, $3, $4)',
                [affiliateId, commissionAmount, 10, 'membership']
              );
              // Update affiliate balance
              await queryWithRetry(
                'UPDATE affiliates SET total_earnings = total_earnings + $1, current_balance = current_balance + $1 WHERE id = $2',
                [commissionAmount, affiliateId]
              );
            }
          }
        } catch (err) {
          console.error('Membership commission error:', err);
        }
      }
      
      sendEmail(
        currentUser.email,
        'Your Iyonicorp Membership Has Been Updated',
        createEmailTemplate({
          title: 'Membership Updated 🎉',
          subtitle: 'Your subscription status has changed',
          userName: currentUser.name || 'User',
          content: `
            <p>Great news! Your membership status has been updated. Here are your new plan details:</p>
            <div class="content-box">
              <h3>Plan Details</h3>
              <div class="detail-row">
                <span class="detail-label">Membership Tier</span>
                <span class="detail-value">${newTier || 'Standard'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status</span>
                <span class="detail-value">${newStatus}</span>
              </div>
            </div>
            <p>Thank you for being part of Iyonicorp! Enjoy your enhanced experience.</p>
          `,
          actionText: 'View Full Details',
          actionUrl: 'https://iyonicorp.com/dashboard',
          type: 'success'
        })
      ).catch(e => console.error('Email background error:', e));
    }
    
    res.json(updatedUser);
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    // Get user data before deletion
    const userResult = await queryWithRetry('SELECT * FROM users WHERE id = $1', [id]);
    const user = userResult.rows[0];
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete all related records first to avoid foreign key constraint issues
    await queryWithRetry('DELETE FROM projects WHERE userid = $1', [id]);
    await queryWithRetry('DELETE FROM orders WHERE user_id = $1', [id]);
    await queryWithRetry('DELETE FROM support_tickets WHERE userid = $1', [id]);
    await queryWithRetry('DELETE FROM partnership_requests WHERE userid = $1', [id]);
    
    // Affiliate cleanup
    const affiliateResult = await queryWithRetry('SELECT id FROM affiliates WHERE userid = $1', [id]);
    if (affiliateResult.rows.length > 0) {
      const affiliateId = affiliateResult.rows[0].id;
      await queryWithRetry('DELETE FROM withdrawals WHERE affiliate_id = $1', [affiliateId]);
      await queryWithRetry('DELETE FROM affiliate_earnings WHERE affiliate_id = $1', [affiliateId]);
      await queryWithRetry('DELETE FROM referrals WHERE affiliate_id = $1', [affiliateId]);
      await queryWithRetry('DELETE FROM affiliates WHERE id = $1', [affiliateId]);
    }
    
    // Also cleanup any referrals where THIS user was referred
    await queryWithRetry('DELETE FROM referrals WHERE referred_userid = $1', [id]);

    // Handle coupons - complex foreign key relationships
    // 1. Delete usages where this user was the one who used a coupon
    await queryWithRetry('DELETE FROM used_coupons WHERE user_id = $1', [id]);
    
    // 2. Delete usages of coupons that were created by this user (to allow deleting the coupons)
    await queryWithRetry('DELETE FROM used_coupons WHERE coupon_id IN (SELECT id FROM coupon_codes WHERE created_by = $1)', [id]);
    
    // 3. Delete coupons created by this user
    await queryWithRetry('DELETE FROM coupon_codes WHERE created_by = $1', [id]);
    
    // Finally delete the user
    await queryWithRetry('DELETE FROM users WHERE id = $1', [id]);
    
    // Send account deletion confirmation email
    sendEmail(
      user.email,
      'Your Iyonicorp Account Has Been Deleted',
      createEmailTemplate({
        title: 'Account Deleted 🗑️',
        subtitle: 'Your account has been permanently removed',
        userName: user.name || 'User',
        content: `
          <p>Your Iyonicorp account has been permanently deleted. All your data, including projects, orders, and other information have been removed from our system.</p>
          <div class="alert-box">
            <strong>⚠️ Important:</strong><br>
            This action cannot be undone. If you did not request this deletion, please contact our support team immediately.
          </div>
          <p>We'd love to have you back in the future! If you decide to return, simply sign up again.</p>
          <p>Thank you for being part of Iyonicorp.</p>
        `,
        type: 'alert'
      })
    ).catch(e => console.error('Email background error:', e));
    
    res.status(204).end();
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Projects Routes
app.get('/api/projects', async (req, res) => {
  const { userId } = req.query;

  // Migration: Ensure price column exists
  try {
    await queryWithRetry('ALTER TABLE projects ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 0');
  } catch (err) {
    // Ignore error if column already exists or other issues
  }

  let query = 'SELECT * FROM projects';
  let params = [];
  
  if (userId) {
    query += ' WHERE userid = $1';
    params.push(userId);
  }

  try {
    const result = await queryWithRetry(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch projects error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/projects', authenticate, async (req, res) => {
  const { title, description, category, thumbnail, status, template, userId, data, price } = req.body;
  try {
    const projectData = data && typeof data === 'object' ? JSON.stringify(data) : (data || '{}');
    const userIdToUse = userId || req.userId;
    
    // Get user info for email
    const userResult = await queryWithRetry('SELECT * FROM users WHERE id = $1', [userIdToUse]);
    const user = userResult.rows[0];
    
    const result = await queryWithRetry(
      'INSERT INTO projects (title, description, category, thumbnail, status, template, userid, data, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, description, category, thumbnail, status || 'draft', template, userIdToUse, projectData, price || 0]
    );
    const project = result.rows[0];
    
    // Send confirmation email to user
    sendEmail(
      user.email,
      'Website Project Received - Iyonicorp',
      createEmailTemplate({
        title: 'Project Received! 🎨',
        subtitle: 'Your website customization request is being reviewed',
        userName: user.name || 'there',
        content: `
          <p>We've received your website customization request! Our team is excited to bring your vision to life.</p>
          <div class="content-box">
            <h3>Project Details</h3>
            <div class="detail-row">
              <span class="detail-label">Project Title</span>
              <span class="detail-value">${title}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Category</span>
              <span class="detail-value">${category || 'General'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Description</span>
              <span class="detail-value">${description || 'No description provided'}</span>
            </div>
          </div>
          <p>Our team will review your requirements and reach out within 24-48 hours with next steps.</p>
        `,
        actionText: 'View Your Projects',
        actionUrl: 'https://iyonicorp.com/dashboard',
        type: 'success'
      })
    ).catch(e => console.error('Email background error:', e));
    
    // Notify admin
    sendEmail(
      'iyonicpay@gmail.com',
      `New Website Project - ${title} - ${user.email}`,
      createEmailTemplate({
        title: 'New Project Submitted 🚀',
        subtitle: 'A user has submitted a new website project',
        userName: 'Admin',
        content: `
          <p>A new website project has been submitted and is awaiting review.</p>
          <div class="content-box">
            <h3>Project Information</h3>
            <div class="detail-row">
              <span class="detail-label">User</span>
              <span class="detail-value">${user.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Project</span>
              <span class="detail-value">${title}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Category</span>
              <span class="detail-value">${category || 'General'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Description</span>
              <span class="detail-value">${description || 'N/A'}</span>
            </div>
          </div>
        `,
        type: 'notification'
      })
    ).catch(e => console.error('Email background error:', e));
    
    res.json(project);
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/projects/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields).filter(k => k !== 'id' && k !== 'created_at');
  
  const values = keys.map(k => {
    const val = fields[k];
    if (val && typeof val === 'object') {
      return JSON.stringify(val);
    }
    return val;
  });
  
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  
  try {
    const result = await queryWithRetry(
      `UPDATE projects SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/projects/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await queryWithRetry('DELETE FROM projects WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leads Routes
app.get('/api/leads', authenticate, async (req, res) => {
  try {
    const result = await queryWithRetry('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch leads error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/leads', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const result = await queryWithRetry(
      'INSERT INTO leads (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    
    const adminEmail = 'iyonicpay@gmail.com';
    const currentYear = new Date().getFullYear();
    
    // Send confirmation email to the user
    sendEmail(
      email,
      'Welcome to Iyonicorp - We Received Your Message!',
      createEmailTemplate({
        title: 'Message Received! 📬',
        subtitle: 'Thank you for reaching out to us',
        userName: name,
        content: `
          <p>Thank you for reaching out to us! We've received your message and our team will get back to you within 24-48 hours.</p>
          <div class="content-box">
            <h3>Your Message</h3>
            <p>${message || 'No message provided'}</p>
          </div>
          <p>In the meantime, feel free to explore our services and follow us on social media. We're excited to connect with you!</p>
        `,
        actionText: 'Explore Our Services',
        actionUrl: 'https://iyonicorp.com',
        type: 'success'
      })
    ).catch(e => console.error('Email background error:', e));
    
    // Send notification email to admin
    sendEmail(
      adminEmail,
      `New Lead from ${name} - ${email}`,
      createEmailTemplate({
        title: 'New Lead Received 📬',
        subtitle: 'Someone is reaching out to learn more',
        userName: 'Admin',
        content: `
          <p>A new lead has been submitted through the contact form.</p>
          <div class="content-box">
            <h3>Lead Information</h3>
            <div class="detail-row">
              <span class="detail-label">Name</span>
              <span class="detail-value">${name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email</span>
              <span class="detail-value">${email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Message</span>
              <span class="detail-value">${message || 'No message provided'}</span>
            </div>
          </div>
        `,
        type: 'notification'
      })
    ).catch(e => console.error('Email background error:', e));
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Create lead error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/leads/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await queryWithRetry('DELETE FROM leads WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Delete lead error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Orders Routes
app.get('/api/orders', authenticate, async (req, res) => {
  const { userId } = req.query;
  let query = 'SELECT * FROM orders';
  let params = [];
  
  if (userId) {
    query += ' WHERE user_id = $1';
    params.push(userId);
  }

  try {
    const result = await queryWithRetry(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/orders', authenticate, async (req, res) => {
  const { order_number, service_id, service_name, plan_name, amount, status, userId, description } = req.body;
  try {
    const userIdToUse = userId || req.userId;
    
    // Check if user has an affiliate
    const referralResult = await queryWithRetry('SELECT affiliate_id FROM referrals WHERE referred_user_id = $1', [userIdToUse]);
    let finalAmount = parseFloat(amount);
    let commissionAmount = 0;
    let affiliateId = null;

    if (referralResult.rows.length > 0) {
      affiliateId = referralResult.rows[0].affiliate_id;
      // Apply 30% discount for website acquisition (orders are typically website sales)
      // If the frontend already applied it, we should be careful. 
      // For now, let's assume the backend ensures the commission is recorded.
      commissionAmount = finalAmount * 0.30;
    }

    // Get user info for email
    const userResult = await queryWithRetry('SELECT * FROM users WHERE id = $1', [userIdToUse]);
    const user = userResult.rows[0];
    
    const result = await queryWithRetry(
      'INSERT INTO orders (order_number, service_id, service_name, plan_name, amount, status, user_id, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [order_number, service_id, service_name, plan_name, finalAmount, status || 'pending', userIdToUse, description]
    );
    const order = result.rows[0];

    // If there's an affiliate, record commission as PENDING
    if (affiliateId && commissionAmount > 0) {
      await queryWithRetry(
        'INSERT INTO affiliate_earnings (affiliate_id, order_id, amount, percentage, type, status) VALUES ($1, $2, $3, $4, $5, $6)',
        [affiliateId, order.id, commissionAmount, 30, 'sale', 'pending']
      );
      // NOTE: We don't update current_balance yet because it's pending
      // We only update total_earnings to show potential yield
      await queryWithRetry(
        'UPDATE affiliates SET total_earnings = total_earnings + $1 WHERE id = $2',
        [commissionAmount, affiliateId]
      );
    }
    
    // Send order confirmation email
    sendEmail(
      user.email,
      'Order Confirmed - Iyonicorp Membership',
      createEmailTemplate({
        title: 'Order Confirmed! 🛒',
        subtitle: 'Thank you for your purchase',
        userName: user.name || 'there',
        content: `
          <p>Thank you for your purchase! Your order has been confirmed and is being processed.</p>
          <div class="content-box">
            <h3>Order Details</h3>
            <div class="detail-row">
              <span class="detail-label">Order Number</span>
              <span class="detail-value">${order_number}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Service</span>
              <span class="detail-value">${service_name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Plan</span>
              <span class="detail-value">${plan_name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount</span>
              <span class="detail-value">${amount}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status</span>
              <span class="detail-value">${status || 'pending'}</span>
            </div>
          </div>
          <p>You can view your order details and track progress in your dashboard.</p>
        `,
        actionText: 'View Order Details',
        actionUrl: 'https://iyonicorp.com/dashboard',
        type: 'success'
      })
    ).catch(e => console.error('Email background error:', e));
    
    // Notify admin
    sendEmail(
      'iyonicpay@gmail.com',
      `New Order - ${order_number} - ${service_name}`,
      createEmailTemplate({
        title: 'New Order Received 🛒',
        subtitle: 'A user has made a purchase',
        userName: 'Admin',
        content: `
          <p>A new order has been placed on Iyonicorp.</p>
          <div class="content-box">
            <h3>Order Information</h3>
            <div class="detail-row">
              <span class="detail-label">User</span>
              <span class="detail-value">${user.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Order #</span>
              <span class="detail-value">${order_number}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Service</span>
              <span class="detail-value">${service_name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Plan</span>
              <span class="detail-value">${plan_name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount</span>
              <span class="detail-value">${amount}</span>
            </div>
          </div>
        `,
        type: 'notification'
      })
    ).catch(e => console.error('Email background error:', e));
    
    res.json(order);
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/orders/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields).filter(k => k !== 'id' && k !== 'created_at');
  
  if (keys.length === 0) return res.status(400).json({ message: 'No fields to update' });

  const values = keys.map(k => fields[k]);
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

  try {
    const result = await queryWithRetry(
      `UPDATE orders SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/payments', authenticate, async (req, res) => {
  const { orderId, amount, paymentMethod, transactionId, notes } = req.body;
  try {
    // 1. Insert payment record
    const paymentResult = await queryWithRetry(
      'INSERT INTO payments (order_id, amount, payment_method, transaction_id, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [orderId, amount, paymentMethod, transactionId, notes]
    );
    const payment = paymentResult.rows[0];

    // 2. Check if the order has an affiliate
    const orderResult = await queryWithRetry('SELECT user_id FROM orders WHERE id = $1', [orderId]);
    const order = orderResult.rows[0];
    
    if (order) {
      const referralResult = await queryWithRetry('SELECT affiliate_id FROM referrals WHERE referred_user_id = $1', [order.user_id]);
      if (referralResult.rows.length > 0) {
        const affiliateId = referralResult.rows[0].affiliate_id;
        const commissionAmount = parseFloat(amount) * 0.30; // 30% commission on every installment

        // 3. Insert available commission for this specific payment
        await queryWithRetry(
          'INSERT INTO affiliate_earnings (affiliate_id, order_id, amount, percentage, type, status) VALUES ($1, $2, $3, $4, $5, $6)',
          [affiliateId, orderId, commissionAmount, 30, 'sale', 'available']
        );

        // 4. Update affiliate balance
        await queryWithRetry(
          'UPDATE affiliates SET total_earnings = total_earnings + $1, current_balance = current_balance + $1 WHERE id = $2',
          [commissionAmount, affiliateId]
        );

        // 5. Deduct from pending commission if it exists
        await queryWithRetry(
          'UPDATE affiliate_earnings SET amount = amount - $1 WHERE affiliate_id = $2 AND order_id = $3 AND status = $4',
          [commissionAmount, affiliateId, orderId, 'pending']
        );

        // Delete pending if it's empty
        await queryWithRetry(
          'DELETE FROM affiliate_earnings WHERE affiliate_id = $1 AND order_id = $2 AND status = $3 AND amount <= 0',
          [affiliateId, orderId, 'pending']
        );
      }
    }

    res.json(payment);
  } catch (err) {
    console.error('Record payment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/payments', authenticate, async (req, res) => {
  const { orderId } = req.query;
  try {
    let query = 'SELECT p.*, o.order_number FROM payments p JOIN orders o ON p.order_id = o.id';
    let params = [];
    
    if (orderId) {
      query += ' WHERE p.order_id = $1';
      params.push(orderId);
    }
    
    query += ' ORDER BY p.created_at DESC';
    
    const result = await queryWithRetry(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch payments error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/affiliate/payments', authenticate, async (req, res) => {
  try {
    const affiliateResult = await queryWithRetry('SELECT id FROM affiliates WHERE userid = $1', [req.userId]);
    if (affiliateResult.rows.length === 0) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    const affiliateId = affiliateResult.rows[0].id;

    // Fetch payments for orders that belong to users referred by this affiliate
    const result = await queryWithRetry(`
      SELECT p.*, o.order_number, o.service_name
      FROM payments p
      JOIN orders o ON p.order_id = o.id
      JOIN referrals r ON o.user_id = r.referred_user_id
      WHERE r.affiliate_id = $1
      ORDER BY p.created_at DESC
    `, [affiliateId]);

    res.json(result.rows);
  } catch (err) {
    console.error('Fetch affiliate payments error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Support Tickets Routes
app.post('/api/support-tickets', authenticate, async (req, res) => {
  const { subject, message, priority, userId } = req.body;
  try {
    const result = await queryWithRetry(
      'INSERT INTO support_tickets (subject, message, priority, userid) VALUES ($1, $2, $3, $4) RETURNING *',
      [subject, message, priority || 'medium', userId || req.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Create support ticket error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Templates Routes
app.get('/api/templates', async (req, res) => {
  // Migration: Ensure price column exists
  try {
    await queryWithRetry('ALTER TABLE templates ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 0');
  } catch (err) {
    // Ignore error
  }
  try {
    const result = await queryWithRetry('SELECT * FROM templates');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch templates error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/templates', authenticate, async (req, res) => {
  const { name, description, category, thumbnail, html_content, css_content, js_content, deployed, status, price, pages, url } = req.body;
  try {
    const result = await queryWithRetry(
      'INSERT INTO templates (name, description, category, thumbnail, html_content, css_content, js_content, deployed, status, price, pages, url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [name, description, category, thumbnail, html_content, css_content, js_content, deployed || false, status || 'draft', price || 0, JSON.stringify(pages || []), url || null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Create template error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/templates/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields).filter(k => k !== 'id' && k !== 'created_at');
  const values = keys.map(k => {
    if (k === 'pages') return JSON.stringify(fields[k]);
    return fields[k];
  });
  
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  
  try {
    const result = await queryWithRetry(
      `UPDATE templates SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update template error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/templates/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await queryWithRetry('DELETE FROM templates WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Delete template error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Partnership Requests Routes
// Upload endpoint for partnership documents
app.post('/api/partnership-upload', authenticate, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ 
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      filename: req.file.filename
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

app.post('/api/partnership-requests', authenticate, async (req, res) => {
  const { 
    businessName, 
    businessType, 
    description, 
    credentials, 
    userId,
    annualRevenue,
    revenueCurrency,
    socialMediaFacebook,
    socialMediaTwitter,
    socialMediaInstagram,
    socialMediaLinkedin,
    website,
    isRegistered,
    registrationNumber,
    registrationDocumentPath,
    bankStatementPath,
    mobileMoneyStatementPath
  } = req.body;
  
  try {
    // Ensure table exists with new schema
    await queryWithRetry(`
      CREATE TABLE IF NOT EXISTS partnership_requests (
        id SERIAL PRIMARY KEY,
        userid INTEGER REFERENCES users(id),
        business_name VARCHAR(255) NOT NULL,
        business_type VARCHAR(100),
        description TEXT,
        credentials TEXT,
        annual_revenue DECIMAL(15,2),
        revenue_currency VARCHAR(10) DEFAULT 'USD',
        social_media_facebook VARCHAR(255),
        social_media_twitter VARCHAR(255),
        social_media_instagram VARCHAR(255),
        social_media_linkedin VARCHAR(255),
        website VARCHAR(255),
        is_registered BOOLEAN DEFAULT false,
        registration_number VARCHAR(100),
        registration_document_path VARCHAR(500),
        bank_statement_path VARCHAR(500),
        mobile_money_statement_path VARCHAR(500),
        priority BOOLEAN DEFAULT false,
        admin_notes TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `).catch(err => {
      // Table might already exist, continue
    });
    
    // Add new columns if they don't exist (migration)
    try {
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS annual_revenue DECIMAL(15,2)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS revenue_currency VARCHAR(10) DEFAULT 'USD'`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS social_media_facebook VARCHAR(255)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS social_media_twitter VARCHAR(255)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS social_media_instagram VARCHAR(255)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS social_media_linkedin VARCHAR(255)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS website VARCHAR(255)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS is_registered BOOLEAN DEFAULT false`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS registration_number VARCHAR(100)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS registration_document_path VARCHAR(500)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS bank_statement_path VARCHAR(500)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS mobile_money_statement_path VARCHAR(500)`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS priority BOOLEAN DEFAULT false`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS admin_notes TEXT`);
      await queryWithRetry(`ALTER TABLE partnership_requests ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
    } catch (migrationErr) {
      // Columns might already exist, ignore
    }

    const isRegisteredBool = isRegistered === 'true' || isRegistered === true;
    
    // Registered businesses get priority
    const priority = isRegisteredBool;

    const result = await queryWithRetry(
      `INSERT INTO partnership_requests 
        (userid, business_name, business_type, description, credentials, 
         annual_revenue, revenue_currency, social_media_facebook, social_media_twitter,
         social_media_instagram, social_media_linkedin, website, is_registered,
         registration_number, registration_document_path, bank_statement_path, 
         mobile_money_statement_path, priority) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`,
      [
        userId || req.userId, 
        businessName, 
        businessType, 
        description, 
        credentials,
        annualRevenue ? parseFloat(annualRevenue) : null,
        revenueCurrency || 'USD',
        socialMediaFacebook,
        socialMediaTwitter,
        socialMediaInstagram,
        socialMediaLinkedin,
        website,
        isRegisteredBool,
        registrationNumber,
        registrationDocumentPath,
        bankStatementPath,
        mobileMoneyStatementPath,
        priority
      ]
    );
    
    // Get user info for email
    const userResult = await queryWithRetry('SELECT * FROM users WHERE id = $1', [userId || req.userId]);
    const user = userResult.rows[0];
    
    // Send confirmation email to user
    sendEmail(
      user.email,
      'Partnership Request Received - Iyonicorp',
      createEmailTemplate({
        title: 'Partnership Request Received! 🤝',
        subtitle: 'Thank you for your interest in partnering with us',
        userName: user.name || 'there',
        content: `
          <p>Thank you for your interest in partnering with Iyonicorp! We've received your application and our team is excited to review it.</p>
          <div class="content-box">
            <h3>Application Details</h3>
            <div class="detail-row">
              <span class="detail-label">Business Name</span>
              <span class="detail-value">${businessName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Business Type</span>
              <span class="detail-value">${businessType || 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status</span>
              <span class="detail-value">Pending Review</span>
            </div>
          </div>
          <p>Our team will contact you within 2-3 business days with the next steps. We're excited about the possibility of working together!</p>
        `,
        type: 'info'
      })
    ).catch(e => console.error('Email background error:', e));
    
    // Notify admin
    sendEmail(
      'iyonicpay@gmail.com',
      `New Partnership Request - ${businessName} - ${user.email}`,
      createEmailTemplate({
        title: 'New Partnership Request 🤝',
        subtitle: 'A business wants to partner with us',
        userName: 'Admin',
        content: `
          <p>A new partnership request has been submitted and is awaiting review.</p>
          <div class="content-box">
            <h3>Partnership Details</h3>
            <div class="detail-row">
              <span class="detail-label">Applicant</span>
              <span class="detail-value">${user.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Business Name</span>
              <span class="detail-value">${businessName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Business Type</span>
              <span class="detail-value">${businessType || 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Annual Revenue</span>
              <span class="detail-value">${annualRevenue ? `${revenueCurrency || 'USD'} ${annualRevenue}` : 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Website</span>
              <span class="detail-value">${website || 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Registered Business</span>
              <span class="detail-value">${isRegisteredBool ? 'Yes' : 'No'}</span>
            </div>
          </div>
        `,
        actionText: 'Review in Admin Panel',
        actionUrl: 'https://iyonicorp.com/admin',
        type: 'notification'
      })
    ).catch(e => console.error('Email background error:', e));
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Create partnership request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/partnership-requests', authenticate, async (req, res) => {
  try {
    // Order by priority (registered businesses first), then by date
    const result = await queryWithRetry(`
      SELECT pr.*, u.email as "userEmail", u.name as "userName" 
      FROM partnership_requests pr 
      JOIN users u ON pr.userid = u.id 
      ORDER BY pr.priority DESC, pr.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch partnership requests error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/partnership-requests/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields).filter(k => k !== 'id' && k !== 'created_at');
  
  if (keys.length === 0) return res.status(400).json({ message: 'No fields to update' });

  const values = keys.map(k => fields[k]);
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

  try {
    const result = await queryWithRetry(
      `UPDATE partnership_requests SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update partnership request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

