#!/usr/bin/env node

const program = require('commander');

const ArgV = require('./ArgV');
const DotEnvParser = require('../js/DotEnvParser');
const envsub = require('../envsub');
const help = require('./help');
const version = require('../package.json').version;

let addEnvironmentVariable = (envVar, envVarList) => {
  envVarList.push(envVar);
  return [...new Set(envVarList)]; // unique
};

let addEnvironmentVariableFile = (envVarFile, envVarFileList) => {
  envVarFileList.push(envVarFile);
  return [...new Set(envVarFileList)]; // unique
};

program
  .version(version)
  .usage('[options] <templateFile> [outputFile]')
  .option('-d, --diff', 'show diff between template file and output file')
  .option('-e, --env <name>[=value]', 'environment variable to substitute .. if none specified then substitute all (but see --env-file) .. this flag can be repeated', addEnvironmentVariable, [])
  .option('-f, --env-file <envFile>', 'load environment variables from an .env file .. this flag can be repeated', addEnvironmentVariableFile, [])
  .option('-p, --protect', 'protect non-existent environment variable placeholders (that would otherwise be substituted) .. do not substitute them with an empty string')
  .option('-s, --syntax <syntax>', 'template substitution syntax, one of .. dollar-basic $MYVAR .. dollar-curly ${MYVAR} .. dollar-both $MYVAR and ${MYVAR} .. handlebars {{MYVAR}} .. default ${MYVAR}', /^(dollar-basic|dollar-curly|dollar-both|handlebars|default)$/i, 'default')
  .option('-S, --system', 'prefer system environment variables');

let examples = [
  'envsub templateFile outputFile',
  'envsub --diff --env MYVAR1 --env MYVAR2=foo --env-file envFile.env --protect --syntax dollar-both --system templateFile outputFile',
  'envsub templateFile',
  'envsub -d -e MYVAR1 -e MYVAR2=foo -f envFile.env -p -s dollar-both -S templateFile'
];

help(program, examples);
program.parse(ArgV.get());

let templateFile = (program.args && program.args.length > 0) ? program.args[0] : null;
let outputFile = (program.args && program.args.length > 1) ? program.args[1] : null;
let options = {
  diff: !!program.diff,
  protect: !!program.protect,
  syntax: program.syntax.toLowerCase(),
  system: !!program.system
};

if (program.env && program.env.length) {
  let envs = DotEnvParser.parseEnvs(program.env);
  /* istanbul ignore else */
  if (envs.length) options.envs = envs;
}

if (program.envFile && program.envFile.length) {
  options.envFiles = program.envFile;
}

envsub({
  templateFile,
  outputFile,
  options,
  cli: true
});
