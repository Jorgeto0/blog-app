# 🚀 Blog API - Backend (Laravel)

The RESTful API backend for the Blog Application built with **Laravel 12** and **PHP 8.4**.

## 📋 Overview

This is a fully functional blog API with:
- User authentication (JWT-based)
- Post CRUD operations with auto-expiration
- Comments management
- Tags & relationships
- Automatic post deletion after 24 hours
- Authorization policies for data ownership
- Comprehensive test coverage

---

## 🛠️ Tech Stack

- **Laravel**: 12.x
- **PHP**: 8.4
- **Database**: MySQL 8.4
- **Cache/Queue**: Redis 7
- **Authentication**: JWT (Tymon/JWT-Auth)
- **Testing**: PHPUnit
- **Container**: Docker

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php    # Login, Register, Logout
│   │   │   ├── PostController.php    # Post CRUD
│   │   │   ├── CommentController.php # Comments CRUD
│   │   │   └── TagController.php     # Tags management
│   │   └── Resources/
│   │       ├── PostResource.php      # JSON serialization
│   │       └── CommentResource.php
│   ├── Models/
│   │   ├── User.php                  # User model with relationships
│   │   ├── Post.php                  # Post model with tags & comments
│   │   ├── Comment.php               # Comment model
│   │   └── Tag.php                   # Tag model
│   ├── Policies/
│   │   ├── PostPolicy.php            # Authorization for posts
│   │   └── CommentPolicy.php         # Authorization for comments
│   └── Console/
│       └── Commands/
│           └── DeleteExpiredPosts.php # Scheduled task for expiration
│
├── database/
│   ├── migrations/
│   │   ├── create_users_table.php
│   │   ├── create_posts_table.php
│   │   ├── create_tags_table.php
│   │   ├── create_post_tag_table.php (pivot/junction)
│   │   └── create_comments_table.php
│   ├── factories/
│   │   ├── PostFactory.php           # Test data generation
│   │   └── UserFactory.php
│   └── seeders/
│       └── DatabaseSeeder.php        # Sample data
│
├── routes/
│   └── api.php                       # API route definitions
│
├── tests/
│   ├── Feature/
│   │   ├── AuthTest.php              # Authentication tests
│   │   ├── PostTest.php              # Post CRUD tests
│   │   └── CommentTest.php           # Comment tests
│   └── Unit/
│       └── UserTest.php
│
└── config/
    ├── jwt.php                       # JWT configuration
    ├── auth.php                      # Auth configuration
    └── ... (other configs)
```

---

## 🚀 Quick Start

### Running via Docker (Recommended)

From project root:
```bash
docker compose up --build
```

Backend API will be available at: `http://localhost:8000/api`

### Running Locally (Manual Setup)

1. **Install dependencies**
   ```bash
   cd backend
   composer install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

4. **Generate JWT secret**
   ```bash
   php artisan jwt:secret
   ```

5. **Start development server**
   ```bash
   php artisan serve
   ```

---

## 🔐 Authentication

### JWT Token Flow

1. User registers via `POST /api/auth/register`
2. Token returned in response
3. Frontend stores token in localStorage
4. For authenticated requests, include header:
   ```
   Authorization: Bearer {token}
   ```

### Protected Routes

All routes except `/auth/register`, `/auth/login`, and `GET /posts` require authentication.

---

## 📚 API Endpoints

### Base URL
```
http://localhost:8000/api
```

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout (requires auth)
- `GET /auth/user` - Get current user (requires auth)

### Posts
- `GET /posts` - List all posts (paginated)
- `POST /posts` - Create post (requires auth)
- `GET /posts/{id}` - Get single post
- `PUT /posts/{id}` - Update post (requires auth + ownership)
- `DELETE /posts/{id}` - Delete post (requires auth + ownership)

### Comments
- `POST /posts/{post_id}/comments` - Add comment (requires auth)
- `PUT /comments/{id}` - Update comment (requires auth + ownership)
- `DELETE /comments/{id}` - Delete comment (requires auth + ownership)

### Tags
- `GET /tags` - List all tags
- `POST /posts/{post_id}/tags` - Update post tags (requires auth + ownership)

**See [POSTMAN_GUIDE.md](../POSTMAN_GUIDE.md) for detailed endpoint documentation and examples.**

---

## 🧪 Testing

### Run All Tests
```bash
# Via Docker
docker exec -it blog_backend php artisan test

