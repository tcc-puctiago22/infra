FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install --quiet

COPY . . 

CMD node  app/index

