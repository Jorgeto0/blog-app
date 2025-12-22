FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev

RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Create a non-root user with UID 1000 (matches WSL user)
RUN groupadd -g 1000 laravel \
 && useradd -u 1000 -g laravel -m laravel

# Give ownership of the app directory
RUN chown -R laravel:laravel /var/www

# Switch to the non-root user
USER laravel
