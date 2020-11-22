ARG NODE=10

FROM node:$NODE AS nodeDeps
WORKDIR ./app

COPY package.json yarn.lock  tsconfig.json  ./
COPY server ./server

RUN yarn install
RUN yarn build:server

FROM node:$NODE
WORKDIR ./app
ENV NODE_ENV=production
EXPOSE 8080
COPY --from=nodeDeps ./app/server/build .
CMD ["node", "index.js"]
