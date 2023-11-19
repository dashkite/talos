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
  })), await h.test("define talos", h.target("strict-sync", function () {
    return talos = _index.Talos.make();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc3RyaWN0L3N5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxJQUFBO0FBSUEsT0FBQSxDQUFBLElBQUEsR0FBQSxJQUFBLEdBQU8sZUFBQSxDQUFFLENBQUYsRUFBQTtFQUNQLElBQUEsS0FBQSxFQUFBLEtBQUE7RUFBRSxLQUFBLEdBQVEsSUFBQTtFQUNSLEtBQUEsR0FBUSxJQUFBO1NBRVIsQ0FDRSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUCxFQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQsRUFBd0IsWUFBQTtXQUNuRCxLQUFBLEdBQVEsWUFBSyxDQUFDLElBQU4sQ0FDTjtNQUFBLENBQUUsYUFBRixHQUNFO1FBQUEsS0FBQSxFQUFPLENBQ0w7VUFBQSxNQUFBLEVBQVEsSUFBUjtVQUNBLEdBQUEsRUFBSyxJQURMO1VBRUEsSUFBQSxFQUFNO1FBRk4sQ0FESztNQUFQLENBREY7TUFNQSxDQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sQ0FDTDtVQUFBLE1BQUEsRUFBUSxJQUFSO1VBQ0EsR0FBQSxFQUFLLFNBQUEsQ0FBRSxPQUFGLEVBQUE7bUJBQ0gsT0FBTyxDQUFDLE9BQVIsR0FBa0IsMEJBQUE7VUFEZixDQURMO1VBR0EsSUFBQSxFQUFNO1FBSE4sQ0FESztNQUFQLENBUEY7TUFhQSxDQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sQ0FDSDtVQUFBLE1BQUEsRUFBUSxLQUFSO1VBQ0EsR0FBQSxFQUFLLFNBQUEsQ0FBRSxPQUFGLEVBQUE7bUJBQ0gsT0FBTyxDQUFDLE9BQVIsR0FBa0IsaUNBQUE7VUFEZixDQURMO1VBR0EsSUFBQSxFQUFNO1FBSE4sQ0FERyxFQU1IO1VBQUEsTUFBQSxFQUFRLElBQVI7VUFDQSxHQUFBLEVBQUssSUFETDtVQUVBLElBQUEsRUFBTTtRQUZOLENBTkc7TUFBUDtJQWRGLENBRE0sQ0FBQTtFQUQyQyxDQUF4QixDQUF2QixDQURSLEVBNEJFLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxjQUFQLEVBQXVCLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVCxFQUF3QixZQUFBO1dBQ25ELEtBQUEsR0FBUSxZQUFLLENBQUMsSUFBTixDQUFBLENBQUE7RUFEMkMsQ0FBeEIsQ0FBdkIsQ0E1QlIsRUErQkUsTUFBTSxDQUFDLENBQUMsSUFBRixDQUFPLFdBQVAsRUFBb0IsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxhQUFULEVBQXdCLFlBQUE7SUFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsYUFBZixFQUF1QixLQUFLLENBQUMsS0FBN0IsQ0FBQTtJQUVBLElBQUEsVUFBQSxFQUFLLEtBQUwsRUFBWSxLQUFaLEVBQW1CLElBQW5CLENBQUE7SUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLEtBQUssQ0FBQyxLQUExQixDQUFBO0lBRUEsSUFBQSxVQUFBLEVBQUssS0FBTCxFQUFZLEtBQVosRUFBbUIsSUFBbkIsQ0FBQTtJQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLEdBQWYsRUFBb0IsS0FBSyxDQUFDLEtBQTFCLENBQUE7SUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSwwQkFBZixFQUEyQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXpELENBQUE7SUFFQSxJQUFBLFVBQUEsRUFBSyxLQUFMLEVBQVksS0FBWixFQUFtQixJQUFuQixDQUFBO0lBQ0EsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFLLENBQUMsT0FBZixDQUFBO1dBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsMEJBQWYsRUFBMkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUF6RCxDQUFBO0VBWmdELENBQXhCLENBQXBCLENBL0JSLEM7QUFKSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGgsIFRhbG9zLCAkc3RhcnQsICRoYWx0IH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgeyBzdGVwIH0gZnJvbSBcIi4uLy4uL3NyYy9zdHJpY3Qvc3luY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxudGVzdCA9ICggJCApIC0+XG4gIGdyYXBoID0gbnVsbFxuICB0YWxvcyA9IG51bGxcblxuICBbXG4gICAgYXdhaXQgaC50ZXN0IFwiZGVmaW5lIGdyYXBoXCIsIGgudGFyZ2V0IFwic3RyaWN0LXN5bmNcIiwgLT5cbiAgICAgIGdyYXBoID0gR3JhcGgubWFrZVxuICAgICAgICBbICRzdGFydCBdOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgbW92ZTogXCJBXCJcbiAgICAgICAgICBdXG4gICAgICAgIEE6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogXCJnb1wiXG4gICAgICAgICAgICBydW46ICggY29udGV4dCApIC0+XG4gICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCJcbiAgICAgICAgICAgIG1vdmU6IFwiQlwiXG4gICAgICAgICAgXVxuICAgICAgICBCOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICAgIGFjY2VwdDogZmFsc2VcbiAgICAgICAgICAgICAgcnVuOiAoIGNvbnRleHQgKSAtPlxuICAgICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwidGhpcyBvdmVyd3JpdGUgc2hvdWxkbid0IGhhcHBlblwiXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgICAsXG4gICAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICBdXG4gICAgXG4gICAgYXdhaXQgaC50ZXN0IFwiZGVmaW5lIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RyaWN0LXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gVGFsb3MubWFrZSgpXG5cbiAgICBhd2FpdCBoLnRlc3QgXCJydW4gdGFsb3NcIiwgaC50YXJnZXQgXCJzdHJpY3Qtc3luY1wiLCAtPlxuICAgICAgaC5hc3NlcnQuZXF1YWwgJHN0YXJ0LCB0YWxvcy5zdGF0ZVxuICAgICAgXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgbnVsbFxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJBXCIsIHRhbG9zLnN0YXRlXG5cbiAgICAgIHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQlwiLCB0YWxvcy5zdGF0ZVxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG5cbiAgICAgIHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0IHRhbG9zLnN1Y2Nlc3NcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgc3luYyB9Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=test/strict/sync.coffee