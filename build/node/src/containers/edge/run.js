"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var _generic = require("@dashkite/joy/generic");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var create;
exports.run = create = (0, _generic.generic)({
  name: "create edge run",
  default: function (...args) {
    throw new Error(`create edge run input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(create, Type.isUndefined, function () {
  return null;
});
(0, _generic.generic)(create, Type.isFunction, function (f) {
  return f;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL2VkZ2UvcnVuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBLElBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUE7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBO0FBQUEsU0FBQSx5QkFBQSxDQUFBLDZCQUFBLE9BQUEsbUJBQUEsQ0FBQSxPQUFBLE9BQUEsSUFBQSxDQUFBLE9BQUEsT0FBQSxZQUFBLHdCQUFBLFlBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQTtBQUFBLFNBQUEsd0JBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLFNBQUEsQ0FBQSxlQUFBLENBQUEsdUJBQUEsQ0FBQSx5QkFBQSxDQUFBLFdBQUEsT0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsd0JBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxTQUFBLFVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLElBQUEsTUFBQSxDQUFBLHdCQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsb0JBQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxJQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQTtBQURBLElBQUEsTUFBQTtBQUlBLE9BQUEsQ0FBQSxHQUFBLEdBQUEsTUFBQSxHQUFTLElBQUEsZ0JBQUEsRUFDUDtFQUFBLElBQUEsRUFBTSxpQkFBTjtFQUNBLE9BQUEsRUFBUyxTQUFBLENBQUEsR0FBRSxJQUFGLEVBQUE7SUFDUCxNQUFNLElBQUksS0FBSixDQUFVLHNDQUFzQyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQXJELENBQUEsRUFBVixDQUFBO0VBREM7QUFEVCxDQURPLENBQUE7QUFLVCxJQUFBLGdCQUFBLEVBQVEsTUFBUixFQUFnQixJQUFJLENBQUMsV0FBckIsRUFBa0MsWUFBQTtTQUNoQyxJQUFBO0FBRGdDLENBQWxDLENBQUE7QUFHQSxJQUFBLGdCQUFBLEVBQVEsTUFBUixFQUFnQixJQUFJLENBQUMsVUFBckIsRUFBaUMsVUFBRSxDQUFGLEVBQUE7U0FDL0IsQ0FBQTtBQUQrQixDQUFqQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcblxuXG5jcmVhdGUgPSBnZW5lcmljIFxuICBuYW1lOiBcImNyZWF0ZSBlZGdlIHJ1blwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcImNyZWF0ZSBlZGdlIHJ1biBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgY3JlYXRlLCBUeXBlLmlzVW5kZWZpbmVkLCAtPlxuICBudWxsXG5cbmdlbmVyaWMgY3JlYXRlLCBUeXBlLmlzRnVuY3Rpb24sICggZiApIC0+XG4gIGZcblxuXG5leHBvcnQgeyBjcmVhdGUgYXMgcnVuIH0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/containers/edge/run.coffee