/**
 * mlo unit test
 *
 */

var mlo = require("../lib");

var expect = require("chai").expect;
var path = require("path");

describe("mlo", function () {
  describe("basic", function () {
    it("no arguments", function () {
      var libs = mlo("fixtures").load();

      expect(Object.keys(libs)).to.have.length(3);
      expect(libs).to.have.property("module_a", "module_a.js");
      expect(libs).to.have.property("module_b", "module_b.js");
      expect(libs).to.have.property("mod-c", "mod-c.js");
    });

    it("absolute path", function () {
      var absolute_path = path.resolve(__dirname, "fixtures");
      var libs = mlo(absolute_path).load();

      expect(Object.keys(libs)).to.have.length(3);
      expect(libs).to.have.property("module_a", "module_a.js");
      expect(libs).to.have.property("module_b", "module_b.js");
      expect(libs).to.have.property("mod-c", "mod-c.js");
    });

    it("cannot load caller module", function () {
      var libs = mlo(__dirname).load("mlo");

      expect(Object.keys(libs)).to.have.length(0);
    });
  });

  describe("pattern", function () {
    it("module_*", function () {
      var libs = mlo("fixtures").load("module_*");

      expect(Object.keys(libs)).to.have.length(2);
      expect(libs).to.have.property("module_a", "module_a.js");
      expect(libs).to.have.property("module_b", "module_b.js");
    });
  });

  describe("recursively", function () {

  });
});
