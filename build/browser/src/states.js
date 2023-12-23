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
export { $start, $halt, $pause, atStart, atHalt, atPause }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3N0YXRlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBOztBQUFBLE1BQUEsR0FBUyxNQUFBLENBQU8sT0FBUDs7QUFDVCxLQUFBLEdBQVEsTUFBQSxDQUFPLE1BQVA7O0FBQ1IsTUFBQSxHQUFTLE1BQUEsQ0FBTyxPQUFQOztBQUVULE9BQUEsR0FBVSxRQUFBLENBQUUsQ0FBRixDQUFBO1NBQVMsQ0FBQSxLQUFLO0FBQWQ7O0FBQ1YsTUFBQSxHQUFTLFFBQUEsQ0FBRSxDQUFGLENBQUE7U0FBUyxDQUFBLEtBQUs7QUFBZDs7QUFDVCxPQUFBLEdBQVUsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUFTLENBQUEsS0FBSztBQUFkOztBQUdWLE9BQUE7RUFDRSxNQURGO0VBRUUsS0FGRjtFQUdFLE1BSEY7RUFLRSxPQUxGO0VBTUUsTUFORjtFQU9FLE9BUEYiLCJzb3VyY2VzQ29udGVudCI6WyIkc3RhcnQgPSBTeW1ib2wgXCJzdGFydFwiXG4kaGFsdCA9IFN5bWJvbCBcImhhbHRcIlxuJHBhdXNlID0gU3ltYm9sIFwicGF1c2VcIlxuXG5hdFN0YXJ0ID0gKCB4ICkgLT4geCA9PSAkc3RhcnRcbmF0SGFsdCA9ICggeCApIC0+IHggPT0gJGhhbHRcbmF0UGF1c2UgPSAoIHggKSAtPiB4ID09ICRwYXVzZVxuXG5cbmV4cG9ydCB7XG4gICRzdGFydFxuICAkaGFsdFxuICAkcGF1c2VcblxuICBhdFN0YXJ0XG4gIGF0SGFsdFxuICBhdFBhdXNlXG59Il19
 //# sourceURL=src/states.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdGF0ZXMuY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbIiRzdGFydCA9IFN5bWJvbCBcInN0YXJ0XCJcbiRoYWx0ID0gU3ltYm9sIFwiaGFsdFwiXG4kcGF1c2UgPSBTeW1ib2wgXCJwYXVzZVwiXG5cbmF0U3RhcnQgPSAoIHggKSAtPiB4ID09ICRzdGFydFxuYXRIYWx0ID0gKCB4ICkgLT4geCA9PSAkaGFsdFxuYXRQYXVzZSA9ICggeCApIC0+IHggPT0gJHBhdXNlXG5cblxuZXhwb3J0IHtcbiAgJHN0YXJ0XG4gICRoYWx0XG4gICRwYXVzZVxuXG4gIGF0U3RhcnRcbiAgYXRIYWx0XG4gIGF0UGF1c2Vcbn0iXSwibmFtZXMiOlsiJGhhbHQiLCIkcGF1c2UiLCIkc3RhcnQiLCJhdEhhbHQiLCJhdFBhdXNlIiwiYXRTdGFydCIsIlN5bWJvbCIsIngiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBLE9BQUFDLFFBQUFDLFFBQUFDLFFBQUFDLFNBQUFDO0FBQUFILFNBQVNJLE9BQU87QUFDaEJOLFFBQVFNLE9BQU87QUFDZkwsU0FBU0ssT0FBTztBQUVoQkQsVUFBVSxTQUFFRSxDQUFGO1dBQVNBLE1BQUtMO0FBQWQ7QUFDVkMsU0FBUyxTQUFFSSxDQUFGO1dBQVNBLE1BQUtQO0FBQWQ7QUFDVEksVUFBVSxTQUFFRyxDQUFGO1dBQVNBLE1BQUtOO0FBQWQ7QUFHVixTQUNFQyxNQURGLEVBRUVGLEtBRkYsRUFHRUMsTUFIRixFQUtFSSxPQUxGLEVBTUVGLE1BTkYsRUFPRUMsT0FQRiJ9