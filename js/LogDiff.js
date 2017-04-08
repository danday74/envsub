const chalk = require('chalk');
const jsDiff = require('diff');

class LogDiff {

  static replaceAllButLast(str, pOld, pNew) {
    str = str.replace(new RegExp(pOld, 'g'), pNew);
    str = str.replace(new RegExp(pNew + '$'), pOld);
    return str;
  }

  static logDiff(templateContents, outputContents) {

    let diff = jsDiff.diffLines(templateContents, outputContents);

    let isDiff = diff.some((item) => {
      return item.added || item.removed;
    });

    if (isDiff) {
      diff.forEach((part) => {
        let color, prefix;
        if (part.added) {
          color = 'green';
          prefix = '+';
          part.value = LogDiff.replaceAllButLast(part.value, '\n', '\n ');
        } else if (part.removed) {
          color = 'red';
          prefix = '-';
          part.value = LogDiff.replaceAllButLast(part.value, '\n', '\n ');
        } else {
          color = 'grey';
          prefix = '';
        }
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
