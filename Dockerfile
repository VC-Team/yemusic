FROM node:16-alpine as builder 

RUN apk update \
    && apk add --no-cache --virtual .gyp python3 make g++

WORKDIR /app/builder

COPY . .

RUN npm set-script prepare ""
RUN npm i