# Locally
php artisan test
```

### Run Specific Test File
```bash
php artisan test tests/Feature/AuthTest.php
php artisan test tests/Feature/PostTest.php
php artisan test tests/Feature/CommentTest.php
```

### Test Coverage
```bash
php artisan test --coverage
```

### Test Files Included

**AuthTest.php**
- ✅ User registration (happy path)
- ✅ User login with valid credentials
- ✅ Login with invalid credentials
- ✅ Get authenticated user info
- ✅ Logout functionality

**PostTest.php**
- ✅ Create post (authenticated user)
- ✅ Get all posts (paginated)
- ✅ Get single post with comments
- ✅ Update own post
- ✅ Cannot update other's post (403)
- ✅ Delete own post
- ✅ Cannot delete other's post (403)
- ✅ Post expires after 24 hours

**CommentTest.php**
- ✅ Add comment to post
- ✅ Update own comment
- ✅ Cannot update other's comment (403)
- ✅ Delete own comment
- ✅ Cannot delete other's comment (403)

### Test Database

Tests use a separate in-memory SQLite database:
- Isolated from production data
- Auto-rolled back after each test
- Fast execution
- No side effects

---

## ⏰ Post Expiration System

### How It Works

1. **Post Creation**
   - When post is created, `expires_at` is set to current time + 24 hours
   - Frontend displays countdown timer

2. **Scheduled Deletion**
   - Laravel Scheduler runs continuously (via `scheduler` service)
   - Every minute, `DeleteExpiredPosts` command checks for expired posts
   - Posts where `expires_at <= now()` are soft-deleted

3. **Soft Deletes**
   - Posts marked with `deleted_at` timestamp
   - Not permanently removed (can be recovered)
   - `GET /posts` excludes deleted posts

### Commands

```bash
# Run scheduler
docker exec -it blog_backend php artisan schedule:work

# Check scheduled commands
docker exec -it blog_backend php artisan schedule:list

# Manually delete expired posts
docker exec -it blog_backend php artisan posts:delete-expired
```

---

## 🔒 Authorization Policies

### PostPolicy
- Users can only **update** their own posts
- Users can only **delete** their own posts
- Anyone can **view** posts
- Only authenticated users can **create** posts

### CommentPolicy
- Users can only **update** their own comments
- Users can only **delete** their own comments
- Anyone can **view** comments
- Only authenticated users can **create** comments

**Implementation**: `app/Policies/` directory

---

## 💾 Database Schema

### users
```sql
id | name | email | password | image | created_at | updated_at
```

### posts
```sql
id | user_id | title | body | expires_at | created_at | updated_at | deleted_at
```

**Relationships**:
- Belongs to User (author)
- Has many Comments
- Has many Tags (through post_tag)

### comments
```sql
id | post_id | user_id | content | created_at | updated_at
```

**Relationships**:
- Belongs to Post
- Belongs to User (author)

### tags
```sql
id | name | created_at | updated_at
```

**Relationships**:
- Many to Many with Posts (through post_tag)

### post_tag (Pivot Table)
```sql
post_id | tag_id
```

---

## 📝 Models & Relationships

### User Model
```php
// Relationships
public function posts() // One-to-Many
public function comments() // One-to-Many

// Methods
public function ownPost($post) // Check ownership
public function ownComment($comment) // Check ownership
```

### Post Model
```php
// Relationships
public function user() // Belongs to User
public function comments() // Has many Comments
public function tags() // Many-to-Many with Tags

// Methods
public function isExpired() // Check if expires_at <= now()
public function syncTags($tagNames) // Update post tags
```

### Comment Model
```php
// Relationships
public function post() // Belongs to Post
public function user() // Belongs to User (author)
```

### Tag Model
```php
// Relationships
public function posts() // Many-to-Many with Posts
```

---

## ⚙️ Configuration

### Environment Variables

**Database**
```
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=blog
DB_USERNAME=blog_user
DB_PASSWORD=secret
```

**JWT**
```
JWT_ALGORITHM=HS256
JWT_EXPIRATION_TIME=3600
```

**Queue & Cache**
```
QUEUE_CONNECTION=redis
CACHE_DRIVER=redis
REDIS_HOST=redis
REDIS_PORT=6379
```

**Mail** (optional)
```
MAIL_FROM_ADDRESS=noreply@blog.local
MAIL_FROM_NAME="Blog Application"
```

---

## 🔧 Useful Commands

### Database
```bash
# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Fresh migration (warning: drops all data)
php artisan migrate:fresh

