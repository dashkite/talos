var _flow, _pipe, buildGraph, check, flow, isFunctionArray, pipe;
import * as Fn from "@dashkite/joy/function";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
import { Graph, Talos, Drive } from "./containers/index.js";
import { $start, $halt } from "./states.js";
import * as Sync from "./strict/sync.js";
import * as Async from "./strict/async.js";
buildGraph = function (fx) {
  var current, f, graph, i, j, len, next;
  graph = {};
  for (i = j = 0, len = fx.length; j < len; i = ++j) {
    f = fx[i];
    current = i === 0 ? $start : `${i}`;
    next = i === fx.length - 1 ? $halt : `${i + 1}`;
    graph[current] = [{
      accept: true,
      run: f,
      move: next
    }];
  }
  return Graph.make(graph);
};
check = function (talos) {
  if (talos.error != null) {
    throw talos.error.error;
  }
};
isFunctionArray = function (fx) {
  var f, j, len;
  if (!Type.isArray(fx)) {
    return false;
  }
  for (j = 0, len = fx.length; j < len; j++) {
    f = fx[j];
    if (!Type.isFunction(f)) {
      return false;
    }
  }
  return true;
};
pipe = generic({
  name: "talos pipe",
  default: function (...args) {
    throw new Error(`pipe: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(pipe, isFunctionArray, function (fx) {
  return _pipe(fx);
});
_pipe = function (fx) {
  var drive, f, graph, talos;
  if (fx.length === 0) {
    return Fn.identity;
  }
  f = fx[0];
  graph = buildGraph(fx);
  talos = Talos.make();
  drive = Drive.make(graph, talos, Sync.step);
  return Fn.arity(f.length, function (...args) {
    var j, ref;
    drive.update(...args);
    check(talos);
    if (talos.halted) {
      return talos.context;
    }
    for (j = 1, ref = fx.length; 1 <= ref ? j < ref : j > ref; 1 <= ref ? j++ : j--) {
      drive.update();
      check(talos);
    }
    return talos.context;
  });
};
flow = generic({
  name: "talos flow",
  default: function (...args) {
    throw new Error(`flow: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(flow, isFunctionArray, function (fx) {
  return _flow(fx);
});
_flow = function (fx) {
  var drive, f, graph, talos;
  if (fx.length === 0) {
    return async function (x) {
      return await x;
    };
  }
  f = fx[0];
  graph = buildGraph(fx);
  talos = Talos.make();
  drive = Drive.make(graph, talos, Async.step);
  return Fn.arity(f.length, async function (...args) {
    var j, ref;
    await drive.update(...args);
    check(talos);
    if (talos.halted) {
      return talos.context;
    }
    for (j = 1, ref = fx.length; 1 <= ref ? j < ref : j > ref; 1 <= ref ? j++ : j--) {
      await drive.update();
      check(talos);
    }
    return talos.context;
  });
};
export { pipe, flow };