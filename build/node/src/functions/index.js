"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _runAsync = require("./run-async.js");
Object.keys(_runAsync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _runAsync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _runAsync[key];
    }
  });
});
var _runSync = require("./run-sync.js");
Object.keys(_runSync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _runSync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _runSync[key];
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/functions/index.coffee