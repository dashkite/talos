import { generic } from "@dashkite/joy/generic"
import * as Type from "@dashkite/joy/type"
import { $start, $end } from "./states"

isState = ( x ) -> ( Type.isString x ) || ( Type.isSymbol x )
areVertexEdges = ( x ) ->
  return false if !x.edges?
  return false if !Type.isArray x.edges
  for edge in x.edges when !Type.isObject edge
    return false
  true


normalizeWhen = ( x ) ->
  if isState x
    ( talos, event ) -> event == x
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
  make: generic name: "talos: edge make"

generic Edge.make, Type.isObject, ( object ) ->
  when: normalizeWhen object.when
  run: object.run
  move: normalizeMove object.move

generic Edge.make, isState, Type.isAny, ( move, _when ) ->
  Edge.make { move, when: _when }

generic Edge.make, isState, Type.isObject, ( move, object ) ->
  when: normalizeWhen object.when ? true
  run: object.run
  move: normalizeMove object.move ? move


isEdgeShorthand = ( value ) ->
  if !Type.isObject value
    return false
  allowed = [ "when", "run", "move" ]
  for key in (Reflect.ownKeys value) when key not in allowed
    return false
  true


Edges = 
  make: generic name: "talos: edges make"

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
  

generic Edges.make, isEdgeShorthand, ( short ) ->
  Edges.make
    short:
      when: short.when ? true
      run: short.run
      move: short.move ? $end

generic Edges.make, Type.isArray, ( array ) ->
  for edge in array
    Edge.make edge

generic Edges.make, Type.isFunction, ( f ) ->
  edge = when: true, run: f, move: $end
  [ Edge.make edge ]

generic Edges.make, isState, ( move ) ->
  Edges.make [ move ]: true

generic Edges.make, areVertexEdges, ({ edges }) ->
  for edge in edges
    when: edge.when
    run: edge.run
    move: edge.move


Vertex =
  make: ( key, value ) ->
    name: key
    edges: Edges.make value


Graph =
  fromObject: ( object ) ->
    if !object[ $start ]?
      if object.start?
        object[ $start ] = object.start
        delete object.start
      else
        throw new Error "no start state defined for this machine"

    if !object[ $end ]?
      if object.end?
        object[ $end ] = object.end
        delete object.end

    graph = {}
    for key in Reflect.ownKeys object
      graph[ key ] = Vertex.make key, object[ key ]
    graph

  fromFunctionArray: ( fx ) -> 
    if fx.length == 0
      return start: move: $end 

    names = {}
    getName = ( f ) ->
      name = f.name || "anonymous"
      if names[ name ]?
        "#{ name }-#{ ++names[ name ] }"
      else
        names[ name ] = 1
        name

    graph = start: {}
    previous = "start"
    for f, i in fx
      name = getName f
      graph[ name ] = run: f
      graph[ previous ].move = name
      previous = name
    
    graph[ previous ].move = $end
    graph
  
  fromNamedFunctionArray: ( array ) ->   
    if array.length == 0
      return start: move: $end
    
    pairs = []
    for name, i in array by 2
      pairs.push [ name, array[i + 1] ]

    graph = start: {}
    previous = "start"
    for pair in pairs
      name = pair[ 0 ]
      f = pair[ 1 ]
      graph[ name ] = run: f
      graph[ previous ].move = name
      previous = name
    
    graph[ previous ].move = $end
    graph


isMachineDescription = ( value ) ->
  (Type.isObject value) && 
    (Type.isObject value.graph)

isFunctionArray = ( value ) ->
  if !Type.isArray value
    return false
  for item in value when !Type.isFunction item
    return false
  true

isNamedFunctionArray = ( value ) ->
  if !Type.isArray value
    return false
  for item, index in value
    if index % 2 == 0
      return false if !Type.isString item
    else
      return false if !Type.isFunction item
  true

Machine =
  make: generic name: "talos: machine make"

generic Machine.make, Type.isObject, ( graph ) ->
  Machine.make { graph }

generic Machine.make, Type.isString, Type.isObject, ( name, graph ) ->
  Machine.make { name, graph }

generic Machine.make, isMachineDescription, ( machine ) ->
  name: machine.name ? "anonymous"
  graph: Graph.fromObject machine.graph

generic Machine.make, Type.isString, isMachineDescription, ( name, machine ) ->
  Machine.make { name, graph: machine.graph }

generic Machine.make, isNamedFunctionArray, ( ax ) ->
  Machine.make { graph: Graph.fromNamedFunctionArray ax }

generic Machine.make, isFunctionArray, ( fx ) ->
  Machine.make { graph: Graph.fromFunctionArray fx }

generic Machine.make, Type.isString, isNamedFunctionArray, ( name, ax ) ->
  Machine.make { name, graph: Graph.fromNamedFunctionArray ax }

generic Machine.make, Type.isString, isFunctionArray, ( name, fx ) ->
  Machine.make { name, graph: Graph.fromFunctionArray fx }


export { Machine, Vertex, Edges, Edge }