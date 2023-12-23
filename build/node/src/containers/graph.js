"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Graph", {
    enumerable: true,
    get: function() {
        return Graph;
    }
});
const _metaclass = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/metaclass"));
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _generic = require("@dashkite/joy/generic");
const _vertex = require("./vertex");
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
var Graph, make;
make = (0, _generic.generic)({
    name: "graph make",
    default: function(...args) {
        throw new Error(`Graph.make: input is malformed ${JSON.stringify(args)}`);
    }
});
(0, _generic.generic)(make, _type.isObject, function(graph) {
    var i, len, ref, state, vertex;
    ref = Reflect.ownKeys(graph);
    for(i = 0, len = ref.length; i < len; i++){
        state = ref[i];
        vertex = graph[state];
        graph[state] = _vertex.Vertex.make(state, vertex);
    }
    return new Graph({
        graph
    });
});
Graph = (function() {
    class Graph {
        constructor({ graph: graph1 }){
            this.graph = graph1;
        }
        get(talos) {
            return this.graph[talos.state];
        }
        has(talos) {
            return this.graph[talos.state] != null;
        }
    }
    ;
    _metaclass.mixin(Graph.prototype, [
        _metaclass.getters({})
    ]);
    Graph.make = make;
    Graph.isType = _type.isType(Graph);
    return Graph;
}).call(void 0);
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvY29udGFpbmVycy9ncmFwaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBR0EsSUFBQSxHQUFPLE9BQUEsQ0FDTDtFQUFBLElBQUEsRUFBTSxZQUFOO0VBQ0EsT0FBQSxFQUFTLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtJQUNQLE1BQU0sSUFBSSxLQUFKLENBQVUsQ0FBQSwrQkFBQSxDQUFBLENBQWtDLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixDQUFsQyxDQUFBLENBQVY7RUFEQztBQURULENBREs7O0FBS1AsT0FBQSxDQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsUUFBbkIsRUFBNkIsUUFBQSxDQUFFLEtBQUYsQ0FBQTtBQUM3QixNQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQTtBQUFFO0VBQUEsS0FBQSxxQ0FBQTs7SUFDRSxNQUFBLEdBQVMsS0FBSyxDQUFFLEtBQUY7SUFDZCxLQUFLLENBQUUsS0FBRixDQUFMLEdBQWlCLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBWixFQUFtQixNQUFuQjtFQUZuQjtTQUlBLElBQUksS0FBSixDQUFVLENBQUUsS0FBRixDQUFWO0FBTDJCLENBQTdCOztBQVFNO0VBQU4sTUFBQSxNQUFBO0lBQ0UsV0FBYSxDQUFDO1FBQUc7TUFBSCxDQUFELENBQUE7TUFBRyxJQUFDLENBQUE7SUFBSjs7SUFTYixHQUFLLENBQUUsS0FBRixDQUFBO2FBQ0gsSUFBQyxDQUFBLEtBQUssQ0FBRSxLQUFLLENBQUMsS0FBUjtJQURIOztJQUdMLEdBQUssQ0FBRSxLQUFGLENBQUE7YUFDSDtJQURHOztFQWJQOztFQUdFLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBQyxDQUFBLFNBQVosRUFBZ0IsQ0FDZCxJQUFJLENBQUMsT0FBTCxDQUFhLENBQUEsQ0FBYixDQURjLENBQWhCOztFQUlBLEtBQUMsQ0FBQSxJQUFELEdBQU87O0VBQ1AsS0FBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLEtBQVo7Ozs7OztBQVNYLE9BQUE7RUFDRSxLQURGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCB7IFZlcnRleCB9IGZyb20gXCIuL3ZlcnRleFwiXG5cblxubWFrZSA9IGdlbmVyaWMgXG4gIG5hbWU6IFwiZ3JhcGggbWFrZVwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcIkdyYXBoLm1ha2U6IGlucHV0IGlzIG1hbGZvcm1lZCAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuZ2VuZXJpYyBtYWtlLCBUeXBlLmlzT2JqZWN0LCAoIGdyYXBoICkgLT5cbiAgZm9yIHN0YXRlIGluIFJlZmxlY3Qub3duS2V5cyBncmFwaFxuICAgIHZlcnRleCA9IGdyYXBoWyBzdGF0ZSBdXG4gICAgZ3JhcGhbIHN0YXRlIF0gPSBWZXJ0ZXgubWFrZSBzdGF0ZSwgdmVydGV4XG5cbiAgbmV3IEdyYXBoIHsgZ3JhcGggfVxuXG5cbmNsYXNzIEdyYXBoXG4gIGNvbnN0cnVjdG9yOiAoeyBAZ3JhcGggfSkgLT5cblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVycyB7fVxuICBdXG5cbiAgQG1ha2U6IG1ha2VcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIGdldDogKCB0YWxvcyApIC0+XG4gICAgQGdyYXBoWyB0YWxvcy5zdGF0ZSBdXG5cbiAgaGFzOiAoIHRhbG9zICkgLT5cbiAgICBAZ3JhcGhbIHRhbG9zLnN0YXRlIF0/XG5cblxuZXhwb3J0IHtcbiAgR3JhcGhcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/containers/graph.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2NvbnRhaW5lcnMvZ3JhcGguY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE1ldGEgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvbWV0YWNsYXNzXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5pbXBvcnQgeyBWZXJ0ZXggfSBmcm9tIFwiLi92ZXJ0ZXhcIlxuXG5cbm1ha2UgPSBnZW5lcmljIFxuICBuYW1lOiBcImdyYXBoIG1ha2VcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJHcmFwaC5tYWtlOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgbWFrZSwgVHlwZS5pc09iamVjdCwgKCBncmFwaCApIC0+XG4gIGZvciBzdGF0ZSBpbiBSZWZsZWN0Lm93bktleXMgZ3JhcGhcbiAgICB2ZXJ0ZXggPSBncmFwaFsgc3RhdGUgXVxuICAgIGdyYXBoWyBzdGF0ZSBdID0gVmVydGV4Lm1ha2Ugc3RhdGUsIHZlcnRleFxuXG4gIG5ldyBHcmFwaCB7IGdyYXBoIH1cblxuXG5jbGFzcyBHcmFwaFxuICBjb25zdHJ1Y3RvcjogKHsgQGdyYXBoIH0pIC0+XG5cbiAgTWV0YS5taXhpbiBAOjosIFtcbiAgICBNZXRhLmdldHRlcnMge31cbiAgXVxuXG4gIEBtYWtlOiBtYWtlXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuICBnZXQ6ICggdGFsb3MgKSAtPlxuICAgIEBncmFwaFsgdGFsb3Muc3RhdGUgXVxuXG4gIGhhczogKCB0YWxvcyApIC0+XG4gICAgQGdyYXBoWyB0YWxvcy5zdGF0ZSBdP1xuXG5cbmV4cG9ydCB7XG4gIEdyYXBoXG59IixudWxsXSwibmFtZXMiOlsiR3JhcGgiLCJtYWtlIiwiZ2VuZXJpYyIsIm5hbWUiLCJkZWZhdWx0IiwiYXJncyIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIlR5cGUiLCJpc09iamVjdCIsImdyYXBoIiwiaSIsImxlbiIsInJlZiIsInN0YXRlIiwidmVydGV4IiwiUmVmbGVjdCIsIm93bktleXMiLCJsZW5ndGgiLCJWZXJ0ZXgiLCJjb25zdHJ1Y3RvciIsImdyYXBoMSIsImdldCIsInRhbG9zIiwiaGFzIiwiTWV0YSIsIm1peGluIiwicHJvdG90eXBlIiwiZ2V0dGVycyIsImlzVHlwZSJdLCJtYXBwaW5ncyI6Ijs7OzsrQkFxQ0VBOzs7ZUFBQUE7OzttRUFyQ0Y7OERBQ0E7eUJBQ0E7d0JBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFIQSxJQUFBQSxPQUFBQztBQU1BQSxPQUFPQyxJQUFBQSxnQkFBQSxFQUNMO0lBQUFDLE1BQU07SUFDTkMsU0FBUyxTQUFBLEdBQUVDLElBQUY7UUFDUCxNQUFNLElBQUlDLE1BQU0sQ0FBQSwrQkFBQSxFQUFrQ0MsS0FBS0MsU0FBTCxDQUFlSCxNQUFqRCxDQUFWO0lBREM7QUFEVDtBQUlGSCxJQUFBQSxnQkFBQSxFQUFRRCxNQUFNUSxNQUFLQyxRQUFuQixFQUE2QixTQUFFQyxLQUFGO0lBQzdCLElBQUFDLEdBQUFDLEtBQUFDLEtBQUFDLE9BQUFDO0lBQUVGLE1BQUFHLFFBQUFDLE9BQUEsQ0FBQVA7SUFBQSxJQUFBQyxJQUFBLEdBQUFDLE1BQUFDLElBQUFLLE1BQUEsRUFBQVAsSUFBQUMsS0FBQUQsSUFBQTs7UUFDRUksU0FBU0wsS0FBSyxDQUFFSSxNQUFGO1FBQ2RKLEtBQUssQ0FBRUksTUFBUCxHQUFpQkssY0FBTSxDQUFDbkIsSUFBUCxDQUFZYyxPQUFPQztJQUZ0QztXQUlBLElBQUloQixNQUFNO1FBQUVXO0lBQUY7QUFMaUI7QUFRdkJYLFFBQUEsQ0FBQTtJQUFOLE1BQUFBO1FBQ0VxQixZQUFjLEVBQUdWLE9BQUFXLE1BQUEsRUFBSixDQUFBO1lBQUcsSUFBQyxDQUFBWCxLQUFBLEdBQUFXO1FBQUo7UUFTYkMsSUFBT0MsS0FBRixFQUFBO21CQUNILElBQUMsQ0FBQWIsS0FBSyxDQUFFYSxNQUFNVCxLQUFSLENBQUE7UUFESDtRQUdMVSxJQUFPRCxLQUFGLEVBQUE7bUJBQ0gsSUFBQSxDQUFBYixLQUFBLENBQUFhLE1BQUFULEtBQUEsQ0FBQSxJQUFBO1FBREc7SUFiUDs7SUFHRVcsV0FBS0MsS0FBTCxDQUFXM0IsTUFBQzRCLFNBQVosRUFBZ0I7UUFDZEYsV0FBS0csT0FBTCxDQUFhLENBQUE7S0FEZjtJQUlBN0IsTUFBQ0MsSUFBRCxHQUFPQTtJQUNQRCxNQUFDOEIsTUFBRCxHQUFTckIsTUFBS3FCLE1BQUwsQ0FBWTlCIn0=