let chalk = require('chalk');
let jsDiff = require('diff');

class LogDiff {

  static logDiff(templateContents, outputContents) {

    let diff = jsDiff.diffLines(templateContents, outputContents);

    let isDiff = diff.some((item) => {
      return item.added || item.removed;
    });

    if (isDiff) {
      diff.forEach((part) => {
        let color = part.added ? 'green' : part.removed ? 'red' : 'grey';
        let prefix = part.added ? '+' : part.removed ? '-' : '';
        part.diff = chalk[color](prefix + part.value);
        /* istanbul ignore next */
        if (!process.env.NODE_ENV) process.stdout.write(part.diff);
      });
    } else {
      /* istanbul ignore next */
      if (!process.env.NODE_ENV) process.stdout.write(chalk.grey('no difference'));
    }
  }
}

module.exports = LogDiff;
