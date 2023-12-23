"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "oneOf", {
    enumerable: true,
    get: function() {
        return oneOf;
    }
});
const _function = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/function"));
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
var oneOf;
oneOf = _function.curry(function(fx, value) {
    var f, i, len;
    for(i = 0, len = fx.length; i < len; i++){
        f = fx[i];
        if (f(value) === true) {
            return true;
        }
    }
    return false;
});
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvaGVscGVycy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFPLENBQUEsTUFBUCxNQUFBOztBQUdBLEtBQUEsR0FBUSxFQUFFLENBQUMsS0FBSCxDQUFTLFFBQUEsQ0FBRSxFQUFGLEVBQU0sS0FBTixDQUFBO0FBQ2pCLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtFQUFFLEtBQUEsb0NBQUE7O0lBQ0UsSUFBRyxDQUFFLENBQUEsQ0FBRSxLQUFGLENBQUYsQ0FBQSxLQUFlLElBQWxCO0FBQ0UsYUFBTyxLQURUOztFQURGO1NBR0E7QUFKZSxDQUFUOztBQU9SLE9BQUE7RUFDRSxLQURGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRm4gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZnVuY3Rpb25cIlxuXG5cbm9uZU9mID0gRm4uY3VycnkgKCBmeCwgdmFsdWUgKSAtPlxuICBmb3IgZiBpbiBmeFxuICAgIGlmICggZiB2YWx1ZSApID09IHRydWVcbiAgICAgIHJldHVybiB0cnVlXG4gIGZhbHNlXG5cblxuZXhwb3J0IHtcbiAgb25lT2Zcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/helpers.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2hlbHBlcnMuY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcblxuXG5vbmVPZiA9IEZuLmN1cnJ5ICggZngsIHZhbHVlICkgLT5cbiAgZm9yIGYgaW4gZnhcbiAgICBpZiAoIGYgdmFsdWUgKSA9PSB0cnVlXG4gICAgICByZXR1cm4gdHJ1ZVxuICBmYWxzZVxuXG5cbmV4cG9ydCB7XG4gIG9uZU9mXG59IixudWxsXSwibmFtZXMiOlsib25lT2YiLCJGbiIsImN1cnJ5IiwiZngiLCJ2YWx1ZSIsImYiLCJpIiwibGVuIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7OytCQVdFQTs7O2VBQUFBOzs7a0VBWEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQTtBQUdBQSxRQUFRQyxVQUFHQyxLQUFILENBQVMsU0FBRUMsRUFBRixFQUFNQyxLQUFOO0lBQ2pCLElBQUFDLEdBQUFDLEdBQUFDO0lBQUUsSUFBQUQsSUFBQSxHQUFBQyxNQUFBSixHQUFBSyxNQUFBLEVBQUFGLElBQUFDLEtBQUFELElBQUE7O1FBQ0UsSUFBRyxBQUFFRCxFQUFFRCxXQUFXLE1BQWxCO1lBQ0UsT0FBTzs7SUFGWDtXQUdBO0FBSmUifQ==