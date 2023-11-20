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
exports.sync = test = function () {
  var graph, talos;
  graph = null;
  talos = null;
  return [h.test("define graph", h.target("stable-sync", function () {
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
  })), h.test("define talos", h.target("stable-sync", function () {
    return talos = _index.Talos.make();
  })), h.test("run talos", h.target("stable-sync", function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc3RhYmxlL3N5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxJQUFBO0FBSUEsT0FBQSxDQUFBLElBQUEsR0FBQSxJQUFBLEdBQU8sU0FBQSxDQUFBLEVBQUE7RUFDUCxJQUFBLEtBQUEsRUFBQSxLQUFBO0VBQUUsS0FBQSxHQUFRLElBQUE7RUFDUixLQUFBLEdBQVEsSUFBQTtTQUVSLENBQ0UsQ0FBQyxDQUFDLElBQUYsQ0FBTyxjQUFQLEVBQXVCLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVCxFQUF3QixZQUFBO1dBQzdDLEtBQUEsR0FBUSxZQUFLLENBQUMsSUFBTixDQUNOO01BQUEsQ0FBRSxhQUFGLEdBQ0U7UUFBQSxLQUFBLEVBQU8sQ0FDTDtVQUFBLE1BQUEsRUFBUSxJQUFSO1VBQ0EsR0FBQSxFQUFLLElBREw7VUFFQSxJQUFBLEVBQU07UUFGTixDQURLO01BQVAsQ0FERjtNQU1BLENBQUEsRUFDRTtRQUFBLEtBQUEsRUFBTyxDQUNMO1VBQUEsTUFBQSxFQUFRLElBQVI7VUFDQSxHQUFBLEVBQUssU0FBQSxDQUFFLE9BQUYsRUFBQTttQkFDSCxPQUFPLENBQUMsT0FBUixHQUFrQiwwQkFBQTtVQURmLENBREw7VUFHQSxJQUFBLEVBQU07UUFITixDQURLO01BQVAsQ0FQRjtNQWFBLENBQUEsRUFDRTtRQUFBLEtBQUEsRUFBTyxDQUNIO1VBQUEsTUFBQSxFQUFRLEtBQVI7VUFDQSxHQUFBLEVBQUssU0FBQSxDQUFFLE9BQUYsRUFBQTttQkFDSCxPQUFPLENBQUMsT0FBUixHQUFrQixpQ0FBQTtVQURmLENBREw7VUFHQSxJQUFBLEVBQU07UUFITixDQURHLEVBTUg7VUFBQSxNQUFBLEVBQVEsSUFBUjtVQUNBLEdBQUEsRUFBSyxJQURMO1VBRUEsSUFBQSxFQUFNO1FBRk4sQ0FORztNQUFQO0lBZEYsQ0FETSxDQUFBO0VBRHFDLENBQXhCLENBQXZCLENBREYsRUE0QkUsQ0FBQyxDQUFDLElBQUYsQ0FBTyxjQUFQLEVBQXVCLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVCxFQUF3QixZQUFBO1dBQzdDLEtBQUEsR0FBUSxZQUFLLENBQUMsSUFBTixDQUFBLENBQUE7RUFEcUMsQ0FBeEIsQ0FBdkIsQ0E1QkYsRUErQkUsQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQLEVBQW9CLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVCxFQUF3QixZQUFBO0lBQzFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLGFBQWYsRUFBdUIsS0FBSyxDQUFDLEtBQTdCLENBQUE7SUFFQSxJQUFBLFVBQUEsRUFBSyxLQUFMLEVBQVksS0FBWixFQUFtQixJQUFuQixDQUFBO0lBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsR0FBZixFQUFvQixLQUFLLENBQUMsS0FBMUIsQ0FITjs7SUFNTSxJQUFBLFVBQUEsRUFBSyxLQUFMLEVBQVksS0FBWixFQUFtQixJQUFuQixDQUFBO0lBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsR0FBZixFQUFvQixLQUFLLENBQUMsS0FBMUIsQ0FBQTtJQUVBLElBQUEsVUFBQSxFQUFLLEtBQUwsRUFBWSxLQUFaLEVBQW1CLElBQW5CLENBQUE7SUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLEtBQUssQ0FBQyxLQUExQixDQUFBO0lBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsMEJBQWYsRUFBMkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUF6RCxDQUFBO0lBRUEsSUFBQSxVQUFBLEVBQUssS0FBTCxFQUFZLEtBQVosRUFBbUIsSUFBbkIsQ0FBQTtJQUNBLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBSyxDQUFDLE9BQWYsQ0FBQTtXQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLDBCQUFmLEVBQTJDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBekQsQ0FBQTtFQWhCMEMsQ0FBeEIsQ0FBcEIsQ0EvQkYsQztBQUpLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaCwgVGFsb3MsICRzdGFydCwgJGhhbHQgfSBmcm9tIFwiLi4vLi4vc3JjXCJcbmltcG9ydCB7IHN0ZXAgfSBmcm9tIFwiLi4vLi4vc3JjL3N0YWJsZS9zeW5jXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gLT5cbiAgZ3JhcGggPSBudWxsXG4gIHRhbG9zID0gbnVsbFxuXG4gIFtcbiAgICBoLnRlc3QgXCJkZWZpbmUgZ3JhcGhcIiwgaC50YXJnZXQgXCJzdGFibGUtc3luY1wiLCAtPlxuICAgICAgZ3JhcGggPSBHcmFwaC5tYWtlXG4gICAgICAgIFsgJHN0YXJ0IF06XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgcnVuOiBudWxsXG4gICAgICAgICAgICBtb3ZlOiBcIkFcIlxuICAgICAgICAgIF1cbiAgICAgICAgQTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiBcImdvXCJcbiAgICAgICAgICAgIHJ1bjogKCBjb250ZXh0ICkgLT5cbiAgICAgICAgICAgICAgY29udGV4dC5tZXNzYWdlID0gXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIlxuICAgICAgICAgICAgbW92ZTogXCJCXCJcbiAgICAgICAgICBdXG4gICAgICAgIEI6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgICAgYWNjZXB0OiBmYWxzZVxuICAgICAgICAgICAgICBydW46ICggY29udGV4dCApIC0+XG4gICAgICAgICAgICAgICAgY29udGV4dC5tZXNzYWdlID0gXCJ0aGlzIG92ZXJ3cml0ZSBzaG91bGRuJ3QgaGFwcGVuXCJcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgIF1cbiAgICBcbiAgICBoLnRlc3QgXCJkZWZpbmUgdGFsb3NcIiwgaC50YXJnZXQgXCJzdGFibGUtc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBUYWxvcy5tYWtlKClcblxuICAgIGgudGVzdCBcInJ1biB0YWxvc1wiLCBoLnRhcmdldCBcInN0YWJsZS1zeW5jXCIsIC0+XG4gICAgICBoLmFzc2VydC5lcXVhbCAkc3RhcnQsIHRhbG9zLnN0YXRlXG4gICAgICBcbiAgICAgIHN0ZXAgZ3JhcGgsIHRhbG9zLCBudWxsXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkFcIiwgdGFsb3Muc3RhdGVcblxuICAgICAgIyBJZ25vcmVzIHRyYW5zaXRpb25zIHRoYXQgZG9uJ3QgbWF0Y2hcbiAgICAgIHN0ZXAgZ3JhcGgsIHRhbG9zLCBudWxsXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkFcIiwgdGFsb3Muc3RhdGVcblxuICAgICAgc3RlcCBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJCXCIsIHRhbG9zLnN0YXRlXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcblxuICAgICAgc3RlcCBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQgdGFsb3Muc3VjY2Vzc1xuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG4gIF1cblxuZXhwb3J0IHsgdGVzdCBhcyBzeW5jIH0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=test/stable/sync.coffee