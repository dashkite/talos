"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pipe", {
    enumerable: true,
    get: function() {
        return(//g 1, 2, 3
        test);
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
    return _helpers.target("linear-pipe", function() {
        var double, f, g, result, sum, triple;
        sum = function(c, x, y, z) {
            return c.result = x + y + z;
        };
        double = function(c) {
            return c.result *= 2;
        };
        triple = function(c) {
            return c.result *= 3;
        };
        f = (0, _src.pipe)([
            sum,
            double,
            triple
        ]);
        _helpers.assert(_type.isFunction(f), "pipe did not build a function");
        _helpers.assert(f.length === 4, "pipe did not maintain starting arity");
        result = f(1, 2, 3);
        if (!_value.equal({
            result: 36
        }, result)) {
            console.error(result);
            throw new Error("composition failed to produce expected output");
        }
        g = (0, _src.pipe)({
            debug: true
        }, [
            sum,
            double,
            triple
        ]);
        return _helpers.assert(_type.isFunction(g), "pipe debug did not build a function");
    });
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2xpbmVhci9waXBlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFNBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixNQUFoQjtFQUF3QixJQUF4QjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLEtBQVAsTUFBQTs7QUFFQSxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7U0FBRyxDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQsRUFBd0IsUUFBQSxDQUFBLENBQUE7QUFDbEMsUUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUUsR0FBQSxHQUFNLFFBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsRUFBVyxDQUFYLENBQUE7YUFBa0IsQ0FBQyxDQUFDLE1BQUYsR0FBVyxDQUFBLEdBQUksQ0FBSixHQUFRO0lBQXJDO0lBQ04sTUFBQSxHQUFTLFFBQUEsQ0FBRSxDQUFGLENBQUE7YUFBUyxDQUFDLENBQUMsTUFBRixJQUFZO0lBQXJCO0lBQ1QsTUFBQSxHQUFTLFFBQUEsQ0FBRSxDQUFGLENBQUE7YUFBUyxDQUFDLENBQUMsTUFBRixJQUFZO0lBQXJCO0lBRVQsQ0FBQSxHQUFJLElBQUEsQ0FBSyxDQUNQLEdBRE8sRUFFUCxNQUZPLEVBR1AsTUFITyxDQUFMO0lBTUosQ0FBQyxDQUFDLE1BQUYsQ0FBVyxJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixDQUFYLEVBQWdDLCtCQUFoQztJQUNBLENBQUMsQ0FBQyxNQUFGLENBQVcsQ0FBQyxDQUFDLE1BQUYsS0FBWSxDQUF2QixFQUE0QixzQ0FBNUI7SUFFQSxNQUFBLEdBQVMsQ0FBQSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUjtJQUNULElBQUcsQ0FBRSxLQUFLLENBQUMsS0FBTixDQUFZO01BQUUsTUFBQSxFQUFRO0lBQVYsQ0FBWixFQUE0QixNQUE1QixDQUFMO01BQ0UsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkO01BQ0EsTUFBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixFQUZSOztJQUtBLENBQUEsR0FBSSxJQUFBLENBQUs7TUFBQSxLQUFBLEVBQU87SUFBUCxDQUFMLEVBQWtCLENBQ3BCLEdBRG9CLEVBRXBCLE1BRm9CLEVBR3BCLE1BSG9CLENBQWxCO1dBTUosQ0FBQyxDQUFDLE1BQUYsQ0FBVyxJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixDQUFYLEVBQWdDLHFDQUFoQztFQTFCZ0MsQ0FBeEI7QUFBSDs7QUE4QlAsT0FBQTs7RUFBUyxJQUFBLFFBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgVmFsdWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdmFsdWVcIlxuaW1wb3J0IHsgR3JhcGgsIGV4cGFuZCwgcGlwZSB9IGZyb20gXCIuLi8uLi9zcmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAtPiBoLnRhcmdldCBcImxpbmVhci1waXBlXCIsIC0+XG4gIHN1bSA9ICggYywgeCwgeSwgeiApIC0+IGMucmVzdWx0ID0geCArIHkgKyB6IFxuICBkb3VibGUgPSAoIGMgKSAtPiBjLnJlc3VsdCAqPSAyXG4gIHRyaXBsZSA9ICggYyApIC0+IGMucmVzdWx0ICo9IDNcblxuICBmID0gcGlwZSBbXG4gICAgc3VtXG4gICAgZG91YmxlXG4gICAgdHJpcGxlXG4gIF1cblxuICBoLmFzc2VydCAoIFR5cGUuaXNGdW5jdGlvbiBmICksIFwicGlwZSBkaWQgbm90IGJ1aWxkIGEgZnVuY3Rpb25cIlxuICBoLmFzc2VydCAoIGYubGVuZ3RoID09IDQgKSwgXCJwaXBlIGRpZCBub3QgbWFpbnRhaW4gc3RhcnRpbmcgYXJpdHlcIlxuICBcbiAgcmVzdWx0ID0gZiAxLCAyLCAzXG4gIGlmICEgVmFsdWUuZXF1YWwgeyByZXN1bHQ6IDM2IH0sIHJlc3VsdFxuICAgIGNvbnNvbGUuZXJyb3IgcmVzdWx0XG4gICAgdGhyb3cgbmV3IEVycm9yIFwiY29tcG9zaXRpb24gZmFpbGVkIHRvIHByb2R1Y2UgZXhwZWN0ZWQgb3V0cHV0XCJcblxuXG4gIGcgPSBwaXBlIGRlYnVnOiB0cnVlLCBbXG4gICAgc3VtXG4gICAgZG91YmxlXG4gICAgdHJpcGxlXG4gIF1cblxuICBoLmFzc2VydCAoIFR5cGUuaXNGdW5jdGlvbiBnICksIFwicGlwZSBkZWJ1ZyBkaWQgbm90IGJ1aWxkIGEgZnVuY3Rpb25cIlxuICAjZyAxLCAyLCAzXG5cblxuZXhwb3J0IHsgdGVzdCBhcyBwaXBlIH0iXX0=
 //# sourceURL=/@dashkite/talos/test/linear/pipe.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9saW5lYXIvcGlwZS5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCAqIGFzIFZhbHVlIGZyb20gXCJAZGFzaGtpdGUvam95L3ZhbHVlXCJcbmltcG9ydCB7IEdyYXBoLCBleHBhbmQsIHBpcGUgfSBmcm9tIFwiLi4vLi4vc3JjXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gLT4gaC50YXJnZXQgXCJsaW5lYXItcGlwZVwiLCAtPlxuICBzdW0gPSAoIGMsIHgsIHksIHogKSAtPiBjLnJlc3VsdCA9IHggKyB5ICsgeiBcbiAgZG91YmxlID0gKCBjICkgLT4gYy5yZXN1bHQgKj0gMlxuICB0cmlwbGUgPSAoIGMgKSAtPiBjLnJlc3VsdCAqPSAzXG5cbiAgZiA9IHBpcGUgW1xuICAgIHN1bVxuICAgIGRvdWJsZVxuICAgIHRyaXBsZVxuICBdXG5cbiAgaC5hc3NlcnQgKCBUeXBlLmlzRnVuY3Rpb24gZiApLCBcInBpcGUgZGlkIG5vdCBidWlsZCBhIGZ1bmN0aW9uXCJcbiAgaC5hc3NlcnQgKCBmLmxlbmd0aCA9PSA0ICksIFwicGlwZSBkaWQgbm90IG1haW50YWluIHN0YXJ0aW5nIGFyaXR5XCJcbiAgXG4gIHJlc3VsdCA9IGYgMSwgMiwgM1xuICBpZiAhIFZhbHVlLmVxdWFsIHsgcmVzdWx0OiAzNiB9LCByZXN1bHRcbiAgICBjb25zb2xlLmVycm9yIHJlc3VsdFxuICAgIHRocm93IG5ldyBFcnJvciBcImNvbXBvc2l0aW9uIGZhaWxlZCB0byBwcm9kdWNlIGV4cGVjdGVkIG91dHB1dFwiXG5cblxuICBnID0gcGlwZSBkZWJ1ZzogdHJ1ZSwgW1xuICAgIHN1bVxuICAgIGRvdWJsZVxuICAgIHRyaXBsZVxuICBdXG5cbiAgaC5hc3NlcnQgKCBUeXBlLmlzRnVuY3Rpb24gZyApLCBcInBpcGUgZGVidWcgZGlkIG5vdCBidWlsZCBhIGZ1bmN0aW9uXCJcbiAgI2cgMSwgMiwgM1xuXG5cbmV4cG9ydCB7IHRlc3QgYXMgcGlwZSB9IixudWxsXSwibmFtZXMiOlsicGlwZSIsInRlc3QiLCJoIiwidGFyZ2V0IiwiZG91YmxlIiwiZiIsImciLCJyZXN1bHQiLCJzdW0iLCJ0cmlwbGUiLCJjIiwieCIsInkiLCJ6IiwiYXNzZXJ0IiwiVHlwZSIsImlzRnVuY3Rpb24iLCJsZW5ndGgiLCJWYWx1ZSIsImVxdWFsIiwiY29uc29sZSIsImVycm9yIiwiRXJyb3IiLCJkZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7OzsrQkFtQ1NBOzs7O1FBQUFDOzs7OERBbkNUOytEQUNBO3FCQUNBO2lFQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSEEsSUFBQUE7QUFLQUEsT0FBTztXQUFHQyxTQUFFQyxNQUFGLENBQVMsZUFBZTtRQUNsQyxJQUFBQyxRQUFBQyxHQUFBQyxHQUFBQyxRQUFBQyxLQUFBQztRQUFFRCxNQUFNLFNBQUVFLENBQUYsRUFBS0MsQ0FBTCxFQUFRQyxDQUFSLEVBQVdDLENBQVg7bUJBQWtCSCxFQUFFSCxNQUFGLEdBQVdJLElBQUlDLElBQUlDO1FBQXJDO1FBQ05ULFNBQVMsU0FBRU0sQ0FBRjttQkFBU0EsRUFBRUgsTUFBRixJQUFZO1FBQXJCO1FBQ1RFLFNBQVMsU0FBRUMsQ0FBRjttQkFBU0EsRUFBRUgsTUFBRixJQUFZO1FBQXJCO1FBRVRGLElBQUlMLElBQUFBLFNBQUEsRUFBSztZQUNQUTtZQUNBSjtZQUNBSztTQUhFO1FBTUpQLFNBQUVZLE1BQUYsQ0FBV0MsTUFBS0MsVUFBTCxDQUFnQlgsSUFBSztRQUNoQ0gsU0FBRVksTUFBRixDQUFXVCxFQUFFWSxNQUFGLEtBQVksR0FBSztRQUU1QlYsU0FBU0YsRUFBRSxHQUFHLEdBQUc7UUFDakIsSUFBRyxDQUFFYSxPQUFNQyxLQUFOLENBQVk7WUFBRVosUUFBUTtRQUFWLEdBQWdCQSxTQUFqQztZQUNFYSxRQUFRQyxLQUFSLENBQWNkO1lBQ2QsTUFBTSxJQUFJZSxNQUFNOztRQUdsQmhCLElBQUlOLElBQUFBLFNBQUEsRUFBSztZQUFBdUIsT0FBTztRQUFQLEdBQWE7WUFDcEJmO1lBQ0FKO1lBQ0FLO1NBSEU7ZUFNSlAsU0FBRVksTUFBRixDQUFXQyxNQUFLQyxVQUFMLENBQWdCVixJQUFLO0lBMUJBO0FBQTNCIn0=