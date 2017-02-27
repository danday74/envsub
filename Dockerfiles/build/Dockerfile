# based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp

# docker build --build-arg MY_NAME=daniel -t danday74/envsub-build-example .
# docker run --name envbuild -d -p "8080:8080" danday74/envsub-build-example


FROM node:boron
EXPOSE 8080

RUN npm install -g envsub # LOOK HERE

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY files /usr/src/app
RUN npm install

ARG MY_NAME=fred # LOOK HERE
RUN envsub ./public/index.html ./public/index.html # LOOK HERE

CMD [ "npm", "start" ]
