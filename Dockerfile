# 1. For build React app
FROM node:18 AS development
# Set working directory
WORKDIR /app
#
COPY package.json yarn.lock ./
RUN yarn install
COPY . /app
COPY .env.deploy .env
ENV CI=true
ENV PORT=3000
CMD [ "npm", "start" ]
FROM development AS build
RUN yarn build

FROM caddy:2.6
COPY --from=build /app/build /usr/share/caddy/html
COPY docker/entrypoint.sh /entrypoint.sh
COPY docker/Caddyfile /etc/caddy/Caddyfile

ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
