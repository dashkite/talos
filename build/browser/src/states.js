var $end, $start, atEnd, atStart;
$start = Symbol("start");
$end = Symbol("end");
atStart = function(x) {
    return x === $start;
};
atEnd = function(x) {
    return x === $end;
};
export { $start, $end, atStart, atEnd }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvc3RhdGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBOztBQUFBLE1BQUEsR0FBUyxNQUFBLENBQU8sT0FBUDs7QUFDVCxJQUFBLEdBQU8sTUFBQSxDQUFPLEtBQVA7O0FBRVAsT0FBQSxHQUFVLFFBQUEsQ0FBRSxDQUFGLENBQUE7U0FBUyxDQUFBLEtBQUs7QUFBZDs7QUFDVixLQUFBLEdBQVEsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUFTLENBQUEsS0FBSztBQUFkOztBQUdSLE9BQUE7RUFDRSxNQURGO0VBRUUsSUFGRjtFQUdFLE9BSEY7RUFJRSxLQUpGIiwic291cmNlc0NvbnRlbnQiOlsiJHN0YXJ0ID0gU3ltYm9sIFwic3RhcnRcIlxuJGVuZCA9IFN5bWJvbCBcImVuZFwiXG5cbmF0U3RhcnQgPSAoIHggKSAtPiB4ID09ICRzdGFydFxuYXRFbmQgPSAoIHggKSAtPiB4ID09ICRlbmRcblxuXG5leHBvcnQge1xuICAkc3RhcnRcbiAgJGVuZFxuICBhdFN0YXJ0XG4gIGF0RW5kXG59Il19
 //# sourceURL=/@dashkite/talos/src/states.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3N0YXRlcy5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiJHN0YXJ0ID0gU3ltYm9sIFwic3RhcnRcIlxuJGVuZCA9IFN5bWJvbCBcImVuZFwiXG5cbmF0U3RhcnQgPSAoIHggKSAtPiB4ID09ICRzdGFydFxuYXRFbmQgPSAoIHggKSAtPiB4ID09ICRlbmRcblxuXG5leHBvcnQge1xuICAkc3RhcnRcbiAgJGVuZFxuICBhdFN0YXJ0XG4gIGF0RW5kXG59IixudWxsXSwibmFtZXMiOlsiJGVuZCIsIiRzdGFydCIsImF0RW5kIiwiYXRTdGFydCIsIlN5bWJvbCIsIngiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBLE1BQUFDLFFBQUFDLE9BQUFDO0FBQUFGLFNBQVNHLE9BQU87QUFDaEJKLE9BQU9JLE9BQU87QUFFZEQsVUFBVSxTQUFFRSxDQUFGO1dBQVNBLE1BQUtKO0FBQWQ7QUFDVkMsUUFBUSxTQUFFRyxDQUFGO1dBQVNBLE1BQUtMO0FBQWQ7QUFHUixTQUNFQyxNQURGLEVBRUVELElBRkYsRUFHRUcsT0FIRixFQUlFRCxLQUpGIn0=