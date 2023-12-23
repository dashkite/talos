"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
_export_star(require("./sync"), exports);
_export_star(require("./async"), exports);
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L3N0YWJsZS9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBQSxDQUFBOztBQUNBLE9BQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL3N5bmNcIlxuZXhwb3J0ICogZnJvbSBcIi4vYXN5bmNcIiJdfQ==
 //# sourceURL=/@dashkite/talos/test/stable/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9zdGFibGUvaW5kZXguY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL3N5bmNcIlxuZXhwb3J0ICogZnJvbSBcIi4vYXN5bmNcIiIsbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQUE7cUJBQ0EifQ==