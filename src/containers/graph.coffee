import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"
import { Vertex } from "./vertex"


create = generic 
  name: "graph create"
  default: ( args... ) -> 
    throw new Error "Graph.create: input is malformed #{JSON.stringify args}"

generic create, Type.isObject, ( graph ) ->
  for state in Reflect.ownKeys graph
    vertex = graph[ state ]
    graph[ state ] = Vertex.create state, vertex

  new Graph { graph }


class Graph
  constructor: ({ @graph }) ->

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @create: create
  @isType: Type.isType @

  get: ( talos ) ->
    @graph[ talos.state ]

  has: ( talos ) ->
    @graph[ talos.state ]?


export {
  Graph
}