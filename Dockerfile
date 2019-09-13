FROM node:12.4.0

RUN mkdir /code
WORKDIR /code
COPY package*.json ./

RUN apt-get update

RUN npm install
COPY . .

ENTRYPOINT ["/code/entry-point.sh"] 
