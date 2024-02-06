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
    $end: function() {
        return $end;
    },
    $start: function() {
        return $start;
    },
    atEnd: function() {
        return atEnd;
    },
    atStart: function() {
        return atStart;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3N0YXRlcy5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiJHN0YXJ0ID0gU3ltYm9sIFwic3RhcnRcIlxuJGVuZCA9IFN5bWJvbCBcImVuZFwiXG5cbmF0U3RhcnQgPSAoIHggKSAtPiB4ID09ICRzdGFydFxuYXRFbmQgPSAoIHggKSAtPiB4ID09ICRlbmRcblxuXG5leHBvcnQge1xuICAkc3RhcnRcbiAgJGVuZFxuICBhdFN0YXJ0XG4gIGF0RW5kXG59Il0sIm5hbWVzIjpbIiRlbmQiLCIkc3RhcnQiLCJhdEVuZCIsImF0U3RhcnQiLCJTeW1ib2wiLCJ4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQVNFQSxJQUZGO2VBRUVBOztJQURBQyxNQURGO2VBQ0VBOztJQUdBQyxLQUpGO2VBSUVBOztJQURBQyxPQUhGO2VBR0VBOzs7QUFWRixJQUFBSCxNQUFBQyxRQUFBQyxPQUFBQztBQUFBRixTQUFTRyxPQUFPO0FBQ2hCSixPQUFPSSxPQUFPO0FBRWRELFVBQVUsU0FBRUUsQ0FBRjtXQUFTQSxNQUFLSjtBQUFkO0FBQ1ZDLFFBQVEsU0FBRUcsQ0FBRjtXQUFTQSxNQUFLTDtBQUFkIn0=