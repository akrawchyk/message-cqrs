FROM node:7.7

# Build node-rdkafka without sasl support
ARG WITH_SASL=0

# Install build dependencies
RUN npm install --global --silent node-gyp

# Install pm2
RUN npm install --global --silent pm2

# Install app
WORKDIR /web
ADD . .
RUN yarn install --pure-lockfile

# Cleanup
RUN npm uninstall --silent node-gyp \
    && npm cache clean \
    && yarn cache clean

EXPOSE 9001
CMD ["pm2-docker", "index.js"]
