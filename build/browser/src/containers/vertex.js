var Vertex, _make, isState;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import * as Value from "@dashkite/joy/value";
import { generic } from "@dashkite/joy/generic";
import { oneOf } from "../helpers.js";
import { Edge } from "./edge/index.js";
isState = oneOf([Type.isString, Type.isSymbol]);
_make = function (type) {
  var make;
  make = generic({
    name: "vertex make",
    default: function (...args) {
      throw new Error(`Vertex.make: input is malformed ${JSON.stringify(args)}`);
    }
  });
  generic(make, isState, Type.isArray, function (state, edges) {
    var edge;
    return new Vertex({
      state: state,
      edges: function () {
        var i, len, results;
        results = [];
        for (i = 0, len = edges.length; i < len; i++) {
          edge = edges[i];
          results.push(Edge.make(edge));
        }
        return results;
      }()
    });
  });
  generic(make, isState, Type.isObject, function (state, _vertex) {
    return make(state, _vertex.edges);
  });
  generic(make, isState, Type.isUndefined(function (state, _null) {
    return make(state, []);
  }));
  generic(make, isState, function (state) {
    return make(state, []);
  });
  generic(make, type.isType, function (vertex) {
    return vertex.clone();
  });
  generic(make, isState, type.isType, function (state, _vertex) {
    var vertex;
    vertex = _vertex.clone();
    vertex.state = state;
    return vertex;
  });
  return make;
};
Vertex = function () {
  class Vertex {
    constructor({
      state: state1,
      edges: edges1
    }) {
      this.state = state1;
      this.edges = edges1;
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
}.call(this);
export { isState, Vertex };