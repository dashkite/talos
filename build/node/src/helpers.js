"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oneOf = void 0;
var Fn = _interopRequireWildcard(require("@dashkite/joy/function"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var oneOf;
exports.oneOf = oneOf = Fn.curry(function (fx, value) {
  var f, i, len;
  for (i = 0, len = fx.length; i < len; i++) {
    f = fx[i];
    if (f(value) === true) {
      return true;
    }
  }
  return false;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9oZWxwZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBLEVBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUE7QUFBQSxTQUFBLHlCQUFBLENBQUEsNkJBQUEsT0FBQSxtQkFBQSxDQUFBLE9BQUEsT0FBQSxJQUFBLENBQUEsT0FBQSxPQUFBLFlBQUEsd0JBQUEsWUFBQSxDQUFBLENBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBO0FBQUEsU0FBQSx3QkFBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLFVBQUEsU0FBQSxDQUFBLGVBQUEsQ0FBQSx1QkFBQSxDQUFBLHlCQUFBLENBQUEsV0FBQSxPQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSx3QkFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLFNBQUEsVUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLGNBQUEsSUFBQSxNQUFBLENBQUEsd0JBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxvQkFBQSxDQUFBLElBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsd0JBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxVQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLFlBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsSUFBQSxLQUFBO0FBR0EsT0FBQSxDQUFBLEtBQUEsR0FBQSxLQUFBLEdBQVEsRUFBRSxDQUFDLEtBQUgsQ0FBUyxVQUFFLEVBQUYsRUFBTSxLQUFOLEVBQUE7RUFDakIsSUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUE7RUFBRSxLQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7SUFDRSxJQUFLLENBQUEsQ0FBRSxLQUFGLENBQUYsS0FBZSxJQUFsQixFQUFBO01BQ0UsT0FBTyxJQURUOztFQURGO1NBR0EsS0FBQTtBQUplLENBQVQsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcblxuXG5vbmVPZiA9IEZuLmN1cnJ5ICggZngsIHZhbHVlICkgLT5cbiAgZm9yIGYgaW4gZnhcbiAgICBpZiAoIGYgdmFsdWUgKSA9PSB0cnVlXG4gICAgICByZXR1cm4gdHJ1ZVxuICBmYWxzZVxuXG5cbmV4cG9ydCB7XG4gIG9uZU9mXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/helpers.coffee