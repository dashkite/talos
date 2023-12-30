import * as Type from "@dashkite/joy/type"

# Async state machines can consume sync event iterators, so long as we let async
# behavior take over downstream.
isIteratorKind = ( x ) -> x[ Symbol.asyncIterator ]? || x[ Symbol.iterator ]?

# TODO: Rely on errors from machine expansion for now, but this is starting to
# look like an externally useful type.
isMachine = ( x ) -> ( Type.isObject x ) || ( Type.isArray x )


export {
  isIteratorKind
  isMachine
}