FROM dunglas/frankenphp:php8.5 AS build
WORKDIR /app

# install PHP extensions and Node.js for build tooling
RUN install-php-extensions \
    pdo_mysql \
    gd \
    intl \
    zip \
    opcache \
    pcntl \
    redis
RUN apt-get update && apt-get install -y --no-install-recommends nodejs npm && \
    rm -rf /var/lib/apt/lists/*

# copy source code
COPY . .

# install composer and production dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-progress

# build frontend assets (Wayfinder runs via php artisan during build)
RUN npm ci --prefer-offline --no-audit && \
    npm run build

FROM dunglas/frankenphp:php8.5 AS runtime
WORKDIR /app

# install only runtime PHP extensions
RUN install-php-extensions \
    pdo_mysql \
    gd \
    intl \
    zip \
    opcache \
    pcntl \
    redis

# copy only runtime files and built artifacts
COPY --from=build /app/app ./app
COPY --from=build /app/bootstrap ./bootstrap
COPY --from=build /app/config ./config
COPY --from=build /app/database ./database
COPY --from=build /app/public ./public
COPY --from=build /app/resources/views ./resources/views
COPY --from=build /app/routes ./routes
COPY --from=build /app/storage ./storage
COPY --from=build /app/vendor ./vendor
COPY --from=build /app/scripts ./scripts
COPY --from=build /app/artisan ./artisan
COPY --from=build /app/composer.json ./composer.json
COPY --from=build /app/composer.lock ./composer.lock
COPY --from=build /app/public/build ./public/build

# set permissions
RUN chown -R www-data:www-data /app && \
    chmod -R 755 /app && \
    chmod -R 775 /app/storage /app/bootstrap/cache

# startup script
RUN chmod +x /app/scripts/octane-entrypoint.sh

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -fsS http://localhost:8000/up || exit 1

USER www-data

ENTRYPOINT ["/app/scripts/octane-entrypoint.sh"]
