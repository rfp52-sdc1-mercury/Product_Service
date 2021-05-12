FROM node:latest
WORKDIR /usr/src/server_product_service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]