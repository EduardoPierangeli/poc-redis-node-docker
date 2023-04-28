FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install 
RUN npm install -g nodemon
COPY . ./app 


EXPOSE 3000

CMD ["npm", "run", "dev"]
