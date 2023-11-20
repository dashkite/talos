import * as Type from "@dashkite/joy/type"
import * as Value from "@dashkite/joy/value"
import * as Time from "@dashkite/joy/time"
import { Graph, expand, flow } from "../../src"
import * as h from "../helpers"

test = -> h.target "linear-flow", ->
  sum = ( c, x, y, z ) -> 
    await Time.sleep 1
    c.result = x + y + z 
  double = ( c ) -> 
    await Time.sleep 1
    c.result *= 2
  triple = ( c ) -> 
    await Time.sleep 1
    c.result *= 3

  f = flow [
    sum
    double
    triple
  ]

  h.assert ( Type.isFunction f ), "flow did not build a function"
  h.assert ( f.length == 4 ), "flow did not maintain starting arity"
  
  result = await f 1, 2, 3
  if ! Value.equal { result: 36 }, result
    console.error result
    throw new Error "composition failed to produce expected output"


  g = flow debug: true, [
    sum
    double
    triple
  ]

  h.assert ( Type.isFunction g ), "flow debug did not build a function"
  # await g 1, 2, 3


export { test as flow }