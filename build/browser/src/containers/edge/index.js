var Edge, create;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
import * as Create from "./create.js";
create = generic({
  name: "edge create",
  default: function (...args) {
    throw new Error(`Edge.create: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(create, Type.isObject, function (edge) {
  return new Edge({
    accept: Create.accept(edge.accept),
    run: Create.run(edge.run),
    move: Create.move(edge.move)
  });
});
Edge = function () {
  class Edge {
    constructor({
      accept,
      run,
      move
    }) {
      this.accept = accept;
      this.run = run;
      this.move = move;
    }
    clone() {
      return new Edge({
        accept: this.accept,
        run: this.run,
        move: this.move
      });
    }
  }
  ;
  Meta.mixin(Edge.prototype, [Meta.getters({})]);
  Edge.create = create;
  Edge.isType = Type.isType(Edge);
  return Edge;
}.call(this);
export { Edge };