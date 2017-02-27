# based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp

# docker build -t danday74/envsub-run-example .
# docker run --name envrun1 -d -e MY_NAME=daniel -p "8081:8080" danday74/envsub-run-example
# docker run --name envrun2 -d -e MY_NAME=jimbob -p "8082:8080" danday74/envsub-run-example

FROM node:boron
EXPOSE 8080

RUN npm install -g envsub # LOOK HERE

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY files /usr/src/app
RUN npm install

RUN chmod 755 entrypoint.sh # LOOK HERE
ENTRYPOINT ["./entrypoint.sh"] # LOOK HERE
