# 🚀 Deployment Guide - GitHub & Production

Complete guide for deploying the Blog Application to GitHub and production environments.

---

## 📝 Submitting to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `blog-app` (or your preferred name)
3. Choose visibility: `Public` (for portfolio) or `Private`
4. **Do NOT** initialize with README, .gitignore, or license (we have these)
5. Click "Create repository"

### Step 2: Initialize Git

```bash
cd blog-app

# Check if git is initialized
git status

# If not initialized, initialize
git init

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/blog-app.git

# Verify
git remote -v
```

### Step 3: Create .gitignore

Create `blog-app/.gitignore`:

```gitignore
# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Backend
backend/vendor/
backend/node_modules/
backend/storage/logs/
backend/storage/cache/
backend/storage/app/uploads/*
backend/bootstrap/cache/*
backend/.env
backend/composer.lock

# Frontend
frontend/node_modules/
frontend/build/
frontend/.env.local
frontend/package-lock.json
frontend/yarn.lock

# Docker
.docker/
docker-compose.override.yml

# System
*.log
Thumbs.db
.vscode/settings.json

# Database backups
*.sql
*.dump
```

```bash
git add .gitignore
git commit -m "Add gitignore"
```

### Step 4: Add & Commit Files

```bash
# Add all files
git add .

# Check what will be committed
git status

# Commit
git commit -m "Initial commit: Blog application with Laravel backend and React frontend"
```

### Step 5: Push to GitHub

```bash
# Create and push to main branch
git branch -M main
git push -u origin main
```

### Step 6: Add GitHub Documentation

Create `.github/README.md` with:

```markdown
# Blog Application 📝

A full-stack blog platform built with Laravel, React, MySQL, and Docker.

## Features
- User authentication with JWT
- Create, read, update, delete posts
- Comments on posts
- User avatars & profiles
- Auto-expiring posts (24-hour lifespan)
- Tag management
- Responsive design

## Tech Stack
- **Backend**: Laravel 12, PHP 8.4
- **Frontend**: React 18
- **Database**: MySQL 8.4
- **Cache**: Redis 7
- **Deployment**: Docker & Docker Compose

## Quick Start

```bash
docker compose up --build
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## Documentation
- [README.md](../README.md) - Project setup and overview
- [POSTMAN_GUIDE.md](../POSTMAN_GUIDE.md) - API testing
- [DOCKER.md](../DOCKER.md) - Docker deployment
- [backend/README.md](../backend/README.md) - Laravel API docs
- [frontend/README.md](../frontend/README.md) - React app docs

## License
MIT License - see LICENSE file
```

### Step 7: Create LICENSE

Create `blog-app/LICENSE`:

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🏗️ Production Deployment

### Option 1: Deploy to Heroku

#### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed

#### Steps

1. **Login to Heroku**
```bash
heroku login
```

2. **Create Heroku apps**
```bash
heroku create your-blog-backend --buildpack heroku/php
heroku create your-blog-frontend --buildpack heroku/nodejs
```

3. **Configure backend**
```bash
# Add PHP buildpack
heroku buildpacks:add --index 1 heroku/php -a your-blog-backend

# Set environment variables
heroku config:set APP_DEBUG=false -a your-blog-backend
heroku config:set APP_KEY=base64:... -a your-blog-backend
heroku config:set JWT_SECRET=... -a your-blog-backend

# Add MySQL (ClearDB addon)
heroku addons:create cleardb:ignite -a your-blog-backend

# Deploy backend
git subtree push --prefix backend heroku main
```

4. **Configure frontend**
```bash
# Set API URL
heroku config:set REACT_APP_API_URL=https://your-blog-backend.herokuapp.com/api -a your-blog-frontend

# Deploy frontend
git subtree push --prefix frontend heroku main
```

---

### Option 2: Deploy to DigitalOcean (Recommended for Production)

#### Prerequisites
- DigitalOcean account
- Droplet with Ubuntu 22.04
- Domain name (optional but recommended)

#### Setup Droplet

1. **Create Droplet**
   - Image: Ubuntu 22.04 x64
   - Size: $5-12/month recommended
   - Region: Closest to users

2. **Connect via SSH**
```bash
ssh root@your_droplet_ip
```

3. **Install Docker**
```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
usermod -aG docker $USER
```

4. **Clone Repository**
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/blog-app.git
cd blog-app
```

5. **Configure Environment**
```bash
# Create backend .env
cp backend/.env.example backend/.env

# Edit with strong values
nano backend/.env

# Example:
# APP_DEBUG=false
# APP_KEY=base64:...
# DB_PASSWORD=strong_password_here
# JWT_SECRET=random_secret_here
```

6. **Start Application**
```bash
# Create production docker-compose file
cp docker-compose.yml docker-compose.prod.yml

# Edit for production (update ports, settings)
nano docker-compose.prod.yml

# Start services
docker compose -f docker-compose.prod.yml up -d

# Run migrations
docker exec blog_backend php artisan migrate --force
```

