"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isState = exports.Vertex = void 0;
var Meta = _interopRequireWildcard(require("@dashkite/joy/metaclass"));
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var Value = _interopRequireWildcard(require("@dashkite/joy/value"));
var _generic = require("@dashkite/joy/generic");
var _helpers = require("../helpers.js");
var _index = require("./edge/index.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Vertex, create, isState;
exports.isState = isState = (0, _helpers.oneOf)([Type.isString, Type.isSymbol]);
create = (0, _generic.generic)({
  name: "vertex create",
  default: function (...args) {
    throw new Error(`Vertex.create: input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(create, isState, Type.isArray, function (state, edges) {
  var edge;
  return new Vertex({
    state: state,
    edges: function () {
      var i, len, results;
      results = [];
      for (i = 0, len = edges.length; i < len; i++) {
        edge = edges[i];
        results.push(_index.Edge.create(edge));
      }
      return results;
    }()
  });
});
(0, _generic.generic)(create, isState, Type.isObject, function (state, _vertex) {
  return create(state, _vertex.edges);
});
(0, _generic.generic)(create, isState, Type.isUndefined(function (state, _null) {
  return create(state, []);
}));
(0, _generic.generic)(create, isState, function (state) {
  return create(state, []);
});
exports.Vertex = Vertex = function () {
  class Vertex {
    constructor({
      state: state1,
      edges: edges1
    }) {
      this.state = state1;
      this.edges = edges1;
    }
    clone() {
      var edges, state;
      state = Value.clone(this.state);
      edges = [...this.edges];
      return new Vertex({
        state,
        edges
      });
    }
  }
  ;
  Meta.mixin(Vertex.prototype, [Meta.getters({})]);
  Vertex.create = create;
  Vertex.isType = Type.isType(Vertex);
  return Vertex;
}.call(void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL3ZlcnRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxLQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQTtBQUFBLElBQUEsUUFBQSxHQUFBLE9BQUE7QUFBQSxJQUFBLE1BQUEsR0FBQSxPQUFBO0FBQUEsU0FBQSx5QkFBQSxDQUFBLDZCQUFBLE9BQUEsbUJBQUEsQ0FBQSxPQUFBLE9BQUEsSUFBQSxDQUFBLE9BQUEsT0FBQSxZQUFBLHdCQUFBLFlBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQTtBQUFBLFNBQUEsd0JBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLFNBQUEsQ0FBQSxlQUFBLENBQUEsdUJBQUEsQ0FBQSx5QkFBQSxDQUFBLFdBQUEsT0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsd0JBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxTQUFBLFVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLElBQUEsTUFBQSxDQUFBLHdCQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsb0JBQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxD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Q0FBQSxNQUFELEdBQVMsTUFBQTtFQUNULE1BQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxNQUFaLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgVmFsdWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdmFsdWVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0IHsgb25lT2YgfSBmcm9tIFwiLi4vaGVscGVyc1wiXG5pbXBvcnQgeyBFZGdlIH0gZnJvbSBcIi4vZWRnZVwiXG5cblxuaXNTdGF0ZSA9IG9uZU9mIFtcbiAgVHlwZS5pc1N0cmluZ1xuICBUeXBlLmlzU3ltYm9sXG5dXG5cbmNyZWF0ZSA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidmVydGV4IGNyZWF0ZVwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcIlZlcnRleC5jcmVhdGU6IGlucHV0IGlzIG1hbGZvcm1lZCAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuZ2VuZXJpYyBjcmVhdGUsIGlzU3RhdGUsIFR5cGUuaXNBcnJheSwgKCBzdGF0ZSwgZWRnZXMgKSAtPlxuICBuZXcgVmVydGV4XG4gICAgc3RhdGU6IHN0YXRlXG4gICAgZWRnZXM6ICggRWRnZS5jcmVhdGUgZWRnZSBmb3IgZWRnZSBpbiBlZGdlcyApXG5cbmdlbmVyaWMgY3JlYXRlLCBpc1N0YXRlLCBUeXBlLmlzT2JqZWN0LCAoIHN0YXRlLCBfdmVydGV4ICkgLT5cbiAgY3JlYXRlIHN0YXRlLCBfdmVydGV4LmVkZ2VzXG5cbmdlbmVyaWMgY3JlYXRlLCBpc1N0YXRlLCBUeXBlLmlzVW5kZWZpbmVkICggc3RhdGUsIF9udWxsICkgLT5cbiAgY3JlYXRlIHN0YXRlLCBbXVxuXG5nZW5lcmljIGNyZWF0ZSwgaXNTdGF0ZSwgKCBzdGF0ZSApIC0+XG4gIGNyZWF0ZSBzdGF0ZSwgW11cblxuXG5jbGFzcyBWZXJ0ZXhcbiAgY29uc3RydWN0b3I6ICh7IEBzdGF0ZSwgQGVkZ2VzIH0pIC0+XG5cbiAgTWV0YS5taXhpbiBAOjosIFtcbiAgICBNZXRhLmdldHRlcnMge31cbiAgXVxuXG4gIEBjcmVhdGU6IGNyZWF0ZVxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbiAgY2xvbmU6IC0+XG4gICAgc3RhdGUgPSBWYWx1ZS5jbG9uZSBAc3RhdGVcbiAgICBlZGdlcyA9IFsgQGVkZ2VzLi4uIF1cbiAgICBuZXcgVmVydGV4IHsgc3RhdGUsIGVkZ2VzIH1cblxuXG5leHBvcnQge1xuICBpc1N0YXRlXG4gIFZlcnRleFxufSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=src/containers/vertex.coffee