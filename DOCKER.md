# 🐳 Docker & Deployment Guide

Complete guide for running the Blog Application using Docker Compose.

---

## 📋 Prerequisites

- **Docker**: v20.10+
- **Docker Compose**: v2.0+
- **Git**: v2.0+
- **4GB RAM** minimum (8GB+ recommended)
- **1GB disk space** minimum

### Install Docker

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install docker.io docker-compose
sudo usermod -aG docker $USER
# Logout and login for group changes to take effect
```

**macOS:**
```bash
# Install Docker Desktop from: https://www.docker.com/products/docker-desktop
# or use Homebrew:
brew install docker docker-compose
```

**Windows:**
- Download Docker Desktop from: https://www.docker.com/products/docker-desktop
- Install and run the installer
- Enable WSL2 backend (recommended)

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd blog-app
```

### 2. Start Everything
```bash
docker compose up --build
```

### 3. Wait for Initialization
- MySQL needs 10-30 seconds to initialize
- Watch logs until you see "ready for connections"
- Next, watch for "Laravel 12 running..."

### 4. Access Application
```
Frontend:    http://localhost:3000
Backend API: http://localhost:8000
```

### 5. Test the App
- Register a new account
- Create a post
- Add a comment
- Edit/delete your content

---

## 🧹 Clean Up & Fresh Start

If you have issues or want to start fresh:

```bash
# Stop all containers
docker compose down

# Remove volumes (deletes data)
docker compose down -v

# Clean Docker builder cache
docker builder prune -f

# Start fresh
docker compose up --build
```

---

## 📊 Docker Compose Services

The `docker-compose.yml` defines 6 services:

### 1. **Backend** (Laravel API)
```yaml
Service: backend
Image: blog_backend
Port: 8000 (via Nginx)
Technology: PHP 8.4-FPM, Laravel 12
Purpose: REST API endpoints
```

**Key Commands:**
```bash
# Access container
docker exec -it blog_backend bash

# Run migrations
docker exec -it blog_backend php artisan migrate

# Run tests
docker exec -it blog_backend php artisan test

# View logs
docker compose logs -f backend
```

---

### 2. **Nginx** (Reverse Proxy)
```yaml
Service: nginx
Image: nginx:alpine
Port: 8000:80
Technology: Nginx
Purpose: Serves Laravel backend, routes requests to PHP-FPM
```

**Key Commands:**
```bash
# View Nginx logs
docker compose logs -f nginx

# Access container
docker exec -it blog_nginx bash
```

---

### 3. **MySQL** (Database)
```yaml
Service: mysql
Image: mysql:8.4
Port: 3306 (internal only)
Technology: MySQL 8.4
Purpose: Primary database
Database: blog
User: blog_user
Password: secret
Root Password: root
```

**Key Commands:**
```bash
# Access MySQL CLI
docker exec -it blog_mysql mysql -u blog_user -p
# Password: secret

# View MySQL logs
docker compose logs -f mysql

# Backup database
docker exec blog_mysql mysqldump -u blog_user -psecret blog > backup.sql

# Restore database
docker exec -i blog_mysql mysql -u blog_user -psecret blog < backup.sql
```

---

### 4. **Redis** (Cache & Queue)
```yaml
Service: redis
Image: redis:7-alpine
Port: 6379 (internal only)
Technology: Redis 7
Purpose: Caching, job queue, session storage
```

**Key Commands:**
```bash
# Access Redis CLI
docker exec -it blog_redis redis-cli

# Check Redis info
docker exec -it blog_redis redis-cli info
```

---

### 5. **Queue Worker** (Background Jobs)
```yaml
Service: queue
Image: blog_backend
Technology: Laravel Queue Worker
Purpose: Process background jobs
Command: php artisan queue:work
```

**Key Commands:**
```bash
# View queue logs
docker compose logs -f queue

# Check if running
docker ps | grep queue

# Restart queue
docker restart blog_queue
```

---

### 6. **Scheduler** (Scheduled Tasks)
```yaml
Service: scheduler
Image: blog_backend
Technology: Laravel Scheduler
Purpose: Run scheduled commands (delete expired posts)
Command: php artisan schedule:work
```

