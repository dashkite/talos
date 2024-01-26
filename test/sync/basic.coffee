import { Machine, Talos, $start, $end, start, run, pipe } from "../../src/sync"
import * as Type from "@dashkite/joy/type"
import * as h from "../helpers"

add = ( talos, event ) ->
  talos.context.sum += event
grow = ( talos ) ->
  talos.context.product *= 2


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
    h.test "start", h.target "sync", ->
      h.assert Type.isIterator start A

    h.test "run while consuming events", h.target "sync", ->
      events = [ 1, 2, 3 ]
      talos = run A, sum: 0, events
      h.assert.equal 6, talos?.context?.sum

    h.test "run without events and reconsume context", h.target "sync", ->
      talos = run B, product: 1
      h.assert.equal 8, talos.context?.product

    h.test "pipe functional composition", h.target "sync", ->
      a = ( talos ) -> talos.context.sum = 1
      b = ( talos ) -> talos.context.sum += 2
      b2 = -> throw new Error "b2"
      c = ( talos ) -> talos.context.sum += 3
      
      f = pipe [ a, b, b, c ]
      h.assert Type.isFunction f
      context = f()
      h.assert.equal 8, context?.sum

      g = pipe [ a, b, b2, c ]
      try
        g()
        throw new Error "did not throw"
      catch error
        h.assert error.message == "b2"

    h.test "handles error", h.target "sync", ->
      a = ( talos ) -> talos.context.sum = await 1
      b = ( talos ) -> throw new Error "b"
      c = ( talos ) -> talos.context.sum += await 3 

      talos = run start [ a, b, c ]
      h.assert talos.failure
      h.assert.equal $end, talos.state
      h.assert.equal "b", talos.previousState
  ]

export { test as basic }