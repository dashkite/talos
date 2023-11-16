var $halt, $pause, $start, atHalt, atPause, atStart;
$start = Symbol("start");
$halt = Symbol("halt");
$pause = Symbol("pause");
atStart = function (x) {
  return x === $start;
};
atHalt = function (x) {
  return x === $halt;
};
atPause = function (x) {
  return x === $pause;
};
export { $start, $halt, $pause, atStart, atHalt, atPause };