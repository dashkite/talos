"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.step = exports.run = exports.move = exports.matchVertex = exports.matchEdge = exports.debug = void 0;
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var _predicate = require("@dashkite/joy/predicate");
var _generic = require("@dashkite/joy/generic");
var _index = require("../containers/index.js");
var Errors = _interopRequireWildcard(require("../containers/errors.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _debug, _step, debug, matchEdge, matchVertex, move, run, step;
exports.matchVertex = matchVertex = function (graph, talos) {
  var vertex;
  vertex = graph.get(talos);
  if (vertex == null) {
    talos.throw(Errors.InvalidState.make("talos state is not in graph"));
  }
  return vertex;
};
exports.matchEdge = matchEdge = function (vertex, talos, transforms) {
  var edge, i, len, ref;
  ref = vertex.edges;
  for (i = 0, len = ref.length; i < len; i++) {
    edge = ref[i];
    if (edge.accept(talos, ...transforms) === true) {
      return edge;
    }
  }
};
exports.run = run = function (edge, talos, transforms) {
  var error;
  if (edge.run != null) {
    try {
      return edge.run(talos, ...transforms);
    } catch (error1) {
      error = error1;
      return talos.throw(Errors.FailedRun.make(error, "encountered an error while running edge function"));
    }
  }
};
exports.move = move = function (edge, talos, transforms) {
  var error;
  try {
    return edge.move(talos, ...transforms);
  } catch (error1) {
    error = error1;
    return talos.throw(Errors.FailedMove.make(error, "encountered an error while moving states"));
  }
};
exports.step = step = (0, _generic.generic)({
  name: "step talos",
  default: function (...args) {
    throw new Error(`step: input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(step, _index.Graph.isType, _index.Talos.isType, Type.isAny, function (graph, talos, ...transforms) {
  return _step(graph, talos, transforms);
});
(0, _generic.generic)(step, _index.Graph.isType, (0, _predicate.negate)(_index.Talos.isType), function (graph, ...transforms) {
  return step(graph, _index.Talos.make(), transforms);
});
_step = function (graph, talos, transforms) {
  var edge, vertex;
  vertex = matchVertex(graph, talos);
  if (talos.halted) {
    return talos;
  }
  edge = matchEdge(vertex, talos, transforms);
  if (edge == null) {
    return talos;
  }
  if (talos.halted) {
    return talos;
  }
  run(edge, talos, transforms);
  if (talos.halted) {
    return talos;
  }
  move(edge, talos, transforms);
  return talos;
};
exports.debug = debug = (0, _generic.generic)({
  name: "debug step talos",
  default: function (...args) {
    throw new Error(`debug step: input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(debug, _index.Graph.isType, _index.Talos.isType, Type.isAny, function (graph, talos, ...transforms) {
  return _debug(graph, talos, transforms);
});
(0, _generic.generic)(debug, _index.Graph.isType, (0, _predicate.negate)(_index.Talos.isType), function (graph, ...transforms) {
  return _debug(graph, _index.Talos.make(), transforms);
});
_debug = function (graph, talos, transforms) {
  var edge, vertex;
  console.log("starting step", {
    graph,
    talos,
    transforms
  });
  vertex = matchVertex(graph, talos);
  if (talos.halted) {
    console.error("encountered error matching vertex", talos.error.error, talos);
    return talos;
  } else {
    console.log("vertex matched", {
      vertex,
      talos
    });
  }
  edge = matchEdge(vertex, talos, transforms);
  if (edge == null) {
    console.log("no edge match, ignoring transforms");
    return talos;
  }
  if (talos.halted) {
    console.error("encountered error matching edge", talos.error.error, talos);
    return talos;
  } else {
    console.log("edge matched", {
      edge,
      talos
    });
  }
  run(edge, talos, transforms);
  if (talos.halted) {
    console.error("encountered error running edge function", talos.error.error, talos);
    return talos;
  } else {
    console.log("edge function complete", {
      talos
    });
  }
  move(edge, talos, transforms);
  if (talos.halted) {
    console.error("encountered error running move function", talos.error.error, talos);
    return talos;
  } else {
    console.log("talos move complete", {
      talos
    });
  }
  return talos;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdGFibGUvc3luYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxVQUFBLEdBQUEsT0FBQTtBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUE7QUFBQSxJQUFBLE1BQUEsR0FBQSxPQUFBO0FBQUEsSUFBQSxNQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQUEsU0FBQSx5QkFBQSxDQUFBLDZCQUFBLE9BQUEsbUJBQUEsQ0FBQSxPQUFBLE9BQUEsSUFBQSxDQUFBLE9BQUEsT0FBQSxZQUFBLHdCQUFBLFlBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQTtBQUFBLFNBQUEsd0JBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLFNBQUEsQ0FBQSxlQUFBLENBQUEsdUJBQUEsQ0FBQSx5QkFBQSxDQUFBLFdBQUEsT0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsd0JBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxTQUFBLFVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLElBQUEsTUFBQSxDQUFBLHdCQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsb0JBQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxJQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FB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b20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgbmVnYXRlIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvcHJlZGljYXRlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCB7IEdyYXBoLCBUYWxvcyB9IGZyb20gXCIuLi9jb250YWluZXJzXCJcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tIFwiLi4vY29udGFpbmVycy9lcnJvcnNcIlxuXG5cbm1hdGNoVmVydGV4ID0gKCBncmFwaCwgdGFsb3MgKSAtPlxuICB2ZXJ0ZXggPSBncmFwaC5nZXQgdGFsb3NcbiAgaWYgIXZlcnRleD9cbiAgICB0YWxvcy50aHJvdyBFcnJvcnMuSW52YWxpZFN0YXRlLm1ha2UgXCJ0YWxvcyBzdGF0ZSBpc1xuICAgICAgbm90IGluIGdyYXBoXCJcbiAgdmVydGV4XG5cbm1hdGNoRWRnZSA9ICggdmVydGV4LCB0YWxvcywgdHJhbnNmb3JtcyApIC0+XG4gIGZvciBlZGdlIGluIHZlcnRleC5lZGdlc1xuICAgIGlmICggZWRnZS5hY2NlcHQgdGFsb3MsIHRyYW5zZm9ybXMuLi4gKSA9PSB0cnVlXG4gICAgICByZXR1cm4gZWRnZVxuICByZXR1cm5cblxucnVuID0gKCBlZGdlLCB0YWxvcywgdHJhbnNmb3JtcyApIC0+XG4gIGlmIGVkZ2UucnVuP1xuICAgIHRyeVxuICAgICAgZWRnZS5ydW4gdGFsb3MsIHRyYW5zZm9ybXMuLi5cbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MudGhyb3cgRXJyb3JzLkZhaWxlZFJ1bi5tYWtlIGVycm9yLCBcbiAgICAgICAgXCJlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBydW5uaW5nIGVkZ2UgZnVuY3Rpb25cIlxuXG5tb3ZlID0gKCBlZGdlLCB0YWxvcywgdHJhbnNmb3JtcyApIC0+XG4gIHRyeVxuICAgIGVkZ2UubW92ZSB0YWxvcywgdHJhbnNmb3Jtcy4uLlxuICBjYXRjaCBlcnJvclxuICAgIHRhbG9zLnRocm93IEVycm9ycy5GYWlsZWRNb3ZlLm1ha2UgZXJyb3IsIFxuICAgICAgXCJlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBtb3Zpbmcgc3RhdGVzXCJcblxuXG5zdGVwID0gZ2VuZXJpYyBcbiAgbmFtZTogXCJzdGVwIHRhbG9zXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwic3RlcDogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIHN0ZXAsIEdyYXBoLmlzVHlwZSwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzQW55LCAoIGdyYXBoLCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIF9zdGVwIGdyYXBoLCB0YWxvcywgdHJhbnNmb3Jtc1xuXG5nZW5lcmljIHN0ZXAsIEdyYXBoLmlzVHlwZSwgKCBuZWdhdGUgVGFsb3MuaXNUeXBlICksICggZ3JhcGgsIHRyYW5zZm9ybXMuLi4gKSAtPlxuICBzdGVwIGdyYXBoLCBUYWxvcy5tYWtlKCksIHRyYW5zZm9ybXNcblxuXG5fc3RlcCA9ICggZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgdmVydGV4ID0gbWF0Y2hWZXJ0ZXggZ3JhcGgsIHRhbG9zXG4gIHJldHVybiB0YWxvcyBpZiB0YWxvcy5oYWx0ZWRcblxuICBlZGdlID0gbWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIHRyYW5zZm9ybXNcbiAgcmV0dXJuIHRhbG9zIGlmICFlZGdlP1xuICByZXR1cm4gdGFsb3MgaWYgdGFsb3MuaGFsdGVkXG5cbiAgcnVuIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIHJldHVybiB0YWxvcyBpZiB0YWxvcy5oYWx0ZWRcblxuICBtb3ZlIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIHRhbG9zXG5cblxuZGVidWcgPSBnZW5lcmljIFxuICBuYW1lOiBcImRlYnVnIHN0ZXAgdGFsb3NcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJkZWJ1ZyBzdGVwOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgZGVidWcsIEdyYXBoLmlzVHlwZSwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzQW55LCAoIGdyYXBoLCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIF9kZWJ1ZyBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXNcblxuZ2VuZXJpYyBkZWJ1ZywgR3JhcGguaXNUeXBlLCAoIG5lZ2F0ZSBUYWxvcy5pc1R5cGUgKSwgKCBncmFwaCwgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIF9kZWJ1ZyBncmFwaCwgVGFsb3MubWFrZSgpLCB0cmFuc2Zvcm1zXG5cblxuX2RlYnVnID0gKCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMgKSAtPlxuICBjb25zb2xlLmxvZyBcInN0YXJ0aW5nIHN0ZXBcIiwgeyBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMgfVxuXG4gIHZlcnRleCA9IG1hdGNoVmVydGV4IGdyYXBoLCB0YWxvc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgbWF0Y2hpbmcgdmVydGV4XCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJ2ZXJ0ZXggbWF0Y2hlZFwiLCB7IHZlcnRleCwgdGFsb3MgfVxuICBcbiAgZWRnZSA9IG1hdGNoRWRnZSB2ZXJ0ZXgsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIGlmICFlZGdlP1xuICAgIGNvbnNvbGUubG9nIFwibm8gZWRnZSBtYXRjaCwgaWdub3JpbmcgdHJhbnNmb3Jtc1wiXG4gICAgcmV0dXJuIHRhbG9zXG4gIGlmIHRhbG9zLmhhbHRlZFxuICAgIGNvbnNvbGUuZXJyb3IgXCJlbmNvdW50ZXJlZCBlcnJvciBtYXRjaGluZyBlZGdlXCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJlZGdlIG1hdGNoZWRcIiwgeyBlZGdlLCB0YWxvcyB9XG5cbiAgcnVuIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIGlmIHRhbG9zLmhhbHRlZFxuICAgIGNvbnNvbGUuZXJyb3IgXCJlbmNvdW50ZXJlZCBlcnJvciBydW5uaW5nIGVkZ2UgZnVuY3Rpb25cIiwgdGFsb3MuZXJyb3IuZXJyb3IsIHRhbG9zXG4gICAgcmV0dXJuIHRhbG9zXG4gIGVsc2VcbiAgICBjb25zb2xlLmxvZyBcImVkZ2UgZnVuY3Rpb24gY29tcGxldGVcIiwgeyB0YWxvcyB9XG5cbiAgbW92ZSBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgcnVubmluZyBtb3ZlIGZ1bmN0aW9uXCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJ0YWxvcyBtb3ZlIGNvbXBsZXRlXCIsIHsgdGFsb3MgfVxuXG4gIHRhbG9zXG5cblxuZXhwb3J0IHtcbiAgc3RlcFxuICBkZWJ1Z1xuXG4gIG1hdGNoVmVydGV4XG4gIG1hdGNoRWRnZSBcbiAgcnVuXG4gIG1vdmVcbn0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/stable/sync.coffee