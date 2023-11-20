import * as Time from "@dashkite/joy/time"
import { Graph, Talos, $start, $halt } from "../../src"
import { step } from "../../src/strict/async"
import * as h from "../helpers"

test = ->
  graph = null
  talos = null

  [
    await h.test "define graph", h.target "strict-async", ->
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
              await Time.sleep 1
              context.message = "made it to A, going to B"
            move: "B"
          ]
        B:
          edges: [
              accept: false
              run: ( context ) ->
                await Time.sleep 1
                context.message = "this overwrite shouldn't happen"
              move: $halt
            ,
              accept: true
              run: -> await Time.sleep 1
              move: $halt
          ]
    
    await h.test "define talos", h.target "strict-async", ->
      talos = Talos.make()

    await h.test "run talos", h.target "strict-async", ->
      h.assert.equal $start, talos.state
      
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