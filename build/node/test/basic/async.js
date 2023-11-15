"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.async = void 0;
var Time = _interopRequireWildcard(require("@dashkite/joy/time"));
var h = _interopRequireWildcard(require("../helpers.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var test;
exports.async = test = async function ($) {
  var graph, talos;
  graph = null;
  talos = null;
  return [await h.test("define graph", h.target("basic-async", function () {
    return graph = $.lib.Graph.create({
      [$.start]: {
        edges: [{
          accept: true,
          run: null,
          move: "A"
        }]
      },
      A: {
        edges: [{
          accept: "go",
          run: async function (talos) {
            await Time.sleep(1);
            return talos.context.message = "made it to A, going to B";
          },
          move: "B"
        }]
      },
      B: {
        edges: [{
          accept: false,
          run: async function (talos) {
            await Time.sleep(1);
            return talos.context.message = "this overwrite shouldn't happen";
          },
          move: $.halt
        }, {
          accept: true,
          run: async function () {
            return await Time.sleep(1);
          },
          move: $.halt
        }]
      }
    });
  })), await h.test("define talos", h.target("basic-async", function () {
    return talos = $.lib.Talos.create();
  })), await h.test("run talos", h.target("basic-async", async function () {
    h.assert.equal($.start, talos.state);
    await $.lib.stepAsync(graph, talos, null);
    h.assert.equal("A", talos.state);
    await $.lib.stepAsync(graph, talos, "go");
    h.assert.equal("B", talos.state);
    h.assert.equal("made it to A, going to B", talos.context.message);
    await $.lib.stepAsync(graph, talos, "go");
    h.assert(talos.success);
    return h.assert.equal("made it to A, going to B", talos.context.message);
  }))];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzaWMvYXN5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUEsSUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQTtBQUFBLElBQUEsQ0FBQSxHQUFBLHVCQUFBLENBQUEsT0FBQTtBQUFBLFNBQUEseUJBQUEsQ0FBQSw2QkFBQSxPQUFBLG1CQUFBLENBQUEsT0FBQSxPQUFBLElBQUEsQ0FBQSxPQUFBLE9BQUEsWUFBQSx3QkFBQSxZQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUE7QUFBQSxTQUFBLHdCQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsVUFBQSxTQUFBLENBQUEsZUFBQSxDQUFBLHVCQUFBLENBQUEseUJBQUEsQ0FBQSxXQUFBLE9BQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLHdCQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsU0FBQSxVQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxJQUFBLE1BQUEsQ0FBQSx3QkFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLG9CQUFBLENBQUEsSUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSx3QkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsWUFBQSxDQUFBLENB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QyxDQUFDLEdBQUcsQ0FBQyxTQUFOLENBQWdCLEtBQWhCLEVBQXVCLEtBQXZCLEVBQThCLElBQTlCLENBQUE7SUFDTixDQUFDLENBQUMsTUFBRixDQUFTLEtBQUssQ0FBQyxPQUFmLENBQUE7V0FDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSwwQkFBZixFQUEyQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXpELENBQUE7RUFaZ0QsQ0FBeEIsQ0FBcEIsQ0FqQ1IsQztBQUpLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUaW1lIGZyb20gXCJAZGFzaGtpdGUvam95L3RpbWVcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAoICQgKSAtPlxuICBncmFwaCA9IG51bGxcbiAgdGFsb3MgPSBudWxsXG5cbiAgW1xuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSBncmFwaFwiLCBoLnRhcmdldCBcImJhc2ljLWFzeW5jXCIsIC0+XG4gICAgICBncmFwaCA9ICQubGliLkdyYXBoLmNyZWF0ZVxuICAgICAgICBbICQuc3RhcnQgXTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgIG1vdmU6IFwiQVwiXG4gICAgICAgICAgXVxuICAgICAgICBBOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IFwiZ29cIlxuICAgICAgICAgICAgcnVuOiAoIHRhbG9zICkgLT5cbiAgICAgICAgICAgICAgYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgICAgICAgICAgIHRhbG9zLmNvbnRleHQubWVzc2FnZSA9IFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCJcbiAgICAgICAgICAgIG1vdmU6IFwiQlwiXG4gICAgICAgICAgXVxuICAgICAgICBCOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICAgIGFjY2VwdDogZmFsc2VcbiAgICAgICAgICAgICAgcnVuOiAoIHRhbG9zICkgLT5cbiAgICAgICAgICAgICAgICBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICAgICAgICAgICAgICB0YWxvcy5jb250ZXh0Lm1lc3NhZ2UgPSBcInRoaXMgb3ZlcndyaXRlIHNob3VsZG4ndCBoYXBwZW5cIlxuICAgICAgICAgICAgICBtb3ZlOiAkLmhhbHRcbiAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICAgIHJ1bjogLT4gYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgICAgICAgICAgIG1vdmU6ICQuaGFsdFxuICAgICAgICAgIF1cbiAgICBcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgdGFsb3NcIiwgaC50YXJnZXQgXCJiYXNpYy1hc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSAkLmxpYi5UYWxvcy5jcmVhdGUoKVxuXG4gICAgYXdhaXQgaC50ZXN0IFwicnVuIHRhbG9zXCIsIGgudGFyZ2V0IFwiYmFzaWMtYXN5bmNcIiwgLT5cbiAgICAgIGguYXNzZXJ0LmVxdWFsICQuc3RhcnQsIHRhbG9zLnN0YXRlXG4gICAgICBcbiAgICAgIGF3YWl0ICQubGliLnN0ZXBBc3luYyBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICBhd2FpdCAkLmxpYi5zdGVwQXN5bmMgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQlwiLCB0YWxvcy5zdGF0ZVxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG5cbiAgICAgIGF3YWl0ICQubGliLnN0ZXBBc3luYyBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQgdGFsb3Muc3VjY2Vzc1xuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG4gIF1cblxuZXhwb3J0IHsgdGVzdCBhcyBhc3luYyB9Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=test/basic/async.coffee