FROM node:16.13.2-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]





# RUN npm install

# RUN mkdir /app
# WORKDIR /app

# COPY package*.json ./
# COPY prisma ./prisma/

# RUN npm install
# RUN npm install @prisma/cli --save-dev

# CMD [ "npm", "start" ]






# RUN apk add --no-cache bash

# RUN npm install -g @nestjs/cli@8.0.0

# ENV DOCKERIZE_VERSION v0.6.1
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# USER node

# WORKDIR /home/node/app





