const writeToStdout = (str) => {
  /* istanbul ignore next */
  process.stdout.write(str);
};

module.exports = {writeToStdout};
