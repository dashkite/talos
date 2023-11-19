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
exports.matchEdge = matchEdge = async function (vertex, talos, transforms) {
  var edge, i, len, ref;
  ref = vertex.edges;
  for (i = 0, len = ref.length; i < len; i++) {
    edge = ref[i];
    if ((await edge.accept(talos, ...transforms)) === true) {
      return edge;
    }
  }
};
exports.run = run = async function (edge, talos, transforms) {
  var error;
  if (edge.run != null) {
    try {
      return await edge.run(talos, ...transforms);
    } catch (error1) {
      error = error1;
      return talos.throw(Errors.FailedRun.make(error, "encountered an error while running edge function"));
    }
  }
};
exports.move = move = async function (edge, talos, transforms) {
  var error;
  try {
    return await edge.move(talos, ...transforms);
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
_step = async function (graph, talos, transforms) {
  var edge, vertex;
  vertex = matchVertex(graph, talos);
  if (talos.halted) {
    return talos;
  }
  edge = await matchEdge(vertex, talos, transforms);
  if (edge == null) {
    return talos;
  }
  if (talos.halted) {
    return talos;
  }
  await run(edge, talos, transforms);
  if (talos.halted) {
    return talos;
  }
  await move(edge, talos, transforms);
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
_debug = async function (graph, talos, transforms) {
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
  edge = await matchEdge(vertex, talos, transforms);
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
  await run(edge, talos, transforms);
  if (talos.halted) {
    console.error("encountered error running edge function", talos.error.error, talos);
    return talos;
  } else {
    console.log("edge function complete", {
      talos
    });
  }
  await move(edge, talos, transforms);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdGFibGUvYXN5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUEsSUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQTtBQUNBLElBQUEsVUFBQSxHQUFBLE9BQUE7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBO0FBQUEsSUFBQSxNQUFBLEdBQUEsT0FBQTtBQUFBLElBQUEsTUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQTtBQUFBLFNBQUEseUJBQUEsQ0FBQSw2QkFBQSxPQUFBLG1CQUFBLENBQUEsT0FBQSxPQUFBLElBQUEsQ0FBQSxPQUFBLE9BQUEsWUFBQSx3QkFBQSxZQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUE7QUFBQSxTQUFBLHdCQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsVUFBQSxTQUFBLENBQUEsZUFBQSxDQUFBLHVCQUFBLENBQUEseUJBQUEsQ0FBQSxXQUFBLE9BQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLHdCQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsU0FBQSxVQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxJQUFBLE1BQUEsQ0FBQSx3QkFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLG9CQUFBLENBQUEsSUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSx3QkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENB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OztTQU1BLEtBQUE7QUFsQ08sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBuZWdhdGUgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9wcmVkaWNhdGVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0IHsgR3JhcGgsIFRhbG9zIH0gZnJvbSBcIi4uL2NvbnRhaW5lcnNcIlxuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gXCIuLi9jb250YWluZXJzL2Vycm9yc1wiXG5cblxubWF0Y2hWZXJ0ZXggPSAoIGdyYXBoLCB0YWxvcyApIC0+XG4gIHZlcnRleCA9IGdyYXBoLmdldCB0YWxvc1xuICBpZiAhdmVydGV4P1xuICAgIHRhbG9zLnRocm93IEVycm9ycy5JbnZhbGlkU3RhdGUubWFrZSBcInRhbG9zIHN0YXRlIGlzIG5vdFxuICAgICAgaW4gZ3JhcGhcIlxuICB2ZXJ0ZXhcblxubWF0Y2hFZGdlID0gKCB2ZXJ0ZXgsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgaWYgKCBhd2FpdCBlZGdlLmFjY2VwdCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApID09IHRydWVcbiAgICAgIHJldHVybiBlZGdlXG4gIHJldHVyblxuXG5ydW4gPSAoIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgaWYgZWRnZS5ydW4/XG4gICAgdHJ5XG4gICAgICBhd2FpdCBlZGdlLnJ1biB0YWxvcywgdHJhbnNmb3Jtcy4uLlxuICAgIGNhdGNoIGVycm9yXG4gICAgICB0YWxvcy50aHJvdyBFcnJvcnMuRmFpbGVkUnVuLm1ha2UgZXJyb3IsIFxuICAgICAgICBcImVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIHJ1bm5pbmcgZWRnZSBmdW5jdGlvblwiXG5cbm1vdmUgPSAoIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgdHJ5XG4gICAgYXdhaXQgZWRnZS5tb3ZlIHRhbG9zLCB0cmFuc2Zvcm1zLi4uXG4gIGNhdGNoIGVycm9yXG4gICAgdGFsb3MudGhyb3cgRXJyb3JzLkZhaWxlZE1vdmUubWFrZSBlcnJvciwgXG4gICAgICBcImVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIG1vdmluZyBzdGF0ZXNcIlxuXG5cbnN0ZXAgPSBnZW5lcmljIFxuICBuYW1lOiBcInN0ZXAgdGFsb3NcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJzdGVwOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgc3RlcCwgR3JhcGguaXNUeXBlLCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNBbnksICggZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zLi4uICkgLT5cbiAgX3N0ZXAgZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zXG5cbmdlbmVyaWMgc3RlcCwgR3JhcGguaXNUeXBlLCAoIG5lZ2F0ZSBUYWxvcy5pc1R5cGUgKSwgKCBncmFwaCwgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIHN0ZXAgZ3JhcGgsIFRhbG9zLm1ha2UoKSwgdHJhbnNmb3Jtc1xuXG5cbl9zdGVwID0gKCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMgKSAtPlxuICB2ZXJ0ZXggPSBtYXRjaFZlcnRleCBncmFwaCwgdGFsb3NcbiAgcmV0dXJuIHRhbG9zIGlmIHRhbG9zLmhhbHRlZFxuXG4gIGVkZ2UgPSBhd2FpdCBtYXRjaEVkZ2UgdmVydGV4LCB0YWxvcywgdHJhbnNmb3Jtc1xuICByZXR1cm4gdGFsb3MgaWYgIWVkZ2U/XG4gIHJldHVybiB0YWxvcyBpZiB0YWxvcy5oYWx0ZWRcblxuICBhd2FpdCBydW4gZWRnZSwgdGFsb3MsIHRyYW5zZm9ybXNcbiAgcmV0dXJuIHRhbG9zIGlmIHRhbG9zLmhhbHRlZFxuXG4gIGF3YWl0IG1vdmUgZWRnZSwgdGFsb3MsIHRyYW5zZm9ybXNcbiAgdGFsb3NcblxuXG5cbmRlYnVnID0gZ2VuZXJpYyBcbiAgbmFtZTogXCJkZWJ1ZyBzdGVwIHRhbG9zXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwiZGVidWcgc3RlcDogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIGRlYnVnLCBHcmFwaC5pc1R5cGUsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0FueSwgKCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMuLi4gKSAtPlxuICBfZGVidWcgZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zXG5cbmdlbmVyaWMgZGVidWcsIEdyYXBoLmlzVHlwZSwgKCBuZWdhdGUgVGFsb3MuaXNUeXBlICksICggZ3JhcGgsIHRyYW5zZm9ybXMuLi4gKSAtPlxuICBfZGVidWcgZ3JhcGgsIFRhbG9zLm1ha2UoKSwgdHJhbnNmb3Jtc1xuXG5cbl9kZWJ1ZyA9ICggZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgY29uc29sZS5sb2cgXCJzdGFydGluZyBzdGVwXCIsIHsgZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zIH1cblxuICB2ZXJ0ZXggPSBtYXRjaFZlcnRleCBncmFwaCwgdGFsb3NcbiAgaWYgdGFsb3MuaGFsdGVkXG4gICAgY29uc29sZS5lcnJvciBcImVuY291bnRlcmVkIGVycm9yIG1hdGNoaW5nIHZlcnRleFwiLCB0YWxvcy5lcnJvci5lcnJvciwgdGFsb3NcbiAgICByZXR1cm4gdGFsb3NcbiAgZWxzZVxuICAgIGNvbnNvbGUubG9nIFwidmVydGV4IG1hdGNoZWRcIiwgeyB2ZXJ0ZXgsIHRhbG9zIH1cbiAgXG4gIGVkZ2UgPSBhd2FpdCBtYXRjaEVkZ2UgdmVydGV4LCB0YWxvcywgdHJhbnNmb3Jtc1xuICBpZiAhZWRnZT9cbiAgICBjb25zb2xlLmxvZyBcIm5vIGVkZ2UgbWF0Y2gsIGlnbm9yaW5nIHRyYW5zZm9ybXNcIlxuICAgIHJldHVybiB0YWxvc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgbWF0Y2hpbmcgZWRnZVwiLCB0YWxvcy5lcnJvci5lcnJvciwgdGFsb3NcbiAgICByZXR1cm4gdGFsb3NcbiAgZWxzZVxuICAgIGNvbnNvbGUubG9nIFwiZWRnZSBtYXRjaGVkXCIsIHsgZWRnZSwgdGFsb3MgfVxuXG4gIGF3YWl0IHJ1biBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgcnVubmluZyBlZGdlIGZ1bmN0aW9uXCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJlZGdlIGZ1bmN0aW9uIGNvbXBsZXRlXCIsIHsgdGFsb3MgfVxuXG4gIGF3YWl0IG1vdmUgZWRnZSwgdGFsb3MsIHRyYW5zZm9ybXNcbiAgaWYgdGFsb3MuaGFsdGVkXG4gICAgY29uc29sZS5lcnJvciBcImVuY291bnRlcmVkIGVycm9yIHJ1bm5pbmcgbW92ZSBmdW5jdGlvblwiLCB0YWxvcy5lcnJvci5lcnJvciwgdGFsb3NcbiAgICByZXR1cm4gdGFsb3NcbiAgZWxzZVxuICAgIGNvbnNvbGUubG9nIFwidGFsb3MgbW92ZSBjb21wbGV0ZVwiLCB7IHRhbG9zIH1cblxuICB0YWxvc1xuXG5cblxuZXhwb3J0IHtcbiAgc3RlcFxuICBkZWJ1Z1xuXG4gIG1hdGNoVmVydGV4XG4gIG1hdGNoRWRnZSBcbiAgcnVuXG4gIG1vdmVcbn0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/stable/async.coffee