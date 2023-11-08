"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.pause = exports.halt = exports.atStart = exports.atPause = exports.atHalt = void 0;
var atHalt, atPause, atStart, halt, pause, start;
exports.start = start = Symbol("start");
exports.halt = halt = Symbol("halt");
exports.pause = pause = Symbol("pause");
exports.atStart = atStart = function (x) {
  return x === start;
};
exports.atHalt = atHalt = function (x) {
  return x === halt;
};
exports.atPause = atPause = function (x) {
  return x === pause;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbnRlcm5hbC9zdGF0ZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxLQUFBO0FBQUEsT0FBQSxDQUFBLEtBQUEsR0FBQSxLQUFBLEdBQVEsTUFBQSxDQUFPLE9BQVAsQ0FBQTtBQUNSLE9BQUEsQ0FBQSxJQUFBLEdBQUEsSUFBQSxHQUFPLE1BQUEsQ0FBTyxNQUFQLENBQUE7QUFDUCxPQUFBLENBQUEsS0FBQSxHQUFBLEtBQUEsR0FBUSxNQUFBLENBQU8sT0FBUCxDQUFBO0FBRVIsT0FBQSxDQUFBLE9BQUEsR0FBQSxPQUFBLEdBQVUsU0FBQSxDQUFFLENBQUYsRUFBQTtTQUFTLENBQUEsS0FBSyxLQUFBO0FBQWQsQ0FBQTtBQUNWLE9BQUEsQ0FBQSxNQUFBLEdBQUEsTUFBQSxHQUFTLFNBQUEsQ0FBRSxDQUFGLEVBQUE7U0FBUyxDQUFBLEtBQUssSUFBQTtBQUFkLENBQUE7QUFDVCxPQUFBLENBQUEsT0FBQSxHQUFBLE9BQUEsR0FBVSxTQUFBLENBQUUsQ0FBRixFQUFBO1NBQVMsQ0FBQSxLQUFLLEtBQUE7QUFBZCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsic3RhcnQgPSBTeW1ib2wgXCJzdGFydFwiXG5oYWx0ID0gU3ltYm9sIFwiaGFsdFwiXG5wYXVzZSA9IFN5bWJvbCBcInBhdXNlXCJcblxuYXRTdGFydCA9ICggeCApIC0+IHggPT0gc3RhcnRcbmF0SGFsdCA9ICggeCApIC0+IHggPT0gaGFsdFxuYXRQYXVzZSA9ICggeCApIC0+IHggPT0gcGF1c2VcblxuZXhwb3J0IHtcbiAgc3RhcnRcbiAgaGFsdFxuICBwYXVzZVxuXG4gIGF0U3RhcnRcbiAgYXRIYWx0XG4gIGF0UGF1c2Vcbn0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/internal/states.coffee