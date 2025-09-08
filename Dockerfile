FROM node:24-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm run build-storybook
RUN rm -rf node_modules
RUN chmod +x run-scripts/entrypoint.sh
RUN chmod +x run-scripts/run-preview.sh
RUN chmod +x run-scripts/run-storybook.sh
ENTRYPOINT ["/bin/sh", "run-scripts/entrypoint.sh"]
#ENTRYPOINT [ "npm", "run", "preview" ]
#ENTRYPOINT [ "npx", "http-server", "storybook-static", "--cors", "--gzip" ]