const ENV_REGEX = '[a-zA-Z_]+[a-zA-Z0-9_]*';
const DEFAULT_SYNTAX = 'dollar-curly';

// const DEFAULT_OPTIONS = {
//   protect: false,
//   syntax: 'default'
// };

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

  dRegexes.forEach((dRegex) => {

    if (!opts.envs) {

      // Find all env var matches
      let regexp = `${dRegex.lhs}${dRegex.sep}${ENV_REGEX}${dRegex.sep}${dRegex.rhs}`;
      let matches = contents.match(new RegExp(regexp, 'g'));

      // Substitute
      contents = substitute(matches, contents, opts, dRegex);

    } else {

      opts.envs.forEach((env) => {

        if (env.name && env.name.trim()) {

          let valid = new RegExp(`^${ENV_REGEX}$`).test(env.name);

          if (valid) {

            if (env.value && env.value.trim()) {
              process.env[env.name] = env.value;
            }

            let regexp = `${dRegex.lhs}${dRegex.sep}${env.name}${dRegex.sep}${dRegex.rhs}`;
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
