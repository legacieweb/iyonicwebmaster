# Admin Features & Template Builder Guide

This document outlines all the new admin features and template builder functionality for your website builder application.

---

## 🎯 Overview

The system now supports a complete workflow where:
1. **Admins** create template projects with multiple pages and upload code
2. Admins define page relationships and links
3. Admins deploy templates to make them live
4. **Users** browse deployed templates and customize styles (not JavaScript/functions)
5. Users view the final result as a live website, not code

---

## 📊 Admin Dashboard Features

### 1. Analytics & Data Tab
Access key metrics about your platform:
- **Total Leads**: All contact form submissions
- **Templates**: Number of created templates
- **User Projects**: Websites created by users
- **Active Sites**: Published/deployed templates

Recent leads are displayed with timestamps.

**Access**: Admin Panel > Analytics tab

---

## 🎨 Template Builder System

### What is a Template?
A **Template** is a complete website project with multiple pages:
- Each page has a name (e.g., "Homepage", "About", "Contact")
- Each page has HTML/CSS/JavaScript code
- Pages can be linked together for navigation
- Templates are deployed to become live sites

### Admin Workflow

#### Step 1: Create a Template
1. Go to **Admin Panel**
2. Click **Templates** tab
3. Click **New Template**
4. Enter a name (e.g., "Corporate Business Website")
5. Click **Create Template**

#### Step 2: Add Pages
1. In the template editor, scroll to **Add New Page**
2. Enter **Page Name** (e.g., "Homepage")
3. Paste your **HTML/CSS/JavaScript code** in the code editor
4. Click **Add Page**

**Example Page Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f5f5;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Our Website</h1>
    <p>This is your homepage content</p>
  </div>
