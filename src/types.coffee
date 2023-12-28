import * as Type from "@dashkite/joy/type"

# These async functions can consume sync iterators, so long as we let async
# behavior take over downstream.
isIteratorKind = ( x ) -> x[ Symbol.asyncIterator ]? || x[ Symbol.iterator ]?

# TODO: Rely on errors from machine expansion for now, but this is starting to
# look like an externally useful type.
isMachine = ( x ) -> ( Type.isObject x ) || ( Type.isArray x )


export {
  isIteratorKind
  isMachine
}