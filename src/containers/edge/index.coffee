import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"
import * as Create from "./create"


create = generic 
  name: "edge create"
  default: ( args... ) -> 
    throw new Error "Edge.create: input is malformed #{JSON.stringify args}"

generic create, Type.isObject, ( edge ) ->
  new Edge
    accept: Create.accept edge.accept
    run: Create.run edge.run
    move: Create.move edge.move


class Edge
  constructor: ({ @accept, @run, @move }) ->

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @create: create
  @isType: Type.isType @

  clone: ->
    new Edge { @accept, @run, @move }


export {
  Edge
}