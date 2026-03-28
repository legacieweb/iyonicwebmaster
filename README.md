# Iyonicorp - Premium Web Development Agency Website

A stunning, high-end one-page agency website built with React, Tailwind CSS, and Framer Motion. Features a dark-themed Apple-style design with glassmorphism, glowing gradients, and smooth scroll animations.

## 🎨 Features

### Design
- **Dark-themed Apple-style** landing page with premium aesthetics
- **Glassmorphism effects** with blurred backgrounds
- **Glowing gradients** (Indigo/Cyan) throughout the design
- **High-contrast typography** for optimal readability
- **Responsive design** - Perfect on mobile to 4K displays

### Animations & Interactions
- **Smooth scroll-reveal animations** - Elements fade in as users scroll
- **Sticky navbar** with glassmorphic background
- **Floating elements** and interactive hover effects
- **Framer Motion** for professional motion design

### Components
1. **Navbar** - Fixed sticky navigation with mobile menu
2. **Hero** - Eye-catching hero section with CTAs
3. **About** - Company overview and mission statement
4. **Services** - Showcase of our primary service offerings
5. **Stats** - Key metrics display
6. **Contact** - Contact form with email/phone/location info
7. **Footer** - Social links and navigation

### API Integration
- **Neon DB Integration** - PostgreSQL database for authentication, user management, projects, orders, and leads
- **Dynamic Contact Form** - Submits leads to `/api/collections/leads/records`
- **Error Handling** - Graceful fallbacks when API is offline
- **Status Indicator** - Shows system maintenance message when server is down

### Advanced Features
- **Offline Mode** - Displays sample projects if API is unavailable
- **API Status Check** - Automatically checks API status every 30 seconds
- **Form Validation** - Client-side form validation
- **Loading States** - Spinner animations during data fetching
- **Success/Error Messages** - User feedback for form submissions

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd iyonicweb

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will open at `http://localhost:5173`

## 📁 Project Structure

```
iyonicweb/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              - Sticky navigation with auth buttons
│   │   ├── Hero.jsx                - Hero section
│   │   ├── Services.jsx            - Services showcase
│   │   ├── Portfolio.jsx           - Portfolio with API integration
│   │   ├── Stats.jsx               - Statistics section
│   │   ├── Contact.jsx             - Contact form
│   │   ├── Footer.jsx              - Footer section
│   │   ├── AuthModal.jsx           - Login/Sign-up modal (NEW!)
│   │   ├── UserDashboard.jsx       - User dashboard (NEW!)
│   │   └── AdminPanel.jsx          - Admin management panel (NEW!)
│   ├── contexts/
│   │   └── AuthContext.jsx         - Auth state management (NEW!)
│   ├── hooks/
│   │   └── useScrollReveal.js      - Scroll animation hook
│   ├── utils/
│   │   └── api.js                  - API client with auth support
│   ├── App.jsx                     - Main app with view routing
│   ├── main.jsx                    - Entry point with AuthProvider
│   └── index.css                   - Global styles
├── index.html                      - HTML entry point
├── vite.config.js                  - Vite configuration
├── tailwind.config.js              - Tailwind CSS configuration
├── postcss.config.js               - PostCSS configuration
├── package.json                    - Dependencies
├── README.md                       - Main documentation
├── AUTH_GUIDE.md                   - Auth system documentation (NEW!)
└── dist/                           - Production build (generated)
```

## 🎯 Key Technologies

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Axios** - HTTP client for API calls
- **React Context API** - State management for authentication
- **Neon DB** - PostgreSQL database hosted on Neon
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

## 🔐 Authentication System (NEW!)

### Overview
The website includes a complete authentication system with multiple user roles and dashboards:

- **Landing Page** - Public view with Hero, Services, Stats, Contact
- **User Dashboard** - Authenticated users see their projects and can submit support tickets
- **Admin Panel** - Admins manage all leads and projects with full CRUD operations

### Key Features
- ✅ User registration and login
- ✅ Persistent sessions with localStorage
- ✅ Bearer token authentication for protected endpoints
- ✅ Role-based access control (User vs Admin)
- ✅ Auto-login on page load if session exists
- ✅ Logout with complete session cleanup

### Quick Start with Auth

**Login/Sign-up:**
1. Click "Login" button in navbar
2. Toggle between Login and Sign Up modes
3. Submit credentials
4. Automatic redirect to dashboard

**User Dashboard:**
- View your active projects with status
- Submit support tickets for assistance
- See project deadlines and descriptions

**Admin Panel:**
- Access at `admin@iyonicorp.com` email
- Manage all leads (view, edit, delete)
- Manage all projects (view, edit, delete)
- Expandable details for each item

### API Integration with Auth

Protected API endpoints automatically include Bearer token:

```javascript
// Example: Fetching user's projects
const projects = await fetchUserOrders()
// Token automatically added to Authorization header
```

**Protected API Endpoints:**
- `/api/auth/login` - User authentication
- `/api/auth/signup` - User registration
- `/api/users/:id` - User profile management
- `/api/projects` - Project CRUD operations
- `/api/orders` - Order management
- `/api/support-tickets` - Support ticket creation
- `/api/leads` - Lead submission (public)

