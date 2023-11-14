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


export {
  step as stepAsync
}