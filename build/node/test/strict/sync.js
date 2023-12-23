"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sync", {
    enumerable: true,
    get: function() {
        return test;
    }
});
const _src = require("../../src");
const _sync = require("../../src/strict/sync");
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
test = function() {
    var graph, talos;
    graph = null;
    talos = null;
    return [
        _helpers.test("define graph", _helpers.target("strict-sync", function() {
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
                            run: function(context) {
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
                            run: function(context) {
                                return context.message = "this overwrite shouldn't happen";
                            },
                            move: _src.$halt
                        },
                        {
                            accept: true,
                            run: null,
                            move: _src.$halt
                        }
                    ]
                }
            });
        })),
        _helpers.test("define talos", _helpers.target("strict-sync", function() {
            return talos = _src.Talos.make();
        })),
        _helpers.test("run talos", _helpers.target("strict-sync", function() {
            _helpers.assert.equal(_src.$start, talos.state);
            (0, _sync.step)(graph, talos, null);
            _helpers.assert.equal("A", talos.state);
            (0, _sync.step)(graph, talos, "go");
            _helpers.assert.equal("B", talos.state);
            _helpers.assert.equal("made it to A, going to B", talos.context.message);
            (0, _sync.step)(graph, talos, "go");
            _helpers.assert(talos.success);
            return _helpers.assert.equal("made it to A, going to B", talos.context.message);
        }))
    ];
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L3N0cmljdC9zeW5jLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLEtBQWhCO0VBQXVCLE1BQXZCO0VBQStCLEtBQS9CO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLEtBQVAsTUFBQTs7QUFFQSxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7QUFDUCxNQUFBLEtBQUEsRUFBQTtFQUFFLEtBQUEsR0FBUTtFQUNSLEtBQUEsR0FBUTtTQUVSO0lBQ0UsQ0FBQyxDQUFDLElBQUYsQ0FBTyxjQUFQO0lBQXVCLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVDtJQUF3QixRQUFBLENBQUEsQ0FBQTthQUM3QyxLQUFBLEdBQVEsS0FBSyxDQUFDLElBQU4sQ0FDTjtRQUFBLENBQUUsTUFBRixDQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU87WUFDTDtjQUFBLE1BQUEsRUFBUSxJQUFSO2NBQ0EsR0FBQSxFQUFLLElBREw7Y0FFQSxJQUFBLEVBQU07WUFGTixDQURLOztRQUFQLENBREY7UUFNQSxDQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU87WUFDTDtjQUFBLE1BQUEsRUFBUSxJQUFSO2NBQ0EsR0FBQSxFQUFLLFFBQUEsQ0FBRSxPQUFGLENBQUE7dUJBQ0gsT0FBTyxDQUFDLE9BQVIsR0FBa0I7Y0FEZixDQURMO2NBR0EsSUFBQSxFQUFNO1lBSE4sQ0FESzs7UUFBUCxDQVBGO1FBYUEsQ0FBQSxFQUNFO1VBQUEsS0FBQSxFQUFPO1lBQ0g7Y0FBQSxNQUFBLEVBQVEsS0FBUjtjQUNBLEdBQUEsRUFBSyxRQUFBLENBQUUsT0FBRixDQUFBO3VCQUNILE9BQU8sQ0FBQyxPQUFSLEdBQWtCO2NBRGYsQ0FETDtjQUdBLElBQUEsRUFBTTtZQUhOLENBREc7WUFNSDtjQUFBLE1BQUEsRUFBUSxJQUFSO2NBQ0EsR0FBQSxFQUFLLElBREw7Y0FFQSxJQUFBLEVBQU07WUFGTixDQU5HOztRQUFQO01BZEYsQ0FETTtJQURxQyxDQUF4QixDQUF2QixDQURGO0lBNEJFLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUDtJQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQ7SUFBd0IsUUFBQSxDQUFBLENBQUE7YUFDN0MsS0FBQSxHQUFRLEtBQUssQ0FBQyxJQUFOLENBQUE7SUFEcUMsQ0FBeEIsQ0FBdkIsQ0E1QkY7SUErQkUsQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQO0lBQW9CLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVDtJQUF3QixRQUFBLENBQUEsQ0FBQTtNQUMxQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxNQUFmO0lBQXVCLEtBQUssQ0FBQyxLQUE3QjtNQUVBLElBQUEsQ0FBSyxLQUFMO0lBQVksS0FBWjtJQUFtQixJQUFuQjtNQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLEdBQWY7SUFBb0IsS0FBSyxDQUFDLEtBQTFCO01BRUEsSUFBQSxDQUFLLEtBQUw7SUFBWSxLQUFaO0lBQW1CLElBQW5CO01BQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsR0FBZjtJQUFvQixLQUFLLENBQUMsS0FBMUI7TUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSwwQkFBZjtJQUEyQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXpEO01BRUEsSUFBQSxDQUFLLEtBQUw7SUFBWSxLQUFaO0lBQW1CLElBQW5CO01BQ0EsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFLLENBQUMsT0FBZjthQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLDBCQUFmO0lBQTJDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBekQ7SUFaMEMsQ0FBeEIsQ0FBcEIsQ0EvQkY7O0FBSks7O0FBa0RQLE9BQUE7RUFBUyxJQUFBLFFBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaCwgVGFsb3MsICRzdGFydCwgJGhhbHQgfSBmcm9tIFwiLi4vLi4vc3JjXCJcbmltcG9ydCB7IHN0ZXAgfSBmcm9tIFwiLi4vLi4vc3JjL3N0cmljdC9zeW5jXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gLT5cbiAgZ3JhcGggPSBudWxsXG4gIHRhbG9zID0gbnVsbFxuXG4gIFtcbiAgICBoLnRlc3QgXCJkZWZpbmUgZ3JhcGhcIiwgaC50YXJnZXQgXCJzdHJpY3Qtc3luY1wiLCAtPlxuICAgICAgZ3JhcGggPSBHcmFwaC5tYWtlXG4gICAgICAgIFsgJHN0YXJ0IF06XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgcnVuOiBudWxsXG4gICAgICAgICAgICBtb3ZlOiBcIkFcIlxuICAgICAgICAgIF1cbiAgICAgICAgQTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiBcImdvXCJcbiAgICAgICAgICAgIHJ1bjogKCBjb250ZXh0ICkgLT5cbiAgICAgICAgICAgICAgY29udGV4dC5tZXNzYWdlID0gXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIlxuICAgICAgICAgICAgbW92ZTogXCJCXCJcbiAgICAgICAgICBdXG4gICAgICAgIEI6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgICAgYWNjZXB0OiBmYWxzZVxuICAgICAgICAgICAgICBydW46ICggY29udGV4dCApIC0+XG4gICAgICAgICAgICAgICAgY29udGV4dC5tZXNzYWdlID0gXCJ0aGlzIG92ZXJ3cml0ZSBzaG91bGRuJ3QgaGFwcGVuXCJcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgIF1cbiAgICBcbiAgICBoLnRlc3QgXCJkZWZpbmUgdGFsb3NcIiwgaC50YXJnZXQgXCJzdHJpY3Qtc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBUYWxvcy5tYWtlKClcblxuICAgIGgudGVzdCBcInJ1biB0YWxvc1wiLCBoLnRhcmdldCBcInN0cmljdC1zeW5jXCIsIC0+XG4gICAgICBoLmFzc2VydC5lcXVhbCAkc3RhcnQsIHRhbG9zLnN0YXRlXG4gICAgICBcbiAgICAgIHN0ZXAgZ3JhcGgsIHRhbG9zLCBudWxsXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkFcIiwgdGFsb3Muc3RhdGVcblxuICAgICAgc3RlcCBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJCXCIsIHRhbG9zLnN0YXRlXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcblxuICAgICAgc3RlcCBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQgdGFsb3Muc3VjY2Vzc1xuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG4gIF1cblxuZXhwb3J0IHsgdGVzdCBhcyBzeW5jIH0iXX0=
 //# sourceURL=/@dashkite/talos/test/strict/sync.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9zdHJpY3Qvc3luYy5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGgsIFRhbG9zLCAkc3RhcnQsICRoYWx0IH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgeyBzdGVwIH0gZnJvbSBcIi4uLy4uL3NyYy9zdHJpY3Qvc3luY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxudGVzdCA9IC0+XG4gIGdyYXBoID0gbnVsbFxuICB0YWxvcyA9IG51bGxcblxuICBbXG4gICAgaC50ZXN0IFwiZGVmaW5lIGdyYXBoXCIsIGgudGFyZ2V0IFwic3RyaWN0LXN5bmNcIiwgLT5cbiAgICAgIGdyYXBoID0gR3JhcGgubWFrZVxuICAgICAgICBbICRzdGFydCBdOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgbW92ZTogXCJBXCJcbiAgICAgICAgICBdXG4gICAgICAgIEE6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogXCJnb1wiXG4gICAgICAgICAgICBydW46ICggY29udGV4dCApIC0+XG4gICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCJcbiAgICAgICAgICAgIG1vdmU6IFwiQlwiXG4gICAgICAgICAgXVxuICAgICAgICBCOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICAgIGFjY2VwdDogZmFsc2VcbiAgICAgICAgICAgICAgcnVuOiAoIGNvbnRleHQgKSAtPlxuICAgICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwidGhpcyBvdmVyd3JpdGUgc2hvdWxkbid0IGhhcHBlblwiXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgICAsXG4gICAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICBdXG4gICAgXG4gICAgaC50ZXN0IFwiZGVmaW5lIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RyaWN0LXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gVGFsb3MubWFrZSgpXG5cbiAgICBoLnRlc3QgXCJydW4gdGFsb3NcIiwgaC50YXJnZXQgXCJzdHJpY3Qtc3luY1wiLCAtPlxuICAgICAgaC5hc3NlcnQuZXF1YWwgJHN0YXJ0LCB0YWxvcy5zdGF0ZVxuICAgICAgXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgbnVsbFxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJBXCIsIHRhbG9zLnN0YXRlXG5cbiAgICAgIHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQlwiLCB0YWxvcy5zdGF0ZVxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG5cbiAgICAgIHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0IHRhbG9zLnN1Y2Nlc3NcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgc3luYyB9IixudWxsXSwibmFtZXMiOlsic3luYyIsInRlc3QiLCJncmFwaCIsInRhbG9zIiwiaCIsInRhcmdldCIsIkdyYXBoIiwibWFrZSIsIiRzdGFydCIsImVkZ2VzIiwiYWNjZXB0IiwicnVuIiwibW92ZSIsIkEiLCJjb250ZXh0IiwibWVzc2FnZSIsIkIiLCIkaGFsdCIsIlRhbG9zIiwiYXNzZXJ0IiwiZXF1YWwiLCJzdGF0ZSIsInN0ZXAiLCJzdWNjZXNzIl0sIm1hcHBpbmdzIjoiOzs7OytCQXNEU0E7OztlQUFBQzs7O3FCQXREVDtzQkFDQTtpRUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUZBLElBQUFBO0FBSUFBLE9BQU87SUFDUCxJQUFBQyxPQUFBQztJQUFFRCxRQUFRO0lBQ1JDLFFBQVE7V0FFUjtRQUNFQyxTQUFFSCxJQUFGLENBQU8sZ0JBQWdCRyxTQUFFQyxNQUFGLENBQVMsZUFBZTttQkFDN0NILFFBQVFJLFVBQUssQ0FBQ0MsSUFBTixDQUNOO2dCQUFBLENBQUVDLFdBQUYsQ0FBQSxFQUNFO29CQUFBQyxPQUFPO3dCQUNMOzRCQUFBQyxRQUFROzRCQUNSQyxLQUFLOzRCQUNMQyxNQUFNO3dCQUZOOztnQkFERjtnQkFLRkMsR0FDRTtvQkFBQUosT0FBTzt3QkFDTDs0QkFBQUMsUUFBUTs0QkFDUkMsS0FBSyxTQUFFRyxPQUFGO3VDQUNIQSxRQUFRQyxPQUFSLEdBQWtCOzRCQURmOzRCQUVMSCxNQUFNO3dCQUhOOztnQkFERjtnQkFNRkksR0FDRTtvQkFBQVAsT0FBTzt3QkFDSDs0QkFBQUMsUUFBUTs0QkFDUkMsS0FBSyxTQUFFRyxPQUFGO3VDQUNIQSxRQUFRQyxPQUFSLEdBQWtCOzRCQURmOzRCQUVMSCxNQUFNSyxVQUFBO3dCQUhOO3dCQUtBOzRCQUFBUCxRQUFROzRCQUNSQyxLQUFLOzRCQUNMQyxNQUFNSyxVQUFBO3dCQUZOOztnQkFOSjtZQWRGO1FBRjJDO1FBMkIvQ2IsU0FBRUgsSUFBRixDQUFPLGdCQUFnQkcsU0FBRUMsTUFBRixDQUFTLGVBQWU7bUJBQzdDRixRQUFRZSxVQUFLLENBQUNYLElBQU47UUFEcUM7UUFHL0NILFNBQUVILElBQUYsQ0FBTyxhQUFhRyxTQUFFQyxNQUFGLENBQVMsZUFBZTtZQUMxQ0QsU0FBRWUsTUFBTSxDQUFDQyxLQUFULENBQWVaLFdBQWYsRUFBdUJMLE1BQU1rQixLQUE3QjtZQUVBQyxJQUFBQSxVQUFBLEVBQUtwQixPQUFPQyxPQUFPO1lBQ25CQyxTQUFFZSxNQUFNLENBQUNDLEtBQVQsQ0FBZSxLQUFLakIsTUFBTWtCLEtBQTFCO1lBRUFDLElBQUFBLFVBQUEsRUFBS3BCLE9BQU9DLE9BQU87WUFDbkJDLFNBQUVlLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlLEtBQUtqQixNQUFNa0IsS0FBMUI7WUFDQWpCLFNBQUVlLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlLDRCQUE0QmpCLE1BQU1XLE9BQU8sQ0FBQ0MsT0FBekQ7WUFFQU8sSUFBQUEsVUFBQSxFQUFLcEIsT0FBT0MsT0FBTztZQUNuQkMsU0FBRWUsTUFBRixDQUFTaEIsTUFBTW9CLE9BQWY7bUJBQ0FuQixTQUFFZSxNQUFNLENBQUNDLEtBQVQsQ0FBZSw0QkFBNEJqQixNQUFNVyxPQUFPLENBQUNDLE9BQXpEO1FBWjBDOztBQW5DekMifQ==