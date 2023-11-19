var make;
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
make = generic({
  name: "make edge run",
  default: function (...args) {
    throw new Error(`make edge run input is malformed ${JSON.stringify(args)}`);
  }
});
generic(make, Type.isUndefined, function () {
  return null;
});
generic(make, Type.isFunction, function (f) {
  return function (talos, ...transforms) {
    return f(talos.context, ...transforms);
  };
});
export { make as run };