"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    $start: function() {
        return $start;
    },
    $end: function() {
        return $end;
    },
    atStart: function() {
        return atStart;
    },
    atEnd: function() {
        return atEnd;
    }
});
var $end, $start, atEnd, atStart;
$start = Symbol("start");
$end = Symbol("end");
atStart = function(x) {
    return x === $start;
};
atEnd = function(x) {
    return x === $end;
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvc3RhdGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBOztBQUFBLE1BQUEsR0FBUyxNQUFBLENBQU8sT0FBUDs7QUFDVCxJQUFBLEdBQU8sTUFBQSxDQUFPLEtBQVA7O0FBRVAsT0FBQSxHQUFVLFFBQUEsQ0FBRSxDQUFGLENBQUE7U0FBUyxDQUFBLEtBQUs7QUFBZDs7QUFDVixLQUFBLEdBQVEsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUFTLENBQUEsS0FBSztBQUFkOztBQUdSLE9BQUE7RUFDRSxNQURGO0VBRUUsSUFGRjtFQUdFLE9BSEY7RUFJRSxLQUpGIiwic291cmNlc0NvbnRlbnQiOlsiJHN0YXJ0ID0gU3ltYm9sIFwic3RhcnRcIlxuJGVuZCA9IFN5bWJvbCBcImVuZFwiXG5cbmF0U3RhcnQgPSAoIHggKSAtPiB4ID09ICRzdGFydFxuYXRFbmQgPSAoIHggKSAtPiB4ID09ICRlbmRcblxuXG5leHBvcnQge1xuICAkc3RhcnRcbiAgJGVuZFxuICBhdFN0YXJ0XG4gIGF0RW5kXG59Il19
 //# sourceURL=/@dashkite/talos/src/states.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3N0YXRlcy5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiJHN0YXJ0ID0gU3ltYm9sIFwic3RhcnRcIlxuJGVuZCA9IFN5bWJvbCBcImVuZFwiXG5cbmF0U3RhcnQgPSAoIHggKSAtPiB4ID09ICRzdGFydFxuYXRFbmQgPSAoIHggKSAtPiB4ID09ICRlbmRcblxuXG5leHBvcnQge1xuICAkc3RhcnRcbiAgJGVuZFxuICBhdFN0YXJ0XG4gIGF0RW5kXG59IixudWxsXSwibmFtZXMiOlsiJHN0YXJ0IiwiJGVuZCIsImF0U3RhcnQiLCJhdEVuZCIsIlN5bWJvbCIsIngiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBUUVBLE1BREY7ZUFDRUE7O0lBQ0FDLElBRkY7ZUFFRUE7O0lBQ0FDLE9BSEY7ZUFHRUE7O0lBQ0FDLEtBSkY7ZUFJRUE7OztBQVhGLElBQUFGLE1BQUFELFFBQUFHLE9BQUFEO0FBQUFGLFNBQVNJLE9BQU87QUFDaEJILE9BQU9HLE9BQU87QUFFZEYsVUFBVSxTQUFFRyxDQUFGO1dBQVNBLE1BQUtMO0FBQWQ7QUFDVkcsUUFBUSxTQUFFRSxDQUFGO1dBQVNBLE1BQUtKO0FBQWQifQ==