"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "expansion", {
    enumerable: true,
    get: function() {
        return test;
    }
});
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _value = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/value"));
const _src = require("../../src");
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
    return _helpers.target("linear-expansion", function() {
        var double, expected, graph, sum, triple;
        sum = function(x, y, z) {
            return x + y + z;
        };
        double = function(x) {
            return 2 * x;
        };
        triple = function(x) {
            return 3 * x;
        };
        graph = (0, _src.expand)([
            sum,
            double,
            triple,
            function(x) {
                return 4 * x;
            }
        ]);
        expected = {
            [_src.$start]: {
                name: "sum",
                edges: [
                    {
                        accept: true,
                        run: sum,
                        move: "1"
                    }
                ]
            },
            "1": {
                name: "double",
                edges: [
                    {
                        accept: true,
                        run: double,
                        move: "2"
                    }
                ]
            },
            "2": {
                name: "triple",
                edges: [
                    {
                        accept: true,
                        run: triple,
                        move: "3"
                    }
                ]
            },
            "3": {
                name: "anonymous-3",
                edges: [
                    {
                        accept: true,
                        run: graph["3"].edges[0].run,
                        move: _src.$halt
                    }
                ]
            }
        };
        if (!_value.equal(expected, graph)) {
            console.error(graph);
            throw new Error("expanded graph does not match expected shape");
        }
        graph = _src.Graph.make(graph);
        return _helpers.assert(_src.Graph.isType(graph), "failed to make graph instance");
    });
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2xpbmVhci9leHBhbnNpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsU0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLE1BQWhCO0VBQXdCLE1BQXhCO0VBQWdDLEtBQWhDO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLElBQUEsR0FBTyxRQUFBLENBQUEsQ0FBQTtTQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsa0JBQVQsRUFBNkIsUUFBQSxDQUFBLENBQUE7QUFDdkMsUUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUE7SUFBRSxHQUFBLEdBQU0sUUFBQSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixDQUFBO2FBQWUsQ0FBQSxHQUFJLENBQUosR0FBUTtJQUF2QjtJQUNOLE1BQUEsR0FBUyxRQUFBLENBQUUsQ0FBRixDQUFBO2FBQVMsQ0FBQSxHQUFJO0lBQWI7SUFDVCxNQUFBLEdBQVMsUUFBQSxDQUFFLENBQUYsQ0FBQTthQUFTLENBQUEsR0FBSTtJQUFiO0lBRVQsS0FBQSxHQUFRLE1BQUEsQ0FBTztNQUNiLEdBRGE7TUFFYixNQUZhO01BR2IsTUFIYTtNQUliLFFBQUEsQ0FBRSxDQUFGLENBQUE7ZUFBUyxDQUFBLEdBQUk7TUFBYixDQUphO0tBQVA7SUFPUixRQUFBLEdBQ0U7TUFBQSxDQUFFLE1BQUYsQ0FBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLEtBQU47UUFDQSxLQUFBLEVBQU87VUFDTDtZQUFBLE1BQUEsRUFBUSxJQUFSO1lBQ0EsR0FBQSxFQUFLLEdBREw7WUFFQSxJQUFBLEVBQU07VUFGTixDQURLOztNQURQLENBREY7TUFPQSxHQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sUUFBTjtRQUNBLEtBQUEsRUFBTztVQUNMO1lBQUEsTUFBQSxFQUFRLElBQVI7WUFDQSxHQUFBLEVBQUssTUFETDtZQUVBLElBQUEsRUFBTTtVQUZOLENBREs7O01BRFAsQ0FSRjtNQWNBLEdBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxRQUFOO1FBQ0EsS0FBQSxFQUFPO1VBQ0w7WUFBQSxNQUFBLEVBQVEsSUFBUjtZQUNBLEdBQUEsRUFBSyxNQURMO1lBRUEsSUFBQSxFQUFNO1VBRk4sQ0FESzs7TUFEUCxDQWZGO01BcUJBLEdBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxhQUFOO1FBQ0EsS0FBQSxFQUFPO1VBQ0w7WUFBQSxNQUFBLEVBQVEsSUFBUjtZQUNBLEdBQUEsRUFBSyxLQUFLLENBQUMsR0FBRCxDQUFLLENBQUMsS0FBSyxDQUFDLENBQUQsQ0FBRyxDQUFDLEdBRHpCO1lBRUEsSUFBQSxFQUFNO1VBRk4sQ0FESzs7TUFEUDtJQXRCRjtJQTZCRixJQUFHLENBQUUsS0FBSyxDQUFDLEtBQU4sQ0FBWSxRQUFaLEVBQXNCLEtBQXRCLENBQUw7TUFDRSxPQUFPLENBQUMsS0FBUixDQUFjLEtBQWQ7TUFDQSxNQUFNLElBQUksS0FBSixDQUFVLDhDQUFWLEVBRlI7O0lBSUEsS0FBQSxHQUFRLEtBQUssQ0FBQyxJQUFOLENBQVcsS0FBWDtXQUNSLENBQUMsQ0FBQyxNQUFGLENBQVcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxLQUFiLENBQVgsRUFBaUMsK0JBQWpDO0VBL0NxQyxDQUE3QjtBQUFIOztBQWtEUCxPQUFBO0VBQVMsSUFBQSxhQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCAqIGFzIFZhbHVlIGZyb20gXCJAZGFzaGtpdGUvam95L3ZhbHVlXCJcbmltcG9ydCB7IEdyYXBoLCBleHBhbmQsICRzdGFydCwgJGhhbHQgfSBmcm9tIFwiLi4vLi4vc3JjXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gLT4gaC50YXJnZXQgXCJsaW5lYXItZXhwYW5zaW9uXCIsIC0+XG4gIHN1bSA9ICggeCwgeSwgeiApIC0+IHggKyB5ICsgeiBcbiAgZG91YmxlID0gKCB4ICkgLT4gMiAqIHhcbiAgdHJpcGxlID0gKCB4ICkgLT4gMyAqIHhcblxuICBncmFwaCA9IGV4cGFuZCBbXG4gICAgc3VtXG4gICAgZG91YmxlXG4gICAgdHJpcGxlXG4gICAgKCB4ICkgLT4gNCAqIHhcbiAgXVxuXG4gIGV4cGVjdGVkID0gXG4gICAgWyAkc3RhcnQgXTpcbiAgICAgIG5hbWU6IFwic3VtXCJcbiAgICAgIGVkZ2VzOiBbXG4gICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICBydW46IHN1bVxuICAgICAgICBtb3ZlOiBcIjFcIlxuICAgICAgXVxuICAgIFwiMVwiOlxuICAgICAgbmFtZTogXCJkb3VibGVcIlxuICAgICAgZWRnZXM6IFtcbiAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgIHJ1bjogZG91YmxlXG4gICAgICAgIG1vdmU6IFwiMlwiXG4gICAgICBdXG4gICAgXCIyXCI6XG4gICAgICBuYW1lOiBcInRyaXBsZVwiXG4gICAgICBlZGdlczogW1xuICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgcnVuOiB0cmlwbGVcbiAgICAgICAgbW92ZTogXCIzXCJcbiAgICAgIF1cbiAgICBcIjNcIjpcbiAgICAgIG5hbWU6IFwiYW5vbnltb3VzLTNcIlxuICAgICAgZWRnZXM6IFtcbiAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgIHJ1bjogZ3JhcGhbXCIzXCJdLmVkZ2VzWzBdLnJ1blxuICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgXVxuXG4gIGlmICEgVmFsdWUuZXF1YWwgZXhwZWN0ZWQsIGdyYXBoXG4gICAgY29uc29sZS5lcnJvciBncmFwaFxuICAgIHRocm93IG5ldyBFcnJvciBcImV4cGFuZGVkIGdyYXBoIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIHNoYXBlXCJcblxuICBncmFwaCA9IEdyYXBoLm1ha2UgZ3JhcGhcbiAgaC5hc3NlcnQgKCBHcmFwaC5pc1R5cGUgZ3JhcGggKSwgXCJmYWlsZWQgdG8gbWFrZSBncmFwaCBpbnN0YW5jZVwiXG5cblxuZXhwb3J0IHsgdGVzdCBhcyBleHBhbnNpb24gfSJdfQ==
 //# sourceURL=/@dashkite/talos/test/linear/expansion.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9saW5lYXIvZXhwYW5zaW9uLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgVmFsdWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdmFsdWVcIlxuaW1wb3J0IHsgR3JhcGgsIGV4cGFuZCwgJHN0YXJ0LCAkaGFsdCB9IGZyb20gXCIuLi8uLi9zcmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAtPiBoLnRhcmdldCBcImxpbmVhci1leHBhbnNpb25cIiwgLT5cbiAgc3VtID0gKCB4LCB5LCB6ICkgLT4geCArIHkgKyB6IFxuICBkb3VibGUgPSAoIHggKSAtPiAyICogeFxuICB0cmlwbGUgPSAoIHggKSAtPiAzICogeFxuXG4gIGdyYXBoID0gZXhwYW5kIFtcbiAgICBzdW1cbiAgICBkb3VibGVcbiAgICB0cmlwbGVcbiAgICAoIHggKSAtPiA0ICogeFxuICBdXG5cbiAgZXhwZWN0ZWQgPSBcbiAgICBbICRzdGFydCBdOlxuICAgICAgbmFtZTogXCJzdW1cIlxuICAgICAgZWRnZXM6IFtcbiAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgIHJ1bjogc3VtXG4gICAgICAgIG1vdmU6IFwiMVwiXG4gICAgICBdXG4gICAgXCIxXCI6XG4gICAgICBuYW1lOiBcImRvdWJsZVwiXG4gICAgICBlZGdlczogW1xuICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgcnVuOiBkb3VibGVcbiAgICAgICAgbW92ZTogXCIyXCJcbiAgICAgIF1cbiAgICBcIjJcIjpcbiAgICAgIG5hbWU6IFwidHJpcGxlXCJcbiAgICAgIGVkZ2VzOiBbXG4gICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICBydW46IHRyaXBsZVxuICAgICAgICBtb3ZlOiBcIjNcIlxuICAgICAgXVxuICAgIFwiM1wiOlxuICAgICAgbmFtZTogXCJhbm9ueW1vdXMtM1wiXG4gICAgICBlZGdlczogW1xuICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgcnVuOiBncmFwaFtcIjNcIl0uZWRnZXNbMF0ucnVuXG4gICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICBdXG5cbiAgaWYgISBWYWx1ZS5lcXVhbCBleHBlY3RlZCwgZ3JhcGhcbiAgICBjb25zb2xlLmVycm9yIGdyYXBoXG4gICAgdGhyb3cgbmV3IEVycm9yIFwiZXhwYW5kZWQgZ3JhcGggZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgc2hhcGVcIlxuXG4gIGdyYXBoID0gR3JhcGgubWFrZSBncmFwaFxuICBoLmFzc2VydCAoIEdyYXBoLmlzVHlwZSBncmFwaCApLCBcImZhaWxlZCB0byBtYWtlIGdyYXBoIGluc3RhbmNlXCJcblxuXG5leHBvcnQgeyB0ZXN0IGFzIGV4cGFuc2lvbiB9IixudWxsXSwibmFtZXMiOlsiZXhwYW5zaW9uIiwidGVzdCIsImgiLCJ0YXJnZXQiLCJkb3VibGUiLCJleHBlY3RlZCIsImdyYXBoIiwic3VtIiwidHJpcGxlIiwieCIsInkiLCJ6IiwiZXhwYW5kIiwiJHN0YXJ0IiwibmFtZSIsImVkZ2VzIiwiYWNjZXB0IiwicnVuIiwibW92ZSIsIiRoYWx0IiwiVmFsdWUiLCJlcXVhbCIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwiR3JhcGgiLCJtYWtlIiwiYXNzZXJ0IiwiaXNUeXBlIl0sIm1hcHBpbmdzIjoiOzs7OytCQXVEU0E7OztlQUFBQzs7OzhEQXZEVDsrREFDQTtxQkFDQTtpRUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUhBLElBQUFBO0FBS0FBLE9BQU87V0FBR0MsU0FBRUMsTUFBRixDQUFTLG9CQUFvQjtRQUN2QyxJQUFBQyxRQUFBQyxVQUFBQyxPQUFBQyxLQUFBQztRQUFFRCxNQUFNLFNBQUVFLENBQUYsRUFBS0MsQ0FBTCxFQUFRQyxDQUFSO21CQUFlRixJQUFJQyxJQUFJQztRQUF2QjtRQUNOUCxTQUFTLFNBQUVLLENBQUY7bUJBQVMsSUFBSUE7UUFBYjtRQUNURCxTQUFTLFNBQUVDLENBQUY7bUJBQVMsSUFBSUE7UUFBYjtRQUVUSCxRQUFRTSxJQUFBQSxXQUFBLEVBQU87WUFDYkw7WUFDQUg7WUFDQUk7WUFDQSxTQUFFQyxDQUFGO3VCQUFTLElBQUlBO1lBQWI7U0FKTTtRQU9SSixXQUNFO1lBQUEsQ0FBRVEsV0FBRixDQUFBLEVBQ0U7Z0JBQUFDLE1BQU07Z0JBQ05DLE9BQU87b0JBQ0w7d0JBQUFDLFFBQVE7d0JBQ1JDLEtBQUtWO3dCQUNMVyxNQUFNO29CQUZOOztZQUZGO1lBTUYsS0FDRTtnQkFBQUosTUFBTTtnQkFDTkMsT0FBTztvQkFDTDt3QkFBQUMsUUFBUTt3QkFDUkMsS0FBS2I7d0JBQ0xjLE1BQU07b0JBRk47O1lBRkY7WUFNRixLQUNFO2dCQUFBSixNQUFNO2dCQUNOQyxPQUFPO29CQUNMO3dCQUFBQyxRQUFRO3dCQUNSQyxLQUFLVDt3QkFDTFUsTUFBTTtvQkFGTjs7WUFGRjtZQU1GLEtBQ0U7Z0JBQUFKLE1BQU07Z0JBQ05DLE9BQU87b0JBQ0w7d0JBQUFDLFFBQVE7d0JBQ1JDLEtBQUtYLEtBQUssQ0FBQyxJQUFJLENBQUNTLEtBQUssQ0FBQyxFQUFFLENBQUNFLEdBRHpCO3dCQUVBQyxNQUFNQyxVQUFBO29CQUZOOztZQUZGO1FBdEJGO1FBNkJGLElBQUcsQ0FBRUMsT0FBTUMsS0FBTixDQUFZaEIsVUFBVUMsUUFBM0I7WUFDRWdCLFFBQVFDLEtBQVIsQ0FBY2pCO1lBQ2QsTUFBTSxJQUFJa0IsTUFBTTs7UUFFbEJsQixRQUFRbUIsVUFBSyxDQUFDQyxJQUFOLENBQVdwQjtlQUNuQkosU0FBRXlCLE1BQUYsQ0FBV0YsVUFBSyxDQUFDRyxNQUFOLENBQWF0QixRQUFTO0lBL0NJO0FBQWhDIn0=