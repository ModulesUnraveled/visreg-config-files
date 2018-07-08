<!--
	// This is an example readme that you can add to your project for future developers.
	// These are the steps required to contribute to/utlize visual regression testing once the setup steps in the `Visreg-setup.md` file are completed.
-->

# Install Java command line tools
[Install the latest Java JDK (not JRE)](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html#javasejdk)

# Require all the things
`npm install`

# Save browserstack credentials to environment variables
**_Do this one time per machine. It'll carry over to future projects_**

Get access credentials from https://www.browserstack.com/automate
(Expand the "Username and Access Keys" section)

## Bash
- `export BROWSERSTACK_USER="myusername"`
- `export BROWSERSTACK_KEY="mysecretkey"`

To have this load in future bash sessions, add each `export...` command to your preference of `.profile`, `.bash_profile`, `.bashrc` etc

## Fish
- `set -Ux BROWSERSTACK_USER myusername`
- `set -Ux BROWSERSTACK_KEY mysecretkey`

This will be Universal, and persistent with no additional steps.

## Windows
- `setx BROWSERSTACK_USER myusername`
- `setx BROWSERSTACK_KEY mysecretkey`

You will need to reload any open shells, but after that, this will be Global, and persistent in all future shells.

# Setup Local Testing (BrowserStack)
**_Do this one time per machine. It'll carry over to future projects_**

- https://www.browserstack.com/local-testing

_TLDR:_
- Load any URL in any browser at https://www.browserstack.com/start
- Click the "gear" icon in the config pop-over
- Check the "Resolve all URLs through my network" box

# Running Tests
- Open the browserstack start page (you don't have to select anything, just have it open) https://www.browserstack.com/start
- In your command line, run the entire test suite with `npm test`
- Optional: If you want to run your tests in only one browser (Chrome by default), you can run `npm run test:quick`
- Optional: If you just want to run one specific test use the `--spec` flag. For example:
    - One test in all browsers: `npm test --spec path/to/one.test.js`
    - One test using the "quick" config (e.g. one browser): `npm run test:quick --spec path/to/one.test.js`

# Defining new browsers/OSs
There's a configuration tool at https://www.browserstack.com/automate/capabilities

Select the OS and browser of choice and enter the information into the "capabilities" array of the appropriate `wdio.conf` file.

_Note: When entering browser info, if you omit the browser version, the latest stable release will be used. Typically, this is the best option, unless you need to support previous browser versions. IE9 or IE10, for example._
