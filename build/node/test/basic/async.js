"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.async = void 0;
var h = _interopRequireWildcard(require("../helpers.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var test;
exports.async = test = async function ($) {
  var graph, talos;
  graph = null;
  talos = null;
  return [await h.test("define graph", h.target("basic-async", function () {
    return graph = $.lib.Graph.create([{
      selector: $.start,
      next: "first"
    }, {
      selector: "first",
      next: "second"
    }, {
      selector: "second",
      next: $.halt
    }]);
  })), await h.test("define talos", h.target("basic-async", function () {
    return talos = $.lib.Talos.create();
  })), await h.test("run talos", h.target("basic-async", function () {
    $.lib.runAsync(graph, talos);
    return h.assert(true, talos.success);
  }))];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzaWMvYXN5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUEsSUFBQTtBQUVBLE9BQUEsQ0FBQSxLQUFBLEdBQUEsSUFBQSxHQUFPLGVBQUEsQ0FBRSxDQUFGLEVBQUE7RUFDUCxJQUFBLEtBQUEsRUFBQSxLQUFBO0VBQUUsS0FBQSxHQUFRLElBQUE7RUFDUixLQUFBLEdBQVEsSUFBQTtTQUVSLENBQ0UsTUFBTSxDQUFDLENBQUMsSUFBRixDQUFPLGNBQVAsRUFBdUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxhQUFULEVBQXdCLFlBQUE7V0FDbkQsS0FBQSxHQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQVosQ0FBbUIsQ0FDdkI7TUFBQSxRQUFBLEVBQVUsQ0FBQyxDQUFDLEtBQVo7TUFDQSxJQUFBLEVBQU07SUFETixDQUR1QixFQUl2QjtNQUFBLFFBQUEsRUFBVSxPQUFWO01BQ0EsSUFBQSxFQUFNO0lBRE4sQ0FKdUIsRUFPdkI7TUFBQSxRQUFBLEVBQVUsUUFBVjtNQUNBLElBQUEsRUFBTSxDQUFDLENBQUM7SUFEUixDQVB1QixDQUFuQixDQUFBO0VBRDJDLENBQXhCLENBQXZCLENBRFIsRUFhRSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUCxFQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQsRUFBd0IsWUFBQTtXQUNuRCxLQUFBLEdBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBWixDQUFBLENBQUE7RUFEMkMsQ0FBeEIsQ0FBdkIsQ0FiUixFQWdCRSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sV0FBUCxFQUFvQixDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQsRUFBd0IsWUFBQTtJQUNoRCxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQU4sQ0FBZSxLQUFmLEVBQXNCLEtBQXRCLENBQUE7V0FDQSxDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBZSxLQUFLLENBQUMsT0FBckIsQ0FBQTtFQUZnRCxDQUF4QixDQUFwQixDQWhCUixDO0FBSkssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gKCAkICkgLT5cbiAgZ3JhcGggPSBudWxsXG4gIHRhbG9zID0gbnVsbFxuXG4gIFtcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgZ3JhcGhcIiwgaC50YXJnZXQgXCJiYXNpYy1hc3luY1wiLCAtPlxuICAgICAgZ3JhcGggPSAkLmxpYi5HcmFwaC5jcmVhdGUgW1xuICAgICAgICAgIHNlbGVjdG9yOiAkLnN0YXJ0XG4gICAgICAgICAgbmV4dDogXCJmaXJzdFwiXG4gICAgICAgICxcbiAgICAgICAgICBzZWxlY3RvcjogXCJmaXJzdFwiXG4gICAgICAgICAgbmV4dDogXCJzZWNvbmRcIlxuICAgICAgICAsXG4gICAgICAgICAgc2VsZWN0b3I6IFwic2Vjb25kXCJcbiAgICAgICAgICBuZXh0OiAkLmhhbHRcbiAgICAgIF1cbiAgICBcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgdGFsb3NcIiwgaC50YXJnZXQgXCJiYXNpYy1hc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSAkLmxpYi5UYWxvcy5jcmVhdGUoKVxuXG4gICAgYXdhaXQgaC50ZXN0IFwicnVuIHRhbG9zXCIsIGgudGFyZ2V0IFwiYmFzaWMtYXN5bmNcIiwgLT5cbiAgICAgICQubGliLnJ1bkFzeW5jIGdyYXBoLCB0YWxvc1xuICAgICAgaC5hc3NlcnQgdHJ1ZSwgdGFsb3Muc3VjY2Vzc1xuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgYXN5bmMgfSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=test/basic/async.coffee