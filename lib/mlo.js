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
  var that = this;

  var modules = fs.readdirSync(that.dir).map(function (filename) {
    return path.join(that.dir, filename);
  }).filter(function (filepath) {
    var ext = path.extname(filepath);
    return (ext === ".js" || ext === ".json") && filepath !== that.caller;
  }).filter(function (filepath) {
    return fs.statSync(filepath).isFile();
  });

  if (typeof pattern === "string") {
    modules = modules.filter(function (filepath) {
      var filename = path.basename(filepath);
      return minimatch(filename, pattern);
    });
  }

  modules.forEach(function (filepath) {
    var ext = path.extname(filepath);
    var module = path.basename(filepath, ext);
    libs[module] = require(filepath);
  });

  return libs;
};

MLO.prototype.loadRecursively = function (pattern) {
  var libs = this.load(pattern);
  var that = this;

  fs.readdirSync(that.dir).map(function (filename) {
    return path.join(that.dir, filename);
  }).filter(function (filepath) {
    return fs.statSync(filepath).isDirectory();
  }).forEach(function (dirpath) {
    var mlo = new MLO(that.caller, dirpath);
    var dirname = path.basename(dirpath);
    var lib = mlo.loadr(pattern);
    if (Object.keys(lib).length > 0) {
      libs[dirname] = lib;
    }
  });

  return libs;
};

MLO.prototype.loadr = MLO.prototype.loadRecursively;

module.exports = function init(dir) {
  var filename = MLO.getFilename(init);
  return new MLO(filename, dir);
};
