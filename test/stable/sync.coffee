import { Graph, Talos, $start, $halt } from "../../src"
import { step } from "../../src/stable/sync"
import * as h from "../helpers"

test = ( $ ) ->
  graph = null
  talos = null

  [
    await h.test "define graph", h.target "stable-sync", ->
      graph = Graph.create
        [ $start ]:
          edges: [
            accept: true
            run: null
            move: "A"
          ]
        A:
          edges: [
            accept: "go"
            run: ( talos ) ->
              talos.context.message = "made it to A, going to B"
            move: "B"
          ]
        B:
          edges: [
              accept: false
              run: ( talos ) ->
                talos.context.message = "this overwrite shouldn't happen"
              move: $halt
            ,
              accept: true
              run: null
              move: $halt
          ]
    
    await h.test "define talos", h.target "stable-sync", ->
      talos = Talos.create()

    await h.test "run talos", h.target "stable-sync", ->
      h.assert.equal $start, talos.state
      
      step graph, talos, null
      h.assert.equal "A", talos.state

      # Ignores transitions that don't match
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