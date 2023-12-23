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
const _async = require("../../src/strict/async");
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
        await _helpers.test("define graph", _helpers.target("strict-async", function() {
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
        await _helpers.test("define talos", _helpers.target("strict-async", function() {
            return talos = _src.Talos.make();
        })),
        await _helpers.test("run talos", _helpers.target("strict-async", async function() {
            _helpers.assert.equal(_src.$start, talos.state);
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L3N0cmljdC9hc3luYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLEtBQWhCO0VBQXVCLE1BQXZCO0VBQStCLEtBQS9CO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLEtBQVAsTUFBQTs7QUFFQSxJQUFBLEdBQU8sTUFBQSxRQUFBLENBQUEsQ0FBQTtBQUNQLE1BQUEsS0FBQSxFQUFBO0VBQUUsS0FBQSxHQUFRO0VBQ1IsS0FBQSxHQUFRO1NBRVI7SUFDRSxDQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxjQUFQO0lBQXVCLENBQUMsQ0FBQyxNQUFGLENBQVMsY0FBVDtJQUF5QixRQUFBLENBQUEsQ0FBQTthQUNwRCxLQUFBLEdBQVEsS0FBSyxDQUFDLElBQU4sQ0FDTjtRQUFBLENBQUUsTUFBRixDQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU87WUFDTDtjQUFBLE1BQUEsRUFBUSxJQUFSO2NBQ0EsR0FBQSxFQUFLLElBREw7Y0FFQSxJQUFBLEVBQU07WUFGTixDQURLOztRQUFQLENBREY7UUFNQSxDQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU87WUFDTDtjQUFBLE1BQUEsRUFBUSxJQUFSO2NBQ0EsR0FBQSxFQUFLLE1BQUEsUUFBQSxDQUFFLE9BQUYsQ0FBQTtnQkFDSCxNQUFNLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBWDt1QkFDTixPQUFPLENBQUMsT0FBUixHQUFrQjtjQUZmLENBREw7Y0FJQSxJQUFBLEVBQU07WUFKTixDQURLOztRQUFQLENBUEY7UUFjQSxDQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU87WUFDSDtjQUFBLE1BQUEsRUFBUSxLQUFSO2NBQ0EsR0FBQSxFQUFLLE1BQUEsUUFBQSxDQUFFLE9BQUYsQ0FBQTtnQkFDSCxNQUFNLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBWDt1QkFDTixPQUFPLENBQUMsT0FBUixHQUFrQjtjQUZmLENBREw7Y0FJQSxJQUFBLEVBQU07WUFKTixDQURHO1lBT0g7Y0FBQSxNQUFBLEVBQVEsSUFBUjtjQUNBLEdBQUEsRUFBSyxNQUFBLFFBQUEsQ0FBQSxDQUFBO3VCQUFHLENBQUEsTUFBTSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVgsQ0FBTjtjQUFILENBREw7Y0FFQSxJQUFBLEVBQU07WUFGTixDQVBHOztRQUFQO01BZkYsQ0FETTtJQUQ0QyxDQUF6QixDQUF2QixDQUFOLENBREY7SUE4QkUsQ0FBQSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUDtJQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGNBQVQ7SUFBeUIsUUFBQSxDQUFBLENBQUE7YUFDcEQsS0FBQSxHQUFRLEtBQUssQ0FBQyxJQUFOLENBQUE7SUFENEMsQ0FBekIsQ0FBdkIsQ0FBTixDQTlCRjtJQWlDRSxDQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQO0lBQW9CLENBQUMsQ0FBQyxNQUFGLENBQVMsY0FBVDtJQUF5QixNQUFBLFFBQUEsQ0FBQSxDQUFBO01BQ2pELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLE1BQWY7SUFBdUIsS0FBSyxDQUFDLEtBQTdCO01BRUEsTUFBTSxJQUFBLENBQUssS0FBTDtJQUFZLEtBQVo7SUFBbUIsSUFBbkI7TUFDTixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxHQUFmO0lBQW9CLEtBQUssQ0FBQyxLQUExQjtNQUVBLE1BQU0sSUFBQSxDQUFLLEtBQUw7SUFBWSxLQUFaO0lBQW1CLElBQW5CO01BQ04sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsR0FBZjtJQUFvQixLQUFLLENBQUMsS0FBMUI7TUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSwwQkFBZjtJQUEyQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXpEO01BRUEsTUFBTSxJQUFBLENBQUssS0FBTDtJQUFZLEtBQVo7SUFBbUIsSUFBbkI7TUFDTixDQUFDLENBQUMsTUFBRixDQUFTLEtBQUssQ0FBQyxPQUFmO2FBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsMEJBQWY7SUFBMkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUF6RDtJQVppRCxDQUF6QixDQUFwQixDQUFOLENBakNGOztBQUpLOztBQW9EUCxPQUFBO0VBQVMsSUFBQSxTQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVGltZSBmcm9tIFwiQGRhc2hraXRlL2pveS90aW1lXCJcbmltcG9ydCB7IEdyYXBoLCBUYWxvcywgJHN0YXJ0LCAkaGFsdCB9IGZyb20gXCIuLi8uLi9zcmNcIlxuaW1wb3J0IHsgc3RlcCB9IGZyb20gXCIuLi8uLi9zcmMvc3RyaWN0L2FzeW5jXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gLT5cbiAgZ3JhcGggPSBudWxsXG4gIHRhbG9zID0gbnVsbFxuXG4gIFtcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgZ3JhcGhcIiwgaC50YXJnZXQgXCJzdHJpY3QtYXN5bmNcIiwgLT5cbiAgICAgIGdyYXBoID0gR3JhcGgubWFrZVxuICAgICAgICBbICRzdGFydCBdOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgbW92ZTogXCJBXCJcbiAgICAgICAgICBdXG4gICAgICAgIEE6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogXCJnb1wiXG4gICAgICAgICAgICBydW46ICggY29udGV4dCApIC0+XG4gICAgICAgICAgICAgIGF3YWl0IFRpbWUuc2xlZXAgMVxuICAgICAgICAgICAgICBjb250ZXh0Lm1lc3NhZ2UgPSBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiXG4gICAgICAgICAgICBtb3ZlOiBcIkJcIlxuICAgICAgICAgIF1cbiAgICAgICAgQjpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgICBhY2NlcHQ6IGZhbHNlXG4gICAgICAgICAgICAgIHJ1bjogKCBjb250ZXh0ICkgLT5cbiAgICAgICAgICAgICAgICBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1lc3NhZ2UgPSBcInRoaXMgb3ZlcndyaXRlIHNob3VsZG4ndCBoYXBwZW5cIlxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgICAgLFxuICAgICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgICAgcnVuOiAtPiBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICBdXG4gICAgXG4gICAgYXdhaXQgaC50ZXN0IFwiZGVmaW5lIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RyaWN0LWFzeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IFRhbG9zLm1ha2UoKVxuXG4gICAgYXdhaXQgaC50ZXN0IFwicnVuIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RyaWN0LWFzeW5jXCIsIC0+XG4gICAgICBoLmFzc2VydC5lcXVhbCAkc3RhcnQsIHRhbG9zLnN0YXRlXG4gICAgICBcbiAgICAgIGF3YWl0IHN0ZXAgZ3JhcGgsIHRhbG9zLCBudWxsXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkFcIiwgdGFsb3Muc3RhdGVcblxuICAgICAgYXdhaXQgc3RlcCBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJCXCIsIHRhbG9zLnN0YXRlXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcblxuICAgICAgYXdhaXQgc3RlcCBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQgdGFsb3Muc3VjY2Vzc1xuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG4gIF1cblxuZXhwb3J0IHsgdGVzdCBhcyBhc3luYyB9Il19
 //# sourceURL=/@dashkite/talos/test/strict/async.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9zdHJpY3QvYXN5bmMuY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRpbWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdGltZVwiXG5pbXBvcnQgeyBHcmFwaCwgVGFsb3MsICRzdGFydCwgJGhhbHQgfSBmcm9tIFwiLi4vLi4vc3JjXCJcbmltcG9ydCB7IHN0ZXAgfSBmcm9tIFwiLi4vLi4vc3JjL3N0cmljdC9hc3luY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxudGVzdCA9IC0+XG4gIGdyYXBoID0gbnVsbFxuICB0YWxvcyA9IG51bGxcblxuICBbXG4gICAgYXdhaXQgaC50ZXN0IFwiZGVmaW5lIGdyYXBoXCIsIGgudGFyZ2V0IFwic3RyaWN0LWFzeW5jXCIsIC0+XG4gICAgICBncmFwaCA9IEdyYXBoLm1ha2VcbiAgICAgICAgWyAkc3RhcnQgXTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgIG1vdmU6IFwiQVwiXG4gICAgICAgICAgXVxuICAgICAgICBBOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IFwiZ29cIlxuICAgICAgICAgICAgcnVuOiAoIGNvbnRleHQgKSAtPlxuICAgICAgICAgICAgICBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICAgICAgICAgICAgY29udGV4dC5tZXNzYWdlID0gXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIlxuICAgICAgICAgICAgbW92ZTogXCJCXCJcbiAgICAgICAgICBdXG4gICAgICAgIEI6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgICAgYWNjZXB0OiBmYWxzZVxuICAgICAgICAgICAgICBydW46ICggY29udGV4dCApIC0+XG4gICAgICAgICAgICAgICAgYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgICAgICAgICAgICAgY29udGV4dC5tZXNzYWdlID0gXCJ0aGlzIG92ZXJ3cml0ZSBzaG91bGRuJ3QgaGFwcGVuXCJcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICAgIHJ1bjogLT4gYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgXVxuICAgIFxuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSB0YWxvc1wiLCBoLnRhcmdldCBcInN0cmljdC1hc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBUYWxvcy5tYWtlKClcblxuICAgIGF3YWl0IGgudGVzdCBcInJ1biB0YWxvc1wiLCBoLnRhcmdldCBcInN0cmljdC1hc3luY1wiLCAtPlxuICAgICAgaC5hc3NlcnQuZXF1YWwgJHN0YXJ0LCB0YWxvcy5zdGF0ZVxuICAgICAgXG4gICAgICBhd2FpdCBzdGVwIGdyYXBoLCB0YWxvcywgbnVsbFxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJBXCIsIHRhbG9zLnN0YXRlXG5cbiAgICAgIGF3YWl0IHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQlwiLCB0YWxvcy5zdGF0ZVxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG5cbiAgICAgIGF3YWl0IHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0IHRhbG9zLnN1Y2Nlc3NcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgYXN5bmMgfSIsbnVsbF0sIm5hbWVzIjpbImFzeW5jIiwidGVzdCIsImdyYXBoIiwidGFsb3MiLCJoIiwidGFyZ2V0IiwiR3JhcGgiLCJtYWtlIiwiJHN0YXJ0IiwiZWRnZXMiLCJhY2NlcHQiLCJydW4iLCJtb3ZlIiwiQSIsImNvbnRleHQiLCJUaW1lIiwic2xlZXAiLCJtZXNzYWdlIiwiQiIsIiRoYWx0IiwiVGFsb3MiLCJhc3NlcnQiLCJlcXVhbCIsInN0YXRlIiwic3RlcCIsInN1Y2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7K0JBeURTQTs7O2VBQUFDOzs7OERBekRUO3FCQUNBO3VCQUNBO2lFQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSEEsSUFBQUE7QUFLQUEsT0FBTztJQUNQLElBQUFDLE9BQUFDO0lBQUVELFFBQVE7SUFDUkMsUUFBUTtXQUVSO1FBQ0UsTUFBTUMsU0FBRUgsSUFBRixDQUFPLGdCQUFnQkcsU0FBRUMsTUFBRixDQUFTLGdCQUFnQjttQkFDcERILFFBQVFJLFVBQUssQ0FBQ0MsSUFBTixDQUNOO2dCQUFBLENBQUVDLFdBQUYsQ0FBQSxFQUNFO29CQUFBQyxPQUFPO3dCQUNMOzRCQUFBQyxRQUFROzRCQUNSQyxLQUFLOzRCQUNMQyxNQUFNO3dCQUZOOztnQkFERjtnQkFLRkMsR0FDRTtvQkFBQUosT0FBTzt3QkFDTDs0QkFBQUMsUUFBUTs0QkFDUkMsS0FBSyxlQUFFRyxPQUFGO2dDQUNILE1BQU1DLE1BQUtDLEtBQUwsQ0FBVzt1Q0FDakJGLFFBQVFHLE9BQVIsR0FBa0I7NEJBRmY7NEJBR0xMLE1BQU07d0JBSk47O2dCQURGO2dCQU9GTSxHQUNFO29CQUFBVCxPQUFPO3dCQUNIOzRCQUFBQyxRQUFROzRCQUNSQyxLQUFLLGVBQUVHLE9BQUY7Z0NBQ0gsTUFBTUMsTUFBS0MsS0FBTCxDQUFXO3VDQUNqQkYsUUFBUUcsT0FBUixHQUFrQjs0QkFGZjs0QkFHTEwsTUFBTU8sVUFBQTt3QkFKTjt3QkFNQTs0QkFBQVQsUUFBUTs0QkFDUkMsS0FBSzt1Q0FBRyxNQUFNSSxNQUFLQyxLQUFMLENBQVc7NEJBQXBCOzRCQUNMSixNQUFNTyxVQUFBO3dCQUZOOztnQkFQSjtZQWZGO1FBRmtEO1FBNkJ0RCxNQUFNZixTQUFFSCxJQUFGLENBQU8sZ0JBQWdCRyxTQUFFQyxNQUFGLENBQVMsZ0JBQWdCO21CQUNwREYsUUFBUWlCLFVBQUssQ0FBQ2IsSUFBTjtRQUQ0QztRQUd0RCxNQUFNSCxTQUFFSCxJQUFGLENBQU8sYUFBYUcsU0FBRUMsTUFBRixDQUFTLGdCQUFnQjtZQUNqREQsU0FBRWlCLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlZCxXQUFmLEVBQXVCTCxNQUFNb0IsS0FBN0I7WUFFQSxNQUFNQyxJQUFBQSxXQUFBLEVBQUt0QixPQUFPQyxPQUFPO1lBQ3pCQyxTQUFFaUIsTUFBTSxDQUFDQyxLQUFULENBQWUsS0FBS25CLE1BQU1vQixLQUExQjtZQUVBLE1BQU1DLElBQUFBLFdBQUEsRUFBS3RCLE9BQU9DLE9BQU87WUFDekJDLFNBQUVpQixNQUFNLENBQUNDLEtBQVQsQ0FBZSxLQUFLbkIsTUFBTW9CLEtBQTFCO1lBQ0FuQixTQUFFaUIsTUFBTSxDQUFDQyxLQUFULENBQWUsNEJBQTRCbkIsTUFBTVcsT0FBTyxDQUFDRyxPQUF6RDtZQUVBLE1BQU1PLElBQUFBLFdBQUEsRUFBS3RCLE9BQU9DLE9BQU87WUFDekJDLFNBQUVpQixNQUFGLENBQVNsQixNQUFNc0IsT0FBZjttQkFDQXJCLFNBQUVpQixNQUFNLENBQUNDLEtBQVQsQ0FBZSw0QkFBNEJuQixNQUFNVyxPQUFPLENBQUNHLE9BQXpEO1FBWmlEOztBQXJDaEQifQ==