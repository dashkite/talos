import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import * as Value from "@dashkite/joy/value"
import { $start, $halt, atStart, atHalt, atPause } from "../states"
import { generic } from "@dashkite/joy/generic"
import { oneOf } from "../helpers"
import { TalosError } from "./errors"


isState = oneOf [
  Type.isString
  Type.isSymbol
]

isError = oneOf [
  Type.isUndefined
  TalosError.isType
]

make = generic 
  name: "talos make"
  default: ( args... ) -> 
    throw new Error "Talos.make: input is malformed #{JSON.stringify args}"

generic make, isState, Type.isObject, isError, ( state, context, error ) ->
  new Talos { state, context, error }

generic make, ->
  make $start, {}, null

generic make, isState, Type.isObject, ( state, context ) ->
  make state, context, null

generic make, isState, ( state ) ->
  make state, {}, null

generic make, Type.isObject, ( context ) ->
  make $start, context, null

class Talos
  constructor: ({ @state, @context, @error }) ->

  Meta.mixin @::, [
    Meta.getters
      starting: -> atStart @state
      halted: -> atHalt @state
      paused: -> atPause @state
      success: -> @halted && !@error?
      failure: -> @halted && @error?
      running: -> !@halted && !@paused
  ]

  @make: make
  @isType: Type.isType @

  halt: ->
    @state = $halt

  throw: ( error ) ->
    @halt()
    @error = error ? TalosError.make()

  reset: ( state ) ->
    @state = state ? $start
    @context = {}
    @error = null

  clone: ->
    context = Value.clone @context
    new Talos { @state, context, @error }
      

export {
  Talos
}