</body>
</html>
```

#### Step 3: Edit & Link Pages
1. Click **Edit** (pencil icon) on any page
2. Modify the code in the editor
3. Under **Link to Other Pages**, select which pages this page connects to
4. Click **Save & Close**

**Example**: Homepage might link to About and Contact pages

#### Step 4: Manage Pages
- **Edit Page**: Click the edit icon to modify code and links
- **Delete Page**: Click the trash icon (cannot be undone)
- **View Pages**: All pages are listed with character count and link count

#### Step 5: Deploy Template
1. Once all pages are created and linked, click **Deploy Template**
2. The status changes from "Draft" to "Published"
3. Users can now see and use this template

---

## 👥 User Template Experience

### Viewing Templates
Users can:
1. Click **Browse Templates** from the home page
2. See all deployed/published templates
3. Click **View Template** on any template

### Customizing Templates
1. Once viewing a template, click **Customize Styles**
2. A style editor panel opens on the right side
3. Users can write **CSS only** to customize colors, fonts, sizes, etc.
4. Users CANNOT modify:
   - HTML structure
   - JavaScript functions
   - Page functionality

**Available Customizations:**
- Background colors and gradients
- Font styles and sizes
- Button colors and styling
- Text colors
- Spacing and margins
- Hover effects and animations

**Example Custom Styles:**
```css
body {
  background-color: #ffffff;
  color: #000000;
}
h1 {
  color: #3b82f6;
  font-size: 2.5rem;
}
button {
  background-color: #06b6d4;
  color: white;
}
```

### Common Customizations
Quick buttons are provided:
- **Light Theme**: Changes background to white
- **Change Font**: Uses Georgia serif font
- **Button Colors**: Blue button styling
- **Gradient Background**: Purple gradient

---

## 🗄️ Database Setup

### Required Collection: `templates`

Create this collection in PocketBase:

**Fields:**
| Field Name | Type | Required | Default |
|------------|------|----------|---------|
| name | Text | Yes | - |
| pages | JSON | Yes | [] |
| status | Select | Yes | draft |
| deployed | Boolean | Yes | false |
| description | Text | No | - |
| category | Text | No | - |
| created | DateTime | Auto | - |
| updated | DateTime | Auto | - |

**Pages JSON Structure:**
```json
[
  {
    "id": "1234567890",
    "name": "Homepage",
    "code": "<div>...</div>",
    "linkedPages": ["1234567891", "1234567892"]
  }
]
```

### Permission Rules

Set these **API Rules** for the templates collection:

**List Rule (Admin only):**
```
@request.auth.id != '' && @request.auth.email == 'admin@iyonicorp.com'
```

**View Rule (Admin only):**
```
@request.auth.id != '' && @request.auth.email == 'admin@iyonicorp.com'
```

**Create Rule (Admin only):**
```
@request.auth.id != '' && @request.auth.email == 'admin@iyonicorp.com'
```

**Update Rule (Admin only):**
```
@request.auth.id != '' && @request.auth.email == 'admin@iyonicorp.com'
```

**Delete Rule (Admin only):**
```
@request.auth.id != '' && @request.auth.email == 'admin@iyonicorp.com'
```

See `database/TEMPLATES_SETUP.md` for detailed PocketBase setup instructions.

---

## 🔑 Key Concepts

### Templates vs. User Projects
- **Templates**: Created by admins, deployed, read-only code, users customize styles
- **User Projects**: Created by users using the web builder, fully customizable

### Pages in Templates
- Each page is a complete HTML document
- Pages are linked to enable navigation
- Code runs in a sandboxed iframe for security
- JavaScript execution is restricted to what's in the code

### Deployment
- Only deployed templates are visible to users
- Admins can keep templates in "Draft" status while working
- Published templates cannot be edited (planned feature: versions)

---

## 📱 Component Overview

### New Components Created:
1. **TemplateBuilder** (`src/components/TemplateBuilder.jsx`)
   - Admins create templates and manage pages
   - Location: Admin Panel > Templates tab

2. **TemplateViewer** (`src/components/TemplateViewer.jsx`)
   - Users view deployed templates as live websites
   - Users customize CSS styles
   - Location: Selected from DeployedTemplates

3. **DeployedTemplates** (`src/components/DeployedTemplates.jsx`)
   - Gallery of all deployed templates
   - Shows template cards with info
   - Location: App navigation

### Modified Components:
1. **AdminPanel** (`src/components/AdminPanel.jsx`)
   - Added Analytics tab
   - Added Templates tab with TemplateBuilder
   - Added tabbed navigation
   - Added stats cards showing key metrics

2. **App** (`src/App.jsx`)
   - Added routes for deployed-templates view
   - Added routes for view-template view
   - Integrated TemplateViewer

### New API Functions (`src/utils/api.js`):
```javascript
export const saveTemplate(templateData)
export const updateTemplate(id, templateData)
export const deleteTemplate(id)
export const fetchTemplates()
export const deployTemplate(templateId)
```

---

## 🚀 Workflow Examples

### Admin Creates a Business Website Template

1. **Admin logs in** with `admin@iyonicorp.com`
2. **Creates Template** named "Corporate Business Website"
3. **Adds Pages:**
   - Homepage (with hero section, CTA buttons)
   - About (company info, team)
   - Services (service list)
   - Contact (contact form)
4. **Links Pages:** Homepage links to all pages, About/Services/Contact link back to Homepage
5. **Writes Code:** For each page, admin pastes complete HTML with styles and scripts
6. **Deploys:** Clicks "Deploy Template" to make it live

### User Customizes the Template

1. **User views** the template in template gallery
2. **Opens** the template in TemplateViewer
3. **Clicks** "Customize Styles"
4. **Changes CSS:** 
   - Main color from cyan to purple
   - Font from sans-serif to serif
   - Button styles to match their brand
5. **Saves** and views the customized version
6. **Optionally** saves as their own project

---

## 🔒 Security Features

### Code Isolation
- Template code runs in a sandboxed iframe
- Malicious code is contained within that iframe
- Users can only inject CSS, not JavaScript

### Permission Control
- Only admins (admin@iyonicorp.com) can create/manage templates
- Users can only view and customize styles
- Templates are immutable once deployed

### Data Safety
- Original template code is never exposed to users
- Custom styles are ephemeral (not saved per template)
- Changes don't affect the original template

---

## 📋 Checklist for Implementation

- [ ] Create `templates` collection in PocketBase
- [ ] Set up permission rules for templates collection
- [ ] Verify admin user `admin@iyonicorp.com` exists
- [ ] Test admin panel access
- [ ] Create a test template with sample pages
- [ ] Deploy the test template
- [ ] View template as a regular user
- [ ] Customize styles and verify changes
- [ ] Test page navigation
- [ ] Verify template code is not exposed to users

---

## 🐛 Troubleshooting

### Templates Not Showing
- Check that templates collection exists in PocketBase
- Verify admin email is exactly `admin@iyonicorp.com`
- Check PocketBase API Rules for templates collection

### Code Not Rendering
- Check HTML syntax is valid
- Verify no external dependencies are required
- Check browser console for errors

### Styles Not Applying
- Verify CSS selectors match template HTML elements
- Use inspector to check actual class/id names
- Try specific selectors (e.g., `.container h1` instead of `h1`)

### Page Links Not Working
- In template editor, verify pages are linked together
- Check page IDs match in linkedPages array
- Ensure both pages are deployed

---

## 🎓 Advanced Features

### Future Enhancements
- [ ] Template versioning
- [ ] Template preview before deployment
- [ ] User project templates (saving customized templates)
- [ ] Template marketplace/sharing
- [ ] Template categories and filtering
- [ ] Template usage analytics
- [ ] Code syntax highlighting in editor
- [ ] Live preview while editing

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review TEMPLATES_SETUP.md for database setup
3. Check PocketBase logs for API errors
4. Review browser console for JavaScript errors

---

## 📝 Admin Credentials

- **Email**: `admin@iyonicorp.com`
- **Password**: `Admin@123456`

⚠️ Change these credentials in production!

---

## 📚 Related Documentation

- `database/TEMPLATES_SETUP.md` - Detailed PocketBase setup
- `AUTH_GUIDE.md` - Authentication system
- `QUICK_START.md` - Getting started guide
