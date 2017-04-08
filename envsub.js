const command = require('./main');

module.exports = (args = {}) => {
  args.command = 'envsub';
  return command(args);
};
