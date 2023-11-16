"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = void 0;
var _index = require("../../src/index.js");
var _sync = require("../../src/strict/sync.js");
var h = _interopRequireWildcard(require("../helpers.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var test;
exports.sync = test = async function ($) {
  var graph, talos;
  graph = null;
  talos = null;
  return [await h.test("define graph", h.target("strict-sync", function () {
    return graph = _index.Graph.create({
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
          move: _index.$halt
        }, {
          accept: true,
          run: null,
          move: _index.$halt
        }]
      }
    });
  })), await h.test("define talos", h.target("strict-sync", function () {
    return talos = _index.Talos.create();
  })), await h.test("run talos", h.target("strict-sync", function () {
    h.assert.equal(_index.$start, talos.state);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc3RyaWN0L3N5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxJQUFBO0FBSUEsT0FBQSxDQUFBLElBQUEsR0FBQSxJQUFBLEdBQU8sZUFBQSxDQUFFLENBQUYsRUFBQTtFQUNQLElBQUEsS0FBQSxFQUFBLEtBQUE7RUFBRSxLQUFBLEdBQVEsSUFBQTtFQUNSLEtBQUEsR0FBUSxJQUFBO1NBRVIsQ0FDRSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUCxFQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQsRUFBd0IsWUFBQTtXQUNuRCxLQUFBLEdBQVEsWUFBSyxDQUFDLE1BQU4sQ0FDTjtNQUFBLENBQUUsYUFBRixHQUNFO1FBQUEsS0FBQSxFQUFPLENBQ0w7VUFBQSxNQUFBLEVBQVEsSUFBUjtVQUNBLEdBQUEsRUFBSyxJQURMO1VBRUEsSUFBQSxFQUFNO1FBRk4sQ0FESztNQUFQLENBREY7TUFNQSxDQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sQ0FDTDtVQUFBLE1BQUEsRUFBUSxJQUFSO1VBQ0EsR0FBQSxFQUFLLFNBQUEsQ0FBRSxLQUFGLEVBQUE7bUJBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFkLEdBQXdCLDBCQUFBO1VBRHJCLENBREw7VUFHQSxJQUFBLEVBQU07UUFITixDQURLO01BQVAsQ0FQRjtNQWFBLENBQUEsRUFDRTtRQUFBLEtBQUEsRUFBTyxDQUNIO1VBQUEsTUFBQSxFQUFRLEtBQVI7VUFDQSxHQUFBLEVBQUssU0FBQSxDQUFFLEtBQUYsRUFBQTttQkFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWQsR0FBd0IsaUNBQUE7VUFEckIsQ0FETDtVQUdBLElBQUEsRUFBTTtRQUhOLENBREcsRUFNSDtVQUFBLE1BQUEsRUFBUSxJQUFSO1VBQ0EsR0FBQSxFQUFLLElBREw7VUFFQSxJQUFBLEVBQU07UUFGTixDQU5HO01BQVA7SUFkRixDQURNLENBQUE7RUFEMkMsQ0FBeEIsQ0FBdkIsQ0FEUixFQTRCRSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUCxFQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQsRUFBd0IsWUFBQTtXQUNuRCxLQUFBLEdBQVEsWUFBSyxDQUFDLE1BQU4sQ0FBQSxDQUFBO0VBRDJDLENBQXhCLENBQXZCLENBNUJSLEVBK0JFLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQLEVBQW9CLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVCxFQUF3QixZQUFBO0lBQ2hELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLGFBQWYsRUFBdUIsS0FBSyxDQUFDLEtBQTdCLENBQUE7SUFFQSxJQUFBLFVBQUEsRUFBSyxLQUFMLEVBQVksS0FBWixFQUFtQixJQUFuQixDQUFBO0lBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsR0FBZixFQUFvQixLQUFLLENBQUMsS0FBMUIsQ0FBQTtJQUVBLElBQUEsVUFBQSxFQUFLLEtBQUwsRUFBWSxLQUFaLEVBQW1CLElBQW5CLENBQUE7SUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLEtBQUssQ0FBQyxLQUExQixDQUFBO0lBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsMEJBQWYsRUFBMkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUF6RCxDQUFBO0lBRUEsSUFBQSxVQUFBLEVBQUssS0FBTCxFQUFZLEtBQVosRUFBbUIsSUFBbkIsQ0FBQTtJQUNBLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBSyxDQUFDLE9BQWYsQ0FBQTtXQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLDBCQUFmLEVBQTJDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBekQsQ0FBQTtFQVpnRCxDQUF4QixDQUFwQixDQS9CUixDO0FBSkssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoLCBUYWxvcywgJHN0YXJ0LCAkaGFsdCB9IGZyb20gXCIuLi8uLi9zcmNcIlxuaW1wb3J0IHsgc3RlcCB9IGZyb20gXCIuLi8uLi9zcmMvc3RyaWN0L3N5bmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAoICQgKSAtPlxuICBncmFwaCA9IG51bGxcbiAgdGFsb3MgPSBudWxsXG5cbiAgW1xuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSBncmFwaFwiLCBoLnRhcmdldCBcInN0cmljdC1zeW5jXCIsIC0+XG4gICAgICBncmFwaCA9IEdyYXBoLmNyZWF0ZVxuICAgICAgICBbICRzdGFydCBdOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgbW92ZTogXCJBXCJcbiAgICAgICAgICBdXG4gICAgICAgIEE6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogXCJnb1wiXG4gICAgICAgICAgICBydW46ICggdGFsb3MgKSAtPlxuICAgICAgICAgICAgICB0YWxvcy5jb250ZXh0Lm1lc3NhZ2UgPSBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiXG4gICAgICAgICAgICBtb3ZlOiBcIkJcIlxuICAgICAgICAgIF1cbiAgICAgICAgQjpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgICBhY2NlcHQ6IGZhbHNlXG4gICAgICAgICAgICAgIHJ1bjogKCB0YWxvcyApIC0+XG4gICAgICAgICAgICAgICAgdGFsb3MuY29udGV4dC5tZXNzYWdlID0gXCJ0aGlzIG92ZXJ3cml0ZSBzaG91bGRuJ3QgaGFwcGVuXCJcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgIF1cbiAgICBcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgdGFsb3NcIiwgaC50YXJnZXQgXCJzdHJpY3Qtc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBUYWxvcy5jcmVhdGUoKVxuXG4gICAgYXdhaXQgaC50ZXN0IFwicnVuIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RyaWN0LXN5bmNcIiwgLT5cbiAgICAgIGguYXNzZXJ0LmVxdWFsICRzdGFydCwgdGFsb3Muc3RhdGVcbiAgICAgIFxuICAgICAgc3RlcCBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkJcIiwgdGFsb3Muc3RhdGVcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydCB0YWxvcy5zdWNjZXNzXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIHN5bmMgfSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=test/strict/sync.coffee