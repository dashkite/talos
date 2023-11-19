import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"
import { Vertex } from "./vertex"


make = generic 
  name: "graph make"
  default: ( args... ) -> 
    throw new Error "Graph.make: input is malformed #{JSON.stringify args}"

generic make, Type.isObject, ( graph ) ->
  for state in Reflect.ownKeys graph
    vertex = graph[ state ]
    graph[ state ] = Vertex.make state, vertex

  new Graph { graph }


class Graph
  constructor: ({ @graph }) ->

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @make: make
  @isType: Type.isType @

  get: ( talos ) ->
    @graph[ talos.state ]

  has: ( talos ) ->
    @graph[ talos.state ]?


export {
  Graph
}