**Key Commands:**
```bash
# View scheduler logs
docker compose logs -f scheduler

# Check scheduled tasks
docker exec -it blog_backend php artisan schedule:list
```

---

### 7. **Frontend** (React SPA)
```yaml
Service: frontend
Image: blog_frontend
Port: 3000:80
Technology: Node.js + React, Nginx
Purpose: User interface
```

**Key Commands:**
```bash
# View frontend logs
docker compose logs -f frontend

# Access container
docker exec -it blog_frontend bash
```

---

## 🔐 Environment Variables

### Using Default Environment

The application comes with sensible defaults - no configuration needed:

```yaml
# Database (MySQL)
DB_HOST: mysql
DB_PORT: 3306
DB_DATABASE: blog
DB_USERNAME: blog_user
DB_PASSWORD: secret
MYSQL_ROOT_PASSWORD: root

# Cache & Queue
CACHE_DRIVER: redis
QUEUE_CONNECTION: redis
REDIS_HOST: redis
REDIS_PORT: 6379

# Frontend API
REACT_APP_API_URL: http://localhost:8000/api

# JWT (auto-configured)
JWT_ALGORITHM: HS256
```

### Custom Environment

To use custom values, create `backend/.env`:

```bash
# Copy example
cp backend/.env.example backend/.env

# Edit variables
nano backend/.env

# Then start Docker
docker compose up --build
```

---

## 📊 Managing Data

### Database Files
- **Location**: Docker volume `mysql_data`
- **Persists**: Between container restarts
- **Backup**: `docker exec blog_mysql mysqldump -u blog_user -psecret blog > backup.sql`
- **Restore**: `docker exec -i blog_mysql mysql -u blog_user -psecret blog < backup.sql`

### Uploaded Files (Avatars)
- **Location**: `backend/storage/app/` (mounted volume)
- **Access URL**: `http://localhost:8000/storage/{filename}`
- **Public Path**: Served by Nginx

### Logs
- **Location**: `backend/storage/logs/`
- **View**: `docker compose logs -f backend`
- **Clear**: `docker exec -it blog_backend php artisan cache:clear`

---

## 🔍 Monitoring & Debugging

### View Logs

**All services:**
```bash
docker compose logs -f
```

**Specific service:**
```bash
docker compose logs -f backend
docker compose logs -f mysql
docker compose logs -f redis
docker compose logs -f queue
docker compose logs -f scheduler
docker compose logs -f frontend
```

**Last 50 lines:**
```bash
docker compose logs --tail=50 backend
```

### Container Status

**Check all containers:**
```bash
docker ps
docker ps -a  # including stopped
```

**Container details:**
```bash
docker inspect blog_backend
```

**Resource usage:**
```bash
docker stats
```

### Database Debugging

```bash
# Access MySQL
docker exec -it blog_mysql mysql -u blog_user -psecret blog

# Show tables
SHOW TABLES;

# Show posts
SELECT * FROM posts;

# Show users
SELECT * FROM users;

# Exit
EXIT;
```

### API Debugging

```bash
# Test endpoint
curl -X GET http://localhost:8000/api/posts

# With auth
curl -X GET http://localhost:8000/api/posts \
  -H "Authorization: Bearer {token}"
```

---

## 🚨 Common Issues & Solutions

### Port Already in Use

**Error**: `Address already in use`

**Solution:**
```bash
# Find what's using the port
lsof -i :3000   # Frontend port
lsof -i :8000   # Backend port

# Kill the process
kill -9 <PID>

# Or change ports in docker-compose.yml:
# frontend: ports: - "3001:80"
# nginx: ports: - "8001:80"
```

---

### MySQL Connection Error

**Error**: `SQLSTATE[HY000] [2002] Connection refused`

**Cause**: MySQL not ready yet

**Solution:**
```bash
# Wait for MySQL to start
docker compose up -d
sleep 30

# Then run migrations
docker exec -it blog_backend php artisan migrate
```

---

### Laravel Cache Issues

