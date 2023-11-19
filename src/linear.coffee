import * as Fn from "@dashkite/joy/function"
import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"
import { Graph, Talos, Drive } from "./containers"
import { $start, $halt } from "./states"
import * as Sync from "./strict/sync"
import * as Async from "./strict/async"


buildGraph = ( fx ) ->
  graph = {}    
  for f, i in fx
    current = if i == 0 then $start else "#{ i }"
    next = if i == fx.length - 1 then $halt else "#{ i + 1 }"

    graph[ current ] = [
      accept: true
      run: f
      move: next
    ] 
  
  Graph.make graph

check = ( talos ) ->
  if talos.error?
    throw talos.error.error

isFunctionArray = ( fx ) ->
  if ! Type.isArray fx
    return false
  for f in fx
    return false if ! Type.isFunction f
  true



pipe = generic 
  name: "talos pipe"
  default: ( args... ) -> 
    throw new Error "pipe: input is malformed #{JSON.stringify args}"

generic pipe, isFunctionArray, ( fx ) ->
  _pipe fx

_pipe = ( fx ) ->
  if fx.length == 0
    return Fn.identity
  
  f = fx[ 0 ]
  graph = buildGraph fx
  talos = Talos.make()
  drive = Drive.make graph, talos, Sync.step

  Fn.arity f.length, ( args... ) ->
    drive.update args...
    check talos
    if talos.halted
      return talos.context

    for [ 1 ... fx.length ]
      drive.update()
      check talos

    talos.context



flow = generic 
  name: "talos flow"
  default: ( args... ) -> 
    throw new Error "flow: input is malformed #{JSON.stringify args}"

generic flow, isFunctionArray, ( fx ) ->
  _flow fx

_flow = ( fx ) ->
  if fx.length == 0
    return ( x ) -> await x
  
  f = fx[ 0 ]
  graph = buildGraph fx
  talos = Talos.make()
  drive = Drive.make graph, talos, Async.step

  Fn.arity f.length, ( args... ) ->
    await drive.update args...
    check talos
    if talos.halted
      return talos.context

    for [ 1 ... fx.length ]
      await drive.update()
      check talos

    talos.context


export {
  pipe
  flow
}