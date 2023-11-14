import * as Time from "@dashkite/joy/time"
import * as h from "../helpers"

test = ( $ ) ->
  graph = null
  talos = null

  [
    await h.test "define graph", h.target "basic-async", ->
      graph = $.lib.Graph.create
        [ $.start ]:
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
              move: $.halt
            ,
              accept: true
              run: -> await Time.sleep 1
              move: $.halt
          ]
    
    await h.test "define talos", h.target "basic-async", ->
      talos = $.lib.Talos.create()

    await h.test "run talos", h.target "basic-async", ->
      h.assert.equal $.start, talos.state
      
      await $.lib.stepAsync graph, talos, null
      h.assert.equal "A", talos.state

      await $.lib.stepAsync graph, talos, "go"
      h.assert.equal "B", talos.state
      h.assert.equal "made it to A, going to B", talos.context.message

      await $.lib.stepAsync graph, talos, "go"
      h.assert talos.success
      h.assert.equal "made it to A, going to B", talos.context.message
  ]

export { test as async }