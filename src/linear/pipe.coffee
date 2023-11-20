import * as Fn from "@dashkite/joy/function"
import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"
import { Graph, Talos, Drive } from "../containers"
import * as Sync from "../strict/sync"
import * as h from "./helpers"


pipe = generic 
  name: "talos pipe"
  default: ( args... ) -> 
    throw new Error "pipe: input is malformed #{JSON.stringify args}"

generic pipe, h.isFunctionArray, ( fx ) ->
  _pipe {}, fx

generic pipe, Type.isObject, h.isFunctionArray, ( options, fx ) ->
  _pipe options, fx

_pipe = ( options, fx ) ->
  if fx.length == 0
    if options.debug == true
      console.log "[ pipe ] empty function list, mapping to no-op"
    return Fn.identity
  
  f = fx[ 0 ]
  graph = Graph.make h.expand fx
  talos = Talos.make()
  step = if options.debug == true then debug else Sync.step
  drive = Drive.make graph, talos, step

  Fn.arity f.length, ( args... ) ->
    drive.update args...
    loop
      h.check talos
      return talos.context if talos.halted
      drive.update()


finished = h.finished "pipe"

debug = ( graph, talos, transforms... ) ->
  vertex = Sync.matchVertex graph, talos
  name = h.nameVertex vertex
  return talos if finished talos

  edge = Sync.matchEdge vertex, talos, transforms
  return talos if finished talos

  console.log "[ pipe ] starting step #{ name }", talos.context
  if transforms.length > 0
    console.log "arguments", transforms...
  Sync.run edge, talos, transforms
  return talos if finished talos
  console.log "[ pipe ] finished step #{ name }"

  Sync.move edge, talos, transforms
  return talos if finished talos
  talos



export {
  pipe
}