import { generic } from "@dashkite/joy/generic"
import * as Fn from "@dashkite/joy/function"
import * as Type from "@dashkite/joy/type"
import log from "@dashkite/kaiko"
import { Machine } from "./machine"
import { Talos } from "./talos"
import { isMachine, isIteratorKind } from "./types"


Step =
  matchVertex: ( talos ) ->
    vertex = talos.machine.graph[ talos.state ]
    if !vertex?
      talos.catch new Error "talos state is not in machine graph"
    vertex

  matchEdge: ( vertex, talos, event ) ->
    for edge in vertex.edges
      try
        if ( await edge.when talos, event ) == true
          return edge
      catch error
        return talos.catch error
    talos.catch new Error "no matching when condition"

  run: ( edge, talos, event ) ->
    if edge.run?
      try
        await edge.run talos, event
      catch error
        talos.catch error

  move: ( edge, talos, event ) ->
    try
      await edge.move talos, event
    catch error
      talos.catch error

  tick: ( talos, event ) ->
    vertex = Step.matchVertex talos
    yield talos
    edge = await Step.matchEdge vertex, talos, event
    yield talos
    await Step.run edge, talos, event
    yield talos
    await Step.move edge, talos, event
    yield talos


start = generic 
  name: "talos: sync start"
  default: ( args... ) ->
    throw new Error "talos sync start: input is malformed #{ JSON.stringify args }"


generic start, isMachine, ( machine ) ->
  talos = Talos.make machine
  start talos

# Create generator where state machine consumes its own context repeatedly.
generic start, Talos.isType, ( talos ) ->
  loop
    for await talos from Step.tick talos, talos.context
      if talos.ended
        yield talos
        return
    yield talos
  return # prevents accumulation

generic start, isMachine, isIteratorKind, ( machine, events ) ->
  talos = Talos.make machine
  start talos, events

# Create generator where state machine consumes values from iterator.
generic start, Talos.isType, isIteratorKind, ( talos, events ) ->
  for await event from events
    for await talos from Step.tick talos, event
      if talos.ended
        yield talos
        return
    yield talos
  return # prevents accumulation

generic start, isMachine, Type.isObject, ( machine, context ) ->
  talos = Talos.make machine
  talos.context = context
  start talos

generic start, Talos.isType, Type.isObject, ( talos, context ) ->
  talos.context = context
  start talos

generic start, isMachine, Type.isObject, isIteratorKind, ( machine, context, events ) ->
  talos = Talos.make machine
  talos.context = context
  start talos, events

generic start, Talos.isType, Type.isObject, isIteratorKind, ( talos, context, events ) ->
  talos.context = context
  start talos, events


# Convenience function to keep going and only return the final talos.
run = generic 
  name: "talos: sync run"
  default: ( args... ) -> 
    throw new Error "talos sync run: input is malformed #{ JSON.stringify args }"

# Further convenience to support automatically using start.
generic run, Type.isAny, ( args... ) ->
  run start args...

generic run, isIteratorKind, ( cycle ) ->
  for await talos from cycle
    result = talos
  result

generic run, Type.isArray, ( fx ) ->
  run start fx

generic run, Type.isArray, Type.isAny, ( fx, args... ) ->
  run ( start fx ), args...


export {
  Step  
  start
  run
}