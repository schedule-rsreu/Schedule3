ARG NGINX_IMAGE=ghcr.io/schedule-rsreu/nginx:996de2b7726a1a758b8d7e5e16c6532437b76ca1
FROM node:26-alpine3.24 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci && npm audit --audit-level=low

COPY . .
RUN npm test && npm run lint && npm run build

FROM ${NGINX_IMAGE}

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
