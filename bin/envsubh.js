#!/usr/bin/env node

const program = require('commander');
const envsubh = require('../lib/index').envsubh;
const version = require('../package.json').version;
const ArgV = require('./ArgV');

program
  .version(version)
  .usage('[options] <templateFile> [outputFile]')
  .option('-d, --diff', 'show diff between templateFile and outputFile');

program.parse(ArgV.get());

let templateFile = (program.args.length > 0) ? program.args[0] : null;
let outputFile = (program.args.length > 1) ? program.args[1] : null;
let options = {
  diff: !!program.diff
};

envsubh({
  templateFile,
  outputFile,
  options,
  cli: true
});
