#!/usr/bin/env node

const program = require('commander');

const ArgV = require('./ArgV');
const envsubh = require('../envsubh');
const help = require('./help');
const version = require('../package.json').version;

program
  .version(version)
  .usage('[options] <templateFile> [outputFile]')
  .option('-d, --diff', 'show diff between template file and output file');

let examples = [
  'envsubh templateFile outputFile',
  'envsubh --diff templateFile outputFile',
  'envsubh templateFile',
  'envsubh -d templateFile'
];

help(program, examples);
program.parse(ArgV.get());

let templateFile = (program.args && program.args.length > 0) ? program.args[0] : null;
let outputFile = (program.args && program.args.length > 1) ? program.args[1] : null;
let options = {
  diff: !!program.diff
};

envsubh({
  templateFile,
  outputFile,
  options,
  cli: true
});
