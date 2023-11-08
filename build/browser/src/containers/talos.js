var Talos;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import * as $ from "../internal/states.js";
Talos = function () {
  class Talos {
    constructor({
      state: state1,
      context
    }) {
      this.state = state1;
      this.context = context;
      if (this.state == null) {
        this.state = $.start;
      }
      if (this.context == null) {
        this.context = {};
      }
      this.error = null;
    }
    static create(options = {}) {
      return new Talos(options);
    }
    halt() {
      return this.state = $.halt;
    }
    restart(state) {
      return this.state = state != null ? state : this.start;
    }
  }
  ;
  Meta.mixin(Talos.prototype, [Meta.getters({
    starting: function () {
      return $.atStart(this.state);
    },
    halted: function () {
      return $.atHalt(this.state);
    },
    success: function () {
      return this.halted && this.error == null;
    },
    failure: function () {
      return this.halted && this.error != null;
    },
    paused: function () {
      return $.atPause(this.state);
    },
    running: function () {
      return !this.paused;
    }
  })]);
  Talos.isType = Type.isType(Talos);
  return Talos;
}.call(this);
export { Talos };