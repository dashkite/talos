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
var Vertex, _make, isState;
exports.isState = isState = (0, _helpers.oneOf)([Type.isString, Type.isSymbol]);
_make = function (type) {
  var make;
  make = (0, _generic.generic)({
    name: "vertex make",
    default: function (...args) {
      throw new Error(`Vertex.make: input is malformed ${JSON.stringify(args)}`);
    }
  });
  (0, _generic.generic)(make, isState, Type.isArray, function (state, edges) {
    var edge;
    return new Vertex({
      state: state,
      edges: function () {
        var i, len, results;
        results = [];
        for (i = 0, len = edges.length; i < len; i++) {
          edge = edges[i];
          results.push(_index.Edge.make(edge));
        }
        return results;
      }()
    });
  });
  (0, _generic.generic)(make, isState, Type.isObject, function (state, _vertex) {
    var edge, edges, metadata;
    ({
      edges,
      ...metadata
    } = _vertex);
    return new Vertex({
      metadata,
      state,
      edges: function () {
        var i, len, results;
        results = [];
        for (i = 0, len = edges.length; i < len; i++) {
          edge = edges[i];
          results.push(_index.Edge.make(edge));
        }
        return results;
      }()
    });
  });
  (0, _generic.generic)(make, isState, Type.isUndefined(function (state, _null) {
    return make(state, []);
  }));
  (0, _generic.generic)(make, isState, function (state) {
    return make(state, []);
  });
  (0, _generic.generic)(make, type.isType, function (vertex) {
    return vertex.clone();
  });
  (0, _generic.generic)(make, isState, type.isType, function (state, _vertex) {
    var vertex;
    vertex = _vertex.clone();
    vertex.state = state;
    return vertex;
  });
  return make;
};
exports.Vertex = Vertex = function () {
  class Vertex {
    constructor({
      state: state1,
      edges: edges1,
      metadata: metadata1
    }) {
      this.state = state1;
      this.edges = edges1;
      this.metadata = metadata1;
    }
    clone() {
      var edge, edges, state;
      state = Value.clone(this.state);
      edges = function () {
        var i, len, ref, results;
        ref = this.edges;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          edge = ref[i];
          results.push(edge.clone());
        }
        return results;
      }.call(this);
      return new Vertex({
        state,
        edges
      });
    }
  }
  ;
  Meta.mixin(Vertex.prototype, [Meta.getters({})]);
  Vertex.make = _make(Vertex);
  Vertex.isType = Type.isType(Vertex);
  return Vertex;
}.call(void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL3ZlcnRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxLQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQTtBQUFBLElBQUEsUUFBQSxHQUFBLE9BQUE7QUFBQSxJQUFBLE1BQUEsR0FBQSxPQUFBO0FBQUEsU0FBQSx5QkFBQSxDQUFBLDZCQUFBLE9BQUEsbUJBQUEsQ0FBQSxPQUFBLE9BQUEsSUFBQSxDQUFBLE9BQUEsT0FBQSxZQUFBLHdCQUFBLFlBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQTtBQUFBLFNBQUEsd0JBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLFNBQUEsQ0FBQSxlQUFBLENBQUEsdUJBQUEsQ0FBQSx5QkFBQSxDQUFBLFdBQUEsT0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsd0JBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxTQUFBLFVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLElBQUEsTUFBQSxDQUFBLHdCQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsb0JBQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxD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LEdBQU8sS0FBQSxDQUFNLE1BQU4sQ0FBQTtFQUNQLE1BQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxNQUFaLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgVmFsdWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdmFsdWVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0IHsgb25lT2YgfSBmcm9tIFwiLi4vaGVscGVyc1wiXG5pbXBvcnQgeyBFZGdlIH0gZnJvbSBcIi4vZWRnZVwiXG5cblxuaXNTdGF0ZSA9IG9uZU9mIFtcbiAgVHlwZS5pc1N0cmluZ1xuICBUeXBlLmlzU3ltYm9sXG5dXG5cbl9tYWtlID0gKCB0eXBlICkgLT5cbiAgbWFrZSA9IGdlbmVyaWMgXG4gICAgbmFtZTogXCJ2ZXJ0ZXggbWFrZVwiXG4gICAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJWZXJ0ZXgubWFrZTogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG4gIGdlbmVyaWMgbWFrZSwgaXNTdGF0ZSwgVHlwZS5pc0FycmF5LCAoIHN0YXRlLCBlZGdlcyApIC0+XG4gICAgbmV3IFZlcnRleFxuICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICBlZGdlczogKCBFZGdlLm1ha2UgZWRnZSBmb3IgZWRnZSBpbiBlZGdlcyApXG5cbiAgZ2VuZXJpYyBtYWtlLCBpc1N0YXRlLCBUeXBlLmlzT2JqZWN0LCAoIHN0YXRlLCBfdmVydGV4ICkgLT5cbiAgICB7IGVkZ2VzLCBtZXRhZGF0YS4uLiB9ID0gX3ZlcnRleCAgICBcbiAgICBuZXcgVmVydGV4IHtcbiAgICAgIG1ldGFkYXRhXG4gICAgICBzdGF0ZVxuICAgICAgZWRnZXM6ICggRWRnZS5tYWtlIGVkZ2UgZm9yIGVkZ2UgaW4gZWRnZXMgKVxuICAgIH1cblxuICBnZW5lcmljIG1ha2UsIGlzU3RhdGUsIFR5cGUuaXNVbmRlZmluZWQgKCBzdGF0ZSwgX251bGwgKSAtPlxuICAgIG1ha2Ugc3RhdGUsIFtdXG5cbiAgZ2VuZXJpYyBtYWtlLCBpc1N0YXRlLCAoIHN0YXRlICkgLT5cbiAgICBtYWtlIHN0YXRlLCBbXVxuXG4gIGdlbmVyaWMgbWFrZSwgdHlwZS5pc1R5cGUsICggdmVydGV4ICkgLT5cbiAgICB2ZXJ0ZXguY2xvbmUoKVxuXG4gIGdlbmVyaWMgbWFrZSwgaXNTdGF0ZSwgdHlwZS5pc1R5cGUsICggc3RhdGUsIF92ZXJ0ZXggKSAtPlxuICAgIHZlcnRleCA9IF92ZXJ0ZXguY2xvbmUoKVxuICAgIHZlcnRleC5zdGF0ZSA9IHN0YXRlXG4gICAgdmVydGV4XG5cbiAgbWFrZVxuXG5cbmNsYXNzIFZlcnRleFxuICBjb25zdHJ1Y3RvcjogKHsgQHN0YXRlLCBAZWRnZXMsIEBtZXRhZGF0YSB9KSAtPlxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzIHt9XG4gIF1cblxuICBAbWFrZTogX21ha2UgQFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbiAgY2xvbmU6IC0+XG4gICAgc3RhdGUgPSBWYWx1ZS5jbG9uZSBAc3RhdGVcbiAgICBlZGdlcyA9ICggZWRnZS5jbG9uZSgpIGZvciBlZGdlIGluIEBlZGdlcyApXG4gICAgbmV3IFZlcnRleCB7IHN0YXRlLCBlZGdlcyB9XG5cblxuZXhwb3J0IHtcbiAgaXNTdGF0ZVxuICBWZXJ0ZXhcbn0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/containers/vertex.coffee