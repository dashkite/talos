import * as h from "../helpers"

test = ( $ ) ->
  { $start, $halt } = $.lib
  graph = null
  talos = null

  [
    await h.test "define graph", h.target "basic-sync", ->
      graph = $.lib.Graph.create
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
    
    await h.test "define talos", h.target "basic-sync", ->
      talos = $.lib.Talos.create()

    await h.test "run talos", h.target "basic-sync", ->
      h.assert.equal $start, talos.state
      
      $.lib.stepSync graph, talos, null
      h.assert.equal "A", talos.state

      $.lib.stepSync graph, talos, "go"
      h.assert.equal "B", talos.state
      h.assert.equal "made it to A, going to B", talos.context.message

      $.lib.stepSync graph, talos, "go"
      h.assert talos.success
      h.assert.equal "made it to A, going to B", talos.context.message
  ]

export { test as sync }