FROM node:24-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm run build-storybook
RUN chmod 777 run-scripts/entrypoint.sh
RUN chmod 777 run-scripts/run-preview.sh
RUN chmod 777 run-scripts/run-storybook.sh
EXPOSE 4173 8080
ENTRYPOINT ["/bin/sh", "run-scripts/entrypoint.sh"]