"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "flow", {
    enumerable: true,
    get: function() {
        return(// await g 1, 2, 3
        test);
    }
});
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _value = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/value"));
const _time = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/time"));
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
    return _helpers.target("linear-flow", async function() {
        var double, f, g, result, sum, triple;
        sum = async function(c, x, y, z) {
            await _time.sleep(1);
            return c.result = x + y + z;
        };
        double = async function(c) {
            await _time.sleep(1);
            return c.result *= 2;
        };
        triple = async function(c) {
            await _time.sleep(1);
            return c.result *= 3;
        };
        f = (0, _src.flow)([
            sum,
            double,
            triple
        ]);
        _helpers.assert(_type.isFunction(f), "flow did not build a function");
        _helpers.assert(f.length === 4, "flow did not maintain starting arity");
        result = await f(1, 2, 3);
        if (!_value.equal({
            result: 36
        }, result)) {
            console.error(result);
            throw new Error("composition failed to produce expected output");
        }
        g = (0, _src.flow)({
            debug: true
        }, [
            sum,
            double,
            triple
        ]);
        return _helpers.assert(_type.isFunction(g), "flow debug did not build a function");
    });
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2xpbmVhci9mbG93LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFNBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLE1BQWhCO0VBQXdCLElBQXhCO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLElBQUEsR0FBTyxRQUFBLENBQUEsQ0FBQTtTQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVCxFQUF3QixNQUFBLFFBQUEsQ0FBQSxDQUFBO0FBQ2xDLFFBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQTtJQUFFLEdBQUEsR0FBTSxNQUFBLFFBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsRUFBVyxDQUFYLENBQUE7TUFDSixNQUFNLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBWDthQUNOLENBQUMsQ0FBQyxNQUFGLEdBQVcsQ0FBQSxHQUFJLENBQUosR0FBUTtJQUZmO0lBR04sTUFBQSxHQUFTLE1BQUEsUUFBQSxDQUFFLENBQUYsQ0FBQTtNQUNQLE1BQU0sSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFYO2FBQ04sQ0FBQyxDQUFDLE1BQUYsSUFBWTtJQUZMO0lBR1QsTUFBQSxHQUFTLE1BQUEsUUFBQSxDQUFFLENBQUYsQ0FBQTtNQUNQLE1BQU0sSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFYO2FBQ04sQ0FBQyxDQUFDLE1BQUYsSUFBWTtJQUZMO0lBSVQsQ0FBQSxHQUFJLElBQUEsQ0FBSyxDQUNQLEdBRE8sRUFFUCxNQUZPLEVBR1AsTUFITyxDQUFMO0lBTUosQ0FBQyxDQUFDLE1BQUYsQ0FBVyxJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixDQUFYLEVBQWdDLCtCQUFoQztJQUNBLENBQUMsQ0FBQyxNQUFGLENBQVcsQ0FBQyxDQUFDLE1BQUYsS0FBWSxDQUF2QixFQUE0QixzQ0FBNUI7SUFFQSxNQUFBLEdBQVMsQ0FBQSxNQUFNLENBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsQ0FBTjtJQUNULElBQUcsQ0FBRSxLQUFLLENBQUMsS0FBTixDQUFZO01BQUUsTUFBQSxFQUFRO0lBQVYsQ0FBWixFQUE0QixNQUE1QixDQUFMO01BQ0UsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkO01BQ0EsTUFBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixFQUZSOztJQUtBLENBQUEsR0FBSSxJQUFBLENBQUs7TUFBQSxLQUFBLEVBQU87SUFBUCxDQUFMLEVBQWtCLENBQ3BCLEdBRG9CLEVBRXBCLE1BRm9CLEVBR3BCLE1BSG9CLENBQWxCO1dBTUosQ0FBQyxDQUFDLE1BQUYsQ0FBVyxJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixDQUFYLEVBQWdDLHFDQUFoQztFQWhDZ0MsQ0FBeEI7QUFBSDs7QUFvQ1AsT0FBQTs7RUFBUyxJQUFBLFFBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgVmFsdWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdmFsdWVcIlxuaW1wb3J0ICogYXMgVGltZSBmcm9tIFwiQGRhc2hraXRlL2pveS90aW1lXCJcbmltcG9ydCB7IEdyYXBoLCBleHBhbmQsIGZsb3cgfSBmcm9tIFwiLi4vLi4vc3JjXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gLT4gaC50YXJnZXQgXCJsaW5lYXItZmxvd1wiLCAtPlxuICBzdW0gPSAoIGMsIHgsIHksIHogKSAtPiBcbiAgICBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICBjLnJlc3VsdCA9IHggKyB5ICsgeiBcbiAgZG91YmxlID0gKCBjICkgLT4gXG4gICAgYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgYy5yZXN1bHQgKj0gMlxuICB0cmlwbGUgPSAoIGMgKSAtPiBcbiAgICBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICBjLnJlc3VsdCAqPSAzXG5cbiAgZiA9IGZsb3cgW1xuICAgIHN1bVxuICAgIGRvdWJsZVxuICAgIHRyaXBsZVxuICBdXG5cbiAgaC5hc3NlcnQgKCBUeXBlLmlzRnVuY3Rpb24gZiApLCBcImZsb3cgZGlkIG5vdCBidWlsZCBhIGZ1bmN0aW9uXCJcbiAgaC5hc3NlcnQgKCBmLmxlbmd0aCA9PSA0ICksIFwiZmxvdyBkaWQgbm90IG1haW50YWluIHN0YXJ0aW5nIGFyaXR5XCJcbiAgXG4gIHJlc3VsdCA9IGF3YWl0IGYgMSwgMiwgM1xuICBpZiAhIFZhbHVlLmVxdWFsIHsgcmVzdWx0OiAzNiB9LCByZXN1bHRcbiAgICBjb25zb2xlLmVycm9yIHJlc3VsdFxuICAgIHRocm93IG5ldyBFcnJvciBcImNvbXBvc2l0aW9uIGZhaWxlZCB0byBwcm9kdWNlIGV4cGVjdGVkIG91dHB1dFwiXG5cblxuICBnID0gZmxvdyBkZWJ1ZzogdHJ1ZSwgW1xuICAgIHN1bVxuICAgIGRvdWJsZVxuICAgIHRyaXBsZVxuICBdXG5cbiAgaC5hc3NlcnQgKCBUeXBlLmlzRnVuY3Rpb24gZyApLCBcImZsb3cgZGVidWcgZGlkIG5vdCBidWlsZCBhIGZ1bmN0aW9uXCJcbiAgIyBhd2FpdCBnIDEsIDIsIDNcblxuXG5leHBvcnQgeyB0ZXN0IGFzIGZsb3cgfSJdfQ==
 //# sourceURL=/@dashkite/talos/test/linear/flow.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9saW5lYXIvZmxvdy5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCAqIGFzIFZhbHVlIGZyb20gXCJAZGFzaGtpdGUvam95L3ZhbHVlXCJcbmltcG9ydCAqIGFzIFRpbWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdGltZVwiXG5pbXBvcnQgeyBHcmFwaCwgZXhwYW5kLCBmbG93IH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxudGVzdCA9IC0+IGgudGFyZ2V0IFwibGluZWFyLWZsb3dcIiwgLT5cbiAgc3VtID0gKCBjLCB4LCB5LCB6ICkgLT4gXG4gICAgYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgYy5yZXN1bHQgPSB4ICsgeSArIHogXG4gIGRvdWJsZSA9ICggYyApIC0+IFxuICAgIGF3YWl0IFRpbWUuc2xlZXAgMVxuICAgIGMucmVzdWx0ICo9IDJcbiAgdHJpcGxlID0gKCBjICkgLT4gXG4gICAgYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgYy5yZXN1bHQgKj0gM1xuXG4gIGYgPSBmbG93IFtcbiAgICBzdW1cbiAgICBkb3VibGVcbiAgICB0cmlwbGVcbiAgXVxuXG4gIGguYXNzZXJ0ICggVHlwZS5pc0Z1bmN0aW9uIGYgKSwgXCJmbG93IGRpZCBub3QgYnVpbGQgYSBmdW5jdGlvblwiXG4gIGguYXNzZXJ0ICggZi5sZW5ndGggPT0gNCApLCBcImZsb3cgZGlkIG5vdCBtYWludGFpbiBzdGFydGluZyBhcml0eVwiXG4gIFxuICByZXN1bHQgPSBhd2FpdCBmIDEsIDIsIDNcbiAgaWYgISBWYWx1ZS5lcXVhbCB7IHJlc3VsdDogMzYgfSwgcmVzdWx0XG4gICAgY29uc29sZS5lcnJvciByZXN1bHRcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJjb21wb3NpdGlvbiBmYWlsZWQgdG8gcHJvZHVjZSBleHBlY3RlZCBvdXRwdXRcIlxuXG5cbiAgZyA9IGZsb3cgZGVidWc6IHRydWUsIFtcbiAgICBzdW1cbiAgICBkb3VibGVcbiAgICB0cmlwbGVcbiAgXVxuXG4gIGguYXNzZXJ0ICggVHlwZS5pc0Z1bmN0aW9uIGcgKSwgXCJmbG93IGRlYnVnIGRpZCBub3QgYnVpbGQgYSBmdW5jdGlvblwiXG4gICMgYXdhaXQgZyAxLCAyLCAzXG5cblxuZXhwb3J0IHsgdGVzdCBhcyBmbG93IH0iLG51bGxdLCJuYW1lcyI6WyJmbG93IiwidGVzdCIsImgiLCJ0YXJnZXQiLCJkb3VibGUiLCJmIiwiZyIsInJlc3VsdCIsInN1bSIsInRyaXBsZSIsImMiLCJ4IiwieSIsInoiLCJUaW1lIiwic2xlZXAiLCJhc3NlcnQiLCJUeXBlIiwiaXNGdW5jdGlvbiIsImxlbmd0aCIsIlZhbHVlIiwiZXF1YWwiLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsImRlYnVnIl0sIm1hcHBpbmdzIjoiOzs7OytCQTBDU0E7Ozs7UUFBQUM7Ozs4REExQ1Q7K0RBQ0E7OERBQ0E7cUJBQ0E7aUVBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFKQSxJQUFBQTtBQU1BQSxPQUFPO1dBQUdDLFNBQUVDLE1BQUYsQ0FBUyxlQUFlO1FBQ2xDLElBQUFDLFFBQUFDLEdBQUFDLEdBQUFDLFFBQUFDLEtBQUFDO1FBQUVELE1BQU0sZUFBRUUsQ0FBRixFQUFLQyxDQUFMLEVBQVFDLENBQVIsRUFBV0MsQ0FBWDtZQUNKLE1BQU1DLE1BQUtDLEtBQUwsQ0FBVzttQkFDakJMLEVBQUVILE1BQUYsR0FBV0ksSUFBSUMsSUFBSUM7UUFGZjtRQUdOVCxTQUFTLGVBQUVNLENBQUY7WUFDUCxNQUFNSSxNQUFLQyxLQUFMLENBQVc7bUJBQ2pCTCxFQUFFSCxNQUFGLElBQVk7UUFGTDtRQUdURSxTQUFTLGVBQUVDLENBQUY7WUFDUCxNQUFNSSxNQUFLQyxLQUFMLENBQVc7bUJBQ2pCTCxFQUFFSCxNQUFGLElBQVk7UUFGTDtRQUlURixJQUFJTCxJQUFBQSxTQUFBLEVBQUs7WUFDUFE7WUFDQUo7WUFDQUs7U0FIRTtRQU1KUCxTQUFFYyxNQUFGLENBQVdDLE1BQUtDLFVBQUwsQ0FBZ0JiLElBQUs7UUFDaENILFNBQUVjLE1BQUYsQ0FBV1gsRUFBRWMsTUFBRixLQUFZLEdBQUs7UUFFNUJaLFNBQVMsTUFBTUYsRUFBRSxHQUFHLEdBQUc7UUFDdkIsSUFBRyxDQUFFZSxPQUFNQyxLQUFOLENBQVk7WUFBRWQsUUFBUTtRQUFWLEdBQWdCQSxTQUFqQztZQUNFZSxRQUFRQyxLQUFSLENBQWNoQjtZQUNkLE1BQU0sSUFBSWlCLE1BQU07O1FBR2xCbEIsSUFBSU4sSUFBQUEsU0FBQSxFQUFLO1lBQUF5QixPQUFPO1FBQVAsR0FBYTtZQUNwQmpCO1lBQ0FKO1lBQ0FLO1NBSEU7ZUFNSlAsU0FBRWMsTUFBRixDQUFXQyxNQUFLQyxVQUFMLENBQWdCWixJQUFLO0lBaENBO0FBQTNCIn0=