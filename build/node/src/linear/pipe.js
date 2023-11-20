"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipe = void 0;
var Fn = _interopRequireWildcard(require("@dashkite/joy/function"));
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var _generic = require("@dashkite/joy/generic");
var _index = require("../containers/index.js");
var Sync = _interopRequireWildcard(require("../strict/sync.js"));
var h = _interopRequireWildcard(require("./helpers.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _pipe, debug, finished, pipe;
exports.pipe = pipe = (0, _generic.generic)({
  name: "talos pipe",
  default: function (...args) {
    throw new Error(`pipe: input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(pipe, h.isFunctionArray, function (fx) {
  return _pipe({}, fx);
});
(0, _generic.generic)(pipe, Type.isObject, h.isFunctionArray, function (options, fx) {
  return _pipe(options, fx);
});
_pipe = function (options, fx) {
  var drive, f, graph, step, talos;
  if (fx.length === 0) {
    if (options.debug === true) {
      console.log("[ pipe ] empty function list, mapping to no-op");
    }
    return Fn.identity;
  }
  f = fx[0];
  graph = _index.Graph.make(h.expand(fx));
  talos = _index.Talos.make();
  step = options.debug === true ? debug : Sync.step;
  drive = _index.Drive.make(graph, talos, step);
  return Fn.arity(f.length, function (...args) {
    drive.update(...args);
    while (true) {
      h.check(talos);
      if (talos.halted) {
        return talos.context;
      }
      drive.update();
    }
  });
};
finished = h.finished("pipe");
debug = function (graph, talos, ...transforms) {
  var edge, name, vertex;
  vertex = Sync.matchVertex(graph, talos);
  name = h.nameVertex(vertex);
  if (finished(talos)) {
    return talos;
  }
  edge = Sync.matchEdge(vertex, talos, transforms);
  if (finished(talos)) {
    return talos;
  }
  console.log(`[ pipe ] starting step ${name}`, talos.context);
  if (transforms.length > 0) {
    console.log("arguments", ...transforms);
  }
  Sync.run(edge, talos, transforms);
  if (finished(talos)) {
    return talos;
  }
  console.log(`[ pipe ] finished step ${name}`);
  Sync.move(edge, talos, transforms);
  if (finished(talos)) {
    return talos;
  }
  return talos;
};
//# sourceMappingURL=data:application/json;base64,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Z0IsUUFBQSxDQUFTLEtBQVQsQ0FBaEIsRUFBQTtJQUFBLE9BQU8sS0FBUDs7RUFFQSxJQUFBLEdBQU8sSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLEtBQXZCLEVBQThCLFVBQTlCLENBQUE7RUFDUCxJQUFnQixRQUFBLENBQVMsS0FBVCxDQUFoQixFQUFBO0lBQUEsT0FBTyxLQUFQOztFQUVBLE9BQU8sQ0FBQyxHQUFSLENBQVksMEJBQUEsSUFBQSxFQUFaLEVBQWdELEtBQUssQ0FBQyxPQUF0RCxDQUFBO0VBQ0EsSUFBRyxVQUFVLENBQUMsTUFBWCxHQUFvQixDQUF2QixFQUFBO0lBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLEdBQUEsVUFBekIsQ0FERjs7RUFFQSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCLFVBQXRCLENBQUE7RUFDQSxJQUFnQixRQUFBLENBQVMsS0FBVCxDQUFoQixFQUFBO0lBQUEsT0FBTyxLQUFQOztFQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksMEJBQUEsSUFBQSxFQUFaLENBQUE7RUFFQSxJQUFJLENBQUMsSUFBTCxDQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUIsVUFBdkIsQ0FBQTtFQUNBLElBQWdCLFFBQUEsQ0FBUyxLQUFULENBQWhCLEVBQUE7SUFBQSxPQUFPLEtBQVA7O1NBQ0EsS0FBQTtBQWpCTSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRm4gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZnVuY3Rpb25cIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCB7IEdyYXBoLCBUYWxvcywgRHJpdmUgfSBmcm9tIFwiLi4vY29udGFpbmVyc1wiXG5pbXBvcnQgKiBhcyBTeW5jIGZyb20gXCIuLi9zdHJpY3Qvc3luY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuL2hlbHBlcnNcIlxuXG5cbnBpcGUgPSBnZW5lcmljIFxuICBuYW1lOiBcInRhbG9zIHBpcGVcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJwaXBlOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgcGlwZSwgaC5pc0Z1bmN0aW9uQXJyYXksICggZnggKSAtPlxuICBfcGlwZSB7fSwgZnhcblxuZ2VuZXJpYyBwaXBlLCBUeXBlLmlzT2JqZWN0LCBoLmlzRnVuY3Rpb25BcnJheSwgKCBvcHRpb25zLCBmeCApIC0+XG4gIF9waXBlIG9wdGlvbnMsIGZ4XG5cbl9waXBlID0gKCBvcHRpb25zLCBmeCApIC0+XG4gIGlmIGZ4Lmxlbmd0aCA9PSAwXG4gICAgaWYgb3B0aW9ucy5kZWJ1ZyA9PSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyBcIlsgcGlwZSBdIGVtcHR5IGZ1bmN0aW9uIGxpc3QsIG1hcHBpbmcgdG8gbm8tb3BcIlxuICAgIHJldHVybiBGbi5pZGVudGl0eVxuICBcbiAgZiA9IGZ4WyAwIF1cbiAgZ3JhcGggPSBHcmFwaC5tYWtlIGguZXhwYW5kIGZ4XG4gIHRhbG9zID0gVGFsb3MubWFrZSgpXG4gIHN0ZXAgPSBpZiBvcHRpb25zLmRlYnVnID09IHRydWUgdGhlbiBkZWJ1ZyBlbHNlIFN5bmMuc3RlcFxuICBkcml2ZSA9IERyaXZlLm1ha2UgZ3JhcGgsIHRhbG9zLCBzdGVwXG5cbiAgRm4uYXJpdHkgZi5sZW5ndGgsICggYXJncy4uLiApIC0+XG4gICAgZHJpdmUudXBkYXRlIGFyZ3MuLi5cbiAgICBsb29wXG4gICAgICBoLmNoZWNrIHRhbG9zXG4gICAgICByZXR1cm4gdGFsb3MuY29udGV4dCBpZiB0YWxvcy5oYWx0ZWRcbiAgICAgIGRyaXZlLnVwZGF0ZSgpXG5cblxuZmluaXNoZWQgPSBoLmZpbmlzaGVkIFwicGlwZVwiXG5cbmRlYnVnID0gKCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMuLi4gKSAtPlxuICB2ZXJ0ZXggPSBTeW5jLm1hdGNoVmVydGV4IGdyYXBoLCB0YWxvc1xuICBuYW1lID0gaC5uYW1lVmVydGV4IHZlcnRleFxuICByZXR1cm4gdGFsb3MgaWYgZmluaXNoZWQgdGFsb3NcblxuICBlZGdlID0gU3luYy5tYXRjaEVkZ2UgdmVydGV4LCB0YWxvcywgdHJhbnNmb3Jtc1xuICByZXR1cm4gdGFsb3MgaWYgZmluaXNoZWQgdGFsb3NcblxuICBjb25zb2xlLmxvZyBcIlsgcGlwZSBdIHN0YXJ0aW5nIHN0ZXAgI3sgbmFtZSB9XCIsIHRhbG9zLmNvbnRleHRcbiAgaWYgdHJhbnNmb3Jtcy5sZW5ndGggPiAwXG4gICAgY29uc29sZS5sb2cgXCJhcmd1bWVudHNcIiwgdHJhbnNmb3Jtcy4uLlxuICBTeW5jLnJ1biBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICByZXR1cm4gdGFsb3MgaWYgZmluaXNoZWQgdGFsb3NcbiAgY29uc29sZS5sb2cgXCJbIHBpcGUgXSBmaW5pc2hlZCBzdGVwICN7IG5hbWUgfVwiXG5cbiAgU3luYy5tb3ZlIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIHJldHVybiB0YWxvcyBpZiBmaW5pc2hlZCB0YWxvc1xuICB0YWxvc1xuXG5cblxuZXhwb3J0IHtcbiAgcGlwZVxufSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=src/linear/pipe.coffee