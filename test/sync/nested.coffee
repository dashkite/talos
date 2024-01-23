import { Machine, $end, start, run } from "../../src/sync"
import * as h from "../helpers"


test = ->
  Run = 
    grow: ( talos ) ->
      talos.context.product *= 2

  A = Machine.make 
    name: "A"
    graph:
      start:
        default: "second"
      second:
        default: 
          run: Run.grow
          move: "third"
      third: 
        default:
          run: Run.grow
          move: $end

  Run.join = ( talos ) ->
    for inner from start A, talos.context
      yield inner

  B = Machine.make 
    name: "B"
    graph:
      start:
        default: "first" 
      first:
        default:
          run: Run.grow
          move: "join"
      join: 
        default:
          run: Run.join
          move: $end


  [
    h.test "completes operation", h.target "sync", ->
      talos = run B, product: 1
      h.assert.equal 8, talos.context?.product

    h.test "exposes lower order talos instance", h.target "sync", ->
      states = []
      for talos from start B, product: 1
        states.push
          name: talos.name
          state: talos.state
    
      expected = [ 
        name: "B"
        state: "first"
      , 
        name: "B"
        state: "join"
      , 
        name: "A"
        state: "second"
      , 
        name: "A"
        state: "third"
      ,
        name: "A"
        state: $end
      ,
        name: "B"
        state: $end
      ]
      
      h.assert.deepEqual expected, states
      
  ]

export { test as nested }