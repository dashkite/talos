var make;
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
make = generic({
  name: "make edge move",
  default: function (...args) {
    throw new Error(`make edge move input is malformed ${JSON.stringify(args)}`);
  }
});
generic(make, Type.isString, function (s) {
  return function (talos, transform) {
    return talos.state = s;
  };
});
generic(make, Type.isSymbol, function (s) {
  return function (talos, transform) {
    return talos.state = s;
  };
});
generic(make, Type.isFunction, function (f) {
  return function (talos, ...transforms) {
    return f(talos, ...transforms);
  };
});
export { make as move };