7. **Setup Nginx Reverse Proxy**
```bash
# Install Nginx
apt install nginx -y

# Create config
nano /etc/nginx/sites-available/blog

# Add configuration:
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/

# Test config
nginx -t

# Restart Nginx
systemctl restart nginx
```

8. **Setup SSL (Let's Encrypt)**
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Generate certificate
certbot --nginx -d your-domain.com -d www.your-domain.com -d api.your-domain.com

# Auto-renewal setup
systemctl enable certbot.timer
systemctl start certbot.timer
```

9. **Setup Monitoring**
```bash
# View Docker logs
docker compose -f docker-compose.prod.yml logs -f backend

# Monitor resources
docker stats

# Set up auto-restart
systemctl enable docker
```

---

### Option 3: Deploy to AWS EC2

#### Prerequisites
- AWS account
- EC2 instance (t3.micro eligible for free tier)
- Security group configured (ports 22, 80, 443)

#### Steps

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04 LTS
   - Instance type: t3.small (free tier) or larger
   - Key pair: Create and download `.pem` file

2. **Connect to Instance**
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-instance-public-ip
```

3. **Install Docker** (same as DigitalOcean step 3)

4. **Deploy Application** (same as DigitalOcean steps 4-9)

5. **Setup Auto-Scaling** (optional, advanced)
   - Use AWS Auto Scaling Groups
   - Load Balancer for distribution
   - CloudWatch for monitoring

---

## 🔒 Production Security Checklist

### Environment
- [ ] `APP_DEBUG=false`
- [ ] `APP_ENV=production`
- [ ] Strong `APP_KEY` generated
- [ ] Unique `JWT_SECRET` configured
- [ ] Strong database password
- [ ] Redis password configured
- [ ] HTTPS/SSL enabled

### Database
- [ ] Regular automated backups
- [ ] Database user with minimal privileges
- [ ] Connections restricted to application only
- [ ] SQL injection prevention (using Eloquent ORM)

### Application
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens enabled

### Infrastructure
- [ ] Firewall configured (ufw)
- [ ] SSH key-based authentication only
- [ ] Regular security updates
- [ ] Monitoring and alerting enabled
- [ ] Logs aggregation setup
- [ ] DDoS protection (CloudFlare optional)

### Backups
- [ ] Daily database backups
- [ ] Backup verification tested
- [ ] Off-site backup storage
- [ ] Recovery procedure documented

---

## 📊 Monitoring & Maintenance

### Health Checks

```bash
# Check API health
curl https://api.your-domain.com/api/posts

# Check frontend availability
curl -I https://your-domain.com

# Monitor logs
docker compose logs -f backend | tail -20

# Check disk space
df -h

# Check memory
free -h

# Check running processes
docker ps
```

### Scaling Considerations

**Vertical Scaling** (increase server resources):
```bash
# Upgrade EC2/Droplet instance size
# Increase RAM and CPU
# Increase database capacity
```

**Horizontal Scaling** (multiple servers):
```bash
# Setup load balancer
# Deploy to multiple instances
# Use managed database service
# Use CDN for static assets
```

### Database Maintenance

```bash
# Backup database
docker exec blog_mysql mysqldump -u blog_user -p blog > backup_$(date +%Y%m%d).sql

# Check database size
docker exec blog_mysql mysql -u blog_user -p -e "SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) as size FROM information_schema.TABLES WHERE table_schema = 'blog' ORDER BY (data_length + index_length) DESC;"

# Optimize tables
docker exec blog_mysql mysql -u blog_user -p -e "OPTIMIZE TABLE users, posts, comments, tags, post_tag;"
```

---

## 🚨 Troubleshooting Production Issues

### High CPU Usage
```bash
# Check running processes
docker stats

# Check slow queries
docker exec blog_backend php artisan tinker
# DB::enableQueryLog();
# // run commands
# dd(DB::getQueryLog());
```

### Database Connection Errors
```bash
# Check MySQL logs
docker logs blog_mysql

# Restart MySQL
docker restart blog_mysql

# Check connection pool
# Increase max_connections in MySQL config
```

### Memory Leaks
```bash
# Monitor memory usage
docker stats --no-stream

# Check Laravel cache
docker exec blog_backend php artisan cache:clear

# Restart PHP-FPM
docker restart blog_backend
```

### Storage Issues
```bash
# Check disk usage
df -h

# Clean Docker cache
docker system prune

# Remove old logs
docker exec blog_backend rm -rf storage/logs/laravel.log*
```

---

## 📚 Related Documentation

- **Main README**: [README.md](README.md)
- **Docker Guide**: [DOCKER.md](DOCKER.md)
- **Postman Guide**: [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)
- **Backend README**: [backend/README.md](backend/README.md)
- **Frontend README**: [frontend/README.md](frontend/README.md)

---

## 📄 License

This project is open source and available under the MIT License.

---

**Questions? Check the main README or specific service documentation!** 🚀
