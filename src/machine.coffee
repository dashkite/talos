import { generic } from "@dashkite/joy/generic"
import * as Type from "@dashkite/joy/type"
import { $start, $end } from "./states"

isState = ( x ) -> ( Type.isString x ) || ( Type.isSymbol x )

normalizeWhen = ( x ) ->
  if isState x
    ( talos, event ) -> event == condition
  else if Type.isFunction x
    x
  else if Type.isBoolean x
    -> x
  else
    throw new Error "unable to normalize when description"

normalizeMove = ( x ) ->
  if isState x
    ( talos, event ) -> talos.state = x
  else if Type.isFunction x
    x
  else
    throw new Error "unable to normalize move description"

prioritize = ( frames ) ->
  frames.sort ( a, b ) -> 
    if a.priority < b.priority
      -1
    else if a.priority > b.priority
      1
    else
      0


Edge =
  make: generic 
    name: "talos: make edge"
    default: ( args... ) -> 
      throw new Error "talos make edge: input is malformed #{ JSON.stringify args }"

generic Edge.make, Type.isObject, ( object ) ->
  when: normalizeWhen object.when
  run: object.run
  move: normalizeMove object.move

generic Edge.make, isState, Type.isAny, ( move, _when ) ->
  Edge.make { move, when: _when }

generic Edge.make, isState, Type.isObject, ( move, object ) ->
  when: normalizeWhen object.when
  run: object.run
  move: normalizeMove object.move ? move


Edges = 
  make: generic 
    name: "talos: make edges"
    default: ( args... ) -> 
      throw new Error "talos make edges: input is malformed #{ JSON.stringify args }"

generic Edges.make, Type.isObject, ( object ) ->
  frames = []
  defaultFrame = null
  for key in Reflect.ownKeys object
    value = object[ key ]
    priority = value.priority ? 100
    if key == "default"
      defaultFrame = { key, value }
    else
      key = $end if key == "end"
      frames.push { key, value, priority }

  prioritize frames

  edges = []
  for { key, value } in frames
    edges.push Edge.make key, value

  if defaultFrame?
    # default is a special case emphasizing an always true "when" function.
    { value } = defaultFrame
    if Type.isObject value
      edges.push Edge.make { value..., when: true }
    else
      edges.push Edge.make when: true, move: value
  
  edges
  

generic Edges.make, Type.isArray, ( array ) ->
  for edge in array
    Edge.make edge

generic Edges.make, Type.isFunction, ( f ) ->
  edge = when: true, run: f, move: $end
  [ Edge.make edge ]

generic Edges.make, isState, ( move ) ->
  Edges.make [ move ]: true



Vertex =
  make: ( key, value ) ->
    name: key
    edges: Edges.make value


Machine =
  make: ( graph ) ->
    if ! Type.isObject graph
      throw new Error "Talos machine representation is malformed"

    if !graph[ $start ]?
      if graph.start?
        graph[ $start ] = graph.start
        delete graph.start
      else
        throw new Error "no start state defined for this machine"

    if !graph[ $end ]?
      if graph.end?
        graph[ $end ] = graph.end
        delete graph.end

    # TODO: Do we want a clone operation here?
    machine = graph: {}

    for key in Reflect.ownKeys graph
      value = graph[ key ]
      machine.graph[ key ] = Vertex.make key, value
    
    machine


export { Machine, Vertex, Edges, Edge }