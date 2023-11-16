"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.atStart = exports.atPause = exports.atHalt = exports.$start = exports.$pause = exports.$halt = void 0;
var $halt, $pause, $start, atHalt, atPause, atStart;
exports.$start = $start = Symbol("start");
exports.$halt = $halt = Symbol("halt");
exports.$pause = $pause = Symbol("pause");
exports.atStart = atStart = function (x) {
  return x === $start;
};
exports.atHalt = atHalt = function (x) {
  return x === $halt;
};
exports.atPause = atPause = function (x) {
  return x === $pause;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbnRlcm5hbC9zdGF0ZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBO0FBQUEsT0FBQSxDQUFBLE1BQUEsR0FBQSxNQUFBLEdBQVMsTUFBQSxDQUFPLE9BQVAsQ0FBQTtBQUNULE9BQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQSxHQUFRLE1BQUEsQ0FBTyxNQUFQLENBQUE7QUFDUixPQUFBLENBQUEsTUFBQSxHQUFBLE1BQUEsR0FBUyxNQUFBLENBQU8sT0FBUCxDQUFBO0FBRVQsT0FBQSxDQUFBLE9BQUEsR0FBQSxPQUFBLEdBQVUsU0FBQSxDQUFFLENBQUYsRUFBQTtTQUFTLENBQUEsS0FBSyxNQUFBO0FBQWQsQ0FBQTtBQUNWLE9BQUEsQ0FBQSxNQUFBLEdBQUEsTUFBQSxHQUFTLFNBQUEsQ0FBRSxDQUFGLEVBQUE7U0FBUyxDQUFBLEtBQUssS0FBQTtBQUFkLENBQUE7QUFDVCxPQUFBLENBQUEsT0FBQSxHQUFBLE9BQUEsR0FBVSxTQUFBLENBQUUsQ0FBRixFQUFBO1NBQVMsQ0FBQSxLQUFLLE1BQUE7QUFBZCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJHN0YXJ0ID0gU3ltYm9sIFwic3RhcnRcIlxuJGhhbHQgPSBTeW1ib2wgXCJoYWx0XCJcbiRwYXVzZSA9IFN5bWJvbCBcInBhdXNlXCJcblxuYXRTdGFydCA9ICggeCApIC0+IHggPT0gJHN0YXJ0XG5hdEhhbHQgPSAoIHggKSAtPiB4ID09ICRoYWx0XG5hdFBhdXNlID0gKCB4ICkgLT4geCA9PSAkcGF1c2VcblxuXG5leHBvcnQge1xuICAkc3RhcnRcbiAgJGhhbHRcbiAgJHBhdXNlXG5cbiAgYXRTdGFydFxuICBhdEhhbHRcbiAgYXRQYXVzZVxufSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=src/internal/states.coffee