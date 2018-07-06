// hide:
// Hidden elements are basically given the ".visually-hidden" class so that they do not
// show in the screenshot, but still occupy the same amout of physical space

// remove:
// Removed elements are basically given "display: none" effectively removing them from the dom
// Their physical space will be collapsed, so if used incorrectly, this would affect the
// design of the page

module.exports = {
  hide: [
    'img' // If you have images that change, you don't want them to trigger false regressions
  ],
  remove: [
    '.fixed-position-element',
    '#annoying-popup-thing-that-blocks-the-content'
  ]
};
