import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import * as $ from "../internal/states"


class Talos
  constructor: ({ @state, @context }) ->
    @state ?= $.start
    @context ?= {}
    @error = null

  Meta.mixin @::, [
    Meta.getters
      starting: -> $.atStart @state
      halted: -> $.atHalt @state
      success: -> @halted && !@error?
      failure: -> @halted && @error?
      paused: -> $.atPause @state
      running: -> !@paused
  ]

  @create: ( options = {} ) ->
    new Talos options

  @isType: Type.isType @

  halt: ->
    @state = $.halt

  restart: ( state ) ->
    @state = state ? @.start



export {
  Talos
}