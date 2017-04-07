// const
let _ = require('lodash');
let Promise = require('bluebird');
let readFile = Promise.promisify(require('fs').readFile);
let writeFile = Promise.promisify(require('fs').writeFile);
let config = require('./main.config');
let LogDiff = require('./js/LogDiff');

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

  // noinspection EqualityComparisonWithCoercionJS
  if (args.templateFile == null) {
    return handleError(Error('envsub templateFile outputFile - missing args'), args.cli);
  }

  args.outputFile = args.outputFile || args.templateFile;

  return readFile(args.templateFile, 'utf8').then((contents) => {

    templateContents = contents;
    let parse = require(`./js/${args.command}-parser`);
    outputContents = parse(templateContents, args);
    // TODO: Is diff global cli only?
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
