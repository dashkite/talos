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
    talos.throw(Errors.InvalidState.create(`talos state ${talos.state} is not in graph`));
  }
  return vertex;
};
matchEdge = function (vertex, talos, transform) {
  var edge, i, len, ref;
  ref = vertex.edges;
  for (i = 0, len = ref.length; i < len; i++) {
    edge = ref[i];
    if (edge.accept(transform, talos) === true) {
      return edge;
    }
  }
  return talos.throw(Errors.MissingTransition.create(`no edge matches transform ${transform}`));
};
run = function (talos, edge) {
  var error;
  if (edge.run != null) {
    try {
      return edge.run(talos);
    } catch (error1) {
      error = error1;
      return talos.throw(Errors.FailedRun.create(error, "encountered an error while running edge function"));
    }
  }
};
move = function (talos, edge) {
  var error;
  try {
    return edge.move(talos);
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
_step = function (graph, talos, transform) {
  var edge, vertex;
  vertex = matchVertex(graph, talos);
  if (talos.halted) {
    return talos;
  }
  edge = matchEdge(vertex, talos, transform);
  if (talos.halted) {
    return talos;
  }
  run(talos, edge);
  if (talos.halted) {
    return talos;
  }
  move(talos, edge);
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
_debug = function (graph, talos, transform) {
  var edge, vertex;
  console.log("starting step", {
    graph,
    talos,
    transform
  });
  vertex = matchVertex(graph, talos);
  if (talos.halted) {
    console.error("encountered error matching vertex", talos.error, talos);
    return talos;
  } else {
    console.log("vertex matched", {
      vertex,
      talos
    });
  }
  edge = matchEdge(vertex, talos, transform);
  if (talos.halted) {
    console.error("encountered error matching edge", talos.error, talos);
    return talos;
  } else {
    console.log("edge matched", {
      edge,
      talos
    });
  }
  run(talos, edge);
  if (talos.halted) {
    console.error("encountered error running edge function", talos.error, talos);
    return talos;
  } else {
    console.log("edge function complete", {
      talos
    });
  }
  move(talos, edge);
  if (talos.halted) {
    console.error("encountered error running move function", talos.error, talos);
    return talos;
  } else {
    console.log("talos move complete", {
      talos
    });
  }
  return talos;
};
export { step as stepSync, debug as debugSync };