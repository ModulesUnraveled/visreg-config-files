// The viewports here will all be tested against by default
// You can name viewports here so that it's easier to use them later
// specifically when you don't want to test against all of the
// sizes. e.g. Mobile menu checks might fail on desktop if the
// menu toggle is hidden on desktop, so you'd only check one or two sizes

const viewPorts = {
  mobile: {width: 320, height: 568},
  tablet: {width: 768, height: 1024},
  desktop: {width: 1280, height: 800},
};

module.exports = viewPorts;
