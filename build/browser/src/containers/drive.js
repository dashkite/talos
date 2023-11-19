var Drive, make;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
import { Graph } from "./graph.js";
import { Talos } from "./talos.js";
make = generic({
  name: "drive make",
  default: function (...args) {
    throw new Error(`Drive.make: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(make, Graph.isType, Talos.isType, Type.isFunction, function (graph, talos, step) {
  return new Drive({
    graph,
    talos,
    step
  });
});
Drive = function () {
  class Drive {
    constructor({
      graph: graph1,
      talos: talos1,
      step: step1
    }) {
      this.graph = graph1;
      this.talos = talos1;
      this.step = step1;
    }
    update(transform) {
      return this.step(this.graph, this.talos, transform);
    }
  }
  ;
  Meta.mixin(Drive.prototype, [Meta.getters({
    state: function () {
      return this.talos.state;
    },
    isSync: function () {
      return Type.isRegularFunction(this.step);
    }
  })]);
  Drive.make = make;
  Drive.isType = Type.isType(Drive);
  return Drive;
}.call(this);
export { Drive };