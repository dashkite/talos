import * as Fn from "@dashkite/joy/function"


oneOf = Fn.curry ( fx, value ) ->
  for f in fx
    if ( f value ) == true
      return true
  false


export {
  oneOf
}