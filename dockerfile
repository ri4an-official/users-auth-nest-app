FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

COPY ./dist ./dist

CMD ["yarn", "dev"]
