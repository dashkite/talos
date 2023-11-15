var Vertex, _create, isState;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import * as Value from "@dashkite/joy/value";
import { generic } from "@dashkite/joy/generic";
import { oneOf } from "../helpers.js";
import { Edge } from "./edge/index.js";
isState = oneOf([Type.isString, Type.isSymbol]);
_create = function (type) {
  var create;
  create = generic({
    name: "vertex create",
    default: function (...args) {
      throw new Error(`Vertex.create: input is malformed ${JSON.stringify(args)}`);
    }
  });
  generic(create, isState, Type.isArray, function (state, edges) {
    var edge;
    return new Vertex({
      state: state,
      edges: function () {
        var i, len, results;
        results = [];
        for (i = 0, len = edges.length; i < len; i++) {
          edge = edges[i];
          results.push(Edge.create(edge));
        }
        return results;
      }()
    });
  });
  generic(create, isState, Type.isObject, function (state, _vertex) {
    return create(state, _vertex.edges);
  });
  generic(create, isState, Type.isUndefined(function (state, _null) {
    return create(state, []);
  }));
  generic(create, isState, function (state) {
    return create(state, []);
  });
  generic(create, type.isType, function (vertex) {
    return vertex.clone();
  });
  generic(create, isState, type.isType, function (state, _vertex) {
    var vertex;
    vertex = _vertex.clone();
    vertex.state = state;
    return vertex;
  });
  return create;
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
  Vertex.create = _create(Vertex);
  Vertex.isType = Type.isType(Vertex);
  return Vertex;
}.call(this);
export { isState, Vertex };