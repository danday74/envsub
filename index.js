let Promise = require('bluebird');
let readFile = Promise.promisify(require('fs').readFile);
let writeFile = Promise.promisify(require('fs').writeFile);
let Handlebars = require('handlebars');

let handleError = (err, cli) => {
  if (cli) {
    console.error(err.message);
    process.exit(1);
  } else {
    throw err;
  }
};

let envsub = (templateFile, outputFile = null, cli = false) => {

  if (templateFile == null) {
    handleError(Error('envsub templateFile outputFile - missing args'), cli);
  }

  outputFile = outputFile || templateFile;

  return readFile(templateFile, 'utf8').then((templateContents) => {

    // Read the templateFile and create a Handlebars template from its contents
    let template = Handlebars.compile(templateContents);

    // Use env vars as the template data
    let outputContents = template(process.env);

    // Write the result of the templating operation to the outputFile
    return writeFile(outputFile, outputContents);

  }).then(() => {
    if (cli) process.exit(0);
  }).catch((err) => {
    handleError(err, cli);
  });

};

module.exports = envsub;
