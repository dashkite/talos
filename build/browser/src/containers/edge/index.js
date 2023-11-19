var Edge, make;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
import * as Make from "./make.js";
make = generic({
  name: "edge make",
  default: function (...args) {
    throw new Error(`Edge.make: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(make, Type.isObject, function (edge) {
  return new Edge({
    accept: Make.accept(edge.accept),
    run: Make.run(edge.run),
    move: Make.move(edge.move)
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
  Edge.make = make;
  Edge.isType = Type.isType(Edge);
  return Edge;
}.call(this);
export { Edge };