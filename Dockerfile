ARG NODE=10
ARG MONGO_PASSWORD='callbetterAdmin'

FROM node:$NODE AS nodeDeps
WORKDIR ./app

COPY package.json yarn.lock  tsconfig.json  ./
COPY server ./server

RUN yarn install --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache
RUN yarn workspace server build

FROM node:$NODE
WORKDIR ./app
ENV NODE_ENV=production
EXPOSE 8080
COPY --from=nodeDeps ./app/server/build .
COPY --from=nodeDeps ./app/server/node_modules ./node_modules
CMD ["MONGO_PASSWORD=${MONGO_PASSWORD}", "node", "index.js"]
