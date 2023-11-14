import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import * as Value from "@dashkite/joy/value"
import * as $ from "../internal/states"
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

create = generic 
  name: "talos create"
  default: ( args... ) -> 
    throw new Error "Talos.create: input is malformed #{JSON.stringify args}"

generic create, isState, Type.isObject, isError, ( state, context, error ) ->
  new Talos { state, context, error }

generic create, ->
  create $.start, {}, null

generic create, isState, Type.isObject, ( state, context ) ->
  create state, context, null

generic create, isState, ( state ) ->
  create state, {}, null

generic create, Type.isObject, ( context ) ->
  create $.start, context, null

class Talos
  constructor: ({ @state, @context, @error }) ->

  Meta.mixin @::, [
    Meta.getters
      starting: -> $.atStart @state
      halted: -> $.atHalt @state
      success: -> @halted && !@error?
      failure: -> @halted && @error?
      running: -> !@halted
  ]

  @create: create
  @isType: Type.isType @

  halt: ->
    @state = $.halt

  throw: ( error ) ->
    @halt()
    @error = error ? TalosError.create()

  reset: ( state ) ->
    @state = state ? $.start
    @context = {}
    @error = null

  clone: ->
    create ( Value.clone @state ), ( Value.clone @context ), @error
      

export {
  Talos
}