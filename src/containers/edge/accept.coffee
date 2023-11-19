import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"


make = generic 
  name: "make edge accept"
  default: ( args... ) -> 
    throw new Error "make edge accept input is malformed #{JSON.stringify args}"

generic make, Type.isString, ( s ) ->
  ( talos, transform ) -> transform == s

generic make, Type.isSymbol, ( s ) ->
  ( talos, transform ) -> transform == s

generic make, Type.isNumber, ( n ) ->
  ( talos, transform ) -> transform == n

generic make, Type.isBoolean, ( b ) ->
  -> b

generic make, Type.isRegExp, ( re ) ->
  ( talos, transform ) -> 
    ( Type.isString transform ) && ( re.test transform )

generic make, Type.isFunction, ( f ) ->
  ( talos, transforms... ) -> f talos, transforms...



export { make as accept }