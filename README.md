mlo [![NPM Version][npm-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url]
===

Simple module loader for Node.js

Install
-------
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
          e.js
node_modules
package.json
```

### Basic usage
app.js
```
var mlo = require("mlo");
var lib = mlo("lib").load();

lib.module_a //= require("./lib/module_a")
lib.module_b //= require("./lib/module_b")
lib["mod-c"] //= require("./lib/mod-c")
```

### Advanced usage [pattern]
app.js
```
var mlo = require("mlo");
var lib = mlo("lib").load("module_*");

lib.module_a //= require("./lib/module_a")
lib.module_b //= require("./lib/module_b")
```

### Advanced usage [recursively]
app.js
```
var mlo = require("mlo");

var lib = mlo("lib").loadRecursively("mod_*");
// alias: mlo("lib").loadr("mod_*");

lib["mod-c"]        //= require("./lib/mod-c")
lib["mod-d"].index  //= require("./lib/mod-d")
lib["mod-d"].e      //= require("./lib/mod-d/e")
```

License
-------
[MIT](LICENSE)

[npm-url]: https://www.npmjs.org/package/mlo
[npm-img]: https://img.shields.io/npm/v/mlo.svg
[travis-url]: https://travis-ci.org/ww24/mlo
[travis-img]: https://img.shields.io/travis/ww24/mlo.svg?branch=master
[coveralls-url]: https://coveralls.io/r/ww24/mlo?branch=master
[coveralls-img]: https://img.shields.io/coveralls/ww24/mlo.svg
