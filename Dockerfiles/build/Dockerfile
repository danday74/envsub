# based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp

# docker build --build-arg MY_NAME=Daniel -t danday74/envsub-build-example .
# docker run --name envbuild -d -p "8080:8080" danday74/envsub-build-example


FROM node:6.10.2
EXPOSE 8080

RUN npm install -g envsub # LOOK HERE

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY files /usr/src/app
RUN npm install --production

# LOOK AT ARG HERE
ARG MY_NAME=fred
RUN envsub -d ./public/index.html ./public/index.html # LOOK HERE .. shorthand is simply .. envsub -d ./public/index.html

CMD [ "npm", "start" ]
