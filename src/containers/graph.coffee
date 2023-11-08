import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import { Vertex } from "./vertex"


verify = ( ax ) ->
  if Type.isArray ax
    for a in ax
      if Vertex.isType a
        a
      else if Type.isObject a
        Vertex.create a
      else
        throw new Error "Graph.create: array must include only vertices or vertex definitions"
  
  else
    throw new Error "Graph.create: input is malformed"


class Graph
  constructor: ({ @graph }) ->

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @create: ( ax ) ->
    new Graph graph: verify ax

  @isType: Type.isType @

  selectSync: ( talos ) ->
    for vertex in @graph
      if ( vertex.test talos ) == true
        return vertex

  selectAsync: ( talos ) ->
    for vertex in @graph
      if ( await vertex.test talos ) == true
        return vertex


export {
  Graph
}