import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"


create = generic 
  name: "create edge accept"
  default: ( args... ) -> 
    throw new Error "create edge accept input is malformed #{JSON.stringify args}"

generic create, Type.isString, ( s ) ->
  ( transform ) -> transform == s

generic create, Type.isSymbol, ( s ) ->
  ( transform ) -> transform == s

generic create, Type.isNumber, ( n ) ->
  ( transform ) -> transform == n

generic create, Type.isBoolean, ( b ) ->
  -> b

generic create, Type.isRegExp, ( re ) ->
  ( transform ) -> 
    ( Type.isString transform ) && ( re.test transform )

generic create, Type.isFunction, ( f ) ->
  ( transform, talos ) -> f transform, talos



export { create as accept }