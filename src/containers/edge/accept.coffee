import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"


create = generic 
  name: "create edge accept"
  default: ( args... ) -> 
    throw new Error "create edge accept input is malformed #{JSON.stringify args}"

generic create, Type.isString, ( s ) ->
  ( talos, transform ) -> transform == s

generic create, Type.isSymbol, ( s ) ->
  ( talos, transform ) -> transform == s

generic create, Type.isNumber, ( n ) ->
  ( talos, transform ) -> transform == n

generic create, Type.isBoolean, ( b ) ->
  -> b

generic create, Type.isRegExp, ( re ) ->
  ( talos, transform ) -> 
    ( Type.isString transform ) && ( re.test transform )

generic create, Type.isFunction, ( f ) ->
  ( talos, transform ) -> f talos, transform



export { create as accept }