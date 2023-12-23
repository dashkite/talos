import "source-map-support/register"
import { success } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import * as h from "./helpers"

import * as Machine from "./machine"
# import * as Strict from "./strict"
# import * as Stable from "./stable"
# import * as Linear from "./linear"

do ->

  print await h.test "Talos", [
    
    h.test "machine", Machine.basic()

    # await h.test "Strict", [
    #   h.test "sync", Strict.sync()
    #   h.test "async", await Strict.async()
    # ]

    # await h.test "Stable", [
    #   h.test "sync", Stable.sync()
    #   h.test "async", await Stable.async()
    # ]

    # await h.test "Linear Graphs", [
    #   h.test "expansion", Linear.expansion()
    #   h.test "pipe", Linear.pipe()
    #   h.test "flow", await Linear.flow()
    # ]
  ]

  process.exit if success then 0 else 1
