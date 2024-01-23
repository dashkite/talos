import { generic } from "@dashkite/joy/generic"
import * as Fn from "@dashkite/joy/function"
import * as Type from "@dashkite/joy/type"
import { Machine } from "./machine"
import { Talos } from "./talos"
import { isMachine, isIteratorKind, isGeneratorFunctionKind } from "./types"


Step =
  matchVertex: ( talos ) ->
    vertex = talos.machine.graph[ talos.state ]
    if !vertex?
      talos.catch new Error "talos: state is not in machine graph"
    vertex

  matchEdge: ( vertex, talos, event ) ->
    for edge in vertex.edges
      try
        if ( await edge.when talos, event ) == true
          return edge
      catch error
        return talos.catch error
    talos.catch new Error "talos: no matching when condition"

  run: ( edge, talos, event ) ->
    try
      if isGeneratorFunctionKind edge.run
        for await inner from edge.run talos, event
          yield inner
        return  # prevent accumulation
      else if Type.isFunction edge.run
        await edge.run talos, event
    catch error
      talos.catch error
      yield talos

  move: ( edge, talos, event ) ->
    try
      await edge.move talos, event
    catch error
      talos.catch error

  tick: ( talos, event ) ->
    vertex = Step.matchVertex talos
    yield talos if talos.ended
    edge = await Step.matchEdge vertex, talos, event
    yield talos if talos.ended
    for await inner from Step.run edge, talos, event
      yield inner
    yield talos if talos.ended
    await Step.move edge, talos, event
    yield talos   # this is the happy-path yield


start = generic name: "talos: async start"

generic start, isMachine, ( machine ) ->
  talos = Talos.make machine
  start talos

# Create generator where state machine consumes its own context repeatedly.
generic start, Talos.isType, ( talos ) ->
  loop
    for await current from Step.tick talos, talos.context
      yield current
      return if talos.ended

generic start, isMachine, isIteratorKind, ( machine, events ) ->
  talos = Talos.make machine
  start talos, events

# Create generator where state machine consumes values from reactor.
generic start, Talos.isType, isIteratorKind, ( talos, events ) ->
  for await event from events
    for await current from Step.tick talos, event
      yield current
      return if talos.ended

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
run = generic name: "talos: async run"

# Further convenience to support automatically using start.
generic run, Type.isAny, ( args... ) ->
  run start args...

generic run, Type.isReactor, ( reactor ) ->
  for await talos from reactor
    result = talos
  result

flow = ( fx ) ->
  ( args... ) ->
    talos = await run start fx, args...
    if talos.error?
      throw talos.error
    talos.context

export * from "./states"
export * from "./machine"
export * from "./talos"
export * from "./types"
export {
  Step  
  start
  run
  flow
}