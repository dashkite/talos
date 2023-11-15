var create;
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
create = generic({
  name: "create edge accept",
  default: function (...args) {
    throw new Error(`create edge accept input is malformed ${JSON.stringify(args)}`);
  }
});
generic(create, Type.isString, function (s) {
  return function (talos, transform) {
    return transform === s;
  };
});
generic(create, Type.isSymbol, function (s) {
  return function (talos, transform) {
    return transform === s;
  };
});
generic(create, Type.isNumber, function (n) {
  return function (talos, transform) {
    return transform === n;
  };
});
generic(create, Type.isBoolean, function (b) {
  return function () {
    return b;
  };
});
generic(create, Type.isRegExp, function (re) {
  return function (talos, transform) {
    return Type.isString(transform) && re.test(transform);
  };
});
generic(create, Type.isFunction, function (f) {
  return function (talos, transform) {
    return f(talos, transform);
  };
});
export { create as accept };