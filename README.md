envsubst for NodeJS
===================

**Command line module providing environment variable substitution via Handlebars**

```bash
npm install -g envsubst
```

```bash
envsubst templateFile outputFile
```

<br><br>

# Example

* Ensure environment variables exist
```bash
export MY_NAME=daniel
```

* Create an environment variable template

template.html
> <div>Hello my name is {{ MY_NAME }}</div>

* Execute envsubst
```bash
envsubst template.html output.html
```

* And the result is

output.html
> <div>Hello my name is daniel</div>

<br><br>

# Docker

envsubst is officially recognised by [NGINX](https://hub.docker.com/_/nginx) as a suitable NGINX config templating solution.

This module seeks to make envsubst freely available to the Node community for Docker templating.

In your Dockerfile simply

```dockerfile
FROM node
RUN npm install -g envsubst
```

Now you can freely use envsubst for templating either at build time

```docker
docker build --build-arg MY_NAME=daniel -t imagename .
```

Or at run time typically using an ENTRYPOINT script

```docker
docker run -dit --env MY_NAME=daniel imagename
```
