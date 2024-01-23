import "source-map-support/register"
import { success } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import * as h from "./helpers"

import * as Machine from "./machine"
import * as Sync from "./sync"
import * as Async from "./async"

do ->

  print await h.test "Talos", [
    
    h.test "machine expansion", Machine.expansions()
    h.test "sync basic operation", Sync.basic()
    h.test "sync nested operation", Sync.nested()
    h.test "async basic operation", Async.basic()
    h.test "async nested operation", Async.nested()

  ]

  process.exit if success then 0 else 1
