"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = void 0;
var h = _interopRequireWildcard(require("../helpers.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var test;
exports.sync = test = async function ($) {
  var graph, talos;
  graph = null;
  talos = null;
  return [await h.test("define graph", h.target("basic-sync", function () {
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
  })), await h.test("define talos", h.target("basic-sync", function () {
    return talos = $.lib.Talos.create();
  })), await h.test("run talos", h.target("basic-sync", function () {
    $.lib.runSync(graph, talos);
    return h.assert(true, talos.success);
  }))];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzaWMvc3luYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQSxJQUFBO0FBRUEsT0FBQSxDQUFBLElBQUEsR0FBQSxJQUFBLEdBQU8sZUFBQSxDQUFFLENBQUYsRUFBQTtFQUNQLElBQUEsS0FBQSxFQUFBLEtBQUE7RUFBRSxLQUFBLEdBQVEsSUFBQTtFQUNSLEtBQUEsR0FBUSxJQUFBO1NBRVIsQ0FDRSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUCxFQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLFlBQVQsRUFBdUIsWUFBQTtXQUNsRCxLQUFBLEdBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBWixDQUFtQixDQUN2QjtNQUFBLFFBQUEsRUFBVSxDQUFDLENBQUMsS0FBWjtNQUNBLElBQUEsRUFBTTtJQUROLENBRHVCLEVBSXZCO01BQUEsUUFBQSxFQUFVLE9BQVY7TUFDQSxJQUFBLEVBQU07SUFETixDQUp1QixFQU92QjtNQUFBLFFBQUEsRUFBVSxRQUFWO01BQ0EsSUFBQSxFQUFNLENBQUMsQ0FBQztJQURSLENBUHVCLENBQW5CLENBQUE7RUFEMEMsQ0FBdkIsQ0FBdkIsQ0FEUixFQWFFLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxjQUFQLEVBQXVCLENBQUMsQ0FBQyxNQUFGLENBQVMsWUFBVCxFQUF1QixZQUFBO1dBQ2xELEtBQUEsR0FBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFaLENBQUEsQ0FBQTtFQUQwQyxDQUF2QixDQUF2QixDQWJSLEVBZ0JFLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQLEVBQW9CLENBQUMsQ0FBQyxNQUFGLENBQVMsWUFBVCxFQUF1QixZQUFBO0lBQy9DLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTixDQUFjLEtBQWQsRUFBcUIsS0FBckIsQ0FBQTtXQUNBLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBVCxFQUFlLEtBQUssQ0FBQyxPQUFyQixDQUFBO0VBRitDLENBQXZCLENBQXBCLENBaEJSLEM7QUFKSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAoICQgKSAtPlxuICBncmFwaCA9IG51bGxcbiAgdGFsb3MgPSBudWxsXG5cbiAgW1xuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSBncmFwaFwiLCBoLnRhcmdldCBcImJhc2ljLXN5bmNcIiwgLT5cbiAgICAgIGdyYXBoID0gJC5saWIuR3JhcGguY3JlYXRlIFtcbiAgICAgICAgICBzZWxlY3RvcjogJC5zdGFydFxuICAgICAgICAgIG5leHQ6IFwiZmlyc3RcIlxuICAgICAgICAsXG4gICAgICAgICAgc2VsZWN0b3I6IFwiZmlyc3RcIlxuICAgICAgICAgIG5leHQ6IFwic2Vjb25kXCJcbiAgICAgICAgLFxuICAgICAgICAgIHNlbGVjdG9yOiBcInNlY29uZFwiXG4gICAgICAgICAgbmV4dDogJC5oYWx0XG4gICAgICBdXG4gICAgXG4gICAgYXdhaXQgaC50ZXN0IFwiZGVmaW5lIHRhbG9zXCIsIGgudGFyZ2V0IFwiYmFzaWMtc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSAkLmxpYi5UYWxvcy5jcmVhdGUoKVxuXG4gICAgYXdhaXQgaC50ZXN0IFwicnVuIHRhbG9zXCIsIGgudGFyZ2V0IFwiYmFzaWMtc3luY1wiLCAtPlxuICAgICAgJC5saWIucnVuU3luYyBncmFwaCwgdGFsb3NcbiAgICAgIGguYXNzZXJ0IHRydWUsIHRhbG9zLnN1Y2Nlc3NcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIHN5bmMgfSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=test/basic/sync.coffee