import * as Type from "@dashkite/joy/type"
import * as Value from "@dashkite/joy/value"
import { Graph, expand, pipe } from "../../src"
import * as h from "../helpers"

test = -> h.target "linear-pipe", ->
  sum = ( c, x, y, z ) -> c.result = x + y + z 
  double = ( c ) -> c.result *= 2
  triple = ( c ) -> c.result *= 3

  f = pipe [
    sum
    double
    triple
  ]

  h.assert ( Type.isFunction f ), "pipe did not build a function"
  h.assert ( f.length == 4 ), "pipe did not maintain starting arity"
  
  result = f 1, 2, 3
  if ! Value.equal { result: 36 }, result
    console.error result
    throw new Error "composition failed to produce expected output"


  g = pipe debug: true, [
    sum
    double
    triple
  ]

  h.assert ( Type.isFunction g ), "pipe debug did not build a function"
  #g 1, 2, 3


export { test as pipe }