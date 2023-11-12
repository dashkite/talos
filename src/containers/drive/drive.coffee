import * as Type from "@dashkite/joy/type"
import * as Meta from "@dashkite/joy/metaclass"
import * as $ from "../../internal/states"
import { Graph } from "../graph"
import { Talos } from "../talos"
import { oneOf } from "../helpers"


isGraph = oneOf [
  Graph.isType
]

isTalos = oneOf [ 
  Type.isUndefined
  Talos.isType
]

verify = ( options ) ->
  if !options?
    throw new Error "Drive.create: input is malformed"

  { graph, talos } = options

  unless isGraph graph
    throw new Error "Drive.create: invalid graph, #{ graph }"

  unless isTalos talos
    throw new Error "Drive.create: invalid talos, #{ talos }"


class Drive
  constructor: ({ @graph, @talos }) ->
    @talos ?= Talos.create()
    @target = new EventTarget()
    @state = $.start

  Meta.mixin @::, [
    Meta.getters
      addEventListener: -> @target.addEventListener
      on: -> @target.addEventListener
      removeEventListener: -> @target.removeEventListener
      off: -> @target.removeEventListener
      dispatchEvent: -> @target.dispatchEvent
      dispatch: -> @target.dispatchEvent

      canceled: -> $.atCancel @state
      halted: -> @canceled || @talos.halted || @talos.paused
  ]

  @create: ( options ) ->
    verify options
    new Drive options

  @isKind: Type.isKind @
  @isType: Type.isType @

  halt: ->
    @talos.halt()
    @dispatch DriveEvent.create "state", @talos.clone()
    @dispatch DriveEvent.create "halt", @talos.clone()
    if @talos.error?
      @dispatch DriveEvent.create "error", @talos.clone()
    else if @canceled
      @dispatch DriveEvent.create "cancel", @talos.clone()
    else
      @dispatch DriveEvent.create "success", @talos.clone()

  setError: ( error ) ->
    @talos.error = error
    @halt()

  cancel: ->
    @state = $.cancel

  finish: ->
    @dispatch DriveEvent.create "state", @talos.clone()
    if @talos.paused
      @dispatch DriveEvent.create "pause", @talos.clone()
    if @talos.success
      @dispatch DriveEvent.create "halt", @talos.clone()
      @dispatch DriveEvent.create "success", @talos.clone()



class DriveEvent extends CustomEvent
  constructor: ( type, details ) ->
    super type, { details }

  @create: ( type, details ) ->
    new DriveEvent type, details


export {
  verify
  Drive
  DriveEvent
}