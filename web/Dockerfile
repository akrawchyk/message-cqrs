FROM node:7.7-alpine

# Install pm2
RUN npm install --global --silent pm2 \
      && npm cache clean

# Install app
WORKDIR /web
ADD . .
RUN yarn install

EXPOSE 9001
CMD ["pm2-docker", "index.js"]
