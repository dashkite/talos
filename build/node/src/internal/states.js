"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.atStart = exports.atHalt = exports.$start = exports.$halt = void 0;
var $halt, $start, atHalt, atStart;
exports.$start = $start = Symbol("start");
exports.$halt = $halt = Symbol("halt");
exports.atStart = atStart = function (x) {
  return x === $start;
};
exports.atHalt = atHalt = function (x) {
  return x === $halt;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbnRlcm5hbC9zdGF0ZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsT0FBQTtBQUFBLE9BQUEsQ0FBQSxNQUFBLEdBQUEsTUFBQSxHQUFTLE1BQUEsQ0FBTyxPQUFQLENBQUE7QUFDVCxPQUFBLENBQUEsS0FBQSxHQUFBLEtBQUEsR0FBUSxNQUFBLENBQU8sTUFBUCxDQUFBO0FBRVIsT0FBQSxDQUFBLE9BQUEsR0FBQSxPQUFBLEdBQVUsU0FBQSxDQUFFLENBQUYsRUFBQTtTQUFTLENBQUEsS0FBSyxNQUFBO0FBQWQsQ0FBQTtBQUNWLE9BQUEsQ0FBQSxNQUFBLEdBQUEsTUFBQSxHQUFTLFNBQUEsQ0FBRSxDQUFGLEVBQUE7U0FBUyxDQUFBLEtBQUssS0FBQTtBQUFkLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIkc3RhcnQgPSBTeW1ib2wgXCJzdGFydFwiXG4kaGFsdCA9IFN5bWJvbCBcImhhbHRcIlxuXG5hdFN0YXJ0ID0gKCB4ICkgLT4geCA9PSAkc3RhcnRcbmF0SGFsdCA9ICggeCApIC0+IHggPT0gJGhhbHRcblxuXG5leHBvcnQge1xuICAkc3RhcnRcbiAgJGhhbHRcblxuICBhdFN0YXJ0XG4gIGF0SGFsdFxufSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=src/internal/states.coffee