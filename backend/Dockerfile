FROM node:slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "sleep 10 && node server.js"]

EXPOSE 3000

