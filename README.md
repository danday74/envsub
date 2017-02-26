envsub is envsubst for NodeJS
=============================

**NodeJS command line module providing environment variable substitution via Handlebars**

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

- [x]  Execute envsub
```bash
envsub template.html output.html
```

- [x]  And the result

output.html
> <div>Hello my name is daniel</div>

<br>

# Docker

envsubst is officially recognised by [NGINX](https://hub.docker.com/_/nginx) as a suitable NGINX config templating solution.

This module seeks to make envsubst freely available to the Node community for Docker templating.

In your Dockerfile

```dockerfile
FROM node
RUN npm install -g envsub
```

Now you can use envsub in your Dockerfile with ```RUN envsub templateFile outputFile``` for templating at build time

```docker
docker build --build-arg MY_NAME=daniel -t imagename .
```

Or at run time typically using an ENTRYPOINT script

```docker
docker run -dit --env MY_NAME=daniel imagename
```
