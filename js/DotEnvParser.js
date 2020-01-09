const _ = require('lodash');
const replaceLast = require('replace-last');
const readFileSync = require('fs').readFileSync;
const config = require('../main.config');

class DotEnvParser {

  static skip(name) {

    if (name !== '') {
      console.warn(`Skipping environment variable '${name}' because its name is invalid`);
    }
  }

  static removeComments(str) {
    if (str.includes('="')) {
      if(str.endsWith('"')) {
        return str;
      } else {
        const values = /(.*="(?:[^"\\]|\\.)*").*/.exec(str);
        return values[1].replace('\\"','"');
      }
    } else  {
      return str.replace(/#.*/, '');
    }
  }

  static parseEnvStr(str) {
    str = str.trim();
    str = str.replace(/^export /, '');
    str = DotEnvParser.removeComments(str);
    let parts = str.split('=');
    let name = parts[0].trim();
    let valid = new RegExp(`^${config.regex}$`).test(name);
    if (valid) {
      if (parts.length > 1) {
        parts.shift();
        let value = parts.join('=').trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.replace('"', '');
          value = replaceLast(value, '"', '');
        }
        return {name, value};
      } else {
        return {name};
      }
    } else {
      DotEnvParser.skip(name);
    }
    return null;
  }

  static parseEnvObj(obj) {

    let name = obj.name;
    let valid = new RegExp(`^${config.regex}$`).test(name);
    if (valid) {
      if (obj.value != null) {
        let value = obj.value.trim();
        return {name, value};
      } else {
        return {name};
      }
    } else {
      DotEnvParser.skip(name);
    }
    return null;
  }

  static parseEnvs(envs = []) {

    let results = [];
    let parse = (typeof envs[0] === 'string') ? DotEnvParser.parseEnvStr : DotEnvParser.parseEnvObj;
    envs.forEach((env) => {
      env = parse(env);
      // noinspection JSIncompatibleTypesComparison
      if (env != null) {
        results.push(env);
      }
    });
    return results;
  }

  static parseEnvFile(envFile) {

    let lines;
    try {
      lines = readFileSync(envFile, 'utf8').split('\n');
    } catch (e) {
      console.warn(`Skipping environment variable file '${envFile}' due to ${e.message}`);
      return [];
    }

    return DotEnvParser.parseEnvs(lines.reverse());
  }

  static parseEnvFiles(envFiles = []) {

    let results = [];
    envFiles.forEach((envFile) => {
      results.push(DotEnvParser.parseEnvFile(envFile));
    });
    return _.flatten(results);
  }

  static resolveEnvs(pEnvs, pEnvFiles, pAll) {

    let envs = DotEnvParser.parseEnvs(pEnvs);
    let envsFromFiles = DotEnvParser.parseEnvFiles(pEnvFiles);
    let envsFromSystem = pAll ? _.map(process.env, (v, k) => ({name: k, value: v})) : [];

    return _.uniqBy([...envs, ...envsFromFiles, ...envsFromSystem], 'name');
  }
}

module.exports = DotEnvParser;
