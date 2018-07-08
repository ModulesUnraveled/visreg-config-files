The `wdio.conf.quick.js` file is used for quick testing. Most often useful while actively developing/updating a component.

This file first includes all of the config from the default `wdio.conf.js` file, then overrides aspects. By default, it just sets a single OS/browser to run tests against. Thus speeding up the test run.

_(Remember to update the project name)_

## Example
```
// Require prod configuration
var prodConfig = require('./wdio.conf.js').config;

// Clone prod config and add new properties/overrides
var localConfig = Object.assign(prodConfig, {
    capabilities: [{
        project: 'YOUR PROJECT NAME',
        os: 'Windows',
        os_version: '10',
        browserName: 'chrome',
        'browserstack.local': true
    }],
});

exports.config = localConfig;
```
