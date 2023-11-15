$start = Symbol "start"
$halt = Symbol "halt"

atStart = ( x ) -> x == $start
atHalt = ( x ) -> x == $halt


export {
  $start
  $halt

  atStart
  atHalt
}