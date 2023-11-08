"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graph = void 0;
var Meta = _interopRequireWildcard(require("@dashkite/joy/metaclass"));
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var _vertex = require("./vertex.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Graph, verify;
verify = function (ax) {
  var a, i, len, results;
  if (Type.isArray(ax)) {
    results = [];
    for (i = 0, len = ax.length; i < len; i++) {
      a = ax[i];
      if (_vertex.Vertex.isType(a)) {
        results.push(a);
      } else if (Type.isObject(a)) {
        results.push(_vertex.Vertex.create(a));
      } else {
        throw new Error("Graph.create: array must include only vertices or vertex definitions");
      }
    }
    return results;
  } else {
    throw new Error("Graph.create: input is malformed");
  }
};
exports.Graph = Graph = function () {
  class Graph {
    constructor({
      graph
    }) {
      this.graph = graph;
    }
    static create(ax) {
      return new Graph({
        graph: verify(ax)
      });
    }
    selectSync(talos) {
      var i, len, ref, vertex;
      ref = this.graph;
      for (i = 0, len = ref.length; i < len; i++) {
        vertex = ref[i];
        if (vertex.test(talos) === true) {
          return vertex;
        }
      }
    }
    async selectAsync(talos) {
      var i, len, ref, vertex;
      ref = this.graph;
      for (i = 0, len = ref.length; i < len; i++) {
        vertex = ref[i];
        if ((await vertex.test(talos)) === true) {
          return vertex;
        }
      }
    }
  }
  ;
  Meta.mixin(Graph.prototype, [Meta.getters({})]);
  Graph.isType = Type.isType(Graph);
  return Graph;
}.call(void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL2dyYXBoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBLElBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUE7QUFDQSxJQUFBLElBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBQSxPQUFBO0FBQUEsU0FBQSx5QkFBQSxDQUFBLDZCQUFBLE9BQUEsbUJBQUEsQ0FBQSxPQUFBLE9BQUEsSUFBQSxDQUFBLE9BQUEsT0FBQSxZQUFBLHdCQUFBLFlBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQTtBQUFBLFNBQUEsd0JBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLFNBQUEsQ0FBQSxlQUFBLENBQUEsdUJBQUEsQ0FBQSx5QkFBQSxDQUFBLFdBQUEsT0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsd0JBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxTQUFBLFVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLElBQUEsTUFBQSxDQUFBLHdCQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsb0JBQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxJQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQTtBQURBLElBQUEsS0FBQSxFQUFBLE1BQUE7QUFLQSxNQUFBLEdBQVMsU0FBQSxDQUFFLEVBQUYsRUFBQTtFQUNULElBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQTtFQUFFLElBQUcsSUFBSSxDQUFDLE9BQUwsQ0FBYSxFQUFiLENBQUgsRUFBQTtJQUNFLE9BQUEsR0FBQSxFQUFBO0lBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQSxFQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7O01BQ0UsSUFBRyxjQUFNLENBQUMsTUFBUCxDQUFjLENBQWQsQ0FBSCxFQUFBO3FCQUNFLENBQUEsQ0FERjtPQUFBLE1BRUssSUFBRyxJQUFJLENBQUMsUUFBTCxDQUFjLENBQWQsQ0FBSCxFQUFBO3FCQUNILGNBQU0sQ0FBQyxNQUFQLENBQWMsQ0FBZCxDQUFBLENBREc7T0FBQSxNQUFBO1FBR0gsTUFBTSxJQUFJLEtBQUosQ0FBVSxzRUFBVixDQUhIOztJQUhQO2tCQURGO0dBQUEsTUFBQTtJQVVFLE1BQU0sSUFBSSxLQUFKLENBQVUsa0NBQVYsQ0FWUjs7QUFETyxDQUFBO0FBY0gsT0FBQSxDQUFBLEtBQUEsR0FBQSxLQUFBLEdBQUEsWUFBQTtFQUFOLE1BQUEsS0FBQSxDQUFBO0lBQ0UsV0FBYSxDQUFDO01BQUE7SUFBQSxDQUFELEVBQUE7TUFBRyxJQUFDLENBQUEsS0FBQSxHQUFBLEtBQUE7SUFBSjtJQU1KLE9BQVIsTUFBUSxDQUFFLEVBQUYsRUFBQTthQUNQLElBQUksS0FBSixDQUFVO1FBQUEsS0FBQSxFQUFPLE1BQUEsQ0FBTyxFQUFQO01BQVAsQ0FBVixDQUFBO0lBRE87SUFLVCxVQUFZLENBQUUsS0FBRixFQUFBO01BQ2QsSUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxNQUFBO01BQUksR0FBQSxHQUFBLElBQUEsQ0FBQSxLQUFBO01BQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7O1FBQ0UsSUFBSyxNQUFNLENBQUMsSUFBUCxDQUFZLEtBQVosQ0FBRixLQUF5QixJQUE1QixFQUFBO1VBQ0UsT0FBTyxNQURUOztNQURGO0lBRFU7SUFLQyxNQUFiLFdBQWEsQ0FBRSxLQUFGLEVBQUE7TUFDZixJQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUE7TUFBSSxHQUFBLEdBQUEsSUFBQSxDQUFBLEtBQUE7TUFBQSxLQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7UUFDRSxJQUFHLENBQUUsTUFBTSxNQUFNLENBQUMsSUFBUCxDQUFZLEtBQVosQ0FBUixNQUErQixJQUFsQyxFQUFBO1VBQ0UsT0FBTyxNQURUOztNQURGO0lBRFc7RUFqQmY7RUFBQTtFQUdFLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBQyxDQUFBLFNBQVosRUFBZ0IsQ0FDZCxJQUFJLENBQUMsT0FBTCxDQUFhLENBQUEsQ0FBYixDQURjLENBQWhCLENBQUE7RUFPQSxLQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksS0FBWixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IFZlcnRleCB9IGZyb20gXCIuL3ZlcnRleFwiXG5cblxudmVyaWZ5ID0gKCBheCApIC0+XG4gIGlmIFR5cGUuaXNBcnJheSBheFxuICAgIGZvciBhIGluIGF4XG4gICAgICBpZiBWZXJ0ZXguaXNUeXBlIGFcbiAgICAgICAgYVxuICAgICAgZWxzZSBpZiBUeXBlLmlzT2JqZWN0IGFcbiAgICAgICAgVmVydGV4LmNyZWF0ZSBhXG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvciBcIkdyYXBoLmNyZWF0ZTogYXJyYXkgbXVzdCBpbmNsdWRlIG9ubHkgdmVydGljZXMgb3IgdmVydGV4IGRlZmluaXRpb25zXCJcbiAgXG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJHcmFwaC5jcmVhdGU6IGlucHV0IGlzIG1hbGZvcm1lZFwiXG5cblxuY2xhc3MgR3JhcGhcbiAgY29uc3RydWN0b3I6ICh7IEBncmFwaCB9KSAtPlxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzIHt9XG4gIF1cblxuICBAY3JlYXRlOiAoIGF4ICkgLT5cbiAgICBuZXcgR3JhcGggZ3JhcGg6IHZlcmlmeSBheFxuXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuICBzZWxlY3RTeW5jOiAoIHRhbG9zICkgLT5cbiAgICBmb3IgdmVydGV4IGluIEBncmFwaFxuICAgICAgaWYgKCB2ZXJ0ZXgudGVzdCB0YWxvcyApID09IHRydWVcbiAgICAgICAgcmV0dXJuIHZlcnRleFxuXG4gIHNlbGVjdEFzeW5jOiAoIHRhbG9zICkgLT5cbiAgICBmb3IgdmVydGV4IGluIEBncmFwaFxuICAgICAgaWYgKCBhd2FpdCB2ZXJ0ZXgudGVzdCB0YWxvcyApID09IHRydWVcbiAgICAgICAgcmV0dXJuIHZlcnRleFxuXG5cbmV4cG9ydCB7XG4gIEdyYXBoXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/containers/graph.coffee