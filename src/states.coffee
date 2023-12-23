$start = Symbol "start"
$end = Symbol "end"

atStart = ( x ) -> x == $start
atEnd = ( x ) -> x == $end


export {
  $start
  $end
  atStart
  atEnd
}