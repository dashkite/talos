"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edge = void 0;
var Meta = _interopRequireWildcard(require("@dashkite/joy/metaclass"));
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var _generic = require("@dashkite/joy/generic");
var Create = _interopRequireWildcard(require("./create.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Edge, create;
create = (0, _generic.generic)({
  name: "edge create",
  default: function (...args) {
    throw new Error(`Edge.create: input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(create, Type.isObject, function (edge) {
  return new Edge({
    accept: Create.accept(edge.accept),
    run: Create.run(edge.run),
    move: Create.move(edge.move)
  });
});
exports.Edge = Edge = function () {
  class Edge {
    constructor({
      accept,
      run,
      move
    }) {
      this.accept = accept;
      this.run = run;
      this.move = move;
    }
    clone() {
      return new Edge({
        accept: this.accept,
        run: this.run,
        move: this.move
      });
    }
  }
  ;
  Meta.mixin(Edge.prototype, [Meta.getters({})]);
  Edge.create = create;
  Edge.isType = Type.isType(Edge);
  return Edge;
}.call(void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL2VkZ2UvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUEsSUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQTtBQUNBLElBQUEsSUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQTtBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUE7QUFBQSxJQUFBLE1BQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUE7QUFBQSxTQUFBLHlCQUFBLENBQUEsNkJBQUEsT0FBQSxtQkFBQSxDQUFBLE9BQUEsT0FBQSxJQUFBLENBQUEsT0FBQSxPQUFBLFlBQUEsd0JBQUEsWUFBQSxDQUFBLENBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBO0FBQUEsU0FBQSx3QkFBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLFVBQUEsU0FBQSxDQUFBLGVBQUEsQ0FBQSx1QkFBQSxDQUFBLHlCQUFBLENBQUEsV0FBQSxPQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSx3QkFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLFNBQUEsVUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLGNBQUEsSUFBQSxNQUFBLENBQUEsd0JBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxvQkFBQSxDQUFBLElBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsd0JBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxVQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLFlBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBO0FBRkEsSUFBQSxJQUFBLEVBQUEsTUFBQTtBQU1BLE1BQUEsR0FBUyxJQUFBLGdCQUFBLEVBQ1A7RUFBQSxJQUFBLEVBQU0sYUFBTjtFQUNBLE9BQUEsRUFBUyxTQUFBLENBQUEsR0FBRSxJQUFGLEVBQUE7SUFDUCxNQUFNLElBQUksS0FBSixDQUFVLG1DQUFtQyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWxELENBQUEsRUFBVixDQUFBO0VBREM7QUFEVCxDQURPLENBQUE7QUFLVCxJQUFBLGdCQUFBLEVBQVEsTUFBUixFQUFnQixJQUFJLENBQUMsUUFBckIsRUFBK0IsVUFBRSxJQUFGLEVBQUE7U0FDN0IsSUFBSSxJQUFKLENBQ0U7SUFBQSxNQUFBLEVBQVEsTUFBTSxDQUFDLE1BQVAsQ0FBYyxJQUFJLENBQUMsTUFBbkIsQ0FBUjtJQUNBLEdBQUEsRUFBSyxNQUFNLENBQUMsR0FBUCxDQUFXLElBQUksQ0FBQyxHQUFoQixDQURMO0lBRUEsSUFBQSxFQUFNLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBSSxDQUFDLElBQWpCO0VBRk4sQ0FERixDQUFBO0FBRDZCLENBQS9CLENBQUE7QUFPTSxPQUFBLENBQUEsSUFBQSxHQUFBLElBQUEsR0FBQSxZQUFBO0VBQU4sTUFBQSxJQUFBLENBQUE7SUFDRSxXQUFhLENBQUM7TUFBQSxNQUFBO01BQUEsR0FBQTtNQUFBO0lBQUEsQ0FBRCxFQUFBO01BQUcsSUFBQyxDQUFBLE1BQUEsR0FBQSxNQUFBO01BQVEsSUFBQyxDQUFBLEdBQUEsR0FBQSxHQUFBO01BQUssSUFBQyxDQUFBLElBQUEsR0FBQSxJQUFBO0lBQW5CO0lBU2IsS0FBTyxDQUFBLEVBQUE7YUFDTCxJQUFJLElBQUosQ0FBUztRQUFHLE1BQUEsRUFBRCxJQUFDLENBQUEsTUFBSDtRQUFZLEdBQUEsRUFBRCxJQUFDLENBQUEsR0FBWjtRQUFrQixJQUFBLEVBQUQsSUFBQyxDQUFBO01BQWxCLENBQVQsQ0FBQTtJQURLO0VBVlQ7RUFBQTtFQUdFLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBQyxDQUFBLFNBQVosRUFBZ0IsQ0FDZCxJQUFJLENBQUMsT0FBTCxDQUFhLENBQUEsQ0FBYixDQURjLENBQWhCLENBQUE7RUFJQSxJQUFDLENBQUEsTUFBRCxHQUFTLE1BQUE7RUFDVCxJQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksSUFBWixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIENyZWF0ZSBmcm9tIFwiLi9jcmVhdGVcIlxuXG5cbmNyZWF0ZSA9IGdlbmVyaWMgXG4gIG5hbWU6IFwiZWRnZSBjcmVhdGVcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJFZGdlLmNyZWF0ZTogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIGNyZWF0ZSwgVHlwZS5pc09iamVjdCwgKCBlZGdlICkgLT5cbiAgbmV3IEVkZ2VcbiAgICBhY2NlcHQ6IENyZWF0ZS5hY2NlcHQgZWRnZS5hY2NlcHRcbiAgICBydW46IENyZWF0ZS5ydW4gZWRnZS5ydW5cbiAgICBtb3ZlOiBDcmVhdGUubW92ZSBlZGdlLm1vdmVcblxuXG5jbGFzcyBFZGdlXG4gIGNvbnN0cnVjdG9yOiAoeyBAYWNjZXB0LCBAcnVuLCBAbW92ZSB9KSAtPlxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzIHt9XG4gIF1cblxuICBAY3JlYXRlOiBjcmVhdGVcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIGNsb25lOiAtPlxuICAgIG5ldyBFZGdlIHsgQGFjY2VwdCwgQHJ1biwgQG1vdmUgfVxuXG5cbmV4cG9ydCB7XG4gIEVkZ2Vcbn0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/containers/edge/index.coffee