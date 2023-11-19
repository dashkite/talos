import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"
import * as Make from "./make"


make = generic 
  name: "edge make"
  default: ( args... ) -> 
    throw new Error "Edge.make: input is malformed #{JSON.stringify args}"

generic make, Type.isObject, ( edge ) ->
  new Edge
    accept: Make.accept edge.accept
    run: Make.run edge.run
    move: Make.move edge.move


class Edge
  constructor: ({ @accept, @run, @move }) ->

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @make: make
  @isType: Type.isType @

  clone: ->
    new Edge { @accept, @run, @move }


export {
  Edge
}