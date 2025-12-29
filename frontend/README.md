# 📱 Blog Application - Frontend (React)

A modern, responsive React Single Page Application (SPA) for the Blog Application.

## 📋 Overview

A fully functional blog UI with:
- User authentication (register, login, logout)
- View all blog posts with pagination
- Create, edit, and delete posts
- Add and manage comments
- User avatars and profiles
- Post expiration countdown timer
- Tag management for posts
- Responsive, clean design

---

## 🛠️ Tech Stack

- **React**: 18.x
- **React Router**: v6 (client-side routing)
- **Axios**: HTTP client for API calls
- **CSS**: Modular CSS files (no external frameworks)
- **JavaScript**: Modern ES6+
- **Node.js**: 20+
- **Container**: Docker

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html              # Main HTML file
│   ├── default-avatar.png      # Default user avatar
│   └── manifest.json
│
├── src/
│   ├── index.js                # App entry point
│   ├── index.css               # Global styles
│   ├── App.js                  # Main app component
│   │
│   ├── api/                    # API client functions
│   │   ├── auth.js             # Authentication API
│   │   ├── posts.js            # Posts API
│   │   ├── comments.js         # Comments API
│   │   └── tags.js             # Tags API
│   │
│   ├── auth/                   # Authentication context
│   │   ├── AuthContext.js      # Auth state management
│   │   └── ProtectedRoute.js   # Route protection
│   │
│   ├── components/             # Reusable components
│   │   ├── Header.js           # Navigation header
│   │   ├── PostItem.js         # Individual post card
│   │   ├── Comments.js         # Comments section
│   │   ├── Expiration.js       # Expiration timer
│   │   └── LoginForm.js        # Login component
│   │
│   ├── pages/                  # Page components
│   │   ├── Landing.js          # Home/landing page
│   │   ├── Login.js            # Login page
│   │   ├── Register.js         # Registration page
│   │   └── Posts.js            # Blog feed page
│   │
│   └── styles/                 # CSS stylesheets
│       ├── base.css            # Global styles
│       ├── header.css          # Header styles
│       ├── forms.css           # Form styles
│       ├── posts.css           # Posts & comments styles
│       ├── landing.css         # Landing page styles
│       └── components.css      # Component styles
│
└── package.json                # Dependencies
```

---

## 🚀 Quick Start

### Using Docker (Recommended)

From project root:
```bash
docker compose up --build
```

Frontend will be available at: `http://localhost:3000`

### Running Locally

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open browser**
   ```
   http://localhost:3000
   ```

---

## 🔐 Authentication

### Registration Flow
1. User clicks "Register" on landing page
2. Fills in: Name, Email, Password, optional Avatar image
3. Submits form to backend `/api/auth/register`
4. Receives JWT token in response
5. Token stored in localStorage
6. User redirected to blog feed

### Login Flow
1. User enters email and password
2. Backend validates credentials
3. Returns JWT token on success
4. Token stored in localStorage
5. User can now access protected pages

### Token Management
- Stored in localStorage under key: `token`
- Automatically included in all API requests
- Header: `Authorization: Bearer {token}`
- Axios interceptor handles token injection

---

## 📄 Pages & Components

### Landing Page (`/`)
- Welcome message
- Sign In button → `/login`
- Register button → `/register`
- Only shown if not authenticated

### Login Page (`/login`)
- Email input field
- Password input field
- Submit button
- Register link
- Form validation

### Register Page (`/register`)
- Name input field
- Email input field
- Password input field
- Password confirmation field
- Avatar upload (optional)
- Submit button
- Login link

### Posts Feed (`/posts`)
- List of all blog posts
- Each post shows:
  - User avatar & name
  - Post creation date
  - **Expiration countdown timer** (hours & minutes remaining)
  - Post title and body
  - Tags
  - Comments section
  - Edit button (if owner)
  - Delete button (if owner)
- Create Post button (top)
- Infinite scroll / Pagination

### Post Item Component
- User information (avatar, name, date)
- Expiration timer display
- Post content (title, body)
- Tags
- Edit form (when editing)
- Comments section
- Action buttons (Edit, Delete for owner)

### Comments Section
- List of existing comments
- Each comment shows:
  - Comment author avatar
  - Author name
  - Comment text
  - Edit/Delete buttons (if owner)
- Input field to add new comment
- Submit button

### Expiration Component
- Displays countdown timer
- Format: `Xh Ym remaining`
- Yellow background for active posts
- Red background for expired posts
- Updates in real-time

### Header Component
- Logo/Brand
- Navigation links
- User avatar (if logged in)
- Logout button
- Responsive menu (mobile)

---

## 🔌 API Integration

### Base URL
```
http://localhost:8000/api
```

### API Calls Made

**Authentication**
```javascript
// Register
POST /auth/register
body: { name, email, password, password_confirmation, image }

// Login
POST /auth/login
body: { email, password }

// Get current user
GET /auth/user
header: { Authorization: Bearer token }

// Logout
POST /auth/logout
header: { Authorization: Bearer token }
```

**Posts**
```javascript
// Get all posts
GET /posts?page=1&per_page=15

// Get single post
GET /posts/{id}

// Create post
POST /posts
body: { title, body, tags }
header: { Authorization: Bearer token }

// Update post
PUT /posts/{id}
body: { title, body, tags }
header: { Authorization: Bearer token }

// Delete post
DELETE /posts/{id}
header: { Authorization: Bearer token }
```

