import * as Type from "@dashkite/joy/type"
import * as Value from "@dashkite/joy/value"
import { Graph, expand, $start, $halt } from "../../src"
import * as h from "../helpers"

test = -> h.target "linear-expansion", ->
  sum = ( x, y, z ) -> x + y + z 
  double = ( x ) -> 2 * x
  triple = ( x ) -> 3 * x

  graph = expand [
    sum
    double
    triple
    ( x ) -> 4 * x
  ]

  expected = 
    [ $start ]:
      name: "sum"
      edges: [
        accept: true
        run: sum
        move: "1"
      ]
    "1":
      name: "double"
      edges: [
        accept: true
        run: double
        move: "2"
      ]
    "2":
      name: "triple"
      edges: [
        accept: true
        run: triple
        move: "3"
      ]
    "3":
      name: "anonymous-3"
      edges: [
        accept: true
        run: graph["3"].edges[0].run
        move: $halt
      ]

  if ! Value.equal expected, graph
    console.error graph
    throw new Error "expanded graph does not match expected shape"

  graph = Graph.make graph
  h.assert ( Graph.isType graph ), "failed to make graph instance"


export { test as expansion }