The `wdio.conf.js` file is the main configuration file for visual regression tests on a project. Anything can be changed in here. Most of the configuration can be left at the defaults, but there are three sections that should be configured per-project.

1. Update the `baseUrl` on line 10 to the site's local URL. If you are running tests against production (or PR instances like multidevs) update the baseUrl on line 13 as well.
2. The `specs` option is a globbing path to where your test files will live. Set this to whatever makes sense for your project. This must be relative to your package.json file.
3. Update the `capabilities` array to reflect the OSs and Browsers your tests should be run against by default&ast;.
    - Add/Remove options so that you're testing the browsers and versions that your project supports
    - `project`: This is used to identify/group your tests in BrowserStack
    - Uncomment and update the `misMatchTolerance` on line 116 if you have issues like font rendering or something else that causes false-negatives

Everything else is configured to sensible defaults that shouldn't need to be updated unless specifically required.

*Optionally update the misMatchTolerance*

You may run into an issue where browsers rending things slightly different. e.g. Chrome on a Mac renders fonts slightly different than Chrome on Windows. So, if you're testing locally (with something like selenium instead of against browserstack) you might want to increase the `misMatchTolerance` from the default (0.01) to reduce false failures.

&ast; If you want to run against a smaller set of browsers (or even just one) use something like the `wdio.conf.quick.js` file.
