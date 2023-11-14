var Vertex, create, isState;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import * as Value from "@dashkite/joy/value";
import { generic } from "@dashkite/joy/generic";
import { oneOf } from "../helpers.js";
import { Edge } from "./edge/index.js";
isState = oneOf([Type.isString, Type.isSymbol]);
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
}.call(this);
export { isState, Vertex };