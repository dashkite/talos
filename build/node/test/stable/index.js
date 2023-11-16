"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _sync = require("./sync.js");
Object.keys(_sync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sync[key];
    }
  });
});
var _async = require("./async.js");
Object.keys(_async).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _async[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _async[key];
    }
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=test/stable/index.coffee