# Render Static Site Deployment Guide for Iyonicorp

This guide will walk you through deploying your Iyonicorp React application as a static site on Render.

## What is Static Site Deployment?

Static site deployment hosts your built frontend files (HTML, CSS, JavaScript) without a backend server. This is perfect for:
- React/Vite applications
- Landing pages
- Portfolio sites
- Documentation sites

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### Step 1: Push Your Code to Git

Make sure your code is committed and pushed to your Git repository:

```bash
git add .
git commit -m "Add render.yaml for static site deployment"
git push origin main
```

### Step 2: Connect to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** button
3. Select **"Static Site"**

### Step 3: Connect Your Repository

1. Connect your GitHub/GitLab/Bitbucket account if not already connected
2. Select your repository containing the iyonicweb project
3. Click **"Connect"**

### Step 4: Configure Build Settings

Render will auto-detect your `render.yaml` file. If not, configure manually:

| Setting | Value |
|---------|-------|
| **Name** | iyonicweb |
| **Build Command** | `npm install --legacy-peer-deps && npm run build` |
| **Publish Directory** | `./dist` |

### Step 5: Configure Environment Variables

In Render dashboard, go to **Environment** and add these variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack public key for payments | Yes |
| `VITE_ADMIN_EMAIL` | Admin email address | Yes |
| `VITE_ADMIN_PASSWORD` | Admin password | Yes |

#### How to Set Environment Variables:

1. In Render dashboard, go to your static site
2. Click **"Environment"** in the left sidebar
3. Add each variable:
   - Click **"Add Environment Variable"**
   - Enter the key (e.g., `VITE_PAYSTACK_PUBLIC_KEY`)
   - Enter the value
   - Click **"Save"**

### Step 6: Deploy

1. Click **"Create Static Site"**
2. Render will:
   - Install dependencies (`npm install --legacy-peer-deps`)
   - Build the React application (`npm run build`)
   - Deploy the `dist` folder
3. Wait for the deployment to complete (usually 2-5 minutes)

### Step 7: Access Your Application

Once deployed, Render will provide you with a URL like:
```
https://iyonicweb.onrender.com
```

## Your render.yaml Configuration

```yaml
services:
  - type: static
    name: iyonicweb
    buildCommand: npm install --legacy-peer-deps && npm run build
    staticPublishPath: ./dist
    envVars:
      - key: VITE_PAYSTACK_PUBLIC_KEY
        sync: false
      - key: VITE_ADMIN_EMAIL
        sync: false
      - key: VITE_ADMIN_PASSWORD
        sync: false
    headers:
      - path: /*
        name: X-Frame-Options
        value: DENY
      - path: /*
        name: X-Content-Type-Options
        value: nosniff
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

## Configuration Explained

| Setting | Purpose |
|---------|---------|
| `type: static` | Deploys as static files (no server) |
| `buildCommand` | Installs dependencies and builds the app |
| `staticPublishPath` | Where built files are located (`./dist` for Vite) |
| `envVars` | Environment variables for the build |
| `headers` | Security headers for all pages |
| `routes` | Rewrites all routes to `index.html` (for React Router) |

## Important Notes

### React Router Support

The `routes` configuration ensures all paths redirect to `index.html`, which is essential for React Router to work properly. Without this, direct navigation to routes like `/about` would return a 404.

### Environment Variables

- Variables starting with `VITE_` are embedded in the build
- They're visible in the browser (don't put secrets here)
- Only add public keys and configuration values

### Build Output

Vite builds to the `dist` folder by default. If you change this in `vite.config.js`, update `staticPublishPath` accordingly.

## Custom Domain (Optional)

To use a custom domain:

1. Go to your static site in Render dashboard
2. Click **"Settings"**
3. Scroll to **"Custom Domains"**
4. Add your domain and follow DNS configuration instructions

## Automatic Deployments

Render automatically deploys when you push to your main branch. To disable:

1. Go to static site settings
2. Toggle **"Auto-Deploy"** off

## Rollbacks

If a deployment fails:

1. Go to your static site in Render dashboard
2. Click **"Events"** tab
3. Find the last successful deployment
4. Click **"Rollback to this deploy"**

## Troubleshooting

### Build Fails

- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Dependency Conflicts

If you see errors like `ERESOLVE could not resolve`:

The `render.yaml` uses `--legacy-peer-deps` flag to handle the `react-paystack` package which doesn't fully support React 19. This is safe and won't affect functionality.

### 404 Errors on Direct Navigation

If you get 404 errors when navigating directly to routes:

- Verify the `routes` configuration in `render.yaml`
- Ensure the rewrite rule is set: `source: /*` → `destination: /index.html`

### Environment Variables Not Working

- Ensure variables start with `VITE_` prefix
- Check they're set in Render dashboard
- Rebuild after adding new variables

## Monitoring

Render provides:

- **Logs**: Real-time build and deployment logs
- **Metrics**: Bandwidth and request statistics
- **Alerts**: Set up notifications for issues

## Free Tier Limitations

- **Bandwidth**: 100GB/month
- **Build Minutes**: 500 minutes/month
- **Custom Domains**: Not included (upgrade required)

## Upgrading to Paid Plan

For production use, consider upgrading to:

- **Starter**: $7/month - Custom domains, more bandwidth
- **Standard**: $25/month - More resources, better performance
- **Pro**: $85/month - High availability, priority support

## Quick Reference

### Key Commands

```bash
# Test build locally
npm run build

# Preview built files locally
npm run preview

# Test full application locally
npm run dev
```

### Build Output Structure

After running `npm run build`, your `dist` folder will contain:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── ...
```

## Checklist Before Deployment

- [ ] Code pushed to Git repository
- [ ] All environment variables ready
- [ ] Build command works locally (`npm run build`)
- [ ] `dist` folder is generated correctly
- [ ] React Router configured properly

## Security Headers

The `render.yaml` includes security headers:

| Header | Purpose |
|--------|---------|
| `X-Frame-Options: DENY` | Prevents clickjacking attacks |
| `X-Content-Type-Options: nosniff` | Prevents MIME-type sniffing |

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Render Status: https://status.render.com

---

**Need Help?** Check the Render documentation or contact support.
