FROM --platform=linux/amd64 node:lts-alpine

RUN npm install webpack -g
RUN npm install webpack-cli -g


WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install

RUN webpack  --config webpack.config.js

ENV NODE_ENV=development 
ENV PORT=3000

CMD [ "node", "./build/server.js" ]

EXPOSE 3000