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
    var newObj = {
        __proto__: null
    };
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
        _helpers.test("sync basic operation", _sync.basic()),
        _helpers.test("sync nested operation", _sync.nested()),
        _helpers.test("async basic operation", _async.basic()),
        _helpers.test("async nested operation", _async.nested())
    ]));
    return process.exit(_amen.success ? 0 : 1);
})(); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEtBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLE9BQU8sQ0FBQSxXQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsU0FBUCxNQUFBOztBQUVHLENBQUEsTUFBQSxRQUFBLENBQUEsQ0FBQTtFQUVELEtBQUEsQ0FBTSxDQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFQLEVBQWdCLENBRTFCLENBQUMsQ0FBQyxJQUFGLENBQU8sbUJBQVAsRUFBNEIsT0FBTyxDQUFDLFVBQVIsQ0FBQSxDQUE1QixDQUYwQixFQUcxQixDQUFDLENBQUMsSUFBRixDQUFPLHNCQUFQLEVBQStCLElBQUksQ0FBQyxLQUFMLENBQUEsQ0FBL0IsQ0FIMEIsRUFJMUIsQ0FBQyxDQUFDLElBQUYsQ0FBTyx1QkFBUCxFQUFnQyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQWhDLENBSjBCLEVBSzFCLENBQUMsQ0FBQyxJQUFGLENBQU8sdUJBQVAsRUFBZ0MsS0FBSyxDQUFDLEtBQU4sQ0FBQSxDQUFoQyxDQUwwQixFQU0xQixDQUFDLENBQUMsSUFBRixDQUFPLHdCQUFQLEVBQWlDLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FBakMsQ0FOMEIsQ0FBaEIsQ0FBTixDQUFOO1NBVUEsT0FBTyxDQUFDLElBQVIsQ0FBZ0IsT0FBSCxHQUFnQixDQUFoQixHQUF1QixDQUFwQztBQVpDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXJcIlxuaW1wb3J0IHsgc3VjY2VzcyB9IGZyb20gXCJAZGFzaGtpdGUvYW1lblwiXG5pbXBvcnQgcHJpbnQgZnJvbSBcIkBkYXNoa2l0ZS9hbWVuLWNvbnNvbGVcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi9oZWxwZXJzXCJcblxuaW1wb3J0ICogYXMgTWFjaGluZSBmcm9tIFwiLi9tYWNoaW5lXCJcbmltcG9ydCAqIGFzIFN5bmMgZnJvbSBcIi4vc3luY1wiXG5pbXBvcnQgKiBhcyBBc3luYyBmcm9tIFwiLi9hc3luY1wiXG5cbmRvIC0+XG5cbiAgcHJpbnQgYXdhaXQgaC50ZXN0IFwiVGFsb3NcIiwgW1xuICAgIFxuICAgIGgudGVzdCBcIm1hY2hpbmUgZXhwYW5zaW9uXCIsIE1hY2hpbmUuZXhwYW5zaW9ucygpXG4gICAgaC50ZXN0IFwic3luYyBiYXNpYyBvcGVyYXRpb25cIiwgU3luYy5iYXNpYygpXG4gICAgaC50ZXN0IFwic3luYyBuZXN0ZWQgb3BlcmF0aW9uXCIsIFN5bmMubmVzdGVkKClcbiAgICBoLnRlc3QgXCJhc3luYyBiYXNpYyBvcGVyYXRpb25cIiwgQXN5bmMuYmFzaWMoKVxuICAgIGgudGVzdCBcImFzeW5jIG5lc3RlZCBvcGVyYXRpb25cIiwgQXN5bmMubmVzdGVkKClcblxuICBdXG5cbiAgcHJvY2Vzcy5leGl0IGlmIHN1Y2Nlc3MgdGhlbiAwIGVsc2UgMVxuIl19
 //# sourceURL=/@dashkite/talos/test/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9pbmRleC5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCJcbmltcG9ydCB7IHN1Y2Nlc3MgfSBmcm9tIFwiQGRhc2hraXRlL2FtZW5cIlxuaW1wb3J0IHByaW50IGZyb20gXCJAZGFzaGtpdGUvYW1lbi1jb25zb2xlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4vaGVscGVyc1wiXG5cbmltcG9ydCAqIGFzIE1hY2hpbmUgZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgKiBhcyBTeW5jIGZyb20gXCIuL3N5bmNcIlxuaW1wb3J0ICogYXMgQXN5bmMgZnJvbSBcIi4vYXN5bmNcIlxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IGgudGVzdCBcIlRhbG9zXCIsIFtcbiAgICBcbiAgICBoLnRlc3QgXCJtYWNoaW5lIGV4cGFuc2lvblwiLCBNYWNoaW5lLmV4cGFuc2lvbnMoKVxuICAgIGgudGVzdCBcInN5bmMgYmFzaWMgb3BlcmF0aW9uXCIsIFN5bmMuYmFzaWMoKVxuICAgIGgudGVzdCBcInN5bmMgbmVzdGVkIG9wZXJhdGlvblwiLCBTeW5jLm5lc3RlZCgpXG4gICAgaC50ZXN0IFwiYXN5bmMgYmFzaWMgb3BlcmF0aW9uXCIsIEFzeW5jLmJhc2ljKClcbiAgICBoLnRlc3QgXCJhc3luYyBuZXN0ZWQgb3BlcmF0aW9uXCIsIEFzeW5jLm5lc3RlZCgpXG5cbiAgXVxuXG4gIHByb2Nlc3MuZXhpdCBpZiBzdWNjZXNzIHRoZW4gMCBlbHNlIDFcbiJdLCJuYW1lcyI6WyJwcmludCIsImgiLCJ0ZXN0IiwiTWFjaGluZSIsImV4cGFuc2lvbnMiLCJTeW5jIiwiYmFzaWMiLCJuZXN0ZWQiLCJBc3luYyIsInByb2Nlc3MiLCJleGl0Iiwic3VjY2VzcyJdLCJtYXBwaW5ncyI6Ijs7OztRQUFBO3NCQUNBO29FQUNBO2lFQUNBO2lFQUVBOzhEQUNBOytEQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVHLENBQUE7SUFFREEsSUFBQUEsb0JBQUEsRUFBTSxNQUFNQyxTQUFFQyxJQUFGLENBQU8sU0FBUztRQUUxQkQsU0FBRUMsSUFBRixDQUFPLHFCQUFxQkMsU0FBUUMsVUFBUjtRQUM1QkgsU0FBRUMsSUFBRixDQUFPLHdCQUF3QkcsTUFBS0MsS0FBTDtRQUMvQkwsU0FBRUMsSUFBRixDQUFPLHlCQUF5QkcsTUFBS0UsTUFBTDtRQUNoQ04sU0FBRUMsSUFBRixDQUFPLHlCQUF5Qk0sT0FBTUYsS0FBTjtRQUNoQ0wsU0FBRUMsSUFBRixDQUFPLDBCQUEwQk0sT0FBTUQsTUFBTjtLQU52QjtXQVVaRSxRQUFRQyxJQUFSLENBQWdCQyxhQUFILEdBQWdCLElBQU87QUFabkMsQ0FBQSJ9