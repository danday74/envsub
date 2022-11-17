const VARIABLE_NAME_REGEX = '[a-zA-Z_]+[a-zA-Z0-9_]*';
const config = {
  envsub: {
    DEFAULT_OPTIONS: {
      all: false,
      diff: false,
      protect: false,
      syntax: 'default'
    }
  },
  envsubh: {
    DEFAULT_OPTIONS: {
      diff: false
    }
  },
  regex: VARIABLE_NAME_REGEX,
  curlyRegex: (mustHaveDefaultValue, variableNameRegex = VARIABLE_NAME_REGEX) => {
    const separatorRegex = ':-';
    const variableValueRegex = '[^}]*';
    const optionalDefaultValueModifier = mustHaveDefaultValue ? '' : '?';

    return `(${variableNameRegex})(?:${separatorRegex}(?<=${separatorRegex})(${variableValueRegex}))${optionalDefaultValueModifier}`;
  }
};

module.exports = config;
