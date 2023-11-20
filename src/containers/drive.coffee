import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import * as Value from "@dashkite/joy/value"
import { generic } from "@dashkite/joy/generic"
import { Graph } from "./graph"
import { Talos } from "./talos"


make = generic 
  name: "drive make"
  default: ( args... ) -> 
    throw new Error "Drive.make: input is malformed #{JSON.stringify args}"

generic make, Graph.isType, Talos.isType, Type.isFunction,  ( graph, talos, step ) ->
  new Drive { graph, talos, step }


class Drive
  constructor: ({ @graph, @talos, @step }) ->

  Meta.mixin @::, [
    Meta.getters
      state: -> @talos.state
      isSync: -> Type.isRegularFunction @step
  ]

  @make: make
  @isType: Type.isType @

  update: ( transforms... ) ->
    @step @graph, @talos, transforms...


export {
  Drive
}