let Promise = require('bluebird');
let readFile = Promise.promisify(require('fs').readFile);
let writeFile = Promise.promisify(require('fs').writeFile);
let Handlebars = require('handlebars');

let envsub = (inFile, outFile = null) => {

  outFile = outFile || inFile;

  readFile(inFile, 'utf8').then((inContents) => {
    // Read the inFile and create a Handlebars template from its contents
    let template = Handlebars.compile(inContents);
    // Use env vars as the template data
    let outContents = template(process.env);
    // Write the result of the templating operation to the outFile
    return writeFile(outFile, outContents);
  }).then(() => {
    process.exit(0);
  }).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

};

module.exports = envsub;
