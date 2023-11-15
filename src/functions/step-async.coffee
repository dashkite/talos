import * as Type from "@dashkite/joy/type"
import { negate } from "@dashkite/joy/predicate"
import { generic } from "@dashkite/joy/generic"
import { Graph, Talos } from "../containers"
import * as Errors from "../containers/errors"


matchVertex = ( graph, talos ) ->
  vertex = graph.get talos
  if !vertex?
    talos.throw Errors.InvalidState.create "talos state #{ talos.state } is not
      in graph"
  vertex

matchEdge = ( vertex, talos, transform ) ->
  for edge in vertex.edges
    if ( await edge.accept transform, talos ) == true
      return edge
  talos.throw Errors.MissingTransition.create "no edge matches transform 
    #{ transform }"

run = ( talos, edge ) ->
  if edge.run?
    try
      await edge.run talos
    catch error
      talos.throw Errors.FailedRun.create error, 
        "encountered an error while running edge function"

move = ( talos, edge ) ->
  try
    await edge.move talos
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

  edge = await matchEdge vertex, talos, transform
  return talos if talos.halted

  await run talos, edge
  return talos if talos.halted

  await move talos, edge
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
    console.error "encountered error matching vertex", talos.error, talos
    return talos
  else
    console.log "vertex matched", { vertex, talos }
  
  edge = await matchEdge vertex, talos, transform
  if talos.halted
    console.error "encountered error matching edge", talos.error, talos
    return talos
  else
    console.log "edge matched", { edge, talos }

  await run talos, edge
  if talos.halted
    console.error "encountered error running edge function", talos.error, talos
    return talos
  else
    console.log "edge function complete", { talos }

  await move talos, edge
  if talos.halted
    console.error "encountered error running move function", talos.error, talos
    return talos
  else
    console.log "talos move complete", { talos }

  talos



export {
  step as stepAsync
  debug as debugAsync
}