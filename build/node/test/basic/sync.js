"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = void 0;
var h = _interopRequireWildcard(require("../helpers.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var test;
exports.sync = test = async function ($) {
  var graph, talos;
  graph = null;
  talos = null;
  return [await h.test("define graph", h.target("basic-sync", function () {
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
          run: function (talos) {
            return talos.context.message = "made it to A, going to B";
          },
          move: "B"
        }]
      },
      B: {
        edges: [{
          accept: false,
          run: function (talos) {
            return talos.context.message = "this overwrite shouldn't happen";
          },
          move: $.halt
        }, {
          accept: true,
          run: null,
          move: $.halt
        }]
      }
    });
  })), await h.test("define talos", h.target("basic-sync", function () {
    return talos = $.lib.Talos.create();
  })), await h.test("run talos", h.target("basic-sync", function () {
    h.assert.equal($.start, talos.state);
    $.lib.stepSync(graph, talos, null);
    h.assert.equal("A", talos.state);
    $.lib.stepSync(graph, talos, "go");
    h.assert.equal("B", talos.state);
    h.assert.equal("made it to A, going to B", talos.context.message);
    $.lib.stepSync(graph, talos, "go");
    h.assert(talos.success);
    h.assert.equal("made it to A, going to B", talos.context.message);
    return console.log(talos);
  }))];
};
//# sourceMappingURL=data:application/json;base64,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QyxPQUFPLENBQUMsT0FBekQsQ0FBQTtXQUVBLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWixDQUFBO0VBZCtDLENBQXZCLENBQXBCLENBL0JSLEM7QUFKSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAoICQgKSAtPlxuICBncmFwaCA9IG51bGxcbiAgdGFsb3MgPSBudWxsXG5cbiAgW1xuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSBncmFwaFwiLCBoLnRhcmdldCBcImJhc2ljLXN5bmNcIiwgLT5cbiAgICAgIGdyYXBoID0gJC5saWIuR3JhcGguY3JlYXRlXG4gICAgICAgIFsgJC5zdGFydCBdOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgbW92ZTogXCJBXCJcbiAgICAgICAgICBdXG4gICAgICAgIEE6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogXCJnb1wiXG4gICAgICAgICAgICBydW46ICggdGFsb3MgKSAtPlxuICAgICAgICAgICAgICB0YWxvcy5jb250ZXh0Lm1lc3NhZ2UgPSBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiXG4gICAgICAgICAgICBtb3ZlOiBcIkJcIlxuICAgICAgICAgIF1cbiAgICAgICAgQjpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgICBhY2NlcHQ6IGZhbHNlXG4gICAgICAgICAgICAgIHJ1bjogKCB0YWxvcyApIC0+XG4gICAgICAgICAgICAgICAgdGFsb3MuY29udGV4dC5tZXNzYWdlID0gXCJ0aGlzIG92ZXJ3cml0ZSBzaG91bGRuJ3QgaGFwcGVuXCJcbiAgICAgICAgICAgICAgbW92ZTogJC5oYWx0XG4gICAgICAgICAgICAsXG4gICAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgICAgbW92ZTogJC5oYWx0XG4gICAgICAgICAgXVxuICAgIFxuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSB0YWxvc1wiLCBoLnRhcmdldCBcImJhc2ljLXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gJC5saWIuVGFsb3MuY3JlYXRlKClcblxuICAgIGF3YWl0IGgudGVzdCBcInJ1biB0YWxvc1wiLCBoLnRhcmdldCBcImJhc2ljLXN5bmNcIiwgLT5cbiAgICAgIGguYXNzZXJ0LmVxdWFsICQuc3RhcnQsIHRhbG9zLnN0YXRlXG4gICAgICBcbiAgICAgICQubGliLnN0ZXBTeW5jIGdyYXBoLCB0YWxvcywgbnVsbFxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJBXCIsIHRhbG9zLnN0YXRlXG5cbiAgICAgICQubGliLnN0ZXBTeW5jIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkJcIiwgdGFsb3Muc3RhdGVcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuXG4gICAgICAkLmxpYi5zdGVwU3luYyBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQgdGFsb3Muc3VjY2Vzc1xuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG5cbiAgICAgIGNvbnNvbGUubG9nIHRhbG9zXG4gIF1cblxuZXhwb3J0IHsgdGVzdCBhcyBzeW5jIH0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=test/basic/sync.coffee