const Handlebars = require('handlebars');

let envsubhParser = (contents) => {

  // Read the templateFile and create a Handlebars template from its contents
  let template = Handlebars.compile(contents);

  // Use env vars as the template data
  return template(process.env);
};

module.exports = envsubhParser;
