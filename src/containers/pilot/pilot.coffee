import * as Type from "@dashkite/joy/type"
import * as Meta from "@dashkite/joy/metaclass"
import { Graph } from "../graph"
import { Talos } from "../talos"


class PilotEvent extends CustomEvent
  constructor: ( type, options ) ->
    super type, options

  @create: ()


verify = ( options ) ->
  if !options?
    throw new Error "Pilot.create: input is malformed"

  { graph, talos } = options

  unless Graph.isType graph
    throw new Error "Pilot.create: invalid graph, #{ graph }"

  unless Talos.isType talos
    throw new Error "Pilot.create: invalid talos, #{ talos }"


class Pilot
  constructor: ({ @graph, @talos }) ->
    @target = new EventTarget()

  Meta.mixin @::, [
    Meta.getters
      addEventListener: -> @target.addEventListener
      on: -> @target.addEventListener
      removeEventListener: -> @target.removeEventListener
      off: -> @target.removeEventListener
      dispatchEvent: -> @target.dispatchEvent
      dispatch: -> @target.dispatchEvent
  ]

  @create: ( options ) ->
    verify options
    new Pilot options

  @isKind: Type.isKind @
  @isType: Type.isType @

  halt: ->
    @talos.halt()
    @dispatch PilotEvent.create "state", @talos
    @dispatch PilotEvent.create "halt", @talos
    if @talos.error?
      @dispatch PilotEvent.create "error", @talos

  setError: ( error ) ->
    @talos.error = error
    @halt()



export {
  Pilot
}