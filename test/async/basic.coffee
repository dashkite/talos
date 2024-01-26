import { Machine, Talos, $start, $end, start, run, flow } from "../../src/async"
import * as Type from "@dashkite/joy/type"
import * as h from "../helpers"

add = ( talos, event ) ->
  talos.context.sum += event
grow = ( talos ) ->
  talos.context.product *= await 2


test = ->
  A = Machine.make graph:
    start:
      hold: 
        run: add
    hold:
      hold:
        run: add

  B = Machine.make graph:
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
      h.assert Type.isReactor start A

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

    h.test "flow functional composition", h.target "async", ->
      a = ( talos ) -> talos.context.sum = await 1
      b = ( talos ) -> talos.context.sum += await 2
      b2 = -> await null; throw new Error "b2"
      c = ( talos ) -> talos.context.sum += await 3 

      f = flow [ a, b, b, c ]
      h.assert Type.isFunction f
      context = await f()
      h.assert.equal 8, context?.sum

      g = flow [ a, b, b2, c ]
      try
        await g()
        throw new Error "did not throw"
      catch error
        h.assert error.message == "b2"

    h.test "handles error", h.target "async", ->
      a = ( talos ) -> talos.context.sum = await 1
      b = ( talos ) -> throw new Error "b"
      c = ( talos ) -> talos.context.sum += await 3 

      talos = await run start [ a, b, c ]
      h.assert talos.failure
      h.assert.equal $end, talos.state
      h.assert.equal "b", talos.previousState
  ]

export { test as basic }