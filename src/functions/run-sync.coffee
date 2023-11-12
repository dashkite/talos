import * as Fn from "@dashkite/joy/function"
import * as Type from "@dashkite/joy/type"
import { Graph, Vertex, Talos } from "../containers"
import * as Error from "../containers/errors"


runSync = Fn.curry Fn.rtee ( graph, talos ) ->
  if ! Graph.isType graph
    throw new Error "runSync: graph instance is invalid"

  if ! Talos.isType talos
    throw new Error "runSync: talos instance is invalid"


  loop
    if talos.halted
      break

    vertex = graph.selectSync talos
    if !vertex?
      talos.error = Error.UnknownState.create()
      talos.halt()
      continue
    
    if vertex.action?
      try
        vertex.action talos, vertex
      catch error
        talos.error = Error.ActionError.create { error }
        talos.halt()
        continue

    if Type.isString vertex.next
      talos.state = vertex.next
    else if Type.isSymbol vertex.next
      talos.state = vertex.next
    else if Type.isFunction vertex.next
      try
        talos.state = vertex.next talos, vertex
      catch error
        talos.error = Error.NextError.create { error }
        talos.halt()
        continue
    else
      talos.halt()
      continue


  talos


export {
  runSync
}