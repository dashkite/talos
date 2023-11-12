import * as Type from "@dashkite/joy/type"
import * as Meta from "@dashkite/joy/metaclass"
import * as $ from "../../internal/states"
import * as Error from "../errors"
import { Pilot } from "./pilot"
import { PilotEvent } from "./event"


class AsyncPilot extends Pilot
  constructor: ( options ) ->
    super options
    @running = false
    @interrupt = null

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @create: ( options ) ->
    new AsyncPilot options

  @isType: Type.isType @

  trigger: ( state ) ->
    target = state ? $.start

    if @running == true
      @interrupt = target
    else if @talos.state != target
      @talos = Talos.create
      @talos.state = target
      @talos.error = null
      @loop()
    else
      @talos

  selectVertex: ->
    try
      vertex = await @graph.selectSync @talos
    catch error
      @setError Error.SelectVertexError.create { error }
      return

    if !vertex?
      @setError Error.UnknownState.create()
      return
    
    vertex
      
  runAction: ( vertex ) ->
    if vertex.action?
      try
        await vertex.action @talos, vertex
      catch error
        @setError Error.ActionError.create { error }
        return

  moveNext: ( vertex ) ->
    if @interrupt?
      talos.state = interrupt
      @interrupt = null
    else if Type.isString vertex.next
      talos.state = vertex.next
    else if Type.isSymbol vertex.next
      talos.state = vertex.next
    else if Type.isFunction vertex.next
      try
        talos.state = await vertex.next talos, vertex
      catch error
        @setError Error.NextError.create { error }
        return
    else
      talos.state = $.pause


  finish: ->
    @dispatch PilotEvent.create "state", @talos
    if @talos.paused
      @dispatch PilotEvent.create "pause", @talos
    if @talos.success
      @dispatch PilotEvent.create "halt", @talos
      @dispatch PilotEvent.create "success", @talos

  _loop: ->
    while @talos.running
      @dispatch PilotEvent.create "state", @talos

      vertex = await @selectVertex()
      return if @talos.failure

      await @runAction vertex
      return if @talos.failure

      await @moveNext vertex
      return if @talos.failure

    @finish()
    @talos

  loop: ->
    @running = true
    @_loop()
      .then =>
        if @talos.failure
          @running = false
          @talos
        else if @interrupt?
          @running = false
          @talos.state = interrupt
          @interrupt = null
          @loop()
        else
          @running = false
          @talos
    


export {
  AsyncPilot
}