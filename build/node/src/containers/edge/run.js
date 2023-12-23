"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "run", {
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
    name: "make edge run",
    default: function(...args) {
        throw new Error(`make edge run input is malformed ${JSON.stringify(args)}`);
    }
});
(0, _generic.generic)(make, _type.isUndefined, function() {
    return null;
});
(0, _generic.generic)(make, _type.isFunction, function(f) {
    return function(talos, ...transforms) {
        return f(talos.context, ...transforms);
    };
});
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvY29udGFpbmVycy9lZGdlL3J1bi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFHQSxJQUFBLEdBQU8sT0FBQSxDQUNMO0VBQUEsSUFBQSxFQUFNLGVBQU47RUFDQSxPQUFBLEVBQVMsUUFBQSxDQUFBLEdBQUUsSUFBRixDQUFBO0lBQ1AsTUFBTSxJQUFJLEtBQUosQ0FBVSxDQUFBLGlDQUFBLENBQUEsQ0FBb0MsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLENBQXBDLENBQUEsQ0FBVjtFQURDO0FBRFQsQ0FESzs7QUFLUCxPQUFBLENBQVEsSUFBUixFQUFjLElBQUksQ0FBQyxXQUFuQixFQUFnQyxRQUFBLENBQUEsQ0FBQTtTQUM5QjtBQUQ4QixDQUFoQzs7QUFHQSxPQUFBLENBQVEsSUFBUixFQUFjLElBQUksQ0FBQyxVQUFuQixFQUErQixRQUFBLENBQUUsQ0FBRixDQUFBO1NBQzdCLFFBQUEsQ0FBRSxLQUFGLEVBQUEsR0FBUyxVQUFULENBQUE7V0FBNEIsQ0FBQSxDQUFFLEtBQUssQ0FBQyxPQUFSLEVBQWlCLEdBQUEsVUFBakI7RUFBNUI7QUFENkIsQ0FBL0I7O0FBSUEsT0FBQTtFQUFTLElBQUEsT0FBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5cblxubWFrZSA9IGdlbmVyaWMgXG4gIG5hbWU6IFwibWFrZSBlZGdlIHJ1blwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcIm1ha2UgZWRnZSBydW4gaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNVbmRlZmluZWQsIC0+XG4gIG51bGxcblxuZ2VuZXJpYyBtYWtlLCBUeXBlLmlzRnVuY3Rpb24sICggZiApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybXMuLi4gKSAtPiBmIHRhbG9zLmNvbnRleHQsIHRyYW5zZm9ybXMuLi5cblxuXG5leHBvcnQgeyBtYWtlIGFzIHJ1biB9Il19
 //# sourceURL=/@dashkite/talos/src/containers/edge/run.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2NvbnRhaW5lcnMvZWRnZS9ydW4uY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5cblxubWFrZSA9IGdlbmVyaWMgXG4gIG5hbWU6IFwibWFrZSBlZGdlIHJ1blwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcIm1ha2UgZWRnZSBydW4gaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNVbmRlZmluZWQsIC0+XG4gIG51bGxcblxuZ2VuZXJpYyBtYWtlLCBUeXBlLmlzRnVuY3Rpb24sICggZiApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybXMuLi4gKSAtPiBmIHRhbG9zLmNvbnRleHQsIHRyYW5zZm9ybXMuLi5cblxuXG5leHBvcnQgeyBtYWtlIGFzIHJ1biB9IixudWxsXSwibmFtZXMiOlsicnVuIiwibWFrZSIsImdlbmVyaWMiLCJuYW1lIiwiZGVmYXVsdCIsImFyZ3MiLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJUeXBlIiwiaXNVbmRlZmluZWQiLCJpc0Z1bmN0aW9uIiwiZiIsInRhbG9zIiwidHJhbnNmb3JtcyIsImNvbnRleHQiXSwibWFwcGluZ3MiOiI7Ozs7K0JBZ0JTQTs7O2VBQUFDOzs7OERBaEJUO3lCQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREEsSUFBQUE7QUFJQUEsT0FBT0MsSUFBQUEsZ0JBQUEsRUFDTDtJQUFBQyxNQUFNO0lBQ05DLFNBQVMsU0FBQSxHQUFFQyxJQUFGO1FBQ1AsTUFBTSxJQUFJQyxNQUFNLENBQUEsaUNBQUEsRUFBb0NDLEtBQUtDLFNBQUwsQ0FBZUgsTUFBbkQsQ0FBVjtJQURDO0FBRFQ7QUFJRkgsSUFBQUEsZ0JBQUEsRUFBUUQsTUFBTVEsTUFBS0MsV0FBbkIsRUFBZ0M7V0FDOUI7QUFEOEI7QUFHaENSLElBQUFBLGdCQUFBLEVBQVFELE1BQU1RLE1BQUtFLFVBQW5CLEVBQStCLFNBQUVDLENBQUY7V0FDN0IsU0FBRUMsS0FBRixFQUFBLEdBQVNDLFVBQVQ7ZUFBNEJGLEVBQUVDLE1BQU1FLE9BQVIsS0FBaUJEO0lBQTdDO0FBRDZCIn0=