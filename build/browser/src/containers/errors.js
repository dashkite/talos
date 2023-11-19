var FailedMove, FailedRun, InvalidState, MissingTransition, TalosError, _make, isError;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
isError = Type.isKind(Error);
_make = function (type) {
  var make;
  make = generic({
    name: "error make",
    default: function (...args) {
      throw new Error(`TalosError.make: input is malformed ${JSON.stringify(args)}`);
    }
  });
  generic(make, function () {
    return new type({
      message: "talos encountered an error"
    });
  });
  generic(make, Type.isString, function (message) {
    return new type({
      message
    });
  });
  generic(make, isError, Type.isString, function (error, message) {
    return new type({
      message,
      error
    });
  });
  return make;
};
TalosError = function () {
  class TalosError extends Error {
    constructor({
      message
    }) {
      super(message);
    }
  }
  ;
  TalosError.make = _make(TalosError);
  TalosError.isType = Type.isType(TalosError);
  TalosError.isKind = Type.isKind(TalosError);
  return TalosError;
}.call(this);
InvalidState = function () {
  class InvalidState extends TalosError {
    constructor({
      message
    }) {
      super(message);
    }
  }
  ;
  InvalidState.make = _make(InvalidState);
  InvalidState.isType = Type.isType(InvalidState);
  return InvalidState;
}.call(this);
MissingTransition = function () {
  class MissingTransition extends TalosError {
    constructor({
      message
    }) {
      super(message);
    }
  }
  ;
  MissingTransition.make = _make(MissingTransition);
  MissingTransition.isType = Type.isType(MissingTransition);
  return MissingTransition;
}.call(this);
FailedRun = function () {
  class FailedRun extends TalosError {
    constructor({
      error,
      message
    }) {
      super(message);
      this.error = error;
    }
  }
  ;
  FailedRun.make = _make(FailedRun);
  FailedRun.isType = Type.isType(FailedRun);
  return FailedRun;
}.call(this);
FailedMove = function () {
  class FailedMove extends TalosError {
    constructor({
      error,
      message
    }) {
      super(message);
      this.error = error;
    }
  }
  ;
  FailedMove.make = _make(FailedMove);
  FailedMove.isType = Type.isType(FailedMove);
  return FailedMove;
}.call(this);
export { TalosError, InvalidState, MissingTransition, FailedRun, FailedMove };