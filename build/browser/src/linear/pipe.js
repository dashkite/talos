var _pipe, debug, finished, pipe;
import * as Fn from "@dashkite/joy/function";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
import { Graph, Talos, Drive } from "../containers/index.js";
import * as Sync from "../strict/sync.js";
import * as h from "./helpers.js";
pipe = generic({
  name: "talos pipe",
  default: function (...args) {
    throw new Error(`pipe: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(pipe, h.isFunctionArray, function (fx) {
  return _pipe({}, fx);
});
generic(pipe, Type.isObject, h.isFunctionArray, function (options, fx) {
  return _pipe(options, fx);
});
_pipe = function (options, fx) {
  var drive, f, graph, step, talos;
  if (fx.length === 0) {
    if (options.debug === true) {
      console.log("[ pipe ] empty function list, mapping to no-op");
    }
    return Fn.identity;
  }
  f = fx[0];
  graph = Graph.make(h.expand(fx));
  talos = Talos.make();
  step = options.debug === true ? debug : Sync.step;
  drive = Drive.make(graph, talos, step);
  return Fn.arity(f.length, function (...args) {
    drive.update(...args);
    while (true) {
      h.check(talos);
      if (talos.halted) {
        return talos.context;
      }
      drive.update();
    }
  });
};
finished = h.finished("pipe");
debug = function (graph, talos, ...transforms) {
  var edge, name, vertex;
  vertex = Sync.matchVertex(graph, talos);
  name = h.nameVertex(vertex);
  if (finished(talos)) {
    return talos;
  }
  edge = Sync.matchEdge(vertex, talos, transforms);
  if (finished(talos)) {
    return talos;
  }
  console.log(`[ pipe ] starting step ${name}`, talos.context);
  if (transforms.length > 0) {
    console.log("arguments", ...transforms);
  }
  Sync.run(edge, talos, transforms);
  if (finished(talos)) {
    return talos;
  }
  console.log(`[ pipe ] finished step ${name}`);
  Sync.move(edge, talos, transforms);
  if (finished(talos)) {
    return talos;
  }
  return talos;
};
export { pipe };