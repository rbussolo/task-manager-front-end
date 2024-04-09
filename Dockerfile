FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .
COPY ./.env.production ./.env

EXPOSE 5173

CMD ["npm", "run", "start"]
