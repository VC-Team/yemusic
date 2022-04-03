FROM vc-yemusic:base as builder

WORKDIR /app/builder

COPY . .

RUN npx nx build server

RUN npm prune --production

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/builder ./

CMD ["node", "./dist/apps/server/main.js"]
