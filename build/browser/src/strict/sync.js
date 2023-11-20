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
    talos.throw(Errors.InvalidState.make("talos state is not in graph"));
  }
  return vertex;
};
matchEdge = function (vertex, talos, transforms) {
  var edge, i, len, ref;
  ref = vertex.edges;
  for (i = 0, len = ref.length; i < len; i++) {
    edge = ref[i];
    if (edge.accept(talos, ...transforms) === true) {
      return edge;
    }
  }
  return talos.throw(Errors.MissingTransition.make("no edge matches transform"));
};
run = function (edge, talos, transforms) {
  var error;
  if (edge.run != null) {
    try {
      return edge.run(talos, ...transforms);
    } catch (error1) {
      error = error1;
      return talos.throw(Errors.FailedRun.make(error, "encountered an error while running edge function"));
    }
  }
};
move = function (edge, talos, transforms) {
  var error;
  try {
    return edge.move(talos, ...transforms);
  } catch (error1) {
    error = error1;
    return talos.throw(Errors.FailedMove.make(error, "encountered an error while moving states"));
  }
};
step = generic({
  name: "step talos",
  default: function (...args) {
    throw new Error(`step: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(step, Graph.isType, Talos.isType, Type.isAny, function (graph, talos, ...transforms) {
  return _step(graph, talos, transforms);
});
generic(step, Graph.isType, Talos.isType, function (graph, talos) {
  return _step(graph, talos, []);
});
generic(step, Graph.isType, negate(Talos.isType), function (graph, ...transforms) {
  return _step(graph, Talos.make(), ...transforms);
});
_step = function (graph, talos, transforms) {
  var edge, vertex;
  vertex = matchVertex(graph, talos);
  if (talos.halted) {
    return talos;
  }
  edge = matchEdge(vertex, talos, transforms);
  if (talos.halted) {
    return talos;
  }
  run(edge, talos, transforms);
  if (talos.halted) {
    return talos;
  }
  move(edge, talos, transforms);
  return talos;
};
debug = generic({
  name: "debug step talos",
  default: function (...args) {
    throw new Error(`debug step: input is malformed ${JSON.stringify(args)}`);
  }
});
generic(debug, Graph.isType, Talos.isType, Type.isAny, function (graph, talos, ...transforms) {
  return _debug(graph, talos, transforms);
});
generic(debug, Graph.isType, Talos.isType, function (graph, talos) {
  return _debug(graph, talos, []);
});
generic(debug, Graph.isType, negate(Talos.isType), function (graph, ...transforms) {
  return _debug(graph, Talos.make(), transforms);
});
_debug = function (graph, talos, transforms) {
  var edge, vertex;
  console.log("starting step", {
    graph,
    talos,
    transforms
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
  edge = matchEdge(vertex, talos, transforms);
  if (talos.halted) {
    console.error("encountered error matching edge", talos.error.error, talos);
    return talos;
  } else {
    console.log("edge matched", {
      edge,
      talos
    });
  }
  run(edge, talos, transforms);
  if (talos.halted) {
    console.error("encountered error running edge function", talos.error.error, talos);
    return talos;
  } else {
    console.log("edge function complete", {
      talos
    });
  }
  move(edge, talos, transforms);
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
export { step, debug, matchVertex, matchEdge, run, move };