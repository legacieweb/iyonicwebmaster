# Authentication & Dashboard System Guide

## Overview

The Iyonicorp website now includes a complete authentication system with role-based dashboards. Users can login, access personalized dashboards, and admins can manage leads and projects.

## 🔐 Authentication System

### Features
- **User Registration** - Sign up with email and password
- **User Login** - Authenticate with PocketBase
- **Session Management** - Persistent sessions using localStorage
- **Role-Based Access** - Different views for users and admins
- **Bearer Token Authentication** - Secure API requests with JWT tokens

### Auth Context

Located in: `src/contexts/AuthContext.jsx`

```javascript
const {
  currentUser,      // Currently logged-in user object
  isLoading,        // Loading state for auth operations
  error,            // Auth error messages
  login,            // Login function (email, password)
  signup,           // Sign-up function (email, password, name)
  logout,           // Logout function
  isAdmin,          // Boolean - true if user is admin
  isAuthenticated,  // Boolean - true if user is logged in
} = useAuth()
```

### Login/Sign-up Modal

Located in: `src/components/AuthModal.jsx`

- Triggered from Navbar login button
- Toggle between login and sign-up modes
- Form validation and error handling
- Loading states for form submission

**Demo Credentials:**
- Email: `admin@iyonicorp.com`
- Password: (Set in your PocketBase instance)

## 📊 Dashboard Views

### Landing Page (Default)
- Shows when user is **not authenticated**
- Displays Hero, Services, Stats, and Contact sections
- Login button in navbar

### User Dashboard
- Shows when user is **authenticated** (non-admin)
- **Active Projects Section:**
  - Fetches projects from `/api/collections/orders/records`
  - Displays project status (pending, in_progress, completed)
  - Shows deadline information
  
- **Support Ticket Section:**
  - Form to submit support requests
  - Posts to `/api/collections/support_tickets/records`
  - Displays submission status

### Admin Panel
- Shows when user is **admin** (email === `admin@iyonicorp.com`)
- **Leads Management:**
  - View all leads from `/api/collections/leads/records`
  - Edit lead information
  - Delete leads with confirmation
  - View full lead messages
  
- **Projects Management:**
  - View all projects from `/api/collections/projects/records`
  - Edit project details
  - Delete projects with confirmation
  - Expandable project details

## 🔌 API Integration

### Authentication Endpoints

```javascript
// Login
POST /api/collections/users/auth-with-password
{
  identity: "user@example.com",
  password: "password123"
}

// Sign-up
POST /api/collections/users/records
{
  email: "user@example.com",
  password: "password123",
  passwordConfirm: "password123",
  name: "User Name"
}
```

### Protected Endpoints

All protected endpoints require Bearer token in Authorization header:

```javascript
headers: {
  Authorization: `Bearer ${token}`
}
```

**Available Protected Endpoints:**

- `GET /api/collections/orders/records` - User projects
- `GET /api/collections/leads/records` - All leads (admin)
- `GET /api/collections/projects/records` - All projects (admin)
- `DELETE /api/collections/leads/records/{id}` - Delete lead (admin)
- `DELETE /api/collections/projects/records/{id}` - Delete project (admin)
- `PATCH /api/collections/leads/records/{id}` - Update lead (admin)
- `PATCH /api/collections/projects/records/{id}` - Update project (admin)
- `POST /api/collections/support_tickets/records` - Create support ticket

## 🛡️ Security Features

### Bearer Token Management

Tokens are automatically included in all protected API requests via the `getAuthHeader()` function in `src/utils/api.js`:

```javascript
const getAuthHeader = () => {
  const token = localStorage.getItem('iyonicorp_token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}
```

### Local Storage

The system securely stores:
- `iyonicorp_user` - User object (id, email, name)
- `iyonicorp_token` - JWT token for API requests

**Clear on logout:**
Both items are removed from localStorage when user logs out.

### Admin Role Check

Admin access is determined by:
```javascript
const isAdmin = currentUser?.email === 'admin@iyonicorp.com'
```

Only users with this exact email can access the admin panel.

## 🚀 Usage Examples

### Using Authentication in Components

```javascript
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { currentUser, isAuthenticated, login, logout } = useAuth()

  if (!isAuthenticated) {
    return <p>Please log in</p>
  }

  return (
    <div>
      <p>Welcome {currentUser.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Making Protected API Calls

```javascript
import { fetchUserOrders } from '../utils/api'

