FROM node:16-alpine as builder 

RUN apk update \
    && apk add --virtual .gyp python3 make g++

WORKDIR /app/builder

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm ci --ignore-scripts --loglevel=error