**Comments**
```javascript
// Add comment
POST /posts/{post_id}/comments
body: { content }
header: { Authorization: Bearer token }

// Update comment
PUT /comments/{id}
body: { content }
header: { Authorization: Bearer token }

// Delete comment
DELETE /comments/{id}
header: { Authorization: Bearer token }
```

**Tags**
```javascript
// Get all tags
GET /tags

// Update post tags
POST /posts/{post_id}/tags
body: { tags: ["tag1", "tag2"] }
header: { Authorization: Bearer token }
```

---

## 🎨 Styling & Design

### Color Scheme
- **Primary Text**: Black (#000)
- **Secondary Text**: Gray (#666)
- **Background**: White (#fff)
- **Borders**: Light gray (#e0e0e0)
- **Buttons**:
  - Edit: Blue (#2196F3)
  - Delete: Red (#f44336)
  - Primary: Black (#000)
  - Secondary: Gray border
- **Expiration**:
  - Active: Yellow (#fff3cd)
  - Expired: Red (#f8d7da)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Component Styling
- No CSS frameworks (pure CSS)
- Modular CSS files for each section
- Flexbox layout
- Mobile-first approach
- Smooth transitions & animations

---

## 🔧 Key Features

### Expiration Timer
- Displays on all posts
- Shows "Xh Ym remaining" format
- Updates every second
- Yellow background when active
- Red background when expired
- Automatically handled by backend

### Image Handling
- User avatars uploaded during registration
- Stored on backend at `/storage/uploads/avatars/{filename}`
- Default avatar fallback if missing
- Images displayed in 40x40px circles

### Form Validation
- Email format validation
- Password confirmation matching
- Required field validation
- Real-time feedback
- Clear error messages

### Protected Routes
- Only authenticated users can access `/posts`
- Unauthenticated users redirected to login
- ProtectedRoute wrapper component enforces this

### Error Handling
- Try-catch blocks for API calls
- User-friendly error messages
- Automatic redirects on 401 (token expired)
- Form validation errors displayed inline

---

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing

### HTTP Client
- `axios` - Promise-based HTTP client

### Utilities
- No external CSS frameworks
- No UI component libraries
- Uses native HTML/CSS

### Development
- `react-scripts` - Build tooling

---

## 🔄 State Management

### Context API
- `AuthContext.js` - Manages authentication state
- `useAuth()` hook for accessing auth state
- Token stored in localStorage
- User data persisted

### Component State
- Local state using `useState`
- Form inputs
- Loading states
- Modal open/close states

### API State
- Loading indicators
- Error messages
- Success notifications

---

## 🌐 Routing

### Routes

| Route | Component | Protected | Purpose |
|-------|-----------|-----------|---------|
| `/` | Landing | No | Home page with intro |
| `/login` | Login | No | User login |
| `/register` | Register | No | User registration |
| `/posts` | Posts | Yes | Blog feed |

### Navigation Flow
```
Landing → Login → Posts
       ↓
    Register → Posts
```

---

## 🚀 Building for Production

```bash
# Build optimized production bundle
npm run build

# Output: build/ directory
# Then serve with static server
npx serve -s build
```

---

## 🐛 Common Issues & Solutions

### "Cannot POST /api/posts"
- Backend not running
- Wrong API base URL
- Check CORS headers

### "Expiration timer not showing"
- Ensure backend returns `expires_at` field
- Check browser console for errors
- Verify Expiration component imported correctly

### "Avatar images not loading"
- Check image URL: `/storage/uploads/avatars/{filename}`
- Verify file exists on backend
- Check fallback to default-avatar.png

### "CORS errors"
- Backend must be running on http://localhost:8000
- Check server response headers
- May need CORS middleware on backend

### "Token not being sent with requests"
- Check localStorage has token key
- Verify axios interceptor working
- Check Authorization header in Network tab

---

## 💡 Development Tips

### Debug Token
```javascript
// In browser console
localStorage.getItem('token')
```

### View API Responses
- Open browser DevTools → Network tab
- Filter by XHR
- Click request to see response JSON

### Clear Local Storage
```javascript
// In browser console
localStorage.clear()
// Then refresh page
```

### Mock API Responses
- Use Postman to test API endpoints first
- Verify data format before integrating

---

## 📚 Component API

### PostItem Component
```javascript
<PostItem 
  post={post}                // Post object from API
  currentUser={user}         // Logged-in user object
  onRefresh={refreshFunction} // Callback to refresh posts
/>
```

### Comments Component
```javascript
<Comments 
  post={post}
  currentUser={user}
  onRefresh={refreshFunction}
/>
```

### Expiration Component
```javascript
<Expiration 
  expiresAt={post.expires_at} // ISO date string from API
/>
```

---

## 🔗 Related Files

- Main README: [README.md](../README.md)
- API Guide: [POSTMAN_GUIDE.md](../POSTMAN_GUIDE.md)
- Backend README: [backend/README.md](../backend/README.md)

---

## 📄 License

This project is open source and available under the MIT License.

---

Happy coding! 🎉
