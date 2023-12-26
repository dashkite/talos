import { Machine, Vertex, Edge } from "./machine"
import { Talos } from "./talos"
import * as Sync from "./sync"
import * as Async from "./async"
import { $start, $end, atStart, atEnd } from "./states"


machine = Machine.make
pipe = Sync.pipe
flow = Async.flow

export default {
  Machine, Vertex, Edge
  Talos
  Sync, Async
  $start, $end, atStart, atEnd
  machine, pipe, flow
}

export {
  Machine, Vertex, Edge
  Talos
  Sync, Async
  $start, $end, atStart, atEnd
  machine, pipe, flow
}