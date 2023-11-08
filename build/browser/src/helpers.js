var oneOf;
import * as Fn from "@dashkite/joy/function";
oneOf = Fn.curry(function (fx, value) {
  var f, i, len;
  for (i = 0, len = fx.length; i < len; i++) {
    f = fx[i];
    if (f(value) === true) {
      return true;
    }
  }
  return false;
});
export { oneOf };