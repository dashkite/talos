var Talos, isError, isState, make;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import * as Value from "@dashkite/joy/value";
import { $start, $halt, atStart, atHalt, atPause } from "../states.js";
import { generic } from "@dashkite/joy/generic";
import { oneOf } from "../helpers.js";
import { TalosError } from "./errors.js";
isState = oneOf([Type.isString, Type.isSymbol]);
isError = oneOf([Type.isUndefined, TalosError.isType]);
make = generic({
  name: "talos make",
  default: function (...args) {
    throw new Error(`Talos.make: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(make, isState, Type.isObject, isError, function (state, context, error) {
  return new Talos({
    state,
    context,
    error
  });
});
generic(make, function () {
  return make($start, {}, null);
});
generic(make, isState, Type.isObject, function (state, context) {
  return make(state, context, null);
});
generic(make, isState, function (state) {
  return make(state, {}, null);
});
generic(make, Type.isObject, function (context) {
  return make($start, context, null);
});
Talos = function () {
  class Talos {
    constructor({
      state: state1,
      context: context1,
      error: error1
    }) {
      this.state = state1;
      this.context = context1;
      this.error = error1;
    }
    halt() {
      return this.state = $halt;
    }
    throw(error) {
      this.halt();
      return this.error = error != null ? error : TalosError.make();
    }
    reset(state) {
      this.state = state != null ? state : $start;
      this.context = {};
      return this.error = null;
    }
    clone() {
      var context;
      context = Value.clone(this.context);
      return new Talos({
        state: this.state,
        context,
        error: this.error
      });
    }
  }
  ;
  Meta.mixin(Talos.prototype, [Meta.getters({
    starting: function () {
      return atStart(this.state);
    },
    halted: function () {
      return atHalt(this.state);
    },
    paused: function () {
      return atPause(this.state);
    },
    success: function () {
      return this.halted && this.error == null;
    },
    failure: function () {
      return this.halted && this.error != null;
    },
    running: function () {
      return !this.halted && !this.paused;
    }
  })]);
  Talos.make = make;
  Talos.isType = Type.isType(Talos);
  return Talos;
}.call(this);
export { Talos };