FROM node:7.7-alpine

# Install dependencies for couchbase bindings
RUN apk add --virtual build-deps --no-cache bash cyrus-sasl-dev git g++ make python
RUN npm install --global --silent node-gyp

# Install pm2
RUN npm install --global --silent pm2

# Install app
WORKDIR /web
ADD . .
RUN yarn install --pure-lockfile

# Cleanup
RUN apk del build-deps \
      && npm uninstall --silent node-gyp \
      && npm cache clean \
      && yarn cache clean

EXPOSE 9001
CMD ["pm2-docker", "index.js"]
