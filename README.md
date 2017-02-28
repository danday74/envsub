envsub is envsubst for NodeJS
=============================

**NodeJS global CLI module providing environment variable substitution via Handlebars**

(Also supports non-global usage - see below)

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

<br>

# Tips

## Shorthand

Inside a docker container, it can be useful to overwrite a template file with its substituted equivalent.

To do this one would write

```bash
envsub file1 file1
```

The shorthand for which is

```bash
envsub file1
```

## Advanced templating

All Handlebars templating is valid so you can do

```handlebars
{{#if MY_NAME}}
  My name is {{ MY_NAME }}
{{else}}
  I forgot my name
{{/if}}
```

For the docs refer to [Handlebars](https://www.npmjs.com/package/handlebars)

<br>

# Non-global usage

```bash
npm install -S envsub
```

```javascript
process.env.MY_NAME = 'daniel';
```

Hope this module proves useful out there. God bless :)
