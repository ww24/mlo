/**
 * Simple Module Loader
 * mlo
 */

"use strict";

var minimatch = require("minimatch");
var path = require("path");
var fs = require("fs");

function MLO(filename, dir) {
  var base = path.dirname(filename);

  this.caller = filename;
  this.dir = path.resolve(base, dir);
}

MLO.prepareStackTrace = function (error, structuredStackTrace) {
  return structuredStackTrace[0];
};

MLO.getFilename = function (caller) {
  var original = Error.prepareStackTrace;
  var error = {};
  Error.captureStackTrace(error, caller);
  Error.prepareStackTrace = this.prepareStackTrace;
  var stack = error.stack;
  Error.prepareStackTrace = original;
  return stack.getFileName();
};

MLO.prototype.load = function (pattern) {
  var libs = {};

  var dir = this.dir;
  var caller = this.caller;

  var modules = fs.readdirSync(dir).filter(function (filename) {
    var filepath = path.join(dir, filename);
    return path.extname(filename) === ".js" && filepath !== caller;
  });

  if (typeof pattern === "string") {
    modules = modules.filter(minimatch.filter(pattern));
  }

  modules.forEach(function (filename) {
    var module = path.basename(filename, ".js");
    var filepath = path.join(dir, filename);
    libs[module] = require(filepath);
  });

  return libs;
};

MLO.prototype.load.recursively = function () {

};

module.exports = function init(dir) {
  var filename = MLO.getFilename(init);
  return new MLO(filename, dir);
};
