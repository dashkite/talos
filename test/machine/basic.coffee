import { Machine } from "../../src"
import * as h from "../helpers"
import util from "node:util"

A = -> "beta"
B = -> "gamma"
C = -> "delta"

target = [
    when: A
]


test = ->
  [
    h.test "edge expansion", h.target "edge", ->
      machine = Machine.make
        start:
          beta: true
        beta:
          ignore: false
          gamma: "gamma"
        gamma:
          delta: ( talos, event ) -> event == "delta"
        delta:
          epsilon:
            when: "epsilon"
            move: "omicron"
        ignore:
          doesnt: "matter"
        omicron: [
            when: false
            move: "eta"
          ,
            when: true
            move: "rho"
        ]
        rho: ( x ) -> console.log "running default"

      console.log util.inspect machine, depth: null, colors: true
      # console.log machine
        

  ]

export { test as basic }