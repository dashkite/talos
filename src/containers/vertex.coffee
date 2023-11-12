import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"
import { oneOf } from "../helpers"


isSelector = oneOf [
  Type.isString
  Type.isSymbol
  Type.isRegExp
  Type.isFunction 
]

isNext = oneOf [
  Type.isUndefined
  Type.isString
  Type.isSymbol
  Type.isFunction
]

isAction = oneOf [
  Type.isUndefined
  Type.isFunction
]

verify = ( options ) ->
  { selector, next, action } = options

  unless isSelector selector
    throw new Error "Vertext.create: invalid selector, #{ selector }"

  unless isNext next
    throw new Error "Vertex.create: invalid next, #{ next }"

  unless isAction action
    throw new Error "Vertex.create: invalid action, #{ action }"


class Vertex
  constructor: ({ @selector, @next, @action }) ->
    @

  Meta.mixin @::, [
    Meta.getters
      test: ->
        @_test ?= 
          if Type.isString @selector
            ( talos ) => @selector == talos.state
          else if Type.isSymbol @selector
            ( talos ) => @selector == talos.state 
          else if Type.isRegExp @selector
            ( talos ) => 
              ( Type.isString talos.state ) && ( @selector.test talos.state )
          else if Type.isRegularFunction @selector
            ( talos ) => @selector talos, @
          else if Type.isAsyncFunction @selector
            ( talos ) => await @selector talos, @
          else
            throw new Error "Vertex#test unknown selector test, unable to match state"

      hasAsyncSelector: -> Type.isAsyncFunction @test
  ]

  @create: ( options ) ->
    verify options
    new Vertex options

  @isType: Type.isType @



export {
  Vertex
}