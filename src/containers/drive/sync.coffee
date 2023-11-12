import * as Type from "@dashkite/joy/type"
import * as Meta from "@dashkite/joy/metaclass"
import * as $ from "../../internal/states"
import * as Error from "../errors"
import { verify, Drive, DriveEvent } from "./drive"


class SyncDrive extends Drive
  constructor: ( options ) ->
    super options

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @create: ( options ) ->
    verify options
    new SyncDrive options

  @isType: Type.isType @


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
      @talos.state = vertex.next
    else if Type.isSymbol vertex.next
      @talos.state = vertex.next
    else if Type.isFunction vertex.next
      try
        @talos.state = vertex.next @talos, vertex
      catch error
        @setError Error.NextError.create { error }
        return
    else
      @halt()

  start: ->
    while !@halted
      @dispatch DriveEvent.create "state", @talos.clone()

      vertex = @selectVertex()
      return if @halted

      @runAction vertex
      return if @halted

      @moveNext vertex
      return if @halted

    return


export {
  SyncDrive
}