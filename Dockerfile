FROM node:24-alpine
WORKDIR /app
RUN npm install -g bun
COPY package.json .
RUN bun install
COPY . .
RUN bun run build
RUN bun run build-storybook
RUN chmod +x run-scripts/entrypoint.sh
RUN chmod +x run-scripts/preview.sh
RUN chmod +x run-scripts/preview-storybook.sh
ENTRYPOINT ["/bin/sh", "run-scripts/entrypoint.sh"]
#ENTRYPOINT [ "bun", "run", "preview" ]
#ENTRYPOINT [ "bun", "run", "preview-storybook" ]