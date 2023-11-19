var make;
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
make = generic({
  name: "make edge accept",
  default: function (...args) {
    throw new Error(`make edge accept input is malformed ${JSON.stringify(args)}`);
  }
});
generic(make, Type.isString, function (s) {
  return function (talos, transform) {
    return transform === s;
  };
});
generic(make, Type.isSymbol, function (s) {
  return function (talos, transform) {
    return transform === s;
  };
});
generic(make, Type.isNumber, function (n) {
  return function (talos, transform) {
    return transform === n;
  };
});
generic(make, Type.isBoolean, function (b) {
  return function () {
    return b;
  };
});
generic(make, Type.isRegExp, function (re) {
  return function (talos, transform) {
    return Type.isString(transform) && re.test(transform);
  };
});
generic(make, Type.isFunction, function (f) {
  return function (talos, ...transforms) {
    return f(talos, ...transforms);
  };
});
export { make as accept };