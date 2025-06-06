FROM node:24-alpine
WORKDIR /app
RUN ls -la
COPY package.json .
RUN ls -la
RUN npm install
COPY . .
RUN ls -la
RUN npm run build
RUN ls -la
#RUN npm run build-storybook
COPY run-scripts/entrypoint.sh .
COPY run-scripts/run-preview.sh .
COPY run-scripts/run-storybook.sh .
RUN ls -la
RUN chmod 777 entrypoint.sh
RUN chmod 777 run-preview.sh
RUN chmod 777 run-storybook.sh
RUN ls -la
CMD entrypoint.sh