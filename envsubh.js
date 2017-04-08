const command = require('./main');

module.exports = (args = {}) => {
  args.command = 'envsubh';
  return command(args);
};
