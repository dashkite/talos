import { generic } from "@dashkite/joy/generic"
import * as Fn from "@dashkite/joy/function"
import * as Type from "@dashkite/joy/type"
import { Machine } from "./machine"
import { Talos } from "./talos"
import { isMachine, isGeneratorFunction } from "./types"


Step =
  matchVertex: ( talos ) ->
    vertex = talos.machine.graph[ talos.state ]
    if !vertex?
      talos.catch new Error "talos state is not in machine graph"
    vertex

  matchEdge: ( vertex, talos, event ) ->
    for edge in vertex.edges
      try
        if ( edge.when talos, event ) == true
          return edge
      catch error
        return talos.catch error
    talos.catch new Error "no matching when condition"

  run: ( edge, talos, event ) ->
    try
      if isGeneratorFunction edge.run
        yield from edge.run talos, event
      else if Type.isFunction edge.run
        edge.run talos, event
    catch error
      talos.catch error

  move: ( edge, talos, event ) ->
    try
      previous = talos.state
      edge.move talos, event
      talos.previousState = previous
    catch error
      talos.catch error

  tick: ( talos, event ) ->
    vertex = Step.matchVertex talos
    yield talos if talos.ended
    edge = Step.matchEdge vertex, talos, event
    yield talos if talos.ended
    yield from Step.run edge, talos, event
    yield talos if talos.ended
    Step.move edge, talos, event
    yield talos   # this is the happy-path yield


start = generic name: "talos: sync start"

generic start, isMachine, ( machine ) ->
  talos = Talos.make machine
  start talos

# Create generator where state machine consumes its own context repeatedly.
generic start, Talos.isType, ( talos ) ->
  loop
    for current from Step.tick talos, talos.context
      yield current
      return if talos.ended

generic start, isMachine, Type.isIterable, ( machine, events ) ->
  talos = Talos.make machine
  start talos, events

# Create generator where state machine consumes values from iterator.
generic start, Talos.isType, Type.isIterable, ( talos, events ) ->
  for event from events
    for current from Step.tick talos, event
      yield current
      return if talos.ended

generic start, isMachine, Type.isObject, ( machine, context ) ->
  talos = Talos.make machine
  talos.context = context
  start talos

generic start, Talos.isType, Type.isObject, ( talos, context ) ->
  talos.context = context
  start talos

generic start, isMachine, Type.isObject, Type.isIterable, ( machine, context, events ) ->
  talos = Talos.make machine
  talos.context = context
  start talos, events

generic start, Talos.isType, Type.isObject, Type.isIterable, ( talos, context, events ) ->
  talos.context = context
  start talos, events


# Convenience function to keep going and only return the final talos.
run = generic name: "talos: sync run"

# Further convenience to support automatically using start.
generic run, Type.isAny, ( args... ) ->
  run start args...

generic run, Type.isIterator, ( iterator ) ->
  for talos from iterator
    result = talos
  result

pipe = ( fx ) ->
  ( args... ) ->
    talos = run start fx, args...
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
  pipe
}