var Graph, create;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
import { Vertex } from "./vertex.js";
create = generic({
  name: "graph create",
  default: function (...args) {
    throw new Error(`Graph.create: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(create, Type.isObject, function (graph) {
  var i, len, ref, state, vertex;
  ref = Reflect.ownKeys(graph);
  for (i = 0, len = ref.length; i < len; i++) {
    state = ref[i];
    vertex = graph[state];
    graph[state] = Vertex.create(state, vertex);
  }
  return new Graph({
    graph
  });
});
Graph = function () {
  class Graph {
    constructor({
      graph: graph1
    }) {
      this.graph = graph1;
    }
    get(talos) {
      return this.graph[talos.state];
    }
    has(talos) {
      return this.graph[talos.state] != null;
    }
  }
  ;
  Meta.mixin(Graph.prototype, [Meta.getters({})]);
  Graph.create = create;
  Graph.isType = Type.isType(Graph);
  return Graph;
}.call(this);
export { Graph };