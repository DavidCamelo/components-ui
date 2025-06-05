FROM node:24-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm run build-storybook
COPY run-scripts/run-preview.sh .
COPY run-scripts/run-storybook.sh .
COPY run-scripts/entrypoint.sh .
ENTRYPOINT [ "entrypoint.sh"]