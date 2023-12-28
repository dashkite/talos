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
    default: function() {
        return _default;
    },
    Machine: function() {
        return _machine.Machine;
    },
    Vertex: function() {
        return _machine.Vertex;
    },
    Edge: function() {
        return _machine.Edge;
    },
    Talos: function() {
        return _talos.Talos;
    },
    Sync: function() {
        return _sync;
    },
    Async: function() {
        return _async;
    },
    $start: function() {
        return _states.$start;
    },
    $end: function() {
        return _states.$end;
    },
    atStart: function() {
        return _states.atStart;
    },
    atEnd: function() {
        return _states.atEnd;
    },
    types: function() {
        return _types;
    }
});
const _machine = require("./machine");
const _talos = require("./talos");
const _sync = /*#__PURE__*/ _interop_require_wildcard(require("./sync"));
const _async = /*#__PURE__*/ _interop_require_wildcard(require("./async"));
const _states = require("./states");
const _types = /*#__PURE__*/ _interop_require_wildcard(require("./types"));
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
    Machine: _machine.Machine,
    Vertex: _machine.Vertex,
    Edge: _machine.Edge,
    Talos: _talos.Talos,
    Sync: _sync,
    Async: _async,
    $start: _states.$start,
    $end: _states.$end,
    atStart: _states.atStart,
    atEnd: _states.atEnd,
    types: _types
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQUE7RUFBUyxPQUFUO0VBQWtCLE1BQWxCO0VBQTBCLElBQTFCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsU0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0VBQWlCLElBQWpCO0VBQXVCLE9BQXZCO0VBQWdDLEtBQWhDO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsU0FBUCxNQUFBOztBQUdBLE9BQUEsUUFBZSxDQUNiLE9BRGEsRUFDSixNQURJLEVBQ0ksSUFESixFQUNVLEtBRFYsRUFFYixJQUZhLEVBRVAsS0FGTyxFQUdiLE1BSGEsRUFHTCxJQUhLLEVBR0MsT0FIRCxFQUdVLEtBSFYsRUFJYixLQUphOztBQU9mLE9BQUE7RUFDRSxPQURGO0VBQ1csTUFEWDtFQUNtQixJQURuQjtFQUN5QixLQUR6QjtFQUVFLElBRkY7RUFFUSxLQUZSO0VBR0UsTUFIRjtFQUdVLElBSFY7RUFHZ0IsT0FIaEI7RUFHeUIsS0FIekI7RUFJRSxLQUpGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFjaGluZSwgVmVydGV4LCBFZGdlIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcbmltcG9ydCAqIGFzIFN5bmMgZnJvbSBcIi4vc3luY1wiXG5pbXBvcnQgKiBhcyBBc3luYyBmcm9tIFwiLi9hc3luY1wiXG5pbXBvcnQgeyAkc3RhcnQsICRlbmQsIGF0U3RhcnQsIGF0RW5kIH0gZnJvbSBcIi4vc3RhdGVzXCJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuL3R5cGVzXCJcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIE1hY2hpbmUsIFZlcnRleCwgRWRnZSwgVGFsb3NcbiAgU3luYywgQXN5bmNcbiAgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZFxuICB0eXBlc1xufVxuXG5leHBvcnQge1xuICBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2UsIFRhbG9zXG4gIFN5bmMsIEFzeW5jXG4gICRzdGFydCwgJGVuZCwgYXRTdGFydCwgYXRFbmRcbiAgdHlwZXNcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2luZGV4LmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2UgfSBmcm9tIFwiLi9tYWNoaW5lXCJcbmltcG9ydCB7IFRhbG9zIH0gZnJvbSBcIi4vdGFsb3NcIlxuaW1wb3J0ICogYXMgU3luYyBmcm9tIFwiLi9zeW5jXCJcbmltcG9ydCAqIGFzIEFzeW5jIGZyb20gXCIuL2FzeW5jXCJcbmltcG9ydCB7ICRzdGFydCwgJGVuZCwgYXRTdGFydCwgYXRFbmQgfSBmcm9tIFwiLi9zdGF0ZXNcIlxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4vdHlwZXNcIlxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgTWFjaGluZSwgVmVydGV4LCBFZGdlLCBUYWxvc1xuICBTeW5jLCBBc3luY1xuICAkc3RhcnQsICRlbmQsIGF0U3RhcnQsIGF0RW5kXG4gIHR5cGVzXG59XG5cbmV4cG9ydCB7XG4gIE1hY2hpbmUsIFZlcnRleCwgRWRnZSwgVGFsb3NcbiAgU3luYywgQXN5bmNcbiAgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZFxuICB0eXBlc1xufSIsbnVsbF0sIm5hbWVzIjpbIk1hY2hpbmUiLCJWZXJ0ZXgiLCJFZGdlIiwiVGFsb3MiLCJTeW5jIiwiQXN5bmMiLCIkc3RhcnQiLCIkZW5kIiwiYXRTdGFydCIsImF0RW5kIiwidHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBUUEsT0FBZTtlQUFmOztJQVFFQSxPQURGO2VBQ0VBLGdCQURGOztJQUNXQyxNQURYO2VBQ1dBLGVBRFg7O0lBQ21CQyxJQURuQjtlQUNtQkEsYUFEbkI7O0lBQ3lCQyxLQUR6QjtlQUN5QkEsWUFEekI7O0lBRUVDLElBRkY7ZUFFRUE7O0lBQU1DLEtBRlI7ZUFFUUE7O0lBQ05DLE1BSEY7ZUFHRUEsY0FIRjs7SUFHVUMsSUFIVjtlQUdVQSxZQUhWOztJQUdnQkMsT0FIaEI7ZUFHZ0JBLGVBSGhCOztJQUd5QkMsS0FIekI7ZUFHeUJBLGFBSHpCOztJQUlFQyxLQUpGO2VBSUVBOzs7eUJBbkJGO3VCQUNBOzhEQUNBOytEQUNBO3dCQUNBOytEQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BR0EsV0FBZTtJQUNiVixTQUFBQSxnQkFEYTtJQUNKQyxRQUFBQSxlQURJO0lBQ0lDLE1BQUFBLGFBREo7SUFDVUMsT0FBQUEsWUFEVjtJQUViQyxNQUFBQTtJQUFNQyxPQUFBQTtJQUNOQyxRQUFBQSxjQUhhO0lBR0xDLE1BQUFBLFlBSEs7SUFHQ0MsU0FBQUEsZUFIRDtJQUdVQyxPQUFBQSxhQUhWO0lBSWJDLE9BQUFBO0FBSmEifQ==