import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"


make = generic 
  name: "make edge run"
  default: ( args... ) -> 
    throw new Error "make edge run input is malformed #{JSON.stringify args}"

generic make, Type.isUndefined, ->
  null

generic make, Type.isFunction, ( f ) ->
  ( talos, transforms... ) -> f talos.context, transforms...


export { make as run }