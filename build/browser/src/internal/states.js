var $halt, $start, atHalt, atStart;
$start = Symbol("start");
$halt = Symbol("halt");
atStart = function (x) {
  return x === $start;
};
atHalt = function (x) {
  return x === $halt;
};
export { $start, $halt, atStart, atHalt };