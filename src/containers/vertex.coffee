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

create = generic 
  name: "vertex create"
  default: ( args... ) -> 
    throw new Error "Vertex.create: input is malformed #{JSON.stringify args}"

generic create, isState, Type.isArray, ( state, edges ) ->
  new Vertex
    state: state
    edges: ( Edge.create edge for edge in edges )

generic create, isState, Type.isObject, ( state, _vertex ) ->
  create state, _vertex.edges

generic create, isState, Type.isUndefined ( state, _null ) ->
  create state, []

generic create, isState, ( state ) ->
  create state, []


class Vertex
  constructor: ({ @state, @edges }) ->

  Meta.mixin @::, [
    Meta.getters {}
  ]

  @create: create
  @isType: Type.isType @

  clone: ->
    state = Value.clone @state
    edges = [ @edges... ]
    new Vertex { state, edges }


export {
  isState
  Vertex
}