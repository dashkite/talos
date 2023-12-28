import { Machine, Talos, $start, $end } from "../../src"
import { start, run } from "../../src/async"
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
    h.test "start", h.target "async", ->
      cycle = start A
      h.assert Type.isAsyncIterator cycle

    h.test "run while consuming events", h.target "async", ->
      events = [ 
        new Promise ( resolve, reject ) -> resolve 1
        new Promise ( resolve, reject ) -> resolve 2
        new Promise ( resolve, reject ) -> resolve 3
      ]
      talos = await run A, sum: 0, events
      h.assert.equal 6, talos.context?.sum

    h.test "run without events and reconsume context", h.target "async", ->
      talos = await run B, product: 1
      h.assert.equal 8, talos.context?.product

    h.test "functional composition", h.target "async", ->
      a = ( talos, context ) -> context.sum = await 1
      b = ( talos, context ) -> context.sum += await 2
      c = ( talos, context ) -> context.sum += await 3 

      talos = await run [ a, b, c ]
      h.assert.equal 6, talos?.context?.sum

  ]

export { test as basic }