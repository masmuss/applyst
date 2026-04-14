# Docker Deployment

This guide explains how to build and run this Laravel application with Octane + FrankenPHP using Docker.

## Image Build

```bash
docker build -t applyst:latest .
```

If you want to force a clean build:

```bash
docker build --no-cache -t applyst:latest .
```

## Running with `docker run`

The simplest approach is to use a dedicated production environment file.

```bash
docker run -d \
  --name applyst \
  -p 8000:8000 \
  --env-file .env.production \
  applyst:latest
```

If you want to add volumes for application data:

```bash
docker run -d \
  --name applyst \
  -p 8000:8000 \
  --env-file .env.production \
  -v applyst_storage:/app/storage \
  -v applyst_cache:/app/bootstrap/cache \
  applyst:latest
```

## Running with Docker Compose

Example `compose.yml` for the app, MySQL, and Redis:

```yaml
services:
    app:
        image: applyst:latest
        container_name: applyst
        ports:
            - '8000:8000'
        env_file:
            - .env.production
        volumes:
            - applyst_storage:/app/storage
            - applyst_cache:/app/bootstrap/cache
        depends_on:
            - mysql
            - redis
        restart: unless-stopped

    mysql:
        image: mysql:8.4
        container_name: applyst-mysql
        environment:
            MYSQL_DATABASE: applyst
            MYSQL_USER: applyst
            MYSQL_PASSWORD: secret-password
            MYSQL_ROOT_PASSWORD: root-password
        volumes:
            - mysql_data:/var/lib/mysql
        restart: unless-stopped

    redis:
        image: redis:7-alpine
        container_name: applyst-redis
        command: redis-server --appendonly yes
        volumes:
            - redis_data:/data
        restart: unless-stopped

volumes:
    applyst_storage:
    applyst_cache:
    mysql_data:
    redis_data:
```

Run it with:

```bash
docker compose up -d
```

After the container is running, execute migrations if needed:

```bash
docker compose exec app php artisan migrate --force
```

## Required Environment Variables

Minimum for production:

```env
APP_NAME=Applyst
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain-anda.com
APP_KEY=base64:...hasil_generate...

OCTANE_SERVER=frankenphp
OCTANE_HTTPS=true

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=applyst
DB_USERNAME=applyst
DB_PASSWORD=secret-password

CACHE_STORE=redis
SESSION_DRIVER=database
QUEUE_CONNECTION=database

REDIS_CLIENT=phpredis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

LOG_CHANNEL=stack
LOG_LEVEL=warning
```

### Common Additional Environment Variables

Depending on your deployment needs, you may also want to add:

```env
MAIL_MAILER=smtp
MAIL_HOST=mail.example.com
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=no-reply@example.com
MAIL_FROM_NAME="Applyst"

FILESYSTEM_DISK=public
SESSION_DOMAIN=.domain-anda.com
```

## Generate `APP_KEY`

`APP_KEY` should be generated once and stored in your production environment.

### macOS / Linux

If PHP and Composer are installed locally:

```bash
php artisan key:generate --show
```

The output will look like this:

```bash
base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=
```

Copy that value into `APP_KEY`.

### Windows PowerShell

If PHP is available in your PATH:

```powershell
php artisan key:generate --show
```

### If PHP is not installed locally

You can generate it through Docker as well:

```bash
docker run --rm -it \
  -v "$PWD":/app \
  -w /app \
  dunglas/frankenphp:php8.5 \
  php artisan key:generate --show
```

If you are using PowerShell on Windows, adjust the volume syntax to match your shell.

## Recommended Deployment Steps

1. Build the image.
2. Prepare `.env.production` with all variables listed above.
3. Make sure `APP_KEY` is set.
4. Start the container with `docker run` or `docker compose`.
5. Run database migrations.
6. Check the application endpoint and healthcheck.

## Important Notes

- For Octane + FrankenPHP, use `OCTANE_SERVER=frankenphp`.
- If the application is behind an HTTPS reverse proxy, set `OCTANE_HTTPS=true`.
- Do not commit `.env.production` to the repository.
- If you use Redis, make sure the PHP `redis` extension is available in the image.
- If you still use session/database cache, make sure the related tables have been migrated.

## Troubleshooting

### Container fails to start because of `APP_KEY`

Make sure `APP_KEY` is present in the environment.

### Assets do not appear

Make sure the image is rebuilt after frontend changes:

```bash
docker build -t applyst:latest .
```

### Database is not ready yet

Make sure the database service is running and `DB_HOST` points to the correct service hostname.

### Application error logs

View the container logs:

```bash
docker logs -f applyst
```
