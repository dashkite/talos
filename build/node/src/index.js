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
    pipeWith: function() {
        return pipeWith;
    },
    flow: function() {
        return flow;
    },
    flowWith: function() {
        return flowWith;
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
var flow, flowWith, machine, pipe, pipeWith;
machine = _machine.Machine.make;
pipe = _sync.pipe;
pipeWith = _sync.pipeWith;
flow = _async.flow;
flowWith = _async.flowWith;
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
    pipeWith,
    flow,
    flowWith
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxPQUFUO0VBQWtCLE1BQWxCO0VBQTBCLElBQTFCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsU0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0VBQWlCLElBQWpCO0VBQXVCLE9BQXZCO0VBQWdDLEtBQWhDO0NBQUEsTUFBQTs7QUFHQSxPQUFBLEdBQVUsT0FBTyxDQUFDOztBQUNsQixJQUFBLEdBQU8sSUFBSSxDQUFDOztBQUNaLFFBQUEsR0FBVyxJQUFJLENBQUM7O0FBQ2hCLElBQUEsR0FBTyxLQUFLLENBQUM7O0FBQ2IsUUFBQSxHQUFXLEtBQUssQ0FBQzs7QUFFakIsT0FBQSxRQUFlLENBQ2IsT0FEYSxFQUNKLE1BREksRUFDSSxJQURKLEVBRWIsS0FGYSxFQUdiLElBSGEsRUFHUCxLQUhPLEVBSWIsTUFKYSxFQUlMLElBSkssRUFJQyxPQUpELEVBSVUsS0FKVixFQUtiLE9BTGEsRUFLSixJQUxJLEVBS0UsUUFMRixFQUtZLElBTFosRUFLa0IsUUFMbEI7O0FBUWYsT0FBQTtFQUNFLE9BREY7RUFDVyxNQURYO0VBQ21CLElBRG5CO0VBRUUsS0FGRjtFQUdFLElBSEY7RUFHUSxLQUhSO0VBSUUsTUFKRjtFQUlVLElBSlY7RUFJZ0IsT0FKaEI7RUFJeUIsS0FKekI7RUFLRSxPQUxGO0VBS1csSUFMWDtFQUtpQixRQUxqQjtFQUsyQixJQUwzQjtFQUtpQyxRQUxqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hY2hpbmUsIFZlcnRleCwgRWRnZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuaW1wb3J0IHsgVGFsb3MgfSBmcm9tIFwiLi90YWxvc1wiXG5pbXBvcnQgKiBhcyBTeW5jIGZyb20gXCIuL3N5bmNcIlxuaW1wb3J0ICogYXMgQXN5bmMgZnJvbSBcIi4vYXN5bmNcIlxuaW1wb3J0IHsgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZCB9IGZyb20gXCIuL3N0YXRlc1wiXG5cblxubWFjaGluZSA9IE1hY2hpbmUubWFrZVxucGlwZSA9IFN5bmMucGlwZVxucGlwZVdpdGggPSBTeW5jLnBpcGVXaXRoXG5mbG93ID0gQXN5bmMuZmxvd1xuZmxvd1dpdGggPSBBc3luYy5mbG93V2l0aFxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIE1hY2hpbmUsIFZlcnRleCwgRWRnZVxuICBUYWxvc1xuICBTeW5jLCBBc3luY1xuICAkc3RhcnQsICRlbmQsIGF0U3RhcnQsIGF0RW5kXG4gIG1hY2hpbmUsIHBpcGUsIHBpcGVXaXRoLCBmbG93LCBmbG93V2l0aFxufVxuXG5leHBvcnQge1xuICBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2VcbiAgVGFsb3NcbiAgU3luYywgQXN5bmNcbiAgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZFxuICBtYWNoaW5lLCBwaXBlLCBwaXBlV2l0aCwgZmxvdywgZmxvd1dpdGhcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2luZGV4LmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2UgfSBmcm9tIFwiLi9tYWNoaW5lXCJcbmltcG9ydCB7IFRhbG9zIH0gZnJvbSBcIi4vdGFsb3NcIlxuaW1wb3J0ICogYXMgU3luYyBmcm9tIFwiLi9zeW5jXCJcbmltcG9ydCAqIGFzIEFzeW5jIGZyb20gXCIuL2FzeW5jXCJcbmltcG9ydCB7ICRzdGFydCwgJGVuZCwgYXRTdGFydCwgYXRFbmQgfSBmcm9tIFwiLi9zdGF0ZXNcIlxuXG5cbm1hY2hpbmUgPSBNYWNoaW5lLm1ha2VcbnBpcGUgPSBTeW5jLnBpcGVcbnBpcGVXaXRoID0gU3luYy5waXBlV2l0aFxuZmxvdyA9IEFzeW5jLmZsb3dcbmZsb3dXaXRoID0gQXN5bmMuZmxvd1dpdGhcblxuZXhwb3J0IGRlZmF1bHQge1xuICBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2VcbiAgVGFsb3NcbiAgU3luYywgQXN5bmNcbiAgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZFxuICBtYWNoaW5lLCBwaXBlLCBwaXBlV2l0aCwgZmxvdywgZmxvd1dpdGhcbn1cblxuZXhwb3J0IHtcbiAgTWFjaGluZSwgVmVydGV4LCBFZGdlXG4gIFRhbG9zXG4gIFN5bmMsIEFzeW5jXG4gICRzdGFydCwgJGVuZCwgYXRTdGFydCwgYXRFbmRcbiAgbWFjaGluZSwgcGlwZSwgcGlwZVdpdGgsIGZsb3csIGZsb3dXaXRoXG59IixudWxsXSwibmFtZXMiOlsiTWFjaGluZSIsIlZlcnRleCIsIkVkZ2UiLCJUYWxvcyIsIlN5bmMiLCJBc3luYyIsIiRzdGFydCIsIiRlbmQiLCJhdFN0YXJ0IiwiYXRFbmQiLCJtYWNoaW5lIiwicGlwZSIsInBpcGVXaXRoIiwiZmxvdyIsImZsb3dXaXRoIiwibWFrZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFhQSxPQUFlO2VBQWY7O0lBU0VBLE9BREY7ZUFDRUEsZ0JBREY7O0lBQ1dDLE1BRFg7ZUFDV0EsZUFEWDs7SUFDbUJDLElBRG5CO2VBQ21CQSxhQURuQjs7SUFFRUMsS0FGRjtlQUVFQSxZQUZGOztJQUdFQyxJQUhGO2VBR0VBOztJQUFNQyxLQUhSO2VBR1FBOztJQUNOQyxNQUpGO2VBSUVBLGNBSkY7O0lBSVVDLElBSlY7ZUFJVUEsWUFKVjs7SUFJZ0JDLE9BSmhCO2VBSWdCQSxlQUpoQjs7SUFJeUJDLEtBSnpCO2VBSXlCQSxhQUp6Qjs7SUFLRUMsT0FMRjtlQUtFQTs7SUFBU0MsSUFMWDtlQUtXQTs7SUFBTUMsUUFMakI7ZUFLaUJBOztJQUFVQyxJQUwzQjtlQUsyQkE7O0lBQU1DLFFBTGpDO2VBS2lDQTs7O3lCQTFCakM7dUJBQ0E7OERBQ0E7K0RBQ0E7d0JBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFKQSxJQUFBRCxNQUFBQyxVQUFBSixTQUFBQyxNQUFBQztBQU9BRixVQUFVVixnQkFBTyxDQUFDZSxJQUFBO0FBQ2xCSixPQUFPUCxNQUFLTyxJQUFBO0FBQ1pDLFdBQVdSLE1BQUtRLFFBQUE7QUFDaEJDLE9BQU9SLE9BQU1RLElBQUE7QUFDYkMsV0FBV1QsT0FBTVMsUUFBQTtNQUVqQixXQUFlO0lBQ2JkLFNBQUFBLGdCQURhO0lBQ0pDLFFBQUFBLGVBREk7SUFDSUMsTUFBQUEsYUFESjtJQUViQyxPQUFBQSxZQUZhO0lBR2JDLE1BQUFBO0lBQU1DLE9BQUFBO0lBQ05DLFFBQUFBLGNBSmE7SUFJTEMsTUFBQUEsWUFKSztJQUlDQyxTQUFBQSxlQUpEO0lBSVVDLE9BQUFBLGFBSlY7SUFLYkM7SUFBU0M7SUFBTUM7SUFBVUM7SUFBTUM7QUFMbEIifQ==