import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import * as Value from "@dashkite/joy/value"
import { generic } from "@dashkite/joy/generic"
import { oneOf } from "../helpers"
import { Edge } from "./edge"


isState = oneOf [
  Type.isString
  Type.isSymbol
]

_make = ( type ) ->
  make = generic 
    name: "vertex make"
    default: ( args... ) -> 
      throw new Error "Vertex.make: input is malformed #{JSON.stringify args}"

  generic make, isState, Type.isArray, ( state, edges ) ->
    new Vertex
      state: state
      edges: ( Edge.make edge for edge in edges )

  generic make, isState, Type.isObject, ( state, _vertex ) ->
    { edges, metadata... } = _vertex    
    new Vertex {
      metadata
      state
      edges: ( Edge.make edge for edge in edges )
    }

  generic make, isState, Type.isUndefined ( state, _null ) ->
    make state, []

  generic make, isState, ( state ) ->
    make state, []

  generic make, type.isType, ( vertex ) ->
    vertex.clone()

  generic make, isState, type.isType, ( state, _vertex ) ->
    vertex = _vertex.clone()
    vertex.state = state
    vertex

  make


class Vertex
  constructor: ({ @state, @edges, @metadata }) ->

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @make: _make @
  @isType: Type.isType @

  clone: ->
    state = Value.clone @state
    edges = ( edge.clone() for edge in @edges )
    new Vertex { state, edges }


export {
  isState
  Vertex
}