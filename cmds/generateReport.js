const Configstore = require('configstore');
const Constants = require('../constants');
const https = require('https');
const packageJson = require('../package.json');
const fs = require('fs');

const config = new Configstore(packageJson.name);

module.exports = () => {
  let apiKey = config.get(Constants.SUDO_APPS_API_TOKEN);

  if (!apiKey) {
    console.error('\x1b[31m%s\x1b[0m', "s-app CLI has not been configured. Run: s-app auth --token TOKEN");
    process.exit(Constants.ERROR);
  }

  fs.readFile('./package.json', 'utf8', function(err, localPackageJson) {
    if (err) {
      console.error('\x1b[31m%s\x1b[0m', "There is no package.json file in this directory.");
      process.exit(Constants.ERROR);
    };

    fs.readFile('./package-lock.json', 'utf8', function(err, packageJsonLock) {
      if (err) {
        console.error('\x1b[31m%s\x1b[0m', "There is no package-lock.json file in this directory. Try running 'npm install'");
        process.exit(Constants.ERROR);
      };

      let packageJsonParsed = JSON.parse(localPackageJson);
      let packageJsonLockParsed = JSON.parse(packageJsonLock);
      
      let projectDetails = {
        packageJson: packageJsonParsed,
        packageJsonLock: packageJsonLockParsed,
      }

      let postData = JSON.stringify(projectDetails);

      let postOptions = {
        hostname: 'api.sudoapps.com',
        port: 443,
        path: '/v1/generatePrivateAudit',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length,
          'x-api-key': apiKey,
          'SOURCE-TYPE': 'NPM'
        }
      }

      console.log('Processing package.json...');

      let postRequest = https.request(postOptions, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          console.log(data);
        });
      }).on("error", (err) => {
        console.error('\x1b[31m%s\x1b[0m', err.message);
        process.exit(Constants.ERROR);
      });

      postRequest.write(postData);
      postRequest.end();
    });
  });
}
