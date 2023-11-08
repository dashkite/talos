start = Symbol "start"
halt = Symbol "halt"
pause = Symbol "pause"

atStart = ( x ) -> x == start
atHalt = ( x ) -> x == halt
atPause = ( x ) -> x == pause

export {
  start
  halt
  pause

  atStart
  atHalt
  atPause
}