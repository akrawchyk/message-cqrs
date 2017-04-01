FROM node:7.7

# Install runtime dependencies
# Workaround for https://github.com/phusion/baseimage-docker/issues/319, see https://github.com/docker/docker/issues/4032#issuecomment-192327844
# ARG DEBIAN_FRONTEND=noninteractive
ARG WITH_SASL=0
# RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
# RUN apt-get update && apt-get install -y --no-install-recommends \
#       libsasl2-dev \
#       musl \
#       musl-dev \
#       musl-tools \
#     && rm -rf /var/lib/apt/lists/*
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
