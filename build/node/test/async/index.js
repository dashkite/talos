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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2FzeW5jL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFBLENBQUE7O0FBQ0EsT0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vYmFzaWNcIlxuZXhwb3J0ICogZnJvbSBcIi4vbmVzdGVkXCIiXX0=
 //# sourceURL=/@dashkite/talos/test/async/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9hc3luYy9pbmRleC5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vYmFzaWNcIlxuZXhwb3J0ICogZnJvbSBcIi4vbmVzdGVkXCIiLG51bGxdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUFBO3FCQUNBIn0=