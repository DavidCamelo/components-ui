FROM node:24-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
#RUN npm run build-storybook
COPY run-scripts/entrypoint.sh .
COPY run-scripts/run-preview.sh .
COPY run-scripts/run-storybook.sh .
RUN chmod 777 entrypoint.sh
RUN chmod 777 run-preview.sh
RUN chmod 777 run-storybook.sh
CMD [ "./app/entrypoint.sh" ]