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
    $halt: function() {
        return $halt;
    },
    $pause: function() {
        return $pause;
    },
    atStart: function() {
        return atStart;
    },
    atHalt: function() {
        return atHalt;
    },
    atPause: function() {
        return atPause;
    }
});
var $halt, $pause, $start, atHalt, atPause, atStart;
$start = Symbol("start");
$halt = Symbol("halt");
$pause = Symbol("pause");
atStart = function(x) {
    return x === $start;
};
atHalt = function(x) {
    return x === $halt;
};
atPause = function(x) {
    return x === $pause;
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvc3RhdGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUE7O0FBQUEsTUFBQSxHQUFTLE1BQUEsQ0FBTyxPQUFQOztBQUNULEtBQUEsR0FBUSxNQUFBLENBQU8sTUFBUDs7QUFDUixNQUFBLEdBQVMsTUFBQSxDQUFPLE9BQVA7O0FBRVQsT0FBQSxHQUFVLFFBQUEsQ0FBRSxDQUFGLENBQUE7U0FBUyxDQUFBLEtBQUs7QUFBZDs7QUFDVixNQUFBLEdBQVMsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUFTLENBQUEsS0FBSztBQUFkOztBQUNULE9BQUEsR0FBVSxRQUFBLENBQUUsQ0FBRixDQUFBO1NBQVMsQ0FBQSxLQUFLO0FBQWQ7O0FBR1YsT0FBQTtFQUNFLE1BREY7RUFFRSxLQUZGO0VBR0UsTUFIRjtFQUtFLE9BTEY7RUFNRSxNQU5GO0VBT0UsT0FQRiIsInNvdXJjZXNDb250ZW50IjpbIiRzdGFydCA9IFN5bWJvbCBcInN0YXJ0XCJcbiRoYWx0ID0gU3ltYm9sIFwiaGFsdFwiXG4kcGF1c2UgPSBTeW1ib2wgXCJwYXVzZVwiXG5cbmF0U3RhcnQgPSAoIHggKSAtPiB4ID09ICRzdGFydFxuYXRIYWx0ID0gKCB4ICkgLT4geCA9PSAkaGFsdFxuYXRQYXVzZSA9ICggeCApIC0+IHggPT0gJHBhdXNlXG5cblxuZXhwb3J0IHtcbiAgJHN0YXJ0XG4gICRoYWx0XG4gICRwYXVzZVxuXG4gIGF0U3RhcnRcbiAgYXRIYWx0XG4gIGF0UGF1c2Vcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/states.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3N0YXRlcy5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiJHN0YXJ0ID0gU3ltYm9sIFwic3RhcnRcIlxuJGhhbHQgPSBTeW1ib2wgXCJoYWx0XCJcbiRwYXVzZSA9IFN5bWJvbCBcInBhdXNlXCJcblxuYXRTdGFydCA9ICggeCApIC0+IHggPT0gJHN0YXJ0XG5hdEhhbHQgPSAoIHggKSAtPiB4ID09ICRoYWx0XG5hdFBhdXNlID0gKCB4ICkgLT4geCA9PSAkcGF1c2VcblxuXG5leHBvcnQge1xuICAkc3RhcnRcbiAgJGhhbHRcbiAgJHBhdXNlXG5cbiAgYXRTdGFydFxuICBhdEhhbHRcbiAgYXRQYXVzZVxufSIsbnVsbF0sIm5hbWVzIjpbIiRzdGFydCIsIiRoYWx0IiwiJHBhdXNlIiwiYXRTdGFydCIsImF0SGFsdCIsImF0UGF1c2UiLCJTeW1ib2wiLCJ4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQVVFQSxNQURGO2VBQ0VBOztJQUNBQyxLQUZGO2VBRUVBOztJQUNBQyxNQUhGO2VBR0VBOztJQUVBQyxPQUxGO2VBS0VBOztJQUNBQyxNQU5GO2VBTUVBOztJQUNBQyxPQVBGO2VBT0VBOzs7QUFoQkYsSUFBQUosT0FBQUMsUUFBQUYsUUFBQUksUUFBQUMsU0FBQUY7QUFBQUgsU0FBU00sT0FBTztBQUNoQkwsUUFBUUssT0FBTztBQUNmSixTQUFTSSxPQUFPO0FBRWhCSCxVQUFVLFNBQUVJLENBQUY7V0FBU0EsTUFBS1A7QUFBZDtBQUNWSSxTQUFTLFNBQUVHLENBQUY7V0FBU0EsTUFBS047QUFBZDtBQUNUSSxVQUFVLFNBQUVFLENBQUY7V0FBU0EsTUFBS0w7QUFBZCJ9