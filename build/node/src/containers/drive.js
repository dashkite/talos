"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Drive", {
    enumerable: true,
    get: function() {
        return Drive;
    }
});
const _metaclass = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/metaclass"));
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _value = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/value"));
const _generic = require("@dashkite/joy/generic");
const _graph = require("./graph");
const _talos = require("./talos");
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
var Drive, make;
make = (0, _generic.generic)({
    name: "drive make",
    default: function(...args) {
        throw new Error(`Drive.make: input is malformed ${JSON.stringify(args)}`);
    }
});
(0, _generic.generic)(make, _graph.Graph.isType, _talos.Talos.isType, _type.isFunction, function(graph, talos, step) {
    return new Drive({
        graph,
        talos,
        step
    });
});
Drive = (function() {
    class Drive {
        constructor({ graph: graph1, talos: talos1, step: step1 }){
            this.graph = graph1;
            this.talos = talos1;
            this.step = step1;
        }
        update(...transforms) {
            return this.step(this.graph, this.talos, ...transforms);
        }
    }
    ;
    _metaclass.mixin(Drive.prototype, [
        _metaclass.getters({
            state: function() {
                return this.talos.state;
            },
            isSync: function() {
                return _type.isRegularFunction(this.step);
            }
        })
    ]);
    Drive.make = make;
    Drive.isType = _type.isType(Drive);
    return Drive;
}).call(void 0);
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvY29udGFpbmVycy9kcml2ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQU8sQ0FBQSxTQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBR0EsSUFBQSxHQUFPLE9BQUEsQ0FDTDtFQUFBLElBQUEsRUFBTSxZQUFOO0VBQ0EsT0FBQSxFQUFTLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtJQUNQLE1BQU0sSUFBSSxLQUFKLENBQVUsQ0FBQSwrQkFBQSxDQUFBLENBQWtDLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixDQUFsQyxDQUFBLENBQVY7RUFEQztBQURULENBREs7O0FBS1AsT0FBQSxDQUFRLElBQVIsRUFBYyxLQUFLLENBQUMsTUFBcEIsRUFBNEIsS0FBSyxDQUFDLE1BQWxDLEVBQTBDLElBQUksQ0FBQyxVQUEvQyxFQUE0RCxRQUFBLENBQUUsS0FBRixFQUFTLEtBQVQsRUFBZ0IsSUFBaEIsQ0FBQTtTQUMxRCxJQUFJLEtBQUosQ0FBVSxDQUFFLEtBQUYsRUFBUyxLQUFULEVBQWdCLElBQWhCLENBQVY7QUFEMEQsQ0FBNUQ7O0FBSU07RUFBTixNQUFBLE1BQUE7SUFDRSxXQUFhLENBQUM7UUFBRyxhQUFIO1FBQVcsYUFBWDtRQUFtQjtNQUFuQixDQUFELENBQUE7TUFBRyxJQUFDLENBQUE7TUFBTyxJQUFDLENBQUE7TUFBTyxJQUFDLENBQUE7SUFBcEI7O0lBV2IsTUFBUSxDQUFBLEdBQUUsVUFBRixDQUFBO2FBQ04sSUFBQyxDQUFBLElBQUQsQ0FBTSxJQUFDLENBQUEsS0FBUCxFQUFjLElBQUMsQ0FBQSxLQUFmLEVBQXNCLEdBQUEsVUFBdEI7SUFETTs7RUFaVjs7RUFHRSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUMsQ0FBQSxTQUFaLEVBQWdCO0lBQ2QsSUFBSSxDQUFDLE9BQUwsQ0FDRTtNQUFBLEtBQUEsRUFBTyxRQUFBLENBQUEsQ0FBQTtlQUFHLElBQUMsQ0FBQSxLQUFLLENBQUM7TUFBVixDQUFQO01BQ0EsTUFBQSxFQUFRLFFBQUEsQ0FBQSxDQUFBO2VBQUcsSUFBSSxDQUFDLGlCQUFMLENBQXVCLElBQUMsQ0FBQSxJQUF4QjtNQUFIO0lBRFIsQ0FERixDQURjO0dBQWhCOztFQU1BLEtBQUMsQ0FBQSxJQUFELEdBQU87O0VBQ1AsS0FBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLEtBQVo7Ozs7OztBQU1YLE9BQUE7RUFDRSxLQURGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCAqIGFzIFZhbHVlIGZyb20gXCJAZGFzaGtpdGUvam95L3ZhbHVlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCB7IEdyYXBoIH0gZnJvbSBcIi4vZ3JhcGhcIlxuaW1wb3J0IHsgVGFsb3MgfSBmcm9tIFwiLi90YWxvc1wiXG5cblxubWFrZSA9IGdlbmVyaWMgXG4gIG5hbWU6IFwiZHJpdmUgbWFrZVwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcIkRyaXZlLm1ha2U6IGlucHV0IGlzIG1hbGZvcm1lZCAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuZ2VuZXJpYyBtYWtlLCBHcmFwaC5pc1R5cGUsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0Z1bmN0aW9uLCAgKCBncmFwaCwgdGFsb3MsIHN0ZXAgKSAtPlxuICBuZXcgRHJpdmUgeyBncmFwaCwgdGFsb3MsIHN0ZXAgfVxuXG5cbmNsYXNzIERyaXZlXG4gIGNvbnN0cnVjdG9yOiAoeyBAZ3JhcGgsIEB0YWxvcywgQHN0ZXAgfSkgLT5cblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVyc1xuICAgICAgc3RhdGU6IC0+IEB0YWxvcy5zdGF0ZVxuICAgICAgaXNTeW5jOiAtPiBUeXBlLmlzUmVndWxhckZ1bmN0aW9uIEBzdGVwXG4gIF1cblxuICBAbWFrZTogbWFrZVxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbiAgdXBkYXRlOiAoIHRyYW5zZm9ybXMuLi4gKSAtPlxuICAgIEBzdGVwIEBncmFwaCwgQHRhbG9zLCB0cmFuc2Zvcm1zLi4uXG5cblxuZXhwb3J0IHtcbiAgRHJpdmVcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/containers/drive.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2NvbnRhaW5lcnMvZHJpdmUuY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE1ldGEgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvbWV0YWNsYXNzXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgKiBhcyBWYWx1ZSBmcm9tIFwiQGRhc2hraXRlL2pveS92YWx1ZVwiXG5pbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5pbXBvcnQgeyBHcmFwaCB9IGZyb20gXCIuL2dyYXBoXCJcbmltcG9ydCB7IFRhbG9zIH0gZnJvbSBcIi4vdGFsb3NcIlxuXG5cbm1ha2UgPSBnZW5lcmljIFxuICBuYW1lOiBcImRyaXZlIG1ha2VcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJEcml2ZS5tYWtlOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgbWFrZSwgR3JhcGguaXNUeXBlLCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNGdW5jdGlvbiwgICggZ3JhcGgsIHRhbG9zLCBzdGVwICkgLT5cbiAgbmV3IERyaXZlIHsgZ3JhcGgsIHRhbG9zLCBzdGVwIH1cblxuXG5jbGFzcyBEcml2ZVxuICBjb25zdHJ1Y3RvcjogKHsgQGdyYXBoLCBAdGFsb3MsIEBzdGVwIH0pIC0+XG5cbiAgTWV0YS5taXhpbiBAOjosIFtcbiAgICBNZXRhLmdldHRlcnNcbiAgICAgIHN0YXRlOiAtPiBAdGFsb3Muc3RhdGVcbiAgICAgIGlzU3luYzogLT4gVHlwZS5pc1JlZ3VsYXJGdW5jdGlvbiBAc3RlcFxuICBdXG5cbiAgQG1ha2U6IG1ha2VcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIHVwZGF0ZTogKCB0cmFuc2Zvcm1zLi4uICkgLT5cbiAgICBAc3RlcCBAZ3JhcGgsIEB0YWxvcywgdHJhbnNmb3Jtcy4uLlxuXG5cbmV4cG9ydCB7XG4gIERyaXZlXG59IixudWxsXSwibmFtZXMiOlsiRHJpdmUiLCJtYWtlIiwiZ2VuZXJpYyIsIm5hbWUiLCJkZWZhdWx0IiwiYXJncyIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIkdyYXBoIiwiaXNUeXBlIiwiVGFsb3MiLCJUeXBlIiwiaXNGdW5jdGlvbiIsImdyYXBoIiwidGFsb3MiLCJzdGVwIiwiY29uc3RydWN0b3IiLCJncmFwaDEiLCJ0YWxvczEiLCJzdGVwMSIsInVwZGF0ZSIsInRyYW5zZm9ybXMiLCJNZXRhIiwibWl4aW4iLCJwcm90b3R5cGUiLCJnZXR0ZXJzIiwic3RhdGUiLCJpc1N5bmMiLCJpc1JlZ3VsYXJGdW5jdGlvbiJdLCJtYXBwaW5ncyI6Ijs7OzsrQkFrQ0VBOzs7ZUFBQUE7OzttRUFsQ0Y7OERBQ0E7K0RBQ0E7eUJBQ0E7dUJBQ0E7dUJBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFMQSxJQUFBQSxPQUFBQztBQVFBQSxPQUFPQyxJQUFBQSxnQkFBQSxFQUNMO0lBQUFDLE1BQU07SUFDTkMsU0FBUyxTQUFBLEdBQUVDLElBQUY7UUFDUCxNQUFNLElBQUlDLE1BQU0sQ0FBQSwrQkFBQSxFQUFrQ0MsS0FBS0MsU0FBTCxDQUFlSCxNQUFqRCxDQUFWO0lBREM7QUFEVDtBQUlGSCxJQUFBQSxnQkFBQSxFQUFRRCxNQUFNUSxZQUFLLENBQUNDLE1BQXBCLEVBQTRCQyxZQUFLLENBQUNELE1BQWxDLEVBQTBDRSxNQUFLQyxVQUEvQyxFQUE0RCxTQUFFQyxLQUFGLEVBQVNDLEtBQVQsRUFBZ0JDLElBQWhCO1dBQzFELElBQUloQixNQUFNO1FBQUVjO1FBQU9DO1FBQU9DO0lBQWhCO0FBRGdEO0FBSXREaEIsUUFBQSxDQUFBO0lBQU4sTUFBQUE7UUFDRWlCLFlBQWMsRUFBR0gsT0FBQUksTUFBSCxFQUFXSCxPQUFBSSxNQUFYLEVBQW1CSCxNQUFBSSxLQUFBLEVBQXBCLENBQUE7WUFBRyxJQUFDLENBQUFOLEtBQUEsR0FBQUk7WUFBTyxJQUFDLENBQUFILEtBQUEsR0FBQUk7WUFBTyxJQUFDLENBQUFILElBQUEsR0FBQUk7UUFBcEI7UUFXYkMsT0FBUSxHQUFFQyxVQUFGLEVBQUE7bUJBQ04sSUFBQyxDQUFBTixJQUFELENBQU0sSUFBQyxDQUFBRixLQUFQLEVBQWMsSUFBQyxDQUFBQyxLQUFmLEtBQXNCTztRQURoQjtJQVpWOztJQUdFQyxXQUFLQyxLQUFMLENBQVd4QixNQUFDeUIsU0FBWixFQUFnQjtRQUNkRixXQUFLRyxPQUFMLENBQ0U7WUFBQUMsT0FBTzt1QkFBRyxJQUFDLENBQUFaLEtBQUssQ0FBQ1ksS0FBQTtZQUFWO1lBQ1BDLFFBQVE7dUJBQUdoQixNQUFLaUIsaUJBQUwsQ0FBdUIsSUFBQyxDQUFBYixJQUF4QjtZQUFIO1FBRFI7S0FGSjtJQU1BaEIsTUFBQ0MsSUFBRCxHQUFPQTtJQUNQRCxNQUFDVSxNQUFELEdBQVNFLE1BQUtGLE1BQUwsQ0FBWVYifQ==