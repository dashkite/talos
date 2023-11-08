import * as h from "../helpers"

test = ( $ ) ->
  graph = null
  talos = null

  [
    await h.test "define graph", h.target "basic-sync", ->
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
    
    await h.test "define talos", h.target "basic-sync", ->
      talos = $.lib.Talos.create()

    await h.test "run talos", h.target "basic-sync", ->
      $.lib.runSync graph, talos
      h.assert true, talos.success
  ]

export { test as sync }