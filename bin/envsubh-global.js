#!/usr/bin/env node

const program = require('commander');

const ArgV = require('./ArgV');
const envsubh = require('../envsubh');
const version = require('../package.json').version;






program
  .version(version)
  .usage('[options] <templateFile> [outputFile]')
  .option('-d, --diff', 'show diff between template file and output file');















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
