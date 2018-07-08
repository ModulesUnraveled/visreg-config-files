The `globalHides.js` file is used to define elements that should not appear in visual regression screenshots in most situations. There are two sections, `hide` and `remove`.

## Hide
This section _visually_ hides elements [something like the `.visually-hidden` class here](https://a11yproject.com/posts/how-to-hide-content/). It will not be visible in the screenshots, but it **will** still take up the same amount of space in the image.

Good candidates are elements with an image that changes, or ad blocks.

## Remove
This section removes elements from the dom. This is equivalent to `display: none`. Their physical space will be collapsed, so if used incorrectly, this could negatively affect the design of the page

Good candidates are sticky headers/footers, or pop-over help/chat windows.

## Example
```
module.exports = {
  hide: [
    'img'
  ],
  remove: [
    '.contact-cta',
    '#sticky-footer'
  ]
};
```
