let chalk = require('chalk');
let jsDiff = require('diff');

class LogDiff {

  static logDiff(templateContents, outputContents) {

    let diff = jsDiff.diffLines(templateContents, outputContents);

    diff.forEach((part) => {
      let color = part.added ? 'green' : part.removed ? 'red' : 'grey';
      let prefix = part.added ? '+' : part.removed ? '-' : '';
      part.diff = chalk[color](prefix + part.value);
      /* istanbul ignore next */
      if (!process.env.NODE_ENV) process.stdout.write(part.diff);
    });
  }
}

module.exports = LogDiff;
