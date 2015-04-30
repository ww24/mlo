mlo
===

[![NPM Version][npm-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Code Climate][codeclimate-img]][codeclimate-url] [![Dependency Status][gemnasium-img]][gemnasium-url]

Simple module loader for Node.js

Installation
------------
```
npm install mlo
```

Examples
--------
directories
```
app.js
lib/module_a.js
    module_b.js
    mod-c.js
    mod-d/index.js
          mod-e.js
node_modules
package.json
```

### Basic usage
app.js
```js
var mlo = require("mlo");
var lib = mlo("lib").load();

lib.module_a //= require("./lib/module_a")
lib.module_b //= require("./lib/module_b")
lib["mod-c"] //= require("./lib/mod-c")
```

### Advanced usage [pattern]
pattern matches filename

ref: [isaacs/minimatch](https://github.com/isaacs/minimatch)

app.js
```js
var mlo = require("mlo");
var lib = mlo("lib").load("module_*");

lib.module_a //= require("./lib/module_a")
lib.module_b //= require("./lib/module_b")
```

### Advanced usage [recursively]
load module recursively

app.js
```js
var mlo = require("mlo");

var lib = mlo("lib").loadRecursively("mod_*");
// alias: mlo("lib").loadr("mod_*");

lib["mod-c"]          //= require("./lib/mod-c")
lib["mod-d"]["mod-e"] //= require("./lib/mod-d/mod-e")
```

License
-------
[MIT](LICENSE)

[npm-url]: https://www.npmjs.org/package/mlo
[npm-img]: https://img.shields.io/npm/v/mlo.svg
[travis-url]: https://travis-ci.org/ww24/mlo
[travis-img]: https://travis-ci.org/ww24/mlo.svg?branch=master
[coveralls-url]: https://coveralls.io/r/ww24/mlo?branch=master
[coveralls-img]: https://coveralls.io/repos/ww24/mlo/badge.svg?branch=master
[codeclimate-url]: https://codeclimate.com/github/ww24/mlo
[codeclimate-img]: https://codeclimate.com/github/ww24/mlo/badges/gpa.svg
[gemnasium-url]: https://gemnasium.com/ww24/mlo
[gemnasium-img]: https://gemnasium.com/ww24/mlo.svg
