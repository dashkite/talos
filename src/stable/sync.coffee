import * as Type from "@dashkite/joy/type"
import { negate } from "@dashkite/joy/predicate"
import { generic } from "@dashkite/joy/generic"
import { Graph, Talos } from "../containers"
import * as Errors from "../containers/errors"


matchVertex = ( graph, talos ) ->
  vertex = graph.get talos
  if !vertex?
    talos.throw Errors.InvalidState.create "talos state is
      not in graph"
  vertex

matchEdge = ( vertex, talos, transform ) ->
  for edge in vertex.edges
    if ( edge.accept talos, transform ) == true
      return edge
  return

run = ( edge, talos, transform ) ->
  if edge.run?
    try
      edge.run talos, transform
    catch error
      talos.throw Errors.FailedRun.create error, 
        "encountered an error while running edge function"

move = ( edge, talos, transform ) ->
  try
    edge.move talos, transform
  catch error
    talos.throw Errors.FailedMove.create error, 
      "encountered an error while moving states"


step = generic 
  name: "step talos"
  default: ( args... ) -> 
    throw new Error "step: input is malformed #{JSON.stringify args}"

generic step, Graph.isType, Talos.isType, Type.isAny, ( graph, talos, transform ) ->
  _step graph, talos, transform

generic step, Graph.isType, ( negate Talos.isType ), ( graph, transform ) ->
  step graph, Talos.create(), transform


_step = ( graph, talos, transform ) ->
  vertex = matchVertex graph, talos
  return talos if talos.halted

  edge = matchEdge vertex, talos, transform
  return talos if !edge?
  return talos if talos.halted

  run edge, talos, transform
  return talos if talos.halted

  move edge, talos, transform
  talos


debug = generic 
  name: "debug step talos"
  default: ( args... ) -> 
    throw new Error "debug step: input is malformed #{JSON.stringify args}"

generic debug, Graph.isType, Talos.isType, Type.isAny, ( graph, talos, transform ) ->
  _debug graph, talos, transform

generic debug, Graph.isType, ( negate Talos.isType ), ( graph, transform ) ->
  _debug graph, Talos.create(), transform


_debug = ( graph, talos, transform ) ->
  console.log "starting step", { graph, talos, transform }

  vertex = matchVertex graph, talos
  if talos.halted
    console.error "encountered error matching vertex", talos.error.error, talos
    return talos
  else
    console.log "vertex matched", { vertex, talos }
  
  edge = matchEdge vertex, talos, transform
  if !edge?
    console.log "no edge match, ignoring transform"
    return talos
  if talos.halted
    console.error "encountered error matching edge", talos.error.error, talos
    return talos
  else
    console.log "edge matched", { edge, talos }

  run edge, talos, transform
  if talos.halted
    console.error "encountered error running edge function", talos.error.error, talos
    return talos
  else
    console.log "edge function complete", { talos }

  move edge, talos, transform
  if talos.halted
    console.error "encountered error running move function", talos.error.error, talos
    return talos
  else
    console.log "talos move complete", { talos }

  talos


export {
  step
  debug
}