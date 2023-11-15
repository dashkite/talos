import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"


create = generic 
  name: "create edge move"
  default: ( args... ) -> 
    throw new Error "create edge move input is malformed #{JSON.stringify args}"

generic create, Type.isString, ( s ) ->
  ( talos, transform ) -> talos.state = s

generic create, Type.isSymbol, ( s ) ->
  ( talos, transform ) -> talos.state = s

generic create, Type.isFunction, ( f ) ->
  ( talos, transform ) -> f talos, transform


export { create as move }