# Seed database
php artisan db:seed

# Fresh migrate + seed
php artisan migrate:fresh --seed
```

### Cache & Queue
```bash
# Clear all cache
php artisan cache:clear

# Clear config cache
php artisan config:clear

# Work queue jobs
php artisan queue:work

# Monitor queued jobs
php artisan queue:monitor
```

### Development
```bash
# List all routes
php artisan route:list

# Tinker (REPL for testing)
php artisan tinker

# Show scheduled tasks
php artisan schedule:list

# Test JWT token
php artisan jwt:secret
```

### Testing
```bash
# Run tests with verbose output
php artisan test --verbose

# Run specific test class
php artisan test tests/Feature/PostTest.php

# Test with code coverage report
php artisan test --coverage --min=80
```

---

## 📊 File Upload (Avatar)

### Upload Location
```
storage/app/uploads/avatars/
```

### Access URL
```
http://localhost:8000/storage/uploads/avatars/{filename}
```

### Implementation
- User uploads image during registration
- Stored locally in Laravel storage
- Default avatar provided as fallback
- Frontend handles missing images gracefully

---

## 🐛 Debugging

### Enable Debug Mode
In `.env`:
```
APP_DEBUG=true
```

### View Logs
```bash
tail -f storage/logs/laravel.log
```

### Database Query Debugging
```bash
# In tinker:
DB::enableQueryLog();
// ... run queries ...
dd(DB::getQueryLog());
```

### API Errors
All API errors return JSON:
```json
{
  "message": "Error description",
  "errors": {
    "field": ["error message"]
  }
}
```

---

## 🚀 Deployment Considerations

### Production Checklist
- [ ] Set `APP_DEBUG=false`
- [ ] Generate strong `APP_KEY`
- [ ] Configure `JWT_SECRET`
- [ ] Use environment-specific `.env` files
- [ ] Set up proper MySQL backups
- [ ] Configure Redis persistence
- [ ] Enable HTTPS/SSL
- [ ] Set up proper logging
- [ ] Configure proper CORS headers
- [ ] Rate limit API endpoints

### Performance Tips
- Use database indexing (already done on foreign keys)
- Cache frequently accessed data
- Use pagination for large datasets
- Optimize Eloquent queries (use `with()`, `load()`)
- Monitor queue worker performance

---

## 📚 Resources

- **Laravel Docs**: https://laravel.com/docs
- **Laravel Testing**: https://laravel.com/docs/testing
- **Laravel Eloquent**: https://laravel.com/docs/eloquent
- **JWT-Auth**: https://github.com/tymondesigns/jwt-auth
- **MySQL Docs**: https://dev.mysql.com/doc/

---

## 🆘 Troubleshooting

### "SQLSTATE Connection Error"
```bash
# Wait for MySQL to start, then run:
docker compose up -d
docker exec -it blog_backend php artisan migrate
```

### "Unauthorized" on Protected Routes
- Missing `Authorization` header
- Token expired or malformed
- Wrong token format (must be `Bearer {token}`)

### "Class not found" Error
```bash
# Regenerate class loader:
composer dump-autoload
```

### "Queue jobs not processing"
```bash
# Check if queue worker is running:
docker ps | grep queue

# Restart queue worker:
docker restart blog_queue
```

---

## 👨‍💻 Development Workflow

1. **Create new feature**
   - Create migration: `php artisan make:migration`
   - Create model: `php artisan make:model`
   - Create controller: `php artisan make:controller`

2. **Write tests first** (TDD approach)
   - Create test: `php artisan make:test FeatureTest --feature`
   - Write test cases
   - Run: `php artisan test`

3. **Implement feature**
   - Write controller logic
   - Update routes
   - Ensure tests pass

4. **Commit & deploy**
   - Git commit changes
   - Push to repository
   - Deploy with Docker

---

## 📄 License

This project is open source and available under the MIT License.

---

**For API endpoint details, see [POSTMAN_GUIDE.md](../POSTMAN_GUIDE.md)**

**For project overview, see [README.md](../README.md)**
