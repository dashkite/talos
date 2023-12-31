"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var _generic = require("@dashkite/joy/generic");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var make;
exports.run = make = (0, _generic.generic)({
  name: "make edge run",
  default: function (...args) {
    throw new Error(`make edge run input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(make, Type.isUndefined, function () {
  return null;
});
(0, _generic.generic)(make, Type.isFunction, function (f) {
  return function (talos, ...transforms) {
    return f(talos.context, ...transforms);
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL2VkZ2UvcnVuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBLElBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUE7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBO0FBQUEsU0FBQSx5QkFBQSxDQUFBLDZCQUFBLE9BQUEsbUJBQUEsQ0FBQSxPQUFBLE9BQUEsSUFBQSxDQUFBLE9BQUEsT0FBQSxZQUFBLHdCQUFBLFlBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQTtBQUFBLFNBQUEsd0JBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLFNBQUEsQ0FBQSxlQUFBLENBQUEsdUJBQUEsQ0FBQSx5QkFBQSxDQUFBLFdBQUEsT0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsd0JBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxTQUFBLFVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLElBQUEsTUFBQSxDQUFBLHdCQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsb0JBQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxJQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQTtBQURBLElBQUEsSUFBQTtBQUlBLE9BQUEsQ0FBQSxHQUFBLEdBQUEsSUFBQSxHQUFPLElBQUEsZ0JBQUEsRUFDTDtFQUFBLElBQUEsRUFBTSxlQUFOO0VBQ0EsT0FBQSxFQUFTLFNBQUEsQ0FBQSxHQUFFLElBQUYsRUFBQTtJQUNQLE1BQU0sSUFBSSxLQUFKLENBQVUsb0NBQW9DLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBbkQsQ0FBQSxFQUFWLENBQUE7RUFEQztBQURULENBREssQ0FBQTtBQUtQLElBQUEsZ0JBQUEsRUFBUSxJQUFSLEVBQWMsSUFBSSxDQUFDLFdBQW5CLEVBQWdDLFlBQUE7U0FDOUIsSUFBQTtBQUQ4QixDQUFoQyxDQUFBO0FBR0EsSUFBQSxnQkFBQSxFQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsVUFBbkIsRUFBK0IsVUFBRSxDQUFGLEVBQUE7U0FDN0IsVUFBRSxLQUFGLEVBQUEsR0FBUyxVQUFULEVBQUE7V0FBNEIsQ0FBQSxDQUFFLEtBQUssQ0FBQyxPQUFSLEVBQWlCLEdBQUEsVUFBakIsQ0FBQTtFQUE1QixDQUFBO0FBRDZCLENBQS9CLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuXG5cbm1ha2UgPSBnZW5lcmljIFxuICBuYW1lOiBcIm1ha2UgZWRnZSBydW5cIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJtYWtlIGVkZ2UgcnVuIGlucHV0IGlzIG1hbGZvcm1lZCAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuZ2VuZXJpYyBtYWtlLCBUeXBlLmlzVW5kZWZpbmVkLCAtPlxuICBudWxsXG5cbmdlbmVyaWMgbWFrZSwgVHlwZS5pc0Z1bmN0aW9uLCAoIGYgKSAtPlxuICAoIHRhbG9zLCB0cmFuc2Zvcm1zLi4uICkgLT4gZiB0YWxvcy5jb250ZXh0LCB0cmFuc2Zvcm1zLi4uXG5cblxuZXhwb3J0IHsgbWFrZSBhcyBydW4gfSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=src/containers/edge/run.coffee