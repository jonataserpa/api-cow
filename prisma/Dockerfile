FROM node:16.13.2-buster-slim
RUN apt-get -qy update && apt-get -qy install openssl
RUN npm install -g --unsafe-perm @prisma/client --force 

RUN mkdir /app
WORKDIR /app

COPY ./ ./prisma/

CMD npx prisma studio