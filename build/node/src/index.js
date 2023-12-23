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
    Stable: function() {
        return _stable;
    },
    Strict: function() {
        return _strict;
    },
    Linear: function() {
        return _linear;
    },
    default: function() {
        return _default //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQUEsQ0FBQTs7QUFDQSxPQUFBLENBQUE7O0FBQ0EsT0FBQSxDQUFBOztBQUNBLE9BQU8sQ0FBQSxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFVBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsVUFBUCxNQUFBOztBQUVBLE9BQUE7RUFDRSxNQURGO0VBRUUsTUFGRjtFQUdFLE1BSEY7OztBQU1BLE9BQUEsUUFBZSxDQUNiLE1BRGEsRUFFYixNQUZhLEVBR2IsTUFIYSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL2NvbnRhaW5lcnNcIlxuZXhwb3J0ICogZnJvbSBcIi4vc3RhdGVzXCJcbmV4cG9ydCAqIGZyb20gXCIuL2xpbmVhclwiXG5pbXBvcnQgKiBhcyBTdGFibGUgZnJvbSBcIi4vc3RhYmxlXCJcbmltcG9ydCAqIGFzIFN0cmljdCBmcm9tIFwiLi9zdHJpY3RcIlxuaW1wb3J0ICogYXMgTGluZWFyIGZyb20gXCIuL2xpbmVhclwiXG5cbmV4cG9ydCB7XG4gIFN0YWJsZVxuICBTdHJpY3RcbiAgTGluZWFyXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgU3RhYmxlXG4gIFN0cmljdFxuICBMaW5lYXJcbn0iXX0=
         //# sourceURL=/@dashkite/talos/src/index.coffee
        ;
    }
});
_export_star(require("./containers"), exports);
_export_star(require("./states"), exports);
const _linear = /*#__PURE__*/ _interop_require_wildcard(_export_star(require("./linear"), exports));
const _stable = /*#__PURE__*/ _interop_require_wildcard(require("./stable"));
const _strict = /*#__PURE__*/ _interop_require_wildcard(require("./strict"));
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
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
const _default = {
    Stable: _stable,
    Strict: _strict,
    Linear: _linear
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2luZGV4LmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9jb250YWluZXJzXCJcbmV4cG9ydCAqIGZyb20gXCIuL3N0YXRlc1wiXG5leHBvcnQgKiBmcm9tIFwiLi9saW5lYXJcIlxuaW1wb3J0ICogYXMgU3RhYmxlIGZyb20gXCIuL3N0YWJsZVwiXG5pbXBvcnQgKiBhcyBTdHJpY3QgZnJvbSBcIi4vc3RyaWN0XCJcbmltcG9ydCAqIGFzIExpbmVhciBmcm9tIFwiLi9saW5lYXJcIlxuXG5leHBvcnQge1xuICBTdGFibGVcbiAgU3RyaWN0XG4gIExpbmVhclxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFN0YWJsZVxuICBTdHJpY3RcbiAgTGluZWFyXG59IixudWxsXSwibmFtZXMiOlsiU3RhYmxlIiwiU3RyaWN0IiwiTGluZWFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQVFFQSxNQURGO2VBQ0VBOztJQUNBQyxNQUZGO2VBRUVBOztJQUNBQyxNQUhGO2VBR0VBOztJQUdGLE9BQWU7ZUFBZjs7Ozs7cUJBYkE7cUJBQ0E7NkVBQ0E7Z0VBQ0E7Z0VBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BU0EsV0FBZTtJQUNiRixRQUFBQTtJQUNBQyxRQUFBQTtJQUNBQyxRQUFBQTtBQUhhIn0=