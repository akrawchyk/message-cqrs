FROM node:7.7-alpine

# Install app
WORKDIR /app
ADD . .
RUN yarn install

EXPOSE 9001
CMD ["node", "server"]
