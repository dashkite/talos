var Auto, make;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
import { Graph } from "./graph.js";
import { Talos } from "./talos.js";
make = generic({
  name: "auto make",
  default: function (...args) {
    throw new Error(`Auto.make: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(make, Drive.isType, function (drive) {
  return new Auto({
    drive: this.drive
  });
});
Auto = function () {
  class Auto {
    constructor({
      drive: drive1
    }) {
      this.drive = drive1;
    }
    start(transform) {
      return this.step(this.graph, this.talos, transform);
    }
    halt() {
      return this.halted = true;
    }
  }
  ;
  Meta.mixin(Auto.prototype, [Meta.getters({})]);
  Auto.make = make;
  Auto.isType = Type.isType(Auto);
  return Auto;
}.call(this);
export { Auto };