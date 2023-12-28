import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import { Machine } from "./machine"
import { $start, $end, atStart, atEnd } from "./states"


class Talos
  constructor: ({ @machine }) ->
    @state = $start
    @context = {}
    @error = null

  Meta.mixin @::, [
    Meta.getters
      ended: -> atEnd @state
      success: -> @ended && !@error?
      failure: -> @ended && @error?
      running: -> !@ended
  ]

  @make: ( _machine ) -> 
    machine = Machine.make _machine
    new Talos { machine }
  
  @isType: Type.isType @

  end: ->
    @state = $end

  catch: ( error ) ->
    @end()
    @error = error


export {
  Talos
}