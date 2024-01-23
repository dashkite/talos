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
    },
    isGeneratorFunction: function() {
        return isGeneratorFunction;
    },
    isAsyncGeneratorFunction: function() {
        return isAsyncGeneratorFunction;
    },
    isGeneratorFunctionKind: function() {
        return isGeneratorFunctionKind;
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
var asyncGeneratorFunction, generatorFunction, isAsyncGeneratorFunction, isGeneratorFunction, isGeneratorFunctionKind, isIteratorKind, isMachine;
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
// The async module handles both sync and async cases, so we need to be pedantic
// in our type resolution so we match on both for nested machines.
generatorFunction = (function*() {
    return yield null;
}).constructor;
isGeneratorFunction = _type.isKind(generatorFunction);
asyncGeneratorFunction = (async function*() {
    return yield await null;
}).constructor;
isAsyncGeneratorFunction = _type.isKind(asyncGeneratorFunction);
isGeneratorFunctionKind = function(x) {
    return isAsyncGeneratorFunction(x) || isGeneratorFunction(x);
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvdHlwZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsc0JBQUEsRUFBQSxpQkFBQSxFQUFBLHdCQUFBLEVBQUEsbUJBQUEsRUFBQSx1QkFBQSxFQUFBLGNBQUEsRUFBQTs7QUFBQSxPQUFPLENBQUEsUUFBUCxNQUFBLHFCQUFBOzs7O0FBSUEsY0FBQSxHQUFpQixRQUFBLENBQUUsQ0FBRixDQUFBO1NBQVMsaUNBQUEsSUFBOEI7QUFBdkMsRUFKakI7Ozs7QUFRQSxTQUFBLEdBQVksUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUFTLENBQUUsSUFBSSxDQUFDLFFBQUwsQ0FBYyxDQUFkLENBQUYsQ0FBQSxJQUF1QixDQUFFLElBQUksQ0FBQyxPQUFMLENBQWEsQ0FBYixDQUFGO0FBQWhDLEVBUlo7Ozs7QUFZQSxpQkFBQSxHQUFvQixDQUFDLFNBQUEsQ0FBQSxDQUFBO1NBQUcsQ0FBQSxNQUFNLElBQU47QUFBSCxDQUFELENBQWUsQ0FBQzs7QUFDcEMsbUJBQUEsR0FBc0IsSUFBSSxDQUFDLE1BQUwsQ0FBWSxpQkFBWjs7QUFDdEIsc0JBQUEsR0FBeUIsQ0FBQyxNQUFBLFNBQUEsQ0FBQSxDQUFBO1NBQUcsQ0FBQSxNQUFNLENBQUEsTUFBTSxJQUFOLENBQU47QUFBSCxDQUFELENBQXFCLENBQUM7O0FBQy9DLHdCQUFBLEdBQTJCLElBQUksQ0FBQyxNQUFMLENBQVksc0JBQVo7O0FBQzNCLHVCQUFBLEdBQTBCLFFBQUEsQ0FBRSxDQUFGLENBQUE7U0FDeEIsQ0FBQyx3QkFBQSxDQUF5QixDQUF6QixDQUFELENBQUEsSUFBZ0MsQ0FBQyxtQkFBQSxDQUFvQixDQUFwQixDQUFEO0FBRFI7O0FBRzFCLE9BQUE7RUFDRSxjQURGO0VBRUUsU0FGRjtFQUdFLG1CQUhGO0VBSUUsd0JBSkY7RUFLRSx1QkFMRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5cbiMgQXN5bmMgc3RhdGUgbWFjaGluZXMgY2FuIGNvbnN1bWUgc3luYyBldmVudCBpdGVyYXRvcnMsIHNvIGxvbmcgYXMgd2UgbGV0IGFzeW5jXG4jIGJlaGF2aW9yIHRha2Ugb3ZlciBkb3duc3RyZWFtLlxuaXNJdGVyYXRvcktpbmQgPSAoIHggKSAtPiB4WyBTeW1ib2wuYXN5bmNJdGVyYXRvciBdPyB8fCB4WyBTeW1ib2wuaXRlcmF0b3IgXT9cblxuIyBUT0RPOiBSZWx5IG9uIGVycm9ycyBmcm9tIG1hY2hpbmUgZXhwYW5zaW9uIGZvciBub3csIGJ1dCB0aGlzIGlzIHN0YXJ0aW5nIHRvXG4jIGxvb2sgbGlrZSBhbiBleHRlcm5hbGx5IHVzZWZ1bCB0eXBlLlxuaXNNYWNoaW5lID0gKCB4ICkgLT4gKCBUeXBlLmlzT2JqZWN0IHggKSB8fCAoIFR5cGUuaXNBcnJheSB4IClcblxuIyBUaGUgYXN5bmMgbW9kdWxlIGhhbmRsZXMgYm90aCBzeW5jIGFuZCBhc3luYyBjYXNlcywgc28gd2UgbmVlZCB0byBiZSBwZWRhbnRpY1xuIyBpbiBvdXIgdHlwZSByZXNvbHV0aW9uIHNvIHdlIG1hdGNoIG9uIGJvdGggZm9yIG5lc3RlZCBtYWNoaW5lcy5cbmdlbmVyYXRvckZ1bmN0aW9uID0gKC0+IHlpZWxkIG51bGwpLmNvbnN0cnVjdG9yXG5pc0dlbmVyYXRvckZ1bmN0aW9uID0gVHlwZS5pc0tpbmQgZ2VuZXJhdG9yRnVuY3Rpb25cbmFzeW5jR2VuZXJhdG9yRnVuY3Rpb24gPSAoLT4geWllbGQgYXdhaXQgbnVsbCkuY29uc3RydWN0b3JcbmlzQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiA9IFR5cGUuaXNLaW5kIGFzeW5jR2VuZXJhdG9yRnVuY3Rpb25cbmlzR2VuZXJhdG9yRnVuY3Rpb25LaW5kID0gKCB4ICkgLT4gXG4gIChpc0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24geCkgfHwgKGlzR2VuZXJhdG9yRnVuY3Rpb24geClcblxuZXhwb3J0IHtcbiAgaXNJdGVyYXRvcktpbmRcbiAgaXNNYWNoaW5lXG4gIGlzR2VuZXJhdG9yRnVuY3Rpb25cbiAgaXNBc3luY0dlbmVyYXRvckZ1bmN0aW9uXG4gIGlzR2VuZXJhdG9yRnVuY3Rpb25LaW5kXG59Il19
 //# sourceURL=/@dashkite/talos/src/types.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3R5cGVzLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuXG4jIEFzeW5jIHN0YXRlIG1hY2hpbmVzIGNhbiBjb25zdW1lIHN5bmMgZXZlbnQgaXRlcmF0b3JzLCBzbyBsb25nIGFzIHdlIGxldCBhc3luY1xuIyBiZWhhdmlvciB0YWtlIG92ZXIgZG93bnN0cmVhbS5cbmlzSXRlcmF0b3JLaW5kID0gKCB4ICkgLT4geFsgU3ltYm9sLmFzeW5jSXRlcmF0b3IgXT8gfHwgeFsgU3ltYm9sLml0ZXJhdG9yIF0/XG5cbiMgVE9ETzogUmVseSBvbiBlcnJvcnMgZnJvbSBtYWNoaW5lIGV4cGFuc2lvbiBmb3Igbm93LCBidXQgdGhpcyBpcyBzdGFydGluZyB0b1xuIyBsb29rIGxpa2UgYW4gZXh0ZXJuYWxseSB1c2VmdWwgdHlwZS5cbmlzTWFjaGluZSA9ICggeCApIC0+ICggVHlwZS5pc09iamVjdCB4ICkgfHwgKCBUeXBlLmlzQXJyYXkgeCApXG5cbiMgVGhlIGFzeW5jIG1vZHVsZSBoYW5kbGVzIGJvdGggc3luYyBhbmQgYXN5bmMgY2FzZXMsIHNvIHdlIG5lZWQgdG8gYmUgcGVkYW50aWNcbiMgaW4gb3VyIHR5cGUgcmVzb2x1dGlvbiBzbyB3ZSBtYXRjaCBvbiBib3RoIGZvciBuZXN0ZWQgbWFjaGluZXMuXG5nZW5lcmF0b3JGdW5jdGlvbiA9ICgtPiB5aWVsZCBudWxsKS5jb25zdHJ1Y3RvclxuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IFR5cGUuaXNLaW5kIGdlbmVyYXRvckZ1bmN0aW9uXG5hc3luY0dlbmVyYXRvckZ1bmN0aW9uID0gKC0+IHlpZWxkIGF3YWl0IG51bGwpLmNvbnN0cnVjdG9yXG5pc0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24gPSBUeXBlLmlzS2luZCBhc3luY0dlbmVyYXRvckZ1bmN0aW9uXG5pc0dlbmVyYXRvckZ1bmN0aW9uS2luZCA9ICggeCApIC0+IFxuICAoaXNBc3luY0dlbmVyYXRvckZ1bmN0aW9uIHgpIHx8IChpc0dlbmVyYXRvckZ1bmN0aW9uIHgpXG5cbmV4cG9ydCB7XG4gIGlzSXRlcmF0b3JLaW5kXG4gIGlzTWFjaGluZVxuICBpc0dlbmVyYXRvckZ1bmN0aW9uXG4gIGlzQXN5bmNHZW5lcmF0b3JGdW5jdGlvblxuICBpc0dlbmVyYXRvckZ1bmN0aW9uS2luZFxufSIsbnVsbF0sIm5hbWVzIjpbImlzSXRlcmF0b3JLaW5kIiwiaXNNYWNoaW5lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImlzQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiIsImlzR2VuZXJhdG9yRnVuY3Rpb25LaW5kIiwiYXN5bmNHZW5lcmF0b3JGdW5jdGlvbiIsImdlbmVyYXRvckZ1bmN0aW9uIiwieCIsIlN5bWJvbCIsImFzeW5jSXRlcmF0b3IiLCJpdGVyYXRvciIsIlR5cGUiLCJpc09iamVjdCIsImlzQXJyYXkiLCJjb25zdHJ1Y3RvciIsImlzS2luZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFvQkVBLGNBREY7ZUFDRUE7O0lBQ0FDLFNBRkY7ZUFFRUE7O0lBQ0FDLG1CQUhGO2VBR0VBOztJQUNBQyx3QkFKRjtlQUlFQTs7SUFDQUMsdUJBTEY7ZUFLRUE7Ozs4REF4QkY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQyx3QkFBQUMsbUJBQUFILDBCQUFBRCxxQkFBQUUseUJBQUFKLGdCQUFBQzs7O0FBSUFELGlCQUFpQixTQUFFTyxDQUFGO1dBQVMsQUFBQUEsQ0FBQSxDQUFBQyxPQUFBQyxhQUFBLENBQUEsSUFBQSxRQUE4QkYsQ0FBQSxDQUFBQyxPQUFBRSxRQUFBLENBQUEsSUFBQTtBQUF2Qzs7O0FBSWpCVCxZQUFZLFNBQUVNLENBQUY7V0FBUyxBQUFFSSxNQUFLQyxRQUFMLENBQWNMLE1BQVNJLE1BQUtFLE9BQUwsQ0FBYU47QUFBL0M7OztBQUlaRCxvQkFBb0IsQUFBQyxDQUFBO1dBQUcsTUFBTTtBQUFULENBQUEsRUFBZVEsV0FBQTtBQUNwQ1osc0JBQXNCUyxNQUFLSSxNQUFMLENBQVlUO0FBQ2xDRCx5QkFBeUIsQUFBQyxDQUFBO1dBQUcsTUFBTSxNQUFNO0FBQWYsQ0FBQSxFQUFxQlMsV0FBQTtBQUMvQ1gsMkJBQTJCUSxNQUFLSSxNQUFMLENBQVlWO0FBQ3ZDRCwwQkFBMEIsU0FBRUcsQ0FBRjtXQUN4QixBQUFDSix5QkFBeUJJLE1BQU9MLG9CQUFvQks7QUFEN0IifQ==