var _step, matchEdge, matchVertex, move, run, step;
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
matchEdge = async function (vertex, talos, transform) {
  var edge, i, len, ref;
  ref = vertex.edges;
  for (i = 0, len = ref.length; i < len; i++) {
    edge = ref[i];
    if ((await edge.accept(transform, talos)) === true) {
      return edge;
    }
  }
  return talos.throw(Errors.MissingTransition.create(`no edge matches transform ${transform}`));
};
run = async function (talos, edge) {
  var error;
  if (edge.run != null) {
    try {
      return await edge.run(talos);
    } catch (error1) {
      error = error1;
      return talos.throw(Errors.FailedRun.create(error, "encountered an error while running edge function"));
    }
  }
};
move = async function (talos, edge) {
  var error;
  try {
    return await edge.move(talos);
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
  if (talos.halted) {
    return talos;
  }
  await run(talos, edge);
  if (talos.halted) {
    return talos;
  }
  await move(talos, edge);
  return talos;
};
export { step as stepAsync };