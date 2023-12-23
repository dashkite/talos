"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "move", {
    enumerable: true,
    get: function() {
        return make;
    }
});
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _generic = require("@dashkite/joy/generic");
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
var make;
make = (0, _generic.generic)({
    name: "make edge move",
    default: function(...args) {
        throw new Error(`make edge move input is malformed ${JSON.stringify(args)}`);
    }
});
(0, _generic.generic)(make, _type.isString, function(s) {
    return function(talos, transform) {
        return talos.state = s;
    };
});
(0, _generic.generic)(make, _type.isSymbol, function(s) {
    return function(talos, transform) {
        return talos.state = s;
    };
});
(0, _generic.generic)(make, _type.isFunction, function(f) {
    return function(talos, ...transforms) {
        return f(talos, ...transforms);
    };
});
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvY29udGFpbmVycy9lZGdlL21vdmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsT0FBVDtDQUFBLE1BQUE7O0FBR0EsSUFBQSxHQUFPLE9BQUEsQ0FDTDtFQUFBLElBQUEsRUFBTSxnQkFBTjtFQUNBLE9BQUEsRUFBUyxRQUFBLENBQUEsR0FBRSxJQUFGLENBQUE7SUFDUCxNQUFNLElBQUksS0FBSixDQUFVLENBQUEsa0NBQUEsQ0FBQSxDQUFxQyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWYsQ0FBckMsQ0FBQSxDQUFWO0VBREM7QUFEVCxDQURLOztBQUtQLE9BQUEsQ0FBUSxJQUFSLEVBQWMsSUFBSSxDQUFDLFFBQW5CLEVBQTZCLFFBQUEsQ0FBRSxDQUFGLENBQUE7U0FDM0IsUUFBQSxDQUFFLEtBQUYsRUFBUyxTQUFULENBQUE7V0FBd0IsS0FBSyxDQUFDLEtBQU4sR0FBYztFQUF0QztBQUQyQixDQUE3Qjs7QUFHQSxPQUFBLENBQVEsSUFBUixFQUFjLElBQUksQ0FBQyxRQUFuQixFQUE2QixRQUFBLENBQUUsQ0FBRixDQUFBO1NBQzNCLFFBQUEsQ0FBRSxLQUFGLEVBQVMsU0FBVCxDQUFBO1dBQXdCLEtBQUssQ0FBQyxLQUFOLEdBQWM7RUFBdEM7QUFEMkIsQ0FBN0I7O0FBR0EsT0FBQSxDQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsVUFBbkIsRUFBK0IsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUM3QixRQUFBLENBQUUsS0FBRixFQUFBLEdBQVMsVUFBVCxDQUFBO1dBQTRCLENBQUEsQ0FBRSxLQUFGLEVBQVMsR0FBQSxVQUFUO0VBQTVCO0FBRDZCLENBQS9COztBQUlBLE9BQUE7RUFBUyxJQUFBLFFBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuXG5cbm1ha2UgPSBnZW5lcmljIFxuICBuYW1lOiBcIm1ha2UgZWRnZSBtb3ZlXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwibWFrZSBlZGdlIG1vdmUgaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNTdHJpbmcsICggcyApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybSApIC0+IHRhbG9zLnN0YXRlID0gc1xuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNTeW1ib2wsICggcyApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybSApIC0+IHRhbG9zLnN0YXRlID0gc1xuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNGdW5jdGlvbiwgKCBmICkgLT5cbiAgKCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApIC0+IGYgdGFsb3MsIHRyYW5zZm9ybXMuLi5cblxuXG5leHBvcnQgeyBtYWtlIGFzIG1vdmUgfSJdfQ==
 //# sourceURL=/@dashkite/talos/src/containers/edge/move.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2NvbnRhaW5lcnMvZWRnZS9tb3ZlLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuXG5cbm1ha2UgPSBnZW5lcmljIFxuICBuYW1lOiBcIm1ha2UgZWRnZSBtb3ZlXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwibWFrZSBlZGdlIG1vdmUgaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNTdHJpbmcsICggcyApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybSApIC0+IHRhbG9zLnN0YXRlID0gc1xuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNTeW1ib2wsICggcyApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybSApIC0+IHRhbG9zLnN0YXRlID0gc1xuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNGdW5jdGlvbiwgKCBmICkgLT5cbiAgKCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApIC0+IGYgdGFsb3MsIHRyYW5zZm9ybXMuLi5cblxuXG5leHBvcnQgeyBtYWtlIGFzIG1vdmUgfSIsbnVsbF0sIm5hbWVzIjpbIm1vdmUiLCJtYWtlIiwiZ2VuZXJpYyIsIm5hbWUiLCJkZWZhdWx0IiwiYXJncyIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIlR5cGUiLCJpc1N0cmluZyIsInMiLCJ0YWxvcyIsInRyYW5zZm9ybSIsInN0YXRlIiwiaXNTeW1ib2wiLCJpc0Z1bmN0aW9uIiwiZiIsInRyYW5zZm9ybXMiXSwibWFwcGluZ3MiOiI7Ozs7K0JBbUJTQTs7O2VBQUFDOzs7OERBbkJUO3lCQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREEsSUFBQUE7QUFJQUEsT0FBT0MsSUFBQUEsZ0JBQUEsRUFDTDtJQUFBQyxNQUFNO0lBQ05DLFNBQVMsU0FBQSxHQUFFQyxJQUFGO1FBQ1AsTUFBTSxJQUFJQyxNQUFNLENBQUEsa0NBQUEsRUFBcUNDLEtBQUtDLFNBQUwsQ0FBZUgsTUFBcEQsQ0FBVjtJQURDO0FBRFQ7QUFJRkgsSUFBQUEsZ0JBQUEsRUFBUUQsTUFBTVEsTUFBS0MsUUFBbkIsRUFBNkIsU0FBRUMsQ0FBRjtXQUMzQixTQUFFQyxLQUFGLEVBQVNDLFNBQVQ7ZUFBd0JELE1BQU1FLEtBQU4sR0FBY0g7SUFBdEM7QUFEMkI7QUFHN0JULElBQUFBLGdCQUFBLEVBQVFELE1BQU1RLE1BQUtNLFFBQW5CLEVBQTZCLFNBQUVKLENBQUY7V0FDM0IsU0FBRUMsS0FBRixFQUFTQyxTQUFUO2VBQXdCRCxNQUFNRSxLQUFOLEdBQWNIO0lBQXRDO0FBRDJCO0FBRzdCVCxJQUFBQSxnQkFBQSxFQUFRRCxNQUFNUSxNQUFLTyxVQUFuQixFQUErQixTQUFFQyxDQUFGO1dBQzdCLFNBQUVMLEtBQUYsRUFBQSxHQUFTTSxVQUFUO2VBQTRCRCxFQUFFTCxVQUFPTTtJQUFyQztBQUQ2QiJ9