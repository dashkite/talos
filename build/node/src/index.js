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
    machine: function() {
        return machine;
    },
    pipe: function() {
        return pipe;
    },
    flow: function() {
        return flow;
    }
});
const _machine = require("./machine");
const _talos = require("./talos");
const _sync = /*#__PURE__*/ _interop_require_wildcard(require("./sync"));
const _async = /*#__PURE__*/ _interop_require_wildcard(require("./async"));
const _states = require("./states");
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
var flow, machine, pipe;
machine = _machine.Machine.make;
pipe = _sync.pipe;
flow = _async.flow;
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
    machine,
    pipe,
    flow
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsT0FBVDtFQUFrQixNQUFsQjtFQUEwQixJQUExQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFNBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtFQUFpQixJQUFqQjtFQUF1QixPQUF2QjtFQUFnQyxLQUFoQztDQUFBLE1BQUE7O0FBR0EsT0FBQSxHQUFVLE9BQU8sQ0FBQzs7QUFDbEIsSUFBQSxHQUFPLElBQUksQ0FBQzs7QUFDWixJQUFBLEdBQU8sS0FBSyxDQUFDOztBQUViLE9BQUEsUUFBZSxDQUNiLE9BRGEsRUFDSixNQURJLEVBQ0ksSUFESixFQUViLEtBRmEsRUFHYixJQUhhLEVBR1AsS0FITyxFQUliLE1BSmEsRUFJTCxJQUpLLEVBSUMsT0FKRCxFQUlVLEtBSlYsRUFLYixPQUxhLEVBS0osSUFMSSxFQUtFLElBTEY7O0FBUWYsT0FBQTtFQUNFLE9BREY7RUFDVyxNQURYO0VBQ21CLElBRG5CO0VBRUUsS0FGRjtFQUdFLElBSEY7RUFHUSxLQUhSO0VBSUUsTUFKRjtFQUlVLElBSlY7RUFJZ0IsT0FKaEI7RUFJeUIsS0FKekI7RUFLRSxPQUxGO0VBS1csSUFMWDtFQUtpQixJQUxqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hY2hpbmUsIFZlcnRleCwgRWRnZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuaW1wb3J0IHsgVGFsb3MgfSBmcm9tIFwiLi90YWxvc1wiXG5pbXBvcnQgKiBhcyBTeW5jIGZyb20gXCIuL3N5bmNcIlxuaW1wb3J0ICogYXMgQXN5bmMgZnJvbSBcIi4vYXN5bmNcIlxuaW1wb3J0IHsgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZCB9IGZyb20gXCIuL3N0YXRlc1wiXG5cblxubWFjaGluZSA9IE1hY2hpbmUubWFrZVxucGlwZSA9IFN5bmMucGlwZVxuZmxvdyA9IEFzeW5jLmZsb3dcblxuZXhwb3J0IGRlZmF1bHQge1xuICBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2VcbiAgVGFsb3NcbiAgU3luYywgQXN5bmNcbiAgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZFxuICBtYWNoaW5lLCBwaXBlLCBmbG93XG59XG5cbmV4cG9ydCB7XG4gIE1hY2hpbmUsIFZlcnRleCwgRWRnZVxuICBUYWxvc1xuICBTeW5jLCBBc3luY1xuICAkc3RhcnQsICRlbmQsIGF0U3RhcnQsIGF0RW5kXG4gIG1hY2hpbmUsIHBpcGUsIGZsb3dcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2luZGV4LmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2UgfSBmcm9tIFwiLi9tYWNoaW5lXCJcbmltcG9ydCB7IFRhbG9zIH0gZnJvbSBcIi4vdGFsb3NcIlxuaW1wb3J0ICogYXMgU3luYyBmcm9tIFwiLi9zeW5jXCJcbmltcG9ydCAqIGFzIEFzeW5jIGZyb20gXCIuL2FzeW5jXCJcbmltcG9ydCB7ICRzdGFydCwgJGVuZCwgYXRTdGFydCwgYXRFbmQgfSBmcm9tIFwiLi9zdGF0ZXNcIlxuXG5cbm1hY2hpbmUgPSBNYWNoaW5lLm1ha2VcbnBpcGUgPSBTeW5jLnBpcGVcbmZsb3cgPSBBc3luYy5mbG93XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgTWFjaGluZSwgVmVydGV4LCBFZGdlXG4gIFRhbG9zXG4gIFN5bmMsIEFzeW5jXG4gICRzdGFydCwgJGVuZCwgYXRTdGFydCwgYXRFbmRcbiAgbWFjaGluZSwgcGlwZSwgZmxvd1xufVxuXG5leHBvcnQge1xuICBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2VcbiAgVGFsb3NcbiAgU3luYywgQXN5bmNcbiAgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZFxuICBtYWNoaW5lLCBwaXBlLCBmbG93XG59IixudWxsXSwibmFtZXMiOlsiTWFjaGluZSIsIlZlcnRleCIsIkVkZ2UiLCJUYWxvcyIsIlN5bmMiLCJBc3luYyIsIiRzdGFydCIsIiRlbmQiLCJhdFN0YXJ0IiwiYXRFbmQiLCJtYWNoaW5lIiwicGlwZSIsImZsb3ciLCJtYWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQVdBLE9BQWU7ZUFBZjs7SUFTRUEsT0FERjtlQUNFQSxnQkFERjs7SUFDV0MsTUFEWDtlQUNXQSxlQURYOztJQUNtQkMsSUFEbkI7ZUFDbUJBLGFBRG5COztJQUVFQyxLQUZGO2VBRUVBLFlBRkY7O0lBR0VDLElBSEY7ZUFHRUE7O0lBQU1DLEtBSFI7ZUFHUUE7O0lBQ05DLE1BSkY7ZUFJRUEsY0FKRjs7SUFJVUMsSUFKVjtlQUlVQSxZQUpWOztJQUlnQkMsT0FKaEI7ZUFJZ0JBLGVBSmhCOztJQUl5QkMsS0FKekI7ZUFJeUJBLGFBSnpCOztJQUtFQyxPQUxGO2VBS0VBOztJQUFTQyxJQUxYO2VBS1dBOztJQUFNQyxJQUxqQjtlQUtpQkE7Ozt5QkF4QmpCO3VCQUNBOzhEQUNBOytEQUNBO3dCQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSkEsSUFBQUEsTUFBQUYsU0FBQUM7QUFPQUQsVUFBVVYsZ0JBQU8sQ0FBQ2EsSUFBQTtBQUNsQkYsT0FBT1AsTUFBS08sSUFBQTtBQUNaQyxPQUFPUCxPQUFNTyxJQUFBO01BRWIsV0FBZTtJQUNiWixTQUFBQSxnQkFEYTtJQUNKQyxRQUFBQSxlQURJO0lBQ0lDLE1BQUFBLGFBREo7SUFFYkMsT0FBQUEsWUFGYTtJQUdiQyxNQUFBQTtJQUFNQyxPQUFBQTtJQUNOQyxRQUFBQSxjQUphO0lBSUxDLE1BQUFBLFlBSks7SUFJQ0MsU0FBQUEsZUFKRDtJQUlVQyxPQUFBQSxhQUpWO0lBS2JDO0lBQVNDO0lBQU1DO0FBTEYifQ==