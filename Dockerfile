FROM node:24-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm run build-storybook
CMD /run-scripts/entrypoint.sh