FROM vc-yemusic:base as builder

WORKDIR /app/builder

COPY . .

RUN npx nx build web

FROM nginx:alpine

COPY --from=builder /app/builder/dist/apps/web /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/builder/apps/web/config/nginx.conf /etc/nginx/conf.d

ENTRYPOINT ["nginx", "-g", "daemon off;"]
