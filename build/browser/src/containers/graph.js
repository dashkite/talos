var Graph, verify;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { Vertex } from "./vertex.js";
verify = function (ax) {
  var a, i, len, results;
  if (Type.isArray(ax)) {
    results = [];
    for (i = 0, len = ax.length; i < len; i++) {
      a = ax[i];
      if (Vertex.isType(a)) {
        results.push(a);
      } else if (Type.isObject(a)) {
        results.push(Vertex.create(a));
      } else {
        throw new Error("Graph.create: array must include only vertices or vertex definitions");
      }
    }
    return results;
  } else {
    throw new Error("Graph.create: input is malformed");
  }
};
Graph = function () {
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
}.call(this);
export { Graph };