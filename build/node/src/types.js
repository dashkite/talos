"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isIteratorKind: function() {
        return isIteratorKind;
    },
    isMachine: function() {
        return isMachine;
    }
});
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
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
var isIteratorKind, isMachine;
// Async state machines can consume sync event iterators, so long as we let async
// behavior take over downstream.
isIteratorKind = function(x) {
    return x[Symbol.asyncIterator] != null || x[Symbol.iterator] != null;
};
// TODO: Rely on errors from machine expansion for now, but this is starting to
// look like an externally useful type.
isMachine = function(x) {
    return _type.isObject(x) || _type.isArray(x);
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvdHlwZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sQ0FBQSxRQUFQLE1BQUEscUJBQUE7Ozs7QUFJQSxjQUFBLEdBQWlCLFFBQUEsQ0FBRSxDQUFGLENBQUE7U0FBUyxpQ0FBQSxJQUE4QjtBQUF2QyxFQUpqQjs7OztBQVFBLFNBQUEsR0FBWSxRQUFBLENBQUUsQ0FBRixDQUFBO1NBQVMsQ0FBRSxJQUFJLENBQUMsUUFBTCxDQUFjLENBQWQsQ0FBRixDQUFBLElBQXVCLENBQUUsSUFBSSxDQUFDLE9BQUwsQ0FBYSxDQUFiLENBQUY7QUFBaEM7O0FBR1osT0FBQTtFQUNFLGNBREY7RUFFRSxTQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcblxuIyBBc3luYyBzdGF0ZSBtYWNoaW5lcyBjYW4gY29uc3VtZSBzeW5jIGV2ZW50IGl0ZXJhdG9ycywgc28gbG9uZyBhcyB3ZSBsZXQgYXN5bmNcbiMgYmVoYXZpb3IgdGFrZSBvdmVyIGRvd25zdHJlYW0uXG5pc0l0ZXJhdG9yS2luZCA9ICggeCApIC0+IHhbIFN5bWJvbC5hc3luY0l0ZXJhdG9yIF0/IHx8IHhbIFN5bWJvbC5pdGVyYXRvciBdP1xuXG4jIFRPRE86IFJlbHkgb24gZXJyb3JzIGZyb20gbWFjaGluZSBleHBhbnNpb24gZm9yIG5vdywgYnV0IHRoaXMgaXMgc3RhcnRpbmcgdG9cbiMgbG9vayBsaWtlIGFuIGV4dGVybmFsbHkgdXNlZnVsIHR5cGUuXG5pc01hY2hpbmUgPSAoIHggKSAtPiAoIFR5cGUuaXNPYmplY3QgeCApIHx8ICggVHlwZS5pc0FycmF5IHggKVxuXG5cbmV4cG9ydCB7XG4gIGlzSXRlcmF0b3JLaW5kXG4gIGlzTWFjaGluZVxufSJdfQ==
 //# sourceURL=/@dashkite/talos/src/types.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3R5cGVzLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuXG4jIEFzeW5jIHN0YXRlIG1hY2hpbmVzIGNhbiBjb25zdW1lIHN5bmMgZXZlbnQgaXRlcmF0b3JzLCBzbyBsb25nIGFzIHdlIGxldCBhc3luY1xuIyBiZWhhdmlvciB0YWtlIG92ZXIgZG93bnN0cmVhbS5cbmlzSXRlcmF0b3JLaW5kID0gKCB4ICkgLT4geFsgU3ltYm9sLmFzeW5jSXRlcmF0b3IgXT8gfHwgeFsgU3ltYm9sLml0ZXJhdG9yIF0/XG5cbiMgVE9ETzogUmVseSBvbiBlcnJvcnMgZnJvbSBtYWNoaW5lIGV4cGFuc2lvbiBmb3Igbm93LCBidXQgdGhpcyBpcyBzdGFydGluZyB0b1xuIyBsb29rIGxpa2UgYW4gZXh0ZXJuYWxseSB1c2VmdWwgdHlwZS5cbmlzTWFjaGluZSA9ICggeCApIC0+ICggVHlwZS5pc09iamVjdCB4ICkgfHwgKCBUeXBlLmlzQXJyYXkgeCApXG5cblxuZXhwb3J0IHtcbiAgaXNJdGVyYXRvcktpbmRcbiAgaXNNYWNoaW5lXG59IixudWxsXSwibmFtZXMiOlsiaXNJdGVyYXRvcktpbmQiLCJpc01hY2hpbmUiLCJ4IiwiU3ltYm9sIiwiYXN5bmNJdGVyYXRvciIsIml0ZXJhdG9yIiwiVHlwZSIsImlzT2JqZWN0IiwiaXNBcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFZRUEsY0FERjtlQUNFQTs7SUFDQUMsU0FGRjtlQUVFQTs7OzhEQWJGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUQsZ0JBQUFDOzs7QUFJQUQsaUJBQWlCLFNBQUVFLENBQUY7V0FBUyxBQUFBQSxDQUFBLENBQUFDLE9BQUFDLGFBQUEsQ0FBQSxJQUFBLFFBQThCRixDQUFBLENBQUFDLE9BQUFFLFFBQUEsQ0FBQSxJQUFBO0FBQXZDOzs7QUFJakJKLFlBQVksU0FBRUMsQ0FBRjtXQUFTLEFBQUVJLE1BQUtDLFFBQUwsQ0FBY0wsTUFBU0ksTUFBS0UsT0FBTCxDQUFhTjtBQUEvQyJ9