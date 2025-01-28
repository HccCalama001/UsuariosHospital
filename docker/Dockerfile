# --------------------------------------------------------------------
# Dockerfile para Laravel + PHP 7.4 + Apache + SQL Server drivers
# --------------------------------------------------------------------
FROM php:7.4-apache

# Evita prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# --------------------------------------------------------------------
# 1. Forzar uso de HTTPS en mirrors de Debian
# --------------------------------------------------------------------
RUN sed -i 's|http://deb.debian.org/|https://deb.debian.org/|g; s|http://security.debian.org/|https://security.debian.org/|g' /etc/apt/sources.list

# --------------------------------------------------------------------
# 2. Instalar paquetes base, repos Microsoft y msodbcsql17
# --------------------------------------------------------------------
RUN apt-get update && apt-get install -y \
    gnupg2 apt-transport-https ca-certificates lsb-release curl wget nano telnet iputils-ping \
    software-properties-common \
    libzip-dev libonig-dev libxml2-dev unixodbc-dev zlib1g-dev \
    libtool libltdl-dev \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# --------------------------------------------------------------------
# 3. Eliminar archivos *.la para evitar errores con libtool
# --------------------------------------------------------------------
RUN find /usr/lib/x86_64-linux-gnu -name '*.la' -delete || true

# --------------------------------------------------------------------
# 4. Instalar y habilitar extensiones sqlsrv/pdo_sqlsrv (5.9.0 para PHP 7.4)
# --------------------------------------------------------------------
RUN pecl channel-update pecl.php.net \
    && pecl install sqlsrv-5.9.0 pdo_sqlsrv-5.9.0 \
    && docker-php-ext-enable sqlsrv pdo_sqlsrv

# --------------------------------------------------------------------
# 5. Instalar extensiones PHP comunes (ej. zip)
# --------------------------------------------------------------------
RUN docker-php-ext-install zip

# --------------------------------------------------------------------
# 6. Ajustar DocumentRoot y habilitar .htaccess (Laravel)
# --------------------------------------------------------------------
RUN a2enmod rewrite
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf
RUN sed -ri -e 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# --------------------------------------------------------------------
# 7. Instalar Composer (copiando desde la imagen oficial composer:latest)
# --------------------------------------------------------------------
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# --------------------------------------------------------------------
# 8. Copiar el proyecto Laravel en /var/www/html
# --------------------------------------------------------------------
WORKDIR /var/www/html
COPY . /var/www/html

# --------------------------------------------------------------------
# 9. Instalar dependencias de Laravel (composer install)
# --------------------------------------------------------------------

RUN composer require predis/predis \
&& composer install --no-dev --optimize-autoloader

# --------------------------------------------------------------------
# 10. Ajustar permisos para www-data (requisito de Laravel)
# --------------------------------------------------------------------
RUN chown -R www-data:www-data /var/www/html \
 && find /var/www/html -type d -exec chmod 755 {} \; \
 && find /var/www/html -type f -exec chmod 644 {} \;

# --------------------------------------------------------------------
# 11. Exponer puerto 80 y ejecutar Apache en primer plano
# --------------------------------------------------------------------
EXPOSE 80
CMD ["apache2-foreground"]