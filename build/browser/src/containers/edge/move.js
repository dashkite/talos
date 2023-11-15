var create;
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
create = generic({
  name: "create edge move",
  default: function (...args) {
    throw new Error(`create edge move input is malformed ${JSON.stringify(args)}`);
  }
});
generic(create, Type.isString, function (s) {
  return function (talos, transform) {
    return talos.state = s;
  };
});
generic(create, Type.isSymbol, function (s) {
  return function (talos, transform) {
    return talos.state = s;
  };
});
generic(create, Type.isFunction, function (f) {
  return function (talos, transform) {
    return f(talos, transform);
  };
});
export { create as move };