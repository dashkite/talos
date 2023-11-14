import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"


create = generic 
  name: "create edge move"
  default: ( args... ) -> 
    throw new Error "create edge move input is malformed #{JSON.stringify args}"

generic create, Type.isString, ( s ) ->
  ( talos ) -> talos.state = s

generic create, Type.isSymbol, ( s ) ->
  ( talos ) -> talos.state = s

generic create, Type.isFunction, ( f ) ->
  ( talos ) -> f talos


export { create as move }