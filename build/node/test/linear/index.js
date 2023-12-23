"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
_export_star(require("./expansion"), exports);
_export_star(require("./pipe"), exports);
_export_star(require("./flow"), exports);
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2xpbmVhci9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBQSxDQUFBOztBQUNBLE9BQUEsQ0FBQTs7QUFDQSxPQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9leHBhbnNpb25cIlxuZXhwb3J0ICogZnJvbSBcIi4vcGlwZVwiXG5leHBvcnQgKiBmcm9tIFwiLi9mbG93XCIiXX0=
 //# sourceURL=/@dashkite/talos/test/linear/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9saW5lYXIvaW5kZXguY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL2V4cGFuc2lvblwiXG5leHBvcnQgKiBmcm9tIFwiLi9waXBlXCJcbmV4cG9ydCAqIGZyb20gXCIuL2Zsb3dcIiIsbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQUE7cUJBQ0E7cUJBQ0EifQ==