const config = require('../main.config');
const DotEnvParser = require('./DotEnvParser');
const DEFAULT_SYNTAX = 'dollar-curly';

let dynamicRegexes = (opts) => {

  let regexObj = (lhs, cleanLhs, rhs, sep) => {
    return {lhs, cleanLhs, rhs, sep};
  };

  let dynamicRegexes = [];

  if (opts.syntax === 'default') {
    opts.syntax = DEFAULT_SYNTAX;
  }

  if (opts.syntax === 'dollar-basic' || opts.syntax === 'dollar-both') {
    dynamicRegexes.push(regexObj('\\\$', '$', '', ''));
  }

  if (opts.syntax === 'dollar-curly' || opts.syntax === 'dollar-both') {
    dynamicRegexes.push(regexObj('\\\${', '${', '}', ' *'));
  }

  if (opts.syntax === 'handlebars') {
    dynamicRegexes.push(regexObj('{{', '{{', '}}', ' *'));
  }

  return dynamicRegexes;
};

let substitute = (matches, contents, opts, dRegex) => {

  matches && matches.forEach((match) => {
    let envVarName = match.replace(dRegex.cleanLhs, '').replace(dRegex.rhs, '').trim();
    let envVarValue = process.env[envVarName];
    if (envVarValue || !opts.protect) {
      contents = contents.replace(match, envVarValue || '');
    }
  });
  return contents;
};

let envsubParser = (contents, args) => {

  let opts = args.options;
  let dRegexes = dynamicRegexes(opts);
  opts.syntax = opts.syntax.toLowerCase();

  opts.envs = DotEnvParser.resolveEnvs(opts.envs, opts.envFiles);

  dRegexes.forEach((dRegex) => {

    if (!opts.envs.length) {

      // Find all env var matches
      let regexp = `${dRegex.lhs}${dRegex.sep}${config.regex}${dRegex.sep}${dRegex.rhs}`;
      let matches = contents.match(new RegExp(regexp, 'g'));

      // Substitute
      contents = substitute(matches, contents, opts, dRegex);

    } else {

      opts.envs.forEach((env) => {

        if (opts.system && process.env[env.name] == null || !opts.system) {
          if (env.value != null) {
            process.env[env.name] = env.value;
          }
        }

        let regexp = `${dRegex.lhs}${dRegex.sep}${env.name}${dRegex.sep}${dRegex.rhs}`;
        let matches = contents.match(new RegExp(regexp, 'g'));

        // Substitute
        contents = substitute(matches, contents, opts, dRegex);

      });
    }
  });

  return contents;
};

module.exports = envsubParser;
