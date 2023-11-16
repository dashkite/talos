import * as Time from "@dashkite/joy/time"
import { Graph, Talos, $start, $halt } from "../../src"
import { step } from "../../src/stable/async"
import * as h from "../helpers"

test = ( $ ) ->
  graph = null
  talos = null

  [
    await h.test "define graph", h.target "stable-async", ->
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
              await Time.sleep 1
              talos.context.message = "made it to A, going to B"
            move: "B"
          ]
        B:
          edges: [
              accept: false
              run: ( talos ) ->
                await Time.sleep 1
                talos.context.message = "this overwrite shouldn't happen"
              move: $halt
            ,
              accept: true
              run: -> await Time.sleep 1
              move: $halt
          ]
    
    await h.test "define talos", h.target "stable-async", ->
      talos = Talos.create()

    await h.test "run talos", h.target "stable-async", ->
      h.assert.equal $start, talos.state
      
      await step graph, talos, null
      h.assert.equal "A", talos.state

      # Ignores transitions that don't match
      await step graph, talos, null
      h.assert.equal "A", talos.state

      await step graph, talos, "go"
      h.assert.equal "B", talos.state
      h.assert.equal "made it to A, going to B", talos.context.message

      await step graph, talos, "go"
      h.assert talos.success
      h.assert.equal "made it to A, going to B", talos.context.message
  ]

export { test as async }