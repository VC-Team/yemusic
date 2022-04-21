FROM vc-yemusic:base as builder

WORKDIR /app/builder

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npx nx build server

RUN npm prune --production

CMD ["node", "./dist/apps/server/main.js"]
