import * as Type from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"


create = generic 
  name: "create edge run"
  default: ( args... ) -> 
    throw new Error "create edge run input is malformed #{JSON.stringify args}"

generic create, Type.isUndefined, ->
  null

generic create, Type.isFunction, ( f ) ->
  f


export { create as run }