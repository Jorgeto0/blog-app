# =========================
# Build React
# =========================
FROM node:20-alpine AS build

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund --legacy-peer-deps

COPY frontend .
RUN npm run build


# =========================
# Serve with Nginx
# =========================
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
