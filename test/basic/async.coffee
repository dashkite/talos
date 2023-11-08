import * as h from "../helpers"

test = ( $ ) ->
  graph = null
  talos = null

  [
    await h.test "define graph", h.target "basic-async", ->
      graph = $.lib.Graph.create [
          selector: $.start
          next: "first"
        ,
          selector: "first"
          next: "second"
        ,
          selector: "second"
          next: $.halt
      ]
    
    await h.test "define talos", h.target "basic-async", ->
      talos = $.lib.Talos.create()

    await h.test "run talos", h.target "basic-async", ->
      $.lib.runAsync graph, talos
      h.assert true, talos.success
  ]

export { test as async }