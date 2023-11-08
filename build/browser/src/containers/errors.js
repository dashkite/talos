var ActionError, NextError, TalosError, UnknownNext, UnknownState;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
TalosError = function () {
  class TalosError extends Error {
    constructor({
      message
    }) {
      super(message);
    }
    static create(options) {
      return new TalosError(options);
    }
  }
  ;
  TalosError.isType = Type.isType(TalosError);
  TalosError.isKind = Type.isKind(TalosError);
  return TalosError;
}.call(this);
UnknownState = function () {
  class UnknownState extends TalosError {
    constructor() {
      super({
        message: "talos cannot find the current state in this graph"
      });
    }
    static create() {
      return new UnknownState();
    }
  }
  ;
  UnknownState.isType = Type.isType(UnknownState);
  return UnknownState;
}.call(this);
UnknownNext = function () {
  class UnknownNext extends TalosError {
    constructor({
      vertex
    }) {
      super({
        message: "talos cannot determine the next state from this vertex"
      });
      this.vertex = vertex;
    }
    static create(options) {
      return new UnknownNext(options);
    }
  }
  ;
  UnknownNext.isType = Type.isType(UnknownNext);
  return UnknownNext;
}.call(this);
ActionError = function () {
  class ActionError extends TalosError {
    constructor({
      error
    }) {
      super({
        message: "talos encountered an error while running this action"
      });
      this.error = error;
    }
    static create(options) {
      return new ActionError(options);
    }
  }
  ;
  ActionError.isType = Type.isType(ActionError);
  return ActionError;
}.call(this);
NextError = function () {
  class NextError extends TalosError {
    constructor({
      error
    }) {
      super({
        message: "talos encountered an error while resolving next state"
      });
      this.error = error;
    }
    static create(options) {
      return new NextError(options);
    }
  }
  ;
  NextError.isType = Type.isType(NextError);
  return NextError;
}.call(this);
export { TalosError, UnknownState, UnknownNext, ActionError, NextError };