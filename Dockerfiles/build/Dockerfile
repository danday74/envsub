# docker build --build-arg MY_NAME=daniel -t danday74/envsub-build-example . 
# docker run --name envbuild -d -p "8080:8080" danday74/envsub-build-example

# based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM node:boron

RUN npm install -g envsub

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY files /usr/src/app
RUN npm install

# environment variable substitution
ARG MY_NAME=fred
RUN envsub ./public/index.html ./public/index.html

EXPOSE 8080
CMD [ "npm", "start" ]

