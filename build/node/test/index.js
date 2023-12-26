"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("source-map-support/register");
const _amen = require("@dashkite/amen");
const _amenconsole = /*#__PURE__*/ _interop_require_default(require("@dashkite/amen-console"));
const _helpers = /*#__PURE__*/ _interop_require_wildcard(require("./helpers"));
const _machine = /*#__PURE__*/ _interop_require_wildcard(require("./machine"));
const _sync = /*#__PURE__*/ _interop_require_wildcard(require("./sync"));
const _async = /*#__PURE__*/ _interop_require_wildcard(require("./async"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
(async function() {
    (0, _amenconsole.default)(await _helpers.test("Talos", [
        _helpers.test("machine expansion", _machine.expansions()),
        _helpers.test("sync operation", _sync.basic()),
        _helpers.test("async operation", _async.basic())
    ]));
    return process.exit(_amen.success ? 0 : 1);
})(); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEtBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLE9BQU8sQ0FBQSxXQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsU0FBUCxNQUFBOztBQUVHLENBQUEsTUFBQSxRQUFBLENBQUEsQ0FBQTtFQUVELEtBQUEsQ0FBTSxDQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFQLEVBQWdCLENBRTFCLENBQUMsQ0FBQyxJQUFGLENBQU8sbUJBQVAsRUFBNEIsT0FBTyxDQUFDLFVBQVIsQ0FBQSxDQUE1QixDQUYwQixFQUcxQixDQUFDLENBQUMsSUFBRixDQUFPLGdCQUFQLEVBQXlCLElBQUksQ0FBQyxLQUFMLENBQUEsQ0FBekIsQ0FIMEIsRUFJMUIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxpQkFBUCxFQUEwQixLQUFLLENBQUMsS0FBTixDQUFBLENBQTFCLENBSjBCLENBQWhCLENBQU4sQ0FBTjtTQVFBLE9BQU8sQ0FBQyxJQUFSLENBQWdCLE9BQUgsR0FBZ0IsQ0FBaEIsR0FBdUIsQ0FBcEM7QUFWQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCJcbmltcG9ydCB7IHN1Y2Nlc3MgfSBmcm9tIFwiQGRhc2hraXRlL2FtZW5cIlxuaW1wb3J0IHByaW50IGZyb20gXCJAZGFzaGtpdGUvYW1lbi1jb25zb2xlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4vaGVscGVyc1wiXG5cbmltcG9ydCAqIGFzIE1hY2hpbmUgZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgKiBhcyBTeW5jIGZyb20gXCIuL3N5bmNcIlxuaW1wb3J0ICogYXMgQXN5bmMgZnJvbSBcIi4vYXN5bmNcIlxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IGgudGVzdCBcIlRhbG9zXCIsIFtcbiAgICBcbiAgICBoLnRlc3QgXCJtYWNoaW5lIGV4cGFuc2lvblwiLCBNYWNoaW5lLmV4cGFuc2lvbnMoKVxuICAgIGgudGVzdCBcInN5bmMgb3BlcmF0aW9uXCIsIFN5bmMuYmFzaWMoKVxuICAgIGgudGVzdCBcImFzeW5jIG9wZXJhdGlvblwiLCBBc3luYy5iYXNpYygpXG5cbiAgXVxuXG4gIHByb2Nlc3MuZXhpdCBpZiBzdWNjZXNzIHRoZW4gMCBlbHNlIDFcbiJdfQ==
 //# sourceURL=/@dashkite/talos/test/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9pbmRleC5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCJcbmltcG9ydCB7IHN1Y2Nlc3MgfSBmcm9tIFwiQGRhc2hraXRlL2FtZW5cIlxuaW1wb3J0IHByaW50IGZyb20gXCJAZGFzaGtpdGUvYW1lbi1jb25zb2xlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4vaGVscGVyc1wiXG5cbmltcG9ydCAqIGFzIE1hY2hpbmUgZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgKiBhcyBTeW5jIGZyb20gXCIuL3N5bmNcIlxuaW1wb3J0ICogYXMgQXN5bmMgZnJvbSBcIi4vYXN5bmNcIlxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IGgudGVzdCBcIlRhbG9zXCIsIFtcbiAgICBcbiAgICBoLnRlc3QgXCJtYWNoaW5lIGV4cGFuc2lvblwiLCBNYWNoaW5lLmV4cGFuc2lvbnMoKVxuICAgIGgudGVzdCBcInN5bmMgb3BlcmF0aW9uXCIsIFN5bmMuYmFzaWMoKVxuICAgIGgudGVzdCBcImFzeW5jIG9wZXJhdGlvblwiLCBBc3luYy5iYXNpYygpXG5cbiAgXVxuXG4gIHByb2Nlc3MuZXhpdCBpZiBzdWNjZXNzIHRoZW4gMCBlbHNlIDFcbiIsbnVsbF0sIm5hbWVzIjpbInByaW50IiwiaCIsInRlc3QiLCJNYWNoaW5lIiwiZXhwYW5zaW9ucyIsIlN5bmMiLCJiYXNpYyIsIkFzeW5jIiwicHJvY2VzcyIsImV4aXQiLCJzdWNjZXNzIl0sIm1hcHBpbmdzIjoiOzs7O1FBQUE7c0JBQ0E7b0VBQ0E7aUVBQ0E7aUVBRUE7OERBQ0E7K0RBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVHLENBQUE7SUFFREEsSUFBQUEsb0JBQUEsRUFBTSxNQUFNQyxTQUFFQyxJQUFGLENBQU8sU0FBUztRQUUxQkQsU0FBRUMsSUFBRixDQUFPLHFCQUFxQkMsU0FBUUMsVUFBUjtRQUM1QkgsU0FBRUMsSUFBRixDQUFPLGtCQUFrQkcsTUFBS0MsS0FBTDtRQUN6QkwsU0FBRUMsSUFBRixDQUFPLG1CQUFtQkssT0FBTUQsS0FBTjtLQUpoQjtXQVFaRSxRQUFRQyxJQUFSLENBQWdCQyxhQUFILEdBQWdCLElBQU87QUFWbkMsQ0FBQSJ9