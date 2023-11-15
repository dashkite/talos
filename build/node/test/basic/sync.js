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
    return graph = $.lib.Graph.create({
      [$.start]: {
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
          move: $.halt
        }, {
          accept: true,
          run: null,
          move: $.halt
        }]
      }
    });
  })), await h.test("define talos", h.target("basic-sync", function () {
    return talos = $.lib.Talos.create();
  })), await h.test("run talos", h.target("basic-sync", function () {
    h.assert.equal($.start, talos.state);
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
//# sourceMappingURL=data:application/json;base64,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QyxPQUFPLENBQUMsT0FBekQsQ0FBQTtFQVorQyxDQUF2QixDQUFwQixDQS9CUixDO0FBSkssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gKCAkICkgLT5cbiAgZ3JhcGggPSBudWxsXG4gIHRhbG9zID0gbnVsbFxuXG4gIFtcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgZ3JhcGhcIiwgaC50YXJnZXQgXCJiYXNpYy1zeW5jXCIsIC0+XG4gICAgICBncmFwaCA9ICQubGliLkdyYXBoLmNyZWF0ZVxuICAgICAgICBbICQuc3RhcnQgXTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgIG1vdmU6IFwiQVwiXG4gICAgICAgICAgXVxuICAgICAgICBBOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IFwiZ29cIlxuICAgICAgICAgICAgcnVuOiAoIHRhbG9zICkgLT5cbiAgICAgICAgICAgICAgdGFsb3MuY29udGV4dC5tZXNzYWdlID0gXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIlxuICAgICAgICAgICAgbW92ZTogXCJCXCJcbiAgICAgICAgICBdXG4gICAgICAgIEI6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgICAgYWNjZXB0OiBmYWxzZVxuICAgICAgICAgICAgICBydW46ICggdGFsb3MgKSAtPlxuICAgICAgICAgICAgICAgIHRhbG9zLmNvbnRleHQubWVzc2FnZSA9IFwidGhpcyBvdmVyd3JpdGUgc2hvdWxkbid0IGhhcHBlblwiXG4gICAgICAgICAgICAgIG1vdmU6ICQuaGFsdFxuICAgICAgICAgICAgLFxuICAgICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgICAgcnVuOiBudWxsXG4gICAgICAgICAgICAgIG1vdmU6ICQuaGFsdFxuICAgICAgICAgIF1cbiAgICBcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgdGFsb3NcIiwgaC50YXJnZXQgXCJiYXNpYy1zeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9ICQubGliLlRhbG9zLmNyZWF0ZSgpXG5cbiAgICBhd2FpdCBoLnRlc3QgXCJydW4gdGFsb3NcIiwgaC50YXJnZXQgXCJiYXNpYy1zeW5jXCIsIC0+XG4gICAgICBoLmFzc2VydC5lcXVhbCAkLnN0YXJ0LCB0YWxvcy5zdGF0ZVxuICAgICAgXG4gICAgICAkLmxpYi5zdGVwU3luYyBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICAkLmxpYi5zdGVwU3luYyBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJCXCIsIHRhbG9zLnN0YXRlXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcblxuICAgICAgJC5saWIuc3RlcFN5bmMgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0IHRhbG9zLnN1Y2Nlc3NcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgc3luYyB9Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=test/basic/sync.coffee