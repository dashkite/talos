var check, expand, finished, isFunctionArray, nameVertex;
import * as Type from "@dashkite/joy/type";
import { $start, $halt } from "../states.js";
expand = function (fx) {
  var current, f, graph, i, j, len, next;
  graph = {};
  for (i = j = 0, len = fx.length; j < len; i = ++j) {
    f = fx[i];
    current = i === 0 ? $start : `${i}`;
    next = i === fx.length - 1 ? $halt : `${i + 1}`;
    graph[current] = {
      name: f.name == null || f.name === "" ? `anonymous-${i}` : f.name,
      edges: [{
        accept: true,
        run: f,
        move: next
      }]
    };
  }
  return graph;
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
nameVertex = function (vertex) {
  var name;
  name = vertex.metadata.name;
  if (Type.isSymbol(name)) {
    return `[Symbol ${name.toString()} ]`;
  } else {
    return name;
  }
};
finished = function (name) {
  return function (talos) {
    if (talos.failure) {
      console.error(`[ ${name} ] encountered error`, talos.error.error);
      return true;
    } else if (talos.success) {
      console.log(`[ ${name} ] graph traversal complete`, talos.context);
      return true;
    } else {
      return false;
    }
  };
};
export { expand, check, isFunctionArray, nameVertex, finished };