const data = await fetchUserOrders()
// Automatically includes Bearer token
```

## 📝 PocketBase Setup

To use the auth system, ensure your PocketBase instance has these collections:

### Users Collection
```
id (Primary Key)
email (Text, unique)
password (Password)
name (Text)
```

### Orders Collection
```
id (Primary Key)
title (Text)
description (Text)
status (Select: pending, in_progress, completed)
deadline (Date)
user_id (Relation to users)
```

### Leads Collection
```
id (Primary Key)
name (Text)
email (Email)
message (Text)
created (DateTime, auto)
status (Select: new, contacted, converted)
```

### Projects Collection
```
id (Primary Key)
title (Text)
description (Text)
category (Text)
image (File)
created (DateTime, auto)
```

### Support Tickets Collection
```
id (Primary Key)
message (Text)
user_id (Relation to users)
status (Select: open, in_progress, resolved)
created (DateTime, auto)
```

## 🔄 Auth Flow

1. **User visits site**
   - AuthContext checks localStorage for existing user/token
   - If found, user is automatically logged in

2. **User clicks Login**
   - AuthModal opens
   - User enters credentials

3. **Login Submission**
   - POST request to `/api/collections/users/auth-with-password`
   - User and token saved to localStorage
   - View automatically changes to dashboard

4. **Dashboard Access**
   - User Dashboard shows for regular users
   - Admin Panel shows for admins
   - Protected API calls include Bearer token

5. **Logout**
   - localStorage items cleared
   - View resets to landing page
   - User is authenticated = false

## 🎨 UI Components

### Auth Modal (AuthModal.jsx)
- Input fields for email, password, name
- Toggle between login/signup
- Error message display
- Loading state

### Updated Navbar
- Login button (when not authenticated)
- Dashboard button (when authenticated)
- User name display
- Logout button with red styling

### User Dashboard (UserDashboard.jsx)
- Projects grid layout
- Support ticket form
- Status indicators
- Back to home button

### Admin Panel (AdminPanel.jsx)
- Leads table with expand/collapse
- Projects table with expand/collapse
- Edit inline functionality
- Delete with confirmation modal
- Access control enforcement

## ⚙️ Configuration

### Change Admin Email

Edit `src/contexts/AuthContext.jsx`:
```javascript
const isAdmin = currentUser?.email === 'your-admin@email.com'
```

### Change API Base URL

Edit `src/utils/api.js`:
```javascript
const BASE_URL = 'https://your-api-url.com'
```

### Token Storage Key

The token is stored with key `iyonicorp_token`. To change:
1. Update in `AuthContext.jsx` - localStorage.setItem/getItem calls
2. Update in `api.js` - getAuthHeader() function

## 🐛 Troubleshooting

### "Invalid email or password"
- Verify credentials in PocketBase users collection
- Check email case sensitivity
- Ensure user is properly created in PocketBase

### "Access Denied" on admin panel
- Verify admin email matches `admin@iyonicorp.com`
- Change admin email in AuthContext.jsx if needed
- Clear browser localStorage and re-login

### Bearer token not being sent
- Check token is properly saved in localStorage
- Verify `iyonicorp_token` key name matches
- Check API endpoint requires authentication

### Projects/Leads not loading
- Verify collection names match in PocketBase
- Check API endpoint permissions in PocketBase
- Ensure user has read access to collections

## 📱 Mobile Responsiveness

All auth components are fully responsive:
- AuthModal adapts to mobile screens
- Admin panel tables scroll horizontally on mobile
- Dashboard adjusts grid layout
- Navbar menu collapses to hamburger

## 🔐 Best Practices

1. **Never expose tokens** in frontend code
2. **Use HTTPS** in production
3. **Set strong passwords** for admin accounts
4. **Regularly audit** admin actions
5. **Implement rate limiting** on auth endpoints
6. **Use CORS properly** to restrict API access
7. **Clear sensitive data** on logout
8. **Validate all inputs** server-side

## 🚀 Next Steps

- Set up email notifications for support tickets
- Add activity logging for admin actions
- Implement two-factor authentication
- Add user profile editing
- Create invoice/billing dashboard
- Add file upload for project updates

---

**For support or questions, contact: support@iyonicorp.com**
