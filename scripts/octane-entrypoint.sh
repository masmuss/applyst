#!/usr/bin/env sh
set -eu

if [ -z "${APP_KEY:-}" ]; then
    echo "APP_KEY is required. Set APP_KEY in your environment."
    exit 1
fi

if php artisan list --raw | grep -q '^db:wait'; then
    echo "Waiting for database connection..."
    php artisan db:wait --timeout="${DB_WAIT_TIMEOUT:-60}" || true
fi

echo "Caching configuration..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Caching views..."
php artisan view:cache

echo "Starting Octane with FrankenPHP..."
exec php artisan octane:start \
    --server="${OCTANE_SERVER:-frankenphp}" \
    --host=0.0.0.0 \
    --port="${APP_PORT:-8000}"
