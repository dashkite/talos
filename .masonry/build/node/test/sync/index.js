"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
_export_star(require("./basic"), exports);
_export_star(require("./nested"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L3N5bmMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQUEsQ0FBQTs7QUFDQSxPQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9iYXNpY1wiXG5leHBvcnQgKiBmcm9tIFwiLi9uZXN0ZWRcIiJdfQ==
 //# sourceURL=/@dashkite/talos/test/sync/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9zeW5jL2luZGV4LmNvZmZlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9iYXNpY1wiXG5leHBvcnQgKiBmcm9tIFwiLi9uZXN0ZWRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUFBO3FCQUNBIn0=