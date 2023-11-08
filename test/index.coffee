import "source-map-support/register"
import { success } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import * as lib from "../src"
import * as h from "./helpers"

import * as basic from "./basic"

do ->

  $ = { 
    lib
    lib.states...
  }

  print await h.test "Talos", [
    await h.test "Basic", [
      await h.test "Sync", await basic.sync $
      await h.test "Async", await basic.async $
    ]
  ]

  process.exit if success then 0 else 1
