var Talos, create, isError, isState;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import * as Value from "@dashkite/joy/value";
import { $start, $halt, atStart, atHalt } from "../internal/states.js";
import { generic } from "@dashkite/joy/generic";
import { oneOf } from "../helpers.js";
import { TalosError } from "./errors.js";
isState = oneOf([Type.isString, Type.isSymbol]);
isError = oneOf([Type.isUndefined, TalosError.isType]);
create = generic({
  name: "talos create",
  default: function (...args) {
    throw new Error(`Talos.create: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(create, isState, Type.isObject, isError, function (state, context, error) {
  return new Talos({
    state,
    context,
    error
  });
});
generic(create, function () {
  return create($start, {}, null);
});
generic(create, isState, Type.isObject, function (state, context) {
  return create(state, context, null);
});
generic(create, isState, function (state) {
  return create(state, {}, null);
});
generic(create, Type.isObject, function (context) {
  return create($start, context, null);
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
      return this.error = error != null ? error : TalosError.create();
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
    success: function () {
      return this.halted && this.error == null;
    },
    failure: function () {
      return this.halted && this.error != null;
    },
    running: function () {
      return !this.halted;
    }
  })]);
  Talos.create = create;
  Talos.isType = Type.isType(Talos);
  return Talos;
}.call(this);
export { Talos };