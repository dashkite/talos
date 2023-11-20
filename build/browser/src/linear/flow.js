var _flow, debug, finished, flow;
import * as Fn from "@dashkite/joy/function";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
import { Graph, Talos, Drive } from "../containers/index.js";
import * as Async from "../strict/async.js";
import * as h from "./helpers.js";
flow = generic({
  name: "talos flow",
  default: function (...args) {
    throw new Error(`flow: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(flow, h.isFunctionArray, function (fx) {
  return _flow({}, fx);
});
generic(flow, Type.isObject, h.isFunctionArray, function (options, fx) {
  return _flow(options, fx);
});
_flow = function (options, fx) {
  var drive, f, graph, step, talos;
  if (fx.length === 0) {
    if (options.debug === true) {
      console.log("[ flow ] empty function list, mapping to no-op");
    }
    return async function (x) {
      await Promise.resolve();
      return x;
    };
  }
  f = fx[0];
  graph = Graph.make(h.expand(fx));
  talos = Talos.make();
  step = options.debug === true ? debug : Async.step;
  drive = Drive.make(graph, talos, step);
  return Fn.arity(f.length, async function (...args) {
    await drive.update(...args);
    while (true) {
      h.check(talos);
      if (talos.halted) {
        return talos.context;
      }
      await drive.update();
    }
  });
};
finished = h.finished("flow");
debug = async function (graph, talos, ...transforms) {
  var edge, name, vertex;
  vertex = Async.matchVertex(graph, talos);
  name = h.nameVertex(vertex);
  if (finished(talos)) {
    return talos;
  }
  edge = await Async.matchEdge(vertex, talos, transforms);
  if (finished(talos)) {
    return talos;
  }
  console.log(`[ flow ] starting step ${name}`, talos.context);
  if (transforms.length > 0) {
    console.log("arguments", ...transforms);
  }
  await Async.run(edge, talos, transforms);
  if (finished(talos)) {
    return talos;
  }
  console.log(`[ flow ] finished step ${name}`);
  await Async.move(edge, talos, transforms);
  if (finished(talos)) {
    return talos;
  }
  return talos;
};
export { flow };