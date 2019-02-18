Copy the scripts from the included `package.json` (or found below) to your package.json file.
If you already have a "test" script, you can call this whatever you want.
e.g. `"wdio": "wdio"` would let you run `npm run wdio` instead of `npm test`.
If you rename it, be sure to update the "Running Tests" section in the VISREG-README.md file to match.

## Example
```
  "scripts": {
    "test": "wdio",
    "test:quick": "wdio wdio.conf.quick.js"
  }
```
