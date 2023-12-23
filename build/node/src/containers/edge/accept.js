"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "accept", {
    enumerable: true,
    get: function() {
        return make;
    }
});
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _generic = require("@dashkite/joy/generic");
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
var make;
make = (0, _generic.generic)({
    name: "make edge accept",
    default: function(...args) {
        throw new Error(`make edge accept input is malformed ${JSON.stringify(args)}`);
    }
});
(0, _generic.generic)(make, _type.isString, function(s) {
    return function(talos, transform) {
        return transform === s;
    };
});
(0, _generic.generic)(make, _type.isSymbol, function(s) {
    return function(talos, transform) {
        return transform === s;
    };
});
(0, _generic.generic)(make, _type.isNumber, function(n) {
    return function(talos, transform) {
        return transform === n;
    };
});
(0, _generic.generic)(make, _type.isBoolean, function(b) {
    return function() {
        return b;
    };
});
(0, _generic.generic)(make, _type.isRegExp, function(re) {
    return function(talos, transform) {
        return _type.isString(transform) && re.test(transform);
    };
});
(0, _generic.generic)(make, _type.isFunction, function(f) {
    return function(talos, ...transforms) {
        return f(talos, ...transforms);
    };
});
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvY29udGFpbmVycy9lZGdlL2FjY2VwdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFHQSxJQUFBLEdBQU8sT0FBQSxDQUNMO0VBQUEsSUFBQSxFQUFNLGtCQUFOO0VBQ0EsT0FBQSxFQUFTLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtJQUNQLE1BQU0sSUFBSSxLQUFKLENBQVUsQ0FBQSxvQ0FBQSxDQUFBLENBQXVDLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixDQUF2QyxDQUFBLENBQVY7RUFEQztBQURULENBREs7O0FBS1AsT0FBQSxDQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsUUFBbkIsRUFBNkIsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUMzQixRQUFBLENBQUUsS0FBRixFQUFTLFNBQVQsQ0FBQTtXQUF3QixTQUFBLEtBQWE7RUFBckM7QUFEMkIsQ0FBN0I7O0FBR0EsT0FBQSxDQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsUUFBbkIsRUFBNkIsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUMzQixRQUFBLENBQUUsS0FBRixFQUFTLFNBQVQsQ0FBQTtXQUF3QixTQUFBLEtBQWE7RUFBckM7QUFEMkIsQ0FBN0I7O0FBR0EsT0FBQSxDQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsUUFBbkIsRUFBNkIsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUMzQixRQUFBLENBQUUsS0FBRixFQUFTLFNBQVQsQ0FBQTtXQUF3QixTQUFBLEtBQWE7RUFBckM7QUFEMkIsQ0FBN0I7O0FBR0EsT0FBQSxDQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsU0FBbkIsRUFBOEIsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUM1QixRQUFBLENBQUEsQ0FBQTtXQUFHO0VBQUg7QUFENEIsQ0FBOUI7O0FBR0EsT0FBQSxDQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsUUFBbkIsRUFBNkIsUUFBQSxDQUFFLEVBQUYsQ0FBQTtTQUMzQixRQUFBLENBQUUsS0FBRixFQUFTLFNBQVQsQ0FBQTtXQUNFLENBQUUsSUFBSSxDQUFDLFFBQUwsQ0FBYyxTQUFkLENBQUYsQ0FBQSxJQUErQixDQUFFLEVBQUUsQ0FBQyxJQUFILENBQVEsU0FBUixDQUFGO0VBRGpDO0FBRDJCLENBQTdCOztBQUlBLE9BQUEsQ0FBUSxJQUFSLEVBQWMsSUFBSSxDQUFDLFVBQW5CLEVBQStCLFFBQUEsQ0FBRSxDQUFGLENBQUE7U0FDN0IsUUFBQSxDQUFFLEtBQUYsRUFBQSxHQUFTLFVBQVQsQ0FBQTtXQUE0QixDQUFBLENBQUUsS0FBRixFQUFTLEdBQUEsVUFBVDtFQUE1QjtBQUQ2QixDQUEvQjs7QUFLQSxPQUFBO0VBQVMsSUFBQSxVQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcblxuXG5tYWtlID0gZ2VuZXJpYyBcbiAgbmFtZTogXCJtYWtlIGVkZ2UgYWNjZXB0XCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwibWFrZSBlZGdlIGFjY2VwdCBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgbWFrZSwgVHlwZS5pc1N0cmluZywgKCBzICkgLT5cbiAgKCB0YWxvcywgdHJhbnNmb3JtICkgLT4gdHJhbnNmb3JtID09IHNcblxuZ2VuZXJpYyBtYWtlLCBUeXBlLmlzU3ltYm9sLCAoIHMgKSAtPlxuICAoIHRhbG9zLCB0cmFuc2Zvcm0gKSAtPiB0cmFuc2Zvcm0gPT0gc1xuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNOdW1iZXIsICggbiApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybSApIC0+IHRyYW5zZm9ybSA9PSBuXG5cbmdlbmVyaWMgbWFrZSwgVHlwZS5pc0Jvb2xlYW4sICggYiApIC0+XG4gIC0+IGJcblxuZ2VuZXJpYyBtYWtlLCBUeXBlLmlzUmVnRXhwLCAoIHJlICkgLT5cbiAgKCB0YWxvcywgdHJhbnNmb3JtICkgLT4gXG4gICAgKCBUeXBlLmlzU3RyaW5nIHRyYW5zZm9ybSApICYmICggcmUudGVzdCB0cmFuc2Zvcm0gKVxuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNGdW5jdGlvbiwgKCBmICkgLT5cbiAgKCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApIC0+IGYgdGFsb3MsIHRyYW5zZm9ybXMuLi5cblxuXG5cbmV4cG9ydCB7IG1ha2UgYXMgYWNjZXB0IH0iXX0=
 //# sourceURL=/@dashkite/talos/src/containers/edge/accept.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2NvbnRhaW5lcnMvZWRnZS9hY2NlcHQuY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5cblxubWFrZSA9IGdlbmVyaWMgXG4gIG5hbWU6IFwibWFrZSBlZGdlIGFjY2VwdFwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcIm1ha2UgZWRnZSBhY2NlcHQgaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNTdHJpbmcsICggcyApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybSApIC0+IHRyYW5zZm9ybSA9PSBzXG5cbmdlbmVyaWMgbWFrZSwgVHlwZS5pc1N5bWJvbCwgKCBzICkgLT5cbiAgKCB0YWxvcywgdHJhbnNmb3JtICkgLT4gdHJhbnNmb3JtID09IHNcblxuZ2VuZXJpYyBtYWtlLCBUeXBlLmlzTnVtYmVyLCAoIG4gKSAtPlxuICAoIHRhbG9zLCB0cmFuc2Zvcm0gKSAtPiB0cmFuc2Zvcm0gPT0gblxuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNCb29sZWFuLCAoIGIgKSAtPlxuICAtPiBiXG5cbmdlbmVyaWMgbWFrZSwgVHlwZS5pc1JlZ0V4cCwgKCByZSApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybSApIC0+IFxuICAgICggVHlwZS5pc1N0cmluZyB0cmFuc2Zvcm0gKSAmJiAoIHJlLnRlc3QgdHJhbnNmb3JtIClcblxuZ2VuZXJpYyBtYWtlLCBUeXBlLmlzRnVuY3Rpb24sICggZiApIC0+XG4gICggdGFsb3MsIHRyYW5zZm9ybXMuLi4gKSAtPiBmIHRhbG9zLCB0cmFuc2Zvcm1zLi4uXG5cblxuXG5leHBvcnQgeyBtYWtlIGFzIGFjY2VwdCB9IixudWxsXSwibmFtZXMiOlsiYWNjZXB0IiwibWFrZSIsImdlbmVyaWMiLCJuYW1lIiwiZGVmYXVsdCIsImFyZ3MiLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJUeXBlIiwiaXNTdHJpbmciLCJzIiwidGFsb3MiLCJ0cmFuc2Zvcm0iLCJpc1N5bWJvbCIsImlzTnVtYmVyIiwibiIsImlzQm9vbGVhbiIsImIiLCJpc1JlZ0V4cCIsInJlIiwidGVzdCIsImlzRnVuY3Rpb24iLCJmIiwidHJhbnNmb3JtcyJdLCJtYXBwaW5ncyI6Ijs7OzsrQkE4QlNBOzs7ZUFBQUM7Ozs4REE5QlQ7eUJBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQSxJQUFBQTtBQUlBQSxPQUFPQyxJQUFBQSxnQkFBQSxFQUNMO0lBQUFDLE1BQU07SUFDTkMsU0FBUyxTQUFBLEdBQUVDLElBQUY7UUFDUCxNQUFNLElBQUlDLE1BQU0sQ0FBQSxvQ0FBQSxFQUF1Q0MsS0FBS0MsU0FBTCxDQUFlSCxNQUF0RCxDQUFWO0lBREM7QUFEVDtBQUlGSCxJQUFBQSxnQkFBQSxFQUFRRCxNQUFNUSxNQUFLQyxRQUFuQixFQUE2QixTQUFFQyxDQUFGO1dBQzNCLFNBQUVDLEtBQUYsRUFBU0MsU0FBVDtlQUF3QkEsY0FBYUY7SUFBckM7QUFEMkI7QUFHN0JULElBQUFBLGdCQUFBLEVBQVFELE1BQU1RLE1BQUtLLFFBQW5CLEVBQTZCLFNBQUVILENBQUY7V0FDM0IsU0FBRUMsS0FBRixFQUFTQyxTQUFUO2VBQXdCQSxjQUFhRjtJQUFyQztBQUQyQjtBQUc3QlQsSUFBQUEsZ0JBQUEsRUFBUUQsTUFBTVEsTUFBS00sUUFBbkIsRUFBNkIsU0FBRUMsQ0FBRjtXQUMzQixTQUFFSixLQUFGLEVBQVNDLFNBQVQ7ZUFBd0JBLGNBQWFHO0lBQXJDO0FBRDJCO0FBRzdCZCxJQUFBQSxnQkFBQSxFQUFRRCxNQUFNUSxNQUFLUSxTQUFuQixFQUE4QixTQUFFQyxDQUFGO1dBQzVCO2VBQUdBO0lBQUg7QUFENEI7QUFHOUJoQixJQUFBQSxnQkFBQSxFQUFRRCxNQUFNUSxNQUFLVSxRQUFuQixFQUE2QixTQUFFQyxFQUFGO1dBQzNCLFNBQUVSLEtBQUYsRUFBU0MsU0FBVDtlQUNFLEFBQUVKLE1BQUtDLFFBQUwsQ0FBY0csY0FBaUJPLEdBQUdDLElBQUgsQ0FBUVI7SUFEM0M7QUFEMkI7QUFJN0JYLElBQUFBLGdCQUFBLEVBQVFELE1BQU1RLE1BQUthLFVBQW5CLEVBQStCLFNBQUVDLENBQUY7V0FDN0IsU0FBRVgsS0FBRixFQUFBLEdBQVNZLFVBQVQ7ZUFBNEJELEVBQUVYLFVBQU9ZO0lBQXJDO0FBRDZCIn0=