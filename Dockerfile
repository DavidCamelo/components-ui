FROM node:25-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run build-storybook

FROM node:25-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/storybook-static ./storybook-static
COPY --chmod=755 <<EOF /app/entrypoint.sh
#!/bin/sh
http-server dist --port 4173 --cors --gzip &
http-server storybook-static --port 8080 --cors --gzip
EOF

EXPOSE 4173 8080
ENTRYPOINT ["/app/entrypoint.sh"]