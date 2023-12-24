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
    // Sync
    // Async
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
    // Sync
    // Async
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
    }
});
const _states = require("./states");
const _machine = require("./machine");
var machine;
// import * as Sync from "./sync"
// import * as Async from "./async"
machine = _machine.Machine.make;
const _default = {
    Machine: _machine.Machine,
    Vertex: _machine.Vertex,
    Edge: _machine.Edge,
    $start: _states.$start,
    $end: _states.$end,
    atStart: _states.atStart,
    atEnd: _states.atEnd,
    machine
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFTLE1BQVQ7RUFBaUIsSUFBakI7RUFBdUIsT0FBdkI7RUFBZ0MsS0FBaEM7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0VBQWtCLE1BQWxCO0VBQTBCLElBQTFCO0NBQUEsTUFBQSxZQURBOzs7O0FBS0EsT0FBQSxHQUFVLE9BQU8sQ0FBQyxLQUxsQjs7OztBQU9BLE9BQUEsUUFBZSxDQUNiLE9BRGEsRUFDSixNQURJLEVBQ0ksSUFESixFQUtiLE1BTGEsRUFLTCxJQUxLLEVBS0MsT0FMRCxFQUtVLEtBTFYsRUFPYixPQVBhOztBQVVmLE9BQUE7RUFDRSxPQURGO0VBQ1csTUFEWDtFQUNtQixJQURuQjs7O0VBS0UsTUFMRjtFQUtVLElBTFY7RUFLZ0IsT0FMaEI7RUFLeUIsS0FMekI7RUFPRSxPQVBGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZCB9IGZyb20gXCIuL3N0YXRlc1wiXG5pbXBvcnQgeyBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2UgfSBmcm9tIFwiLi9tYWNoaW5lXCJcbiMgaW1wb3J0ICogYXMgU3luYyBmcm9tIFwiLi9zeW5jXCJcbiMgaW1wb3J0ICogYXMgQXN5bmMgZnJvbSBcIi4vYXN5bmNcIlxuXG5tYWNoaW5lID0gTWFjaGluZS5tYWtlXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgTWFjaGluZSwgVmVydGV4LCBFZGdlXG4gICMgU3luY1xuICAjIEFzeW5jXG5cbiAgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZCxcblxuICBtYWNoaW5lXG59XG5cbmV4cG9ydCB7XG4gIE1hY2hpbmUsIFZlcnRleCwgRWRnZVxuICAjIFN5bmNcbiAgIyBBc3luY1xuXG4gICRzdGFydCwgJGVuZCwgYXRTdGFydCwgYXRFbmQsXG5cbiAgbWFjaGluZVxufSJdfQ==
 //# sourceURL=/@dashkite/talos/src/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2luZGV4LmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyAkc3RhcnQsICRlbmQsIGF0U3RhcnQsIGF0RW5kIH0gZnJvbSBcIi4vc3RhdGVzXCJcbmltcG9ydCB7IE1hY2hpbmUsIFZlcnRleCwgRWRnZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuIyBpbXBvcnQgKiBhcyBTeW5jIGZyb20gXCIuL3N5bmNcIlxuIyBpbXBvcnQgKiBhcyBBc3luYyBmcm9tIFwiLi9hc3luY1wiXG5cbm1hY2hpbmUgPSBNYWNoaW5lLm1ha2VcblxuZXhwb3J0IGRlZmF1bHQge1xuICBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2VcbiAgIyBTeW5jXG4gICMgQXN5bmNcblxuICAkc3RhcnQsICRlbmQsIGF0U3RhcnQsIGF0RW5kLFxuXG4gIG1hY2hpbmVcbn1cblxuZXhwb3J0IHtcbiAgTWFjaGluZSwgVmVydGV4LCBFZGdlXG4gICMgU3luY1xuICAjIEFzeW5jXG5cbiAgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZCxcblxuICBtYWNoaW5lXG59IixudWxsXSwibmFtZXMiOlsiTWFjaGluZSIsIlZlcnRleCIsIkVkZ2UiLCIkc3RhcnQiLCIkZW5kIiwiYXRTdGFydCIsImF0RW5kIiwibWFjaGluZSIsIm1ha2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFPQSxPQUFlO2VBQWY7O0lBV0VBLE9BREY7ZUFDRUEsZ0JBREY7O0lBQ1dDLE1BRFg7ZUFDV0EsZUFEWDs7SUFDbUJDLElBRG5CO2VBQ21CQSxhQURuQjs7OztJQUtFQyxNQUxGO2VBS0VBLGNBTEY7O0lBS1VDLElBTFY7ZUFLVUEsWUFMVjs7SUFLZ0JDLE9BTGhCO2VBS2dCQSxlQUxoQjs7SUFLeUJDLEtBTHpCO2VBS3lCQSxhQUx6Qjs7SUFPRUMsT0FQRjtlQU9FQTs7O3dCQXhCRjt5QkFDQTtBQURBLElBQUFBOzs7QUFLQUEsVUFBVVAsZ0JBQU8sQ0FBQ1EsSUFBQTtNQUVsQixXQUFlO0lBQ2JSLFNBQUFBLGdCQURhO0lBQ0pDLFFBQUFBLGVBREk7SUFDSUMsTUFBQUEsYUFESjtJQUtiQyxRQUFBQSxjQUxhO0lBS0xDLE1BQUFBLFlBTEs7SUFLQ0MsU0FBQUEsZUFMRDtJQUtVQyxPQUFBQSxhQUxWO0lBT2JDO0FBUGEifQ==