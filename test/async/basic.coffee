import { Machine, Talos, $start, $end } from "../../src"
import { start, run, build, flow, flowWith } from "../../src/async"
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

    h.test "run while waiting on events", h.target "async", ->
      events = [ 
        new Promise ( resolve, reject ) -> resolve 1
        new Promise ( resolve, reject ) -> resolve 2
        new Promise ( resolve, reject ) -> resolve 3
      ]
      cycle = start A, sum: 0, events
      talos = await run cycle
      h.assert.equal 6, talos.context?.sum

    h.test "auto-run without events", h.target "async", ->
      cycle = start B, product: 1
      talos = await run cycle
      h.assert.equal 8, talos.context?.product

    h.test "build", h.target "async", ->
      f = build B
      h.assert Type.isFunction f
      talos = await f product: 1
      h.assert.equal 8, talos.context?.product

    h.test "flow", h.target "async", ->
      a = ( talos, context ) -> context.sum = await 1
      b = ( talos, context ) -> context.sum += await 2
      c = ( talos, context ) -> context.sum += await 3 

      f = flow [ a, b, c ]
      h.assert Type.isFunction f
      context = await f {}
      h.assert.equal 6, context?.sum

    h.test "flowWith", h.target "async", ->
      a = ( talos, context ) -> context.sum = await 1
      b = ( talos, context ) -> context.sum += await 2
      c = ( talos, context ) -> context.sum += await 3 
      log = ( talos ) ->
        talos.context.product ?= 1 
        talos.context.product *= await talos.context.sum
        # console.log talos.context.product

      f = flowWith log, [ a, b, c ]
      h.assert Type.isFunction f
      context = await f {}
      h.assert.equal 6, context?.sum
      h.assert.equal 18, context?.product

  ]

export { test as basic }