FROM node:16

WORKDIR /UNcademy_wa

COPY package*.json ./

RUN npm install

COPY . /UNcademy_wa/

EXPOSE 3001

CMD ["npm", "run", "dev"]
