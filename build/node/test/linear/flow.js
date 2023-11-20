"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flow = void 0;
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var Value = _interopRequireWildcard(require("@dashkite/joy/value"));
var Time = _interopRequireWildcard(require("@dashkite/joy/time"));
var _index = require("../../src/index.js");
var h = _interopRequireWildcard(require("../helpers.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var test;
exports.flow = test = function () {
  return h.target("linear-flow", async function () {
    var double, f, g, result, sum, triple;
    sum = async function (c, x, y, z) {
      await Time.sleep(1);
      return c.result = x + y + z;
    };
    double = async function (c) {
      await Time.sleep(1);
      return c.result *= 2;
    };
    triple = async function (c) {
      await Time.sleep(1);
      return c.result *= 3;
    };
    f = (0, _index.flow)([sum, double, triple]);
    h.assert(Type.isFunction(f), "flow did not build a function");
    h.assert(f.length === 4, "flow did not maintain starting arity");
    result = await f(1, 2, 3);
    if (!Value.equal({
      result: 36
    }, result)) {
      console.error(result);
      throw new Error("composition failed to produce expected output");
    }
    g = (0, _index.flow)({
      debug: true
    }, [sum, double, triple]);
    return h.assert(Type.isFunction(g), "flow debug did not build a function");
  });
};
//# sourceMappingURL=data:application/json;base64,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QUMsTUFBRixDQUFXLENBQUMsQ0FBQyxNQUFGLEtBQVksQ0FBdkIsRUFBNEIsc0NBQTVCLENBQUE7SUFFQSxNQUFBLEdBQVMsTUFBTSxDQUFBLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFkLENBQUE7SUFDVCxJQUFHLENBQUUsS0FBSyxDQUFDLEtBQU4sQ0FBWTtNQUFFLE1BQUEsRUFBUTtJQUFWLENBQVosRUFBNEIsTUFBNUIsQ0FBTCxFQUFBO01BQ0UsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkLENBQUE7TUFDQSxNQUFNLElBQUksS0FBSixDQUFVLCtDQUFWLENBRlI7O0lBS0EsQ0FBQSxHQUFJLElBQUEsV0FBQSxFQUFLO01BQUEsS0FBQSxFQUFPO0lBQVAsQ0FBTCxFQUFrQixDQUNwQixHQURvQixFQUVwQixNQUZvQixFQUdwQixNQUhvQixDQUFsQixDQUFBO1dBTUosQ0FBQyxDQUFDLE1BQUYsQ0FBVyxJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixDQUFYLEVBQWdDLHFDQUFoQyxDQUFBO0VBaENnQyxDQUF4QixDQUFBO0FBQUgsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgKiBhcyBWYWx1ZSBmcm9tIFwiQGRhc2hraXRlL2pveS92YWx1ZVwiXG5pbXBvcnQgKiBhcyBUaW1lIGZyb20gXCJAZGFzaGtpdGUvam95L3RpbWVcIlxuaW1wb3J0IHsgR3JhcGgsIGV4cGFuZCwgZmxvdyB9IGZyb20gXCIuLi8uLi9zcmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAtPiBoLnRhcmdldCBcImxpbmVhci1mbG93XCIsIC0+XG4gIHN1bSA9ICggYywgeCwgeSwgeiApIC0+IFxuICAgIGF3YWl0IFRpbWUuc2xlZXAgMVxuICAgIGMucmVzdWx0ID0geCArIHkgKyB6IFxuICBkb3VibGUgPSAoIGMgKSAtPiBcbiAgICBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICBjLnJlc3VsdCAqPSAyXG4gIHRyaXBsZSA9ICggYyApIC0+IFxuICAgIGF3YWl0IFRpbWUuc2xlZXAgMVxuICAgIGMucmVzdWx0ICo9IDNcblxuICBmID0gZmxvdyBbXG4gICAgc3VtXG4gICAgZG91YmxlXG4gICAgdHJpcGxlXG4gIF1cblxuICBoLmFzc2VydCAoIFR5cGUuaXNGdW5jdGlvbiBmICksIFwiZmxvdyBkaWQgbm90IGJ1aWxkIGEgZnVuY3Rpb25cIlxuICBoLmFzc2VydCAoIGYubGVuZ3RoID09IDQgKSwgXCJmbG93IGRpZCBub3QgbWFpbnRhaW4gc3RhcnRpbmcgYXJpdHlcIlxuICBcbiAgcmVzdWx0ID0gYXdhaXQgZiAxLCAyLCAzXG4gIGlmICEgVmFsdWUuZXF1YWwgeyByZXN1bHQ6IDM2IH0sIHJlc3VsdFxuICAgIGNvbnNvbGUuZXJyb3IgcmVzdWx0XG4gICAgdGhyb3cgbmV3IEVycm9yIFwiY29tcG9zaXRpb24gZmFpbGVkIHRvIHByb2R1Y2UgZXhwZWN0ZWQgb3V0cHV0XCJcblxuXG4gIGcgPSBmbG93IGRlYnVnOiB0cnVlLCBbXG4gICAgc3VtXG4gICAgZG91YmxlXG4gICAgdHJpcGxlXG4gIF1cblxuICBoLmFzc2VydCAoIFR5cGUuaXNGdW5jdGlvbiBnICksIFwiZmxvdyBkZWJ1ZyBkaWQgbm90IGJ1aWxkIGEgZnVuY3Rpb25cIlxuICAjIGF3YWl0IGcgMSwgMiwgM1xuXG5cbmV4cG9ydCB7IHRlc3QgYXMgZmxvdyB9Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=test/linear/flow.coffee