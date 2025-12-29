#!/bin/sh
set -e

cd /var/www

# Ensure .env exists
if [ ! -f .env ]; then
    echo ".env not found, creating from .env.example"
    cp .env.example .env
fi

# Force Laravel to re-read .env
php artisan config:clear || true
php artisan cache:clear || true

# 🔑 Required secrets
php artisan key:generate --force || true
php artisan jwt:secret --force || true

# Database + storage
php artisan migrate --force || true
php artisan storage:link || true

# Start PHP-FPM
exec php-fpm
