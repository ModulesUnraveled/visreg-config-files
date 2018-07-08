Here are a couple example test files. The first usees `.checkDocument` to take a screenshot of the entire page. The second uses `.checkElement` to take a screenshot of just the navigation element.

They might be named something like `homepage.test.js` and `navigation.test.js` in a folder/folders that match the globbing pattern defined in the `specs` section of the `wdio.conf.js` file.

# Whole page test
This test takes a screenshot of the entire homepage. It also demonstrates how to increase the timeout length on a specific test.

```
const visreg = require('../config/globalHides.js');

describe('Home Page', function () {
  it('should look good', function () {
    this.timeout(120000);
    browser
      .url('./')
      .checkDocument({hide: visreg.hide, remove: visreg.remove})
      .forEach((item) => {
        expect(item.isWithinMisMatchTolerance).to.be.true;
      });
  });
});
```

# Single element test
This test suite takes screenshots of the navigation element. The first `it` section takes a screenshot when the page initially loads. The second `it` section expands the nav (clicks the menu icon), then expands a sub-nav item, then takes a screenshot of the nav element again, capturing the entire expanded menu.

This example demonstrates how to use `beforeEach` to abstract commonalities, in this case, the URL to navigate to, and to set the viewport to mobile before anything else. Setting the viewport to mobile before the test is run was important on the project this snippet came from because the menu icon is not visible on desktop, and caused the test to fail since it could not find the element on first load.

This also demonstrates how to use the `.waitForVisible` command. Since the navigation slides open, we want to wait for it to be expanded before we take the screenshot. A half-open manu would cause a false-negative failure.

Lastly, this demonstrates how to take screenshots at specific viewports only. The `#toggle-menu` element is completely hidden on desktop, so the second test would fail if it tried to run at the desktop size simply because it wouldn't be able to find the element, not because of any regressions.

```
const visreg = require('../config/globalHides.js');
const {mobile, tablet} = require('../config/viewports.js');

describe('Nav top', function () {
  beforeEach(function () {
    browser.url('./some/specific/url')
      .setViewportSize(mobile);
  });

  it('should look good when initially loaded', () => {
    browser
      .checkElement('.nav-top-wrapper', {hide: visreg.hide, remove: visreg.remove})
      .forEach((item) => {
        expect(item.isWithinMisMatchTolerance).to.be.true;
      });
  });

  it('should look good when subnav is expanded', () => {
    browser
      .click('#toggle-menu')
      .click('.nav-primary-wrapper > ul > li:nth-child(2) > span');
    browser
      .waitForVisible('.nav-primary-wrapper > ul > li:nth-child(2) > ul > li:nth-child(1) > a', 3000);
    browser
      .checkElement('.nav-top-wrapper',
        {hide: visreg.hide, remove: visreg.remove},
        {viewports: [mobile, tablet]})
      .forEach((item) => {
        expect(item.isWithinMisMatchTolerance).to.be.true;
      });
  });
});
```
