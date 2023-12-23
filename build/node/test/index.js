"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("source-map-support/register");
const _amen = require("@dashkite/amen");
const _amenconsole = /*#__PURE__*/ _interop_require_default(require("@dashkite/amen-console"));
const _helpers = /*#__PURE__*/ _interop_require_wildcard(require("./helpers"));
const _strict = /*#__PURE__*/ _interop_require_wildcard(require("./strict"));
const _stable = /*#__PURE__*/ _interop_require_wildcard(require("./stable"));
const _linear = /*#__PURE__*/ _interop_require_wildcard(require("./linear"));
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
        await _helpers.test("Strict", [
            _helpers.test("sync", _strict.sync()),
            _helpers.test("async", await _strict.async())
        ]),
        await _helpers.test("Stable", [
            _helpers.test("sync", _stable.sync()),
            _helpers.test("async", await _stable.async())
        ]),
        await _helpers.test("Linear Graphs", [
            _helpers.test("expansion", _linear.expansion()),
            _helpers.test("pipe", _linear.pipe()),
            _helpers.test("flow", await _linear.flow())
        ])
    ]));
    return process.exit(_amen.success ? 0 : 1);
})(); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEtBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLE9BQU8sQ0FBQSxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFVBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsVUFBUCxNQUFBOztBQUVHLENBQUEsTUFBQSxRQUFBLENBQUEsQ0FBQTtFQUVELEtBQUEsQ0FBTSxDQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFQLEVBQWdCLENBQzFCLENBQUEsTUFBTSxDQUFDLENBQUMsSUFBRixDQUFPLFFBQVAsRUFBaUIsQ0FDckIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxNQUFQLEVBQWUsTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFmLENBRHFCLEVBRXJCLENBQUMsQ0FBQyxJQUFGLENBQU8sT0FBUCxFQUFnQixDQUFBLE1BQU0sTUFBTSxDQUFDLEtBQVAsQ0FBQSxDQUFOLENBQWhCLENBRnFCLENBQWpCLENBQU4sQ0FEMEIsRUFNMUIsQ0FBQSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sUUFBUCxFQUFpQixDQUNyQixDQUFDLENBQUMsSUFBRixDQUFPLE1BQVAsRUFBZSxNQUFNLENBQUMsSUFBUCxDQUFBLENBQWYsQ0FEcUIsRUFFckIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFQLEVBQWdCLENBQUEsTUFBTSxNQUFNLENBQUMsS0FBUCxDQUFBLENBQU4sQ0FBaEIsQ0FGcUIsQ0FBakIsQ0FBTixDQU4wQixFQVcxQixDQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxlQUFQLEVBQXdCLENBQzVCLENBQUMsQ0FBQyxJQUFGLENBQU8sV0FBUCxFQUFvQixNQUFNLENBQUMsU0FBUCxDQUFBLENBQXBCLENBRDRCLEVBRTVCLENBQUMsQ0FBQyxJQUFGLENBQU8sTUFBUCxFQUFlLE1BQU0sQ0FBQyxJQUFQLENBQUEsQ0FBZixDQUY0QixFQUc1QixDQUFDLENBQUMsSUFBRixDQUFPLE1BQVAsRUFBZSxDQUFBLE1BQU0sTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFOLENBQWYsQ0FINEIsQ0FBeEIsQ0FBTixDQVgwQixDQUFoQixDQUFOLENBQU47U0FrQkEsT0FBTyxDQUFDLElBQVIsQ0FBZ0IsT0FBSCxHQUFnQixDQUFoQixHQUF1QixDQUFwQztBQXBCQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCJcbmltcG9ydCB7IHN1Y2Nlc3MgfSBmcm9tIFwiQGRhc2hraXRlL2FtZW5cIlxuaW1wb3J0IHByaW50IGZyb20gXCJAZGFzaGtpdGUvYW1lbi1jb25zb2xlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4vaGVscGVyc1wiXG5cbmltcG9ydCAqIGFzIFN0cmljdCBmcm9tIFwiLi9zdHJpY3RcIlxuaW1wb3J0ICogYXMgU3RhYmxlIGZyb20gXCIuL3N0YWJsZVwiXG5pbXBvcnQgKiBhcyBMaW5lYXIgZnJvbSBcIi4vbGluZWFyXCJcblxuZG8gLT5cblxuICBwcmludCBhd2FpdCBoLnRlc3QgXCJUYWxvc1wiLCBbXG4gICAgYXdhaXQgaC50ZXN0IFwiU3RyaWN0XCIsIFtcbiAgICAgIGgudGVzdCBcInN5bmNcIiwgU3RyaWN0LnN5bmMoKVxuICAgICAgaC50ZXN0IFwiYXN5bmNcIiwgYXdhaXQgU3RyaWN0LmFzeW5jKClcbiAgICBdXG5cbiAgICBhd2FpdCBoLnRlc3QgXCJTdGFibGVcIiwgW1xuICAgICAgaC50ZXN0IFwic3luY1wiLCBTdGFibGUuc3luYygpXG4gICAgICBoLnRlc3QgXCJhc3luY1wiLCBhd2FpdCBTdGFibGUuYXN5bmMoKVxuICAgIF1cblxuICAgIGF3YWl0IGgudGVzdCBcIkxpbmVhciBHcmFwaHNcIiwgW1xuICAgICAgaC50ZXN0IFwiZXhwYW5zaW9uXCIsIExpbmVhci5leHBhbnNpb24oKVxuICAgICAgaC50ZXN0IFwicGlwZVwiLCBMaW5lYXIucGlwZSgpXG4gICAgICBoLnRlc3QgXCJmbG93XCIsIGF3YWl0IExpbmVhci5mbG93KClcbiAgICBdXG4gIF1cblxuICBwcm9jZXNzLmV4aXQgaWYgc3VjY2VzcyB0aGVuIDAgZWxzZSAxXG4iXX0=
 //# sourceURL=/@dashkite/talos/test/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9pbmRleC5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCJcbmltcG9ydCB7IHN1Y2Nlc3MgfSBmcm9tIFwiQGRhc2hraXRlL2FtZW5cIlxuaW1wb3J0IHByaW50IGZyb20gXCJAZGFzaGtpdGUvYW1lbi1jb25zb2xlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4vaGVscGVyc1wiXG5cbmltcG9ydCAqIGFzIFN0cmljdCBmcm9tIFwiLi9zdHJpY3RcIlxuaW1wb3J0ICogYXMgU3RhYmxlIGZyb20gXCIuL3N0YWJsZVwiXG5pbXBvcnQgKiBhcyBMaW5lYXIgZnJvbSBcIi4vbGluZWFyXCJcblxuZG8gLT5cblxuICBwcmludCBhd2FpdCBoLnRlc3QgXCJUYWxvc1wiLCBbXG4gICAgYXdhaXQgaC50ZXN0IFwiU3RyaWN0XCIsIFtcbiAgICAgIGgudGVzdCBcInN5bmNcIiwgU3RyaWN0LnN5bmMoKVxuICAgICAgaC50ZXN0IFwiYXN5bmNcIiwgYXdhaXQgU3RyaWN0LmFzeW5jKClcbiAgICBdXG5cbiAgICBhd2FpdCBoLnRlc3QgXCJTdGFibGVcIiwgW1xuICAgICAgaC50ZXN0IFwic3luY1wiLCBTdGFibGUuc3luYygpXG4gICAgICBoLnRlc3QgXCJhc3luY1wiLCBhd2FpdCBTdGFibGUuYXN5bmMoKVxuICAgIF1cblxuICAgIGF3YWl0IGgudGVzdCBcIkxpbmVhciBHcmFwaHNcIiwgW1xuICAgICAgaC50ZXN0IFwiZXhwYW5zaW9uXCIsIExpbmVhci5leHBhbnNpb24oKVxuICAgICAgaC50ZXN0IFwicGlwZVwiLCBMaW5lYXIucGlwZSgpXG4gICAgICBoLnRlc3QgXCJmbG93XCIsIGF3YWl0IExpbmVhci5mbG93KClcbiAgICBdXG4gIF1cblxuICBwcm9jZXNzLmV4aXQgaWYgc3VjY2VzcyB0aGVuIDAgZWxzZSAxXG4iLG51bGxdLCJuYW1lcyI6WyJwcmludCIsImgiLCJ0ZXN0IiwiU3RyaWN0Iiwic3luYyIsImFzeW5jIiwiU3RhYmxlIiwiTGluZWFyIiwiZXhwYW5zaW9uIiwicGlwZSIsImZsb3ciLCJwcm9jZXNzIiwiZXhpdCIsInN1Y2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7UUFBQTtzQkFDQTtvRUFDQTtpRUFDQTtnRUFFQTtnRUFDQTtnRUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUcsQ0FBQTtJQUVEQSxJQUFBQSxvQkFBQSxFQUFNLE1BQU1DLFNBQUVDLElBQUYsQ0FBTyxTQUFTO1FBQzFCLE1BQU1ELFNBQUVDLElBQUYsQ0FBTyxVQUFVO1lBQ3JCRCxTQUFFQyxJQUFGLENBQU8sUUFBUUMsUUFBT0MsSUFBUDtZQUNmSCxTQUFFQyxJQUFGLENBQU8sU0FBUyxNQUFNQyxRQUFPRSxLQUFQO1NBRmxCO1FBS04sTUFBTUosU0FBRUMsSUFBRixDQUFPLFVBQVU7WUFDckJELFNBQUVDLElBQUYsQ0FBTyxRQUFRSSxRQUFPRixJQUFQO1lBQ2ZILFNBQUVDLElBQUYsQ0FBTyxTQUFTLE1BQU1JLFFBQU9ELEtBQVA7U0FGbEI7UUFLTixNQUFNSixTQUFFQyxJQUFGLENBQU8saUJBQWlCO1lBQzVCRCxTQUFFQyxJQUFGLENBQU8sYUFBYUssUUFBT0MsU0FBUDtZQUNwQlAsU0FBRUMsSUFBRixDQUFPLFFBQVFLLFFBQU9FLElBQVA7WUFDZlIsU0FBRUMsSUFBRixDQUFPLFFBQVEsTUFBTUssUUFBT0csSUFBUDtTQUhqQjtLQVhJO1dBa0JaQyxRQUFRQyxJQUFSLENBQWdCQyxhQUFILEdBQWdCLElBQU87QUFwQm5DLENBQUEifQ==