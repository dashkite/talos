var runAsync;
import * as Fn from "@dashkite/joy/function";
import * as Type from "@dashkite/joy/type";
import { Graph, Vertex, Talos } from "../containers/index.js";
import * as Error from "../containers/errors.js";
runAsync = Fn.curry(Fn.rtee(async function (graph, talos) {
  var error, vertex;
  if (!Graph.isType(graph)) {
    throw new Error("runSync: graph instance is invalid");
  }
  if (!Talos.isType(talos)) {
    throw new Error("runSync: talos instance is invalid");
  }
  while (true) {
    if (talos.halted) {
      break;
    }
    vertex = await graph.selectAsync(talos);
    if (vertex == null) {
      talos.error = Error.UnknownState.create();
      talos.halt();
      continue;
    }
    if (vertex.action != null) {
      try {
        await vertex.action(talos, vertex);
      } catch (error1) {
        error = error1;
        talos.error = Error.ActionError.create({
          error
        });
        talos.halt();
        continue;
      }
    }
    if (Type.isString(vertex.next)) {
      talos.state = vertex.next;
    } else if (Type.isSymbol(vertex.next)) {
      talos.state = vertex.next;
    } else if (Type.isFunction(vertex.next)) {
      try {
        talos.state = await vertex.next(talos, vertex);
      } catch (error1) {
        error = error1;
        talos.error = Error.NextError.create({
          error
        });
        talos.halt();
        continue;
      }
    } else {
      talos.error = Error.UnknownNext.create({
        vertex
      });
      talos.halt();
      continue;
    }
  }
  return talos;
}));
export { runAsync };