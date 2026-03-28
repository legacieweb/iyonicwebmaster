const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Database connection
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    // For development: check if it's the admin token
    if (token === 'admin-token-12345') {
      req.userId = 'admin-id';
      return next();
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin check middleware
const isAdmin = async (req, res, next) => {
  try {
    const user = await pool.query('SELECT role FROM users WHERE id = $1', [req.userId]);
    if (user.rows[0]?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Iyonic Web API' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
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
        free_period_end: user.free_period_end,
        subscription_status: user.subscription_status,
        role: user.role,
        created_at: user.created_at,
        subscription_start_date: user.subscription_start_date,
        payment_reference: user.payment_reference
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  const { email, password, first_name, last_name, phone_number, name } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (email, password, first_name, last_name, phone_number, name, subscription_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, name, first_name, last_name, phone_number, membership_tier, unlocked_tools, activated_tools, next_billing_date, subscription_status, created_at, subscription_start_date, payment_reference',
      [email, hashedPassword, first_name, last_name, phone_number, name, 'inactive']
    );
    
    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ token, user });
  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Free Trial Activation
app.post('/api/users/activate-free-trial', authenticate, async (req, res) => {
  const userId = req.userId;
  try {
    const freePeriodEnd = new Date();
    freePeriodEnd.setDate(freePeriodEnd.getDate() + 30);
    
    const result = await pool.query(
      `UPDATE users 
       SET free_period_end = $1, subscription_status = 'active', membership_tier = 'free', next_billing_date = $1 
       WHERE id = $2 
       RETURNING id, email, name, first_name, last_name, phone_number, membership_tier, unlocked_tools, activated_tools, next_billing_date, free_period_end, subscription_status, created_at, subscription_start_date, payment_reference`,
      [freePeriodEnd, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Activate free trial error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin)
app.get('/api/users', authenticate, isAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, first_name, last_name, phone_number, membership_tier, unlocked_tools, activated_tools, next_billing_date, free_period_end, subscription_status, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single user
app.get('/api/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  if (parseInt(id) !== req.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const result = await pool.query(
      'SELECT id, email, name, first_name, last_name, phone_number, membership_tier, unlocked_tools, activated_tools, next_billing_date, free_period_end, subscription_status, role, created_at, subscription_start_date, payment_reference FROM users WHERE id = $1',
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

// Update user - Simplified version without the complex logic that was broken
app.patch('/api/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const isAdminRequest = req.userId === 'admin-id';
  
  // Only allow self-update or admin-update
  if (!isAdminRequest && parseInt(id) !== req.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  
  const fields = req.body;
  // Simple filter: don't allow role or suspended unless admin
  const restrictedKeys = ['role', 'suspended'];
  const keys = Object.keys(fields).filter(k => {
    if (k === 'id' || k === 'created_at') return false;
    if (!isAdminRequest && restrictedKeys.includes(k)) return false;
    return true;
  });
  
  if (keys.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  const values = keys.map(k => {
    const val = fields[k];
    if (val && typeof val === 'object') {
      return JSON.stringify(val);
    }
    return val;
  });
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

  try {
    const result = await pool.query(
      `UPDATE users SET ${setClause} WHERE id = $${keys.length + 1} RETURNING id, email, name, first_name, last_name, phone_number, membership_tier, unlocked_tools, activated_tools, next_billing_date, subscription_status, role, created_at, subscription_start_date, payment_reference`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
app.delete('/api/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    // Delete related records first to avoid foreign key errors
    await pool.query('DELETE FROM used_coupons WHERE user_id = $1', [id]).catch(() => {});
    await pool.query('DELETE FROM coupon_codes WHERE created_by = $1', [id]).catch(() => {});
    await pool.query('DELETE FROM projects WHERE userid = $1', [id]).catch(() => {});
    await pool.query('DELETE FROM orders WHERE userid = $1', [id]).catch(() => {});
    await pool.query('DELETE FROM leads WHERE user_id = $1', [id]).catch(() => {});
    await pool.query('DELETE FROM support_tickets WHERE userid = $1', [id]).catch(() => {});
    await pool.query('DELETE FROM partnership_requests WHERE user_id = $1', [id]).catch(() => {});
    
    // Now delete the user
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Delete user error:', err);
    if (err.code === '23503') {
      return res.status(400).json({ message: 'Cannot delete user - related records still exist' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Coupon Routes
// Get available coupons for a user
app.get('/api/coupons', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, code, discount_percentage, discount_type, description, expires_at, new_users_only, applicable_tiers, current_uses, max_uses, is_active
       FROM coupon_codes 
       WHERE is_active = true AND (expires_at IS NULL OR expires_at > NOW()) 
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch coupons error:', err)
    res.status(500).json({ message: 'Server error' })
  }
});

// Validate a coupon code
app.post('/api/coupons/validate', authenticate, async (req, res) => {
  const { code, tierId } = req.body
  try {
    const coupon = await pool.query(
      `SELECT * FROM coupon_codes WHERE code = $1 AND is_active = true`,
      [code.toUpperCase()]
    )

    if (coupon.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid coupon code' })
    }

    const couponData = coupon.rows[0]

    // Check if expired
    if (couponData.expires_at && new Date(couponData.expires_at) < new Date()) {
      return res.status(400).json({ message: 'Coupon code has expired' })
    }

    // Check max uses
    if (couponData.max_uses && couponData.current_uses >= couponData.max_uses) {
      return res.status(400).json({ message: 'Coupon code has reached maximum uses' })
    }

    // Check if applicable to the tier
    if (couponData.applicable_tiers && !couponData.applicable_tiers.includes(tierId)) {
      return res.status(400).json({ message: 'This coupon is not applicable to the selected tier' })
    }

    // Check if new user only and user has used coupons before
    if (couponData.new_users_only) {
      const userCoupons = await pool.query(
        'SELECT * FROM used_coupons WHERE user_id = $1',
        [req.userId]
      )
      if (userCoupons.rows.length > 0) {
        return res.status(400).json({ message: 'This coupon is only for new users' })
      }
    }

    res.json({
      valid: true,
      coupon: {
        code: couponData.code,
        discount_percentage: couponData.discount_percentage,
        description: couponData.description
      }
    })
  } catch (err) {
    console.error('Validate coupon error:', err)
    res.status(500).json({ message: 'Server error' })
  }
});

// Redeem a coupon code (temporary - for current payment only)
app.post('/api/coupons/redeem', authenticate, async (req, res) => {
  const { code, tierId } = req.body
  try {
    const coupon = await pool.query(
      `SELECT * FROM coupon_codes WHERE code = $1 AND is_active = true`,
      [code.toUpperCase()]
    )

    if (coupon.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid coupon code' })
    }

    const couponData = coupon.rows[0]

    // Check if expired
    if (couponData.expires_at && new Date(couponData.expires_at) < new Date()) {
      return res.status(400).json({ message: 'Coupon code has expired' })
    }

    // Check max uses
    if (couponData.max_uses && couponData.current_uses >= couponData.max_uses) {
      return res.status(400).json({ message: 'Coupon code has reached maximum uses' })
    }

    // Check if applicable to the tier
    if (couponData.applicable_tiers && !couponData.applicable_tiers.includes(tierId)) {
      return res.status(400).json({ message: 'This coupon is not applicable to the selected tier' })
    }
    // Check if new user only and user has used coupons before
    if (couponData.new_users_only) {
      const userCoupons = await pool.query(
        'SELECT * FROM used_coupons WHERE user_id = $1',
        [req.userId]
      )
      if (userCoupons.rows.length > 0) {
        return res.status(400).json({ message: 'This coupon is only for new users' })
      }
    }

    const existingUse = await pool.query(
      'SELECT * FROM used_coupons WHERE user_id = $1 AND coupon_id = $2',
      [req.userId, couponData.id]
    )

    if (existingUse.rows.length > 0) {
      return res.status(400).json({ message: 'You have already used this coupon' })
    }

    // Save coupon to user temporarily (will be cleared after payment)
    await pool.query(
      'UPDATE users SET coupon_code = $1, coupon_discount_applied = $2 WHERE id = $3',
      [couponData.code, couponData.discount_percentage, req.userId]
    )

    res.json({
      success: true,
      discount: couponData.discount_percentage,
      couponId: couponData.id,
      message: `Coupon applied! You get ${couponData.discount_percentage}% off. This discount will be applied to your current payment.`
    })
  } catch (err) {
    console.error('Redeem coupon error:', err)
    res.status(500).json({ message: 'Server error' })
  }
});

// Confirm coupon usage after successful payment
app.post('/api/coupons/confirm', authenticate, async (req, res) => {
  const { couponId } = req.body
  try {
    // Get current coupon from user
    const user = await pool.query('SELECT coupon_code FROM users WHERE id = $1', [req.userId])

    if (!user.rows[0]?.coupon_code) {
      return res.status(400).json({ message: 'No coupon applied' })
    }

    // Record usage in used_coupons
    await pool.query(
      'INSERT INTO used_coupons (user_id, coupon_id) VALUES ($1, $2)',
      [req.userId, couponId]
    )

    // Update coupon usage count
    await pool.query(
      'UPDATE coupon_codes SET current_uses = current_uses + 1 WHERE id = $1',
      [couponId]
    )

    // Clear coupon from user after successful payment
    await pool.query(
      'UPDATE users SET coupon_code = NULL, coupon_discount_applied = NULL WHERE id = $1',
      [req.userId]
    )

    res.json({
      success: true,
      message: 'Coupon confirmed. Your next payment will be at full price.'
    })
  } catch (err) {
    console.error('Confirm coupon error:', err)
    res.status(500).json({ message: 'Server error' })
  }
});

// Clear coupon without using it
app.post('/api/coupons/clear', authenticate, async (req, res) => {
  try {
    await pool.query(
      'UPDATE users SET coupon_code = NULL, coupon_discount_applied = NULL WHERE id = $1',
      [req.userId]
    )
    res.json({ success: true })
  } catch (err) {
    console.error('Clear coupon error:', err)
    res.status(500).json({ message: 'Server error' })
  }
});

// Admin: Create a coupon code
app.post('/api/admin/coupons', authenticate, async (req, res) => {
  try {
    const user = await pool.query('SELECT role FROM users WHERE id = $1', [req.userId])
    if (user.rows[0]?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }

    const { code, discount_percentage, description, max_uses, expires_at, new_users_only, applicable_tiers } = req.body

    console.log('Creating coupon with data:', { code, discount_percentage, description, max_uses, expires_at, new_users_only, applicable_tiers })

    const tiersArray = applicable_tiers || ['free', 'premium', 'premium_plus', 'enterprise']
    const result = await pool.query(
      `INSERT INTO coupon_codes (code, discount_percentage, description, max_uses, expires_at, new_users_only, applicable_tiers, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [code.toUpperCase(), discount_percentage, description, max_uses || null, expires_at || null, new_users_only !== false, tiersArray, req.userId]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error('Create coupon error:', err)
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Coupon code already exists' })
    }
    res.status(500).json({ message: 'Server error' })
  }
});

// Admin: Get all coupons
app.get('/api/admin/coupons', authenticate, async (req, res) => {
  try {
    const user = await pool.query('SELECT role FROM users WHERE id = $1', [req.userId])
    if (user.rows[0]?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }

    const result = await pool.query('SELECT * FROM coupon_codes ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error('Fetch admin coupons error:', err)
    res.status(500).json({ message: 'Server error' })
  }
});

// Admin: Delete coupon
app.delete('/api/admin/coupons/:id', authenticate, async (req, res) => {
  try {
    const user = await pool.query('SELECT role FROM users WHERE id = $1', [req.userId])
    if (user.rows[0]?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }

    await pool.query('DELETE FROM coupon_codes WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error('Delete coupon error:', err)
    res.status(500).json({ message: 'Server error' })
  }
});

// Admin: Toggle coupon active status
app.patch('/api/admin/coupons/:id', authenticate, async (req, res) => {
  try {
    const user = await pool.query('SELECT role FROM users WHERE id = $1', [req.userId])
    if (user.rows[0]?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }

    const { is_active } = req.body
    const result = await pool.query(
      'UPDATE coupon_codes SET is_active = $1 WHERE id = $2 RETURNING *',
      [is_active, req.params.id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error('Update coupon error:', err)
    res.status(500).json({ message: 'Server error' })
  }
});

// Projects Routes
app.get('/api/projects', authenticate, async (req, res) => {
  const { userId } = req.query;
  let query = 'SELECT * FROM projects';
  let params = [];
  
  if (userId) {
    query += ' WHERE userid = $1';
    params = [userId];
  }
  
  query += ' ORDER BY created_at DESC';
  
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch projects error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/projects', authenticate, async (req, res) => {
  const { title, description, category, thumbnail, status, template, userId, data } = req.body;
  const projectData = data ? JSON.stringify(data) : null;
  
  try {
    const result = await pool.query(
      'INSERT INTO projects (title, description, category, thumbnail, status, template, userid, data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, description, category, thumbnail, status || 'draft', template, userId || req.userId, projectData]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/projects/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields).filter(k => k !== 'id' && k !== 'created_at');
  
  if (keys.length === 0) return res.status(400).json({ message: 'No fields to update' });

  const values = keys.map(k => {
    const val = fields[k];
    if (val && typeof val === 'object') {
      return JSON.stringify(val);
    }
    return val;
  });
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

  try {
    const result = await pool.query(
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
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Orders Routes
app.get('/api/orders', authenticate, async (req, res) => {
  const { userId } = req.query;
  let query = 'SELECT * FROM orders';
  let params = [];
  
  if (userId) {
    query += ' WHERE userid = $1';
    params = [userId];
  }
  
  query += ' ORDER BY created_at DESC';
  
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/orders', authenticate, async (req, res) => {
  const { order_number, service_id, service_name, plan_name, amount, status, userId, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (order_number, service_id, service_name, plan_name, amount, status, userid, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [order_number, service_id, service_name, plan_name, amount, status || 'pending', userId || req.userId, description]
    );
    res.json(result.rows[0]);
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
    const result = await pool.query(
      `UPDATE orders SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Support Tickets Routes
app.post('/api/support-tickets', authenticate, async (req, res) => {
  const { subject, message, priority, userId } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO support_tickets (subject, message, priority, userid) VALUES ($1, $2, $3, $4) RETURNING *',
      [subject, message, priority || 'medium', userId || req.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Create ticket error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/support-tickets', authenticate, async (req, res) => {
  const { userId } = req.query;
  let query = 'SELECT * FROM support_tickets';
  let params = [];
  
  if (userId) {
    query += ' WHERE userid = $1';
    params = [userId];
  }
  
  query += ' ORDER BY created_at DESC';
  
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch tickets error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Templates Routes
app.get('/api/templates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM templates ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch templates error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/templates', authenticate, async (req, res) => {
  const { title, description, category, thumbnail, html, css, js, userId } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO templates (title, description, category, thumbnail, html, css, js, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, description, category, thumbnail, html, css, js, userId || req.userId]
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
  
  if (keys.length === 0) return res.status(400).json({ message: 'No fields to update' });

  const values = keys.map(k => {
    const val = fields[k];
    if (val && typeof val === 'object') {
      return JSON.stringify(val);
    }
    return val;
  });
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

  try {
    const result = await pool.query(
      `UPDATE templates SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update template error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leads Routes
app.get('/api/leads', authenticate, isAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch leads error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/leads', async (req, res) => {
  const { company, contact_name, email, phone, service_interest, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO leads (company, contact_name, email, phone, service_interest, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [company, contact_name, email, phone, service_interest, message]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Create lead error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/leads/:id', authenticate, isAdmin, async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields).filter(k => k !== 'id' && k !== 'created_at');
  
  if (keys.length === 0) return res.status(400).json({ message: 'No fields to update' });

  const values = keys.map(k => fields[k]);
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

  try {
    const result = await pool.query(
      `UPDATE leads SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update lead error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/leads/:id', authenticate, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM leads WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Delete lead error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Partnership Requests Routes
app.get('/api/partnership-requests', authenticate, async (req, res) => {
  const { userId } = req.query;
  try {
    let query = 'SELECT * FROM partnership_requests';
    let params = [];
    
    // If not admin, only show own requests
    const userCheck = await pool.query('SELECT role FROM users WHERE id = $1', [req.userId]);
    const isAdmin = userCheck.rows[0]?.role === 'admin';
    
    if (!isAdmin && userId) {
      query += ' WHERE user_id = $1';
      params = [userId];
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch partnership requests error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/partnership-requests', authenticate, async (req, res) => {
  const { businessName, businessType, website, description, userId } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO partnership_requests (business_name, business_type, website, description, user_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [businessName, businessType, website, description, userId || req.userId, 'pending']
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Create partnership request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/partnership-requests/:id', authenticate, isAdmin, async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields).filter(k => k !== 'id' && k !== 'created_at');
  
  if (keys.length === 0) return res.status(400).json({ message: 'No fields to update' });

  const values = keys.map(k => fields[k]);
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

  try {
    const result = await pool.query(
      `UPDATE partnership_requests SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update partnership request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// File upload endpoint
app.post('/api/upload', authenticate, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ 
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
