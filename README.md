envsub is envsubst for NodeJS
=============================

**NodeJS global CLI module providing environment variable substitution via Handlebars**

```bash
npm install -g envsub
```

```bash
envsub templateFile outputFile
```

<br>

# Example

- [x]  Ensure environment variables exist
```bash
export MY_NAME=daniel
```

- [x]  Create an environment variable template

template.html
> <div>Hello my name is {{ MY_NAME }}</div>

<br>

- [x]  Execute envsub
```bash
envsub template.html output.html
```

- [x]  And the result

output.html
> <div>Hello my name is daniel</div>

<br>

# Docker Integration (optional)

envsubst is recognised by [NGINX](https://hub.docker.com/_/nginx) as a templating solution.

This module seeks to make envsubst freely available to the NodeJS community for Docker templating.

In both examples below the file ```./files/public/index.html``` is a template file.

## Build time templating / env substitution

Sample build time [Dockerfile](https://github.com/danday74/envsub/tree/master/Dockerfiles/build)

```docker
docker build --build-arg MY_NAME=daniel -t danday74/envsub-build-example .
docker run --name envbuild -d -p "8080:8080" danday74/envsub-build-example
```

## Run time templating / env substitution

Sample run time [Dockerfile](https://github.com/danday74/envsub/tree/master/Dockerfiles/run)

```docker
docker build -t danday74/envsub-run-example .
docker run --name envrun1 -d -e MY_NAME=daniel -p "8081:8080" danday74/envsub-run-example
docker run --name envrun2 -d -e MY_NAME=jimbob -p "8082:8080" danday74/envsub-run-example
```

<br>

# View Source

The codebase is intentionally simple and does exactly what you would expect.

View source [HERE](https://github.com/danday74/envsub/blob/master/index.js)
