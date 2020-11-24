ARG NODE=12-alpine

FROM node:$NODE AS nodeDeps
WORKDIR /app

COPY package.json yarn.lock tsconfig.json  ./
COPY server ./server

RUN yarn install --pure-lockfile
RUN yarn workspace server build

FROM node:$NODE
RUN \
    apk update &&\
    apk add tini
WORKDIR ./app
EXPOSE 5000
COPY --from=nodeDeps ./app/server/build .
COPY --from=nodeDeps ./app/node_modules ./node_modules
CMD ["tini", "node", "index.js"]

