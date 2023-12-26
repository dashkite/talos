import { generic } from "@dashkite/joy/generic"
import * as Type from "@dashkite/joy/type"
import log from "@dashkite/kaiko"
import { Machine } from "./machine"
import { Talos } from "./talos"


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

  step: ( talos, event ) ->
    console.log "new event", { event }
    vertex = Step.matchVertex talos
    return talos if talos.ended

    edge = await Step.matchEdge vertex, talos, event
    return talos if talos.ended

    await Step.run edge, talos, event
    return talos if talos.ended

    await Step.move edge, talos, event
    talos

  generator: ->
    loop
      await Step.step @, yield
      return @ if @ended


start = ( machine ) ->
  talos = Talos.make machine
  talos.generator = Step.generator.bind talos
  talos.cycle = talos.generator()
  talos.cycle.next() # Prime asynchronous generator
  talos


run = generic 
  name: "talos: run"
  default: ( args... ) -> 
    throw new Error "talos run: input is malformed #{ JSON.stringify args }"

generic run, Type.isObject, ( machine ) ->
  talos = start machine
  run talos, talos.context

generic run, Talos.isType, ( talos ) ->
  run talos, talos.context

generic run, Type.isObject, Type.isAny, ( machine, context ) ->
  talos = start machine
  run talos, context

generic run, Talos.isType, Type.isAny, ( talos, context ) ->
  talos.context = context
  loop
    await talos.cycle.next talos.context
    console.log "event processed", talos.state, talos.context
    break if talos.ended
  if talos.error?
    console.error talos.error
  talos

generic run, Type.isObject, Type.isAny, Type.isIterable, ( machine, context, events ) ->
  talos = start machine
  run talos, context, events

generic run, Talos.isType, Type.isAny, Type.isIterable, ( talos, context, events ) ->
  talos.context = context
  for await event from events
    await talos.cycle.next event
    console.log "event processed", talos.state, talos.context
    break if talos.ended
  if talos.error?
    console.error talos.error
  talos



build = ( talos ) ->
  ( args... ) -> run talos, args...

flow = ( fx ) ->
  machine = Machine.make fx
  ( context ) -> 
    talos = start machine
    await run talos, context
    talos.context


export {
  Step  
  start
  run
  build
  flow
}