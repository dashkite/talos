"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipe = exports.flow = void 0;
var Fn = _interopRequireWildcard(require("@dashkite/joy/function"));
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var _generic = require("@dashkite/joy/generic");
var _index = require("./containers/index.js");
var _states = require("./states.js");
var Sync = _interopRequireWildcard(require("./strict/sync.js"));
var Async = _interopRequireWildcard(require("./strict/async.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _flow, _pipe, buildGraph, check, flow, isFunctionArray, pipe;
buildGraph = function (fx) {
  var current, f, graph, i, j, len, next;
  graph = {};
  for (i = j = 0, len = fx.length; j < len; i = ++j) {
    f = fx[i];
    current = i === 0 ? _states.$start : `${i}`;
    next = i === fx.length - 1 ? _states.$halt : `${i + 1}`;
    graph[current] = [{
      accept: true,
      run: f,
      move: next
    }];
  }
  return _index.Graph.make(graph);
};
check = function (talos) {
  if (talos.error != null) {
    throw talos.error.error;
  }
};
isFunctionArray = function (fx) {
  var f, j, len;
  if (!Type.isArray(fx)) {
    return false;
  }
  for (j = 0, len = fx.length; j < len; j++) {
    f = fx[j];
    if (!Type.isFunction(f)) {
      return false;
    }
  }
  return true;
};
exports.pipe = pipe = (0, _generic.generic)({
  name: "talos pipe",
  default: function (...args) {
    throw new Error(`pipe: input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(pipe, isFunctionArray, function (fx) {
  return _pipe(fx);
});
_pipe = function (fx) {
  var drive, f, graph, talos;
  if (fx.length === 0) {
    return Fn.identity;
  }
  f = fx[0];
  graph = buildGraph(fx);
  talos = _index.Talos.make();
  drive = _index.Drive.make(graph, talos, Sync.step);
  return Fn.arity(f.length, function (...args) {
    var j, ref;
    drive.update(...args);
    check(talos);
    if (talos.halted) {
      return talos.context;
    }
    for (j = 1, ref = fx.length; 1 <= ref ? j < ref : j > ref; 1 <= ref ? j++ : j--) {
      drive.update();
      check(talos);
    }
    return talos.context;
  });
};
exports.flow = flow = (0, _generic.generic)({
  name: "talos flow",
  default: function (...args) {
    throw new Error(`flow: input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(flow, isFunctionArray, function (fx) {
  return _flow(fx);
});
_flow = function (fx) {
  var drive, f, graph, talos;
  if (fx.length === 0) {
    return async function (x) {
      return await x;
    };
  }
  f = fx[0];
  graph = buildGraph(fx);
  talos = _index.Talos.make();
  drive = _index.Drive.make(graph, talos, Async.step);
  return Fn.arity(f.length, async function (...args) {
    var j, ref;
    await drive.update(...args);
    check(talos);
    if (talos.halted) {
      return talos.context;
    }
    for (j = 1, ref = fx.length; 1 <= ref ? j < ref : j > ref; 1 <= ref ? j++ : j--) {
      await drive.update();
      check(talos);
    }
    return talos.context;
  });
};
//# sourceMappingURL=data:application/json;base64,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QTtBQVRNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBGbiBmcm9tIFwiQGRhc2hraXRlL2pveS9mdW5jdGlvblwiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0IHsgR3JhcGgsIFRhbG9zLCBEcml2ZSB9IGZyb20gXCIuL2NvbnRhaW5lcnNcIlxuaW1wb3J0IHsgJHN0YXJ0LCAkaGFsdCB9IGZyb20gXCIuL3N0YXRlc1wiXG5pbXBvcnQgKiBhcyBTeW5jIGZyb20gXCIuL3N0cmljdC9zeW5jXCJcbmltcG9ydCAqIGFzIEFzeW5jIGZyb20gXCIuL3N0cmljdC9hc3luY1wiXG5cblxuYnVpbGRHcmFwaCA9ICggZnggKSAtPlxuICBncmFwaCA9IHt9ICAgIFxuICBmb3IgZiwgaSBpbiBmeFxuICAgIGN1cnJlbnQgPSBpZiBpID09IDAgdGhlbiAkc3RhcnQgZWxzZSBcIiN7IGkgfVwiXG4gICAgbmV4dCA9IGlmIGkgPT0gZngubGVuZ3RoIC0gMSB0aGVuICRoYWx0IGVsc2UgXCIjeyBpICsgMSB9XCJcblxuICAgIGdyYXBoWyBjdXJyZW50IF0gPSBbXG4gICAgICBhY2NlcHQ6IHRydWVcbiAgICAgIHJ1bjogZlxuICAgICAgbW92ZTogbmV4dFxuICAgIF0gXG4gIFxuICBHcmFwaC5tYWtlIGdyYXBoXG5cbmNoZWNrID0gKCB0YWxvcyApIC0+XG4gIGlmIHRhbG9zLmVycm9yP1xuICAgIHRocm93IHRhbG9zLmVycm9yLmVycm9yXG5cbmlzRnVuY3Rpb25BcnJheSA9ICggZnggKSAtPlxuICBpZiAhIFR5cGUuaXNBcnJheSBmeFxuICAgIHJldHVybiBmYWxzZVxuICBmb3IgZiBpbiBmeFxuICAgIHJldHVybiBmYWxzZSBpZiAhIFR5cGUuaXNGdW5jdGlvbiBmXG4gIHRydWVcblxuXG5cbnBpcGUgPSBnZW5lcmljIFxuICBuYW1lOiBcInRhbG9zIHBpcGVcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJwaXBlOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgcGlwZSwgaXNGdW5jdGlvbkFycmF5LCAoIGZ4ICkgLT5cbiAgX3BpcGUgZnhcblxuX3BpcGUgPSAoIGZ4ICkgLT5cbiAgaWYgZngubGVuZ3RoID09IDBcbiAgICByZXR1cm4gRm4uaWRlbnRpdHlcbiAgXG4gIGYgPSBmeFsgMCBdXG4gIGdyYXBoID0gYnVpbGRHcmFwaCBmeFxuICB0YWxvcyA9IFRhbG9zLm1ha2UoKVxuICBkcml2ZSA9IERyaXZlLm1ha2UgZ3JhcGgsIHRhbG9zLCBTeW5jLnN0ZXBcblxuICBGbi5hcml0eSBmLmxlbmd0aCwgKCBhcmdzLi4uICkgLT5cbiAgICBkcml2ZS51cGRhdGUgYXJncy4uLlxuICAgIGNoZWNrIHRhbG9zXG4gICAgaWYgdGFsb3MuaGFsdGVkXG4gICAgICByZXR1cm4gdGFsb3MuY29udGV4dFxuXG4gICAgZm9yIFsgMSAuLi4gZngubGVuZ3RoIF1cbiAgICAgIGRyaXZlLnVwZGF0ZSgpXG4gICAgICBjaGVjayB0YWxvc1xuXG4gICAgdGFsb3MuY29udGV4dFxuXG5cblxuZmxvdyA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidGFsb3MgZmxvd1wiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcImZsb3c6IGlucHV0IGlzIG1hbGZvcm1lZCAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuZ2VuZXJpYyBmbG93LCBpc0Z1bmN0aW9uQXJyYXksICggZnggKSAtPlxuICBfZmxvdyBmeFxuXG5fZmxvdyA9ICggZnggKSAtPlxuICBpZiBmeC5sZW5ndGggPT0gMFxuICAgIHJldHVybiAoIHggKSAtPiBhd2FpdCB4XG4gIFxuICBmID0gZnhbIDAgXVxuICBncmFwaCA9IGJ1aWxkR3JhcGggZnhcbiAgdGFsb3MgPSBUYWxvcy5tYWtlKClcbiAgZHJpdmUgPSBEcml2ZS5tYWtlIGdyYXBoLCB0YWxvcywgQXN5bmMuc3RlcFxuXG4gIEZuLmFyaXR5IGYubGVuZ3RoLCAoIGFyZ3MuLi4gKSAtPlxuICAgIGF3YWl0IGRyaXZlLnVwZGF0ZSBhcmdzLi4uXG4gICAgY2hlY2sgdGFsb3NcbiAgICBpZiB0YWxvcy5oYWx0ZWRcbiAgICAgIHJldHVybiB0YWxvcy5jb250ZXh0XG5cbiAgICBmb3IgWyAxIC4uLiBmeC5sZW5ndGggXVxuICAgICAgYXdhaXQgZHJpdmUudXBkYXRlKClcbiAgICAgIGNoZWNrIHRhbG9zXG5cbiAgICB0YWxvcy5jb250ZXh0XG5cblxuZXhwb3J0IHtcbiAgcGlwZVxuICBmbG93XG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/linear.coffee