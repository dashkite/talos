import * as Type from "@dashkite/joy/type"
import * as Meta from "@dashkite/joy/metaclass"
import * as $ from "../../internal/states"
import * as Error from "../errors"
import { Pilot } from "./pilot"
import { PilotEvent } from "./event"


class SyncPilot extends Pilot
  constructor: ( options ) ->
    super options

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @create: ( options ) ->
    new SyncPilot options

  @isType: Type.isType @

  trigger: ( state ) ->
    @talos.state = state ? $.start
    @talos.error = null
    @loop()

  selectVertex: ->
    try
      vertex = @graph.selectSync @talos
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
        vertex.action @talos, vertex
      catch error
        @setError Error.ActionError.create { error }
        return

  moveNext: ( vertex ) ->
    if Type.isString vertex.next
      talos.state = vertex.next
    else if Type.isSymbol vertex.next
      talos.state = vertex.next
    else if Type.isFunction vertex.next
      try
        talos.state = vertex.next talos, vertex
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


  loop: ->
    while @talos.running
      @dispatch PilotEvent.create "state", @talos

      vertex = @selectVertex()
      return if @talos.failure

      @runAction vertex
      return if @talos.failure

      @moveNext vertex
      return if @talos.failure

    @finish()
    @talos


export {
  SyncPilot
}