# 📚 Quick Reference Guide

Fast lookup for common tasks and commands.

---

## 🚀 Getting Started (5 Minutes)

```bash
# Clone
git clone <repo>
cd blog-app

# Start
docker compose up --build

# Open
# Frontend: http://localhost:3000
# Backend: http://localhost:8000

# Test with Postman
# Import: Laravel Blog API.postman_collection.json
```

---

## 📁 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | **START HERE** - Project overview, setup, features |
| [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md) | API testing guide with examples |
| [DOCKER.md](DOCKER.md) | Docker Compose commands and troubleshooting |
| [DEPLOYMENT.md](DEPLOYMENT.md) | GitHub and production deployment |
| [backend/README.md](backend/README.md) | Laravel API documentation |
| [frontend/README.md](frontend/README.md) | React app documentation |

---

## 🔧 Common Docker Commands

### Start & Stop
```bash
docker compose up --build          # Start all containers
docker compose up -d               # Start in background
docker compose down                # Stop all containers
docker compose down -v             # Stop and remove volumes
docker compose restart backend     # Restart one service
```

### Logs & Debugging
```bash
docker compose logs -f             # Follow all logs
docker compose logs -f backend     # Follow backend logs
docker exec -it blog_backend bash  # Shell into container
docker ps                          # List running containers
```

### Database
```bash
docker exec -it blog_mysql mysql -u blog_user -p  # MySQL CLI (password: secret)
docker exec -it blog_backend php artisan migrate  # Run migrations
docker exec -it blog_backend php artisan test     # Run tests
```

---

## 🌐 API Endpoints (Quick Reference)

### Base URL
```
http://localhost:8000/api
```

### Authentication
```
POST   /auth/register       # Create account
POST   /auth/login          # Login (get token)
POST   /auth/logout         # Logout
GET    /auth/user           # Current user info
```

### Posts
```
GET    /posts               # All posts (paginated)
POST   /posts               # Create post
GET    /posts/{id}          # Single post
PUT    /posts/{id}          # Update post (owner only)
DELETE /posts/{id}          # Delete post (owner only)
```

### Comments
```
POST   /posts/{post_id}/comments   # Add comment
PUT    /comments/{id}              # Update comment (owner only)
DELETE /comments/{id}              # Delete comment (owner only)
```

### Tags
```
GET    /tags                       # All tags
POST   /posts/{post_id}/tags       # Update post tags (owner only)
```

---

## 📍 URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:8000 |
| **API Docs** | See POSTMAN_GUIDE.md |

---

## 🔐 Test Credentials

### Default Database
- **Host**: localhost (via Docker network: mysql)
- **User**: blog_user
- **Password**: secret
- **Database**: blog

### Test Account (after registration)
```
Email: your@email.com
Password: yourpassword
```

---

## 🐛 Troubleshooting Quick Fixes

### Docker won't start
```bash
docker compose down -v
docker builder prune -f
docker compose up --build
```

### MySQL connection error
```bash
# Wait for MySQL
sleep 30

# Run migrations
docker exec -it blog_backend php artisan migrate
```

### Can't access localhost:3000
```bash
# Check frontend logs
docker compose logs frontend

# Check if container running
docker ps | grep frontend
```

### API returns 401 Unauthorized
- Check token in localStorage: `localStorage.getItem('token')`
- Login again to get new token
- Verify token format: `Bearer {token}`

### Posts not showing expiration
- Check backend returns `expires_at` field
- Verify Expiration.js is imported in PostItem.js
- Check browser console for JavaScript errors

---

## 📝 File Locations

### Backend
- **Controllers**: `backend/app/Http/Controllers/`
- **Models**: `backend/app/Models/`
- **Routes**: `backend/routes/api.php`
- **Tests**: `backend/tests/Feature/`
- **Migrations**: `backend/database/migrations/`
- **Config**: `backend/config/`

### Frontend
- **Components**: `frontend/src/components/`
- **Pages**: `frontend/src/pages/`
- **API Calls**: `frontend/src/api/`
- **Styles**: `frontend/src/styles/`
- **Auth**: `frontend/src/auth/`

---

## 🔄 Development Workflow

### Making Changes

