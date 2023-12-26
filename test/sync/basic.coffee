import { Machine, Talos, $start, $end } from "../../src"
import { start, run, build, pipe } from "../../src/sync"
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
      talos = start A
      h.assert Talos.isType talos

    h.test "run while waiting on events", h.target "sync", ->
      events = [ 1, 2, 3 ]
      talos = start A
      run talos, sum: 0, events
      h.assert.equal 6, talos.context?.sum

    h.test "auto-run without events", h.target "sync", ->
      talos = start B
      run talos, product: 1
      h.assert.equal 8, talos.context?.product

    h.test "build", h.target "sync", ->
      f = build B
      h.assert Type.isFunction f
      talos = f product: 1
      h.assert.equal 8, talos.context?.product

    h.test "pipe", h.target "sync", ->
      a = ( talos, context ) -> context.sum = 1
      b = ( talos, context ) -> context.sum += 2
      c = ( talos, context ) -> context.sum += 3 

      f = pipe [ a, b, c ]
      h.assert Type.isFunction f
      context = f {}
      h.assert.equal 6, context?.sum

  ]

export { test as basic }