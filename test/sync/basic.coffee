import { Machine, Talos, $start, $end } from "../../src"
import { start, run } from "../../src/sync"
import * as Type from "@dashkite/joy/type"
import * as h from "../helpers"

add = ( talos, event ) ->
  talos.context.sum += event
grow = ( talos ) ->
  talos.context.product *= 2


test = ->
  A = Machine.make
    start:
      hold: 
        run: add
    hold:
      hold:
        run: add

  B = Machine.make
    start:
      first: 
        run: grow
    first:
      second:
        run: grow
    second: 
      end:
        run: grow


  [
    h.test "start", h.target "sync", ->
      cycle = start A
      h.assert Type.isIterator cycle

    h.test "run while consuming events", h.target "sync", ->
      events = [ 1, 2, 3 ]
      talos = run A, sum: 0, events
      h.assert.equal 6, talos?.context?.sum

    h.test "run without events and reconsume context", h.target "sync", ->
      talos = run B, product: 1
      h.assert.equal 8, talos.context?.product

    h.test "functional composition", h.target "sync", ->
      a = ( talos ) -> talos.context.sum = 1
      b = ( talos ) -> talos.context.sum += 2
      c = ( talos ) -> talos.context.sum += 3 
      
      talos = run [ a, b, c ]
      h.assert.equal 6, talos?.context?.sum

  ]

export { test as basic }