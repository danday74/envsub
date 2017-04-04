#!/usr/bin/env node

const program = require('commander');
const envsub = require('../lib/index').envsub;
const version = require('../package.json').version;

let addEnvironmentVariable = (envVar, envVarList) => {
  envVarList.push(envVar);
  return envVarList;
};

program
  .version(version)
  .usage('[options] <templateFile> [outputFile]')
  .option('-d, --diff', 'show diff between templateFile and outputFile')
  .option('-e, --env <name>[=value]', 'environment variable to substitute .. if none specified then substitute all', addEnvironmentVariable, [])
  .option('-p, --protect', 'protect non-existent environment variables .. do not substitute them with an empty string')
  .option('-s, --syntax <syntax>', 'Substitution syntax, one of .. dollar-basic $MYVAR .. dollar-curly ${MYVAR} .. dollar-both $MYVAR and ${MYVAR} .. handlebars {{MYVAR}} .. default ${MYVAR}', /^(dollar-basic|dollar-curly|dollar-both|handlebars|default)$/i, 'default');

program.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  console.log('    Typical usage');
  console.log('    -------------');
  console.log('    $ envsub templateFile outputFile');
  console.log('    $ envsub --env MYVAR1 --env MYVAR2=foo templateFile outputFile');
  console.log('');
  console.log('    Overwrite your templateFile');
  console.log('    ---------------------------');
  console.log('    Useful inside a docker container after you have copied your templateFile into the container');
  console.log('    $ envsub templateFile');
  console.log('    $ envsub --env MYVAR1 --env MYVAR2=foo templateFile');
  console.log('');
});

program.parse(process.argv);

let templateFile = (program.args.length > 0) ? program.args[0] : null;
let outputFile = (program.args.length > 1) ? program.args[1] : null;
let options = {
  diff: !!program.diff,
  protect: !!program.protect,
  syntax: program.syntax.toLowerCase()
};

if (program.env.length > 0) {
  let envs = [];
  program.env.forEach((env) => {
    let nvp = env.split(/=(.+)/);
    if (nvp.length > 1) {
      envs.push({name: nvp[0], value: nvp[1]});
    } else {
      envs.push({name: nvp[0]});
    }
  });
  program.envs = envs;
}

envsub({
  templateFile,
  outputFile,
  options,
  cli: true
});
