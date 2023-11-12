import * as Type from "@dashkite/joy/type"
import * as Meta from "@dashkite/joy/metaclass"


verify = ( type, detail ) ->
  if !Type.isString type
    throw new Error "PilotEvent.create: type is malformed"


class PilotEvent extends CustomEvent
  constructor: ( type, detail ) ->
    super type, { detail }

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @create: ( type, detail ) ->
    verify type, detail
    new PilotEvent type, detail

  @isType: Type.isType @