var _debug, _step, debug, matchEdge, matchVertex, move, run, step;
import * as Type from "@dashkite/joy/type";
import { negate } from "@dashkite/joy/predicate";
import { generic } from "@dashkite/joy/generic";
import { Graph, Talos } from "../containers/index.js";
import * as Errors from "../containers/errors.js";
matchVertex = function (graph, talos) {
  var vertex;
  vertex = graph.get(talos);
  if (vertex == null) {
    talos.throw(Errors.InvalidState.create("talos state is not in graph"));
  }
  return vertex;
};
matchEdge = async function (vertex, talos, transform) {
  var edge, i, len, ref;
  ref = vertex.edges;
  for (i = 0, len = ref.length; i < len; i++) {
    edge = ref[i];
    if ((await edge.accept(talos, transform)) === true) {
      return edge;
    }
  }
};
run = async function (edge, talos, transform) {
  var error;
  if (edge.run != null) {
    try {
      return await edge.run(talos, transform);
    } catch (error1) {
      error = error1;
      return talos.throw(Errors.FailedRun.create(error, "encountered an error while running edge function"));
    }
  }
};
move = async function (edge, talos, transform) {
  var error;
  try {
    return await edge.move(talos, transform);
  } catch (error1) {
    error = error1;
    return talos.throw(Errors.FailedMove.create(error, "encountered an error while moving states"));
  }
};
step = generic({
  name: "step talos",
  default: function (...args) {
    throw new Error(`step: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(step, Graph.isType, Talos.isType, Type.isAny, function (graph, talos, transform) {
  return _step(graph, talos, transform);
});
generic(step, Graph.isType, negate(Talos.isType), function (graph, transform) {
  return step(graph, Talos.create(), transform);
});
_step = async function (graph, talos, transform) {
  var edge, vertex;
  vertex = matchVertex(graph, talos);
  if (talos.halted) {
    return talos;
  }
  edge = await matchEdge(vertex, talos, transform);
  if (edge == null) {
    return talos;
  }
  if (talos.halted) {
    return talos;
  }
  await run(edge, talos, transform);
  if (talos.halted) {
    return talos;
  }
  await move(edge, talos, transform);
  return talos;
};
debug = generic({
  name: "debug step talos",
  default: function (...args) {
    throw new Error(`debug step: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(debug, Graph.isType, Talos.isType, Type.isAny, function (graph, talos, transform) {
  return _debug(graph, talos, transform);
});
generic(debug, Graph.isType, negate(Talos.isType), function (graph, transform) {
  return _debug(graph, Talos.create(), transform);
});
_debug = async function (graph, talos, transform) {
  var edge, vertex;
  console.log("starting step", {
    graph,
    talos,
    transform
  });
  vertex = matchVertex(graph, talos);
  if (talos.halted) {
    console.error("encountered error matching vertex", talos.error.error, talos);
    return talos;
  } else {
    console.log("vertex matched", {
      vertex,
      talos
    });
  }
  edge = await matchEdge(vertex, talos, transform);
  if (edge == null) {
    console.log("no edge match, ignoring transform");
    return talos;
  }
  if (talos.halted) {
    console.error("encountered error matching edge", talos.error.error, talos);
    return talos;
  } else {
    console.log("edge matched", {
      edge,
      talos
    });
  }
  await run(edge, talos, transform);
  if (talos.halted) {
    console.error("encountered error running edge function", talos.error.error, talos);
    return talos;
  } else {
    console.log("edge function complete", {
      talos
    });
  }
  await move(edge, talos, transform);
  if (talos.halted) {
    console.error("encountered error running move function", talos.error.error, talos);
    return talos;
  } else {
    console.log("talos move complete", {
      talos
    });
  }
  return talos;
};
export { step, debug };