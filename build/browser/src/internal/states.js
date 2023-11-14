var atCancel, atHalt, atPause, atStart, cancel, halt, pause, start;
start = Symbol("start");
halt = Symbol("halt");
pause = Symbol("pause");
cancel = Symbol("cancel");
atStart = function (x) {
  return x === start;
};
atHalt = function (x) {
  return x === halt;
};
atPause = function (x) {
  return x === pause;
};
atCancel = function (x) {
  return x === cancel;
};
export { start, halt, pause, cancel, atStart, atHalt, atPause, atCancel };