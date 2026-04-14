FROM dunglas/frankenphp:php8.5
WORKDIR /app

# install Node.js for asset build (Wayfinder invokes php artisan during vite build)
RUN apt-get update && apt-get install -y --no-install-recommends nodejs npm && \
    rm -rf /var/lib/apt/lists/*

# install PHP extensions needed for Laravel
RUN install-php-extensions \
    pdo_mysql \
    gd \
    intl \
    zip \
    opcache \
    pcntl \
    redis

# copy application code
COPY . .

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# install PHP dependencies (production)
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-progress

# install node dependencies and build assets
RUN npm ci --prefer-offline --no-audit && \
    npm run build && \
    rm -rf node_modules

# set permissions for storage and cache directories
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache && \
    chmod -R 775 /app/storage /app/bootstrap/cache

# set ownership of all app files to www-data
RUN chown -R www-data:www-data /app && chmod -R 755 /app

# copy startup script
COPY scripts/octane-entrypoint.sh /app/scripts/octane-entrypoint.sh
RUN chmod +x /app/scripts/octane-entrypoint.sh

# expose port
EXPOSE 8000

# health check (wait for the application to be ready before starting health checks)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:8000 || exit 1

# use the startup script
ENTRYPOINT ["/app/scripts/octane-entrypoint.sh"]
