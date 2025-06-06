FROM node:24-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm run build-storybook
RUN ls -la
RUN ls -la run-scripts
RUN chmod +x run-scripts/entrypoint.sh
RUN chmod +x run-scripts/run-storybook.sh
RUN chmod +x run-scripts/run-preview.sh
RUN ls -la
RUN ls -la run-scripts
ENTRYPOINT [".run-scripts/entrypoint.sh"]