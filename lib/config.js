//all the environment variables are defined here and are imported

var environments = {};

environments.staging = {
    'httpsPort' : 3000,
    'httpPort' : 5000,
    'envName' : 'staging',
    'hashingSecret' : 'thisIsASecret'
};
environments.production = {
    'httpsPort' : 3000,
    'httpPort' : 5001,
    'envName' : 'production',
    'hashingSecret' : 'thisIsASecret'
};

// environments.ravu = {
//     'httpsPort' : 3002,
//     'httpPort' : 5002,
//     'envName' : 'ravu'
// };

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//export the module
module.exports = environmentToExport;