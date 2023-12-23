import assert from "@dashkite/assert"
import { test as amenTest } from "@dashkite/amen"
import { confidential } from "panda-confidential";

Confidential = confidential()

test = ( name, value ) ->
  if Array.isArray value
    amenTest name, value
  else
    amenTest description: name, wait: false, value

targets = do ->
  _targets = ( process.env.targets?.split /\s+/ ) ? [ "all" ]
  _targets

doesMatch = ( name ) ->
  for target in targets
    if name.startsWith target
      return true
  false

target = ( name, value ) ->
  if targets.includes "all"
    value
  else if doesMatch name
    value
  else
    null


random = ( options = {} ) ->
  { length = 16, encoding = "base36" } = options
  Confidential.convert from: "bytes", to: encoding,
    await Confidential.randomBytes length

now = -> ( new Date ).toISOString()



export {
  target
  random
  now
  test
  assert
}
