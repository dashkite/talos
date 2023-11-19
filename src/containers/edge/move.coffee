import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"


make = generic 
  name: "make edge move"
  default: ( args... ) -> 
    throw new Error "make edge move input is malformed #{JSON.stringify args}"

generic make, Type.isString, ( s ) ->
  ( talos, transform ) -> talos.state = s

generic make, Type.isSymbol, ( s ) ->
  ( talos, transform ) -> talos.state = s

generic make, Type.isFunction, ( f ) ->
  ( talos, transforms... ) -> f talos, transforms...


export { make as move }