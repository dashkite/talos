import * as Fn from "@dashkite/joy/function"
import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"
import { Graph, Talos, Drive } from "../containers"
import * as Async from "../strict/async"
import * as h from "./helpers"


flow = generic 
  name: "talos flow"
  default: ( args... ) -> 
    throw new Error "flow: input is malformed #{JSON.stringify args}"

generic flow, h.isFunctionArray, ( fx ) ->
  _flow {}, fx

generic flow, Type.isObject, h.isFunctionArray, ( options, fx ) ->
  _flow options, fx

_flow = ( options, fx ) ->
  if fx.length == 0
    if options.debug == true
      console.log "[ flow ] empty function list, mapping to no-op"
    return ( x ) -> await Promise.resolve() ; x
  
  f = fx[ 0 ]
  graph = Graph.make h.expand fx
  talos = Talos.make()
  step = if options.debug == true then debug else Async.step
  drive = Drive.make graph, talos, step

  Fn.arity f.length, ( args... ) ->
    await drive.update args...
    loop
      h.check talos
      return talos.context if talos.halted
      await drive.update()


finished = h.finished "flow"

debug = ( graph, talos, transforms... ) ->
  vertex = Async.matchVertex graph, talos
  name = h.nameVertex vertex
  return talos if finished talos

  edge = await Async.matchEdge vertex, talos, transforms
  return talos if finished talos

  console.log "[ flow ] starting step #{ name }", talos.context
  if transforms.length > 0
    console.log "arguments", transforms...
  await Async.run edge, talos, transforms
  return talos if finished talos
  console.log "[ flow ] finished step #{ name }"

  await Async.move edge, talos, transforms
  return talos if finished talos
  talos



export {
  flow
}