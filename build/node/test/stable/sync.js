"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = void 0;
var _index = require("../../src/index.js");
var _sync = require("../../src/stable/sync.js");
var h = _interopRequireWildcard(require("../helpers.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var test;
exports.sync = test = async function ($) {
  var graph, talos;
  graph = null;
  talos = null;
  return [await h.test("define graph", h.target("stable-sync", function () {
    return graph = _index.Graph.make({
      [_index.$start]: {
        edges: [{
          accept: true,
          run: null,
          move: "A"
        }]
      },
      A: {
        edges: [{
          accept: "go",
          run: function (context) {
            return context.message = "made it to A, going to B";
          },
          move: "B"
        }]
      },
      B: {
        edges: [{
          accept: false,
          run: function (context) {
            return context.message = "this overwrite shouldn't happen";
          },
          move: _index.$halt
        }, {
          accept: true,
          run: null,
          move: _index.$halt
        }]
      }
    });
  })), await h.test("define talos", h.target("stable-sync", function () {
    return talos = _index.Talos.make();
  })), await h.test("run talos", h.target("stable-sync", function () {
    h.assert.equal(_index.$start, talos.state);
    (0, _sync.step)(graph, talos, null);
    h.assert.equal("A", talos.state);
    // Ignores transitions that don't match
    (0, _sync.step)(graph, talos, null);
    h.assert.equal("A", talos.state);
    (0, _sync.step)(graph, talos, "go");
    h.assert.equal("B", talos.state);
    h.assert.equal("made it to A, going to B", talos.context.message);
    (0, _sync.step)(graph, talos, "go");
    h.assert(talos.success);
    return h.assert.equal("made it to A, going to B", talos.context.message);
  }))];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc3RhYmxlL3N5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxJQUFBO0FBSUEsT0FBQSxDQUFBLElBQUEsR0FBQSxJQUFBLEdBQU8sZUFBQSxDQUFFLENBQUYsRUFBQTtFQUNQLElBQUEsS0FBQSxFQUFBLEtBQUE7RUFBRSxLQUFBLEdBQVEsSUFBQTtFQUNSLEtBQUEsR0FBUSxJQUFBO1NBRVIsQ0FDRSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUCxFQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQsRUFBd0IsWUFBQTtXQUNuRCxLQUFBLEdBQVEsWUFBSyxDQUFDLElBQU4sQ0FDTjtNQUFBLENBQUUsYUFBRixHQUNFO1FBQUEsS0FBQSxFQUFPLENBQ0w7VUFBQSxNQUFBLEVBQVEsSUFBUjtVQUNBLEdBQUEsRUFBSyxJQURMO1VBRUEsSUFBQSxFQUFNO1FBRk4sQ0FESztNQUFQLENBREY7TUFNQSxDQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sQ0FDTDtVQUFBLE1BQUEsRUFBUSxJQUFSO1VBQ0EsR0FBQSxFQUFLLFNBQUEsQ0FBRSxPQUFGLEVBQUE7bUJBQ0gsT0FBTyxDQUFDLE9BQVIsR0FBa0IsMEJBQUE7VUFEZixDQURMO1VBR0EsSUFBQSxFQUFNO1FBSE4sQ0FESztNQUFQLENBUEY7TUFhQSxDQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sQ0FDSDtVQUFBLE1BQUEsRUFBUSxLQUFSO1VBQ0EsR0FBQSxFQUFLLFNBQUEsQ0FBRSxPQUFGLEVBQUE7bUJBQ0gsT0FBTyxDQUFDLE9BQVIsR0FBa0IsaUNBQUE7VUFEZixDQURMO1VBR0EsSUFBQSxFQUFNO1FBSE4sQ0FERyxFQU1IO1VBQUEsTUFBQSxFQUFRLElBQVI7VUFDQSxHQUFBLEVBQUssSUFETDtVQUVBLElBQUEsRUFBTTtRQUZOLENBTkc7TUFBUDtJQWRGLENBRE0sQ0FBQTtFQUQyQyxDQUF4QixDQUF2QixDQURSLEVBNEJFLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxjQUFQLEVBQXVCLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVCxFQUF3QixZQUFBO1dBQ25ELEtBQUEsR0FBUSxZQUFLLENBQUMsSUFBTixDQUFBLENBQUE7RUFEMkMsQ0FBeEIsQ0FBdkIsQ0E1QlIsRUErQkUsTUFBTSxDQUFDLENBQUMsSUFBRixDQUFPLFdBQVAsRUFBb0IsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxhQUFULEVBQXdCLFlBQUE7SUFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsYUFBZixFQUF1QixLQUFLLENBQUMsS0FBN0IsQ0FBQTtJQUVBLElBQUEsVUFBQSxFQUFLLEtBQUwsRUFBWSxLQUFaLEVBQW1CLElBQW5CLENBQUE7SUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLEtBQUssQ0FBQyxLQUExQixDQUhOOztJQU1NLElBQUEsVUFBQSxFQUFLLEtBQUwsRUFBWSxLQUFaLEVBQW1CLElBQW5CLENBQUE7SUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLEtBQUssQ0FBQyxLQUExQixDQUFBO0lBRUEsSUFBQSxVQUFBLEVBQUssS0FBTCxFQUFZLEtBQVosRUFBbUIsSUFBbkIsQ0FBQTtJQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLEdBQWYsRUFBb0IsS0FBSyxDQUFDLEtBQTFCLENBQUE7SUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSwwQkFBZixFQUEyQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXpELENBQUE7SUFFQSxJQUFBLFVBQUEsRUFBSyxLQUFMLEVBQVksS0FBWixFQUFtQixJQUFuQixDQUFBO0lBQ0EsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFLLENBQUMsT0FBZixDQUFBO1dBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsMEJBQWYsRUFBMkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUF6RCxDQUFBO0VBaEJnRCxDQUF4QixDQUFwQixDQS9CUixDO0FBSkssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoLCBUYWxvcywgJHN0YXJ0LCAkaGFsdCB9IGZyb20gXCIuLi8uLi9zcmNcIlxuaW1wb3J0IHsgc3RlcCB9IGZyb20gXCIuLi8uLi9zcmMvc3RhYmxlL3N5bmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAoICQgKSAtPlxuICBncmFwaCA9IG51bGxcbiAgdGFsb3MgPSBudWxsXG5cbiAgW1xuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSBncmFwaFwiLCBoLnRhcmdldCBcInN0YWJsZS1zeW5jXCIsIC0+XG4gICAgICBncmFwaCA9IEdyYXBoLm1ha2VcbiAgICAgICAgWyAkc3RhcnQgXTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgIG1vdmU6IFwiQVwiXG4gICAgICAgICAgXVxuICAgICAgICBBOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IFwiZ29cIlxuICAgICAgICAgICAgcnVuOiAoIGNvbnRleHQgKSAtPlxuICAgICAgICAgICAgICBjb250ZXh0Lm1lc3NhZ2UgPSBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiXG4gICAgICAgICAgICBtb3ZlOiBcIkJcIlxuICAgICAgICAgIF1cbiAgICAgICAgQjpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgICBhY2NlcHQ6IGZhbHNlXG4gICAgICAgICAgICAgIHJ1bjogKCBjb250ZXh0ICkgLT5cbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1lc3NhZ2UgPSBcInRoaXMgb3ZlcndyaXRlIHNob3VsZG4ndCBoYXBwZW5cIlxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgICAgLFxuICAgICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgICAgcnVuOiBudWxsXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgXVxuICAgIFxuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSB0YWxvc1wiLCBoLnRhcmdldCBcInN0YWJsZS1zeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IFRhbG9zLm1ha2UoKVxuXG4gICAgYXdhaXQgaC50ZXN0IFwicnVuIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RhYmxlLXN5bmNcIiwgLT5cbiAgICAgIGguYXNzZXJ0LmVxdWFsICRzdGFydCwgdGFsb3Muc3RhdGVcbiAgICAgIFxuICAgICAgc3RlcCBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICAjIElnbm9yZXMgdHJhbnNpdGlvbnMgdGhhdCBkb24ndCBtYXRjaFxuICAgICAgc3RlcCBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkJcIiwgdGFsb3Muc3RhdGVcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydCB0YWxvcy5zdWNjZXNzXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIHN5bmMgfSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=test/stable/sync.coffee