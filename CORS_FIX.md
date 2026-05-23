# 🔧 CORS Error Fix Guide

## Problem Encountered

```
Access to fetch at 'https://pendant-authors-walls-tune.trycloudflare.com/api/collections/users/records' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

## Root Cause

The PocketBase API is on a different domain than the dev server:
- **Dev Server**: `http://localhost:3000` (local)
- **API Server**: `https://pendant-authors-walls-tune.trycloudflare.com` (remote)

Browsers block cross-origin requests by default for security.

## ✅ Solution Implemented

### 1. **Vite Dev Server Proxy**

Added proxy configuration in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://pendant-authors-walls-tune.trycloudflare.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/api'),
      secure: false,
      ws: true,
    }
  }
}
```

**How it works:**
- All requests to `/api/*` on localhost are proxied to the remote API
- Browser sees same-origin requests (both from `localhost:3000`)
- CORS headers are handled transparently
- Works for development only

### 2. **API Client URL Selection**

Updated `src/utils/api.js`:

```javascript
const BASE_URL = import.meta.env.PROD 
  ? 'https://pendant-authors-walls-tune.trycloudflare.com'  // Production
  : '/api'  // Development (proxied)
```

**Behavior:**
- **Development**: Uses `/api` (proxied through Vite)
- **Production**: Uses full HTTPS URL (deployed app)

### 3. **AuthContext API URLs**

Updated login and signup functions in `src/contexts/AuthContext.jsx`:

```javascript
const apiUrl = import.meta.env.PROD 
  ? 'https://pendant-authors-walls-tune.trycloudflare.com/api/collections/users/auth-with-password'
  : '/api/collections/users/auth-with-password'
```

Same pattern for signup endpoint.

## 🚀 How to Use

### Development Mode
```bash
npm run dev
```

All API calls automatically use the Vite proxy:
- Request goes to: `http://localhost:3000/api/collections/...`
- Vite forwards to: `https://pendant-authors-walls-tune.trycloudflare.com/api/collections/...`
- No CORS errors!

### Production Build
```bash
npm run build
```

Compiled code uses full HTTPS URLs directly (no proxy needed).

## 📊 Request Flow

### Development:
```
Browser (localhost:3000)
    ↓
Vite Dev Server Proxy
    ↓
PocketBase API (https://pendant-authors-walls-tune.trycloudflare.com)
    ↓
Response comes back through proxy
```

### Production:
```
Browser (your-domain.com)
    ↓
PocketBase API (https://pendant-authors-walls-tune.trycloudflare.com)
    ↓
Direct HTTPS connection
```

## ✨ Features

✅ No CORS errors in development  
✅ No frontend code changes needed  
✅ Works with all HTTP methods (GET, POST, PATCH, DELETE)  
✅ Handles WebSocket if needed  
✅ Changes Origin header transparently  
✅ Production-ready (uses full URL in build)  

## 🔒 Security Notes

### Development:
- Proxy is local, only for dev server
- No credentials exposed
- Not accessible from outside your machine
- Vite dev server is not for production

### Production:
- Direct HTTPS connection to API
- Ensure CORS headers are set on PocketBase:
  ```
  CORS-Allow-Origins: https://your-domain.com
  CORS-Allow-Headers: Content-Type, Authorization
  CORS-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS
  ```

## 🧪 Testing

### Test Login/Signup:
1. Run dev server: `npm run dev`
2. Click "Login" button
3. Modal should open without errors
4. Try signing up or logging in
5. Check browser console - no CORS errors!

### Check Network Tab:
- Dev server requests: `http://localhost:3000/api/...`
- Should see 200/201 status codes
- No CORS error in Network tab

## 🛠️ Alternative Solutions

If you prefer to fix CORS on the API server instead:

### PocketBase CORS Setup:
```
POCKETBASE_CORS=*
```

Or more specific:
```
POCKETBASE_CORS=http://localhost:3000,https://your-domain.com
```

Then you could remove the Vite proxy.

## 📝 Files Modified

1. **vite.config.js** - Added proxy configuration
2. **src/utils/api.js** - Conditional API URL
3. **src/contexts/AuthContext.jsx** - Conditional API URLs for login/signup

## 🚨 Common Issues

### Issue: "Cannot GET /api/..."
**Solution**: Make sure Vite dev server is running with `npm run dev`

### Issue: Still getting CORS errors
**Solution**: Clear browser cache and restart dev server

### Issue: API calls work locally but fail in production
**Solution**: Ensure CORS is enabled on your production API server

### Issue: WebSocket connections failing
**Solution**: The proxy is configured with `ws: true`, but ensure your API supports WebSockets

## 📚 Related Files

- `vite.config.js` - Vite configuration with proxy
- `src/utils/api.js` - API client initialization
- `src/contexts/AuthContext.jsx` - Auth API calls
- `.env.example` - Environment variables (if needed)

---

**Status**: ✅ **CORS FIX COMPLETE - READY FOR DEVELOPMENT**
