FROM node:25-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run build-storybook

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --chmod=644 <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 4173;
    server_name localhost;
    root /usr/share/nginx/html/app;
    index index.html;

    # Enable Gzip compression (replaces --gzip flag)
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Handle React Client-Side Routing (SPA)
    # If a file isn't found, serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 8080;
    server_name localhost;
    root /usr/share/nginx/html/storybook;
    index index.html;
    gzip on;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
COPY --from=builder /app/dist /usr/share/nginx/html/app
COPY --from=builder /app/storybook-static /usr/share/nginx/html/storybook
EXPOSE 4173 8080
CMD ["nginx", "-g", "daemon off;"]