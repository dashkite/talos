import { Machine, $start, $end } from "../../src"
import * as h from "../helpers"


test = ->
  [
    h.test "compact + strings", h.target "machine", ->
      machine = Machine.make
        start: "alpha"
        alpha:
          when: "beta"
          move: "beta"
        beta:
          end: true

      h.assert machine.graph[ $start ]?
      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when() == true
      h.assert !edge.run?
      h.assert ( edge.move {} ) == "alpha"

      edge = machine.graph[ "alpha" ].edges[0]
      h.assert edge.when(false, "beta") == true
      h.assert ( edge.move {} ) == "beta"

      edge = machine.graph[ "beta" ].edges[0]
      h.assert ( edge.move {} ) == $end


    h.test "compact + booleans", h.target "machine", ->
      machine = Machine.make
        start:
          alpha: true
        alpha:
          ignore: false
          end: true

      h.assert machine.graph[ $start ]?
      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when() == true
      h.assert !edge.run?
      h.assert ( edge.move {} ) == "alpha"

      edge = machine.graph[ "alpha" ].edges[0]
      h.assert edge.when() == false
      h.assert ( edge.move {} ) == "ignore"

      edge = machine.graph[ "alpha" ].edges[1]
      h.assert ( edge.move {} ) == $end


    h.test "compact + functions", h.target "machine", ->
      A = -> true

      machine = Machine.make
        start:
          alpha: A

      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when == A
      h.assert !edge.run?
      h.assert ( edge.move {} ) == "alpha"


    h.test "objects + booleans", h.target "machine", ->
      machine = Machine.make
        start:
          alpha:
            when: true
            run: -> 1 + 1
            move: "alpha"

      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when() == true
      h.assert edge.run() == 2
      h.assert ( edge.move {} ) == "alpha"


    h.test "objects + functions", h.target "machine", ->
      A = -> true

      machine = Machine.make
        start:
          alpha:
            when: A
            run: -> 1 + 1
            move: ( talos ) -> talos.state = "alpha"

      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when == A
      h.assert edge.run() == 2
      h.assert ( edge.move {} ) == "alpha"

    h.test "objects - when and move", h.target "machine", ->
      A = -> true

      machine = Machine.make
        start:
          alpha: run: -> 1 + 1

      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when() == true
      h.assert edge.run() == 2
      h.assert ( edge.move {} ) == "alpha"

    h.test "object + shorthand edges", h.target "machine", ->
      machine = Machine.make
        start:
          run: ( talos ) ->
          move: "alpha"
        alpha:
          move: $end

      h.assert machine.graph[ $start ]?
      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when() == true
      h.assert edge.run?
      h.assert ( edge.move {} ) == "alpha"


    h.test "arrays + booleans", h.target "machine", ->
      machine = Machine.make
        start: [
          when: true
          move: "alpha"
        ]

      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when() == true
      h.assert !edge.run?
      h.assert ( edge.move {} ) == "alpha"


    h.test "arrays + functions", h.target "machine", ->
      A = -> true

      machine = Machine.make
        start: [
          when: A
          run: -> 1 + 1
          move: ( talos ) -> talos.state = "alpha"
        ]

      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when == A
      h.assert edge.run() == 2
      h.assert ( edge.move {} ) == "alpha"


    h.test "compact with default", h.target "machine", ->
      machine = Machine.make
        start:
          ignore: false
          default: "alpha"
          alsoIgnore: false

      edge = machine.graph[ $start ].edges.at -1
      h.assert edge.when() == true
      h.assert ( edge.move {} ) == "alpha"


    h.test "terminal function", h.target "machine", ->
      machine = Machine.make
        start: -> 1 + 1

      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when() == true
      h.assert edge.run() == 2
      h.assert ( edge.move {} ) == $end


    h.test "expansion from linear composition", h.target "machine", ->
      A = ->
      B = ->
      C = ->
      
      machine = Machine.make [ A, B, C ]

      h.assert machine.graph[ $start ].edges[0].move({}) == "A"
      h.assert machine.graph[ "A" ].edges[0].run == A
      h.assert machine.graph[ "C" ].edges[0].move({}) == $end

    h.test "expansion from annotated linear composition", h.target "machine", ->
      A = ->
      B = ->
      C = ->
      
      machine = Machine.make [ 
        "first", A
        "second", B
        "third", C
      ]

      h.assert machine.graph[ $start ].edges[0].move({}) == "first"
      h.assert machine.graph[ "first" ].edges[0].run == A
      h.assert machine.graph[ "third" ].edges[0].move({}) == $end

    h.test "named machine :: arguments", h.target "machine", ->
      machine = Machine.make "custom name",
        start: -> 1 + 1

      h.assert.equal "custom name", machine.name
      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when() == true
      h.assert edge.run() == 2
      h.assert ( edge.move {} ) == $end

    h.test "named machine :: interface", h.target "machine", ->
      machine = Machine.make 
        name: "custom name"
        graph:
          start: -> 1 + 1

      h.assert.equal "custom name", machine.name
      edge = machine.graph[ $start ].edges[0]
      h.assert edge.when() == true
      h.assert edge.run() == 2
      h.assert ( edge.move {} ) == $end

    h.test "named machine :: linear composition", h.target "machine", ->
      A = ->
      B = ->
      C = ->
      
      machine = Machine.make "custom name", [ A, B, C ]

      h.assert.equal "custom name", machine.name
      h.assert machine.graph[ $start ].edges[0].move({}) == "A"
      h.assert machine.graph[ "A" ].edges[0].run == A
      h.assert machine.graph[ "C" ].edges[0].move({}) == $end

  ]

export { test as expansions }