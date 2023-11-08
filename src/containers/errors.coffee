import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"


class TalosError extends Error
  constructor: ({ message }) ->
    super message

  @create: ( options ) ->
    new TalosError options

  @isType: Type.isType @
  @isKind: Type.isKind @


class UnknownState extends TalosError
  constructor: ->
    super message: "talos cannot find the current state in this graph"

  @create: ->
    new UnknownState()

  @isType: Type.isType @


class UnknownNext extends TalosError
  constructor: ({ vertex }) ->
    super message: "talos cannot determine the next state from this vertex"
    @vertex = vertex

  @create: ( options ) ->
    new UnknownNext options

  @isType: Type.isType @


class ActionError extends TalosError
  constructor: ({ error }) ->
    super message: "talos encountered an error while running this action"
    @error = error

  @create: ( options ) ->
    new ActionError options

  @isType: Type.isType @


class NextError extends TalosError
  constructor: ({ error }) ->
    super message: "talos encountered an error while resolving next state"
    @error = error

  @create: ( options ) ->
    new NextError options

  @isType: Type.isType @


export {
  TalosError
  UnknownState
  UnknownNext
  ActionError
  NextError
}