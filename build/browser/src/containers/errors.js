var FailedMove, FailedRun, InvalidState, MissingTransition, TalosError, _create, isError;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
isError = Type.isKind(Error);
_create = function (type) {
  var create;
  create = generic({
    name: "error create",
    default: function (...args) {
      throw new Error(`TalosError.create: input is malformed ${JSON.stringify(args)}`);
    }
  });
  generic(create, function () {
    return new type({
      message: "talos encountered an error"
    });
  });
  generic(create, Type.isString, function (messsage) {
    return new type({
      message
    });
  });
  generic(create, isError, Type.isString, function (error, messsage) {
    return new type({
      message,
      error
    });
  });
  return create;
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
  TalosError.create = _create(TalosError);
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
  InvalidState.create = _create(InvalidState);
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
  MissingTransition.create = _create(MissingTransition);
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
  FailedRun.create = _create(FailedRun);
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
  FailedMove.create = _create(FailedMove);
  FailedMove.isType = Type.isType(FailedMove);
  return FailedMove;
}.call(this);
export { TalosError, InvalidState, MissingTransition, FailedRun, FailedMove };