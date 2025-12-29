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

### Option 1: Test in Browser (Easy)
1. Go to **http://localhost:3000**
2. Register new account
3. Create a post with title, body, tags
4. Add a comment
5. Edit/delete your post
6. ✅ Everything works!

### Option 2: Test with Postman (API Testing)
1. Open **Postman**
2. Click **Import** → Select **`Laravel Blog API.postman_collection.json`**
3. Send **POST /auth/register** → Get token
4. Test endpoints (token auto-used)

👉 **See [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md) for detailed API guide**

### Option 3: Run Automated Tests (Development)

**First time only - create test database:**
```bash
docker compose exec backend php artisan migrate --env=testing
```
This creates tables in `blog_testing` database for testing.

**Then run tests anytime:**
```bash
docker compose exec backend php artisan test
```

Laravel automatically:
- ✅ Uses `.env.testing` configuration
- ✅ Refreshes test database
- ✅ Runs all Feature tests
- ✅ Shows pass/fail results

**Example output:**
```
PASS  Tests\Feature\AuthTest
PASS  Tests\Feature\PostTest
PASS  Tests\Feature\CommentTest

Tests: 12 passed
Time: 1.34s
```

If a test fails, you see exactly what broke and why.

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

### Tests fail with connection error
```bash
# Make sure you ran the test migration first
docker compose exec backend php artisan migrate --env=testing
```

---

## 🔧 Useful Commands

```bash
# View all logs
docker compose logs -f

# Run feature tests
docker compose exec backend php artisan test

# Run test with specific test name
docker compose exec backend php artisan test --filter=AuthTest

# Access backend shell
docker exec -it blog_backend bash

# Access database
docker exec -it blog_mysql mysql -u blog_user -psecret

# Stop everything
docker compose down

# Clean everything & restart fresh
docker compose down -v && docker compose up --build
```

---

## 📚 Want More Details?

- **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)** - API examples, testing scenarios, status codes
- **[backend/README.md](backend/README.md)** - Laravel code structure, models, migrations
- **[frontend/README.md](frontend/README.md)** - React structure, components, routing

---

## 📄 License

MIT License




