# Blog Application

A full-stack blog application built with:

- Laravel 12 (RESTful API)
- PHP 8.4
- React (frontend)
- MySQL (database)
- Redis (queues & scheduling)
- Docker Compose (local development & deployment)

## Architecture (in progress)

- Backend: Laravel API running on PHP-FPM inside Docker
- Frontend: React SPA (Dockerized later)
- Database: MySQL (Dockerized later)
- Queue & Scheduler: Laravel Queue Worker + Redis (Dockerized later)

## Current Status

- Project structure initialized
- Laravel backend created
- Backend Docker container (PHP 8.4-FPM) configured

### Docker Notes

- Laravel runs inside a PHP 8.4 FPM container
- Containers use a non-root user (UID 1000) to avoid WSL permission issues
- Nginx serves Laravel via PHP-FPM

> This project is being built step-by-step with production-grade architecture.

- Redis is used for Laravel queues and scheduled background jobs
- A dedicated scheduler container runs Laravel scheduled tasks
- JWT authentication infrastructure configured
- User model prepared for JWT authentication
- User registration and login endpoints implemented (JWT-based)
- Post model and database schema created with expiration support
- Tags model and post_tag pivot table created (many-to-many)
- Comments model created with post and author relationships
- Post CRUD endpoints implemented with tag enforcement and expiration
- Authorization policies implemented for post ownership (update/delete)
- Comments CRUD implemented with ownership enforcement via policies
## Scheduled Jobs

Expired posts are automatically deleted using Laravel Scheduler.

- Command: `posts:delete-expired`
- Frequency: hourly
- Logic: deletes posts where `expires_at <= now()`
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




