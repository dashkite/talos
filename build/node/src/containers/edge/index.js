"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Edge", {
    enumerable: true,
    get: function() {
        return Edge;
    }
});
const _metaclass = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/metaclass"));
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _generic = require("@dashkite/joy/generic");
const _make = /*#__PURE__*/ _interop_require_wildcard(require("./make"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
var Edge, make;
make = (0, _generic.generic)({
    name: "edge make",
    default: function(...args) {
        throw new Error(`Edge.make: input is malformed ${JSON.stringify(args)}`);
    }
});
(0, _generic.generic)(make, _type.isObject, function(edge) {
    return new Edge({
        accept: _make.accept(edge.accept),
        run: _make.run(edge.run),
        move: _make.move(edge.move)
    });
});
Edge = (function() {
    class Edge {
        constructor({ accept, run, move }){
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
    _metaclass.mixin(Edge.prototype, [
        _metaclass.getters({})
    ]);
    Edge.make = make;
    Edge.isType = _type.isType(Edge);
    return Edge;
}).call(void 0);
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvY29udGFpbmVycy9lZGdlL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLElBQUEsRUFBQTs7QUFBQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBR0EsSUFBQSxHQUFPLE9BQUEsQ0FDTDtFQUFBLElBQUEsRUFBTSxXQUFOO0VBQ0EsT0FBQSxFQUFTLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtJQUNQLE1BQU0sSUFBSSxLQUFKLENBQVUsQ0FBQSw4QkFBQSxDQUFBLENBQWlDLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixDQUFqQyxDQUFBLENBQVY7RUFEQztBQURULENBREs7O0FBS1AsT0FBQSxDQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsUUFBbkIsRUFBNkIsUUFBQSxDQUFFLElBQUYsQ0FBQTtTQUMzQixJQUFJLElBQUosQ0FDRTtJQUFBLE1BQUEsRUFBUSxJQUFJLENBQUMsTUFBTCxDQUFZLElBQUksQ0FBQyxNQUFqQixDQUFSO0lBQ0EsR0FBQSxFQUFLLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBSSxDQUFDLEdBQWQsQ0FETDtJQUVBLElBQUEsRUFBTSxJQUFJLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxJQUFmO0VBRk4sQ0FERjtBQUQyQixDQUE3Qjs7QUFPTTtFQUFOLE1BQUEsS0FBQTtJQUNFLFdBQWEsQ0FBQyxPQUFBLEtBQUEsTUFBQSxDQUFELENBQUE7TUFBRyxJQUFDLENBQUE7TUFBUSxJQUFDLENBQUE7TUFBSyxJQUFDLENBQUE7SUFBbkI7O0lBU2IsS0FBTyxDQUFBLENBQUE7YUFDTCxJQUFJLElBQUosQ0FBUyxDQUFHLFFBQUQsSUFBQyxDQUFBLE1BQUgsRUFBWSxLQUFELElBQUMsQ0FBQSxHQUFaLEVBQWtCLE1BQUQsSUFBQyxDQUFBLElBQWxCLENBQVQ7SUFESzs7RUFWVDs7RUFHRSxJQUFJLENBQUMsS0FBTCxDQUFXLElBQUMsQ0FBQSxTQUFaLEVBQWdCLENBQ2QsSUFBSSxDQUFDLE9BQUwsQ0FBYSxDQUFBLENBQWIsQ0FEYyxDQUFoQjs7RUFJQSxJQUFDLENBQUEsSUFBRCxHQUFPOztFQUNQLElBQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxJQUFaOzs7Ozs7QUFNWCxPQUFBO0VBQ0UsSUFERiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE1ldGEgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvbWV0YWNsYXNzXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5pbXBvcnQgKiBhcyBNYWtlIGZyb20gXCIuL21ha2VcIlxuXG5cbm1ha2UgPSBnZW5lcmljIFxuICBuYW1lOiBcImVkZ2UgbWFrZVwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcIkVkZ2UubWFrZTogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNPYmplY3QsICggZWRnZSApIC0+XG4gIG5ldyBFZGdlXG4gICAgYWNjZXB0OiBNYWtlLmFjY2VwdCBlZGdlLmFjY2VwdFxuICAgIHJ1bjogTWFrZS5ydW4gZWRnZS5ydW5cbiAgICBtb3ZlOiBNYWtlLm1vdmUgZWRnZS5tb3ZlXG5cblxuY2xhc3MgRWRnZVxuICBjb25zdHJ1Y3RvcjogKHsgQGFjY2VwdCwgQHJ1biwgQG1vdmUgfSkgLT5cblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVycyB7fVxuICBdXG5cbiAgQG1ha2U6IG1ha2VcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIGNsb25lOiAtPlxuICAgIG5ldyBFZGdlIHsgQGFjY2VwdCwgQHJ1biwgQG1vdmUgfVxuXG5cbmV4cG9ydCB7XG4gIEVkZ2Vcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/containers/edge/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2NvbnRhaW5lcnMvZWRnZS9pbmRleC5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIE1ha2UgZnJvbSBcIi4vbWFrZVwiXG5cblxubWFrZSA9IGdlbmVyaWMgXG4gIG5hbWU6IFwiZWRnZSBtYWtlXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwiRWRnZS5tYWtlOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgbWFrZSwgVHlwZS5pc09iamVjdCwgKCBlZGdlICkgLT5cbiAgbmV3IEVkZ2VcbiAgICBhY2NlcHQ6IE1ha2UuYWNjZXB0IGVkZ2UuYWNjZXB0XG4gICAgcnVuOiBNYWtlLnJ1biBlZGdlLnJ1blxuICAgIG1vdmU6IE1ha2UubW92ZSBlZGdlLm1vdmVcblxuXG5jbGFzcyBFZGdlXG4gIGNvbnN0cnVjdG9yOiAoeyBAYWNjZXB0LCBAcnVuLCBAbW92ZSB9KSAtPlxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzIHt9XG4gIF1cblxuICBAbWFrZTogbWFrZVxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbiAgY2xvbmU6IC0+XG4gICAgbmV3IEVkZ2UgeyBAYWNjZXB0LCBAcnVuLCBAbW92ZSB9XG5cblxuZXhwb3J0IHtcbiAgRWRnZVxufSIsbnVsbF0sIm5hbWVzIjpbIkVkZ2UiLCJtYWtlIiwiZ2VuZXJpYyIsIm5hbWUiLCJkZWZhdWx0IiwiYXJncyIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIlR5cGUiLCJpc09iamVjdCIsImVkZ2UiLCJhY2NlcHQiLCJNYWtlIiwicnVuIiwibW92ZSIsImNvbnN0cnVjdG9yIiwiY2xvbmUiLCJNZXRhIiwibWl4aW4iLCJwcm90b3R5cGUiLCJnZXR0ZXJzIiwiaXNUeXBlIl0sIm1hcHBpbmdzIjoiOzs7OytCQWlDRUE7OztlQUFBQTs7O21FQWpDRjs4REFDQTt5QkFDQTs4REFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUhBLElBQUFBLE1BQUFDO0FBTUFBLE9BQU9DLElBQUFBLGdCQUFBLEVBQ0w7SUFBQUMsTUFBTTtJQUNOQyxTQUFTLFNBQUEsR0FBRUMsSUFBRjtRQUNQLE1BQU0sSUFBSUMsTUFBTSxDQUFBLDhCQUFBLEVBQWlDQyxLQUFLQyxTQUFMLENBQWVILE1BQWhELENBQVY7SUFEQztBQURUO0FBSUZILElBQUFBLGdCQUFBLEVBQVFELE1BQU1RLE1BQUtDLFFBQW5CLEVBQTZCLFNBQUVDLElBQUY7V0FDM0IsSUFBSVgsS0FDRjtRQUFBWSxRQUFRQyxNQUFLRCxNQUFMLENBQVlELEtBQUtDLE1BQWpCO1FBQ1JFLEtBQUtELE1BQUtDLEdBQUwsQ0FBU0gsS0FBS0csR0FBZDtRQUNMQyxNQUFNRixNQUFLRSxJQUFMLENBQVVKLEtBQUtJLElBQWY7SUFGTjtBQUZ5QjtBQU92QmYsT0FBQSxDQUFBO0lBQU4sTUFBQUE7UUFDRWdCLFlBQWMsRUFBQUosTUFBQSxFQUFBRSxHQUFBLEVBQUFDLElBQUEsRUFBRCxDQUFBO1lBQUcsSUFBQyxDQUFBSCxNQUFBLEdBQUFBO1lBQVEsSUFBQyxDQUFBRSxHQUFBLEdBQUFBO1lBQUssSUFBQyxDQUFBQyxJQUFBLEdBQUFBO1FBQW5CO1FBU2JFLFFBQU87bUJBQ0wsSUFBSWpCLEtBQUs7Z0JBQUdZLFFBQUQsSUFBQyxDQUFBQSxNQUFIO2dCQUFZRSxLQUFELElBQUMsQ0FBQUEsR0FBWjtnQkFBa0JDLE1BQUQsSUFBQyxDQUFBQSxJQUFsQjtZQUFBO1FBREo7SUFWVDs7SUFHRUcsV0FBS0MsS0FBTCxDQUFXbkIsS0FBQ29CLFNBQVosRUFBZ0I7UUFDZEYsV0FBS0csT0FBTCxDQUFhLENBQUE7S0FEZjtJQUlBckIsS0FBQ0MsSUFBRCxHQUFPQTtJQUNQRCxLQUFDc0IsTUFBRCxHQUFTYixNQUFLYSxNQUFMLENBQVl0QiJ9