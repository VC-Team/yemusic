FROM vc-yemusic:base as builder

WORKDIR /app/builder

COPY . .

RUN npx nx build server

FROM vc-yemusic:base

WORKDIR /app

COPY --from=builder /app/builder ./

CMD ["node", "./dist/apps/server/main.js"]


