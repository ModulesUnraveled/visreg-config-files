// Require prod configuration
var prodConfig = require('./wdio.conf.js').config;

// Clone prod config and add new properties/overrides
var localConfig = Object.assign(prodConfig, {
    capabilities: [{
        project: 'My Awesome Site',
        os: 'Windows',
        os_version: '10',
        browserName: 'chrome',
    }],
});

exports.config = localConfig;
