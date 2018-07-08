The `viewports.js` file contains the viewports that all tests will be run against, ulness a test-specific viewport set is defined.

Naming the viewports makes them easier to use later, specifically when you don't want to test against all of the sizes. e.g. Mobile menu checks might fail on desktop if the menu toggle is hidden on desktop, so you'd only check one or two sizes. `mobile`, `tablet`, and `desktop` below are just example names, you can use whatever makes sense for your project.

The most important element of the viewport is the width. The height is just to define the browser window, but has little effect on the actual screenshots.

If you're checking a single element, the screenshot will be exactly as wide and tall as the actual element itself.

If you're checking an entire document (full page), the screenshot will be as wide as you define here, but will be as tall as necessary to capture the entire page. the heights defined here are not relevant.

## Example
```
const viewPorts = {
  mobile: {width: 320, height: 568},
  tablet: {width: 768, height: 1024},
  desktop: {width: 1280, height: 800},
};

module.exports = viewPorts;
```
