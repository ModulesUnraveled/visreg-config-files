var notifier = require('node-notifier');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');
var path = require('path');
var fs = require('fs-extra');

// Import the defined viewports
var viewPorts = require('./tests/config/viewports.js');

// Configure the baseUrl for local and production test runs
var baseUrl = 'http://local.my-site.com';

if (process.env.SERVER === "prod") {
  baseUrl = 'https://www.my-site.com';
}

// Set timeout based on environment variable
// To debug and get around the 60 second default timeout
// Set a local variable `DEBUG` to `true`
var timeout = process.env.DEBUG ? 99999999 : 60000;

// Configure the screenshot filenames
function getScreenshotName(folder, context){
  var type = context.type;
  var testParent = context.test.parent;
  var testName = context.test.title;
  var browserName = context.browser.name;
  var browserViewport = context.meta.viewport;
  var browserWidth = browserViewport.width;
  var browserHeight = browserViewport.height;

  // Create the screenshot file name
  return path.join(process.cwd(), folder, `${testParent} - ${testName}/${type}_${browserName}_${browserWidth}x${browserHeight}.png`);
}

exports.config = {
    user: process.env.BROWSERSTACK_USER,
    key: process.env.BROWSERSTACK_KEY,
    browserstackLocal: true,

    /////////////////////
    // Specify Test Files
    /////////////////////
    specs: [
        './components/_patterns/**/*.test.js'
    ],
    // Patterns to exclude.
    // exclude: [
        // 'path/to/excluded/files'
    // ],
    //

    ///////////////
    // Capabilities
    ///////////////
    maxInstances: 3,
    capabilities: [{
      project: 'My Awesome Site',
      os: 'Windows',
      os_version: '10',
      browserName: 'chrome',
    }, {
      project: 'My Awesome Site',
      os: 'Windows',
      os_version: '10',
      browserName: 'IE',
      browser_version: '11.0',
    }, {
      project: 'My Awesome Site',
      os: 'Windows',
      os_version: '10',
      browserName: 'Firefox',
    }],

    //////////////////////
    // Test Configurations
    //////////////////////
    sync: true,
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'silent',
    // Enables colors for log output.
    coloredLogs: true,
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './tests/errorShots/',
    // Base URL (Defined at the top of this file)
    baseUrl: baseUrl,
    // Default timeout for all waitFor* commands.
    waitforTimeout: timeout,
    // Default timeout in milliseconds for request if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    // Default request retries count
    connectionRetryCount: 3,
    // Test runner services
    services: ['browserstack', 'visual-regression'],
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    framework: 'mocha',
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: timeout
    },
    visualRegression: {
      compare: new VisualRegressionCompare.LocalCompare({
        referenceName: getScreenshotName.bind(null, 'tests/screenshots/baseline'),
        screenshotName: getScreenshotName.bind(null, 'tests/screenshots/latest'),
        diffName: getScreenshotName.bind(null, 'tests/screenshots/diff'),
        // misMatchTolerance: .4,
      }),
      viewports: Object.keys(viewPorts).map((key) => viewPorts[key]),
    },
    // =====
    // Hooks
    // =====
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
      // Clear the diffs directory so that old diffs aren't still around after furture tests
      return fs.emptyDir('./tests/screenshots/diff');
    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: function (capabilities, specs) {
      expect = require('chai').expect;
    },

    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },

    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // beforeTest: function (test) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function () {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function () {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     * @param {Object} test test details
     */
    afterTest: function (test) {
      if (!test.passed) {
        notifier.notify({
          title: 'Test failure!',
          message: test.parent + ' ' + test.title
        })
      }
    },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onComplete: function(exitCode, config, capabilities) {
    // }
}
