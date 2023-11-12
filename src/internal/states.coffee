start = Symbol "start"
halt = Symbol "halt"
pause = Symbol "pause"
cancel = Symbol "cancel"

atStart = ( x ) -> x == start
atHalt = ( x ) -> x == halt
atPause = ( x ) -> x == pause
atCancel = ( x ) -> x == cancel

export {
  start
  halt
  pause
  cancel

  atStart
  atHalt
  atPause
  atCancel
}