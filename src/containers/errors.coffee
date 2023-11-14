import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"

isError = Type.isKind Error

_create = ( type ) ->
  create = generic 
    name: "error create"
    default: ( args... ) -> 
      throw new Error "TalosError.create: input is malformed #{JSON.stringify args}"

  generic create, ->
    new type message: "talos encountered an error"

  generic create, Type.isString, ( messsage ) ->
    new type { message }

  generic create, isError, Type.isString, ( error, messsage ) ->
    new type { message, error }

  create

class TalosError extends Error
  constructor: ({ message }) ->
    super message

  @create: _create @
  @isType: Type.isType @
  @isKind: Type.isKind @


class InvalidState extends TalosError
  constructor: ({ message }) ->
    super message

  @create: _create @
  @isType: Type.isType @

class MissingTransition extends TalosError
  constructor: ({ message }) ->
    super message

  @create: _create @
  @isType: Type.isType @

class FailedRun extends TalosError
  constructor: ({ error, message }) ->
    super message
    @error = error

  @create: _create @
  @isType: Type.isType @

class FailedMove extends TalosError
  constructor: ({ error, message }) ->
    super message
    @error = error

  @create: _create @
  @isType: Type.isType @


export {
  TalosError
  InvalidState
  MissingTransition
  FailedRun
  FailedMove
}