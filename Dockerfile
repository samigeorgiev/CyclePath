FROM node:lts as builder

WORKDIR /app/server
# caching installing dependencies
COPY ./server/yarn.lock ./
COPY ./server/package.json ./
RUN yarn install --frozen-lockfile && yarn cache clean

WORKDIR /app/client
# caching installing dependencies
COPY ./client/yarn.lock ./
COPY ./client/package.json ./
RUN yarn install --frozen-lockfile && yarn cache clean

WORKDIR /app/server
COPY server/ ./
RUN yarn build

WORKDIR /app/client
COPY client/ ./
RUN yarn build

FROM alpine

WORKDIR /app
COPY --from=builder /app/server/dist ./server
COPY --from=builder /app/client/build ./client

RUN apk add --update nodejs=16.13.1-r0 npm nginx postgresql
RUN npm install -g yarn

WORKDIR /app/server

COPY server/package.json ./
RUN yarn install --production && yarn cache clean

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/entrypoint.sh /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]