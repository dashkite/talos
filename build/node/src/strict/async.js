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
  return talos.throw(Errors.MissingTransition.make("no edge matches transforms"));
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
(0, _generic.generic)(step, _index.Graph.isType, _index.Talos.isType, function (graph, talos) {
  return _step(graph, talos, []);
});
(0, _generic.generic)(step, _index.Graph.isType, (0, _predicate.negate)(_index.Talos.isType), function (graph, ...transforms) {
  return _step(graph, _index.Talos.make(), transforms);
});
_step = async function (graph, talos, transforms) {
  var edge, vertex;
  vertex = matchVertex(graph, talos);
  if (talos.halted) {
    return talos;
  }
  edge = await matchEdge(vertex, talos, transforms);
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
(0, _generic.generic)(debug, _index.Graph.isType, _index.Talos.isType, function (graph, talos) {
  return _debug(graph, talos, []);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdHJpY3QvYXN5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUEsSUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQTtBQUNBLElBQUEsVUFBQSxHQUFBLE9BQUE7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBO0FBQUEsSUFBQSxNQUFBLEdBQUEsT0FBQTtBQUFBLElBQUEsTUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQTtBQUFBLFNBQUEseUJBQUEsQ0FBQSw2QkFBQSxPQUFBLG1CQUFBLENBQUEsT0FBQSxPQUFBLElBQUEsQ0FBQSxPQUFBLE9BQUEsWUFBQSx3QkFBQSxZQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUE7QUFBQSxTQUFBLHdCQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsVUFBQSxTQUFBLENBQUEsZUFBQSxDQUFBLHVCQUFBLENBQUEseUJBQUEsQ0FBQSxXQUFBLE9BQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLHdCQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsU0FBQSxVQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxJQUFBLE1BQUEsQ0FBQSx3QkFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLG9CQUFBLENBQUEsSUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSx3QkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENB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QVosRUFBc0M7TUFBRTtJQUFGLENBQXRDLENBSkY7O0VBTUEsTUFBTSxJQUFBLENBQUssSUFBTCxFQUFXLEtBQVgsRUFBa0IsVUFBbEIsQ0FBQTtFQUNOLElBQUcsS0FBSyxDQUFDLE1BQVQsRUFBQTtJQUNFLE9BQU8sQ0FBQyxLQUFSLENBQWMseUNBQWQsRUFBeUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFyRSxFQUE0RSxLQUE1RSxDQUFBO0lBQ0EsT0FBTyxLQUZUO0dBQUEsTUFBQTtJQUlFLE9BQU8sQ0FBQyxHQUFSLENBQVkscUJBQVosRUFBbUM7TUFBRTtJQUFGLENBQW5DLENBSkY7O1NBTUEsS0FBQTtBQS9CTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IG5lZ2F0ZSB9IGZyb20gXCJAZGFzaGtpdGUvam95L3ByZWRpY2F0ZVwiXG5pbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5pbXBvcnQgeyBHcmFwaCwgVGFsb3MgfSBmcm9tIFwiLi4vY29udGFpbmVyc1wiXG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSBcIi4uL2NvbnRhaW5lcnMvZXJyb3JzXCJcblxuXG5tYXRjaFZlcnRleCA9ICggZ3JhcGgsIHRhbG9zICkgLT5cbiAgdmVydGV4ID0gZ3JhcGguZ2V0IHRhbG9zXG4gIGlmICF2ZXJ0ZXg/XG4gICAgdGFsb3MudGhyb3cgRXJyb3JzLkludmFsaWRTdGF0ZS5tYWtlIFwidGFsb3Mgc3RhdGUgaXMgbm90XG4gICAgICBpbiBncmFwaFwiXG4gIHZlcnRleFxuXG5tYXRjaEVkZ2UgPSAoIHZlcnRleCwgdGFsb3MsIHRyYW5zZm9ybXMgKSAtPlxuICBmb3IgZWRnZSBpbiB2ZXJ0ZXguZWRnZXNcbiAgICBpZiAoIGF3YWl0IGVkZ2UuYWNjZXB0IHRhbG9zLCB0cmFuc2Zvcm1zLi4uICkgPT0gdHJ1ZVxuICAgICAgcmV0dXJuIGVkZ2VcbiAgdGFsb3MudGhyb3cgRXJyb3JzLk1pc3NpbmdUcmFuc2l0aW9uLm1ha2UgXCJubyBlZGdlIG1hdGNoZXMgdHJhbnNmb3Jtc1wiXG5cbnJ1biA9ICggZWRnZSwgdGFsb3MsIHRyYW5zZm9ybXMgKSAtPlxuICBpZiBlZGdlLnJ1bj9cbiAgICB0cnlcbiAgICAgIGF3YWl0IGVkZ2UucnVuIHRhbG9zLCB0cmFuc2Zvcm1zLi4uXG4gICAgY2F0Y2ggZXJyb3JcbiAgICAgIHRhbG9zLnRocm93IEVycm9ycy5GYWlsZWRSdW4ubWFrZSBlcnJvciwgXG4gICAgICAgIFwiZW5jb3VudGVyZWQgYW4gZXJyb3Igd2hpbGUgcnVubmluZyBlZGdlIGZ1bmN0aW9uXCJcblxubW92ZSA9ICggZWRnZSwgdGFsb3MsIHRyYW5zZm9ybXMgKSAtPlxuICB0cnlcbiAgICBhd2FpdCBlZGdlLm1vdmUgdGFsb3MsIHRyYW5zZm9ybXMuLi5cbiAgY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy50aHJvdyBFcnJvcnMuRmFpbGVkTW92ZS5tYWtlIGVycm9yLCBcbiAgICAgIFwiZW5jb3VudGVyZWQgYW4gZXJyb3Igd2hpbGUgbW92aW5nIHN0YXRlc1wiXG5cblxuc3RlcCA9IGdlbmVyaWMgXG4gIG5hbWU6IFwic3RlcCB0YWxvc1wiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcInN0ZXA6IGlucHV0IGlzIG1hbGZvcm1lZCAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuZ2VuZXJpYyBzdGVwLCBHcmFwaC5pc1R5cGUsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0FueSwgKCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMuLi4gKSAtPlxuICBfc3RlcCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXNcblxuZ2VuZXJpYyBzdGVwLCBHcmFwaC5pc1R5cGUsIFRhbG9zLmlzVHlwZSwgKCBncmFwaCwgdGFsb3MgKSAtPlxuICBfc3RlcCBncmFwaCwgdGFsb3MsIFtdXG5cbmdlbmVyaWMgc3RlcCwgR3JhcGguaXNUeXBlLCAoIG5lZ2F0ZSBUYWxvcy5pc1R5cGUgKSwgKCBncmFwaCwgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIF9zdGVwIGdyYXBoLCBUYWxvcy5tYWtlKCksIHRyYW5zZm9ybXNcblxuXG5fc3RlcCA9ICggZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgdmVydGV4ID0gbWF0Y2hWZXJ0ZXggZ3JhcGgsIHRhbG9zXG4gIHJldHVybiB0YWxvcyBpZiB0YWxvcy5oYWx0ZWRcblxuICBlZGdlID0gYXdhaXQgbWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIHRyYW5zZm9ybXNcbiAgcmV0dXJuIHRhbG9zIGlmIHRhbG9zLmhhbHRlZFxuXG4gIGF3YWl0IHJ1biBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICByZXR1cm4gdGFsb3MgaWYgdGFsb3MuaGFsdGVkXG5cbiAgYXdhaXQgbW92ZSBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICB0YWxvc1xuXG5cblxuZGVidWcgPSBnZW5lcmljIFxuICBuYW1lOiBcImRlYnVnIHN0ZXAgdGFsb3NcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJkZWJ1ZyBzdGVwOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgZGVidWcsIEdyYXBoLmlzVHlwZSwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzQW55LCAoIGdyYXBoLCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIF9kZWJ1ZyBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXNcblxuZ2VuZXJpYyBkZWJ1ZywgR3JhcGguaXNUeXBlLCBUYWxvcy5pc1R5cGUsICggZ3JhcGgsIHRhbG9zICkgLT5cbiAgX2RlYnVnIGdyYXBoLCB0YWxvcywgW11cblxuZ2VuZXJpYyBkZWJ1ZywgR3JhcGguaXNUeXBlLCAoIG5lZ2F0ZSBUYWxvcy5pc1R5cGUgKSwgKCBncmFwaCwgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIF9kZWJ1ZyBncmFwaCwgVGFsb3MubWFrZSgpLCB0cmFuc2Zvcm1zXG5cblxuX2RlYnVnID0gKCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMgKSAtPlxuICBjb25zb2xlLmxvZyBcInN0YXJ0aW5nIHN0ZXBcIiwgeyBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMgfVxuXG4gIHZlcnRleCA9IG1hdGNoVmVydGV4IGdyYXBoLCB0YWxvc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgbWF0Y2hpbmcgdmVydGV4XCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJ2ZXJ0ZXggbWF0Y2hlZFwiLCB7IHZlcnRleCwgdGFsb3MgfVxuICBcbiAgZWRnZSA9IGF3YWl0IG1hdGNoRWRnZSB2ZXJ0ZXgsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIGlmIHRhbG9zLmhhbHRlZFxuICAgIGNvbnNvbGUuZXJyb3IgXCJlbmNvdW50ZXJlZCBlcnJvciBtYXRjaGluZyBlZGdlXCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJlZGdlIG1hdGNoZWRcIiwgeyBlZGdlLCB0YWxvcyB9XG5cbiAgYXdhaXQgcnVuIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIGlmIHRhbG9zLmhhbHRlZFxuICAgIGNvbnNvbGUuZXJyb3IgXCJlbmNvdW50ZXJlZCBlcnJvciBydW5uaW5nIGVkZ2UgZnVuY3Rpb25cIiwgdGFsb3MuZXJyb3IuZXJyb3IsIHRhbG9zXG4gICAgcmV0dXJuIHRhbG9zXG4gIGVsc2VcbiAgICBjb25zb2xlLmxvZyBcImVkZ2UgZnVuY3Rpb24gY29tcGxldGVcIiwgeyB0YWxvcyB9XG5cbiAgYXdhaXQgbW92ZSBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgcnVubmluZyBtb3ZlIGZ1bmN0aW9uXCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJ0YWxvcyBtb3ZlIGNvbXBsZXRlXCIsIHsgdGFsb3MgfVxuXG4gIHRhbG9zXG5cblxuXG5leHBvcnQge1xuICBzdGVwXG4gIGRlYnVnXG5cbiAgbWF0Y2hWZXJ0ZXhcbiAgbWF0Y2hFZGdlIFxuICBydW5cbiAgbW92ZVxufSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=src/strict/async.coffee