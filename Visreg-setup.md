The steps in this readme can be followed to setup visual regression testing on a new project. They only need to be followed once per-project.

**This file should not be included in the repo.**

# Install Java command line tools
[Install the latest Java JDK (not JRE)](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html#javasejdk)

# Require all the things
`npm install --save-dev webdriverio chai node-notifier wdio-mocha-framework wdio-browserstack-service wdio-visual-regression-service`

# Add the test scripts to package.json
```
{
  "scripts": {
    "test": "wdio",
    "test:quick": "wdio wdio.conf.quick.js"
  },
}
```

# Update the .gitignore
The only screenshots we want to commit to the repo are the baselines, so we need to ignore the others.

```
# Visual Regression Testing Images
*/**/screenshots/diff
*/**/screenshots/latest
*/**/errorShots
```

# Update the config file
- Update the URLs, and the Capabilities section of the `wdio.conf.js` file.

# Defining new browsers/OSs
There's a configuration tool at https://www.browserstack.com/automate/capabilities

Select the OS and browser of choice and enter the information into the "capabilities" array of the appropriate `wdio.conf` file.

_Note: When entering browser info, if you omit the browser version, the latest stable release will be used. Typically, this is the best option, unless you need to support previous browser versions. IE9 or IE10, for example._
