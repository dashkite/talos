import "source-map-support/register"
import { success } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import * as h from "./helpers"

import * as Strict from "./strict"
import * as Stable from "./stable"

do ->

  $ = {}

  print await h.test "Talos", [
    await h.test "Strict", [
      await h.test "Sync", await Strict.sync $
      await h.test "Async", await Strict.async $
    ]

    await h.test "Stable", [
      await h.test "Sync", await Stable.sync $
      await h.test "Async", await Stable.async $
    ]
  ]

  process.exit if success then 0 else 1
