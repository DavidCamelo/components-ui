FROM node:24-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm run build-storybook
RUN chmod +x run-scripts/entrypoint.sh
RUN chmod +x run-scripts/preview.sh
RUN chmod +x run-scripts/preview-storybook.sh
ENTRYPOINT ["/bin/sh", "run-scripts/entrypoint.sh"]
#ENTRYPOINT [ "npm", "run", "preview" ]
#ENTRYPOINT [ "npm", "run", "preview-storybook" ]