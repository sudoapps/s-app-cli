module.exports = () => {
  console.log(
    `
    Usage: s-app [options] [arguments]

    Options: 

      auth 
                        Configure the CLI with your API token found in your account dashboard. 
      generate-report
                        Generates a private application audit report viewable from your dashboard. 
      version
                        Installed CLI version.
    
    Arguments: 

      --token | -t
                          Provide the API token with the "auth" option to configure the CLI globally.
    
    `
  );
}