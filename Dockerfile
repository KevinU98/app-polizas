# Etapa de construcción
FROM node:18-alpine AS build

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias de Angular
RUN npm install -g @angular/cli@latest

# Instala las dependencias con la opción --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copia todo el código de la aplicación al contenedor
COPY . .

# Construye la aplicación para producción
RUN ng build --configuration production

# Etapa de producción
FROM nginx:alpine


COPY --from=build /app/dist/* /usr/share/nginx/html/
# Copy the nginx file to fix fallback issue on refreshing.
#COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto que usa Nginx
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
