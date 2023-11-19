import * as Type from "@dashkite/joy/type"
import { negate } from "@dashkite/joy/predicate"
import { generic } from "@dashkite/joy/generic"
import { Graph, Talos } from "../containers"
import * as Errors from "../containers/errors"


matchVertex = ( graph, talos ) ->
  vertex = graph.get talos
  if !vertex?
    talos.throw Errors.InvalidState.make "talos state is
      not in graph"
  vertex

matchEdge = ( vertex, talos, transforms ) ->
  for edge in vertex.edges
    if ( edge.accept talos, transforms... ) == true
      return edge
  talos.throw Errors.MissingTransition.make "no edge matches transform"

run = ( edge, talos, transforms ) ->
  if edge.run?
    try
      edge.run talos, transforms...
    catch error
      talos.throw Errors.FailedRun.make error, 
        "encountered an error while running edge function"

move = ( edge, talos, transforms ) ->
  try
    edge.move talos, transforms...
  catch error
    talos.throw Errors.FailedMove.make error, 
      "encountered an error while moving states"


step = generic 
  name: "step talos"
  default: ( args... ) -> 
    throw new Error "step: input is malformed #{JSON.stringify args}"

generic step, Graph.isType, Talos.isType, Type.isAny, ( graph, talos, transforms... ) ->
  _step graph, talos, transforms

generic step, Graph.isType, ( negate Talos.isType ), ( graph, transforms... ) ->
  step graph, Talos.make(), transforms


_step = ( graph, talos, transforms ) ->
  vertex = matchVertex graph, talos
  return talos if talos.halted

  edge = matchEdge vertex, talos, transforms
  return talos if talos.halted

  run edge, talos, transforms
  return talos if talos.halted

  move edge, talos, transforms
  talos


debug = generic 
  name: "debug step talos"
  default: ( args... ) -> 
    throw new Error "debug step: input is malformed #{JSON.stringify args}"

generic debug, Graph.isType, Talos.isType, Type.isAny, ( graph, talos, transforms... ) ->
  _debug graph, talos, transforms

generic debug, Graph.isType, ( negate Talos.isType ), ( graph, transforms... ) ->
  _debug graph, Talos.make(), transforms


_debug = ( graph, talos, transforms ) ->
  console.log "starting step", { graph, talos, transforms }

  vertex = matchVertex graph, talos
  if talos.halted
    console.error "encountered error matching vertex", talos.error.error, talos
    return talos
  else
    console.log "vertex matched", { vertex, talos }
  
  edge = matchEdge vertex, talos, transforms
  if talos.halted
    console.error "encountered error matching edge", talos.error.error, talos
    return talos
  else
    console.log "edge matched", { edge, talos }

  run edge, talos, transforms
  if talos.halted
    console.error "encountered error running edge function", talos.error.error, talos
    return talos
  else
    console.log "edge function complete", { talos }

  move edge, talos, transforms
  if talos.halted
    console.error "encountered error running move function", talos.error.error, talos
    return talos
  else
    console.log "talos move complete", { talos }

  talos


export {
  step
  debug

  matchVertex
  matchEdge 
  run
  move
}