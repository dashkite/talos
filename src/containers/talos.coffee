import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import * as Value from "@dashkite/joy/value"
import * as $ from "../internal/states"
import { oneOf } from "../helpers"
import { TalosError } from "./errors"


isState = oneOf [
  Type.isUndefined
  Type.isString
  Type.isSymbol
]

isContext = oneOf [ 
  Type.isUndefined
  Type.isObject
]

isError = oneOne [
  Type.isUndefined
  TalosError.isKind
]

verify = ( options ) ->
  { state, context, error } = options

  unless isState state
    throw new Error "Talos.create: invalid state, #{ state }"

  unless isContext context
    throw new Error "Talos.create: invalid context, #{ context }"

  unless isError error
    throw new Error "Talos.create: invalid error, #{ error }"


class Talos
  constructor: ({ @state, @context, @error }) ->
    @state ?= $.start
    @context ?= {}
    @error ?= null

  Meta.mixin @::, [
    Meta.getters
      starting: -> $.atStart @state
      halted: -> $.atHalt @state
      success: -> @halted && !@error?
      failure: -> @halted && @error?
      paused: -> $.atPause @state
      running: -> !@paused && !@halted
  ]

  @create: ( options = {} ) ->
    verify options
    new Talos options

  @isType: Type.isType @

  halt: ->
    @state = $.halt

  restart: ( state ) ->
    @state = state ? @.start

  clone: ->
    Talos.create {
      @state
      context: Value.clone @context
      @error
    }


export {
  Talos
}