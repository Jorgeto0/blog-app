# 📝 Blog Application

A full-stack blog app built with Laravel, React, MySQL & Docker. Create posts, add comments, manage tags. Posts auto-expire after 24 hours.

## ✨ What's Inside

- **Register & Login** - Create account with avatar, login with JWT token
- **Create Posts** - Write posts with title, body, and tags
- **Comments** - Add comments to any post
- **Post Management** - Edit/delete your own posts
- **Auto-Expire** - Posts automatically deleted after 24 hours
- **User Avatars** - Profile pictures everywhere
- **Clean UI** - Simple, responsive design

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Backend**: Laravel 12, PHP 8.4
- **Database**: MySQL 8.4
- **Cache**: Redis 7
- **Docker**: Docker Compose (all-in-one)

---

## 🚀 Start It (2 Minutes)

```bash
# Clone
git clone <repo>
cd blog-app

# Start everything
docker compose up --build

# Wait ~30 seconds for startup, then open:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

**That's it!** App is running.

---

## 🧪 Test It

### In the Browser
1. Go to http://localhost:3000
2. Register a new account
3. Create a post
4. Add a comment
5. Edit/delete your post

### With Postman (API Testing)
1. Open Postman
2. Click **Import** → Select `Laravel Blog API.postman_collection.json`
3. Login endpoint → Get token → Test endpoints

**See [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md) for detailed API examples**

---

## 📡 API Endpoints

```
Base: http://localhost:8000/api

Auth:
  POST   /auth/register       - Create account
  POST   /auth/login          - Login (get token)
  GET    /auth/user           - Current user
  POST   /auth/logout         - Logout

Posts:
  GET    /posts               - All posts
  POST   /posts               - Create post
  GET    /posts/{id}          - Single post
  PUT    /posts/{id}          - Edit post (yours only)
  DELETE /posts/{id}          - Delete post (yours only)

Comments:
  POST   /posts/{id}/comments - Add comment
  PUT    /comments/{id}       - Edit comment (yours only)
  DELETE /comments/{id}       - Delete comment (yours only)

Tags:
  GET    /tags                - All tags
  POST   /posts/{id}/tags     - Update post tags
```

---

## 📁 Project Structure

```
blog-app/
├── backend/           # Laravel API
├── frontend/          # React app
├── docker-compose.yml # Docker setup
└── docker/            # Docker configs
```

---

## 🐛 Troubleshooting

### Can't access localhost:3000
```bash
docker ps  # Check if containers running
docker compose logs frontend  # Check logs
```

### Port already in use
```bash
# Kill the process or change port in docker-compose.yml
```

### MySQL connection error
```bash
# Wait 30 seconds for MySQL to start
# Then run: docker exec -it blog_backend php artisan migrate
```

### Docker won't start
```bash
docker compose down -v
docker builder prune -f
docker compose up --build
```

---

## 🔧 Useful Commands

```bash
# View all logs
docker compose logs -f

# Run backend tests
docker exec -it blog_backend php artisan test

# Access backend shell
docker exec -it blog_backend bash

# Access database
docker exec -it blog_mysql mysql -u blog_user -psecret

# Stop everything
docker compose down

# Clean everything & restart
docker compose down -v && docker compose up --build
```

---

## 📚 Want More Details?

- **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)** - Detailed API endpoint documentation & examples
- **[DOCKER.md](DOCKER.md)** - Docker commands, troubleshooting, monitoring
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to GitHub or production (Heroku/DigitalOcean/AWS)
- **[backend/README.md](backend/README.md)** - Laravel API, testing, scheduling
- **[frontend/README.md](frontend/README.md)** - React app structure, components

---

## 📄 License

MIT License
- Scheduler runs via `php artisan schedule:work` inside Docker

This ensures posts are cleaned up without manual intervention.
## Testing

The project includes automated **Feature tests** to verify:

- User registration and login (JWT authentication)
- Protection of authenticated routes
- Authorization rules via policies (ownership enforcement)

### Test Environment

Tests run against a dedicated MySQL database using `.env.testing`.

Common setup steps:
- Configure valid `APP_KEY` and JWT keys
- Use a separate testing database
- Ensure required model factories exist

### Running Tests

Run tests inside the backend container:

```bash
## API Documentation

The API is documented using a Postman collection.

### How to use
1. Import the collection from `/postman/Laravel_Blog_API.postman_collection.json`
2. Run **Register** or **Login**
3. The JWT token is automatically stored and reused
4. Access protected routes using Bearer authentication

The collection includes examples for:
- Authentication
- CRUD posts with ownership rules
- Comments
- Authorization and error responses




