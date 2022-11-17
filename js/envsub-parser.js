const config = require('../main.config');
const matchAll = require('string.prototype.matchall');
const DotEnvParser = require('./DotEnvParser');

matchAll.shim(); // will be a no-op if not needed

const SYNTAX = {
  DOLLAR_BASIC: 'dollar-basic',
  DOLLAR_CURLY: 'dollar-curly',
  DOLLAR_BOTH: 'dollar-both',
  HANDLEBARS: 'handlebars'
};

let dynamicRegexes = (opts) => {

  let regexObj = (lhs, cleanLhs, rhs, sep, type) => {
    return {lhs, cleanLhs, rhs, sep, type};
  };

  let dynamicRegexes = [];

  if (opts.syntax === 'default') {
    opts.syntax = SYNTAX.DOLLAR_CURLY;
  }

  if (opts.syntax === SYNTAX.DOLLAR_BASIC || opts.syntax === SYNTAX.DOLLAR_BOTH) {
    dynamicRegexes.push(regexObj('\\$', '$', '', '', opts.syntax));
  }

  if (opts.syntax === SYNTAX.DOLLAR_CURLY || opts.syntax === SYNTAX.DOLLAR_BOTH) {
    dynamicRegexes.push(regexObj('\\${', '${', '}', ' *', opts.syntax));
  }

  if (opts.syntax === SYNTAX.HANDLEBARS) {
    dynamicRegexes.push(regexObj('{{', '{{', '}}', ' *', opts.syntax));
  }

  return dynamicRegexes;
};

let substitute = (matches, contents, opts) => {

  matches && matches.forEach(([match, envVarName, defaultValue]) => {
    let envVarValue = process.env[envVarName];
    if (envVarValue || !opts.protect) {
      if (envVarValue !== undefined) {
        contents = contents.replace(match, envVarValue);
      } else if (defaultValue !== undefined) {
        contents = contents.replace(match, defaultValue);
      } else {
        contents = contents.replace(match, '');
      }
    }
  });
  return contents;
};

let envsubParser = (contents, args) => {

  let opts = args.options;
  let dRegexes = dynamicRegexes(opts);
  opts.syntax = opts.syntax.toLowerCase();

  opts.envs = DotEnvParser.resolveEnvs(opts.envs, opts.envFiles, opts.all);

  dRegexes.forEach((dRegex) => {

    if (!opts.envs.length) {

      // Find all env var matches      
      const regexp = dRegex.type === SYNTAX.DOLLAR_CURLY ? 
        // default value support is only available with dollar-curly syntax
        [ dRegex.lhs, dRegex.sep, config.curlyRegex(false), dRegex.sep, dRegex.rhs ].join('') :
        // Fallback to everything else
        [ dRegex.lhs, dRegex.sep, `(${config.regex})`,      dRegex.sep, dRegex.rhs].join('');
      
      let matches = contents.matchAll(new RegExp(regexp, 'g'));
      matches = [...matches].map(([match, envVarName, defaultValue]) => [match, envVarName, defaultValue]);

      // Substitute
      contents = substitute(matches, contents, opts, dRegex);

    } else {

      // Iterate over selected env variables
      opts.envs.forEach((env) => {
        
        if (opts.system && process.env[env.name] == null || !opts.system) {
          if (env.value != null) {
            process.env[env.name] = env.value;
          }
        }

        let regexp = dRegex.type === SYNTAX.HANDLEBARS ?
          [ dRegex.lhs, dRegex.sep, `(${env.name})`,                    dRegex.sep, dRegex.rhs ].join('') : 
          [ dRegex.lhs, dRegex.sep, config.curlyRegex(false, env.name), dRegex.sep, dRegex.rhs ].join('');
        let matches = contents.matchAll(new RegExp(regexp, 'g'));
        matches = [...matches].map(([match, envVarName, defaultValue]) => [match, envVarName, defaultValue]);
  
        // Substitute
        contents = substitute(matches, contents, opts, dRegex);
      });

      // In case of all flag we want to replace the ones with default value set
      if (opts.all && dRegex.type === SYNTAX.DOLLAR_CURLY) {
        let regexp = [ dRegex.lhs, dRegex.sep, config.curlyRegex(true), dRegex.sep, dRegex.rhs ].join('');
        let matches = contents.matchAll(new RegExp(regexp, 'g'));
        matches = [...matches].map(([match, envVarName, defaultValue]) => [match, envVarName, defaultValue]);
  
        // Substitute
        contents = substitute(matches, contents, opts, dRegex);
      }
    }
  });

  return contents;
};

module.exports = envsubParser;
