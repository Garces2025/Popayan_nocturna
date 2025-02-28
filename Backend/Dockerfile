# Usa una imagen oficial de PHP con FPM
FROM php:8.1-fpm

# Instala dependencias básicas y extensiones necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo
WORKDIR /var/www

# Copia los archivos de Composer y luego instala las dependencias
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copia el resto del código de la aplicación
COPY . .

# Ajusta permisos (según sea necesario)
RUN chown -R www-data:www-data /var/www

# Expone el puerto 80
EXPOSE 80

# Inicia PHP-FPM
CMD ["php-fpm"]
