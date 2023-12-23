"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "async", {
    enumerable: true,
    get: function() {
        return test;
    }
});
const _time = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/time"));
const _src = require("../../src");
const _async = require("../../src/stable/async");
const _helpers = /*#__PURE__*/ _interop_require_wildcard(require("../helpers"));
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
var test;
test = async function() {
    var graph, talos;
    graph = null;
    talos = null;
    return [
        await _helpers.test("define graph", _helpers.target("stable-async", function() {
            return graph = _src.Graph.make({
                [_src.$start]: {
                    edges: [
                        {
                            accept: true,
                            run: null,
                            move: "A"
                        }
                    ]
                },
                A: {
                    edges: [
                        {
                            accept: "go",
                            run: async function(context) {
                                await _time.sleep(1);
                                return context.message = "made it to A, going to B";
                            },
                            move: "B"
                        }
                    ]
                },
                B: {
                    edges: [
                        {
                            accept: false,
                            run: async function(context) {
                                await _time.sleep(1);
                                return context.message = "this overwrite shouldn't happen";
                            },
                            move: _src.$halt
                        },
                        {
                            accept: true,
                            run: async function() {
                                return await _time.sleep(1);
                            },
                            move: _src.$halt
                        }
                    ]
                }
            });
        })),
        await _helpers.test("define talos", _helpers.target("stable-async", function() {
            return talos = _src.Talos.make();
        })),
        await _helpers.test("run talos", _helpers.target("stable-async", async function() {
            _helpers.assert.equal(_src.$start, talos.state);
            await (0, _async.step)(graph, talos, null);
            _helpers.assert.equal("A", talos.state);
            // Ignores transitions that don't match
            await (0, _async.step)(graph, talos, null);
            _helpers.assert.equal("A", talos.state);
            await (0, _async.step)(graph, talos, "go");
            _helpers.assert.equal("B", talos.state);
            _helpers.assert.equal("made it to A, going to B", talos.context.message);
            await (0, _async.step)(graph, talos, "go");
            _helpers.assert(talos.success);
            return _helpers.assert.equal("made it to A, going to B", talos.context.message);
        }))
    ];
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L3N0YWJsZS9hc3luYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLEtBQWhCO0VBQXVCLE1BQXZCO0VBQStCLEtBQS9CO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLEtBQVAsTUFBQTs7QUFFQSxJQUFBLEdBQU8sTUFBQSxRQUFBLENBQUEsQ0FBQTtBQUNQLE1BQUEsS0FBQSxFQUFBO0VBQUUsS0FBQSxHQUFRO0VBQ1IsS0FBQSxHQUFRO1NBRVI7SUFDRSxDQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxjQUFQO0lBQXVCLENBQUMsQ0FBQyxNQUFGLENBQVMsY0FBVDtJQUF5QixRQUFBLENBQUEsQ0FBQTthQUNwRCxLQUFBLEdBQVEsS0FBSyxDQUFDLElBQU4sQ0FDTjtRQUFBLENBQUUsTUFBRixDQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU87WUFDTDtjQUFBLE1BQUEsRUFBUSxJQUFSO2NBQ0EsR0FBQSxFQUFLLElBREw7Y0FFQSxJQUFBLEVBQU07WUFGTixDQURLOztRQUFQLENBREY7UUFNQSxDQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU87WUFDTDtjQUFBLE1BQUEsRUFBUSxJQUFSO2NBQ0EsR0FBQSxFQUFLLE1BQUEsUUFBQSxDQUFFLE9BQUYsQ0FBQTtnQkFDSCxNQUFNLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBWDt1QkFDTixPQUFPLENBQUMsT0FBUixHQUFrQjtjQUZmLENBREw7Y0FJQSxJQUFBLEVBQU07WUFKTixDQURLOztRQUFQLENBUEY7UUFjQSxDQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU87WUFDSDtjQUFBLE1BQUEsRUFBUSxLQUFSO2NBQ0EsR0FBQSxFQUFLLE1BQUEsUUFBQSxDQUFFLE9BQUYsQ0FBQTtnQkFDSCxNQUFNLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBWDt1QkFDTixPQUFPLENBQUMsT0FBUixHQUFrQjtjQUZmLENBREw7Y0FJQSxJQUFBLEVBQU07WUFKTixDQURHO1lBT0g7Y0FBQSxNQUFBLEVBQVEsSUFBUjtjQUNBLEdBQUEsRUFBSyxNQUFBLFFBQUEsQ0FBQSxDQUFBO3VCQUFHLENBQUEsTUFBTSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVgsQ0FBTjtjQUFILENBREw7Y0FFQSxJQUFBLEVBQU07WUFGTixDQVBHOztRQUFQO01BZkYsQ0FETTtJQUQ0QyxDQUF6QixDQUF2QixDQUFOLENBREY7SUE4QkUsQ0FBQSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUDtJQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGNBQVQ7SUFBeUIsUUFBQSxDQUFBLENBQUE7YUFDcEQsS0FBQSxHQUFRLEtBQUssQ0FBQyxJQUFOLENBQUE7SUFENEMsQ0FBekIsQ0FBdkIsQ0FBTixDQTlCRjtJQWlDRSxDQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQO0lBQW9CLENBQUMsQ0FBQyxNQUFGLENBQVMsY0FBVDtJQUF5QixNQUFBLFFBQUEsQ0FBQSxDQUFBO01BQ2pELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLE1BQWY7SUFBdUIsS0FBSyxDQUFDLEtBQTdCO01BRUEsTUFBTSxJQUFBLENBQUssS0FBTDtJQUFZLEtBQVo7SUFBbUIsSUFBbkI7TUFDTixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxHQUFmO0lBQW9CLEtBQUssQ0FBQyxLQUExQixFQUhOOztNQU1NLE1BQU0sSUFBQSxDQUFLLEtBQUw7SUFBWSxLQUFaO0lBQW1CLElBQW5CO01BQ04sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsR0FBZjtJQUFvQixLQUFLLENBQUMsS0FBMUI7TUFFQSxNQUFNLElBQUEsQ0FBSyxLQUFMO0lBQVksS0FBWjtJQUFtQixJQUFuQjtNQUNOLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLEdBQWY7SUFBb0IsS0FBSyxDQUFDLEtBQTFCO01BQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsMEJBQWY7SUFBMkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUF6RDtNQUVBLE1BQU0sSUFBQSxDQUFLLEtBQUw7SUFBWSxLQUFaO0lBQW1CLElBQW5CO01BQ04sQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFLLENBQUMsT0FBZjthQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLDBCQUFmO0lBQTJDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBekQ7SUFoQmlELENBQXpCLENBQXBCLENBQU4sQ0FqQ0Y7O0FBSks7O0FBd0RQLE9BQUE7RUFBUyxJQUFBLFNBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUaW1lIGZyb20gXCJAZGFzaGtpdGUvam95L3RpbWVcIlxuaW1wb3J0IHsgR3JhcGgsIFRhbG9zLCAkc3RhcnQsICRoYWx0IH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgeyBzdGVwIH0gZnJvbSBcIi4uLy4uL3NyYy9zdGFibGUvYXN5bmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAtPlxuICBncmFwaCA9IG51bGxcbiAgdGFsb3MgPSBudWxsXG5cbiAgW1xuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSBncmFwaFwiLCBoLnRhcmdldCBcInN0YWJsZS1hc3luY1wiLCAtPlxuICAgICAgZ3JhcGggPSBHcmFwaC5tYWtlXG4gICAgICAgIFsgJHN0YXJ0IF06XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgcnVuOiBudWxsXG4gICAgICAgICAgICBtb3ZlOiBcIkFcIlxuICAgICAgICAgIF1cbiAgICAgICAgQTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiBcImdvXCJcbiAgICAgICAgICAgIHJ1bjogKCBjb250ZXh0ICkgLT5cbiAgICAgICAgICAgICAgYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCJcbiAgICAgICAgICAgIG1vdmU6IFwiQlwiXG4gICAgICAgICAgXVxuICAgICAgICBCOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICAgIGFjY2VwdDogZmFsc2VcbiAgICAgICAgICAgICAgcnVuOiAoIGNvbnRleHQgKSAtPlxuICAgICAgICAgICAgICAgIGF3YWl0IFRpbWUuc2xlZXAgMVxuICAgICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwidGhpcyBvdmVyd3JpdGUgc2hvdWxkbid0IGhhcHBlblwiXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgICAsXG4gICAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgICBydW46IC0+IGF3YWl0IFRpbWUuc2xlZXAgMVxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgIF1cbiAgICBcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgdGFsb3NcIiwgaC50YXJnZXQgXCJzdGFibGUtYXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gVGFsb3MubWFrZSgpXG5cbiAgICBhd2FpdCBoLnRlc3QgXCJydW4gdGFsb3NcIiwgaC50YXJnZXQgXCJzdGFibGUtYXN5bmNcIiwgLT5cbiAgICAgIGguYXNzZXJ0LmVxdWFsICRzdGFydCwgdGFsb3Muc3RhdGVcbiAgICAgIFxuICAgICAgYXdhaXQgc3RlcCBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICAjIElnbm9yZXMgdHJhbnNpdGlvbnMgdGhhdCBkb24ndCBtYXRjaFxuICAgICAgYXdhaXQgc3RlcCBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICBhd2FpdCBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkJcIiwgdGFsb3Muc3RhdGVcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuXG4gICAgICBhd2FpdCBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydCB0YWxvcy5zdWNjZXNzXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIGFzeW5jIH0iXX0=
 //# sourceURL=/@dashkite/talos/test/stable/async.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9zdGFibGUvYXN5bmMuY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRpbWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdGltZVwiXG5pbXBvcnQgeyBHcmFwaCwgVGFsb3MsICRzdGFydCwgJGhhbHQgfSBmcm9tIFwiLi4vLi4vc3JjXCJcbmltcG9ydCB7IHN0ZXAgfSBmcm9tIFwiLi4vLi4vc3JjL3N0YWJsZS9hc3luY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxudGVzdCA9IC0+XG4gIGdyYXBoID0gbnVsbFxuICB0YWxvcyA9IG51bGxcblxuICBbXG4gICAgYXdhaXQgaC50ZXN0IFwiZGVmaW5lIGdyYXBoXCIsIGgudGFyZ2V0IFwic3RhYmxlLWFzeW5jXCIsIC0+XG4gICAgICBncmFwaCA9IEdyYXBoLm1ha2VcbiAgICAgICAgWyAkc3RhcnQgXTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgIG1vdmU6IFwiQVwiXG4gICAgICAgICAgXVxuICAgICAgICBBOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IFwiZ29cIlxuICAgICAgICAgICAgcnVuOiAoIGNvbnRleHQgKSAtPlxuICAgICAgICAgICAgICBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICAgICAgICAgICAgY29udGV4dC5tZXNzYWdlID0gXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIlxuICAgICAgICAgICAgbW92ZTogXCJCXCJcbiAgICAgICAgICBdXG4gICAgICAgIEI6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgICAgYWNjZXB0OiBmYWxzZVxuICAgICAgICAgICAgICBydW46ICggY29udGV4dCApIC0+XG4gICAgICAgICAgICAgICAgYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgICAgICAgICAgICAgY29udGV4dC5tZXNzYWdlID0gXCJ0aGlzIG92ZXJ3cml0ZSBzaG91bGRuJ3QgaGFwcGVuXCJcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICAgIHJ1bjogLT4gYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgXVxuICAgIFxuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSB0YWxvc1wiLCBoLnRhcmdldCBcInN0YWJsZS1hc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBUYWxvcy5tYWtlKClcblxuICAgIGF3YWl0IGgudGVzdCBcInJ1biB0YWxvc1wiLCBoLnRhcmdldCBcInN0YWJsZS1hc3luY1wiLCAtPlxuICAgICAgaC5hc3NlcnQuZXF1YWwgJHN0YXJ0LCB0YWxvcy5zdGF0ZVxuICAgICAgXG4gICAgICBhd2FpdCBzdGVwIGdyYXBoLCB0YWxvcywgbnVsbFxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJBXCIsIHRhbG9zLnN0YXRlXG5cbiAgICAgICMgSWdub3JlcyB0cmFuc2l0aW9ucyB0aGF0IGRvbid0IG1hdGNoXG4gICAgICBhd2FpdCBzdGVwIGdyYXBoLCB0YWxvcywgbnVsbFxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJBXCIsIHRhbG9zLnN0YXRlXG5cbiAgICAgIGF3YWl0IHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQlwiLCB0YWxvcy5zdGF0ZVxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG5cbiAgICAgIGF3YWl0IHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0IHRhbG9zLnN1Y2Nlc3NcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgYXN5bmMgfSIsbnVsbF0sIm5hbWVzIjpbImFzeW5jIiwidGVzdCIsImdyYXBoIiwidGFsb3MiLCJoIiwidGFyZ2V0IiwiR3JhcGgiLCJtYWtlIiwiJHN0YXJ0IiwiZWRnZXMiLCJhY2NlcHQiLCJydW4iLCJtb3ZlIiwiQSIsImNvbnRleHQiLCJUaW1lIiwic2xlZXAiLCJtZXNzYWdlIiwiQiIsIiRoYWx0IiwiVGFsb3MiLCJhc3NlcnQiLCJlcXVhbCIsInN0YXRlIiwic3RlcCIsInN1Y2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7K0JBNkRTQTs7O2VBQUFDOzs7OERBN0RUO3FCQUNBO3VCQUNBO2lFQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSEEsSUFBQUE7QUFLQUEsT0FBTztJQUNQLElBQUFDLE9BQUFDO0lBQUVELFFBQVE7SUFDUkMsUUFBUTtXQUVSO1FBQ0UsTUFBTUMsU0FBRUgsSUFBRixDQUFPLGdCQUFnQkcsU0FBRUMsTUFBRixDQUFTLGdCQUFnQjttQkFDcERILFFBQVFJLFVBQUssQ0FBQ0MsSUFBTixDQUNOO2dCQUFBLENBQUVDLFdBQUYsQ0FBQSxFQUNFO29CQUFBQyxPQUFPO3dCQUNMOzRCQUFBQyxRQUFROzRCQUNSQyxLQUFLOzRCQUNMQyxNQUFNO3dCQUZOOztnQkFERjtnQkFLRkMsR0FDRTtvQkFBQUosT0FBTzt3QkFDTDs0QkFBQUMsUUFBUTs0QkFDUkMsS0FBSyxlQUFFRyxPQUFGO2dDQUNILE1BQU1DLE1BQUtDLEtBQUwsQ0FBVzt1Q0FDakJGLFFBQVFHLE9BQVIsR0FBa0I7NEJBRmY7NEJBR0xMLE1BQU07d0JBSk47O2dCQURGO2dCQU9GTSxHQUNFO29CQUFBVCxPQUFPO3dCQUNIOzRCQUFBQyxRQUFROzRCQUNSQyxLQUFLLGVBQUVHLE9BQUY7Z0NBQ0gsTUFBTUMsTUFBS0MsS0FBTCxDQUFXO3VDQUNqQkYsUUFBUUcsT0FBUixHQUFrQjs0QkFGZjs0QkFHTEwsTUFBTU8sVUFBQTt3QkFKTjt3QkFNQTs0QkFBQVQsUUFBUTs0QkFDUkMsS0FBSzt1Q0FBRyxNQUFNSSxNQUFLQyxLQUFMLENBQVc7NEJBQXBCOzRCQUNMSixNQUFNTyxVQUFBO3dCQUZOOztnQkFQSjtZQWZGO1FBRmtEO1FBNkJ0RCxNQUFNZixTQUFFSCxJQUFGLENBQU8sZ0JBQWdCRyxTQUFFQyxNQUFGLENBQVMsZ0JBQWdCO21CQUNwREYsUUFBUWlCLFVBQUssQ0FBQ2IsSUFBTjtRQUQ0QztRQUd0RCxNQUFNSCxTQUFFSCxJQUFGLENBQU8sYUFBYUcsU0FBRUMsTUFBRixDQUFTLGdCQUFnQjtZQUNqREQsU0FBRWlCLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlZCxXQUFmLEVBQXVCTCxNQUFNb0IsS0FBN0I7WUFFQSxNQUFNQyxJQUFBQSxXQUFBLEVBQUt0QixPQUFPQyxPQUFPO1lBQ3pCQyxTQUFFaUIsTUFBTSxDQUFDQyxLQUFULENBQWUsS0FBS25CLE1BQU1vQixLQUExQjs7WUFHQSxNQUFNQyxJQUFBQSxXQUFBLEVBQUt0QixPQUFPQyxPQUFPO1lBQ3pCQyxTQUFFaUIsTUFBTSxDQUFDQyxLQUFULENBQWUsS0FBS25CLE1BQU1vQixLQUExQjtZQUVBLE1BQU1DLElBQUFBLFdBQUEsRUFBS3RCLE9BQU9DLE9BQU87WUFDekJDLFNBQUVpQixNQUFNLENBQUNDLEtBQVQsQ0FBZSxLQUFLbkIsTUFBTW9CLEtBQTFCO1lBQ0FuQixTQUFFaUIsTUFBTSxDQUFDQyxLQUFULENBQWUsNEJBQTRCbkIsTUFBTVcsT0FBTyxDQUFDRyxPQUF6RDtZQUVBLE1BQU1PLElBQUFBLFdBQUEsRUFBS3RCLE9BQU9DLE9BQU87WUFDekJDLFNBQUVpQixNQUFGLENBQVNsQixNQUFNc0IsT0FBZjttQkFDQXJCLFNBQUVpQixNQUFNLENBQUNDLEtBQVQsQ0FBZSw0QkFBNEJuQixNQUFNVyxPQUFPLENBQUNHLE9BQXpEO1FBaEJpRDs7QUFyQ2hEIn0=