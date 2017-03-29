FROM node:7.7-alpine

# Install dependencies for couchbase bindings
RUN apk add --virtual build-deps --no-cache git g++ make python

# Install pm2
RUN npm install --global --silent pm2

# Install app
WORKDIR /web
ADD . .
RUN yarn install --pure-lockfile

# Cleanup
RUN apk del build-deps \
      && npm cache clean \
      && yarn cache clean

EXPOSE 9001
CMD ["pm2-docker", "index.js"]
