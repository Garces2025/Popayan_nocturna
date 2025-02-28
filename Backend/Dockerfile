# Usa una imagen oficial de PHP con FPM
FROM php:8.1-fpm

# Instala extensiones y dependencias necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git

# Instala Composer (copia desde la imagen oficial de Composer)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo
WORKDIR /var/www

# Copia los archivos de Composer y luego instala las dependencias
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copia el resto del código de la aplicación
COPY . .

# (Opcional) Ajusta permisos para que PHP-FPM pueda escribir en los directorios necesarios
RUN chown -R www-data:www-data /var/www

# Expone el puerto 80 (o el que vayas a usar)
EXPOSE 80

# Ejecuta PHP-FPM al iniciar el contenedor
CMD ["php-fpm"]
