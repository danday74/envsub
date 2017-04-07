const ENV_REGEX = '[a-zA-Z_]+[a-zA-Z0-9_]*';
const HENV_REGEX = ` *${ENV_REGEX} *`;
const DEFAULT_SYNTAX = 'dollar-curly';

// const DEFAULT_OPTIONS = {
//   protect: false,
//   syntax: 'default'
// };

let dynamicRegexes = (opts) => {

  let regexObj = (lhs, cleanLhs, rhs, regex) => {
    return {lhs, cleanLhs, rhs, regex};
  };

  let dynamicRegexes = [];

  if (opts.syntax === 'default') {
    opts.syntax = DEFAULT_SYNTAX;
  }

  if (opts.syntax === 'dollar-basic' || opts.syntax === 'dollar-both') {
    dynamicRegexes.push(regexObj('\\\$', '$', '', ENV_REGEX));
  }

  if (opts.syntax === 'dollar-curly' || opts.syntax === 'dollar-both') {
    dynamicRegexes.push(regexObj('\\\${', '${', '}', HENV_REGEX));
  }

  if (opts.syntax === 'handlebars') {
    dynamicRegexes.push(regexObj('{{', '{{', '}}', HENV_REGEX));
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

  dRegexes.forEach((dRegex) => {

    if (!opts.envs) {

      // Find all env var matches
      let regexp = `${dRegex.lhs}${dRegex.regex}${dRegex.rhs}`;
      let matches = contents.match(new RegExp(regexp, 'g'));

      // Substitute
      contents = substitute(matches, contents, opts, dRegex);

    } else {

      opts.envs.forEach((env) => {

        if (env.name && env.name.trim()) {

          let valid = new RegExp(`^${dRegex.regex}$`).test(env.name);

          if (valid) {

            if (env.value && env.value.trim()) {
              process.env[env.name] = env.value;
            }

            let regexp = `${dRegex.lhs} *${env.name} *${dRegex.rhs}`;
            let matches = contents.match(new RegExp(regexp, 'g'));

            // Substitute
            contents = substitute(matches, contents, opts, dRegex);

          } else {
            console.warn(`Skipping environment variable \'${env.name}\' because its name is invalid`);
          }
        }
      });
    }
  });

  return contents;
};

module.exports = envsubParser;
