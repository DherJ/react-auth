FROM node:16.3.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm config set strict-ssl false
RUN npm install
RUN npm install react-scripts@4.0.3 -g --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]