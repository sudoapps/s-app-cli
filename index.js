const minimist = require('minimist');
const auth = require('./cmds/auth');
const generateReport = require('./cmds/generateReport');
const help = require('./cmds/help');
const version = require('./cmds/version');

module.exports = () => {
  const args = minimist(process.argv.slice(2));

  let cmd = args._[0];

  if (args.version || args.v) {
    version();
    process.exit();
  }

  switch (cmd) {
    case 'auth':
      auth(args);
      break;
    case 'generate-report':
      generateReport();
      break;
    case 'help':
      help();
      break;
    case 'version':
      version();
      break;
    case undefined:
      help();
      break;
    default:
      console.error('\x1b[31m%s\x1b[0m', cmd + " is an invalid argument. Try s-app help.");
      break;
  }
}
