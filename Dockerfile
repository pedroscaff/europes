FROM node:14.4.0-alpine3.12

RUN npm install -g http-server

COPY ./dist/* /website/
COPY ./assets /website/assets

WORKDIR /website

ENTRYPOINT http-server -p 8080 --proxy http://localhost:8080?
