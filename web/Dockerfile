FROM node:7.7-alpine

# Install pm2
RUN npm install --global --silent pm2

# Install app
WORKDIR /app
ADD . .
RUN yarn install

EXPOSE 9001
CMD ["pm2-docker", "index.js"]
