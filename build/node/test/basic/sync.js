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
  var $halt, $start, graph, talos;
  ({
    $start,
    $halt
  } = $.lib);
  graph = null;
  talos = null;
  return [await h.test("define graph", h.target("basic-sync", function () {
    return graph = $.lib.Graph.create({
      [$start]: {
        edges: [{
          accept: true,
          run: null,
          move: "A"
        }]
      },
      A: {
        edges: [{
          accept: "go",
          run: function (talos) {
            return talos.context.message = "made it to A, going to B";
          },
          move: "B"
        }]
      },
      B: {
        edges: [{
          accept: false,
          run: function (talos) {
            return talos.context.message = "this overwrite shouldn't happen";
          },
          move: $halt
        }, {
          accept: true,
          run: null,
          move: $halt
        }]
      }
    });
  })), await h.test("define talos", h.target("basic-sync", function () {
    return talos = $.lib.Talos.create();
  })), await h.test("run talos", h.target("basic-sync", function () {
    h.assert.equal($start, talos.state);
    $.lib.stepSync(graph, talos, null);
    h.assert.equal("A", talos.state);
    $.lib.stepSync(graph, talos, "go");
    h.assert.equal("B", talos.state);
    h.assert.equal("made it to A, going to B", talos.context.message);
    $.lib.stepSync(graph, talos, "go");
    h.assert(talos.success);
    return h.assert.equal("made it to A, going to B", talos.context.message);
  }))];
};
//# sourceMappingURL=data:application/json;base64,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LENBQUMsS0FBVCxDQUFlLDBCQUFmLEVBQTJDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBekQsQ0FBQTtFQVorQyxDQUF2QixDQUFwQixDQS9CUixDO0FBTEssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gKCAkICkgLT5cbiAgeyAkc3RhcnQsICRoYWx0IH0gPSAkLmxpYlxuICBncmFwaCA9IG51bGxcbiAgdGFsb3MgPSBudWxsXG5cbiAgW1xuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSBncmFwaFwiLCBoLnRhcmdldCBcImJhc2ljLXN5bmNcIiwgLT5cbiAgICAgIGdyYXBoID0gJC5saWIuR3JhcGguY3JlYXRlXG4gICAgICAgIFsgJHN0YXJ0IF06XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgcnVuOiBudWxsXG4gICAgICAgICAgICBtb3ZlOiBcIkFcIlxuICAgICAgICAgIF1cbiAgICAgICAgQTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiBcImdvXCJcbiAgICAgICAgICAgIHJ1bjogKCB0YWxvcyApIC0+XG4gICAgICAgICAgICAgIHRhbG9zLmNvbnRleHQubWVzc2FnZSA9IFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCJcbiAgICAgICAgICAgIG1vdmU6IFwiQlwiXG4gICAgICAgICAgXVxuICAgICAgICBCOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICAgIGFjY2VwdDogZmFsc2VcbiAgICAgICAgICAgICAgcnVuOiAoIHRhbG9zICkgLT5cbiAgICAgICAgICAgICAgICB0YWxvcy5jb250ZXh0Lm1lc3NhZ2UgPSBcInRoaXMgb3ZlcndyaXRlIHNob3VsZG4ndCBoYXBwZW5cIlxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgICAgLFxuICAgICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgICAgcnVuOiBudWxsXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgXVxuICAgIFxuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSB0YWxvc1wiLCBoLnRhcmdldCBcImJhc2ljLXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gJC5saWIuVGFsb3MuY3JlYXRlKClcblxuICAgIGF3YWl0IGgudGVzdCBcInJ1biB0YWxvc1wiLCBoLnRhcmdldCBcImJhc2ljLXN5bmNcIiwgLT5cbiAgICAgIGguYXNzZXJ0LmVxdWFsICRzdGFydCwgdGFsb3Muc3RhdGVcbiAgICAgIFxuICAgICAgJC5saWIuc3RlcFN5bmMgZ3JhcGgsIHRhbG9zLCBudWxsXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkFcIiwgdGFsb3Muc3RhdGVcblxuICAgICAgJC5saWIuc3RlcFN5bmMgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQlwiLCB0YWxvcy5zdGF0ZVxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG5cbiAgICAgICQubGliLnN0ZXBTeW5jIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydCB0YWxvcy5zdWNjZXNzXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIHN5bmMgfSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=test/basic/sync.coffee