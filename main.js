const _ = require('lodash');
const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
const writeFile = Promise.promisify(require('fs').writeFile);

const config = require('./main.config');
const LogDiff = require('./js/LogDiff');

let handleError = (err, cli) => {
  if (cli) {
    console.error(err.message);
    process.exit(1);
  }
  return Promise.reject(err);
};

let envsub = (raw = {}) => {

  let templateContents, outputContents;

  raw.command = raw.command /* istanbul ignore next */ || 'envsub';

  let args = _.merge({}, {outputFile: null, options: config[raw.command].DEFAULT_OPTIONS, cli: false}, raw);

  if (args.templateFile == null) {
    return handleError(Error(`${args.command} templateFile outputFile - missing args`), args.cli);
  }

  args.outputFile = args.outputFile || args.templateFile;

  return readFile(args.templateFile, 'utf8').then((contents) => {

    templateContents = contents;
    let parse = require(`./js/${args.command}-parser`);
    outputContents = parse(templateContents, args);
    if (args.options.diff) LogDiff.logDiff(templateContents, outputContents);
    return writeFile(args.outputFile, outputContents);

  }).then(() => {

    if (args.cli) process.exit(0);
    return Promise.resolve({
      templateFile: args.templateFile,
      templateContents,
      outputFile: args.outputFile,
      outputContents
    });

  }).catch((err) => {
    return handleError(err, args.cli);
  });
};

module.exports = envsub;
