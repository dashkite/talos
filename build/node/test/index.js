"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("source-map-support/register");
const _amen = require("@dashkite/amen");
const _amenconsole = /*#__PURE__*/ _interop_require_default(require("@dashkite/amen-console"));
const _helpers = /*#__PURE__*/ _interop_require_wildcard(require("./helpers"));
const _machine = /*#__PURE__*/ _interop_require_wildcard(require("./machine"));
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
        _helpers.test("machine", _machine.basic())
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
})(); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEtBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLE9BQU8sQ0FBQSxXQUFQLE1BQUE7O0FBS0csQ0FBQSxNQUFBLFFBQUEsQ0FBQSxDQUFBLEVBQUE7OztFQUVELEtBQUEsQ0FBTSxDQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFQLEVBQWdCLENBRTFCLENBQUMsQ0FBQyxJQUFGLENBQU8sU0FBUCxFQUFrQixPQUFPLENBQUMsS0FBUixDQUFBLENBQWxCLENBRjBCLENBQWhCLENBQU4sQ0FBTixFQUFGOzs7Ozs7Ozs7Ozs7Ozs7O1NBcUJFLE9BQU8sQ0FBQyxJQUFSLENBQWdCLE9BQUgsR0FBZ0IsQ0FBaEIsR0FBdUIsQ0FBcEM7QUF2QkMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInNvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlclwiXG5pbXBvcnQgeyBzdWNjZXNzIH0gZnJvbSBcIkBkYXNoa2l0ZS9hbWVuXCJcbmltcG9ydCBwcmludCBmcm9tIFwiQGRhc2hraXRlL2FtZW4tY29uc29sZVwiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuL2hlbHBlcnNcIlxuXG5pbXBvcnQgKiBhcyBNYWNoaW5lIGZyb20gXCIuL21hY2hpbmVcIlxuIyBpbXBvcnQgKiBhcyBTdHJpY3QgZnJvbSBcIi4vc3RyaWN0XCJcbiMgaW1wb3J0ICogYXMgU3RhYmxlIGZyb20gXCIuL3N0YWJsZVwiXG4jIGltcG9ydCAqIGFzIExpbmVhciBmcm9tIFwiLi9saW5lYXJcIlxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IGgudGVzdCBcIlRhbG9zXCIsIFtcbiAgICBcbiAgICBoLnRlc3QgXCJtYWNoaW5lXCIsIE1hY2hpbmUuYmFzaWMoKVxuXG4gICAgIyBhd2FpdCBoLnRlc3QgXCJTdHJpY3RcIiwgW1xuICAgICMgICBoLnRlc3QgXCJzeW5jXCIsIFN0cmljdC5zeW5jKClcbiAgICAjICAgaC50ZXN0IFwiYXN5bmNcIiwgYXdhaXQgU3RyaWN0LmFzeW5jKClcbiAgICAjIF1cblxuICAgICMgYXdhaXQgaC50ZXN0IFwiU3RhYmxlXCIsIFtcbiAgICAjICAgaC50ZXN0IFwic3luY1wiLCBTdGFibGUuc3luYygpXG4gICAgIyAgIGgudGVzdCBcImFzeW5jXCIsIGF3YWl0IFN0YWJsZS5hc3luYygpXG4gICAgIyBdXG5cbiAgICAjIGF3YWl0IGgudGVzdCBcIkxpbmVhciBHcmFwaHNcIiwgW1xuICAgICMgICBoLnRlc3QgXCJleHBhbnNpb25cIiwgTGluZWFyLmV4cGFuc2lvbigpXG4gICAgIyAgIGgudGVzdCBcInBpcGVcIiwgTGluZWFyLnBpcGUoKVxuICAgICMgICBoLnRlc3QgXCJmbG93XCIsIGF3YWl0IExpbmVhci5mbG93KClcbiAgICAjIF1cbiAgXVxuXG4gIHByb2Nlc3MuZXhpdCBpZiBzdWNjZXNzIHRoZW4gMCBlbHNlIDFcbiJdfQ==
 //# sourceURL=/@dashkite/talos/test/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9pbmRleC5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCJcbmltcG9ydCB7IHN1Y2Nlc3MgfSBmcm9tIFwiQGRhc2hraXRlL2FtZW5cIlxuaW1wb3J0IHByaW50IGZyb20gXCJAZGFzaGtpdGUvYW1lbi1jb25zb2xlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4vaGVscGVyc1wiXG5cbmltcG9ydCAqIGFzIE1hY2hpbmUgZnJvbSBcIi4vbWFjaGluZVwiXG4jIGltcG9ydCAqIGFzIFN0cmljdCBmcm9tIFwiLi9zdHJpY3RcIlxuIyBpbXBvcnQgKiBhcyBTdGFibGUgZnJvbSBcIi4vc3RhYmxlXCJcbiMgaW1wb3J0ICogYXMgTGluZWFyIGZyb20gXCIuL2xpbmVhclwiXG5cbmRvIC0+XG5cbiAgcHJpbnQgYXdhaXQgaC50ZXN0IFwiVGFsb3NcIiwgW1xuICAgIFxuICAgIGgudGVzdCBcIm1hY2hpbmVcIiwgTWFjaGluZS5iYXNpYygpXG5cbiAgICAjIGF3YWl0IGgudGVzdCBcIlN0cmljdFwiLCBbXG4gICAgIyAgIGgudGVzdCBcInN5bmNcIiwgU3RyaWN0LnN5bmMoKVxuICAgICMgICBoLnRlc3QgXCJhc3luY1wiLCBhd2FpdCBTdHJpY3QuYXN5bmMoKVxuICAgICMgXVxuXG4gICAgIyBhd2FpdCBoLnRlc3QgXCJTdGFibGVcIiwgW1xuICAgICMgICBoLnRlc3QgXCJzeW5jXCIsIFN0YWJsZS5zeW5jKClcbiAgICAjICAgaC50ZXN0IFwiYXN5bmNcIiwgYXdhaXQgU3RhYmxlLmFzeW5jKClcbiAgICAjIF1cblxuICAgICMgYXdhaXQgaC50ZXN0IFwiTGluZWFyIEdyYXBoc1wiLCBbXG4gICAgIyAgIGgudGVzdCBcImV4cGFuc2lvblwiLCBMaW5lYXIuZXhwYW5zaW9uKClcbiAgICAjICAgaC50ZXN0IFwicGlwZVwiLCBMaW5lYXIucGlwZSgpXG4gICAgIyAgIGgudGVzdCBcImZsb3dcIiwgYXdhaXQgTGluZWFyLmZsb3coKVxuICAgICMgXVxuICBdXG5cbiAgcHJvY2Vzcy5leGl0IGlmIHN1Y2Nlc3MgdGhlbiAwIGVsc2UgMVxuIixudWxsXSwibmFtZXMiOlsicHJpbnQiLCJoIiwidGVzdCIsIk1hY2hpbmUiLCJiYXNpYyIsInByb2Nlc3MiLCJleGl0Iiwic3VjY2VzcyJdLCJtYXBwaW5ncyI6Ijs7OztRQUFBO3NCQUNBO29FQUNBO2lFQUNBO2lFQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLRyxDQUFBOzs7SUFFREEsSUFBQUEsb0JBQUEsRUFBTSxNQUFNQyxTQUFFQyxJQUFGLENBQU8sU0FBUztRQUUxQkQsU0FBRUMsSUFBRixDQUFPLFdBQVdDLFNBQVFDLEtBQVI7S0FGUjs7Ozs7Ozs7Ozs7Ozs7V0FxQlpDLFFBQVFDLElBQVIsQ0FBZ0JDLGFBQUgsR0FBZ0IsSUFBTztBQXZCbkMsQ0FBQSJ9