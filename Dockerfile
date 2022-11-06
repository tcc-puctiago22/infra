FROM node:16-alpine

WORKDIR /app

COPY ./app/package.json .

RUN npm install --quiet

COPY . . 

CMD node  app/index

