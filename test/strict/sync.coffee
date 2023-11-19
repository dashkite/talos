import { Graph, Talos, $start, $halt } from "../../src"
import { step } from "../../src/strict/sync"
import * as h from "../helpers"

test = ( $ ) ->
  graph = null
  talos = null

  [
    await h.test "define graph", h.target "strict-sync", ->
      graph = Graph.make
        [ $start ]:
          edges: [
            accept: true
            run: null
            move: "A"
          ]
        A:
          edges: [
            accept: "go"
            run: ( context ) ->
              context.message = "made it to A, going to B"
            move: "B"
          ]
        B:
          edges: [
              accept: false
              run: ( context ) ->
                context.message = "this overwrite shouldn't happen"
              move: $halt
            ,
              accept: true
              run: null
              move: $halt
          ]
    
    await h.test "define talos", h.target "strict-sync", ->
      talos = Talos.make()

    await h.test "run talos", h.target "strict-sync", ->
      h.assert.equal $start, talos.state
      
      step graph, talos, null
      h.assert.equal "A", talos.state

      step graph, talos, "go"
      h.assert.equal "B", talos.state
      h.assert.equal "made it to A, going to B", talos.context.message

      step graph, talos, "go"
      h.assert talos.success
      h.assert.equal "made it to A, going to B", talos.context.message
  ]

export { test as sync }