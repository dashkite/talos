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
    machine: function() {
        return machine;
    }
});
const _machine = require("./machine");
var machine;
// import * as Sync from "./sync"
// import * as Async from "./async"
machine = _machine.Machine.make;
const _default = {
    Machine: _machine.Machine,
    Vertex: _machine.Vertex,
    Edge: _machine.Edge,
    machine
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFTLE9BQVQ7RUFBa0IsTUFBbEI7RUFBMEIsSUFBMUI7Q0FBQSxNQUFBLFlBQUE7Ozs7QUFJQSxPQUFBLEdBQVUsT0FBTyxDQUFDLEtBSmxCOzs7O0FBTUEsT0FBQSxRQUFlLENBQ2IsT0FEYSxFQUViLE1BRmEsRUFHYixJQUhhLEVBT2IsT0FQYTs7QUFVZixPQUFBO0VBQ0UsT0FERjtFQUVFLE1BRkY7RUFHRSxJQUhGOzs7RUFPRSxPQVBGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFjaGluZSwgVmVydGV4LCBFZGdlIH0gZnJvbSBcIi4vbWFjaGluZVwiXG4jIGltcG9ydCAqIGFzIFN5bmMgZnJvbSBcIi4vc3luY1wiXG4jIGltcG9ydCAqIGFzIEFzeW5jIGZyb20gXCIuL2FzeW5jXCJcblxubWFjaGluZSA9IE1hY2hpbmUubWFrZVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIE1hY2hpbmVcbiAgVmVydGV4XG4gIEVkZ2VcbiAgIyBTeW5jXG4gICMgQXN5bmNcblxuICBtYWNoaW5lXG59XG5cbmV4cG9ydCB7XG4gIE1hY2hpbmVcbiAgVmVydGV4XG4gIEVkZ2VcbiAgIyBTeW5jXG4gICMgQXN5bmNcblxuICBtYWNoaW5lXG59Il19
 //# sourceURL=/@dashkite/talos/src/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2luZGV4LmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2UgfSBmcm9tIFwiLi9tYWNoaW5lXCJcbiMgaW1wb3J0ICogYXMgU3luYyBmcm9tIFwiLi9zeW5jXCJcbiMgaW1wb3J0ICogYXMgQXN5bmMgZnJvbSBcIi4vYXN5bmNcIlxuXG5tYWNoaW5lID0gTWFjaGluZS5tYWtlXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgTWFjaGluZVxuICBWZXJ0ZXhcbiAgRWRnZVxuICAjIFN5bmNcbiAgIyBBc3luY1xuXG4gIG1hY2hpbmVcbn1cblxuZXhwb3J0IHtcbiAgTWFjaGluZVxuICBWZXJ0ZXhcbiAgRWRnZVxuICAjIFN5bmNcbiAgIyBBc3luY1xuXG4gIG1hY2hpbmVcbn0iLG51bGxdLCJuYW1lcyI6WyJNYWNoaW5lIiwiVmVydGV4IiwiRWRnZSIsIm1hY2hpbmUiLCJtYWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBTUEsT0FBZTtlQUFmOztJQVdFQSxPQURGO2VBQ0VBLGdCQURGOztJQUVFQyxNQUZGO2VBRUVBLGVBRkY7O0lBR0VDLElBSEY7ZUFHRUEsYUFIRjs7OztJQU9FQyxPQVBGO2VBT0VBOzs7eUJBdkJGO0FBQUEsSUFBQUE7OztBQUlBQSxVQUFVSCxnQkFBTyxDQUFDSSxJQUFBO01BRWxCLFdBQWU7SUFDYkosU0FBQUEsZ0JBRGE7SUFFYkMsUUFBQUEsZUFGYTtJQUdiQyxNQUFBQSxhQUhhO0lBT2JDO0FBUGEifQ==