### Neon DB Configuration

The application uses PostgreSQL tables hosted on Neon:

**Users Table:**
- id (SERIAL PRIMARY KEY)
- email (VARCHAR UNIQUE)
- password (VARCHAR hashed)
- first_name, last_name, phone_number
- role, created_at

**Projects Table:**
- id, title, description, category, thumbnail
- status, template, userid (FK), data (JSONB)
- created_at

**Orders Table:**
- id, order_number, service_id, service_name
- plan_name, amount, status, userid (FK)
- description, created_at

**Leads Table:**
- id, name, email, message, created_at

**Support Tickets Table:**
- id, subject, message, priority, status
- userid (FK), created_at

**Templates Table:**
- id, name, description, category, thumbnail
- html_content, css_content, js_content
- deployed, status, created_at
- id, name, email, message, created, status

**Projects:**
- id, title, description, category, image, created

**Support Tickets:**
- id, message, user_id, status, created

See [AUTH_GUIDE.md](./AUTH_GUIDE.md) for complete authentication documentation.

## 🔧 Configuration

### API Endpoint
The application is configured to connect to:
```
https://tests-permits-sam-asus.trycloudflare.com
```

Update this in `src/utils/api.js` if needed.

### Tailwind Configuration
Customize colors, animations, and other styles in `tailwind.config.js`

### Vite Configuration
Development server settings and build options are in `vite.config.js`

## 📝 Environment Variables

Create a `.env.local` file if you need to customize:
- API endpoints
- Environment-specific settings

## 🎨 Customization

### Change Colors
Edit the color scheme in:
- `tailwind.config.js` - Add custom colors
- `src/index.css` - Modify gradient definitions
- Component files - Update gradient classes

### Modify Content
- Update company info in `src/App.jsx` and component files
- Edit service descriptions in `src/components/Services.jsx`
- Customize contact info in `src/components/Contact.jsx`

### Add New Sections
1. Create new component in `src/components/`
2. Import and add to `src/App.jsx`
3. Add scroll animation hook if needed

## 🔌 API Integration

### Contact Form Endpoint
```
POST /api/collections/leads/records
```
Accepts: `{ name, email, message }`

### Offline Fallback
When API is unavailable, the portfolio displays sample projects to maintain functionality.

## 📱 Responsive Design

The site is optimized for:
- **Mobile** - 320px and up
- **Tablet** - 768px and up
- **Desktop** - 1024px and up
- **4K** - 2560px and up

## ⚡ Performance

- **Optimized bundle size** - ~378KB (gzipped: ~124KB)
- **CSS optimized** - ~19.69KB (gzipped: ~4.31KB)
- **Lazy loading** - Components load on scroll
- **Production build** - Minified and optimized

## 🛠️ Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎁 Features in Detail

### Sticky Navbar
- Fixed position with glassmorphic background
- Smooth animations on page load
- Mobile-responsive hamburger menu
- Smooth scroll navigation

### Hero Section
- Large animated heading with gradient text
- Animated background with floating elements
- Call-to-action buttons
- Responsive layout

### Services Section
- 6-card grid layout
- Icon with gradient backgrounds
- Hover scale and shadow effects
- Responsive columns (1 on mobile, 2 on tablet, 3 on desktop)

### Services Section (replaces previous portfolio)
- Static menu of core company offerings
- Clickable cards link to contact form
- Responsive grid with icons and hover effects

### Stats Section
- 4-column stat cards
- Animated icons
- Responsive grid
- Hover effects

### Contact Section
- Professional contact form
- Contact information cards
- Form validation
- Success/error messaging
- Accessible form inputs

### Footer
- Company description
- Links grouped by category
- Social media icons
- Copyright information

### Authentication & Dashboards (NEW!)
- **Auth Modal** - Login/Sign-up with validation
- **User Dashboard** - View project status and submit support tickets
- **Admin Panel** - Manage leads and projects with CRUD operations
- **Auth Context** - Global state management for user sessions
- **Protected Routes** - Role-based access control

## 🔐 Security

- Form inputs are validated
- No sensitive data is logged
- CORS-friendly API requests
- Safe error handling
- **Bearer Token Authentication** - Secure API calls with JWT tokens
- **LocalStorage Session** - Persistent user sessions
- **Role-Based Access** - Admin-only features protected
- **Token Management** - Automatic token inclusion in protected requests

## 📄 License

MIT License - Feel free to use this project for commercial purposes.

## 📞 Support

For issues or questions, please refer to the component documentation or the inline comments in the code.

## 🚀 Deployment

### Build the project
```bash
npm run build
```

### Deploy the dist/ folder
The `dist/` folder contains the production-ready files. Deploy it to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Environment Considerations
- Update API endpoint in `src/utils/api.js` for production
- Ensure CORS is configured on your API server
- Set up proper error tracking

## 🎯 Future Enhancements

- Add blog section
- Implement testimonials carousel
- Add dark/light mode toggle
- Integrate email notification service
- Add CMS integration
- Implement analytics tracking
- Add video backgrounds
- Create case study pages

---

**Built with ❤️ for Iyonicorp**
