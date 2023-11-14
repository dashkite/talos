var create;
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
create = generic({
  name: "create edge run",
  default: function (...args) {
    throw new Error(`create edge run input is malformed ${JSON.stringify(args)}`);
  }
});
generic(create, Type.isUndefined, function () {
  return null;
});
generic(create, Type.isFunction, function (f) {
  return f;
});
export { create as run };