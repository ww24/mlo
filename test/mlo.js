/**
 * mlo unit test
 *
 */

var mlo = require("../lib");

var expect = require("chai").expect;

describe("mlo", function () {
  describe("basic", function () {
    it("no arguments", function () {
      var libs = mlo("../examples").load();
      expect(libs).to.have.property("module_a", "module_a.js");
      expect(libs).to.have.property("module_b", "module_b.js");
      expect(libs).to.have.property("mod-c", "mod-c.js");
    });
  });

  describe("pattern", function () {

  });

  describe("recursively", function () {

  });
});
