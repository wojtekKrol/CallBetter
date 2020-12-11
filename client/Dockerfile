ARG NODE=12-alpine
FROM node:$NODE AS nodeDeps

WORKDIR /app
ENV HUSKY_SKIP_INSTALL=1

COPY . .
RUN yarn install
RUN yarn build

FROM nginx:1.17.1-alpine
RUN \
    apk update &&\
    apk add tini
WORKDIR ./app

COPY --from=nodeDeps /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=nodeDeps /app/build /usr/share/nginx/html



