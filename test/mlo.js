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
      var libs = mlo("./fixtures").load();

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
    it("loadRecursively", function () {
      var libs = mlo("fixtures").loadRecursively();

      expect(Object.keys(libs)).to.have.length(5);
      expect(libs).to.have.property("module_a", "module_a.js");
      expect(libs).to.have.property("module_b", "module_b.js");
      expect(libs).to.have.property("mod-c", "mod-c.js");

      expect(libs).to.have.property("mod-d").to.be.an("object");
      expect(Object.keys(libs["mod-d"])).to.have.length(2);
      expect(libs["mod-d"]).to.have.property("index", "mod-d/index.js");
      expect(libs["mod-d"]).to.have.property("mod-e", "mod-d/mod-e.js");

      expect(libs).to.have.property("module.js").to.be.an("object");
      expect(Object.keys(libs["module.js"])).to.have.length(2);
      expect(libs["module.js"]).to.have.property("mod-f", "module.js/mod-f.js");

      expect(libs["module.js"]).to.have.property("dir").to.be.an("object");
      expect(Object.keys(libs["module.js"].dir)).to.have.length(1);
      expect(libs["module.js"].dir).to.have.property("index", "module.js/dir/index.js");
    });

    it("alias loadr", function () {
      var libs = mlo("fixtures").loadr();

      expect(Object.keys(libs)).to.have.length(5);
      expect(libs).to.have.property("module_a", "module_a.js");
      expect(libs).to.have.property("module_b", "module_b.js");
      expect(libs).to.have.property("mod-c", "mod-c.js");

      expect(libs).to.have.property("mod-d").to.be.an("object");
      expect(Object.keys(libs["mod-d"])).to.have.length(2);
      expect(libs["mod-d"]).to.have.property("index", "mod-d/index.js");
      expect(libs["mod-d"]).to.have.property("mod-e", "mod-d/mod-e.js");

      expect(libs).to.have.property("module.js").to.be.an("object");
      expect(Object.keys(libs["module.js"])).to.have.length(2);
      expect(libs["module.js"]).to.have.property("mod-f", "module.js/mod-f.js");

      expect(libs["module.js"]).to.have.property("dir").to.be.an("object");
      expect(Object.keys(libs["module.js"].dir)).to.have.length(1);
      expect(libs["module.js"].dir).to.have.property("index", "module.js/dir/index.js");
    });

    it("pattern mod-*", function () {
      var libs = mlo("fixtures").loadr("mod-*");

      expect(Object.keys(libs)).to.have.length(3);
      expect(libs).to.have.property("mod-c", "mod-c.js");

      expect(libs).to.have.property("mod-d").to.be.an("object");
      expect(Object.keys(libs["mod-d"])).to.have.length(1);
      expect(libs["mod-d"]).to.have.property("mod-e", "mod-d/mod-e.js");

      expect(libs).to.have.property("module.js").to.be.an("object");
      expect(Object.keys(libs["module.js"])).to.have.length(1);
      expect(libs["module.js"]).to.have.property("mod-f", "module.js/mod-f.js");
    });
  });
});
