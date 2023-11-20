import * as Type from "@dashkite/joy/type"
import { $start, $halt } from "../states"


expand = ( fx ) ->
  graph = {}    
  for f, i in fx
    current = if i == 0 then $start else "#{ i }"
    next = if i == fx.length - 1 then $halt else "#{ i + 1 }"

    graph[ current ] = 
      name: if !f.name? || f.name == "" then "anonymous-#{ i }" else f.name
      edges: [
        accept: true
        run: f
        move: next
      ] 
  
  graph

check = ( talos ) ->
  if talos.error?
    throw talos.error.error

isFunctionArray = ( fx ) ->
  if ! Type.isArray fx
    return false
  for f in fx
    return false if ! Type.isFunction f
  true


nameVertex = ( vertex ) ->
  name = vertex.metadata.name
  if Type.isSymbol name
    "[Symbol #{ name.toString() } ]"
  else
    name

finished = ( name ) ->
  ( talos ) ->
    if talos.failure
      console.error "[ #{ name } ] encountered error", talos.error.error
      true
    else if talos.success
      console.log "[ #{ name } ] graph traversal complete", talos.context
      true
    else
      false


export {
  expand
  check
  isFunctionArray
  nameVertex
  finished
}