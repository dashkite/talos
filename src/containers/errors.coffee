import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"

isError = Type.isKind Error

_make = ( type ) ->
  make = generic 
    name: "error make"
    default: ( args... ) -> 
      throw new Error "TalosError.make: input is malformed #{JSON.stringify args}"

  generic make, ->
    new type message: "talos encountered an error"

  generic make, Type.isString, ( message ) ->
    new type { message }

  generic make, isError, Type.isString, ( error, message ) ->
    new type { message, error }

  make

class TalosError extends Error
  constructor: ({ message }) ->
    super message

  @make: _make @
  @isType: Type.isType @
  @isKind: Type.isKind @


class InvalidState extends TalosError
  constructor: ({ message }) ->
    super message

  @make: _make @
  @isType: Type.isType @

class MissingTransition extends TalosError
  constructor: ({ message }) ->
    super message

  @make: _make @
  @isType: Type.isType @

class FailedRun extends TalosError
  constructor: ({ error, message }) ->
    super message
    @error = error

  @make: _make @
  @isType: Type.isType @

class FailedMove extends TalosError
  constructor: ({ error, message }) ->
    super message
    @error = error

  @make: _make @
  @isType: Type.isType @


export {
  TalosError
  InvalidState
  MissingTransition
  FailedRun
  FailedMove
}