**Backend (PHP/Laravel)**
```bash
# Edit file
nano backend/app/Http/Controllers/PostController.php

# Restart backend
docker compose restart backend

# Run tests
docker exec -it blog_backend php artisan test
```

**Frontend (React)**
```bash
# Edit file
nano frontend/src/components/PostItem.js

# Hot reload happens automatically
# Refresh browser to see changes
```

---

## 🚀 Deployment Quick Steps

### GitHub
```bash
git add .
git commit -m "Your message"
git push origin main
```

### Local Docker (Production Mode)
```bash
# Create env file
cp backend/.env.example backend/.env

# Edit for production
nano backend/.env

# Start
docker compose up --build

# Run migrations
docker exec blog_backend php artisan migrate --force
```

---

## 🧪 Testing

### Run All Tests
```bash
docker exec -it blog_backend php artisan test
```

### Test Specific Feature
```bash
docker exec -it blog_backend php artisan test tests/Feature/PostTest.php
```

### Test with Coverage
```bash
docker exec -it blog_backend php artisan test --coverage
```

### Manual Testing with Postman
1. Import: `Laravel Blog API.postman_collection.json`
2. Register a user
3. Create a post
4. Add a comment
5. Try editing/deleting

---

## 📊 Database Schema Quick View

```sql
users
├── id, name, email, password, image, timestamps

posts
├── id, user_id, title, body, expires_at, timestamps, deleted_at
└── relationships: user, comments, tags

comments
├── id, post_id, user_id, content, timestamps
└── relationships: post, user

tags
├── id, name, timestamps
└── relationships: posts (many-to-many)

post_tag (pivot)
├── post_id, tag_id
```

---

## 💻 Environment Variables Quick Reference

```bash
# Backend (.env)
APP_DEBUG=false
DB_HOST=mysql
DB_DATABASE=blog
DB_USERNAME=blog_user
DB_PASSWORD=secret
QUEUE_CONNECTION=redis
JWT_SECRET=generated-value

# Frontend (.env if needed)
REACT_APP_API_URL=http://localhost:8000/api
```

---

## 📞 Getting Help

### Check Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f mysql
docker compose logs -f frontend
```

### Run Diagnostics
```bash
# Check containers
docker ps -a

# Check networks
docker network ls

# Check volumes
docker volume ls

# Check images
docker images
```

### Documentation
- README.md - Full project guide
- POSTMAN_GUIDE.md - API testing
- DOCKER.md - Docker reference
- DEPLOYMENT.md - Production deployment
- backend/README.md - Laravel docs
- frontend/README.md - React docs

---

## ⌚ Service Port Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Nginx | 8000 | http://localhost:8000 |
| MySQL | 3306 | localhost:3306 |
| Redis | 6379 | localhost:6379 |

---

## 🎯 Common Tasks Checklist

### Initial Setup
- [ ] Clone repository
- [ ] Run `docker compose up --build`
- [ ] Wait for containers to start (~1 minute)
- [ ] Open http://localhost:3000
- [ ] Register new account
- [ ] Create first post
- [ ] Test comments

### Testing
- [ ] Import Postman collection
- [ ] Test register endpoint
- [ ] Test login endpoint
- [ ] Test post CRUD
- [ ] Test comments
- [ ] Run PHPUnit tests

### Deployment
- [ ] Add .gitignore
- [ ] Create GitHub repository
- [ ] Push code
- [ ] Choose deployment platform
- [ ] Configure environment
- [ ] Deploy application
- [ ] Test in production

---

## 🚨 Emergency Reset

If everything breaks:

```bash
# Complete reset
docker compose down -v
docker builder prune -f
docker compose up --build

# OR manually clean
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi $(docker images -q)
docker volume prune -f

# Start fresh
docker compose up --build
```

---

## 📝 Key Files to Know

| File | Purpose |
|------|---------|
| docker-compose.yml | Service definitions |
| backend/.env | Backend configuration |
| backend/routes/api.php | API routes |
| frontend/src/App.js | React root component |
| frontend/src/api/ | API client functions |
| README.md | START HERE |

---

**For detailed information, see the specific documentation files listed above.** 📚

Last updated: December 30, 2025