**Error**: `Class 'Cache' not found`

**Solution:**
```bash
# Clear cache
docker exec -it blog_backend php artisan cache:clear

# Clear config cache
docker exec -it blog_backend php artisan config:clear

# Restart containers
docker compose restart backend
```

---

### Permission Denied Errors

**Error**: `Permission denied while trying to connect to Docker daemon`

**Solution** (Linux):
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker

# Restart Docker
sudo systemctl restart docker
```

---

### Frontend Can't Connect to Backend

**Error**: CORS errors or `Cannot GET /api/posts`

**Cause**: Backend not running or wrong URL

**Solution:**
```bash
# Check backend is running
docker ps | grep backend

# Check backend logs
docker compose logs -f backend

# Verify API URL in frontend code
cat frontend/src/api/posts.js

# Test backend manually
curl http://localhost:8000/api/posts
```

---

### Out of Disk Space

**Error**: `no space left on device`

**Solution:**
```bash
# Check disk usage
docker system df

# Clean up unused images
docker image prune -a

# Clean up unused volumes
docker volume prune

# Clean up all unused resources
docker system prune -a --volumes
```

---

### Database Locked

**Error**: `database is locked`

**Solution:**
```bash
# Restart MySQL
docker restart blog_mysql

# Or perform full reset
docker compose down -v
docker compose up --build
```

---

## 📦 Building for Production

### Production Checklist

- [ ] Set `APP_DEBUG=false` in backend/.env
- [ ] Generate strong `APP_KEY`
- [ ] Configure `JWT_SECRET`
- [ ] Set proper database credentials
- [ ] Configure Redis persistence
- [ ] Enable HTTPS/SSL
- [ ] Set up proper logging
- [ ] Configure environment-specific settings
- [ ] Build with `--no-cache` flag
- [ ] Test thoroughly before deployment

### Build Production Image

```bash
# Build for production
docker compose -f docker-compose.yml build --no-cache

# Test production build locally
docker compose -f docker-compose.yml up

# Push to registry (if using)
docker tag blog_backend myregistry/blog_backend:latest
docker push myregistry/blog_backend:latest
```

---

## 🔄 Docker Compose Commands Reference

### Lifecycle

```bash
# Start containers
docker compose up

# Start in background
docker compose up -d

# Build and start
docker compose up --build

# Stop containers
docker compose stop

# Stop and remove
docker compose down

# Remove with volumes
docker compose down -v

# Restart containers
docker compose restart

# Restart specific service
docker compose restart backend
```

### Debugging

```bash
# View logs
docker compose logs

# Follow logs
docker compose logs -f

# Logs for specific service
docker compose logs -f backend

# Last 100 lines
docker compose logs --tail=100

# Execute command
docker exec -it blog_backend bash

# Run command
docker exec blog_backend php artisan migrate
```

### Container Info

```bash
# List running containers
docker compose ps

# List all containers
docker compose ps -a

# Container processes
docker compose top backend

# Container events
docker compose events

# Service status
docker compose status
```

---

## 🆘 Getting Help

### Check Logs
```bash
# Full logs
docker compose logs -f

# Specific service
docker compose logs -f backend
```

### Verify Setup
```bash
# Check services
docker compose ps

# Check network
docker network ls

# Check volumes
docker volume ls
```

### Reset Everything
```bash
# Complete reset
docker compose down -v
docker builder prune -f
docker compose up --build
```

### Additional Resources

- **Docker Docs**: https://docs.docker.com/
- **Docker Compose**: https://docs.docker.com/compose/
- **Docker Networking**: https://docs.docker.com/network/
- **Docker Volumes**: https://docs.docker.com/storage/volumes/

---

## 📚 Related Documentation

- **Main README**: [README.md](README.md) - Project overview and setup
- **Postman Guide**: [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md) - API testing
- **Backend README**: [backend/README.md](backend/README.md) - Laravel API docs
- **Frontend README**: [frontend/README.md](frontend/README.md) - React app docs

---

## 📄 License

This project is open source and available under the MIT License.

---

Happy containerizing! 🚀
