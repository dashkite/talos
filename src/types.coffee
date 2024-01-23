import * as Type from "@dashkite/joy/type"

# Async state machines can consume sync event iterators, so long as we let async
# behavior take over downstream.
isIteratorKind = ( x ) -> x[ Symbol.asyncIterator ]? || x[ Symbol.iterator ]?

# TODO: Rely on errors from machine expansion for now, but this is starting to
# look like an externally useful type.
isMachine = ( x ) -> ( Type.isObject x ) || ( Type.isArray x )

# The async module handles both sync and async cases, so we need to be pedantic
# in our type resolution so we match on both for nested machines.
generatorFunction = (-> yield null).constructor
isGeneratorFunction = Type.isKind generatorFunction
asyncGeneratorFunction = (-> yield await null).constructor
isAsyncGeneratorFunction = Type.isKind asyncGeneratorFunction
isGeneratorFunctionKind = ( x ) -> 
  (isAsyncGeneratorFunction x) || (isGeneratorFunction x)

export {
  isIteratorKind
  isMachine
  isGeneratorFunction
  isAsyncGeneratorFunction
  isGeneratorFunctionKind
}