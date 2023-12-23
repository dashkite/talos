"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
_export_star(require("./accept"), exports);
_export_star(require("./run"), exports);
_export_star(require("./move"), exports);
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvY29udGFpbmVycy9lZGdlL21ha2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQUEsQ0FBQTs7QUFDQSxPQUFBLENBQUE7O0FBQ0EsT0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vYWNjZXB0XCJcbmV4cG9ydCAqIGZyb20gXCIuL3J1blwiXG5leHBvcnQgKiBmcm9tIFwiLi9tb3ZlXCIiXX0=
 //# sourceURL=/@dashkite/talos/src/containers/edge/make.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2NvbnRhaW5lcnMvZWRnZS9tYWtlLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9hY2NlcHRcIlxuZXhwb3J0ICogZnJvbSBcIi4vcnVuXCJcbmV4cG9ydCAqIGZyb20gXCIuL21vdmVcIiIsbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQUE7cUJBQ0E7cUJBQ0EifQ==