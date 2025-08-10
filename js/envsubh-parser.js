const Handlebars = require('handlebars');

let envsubhParser = (contents, args) => {

  let opts = args ? args.options : {};

  // If strict is enabled, we need to check for undefined variables
  if (opts.strict) {
    const variableRegex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    let match;
    while ((match = variableRegex.exec(contents)) !== null) {
      const varName = match[1];
      if (process.env[varName] === undefined) {
        throw new Error(`Environment variable '${varName}' not defined`);
      }
    }
  }

  // Read the templateFile and create a Handlebars template from its contents
  let template = Handlebars.compile(contents);

  // Use env vars as the template data
  return template(process.env);
};

module.exports = envsubhParser;
