let Promise = require('bluebird');
let readFile = Promise.promisify(require('fs').readFile);
let writeFile = Promise.promisify(require('fs').writeFile);
let Handlebars = require('handlebars');

if (process.argv.length < 4) {
  console.error('input and output file args required');
  process.exit(1);
}

let inFile = process.argv[2];
let outFile = process.argv[3];

readFile(inFile, 'utf8').then((inContents) => {
  let template = Handlebars.compile(inContents);
  let outContents = template(process.env);
  return writeFile(outFile, outContents);
}).then(() => {
  process.exit(0);
}).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
