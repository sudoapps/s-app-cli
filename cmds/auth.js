const Configstore = require('configstore');
const Constants = require('../constants');
const packageJson = require('../package.json');

const config = new Configstore(packageJson.name);

module.exports = (args) => {
  let authToken = args.token || args.t;

  if (!authToken || authToken === true) {
    console.error('\x1b[31m%s\x1b[0m', "Please provide an auth token using --token.");
    process.exit(Constants.ERROR);
  }

  config.set(Constants.SUDO_APPS_API_TOKEN, authToken);

  console.log("Sudo Apps CLI has been configured and is ready to use!");
}
