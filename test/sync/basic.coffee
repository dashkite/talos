import { Machine, Talos, $start, $end } from "../../src"
import { start, run, build, pipe, pipeWith } from "../../src/sync"
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

    h.test "run while consuming on events", h.target "sync", ->
      events = [ 1, 2, 3 ]
      cycle = start A, sum: 0, events
      talos = run cycle
      h.assert.equal 6, talos?.context?.sum

    h.test "run without events and reconsume context", h.target "sync", ->
      cycle = start B, product: 1
      talos = run cycle
      h.assert.equal 8, talos.context?.product

    h.test "build", h.target "sync", ->
      f = build B
      h.assert Type.isFunction f
      talos = f product: 1
      h.assert.equal 8, talos.context?.product

    h.test "pipe", h.target "sync", ->
      a = ( talos ) -> talos.context.sum = 1
      b = ( talos ) -> talos.context.sum += 2
      c = ( talos ) -> talos.context.sum += 3 

      f = pipe [ a, b, c ]
      h.assert Type.isFunction f
      context = f {}
      h.assert.equal 6, context?.sum

    h.test "pipeWith", h.target "sync", ->
      a = ( talos ) -> talos.context.sum = 1
      b = ( talos ) -> talos.context.sum += 2
      c = ( talos ) -> talos.context.sum += 3 
      log = ( talos ) ->
        talos.context.product ?= 1 
        talos.context.product *= talos.context.sum
        # console.log talos.context.product

      f = pipeWith log, [ a, b, c ]
      h.assert Type.isFunction f
      context = f {}
      h.assert.equal 6, context?.sum
      h.assert.equal 18, context?.product

  ]

export { test as basic }