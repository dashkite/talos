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
    // import * as Stable from "./stable"
    // import * as Linear from "./linear"
    (0, _amenconsole.default)(await _helpers.test("Talos", [
        _helpers.test("machine expansion", _machine.expansions()),
        _helpers.test("sync operation", _sync.basic()),
        _helpers.test("async operation", _async.basic())
    ]));
    // await h.test "Strict", [
    //   h.test "sync", Strict.sync()
    //   h.test "async", await Strict.async()
    // ]
    // await h.test "Stable", [
    //   h.test "sync", Stable.sync()
    //   h.test "async", await Stable.async()
    // ]
    // await h.test "Linear Graphs", [
    //   h.test "expansion", Linear.expansion()
    //   h.test "pipe", Linear.pipe()
    //   h.test "flow", await Linear.flow()
    // ]
    return process.exit(_amen.success ? 0 : 1);
})(); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEtBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLE9BQU8sQ0FBQSxXQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsU0FBUCxNQUFBOztBQUtHLENBQUEsTUFBQSxRQUFBLENBQUEsQ0FBQSxFQUFBOzs7RUFFRCxLQUFBLENBQU0sQ0FBQSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sT0FBUCxFQUFnQixDQUUxQixDQUFDLENBQUMsSUFBRixDQUFPLG1CQUFQLEVBQTRCLE9BQU8sQ0FBQyxVQUFSLENBQUEsQ0FBNUIsQ0FGMEIsRUFHMUIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxnQkFBUCxFQUF5QixJQUFJLENBQUMsS0FBTCxDQUFBLENBQXpCLENBSDBCLEVBSTFCLENBQUMsQ0FBQyxJQUFGLENBQU8saUJBQVAsRUFBMEIsS0FBSyxDQUFDLEtBQU4sQ0FBQSxDQUExQixDQUowQixDQUFoQixDQUFOLENBQU4sRUFBRjs7Ozs7Ozs7Ozs7Ozs7OztTQXVCRSxPQUFPLENBQUMsSUFBUixDQUFnQixPQUFILEdBQWdCLENBQWhCLEdBQXVCLENBQXBDO0FBekJDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXJcIlxuaW1wb3J0IHsgc3VjY2VzcyB9IGZyb20gXCJAZGFzaGtpdGUvYW1lblwiXG5pbXBvcnQgcHJpbnQgZnJvbSBcIkBkYXNoa2l0ZS9hbWVuLWNvbnNvbGVcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi9oZWxwZXJzXCJcblxuaW1wb3J0ICogYXMgTWFjaGluZSBmcm9tIFwiLi9tYWNoaW5lXCJcbmltcG9ydCAqIGFzIFN5bmMgZnJvbSBcIi4vc3luY1wiXG5pbXBvcnQgKiBhcyBBc3luYyBmcm9tIFwiLi9hc3luY1wiXG4jIGltcG9ydCAqIGFzIFN0cmljdCBmcm9tIFwiLi9zdHJpY3RcIlxuIyBpbXBvcnQgKiBhcyBTdGFibGUgZnJvbSBcIi4vc3RhYmxlXCJcbiMgaW1wb3J0ICogYXMgTGluZWFyIGZyb20gXCIuL2xpbmVhclwiXG5cbmRvIC0+XG5cbiAgcHJpbnQgYXdhaXQgaC50ZXN0IFwiVGFsb3NcIiwgW1xuICAgIFxuICAgIGgudGVzdCBcIm1hY2hpbmUgZXhwYW5zaW9uXCIsIE1hY2hpbmUuZXhwYW5zaW9ucygpXG4gICAgaC50ZXN0IFwic3luYyBvcGVyYXRpb25cIiwgU3luYy5iYXNpYygpXG4gICAgaC50ZXN0IFwiYXN5bmMgb3BlcmF0aW9uXCIsIEFzeW5jLmJhc2ljKClcblxuICAgICMgYXdhaXQgaC50ZXN0IFwiU3RyaWN0XCIsIFtcbiAgICAjICAgaC50ZXN0IFwic3luY1wiLCBTdHJpY3Quc3luYygpXG4gICAgIyAgIGgudGVzdCBcImFzeW5jXCIsIGF3YWl0IFN0cmljdC5hc3luYygpXG4gICAgIyBdXG5cbiAgICAjIGF3YWl0IGgudGVzdCBcIlN0YWJsZVwiLCBbXG4gICAgIyAgIGgudGVzdCBcInN5bmNcIiwgU3RhYmxlLnN5bmMoKVxuICAgICMgICBoLnRlc3QgXCJhc3luY1wiLCBhd2FpdCBTdGFibGUuYXN5bmMoKVxuICAgICMgXVxuXG4gICAgIyBhd2FpdCBoLnRlc3QgXCJMaW5lYXIgR3JhcGhzXCIsIFtcbiAgICAjICAgaC50ZXN0IFwiZXhwYW5zaW9uXCIsIExpbmVhci5leHBhbnNpb24oKVxuICAgICMgICBoLnRlc3QgXCJwaXBlXCIsIExpbmVhci5waXBlKClcbiAgICAjICAgaC50ZXN0IFwiZmxvd1wiLCBhd2FpdCBMaW5lYXIuZmxvdygpXG4gICAgIyBdXG4gIF1cblxuICBwcm9jZXNzLmV4aXQgaWYgc3VjY2VzcyB0aGVuIDAgZWxzZSAxXG4iXX0=
 //# sourceURL=/@dashkite/talos/test/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9pbmRleC5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCJcbmltcG9ydCB7IHN1Y2Nlc3MgfSBmcm9tIFwiQGRhc2hraXRlL2FtZW5cIlxuaW1wb3J0IHByaW50IGZyb20gXCJAZGFzaGtpdGUvYW1lbi1jb25zb2xlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4vaGVscGVyc1wiXG5cbmltcG9ydCAqIGFzIE1hY2hpbmUgZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgKiBhcyBTeW5jIGZyb20gXCIuL3N5bmNcIlxuaW1wb3J0ICogYXMgQXN5bmMgZnJvbSBcIi4vYXN5bmNcIlxuIyBpbXBvcnQgKiBhcyBTdHJpY3QgZnJvbSBcIi4vc3RyaWN0XCJcbiMgaW1wb3J0ICogYXMgU3RhYmxlIGZyb20gXCIuL3N0YWJsZVwiXG4jIGltcG9ydCAqIGFzIExpbmVhciBmcm9tIFwiLi9saW5lYXJcIlxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IGgudGVzdCBcIlRhbG9zXCIsIFtcbiAgICBcbiAgICBoLnRlc3QgXCJtYWNoaW5lIGV4cGFuc2lvblwiLCBNYWNoaW5lLmV4cGFuc2lvbnMoKVxuICAgIGgudGVzdCBcInN5bmMgb3BlcmF0aW9uXCIsIFN5bmMuYmFzaWMoKVxuICAgIGgudGVzdCBcImFzeW5jIG9wZXJhdGlvblwiLCBBc3luYy5iYXNpYygpXG5cbiAgICAjIGF3YWl0IGgudGVzdCBcIlN0cmljdFwiLCBbXG4gICAgIyAgIGgudGVzdCBcInN5bmNcIiwgU3RyaWN0LnN5bmMoKVxuICAgICMgICBoLnRlc3QgXCJhc3luY1wiLCBhd2FpdCBTdHJpY3QuYXN5bmMoKVxuICAgICMgXVxuXG4gICAgIyBhd2FpdCBoLnRlc3QgXCJTdGFibGVcIiwgW1xuICAgICMgICBoLnRlc3QgXCJzeW5jXCIsIFN0YWJsZS5zeW5jKClcbiAgICAjICAgaC50ZXN0IFwiYXN5bmNcIiwgYXdhaXQgU3RhYmxlLmFzeW5jKClcbiAgICAjIF1cblxuICAgICMgYXdhaXQgaC50ZXN0IFwiTGluZWFyIEdyYXBoc1wiLCBbXG4gICAgIyAgIGgudGVzdCBcImV4cGFuc2lvblwiLCBMaW5lYXIuZXhwYW5zaW9uKClcbiAgICAjICAgaC50ZXN0IFwicGlwZVwiLCBMaW5lYXIucGlwZSgpXG4gICAgIyAgIGgudGVzdCBcImZsb3dcIiwgYXdhaXQgTGluZWFyLmZsb3coKVxuICAgICMgXVxuICBdXG5cbiAgcHJvY2Vzcy5leGl0IGlmIHN1Y2Nlc3MgdGhlbiAwIGVsc2UgMVxuIixudWxsXSwibmFtZXMiOlsicHJpbnQiLCJoIiwidGVzdCIsIk1hY2hpbmUiLCJleHBhbnNpb25zIiwiU3luYyIsImJhc2ljIiwiQXN5bmMiLCJwcm9jZXNzIiwiZXhpdCIsInN1Y2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7UUFBQTtzQkFDQTtvRUFDQTtpRUFDQTtpRUFFQTs4REFDQTsrREFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0csQ0FBQTs7O0lBRURBLElBQUFBLG9CQUFBLEVBQU0sTUFBTUMsU0FBRUMsSUFBRixDQUFPLFNBQVM7UUFFMUJELFNBQUVDLElBQUYsQ0FBTyxxQkFBcUJDLFNBQVFDLFVBQVI7UUFDNUJILFNBQUVDLElBQUYsQ0FBTyxrQkFBa0JHLE1BQUtDLEtBQUw7UUFDekJMLFNBQUVDLElBQUYsQ0FBTyxtQkFBbUJLLE9BQU1ELEtBQU47S0FKaEI7Ozs7Ozs7Ozs7Ozs7O1dBdUJaRSxRQUFRQyxJQUFSLENBQWdCQyxhQUFILEdBQWdCLElBQU87QUF6Qm5DLENBQUEifQ==