"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "basic", {
    enumerable: true,
    get: function() {
        return test;
    }
});
const _src = require("../../src");
const _sync = require("../../src/sync");
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
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
var add, grow, test;
add = function(talos, event) {
    return talos.context.sum += event;
};
grow = function(talos) {
    return talos.context.product *= 2;
};
test = function() {
    var A, B;
    A = _src.Machine.make({
        start: {
            hold: {
                run: add
            }
        },
        hold: {
            hold: {
                run: add
            }
        }
    });
    B = _src.Machine.make({
        start: {
            first: {
                run: grow
            }
        },
        first: {
            second: {
                run: grow
            }
        },
        second: {
            end: {
                run: grow
            }
        }
    });
    return [
        _helpers.test("start", _helpers.target("sync", function() {
            var cycle;
            cycle = (0, _sync.start)(A);
            return _helpers.assert(_type.isIterator(cycle));
        })),
        _helpers.test("run while consuming events", _helpers.target("sync", function() {
            var events, ref, talos;
            events = [
                1,
                2,
                3
            ];
            talos = (0, _sync.run)(A, {
                sum: 0
            }, events);
            return _helpers.assert.equal(6, talos != null ? (ref = talos.context) != null ? ref.sum : void 0 : void 0);
        })),
        _helpers.test("run without events and reconsume context", _helpers.target("sync", function() {
            var ref, talos;
            talos = (0, _sync.run)(B, {
                product: 1
            });
            return _helpers.assert.equal(8, (ref = talos.context) != null ? ref.product : void 0);
        })),
        _helpers.test("functional composition", _helpers.target("sync", function() {
            var a, b, c, ref, talos;
            a = function(talos) {
                return talos.context.sum = 1;
            };
            b = function(talos) {
                return talos.context.sum += 2;
            };
            c = function(talos) {
                return talos.context.sum += 3;
            };
            talos = (0, _sync.run)([
                a,
                b,
                c
            ]);
            return _helpers.assert.equal(6, talos != null ? (ref = talos.context) != null ? ref.sum : void 0 : void 0);
        }))
    ];
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L3N5bmMvYmFzaWMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsT0FBVDtFQUFrQixLQUFsQjtFQUF5QixNQUF6QjtFQUFpQyxJQUFqQztDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7RUFBZ0IsR0FBaEI7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLEtBQVAsTUFBQTs7QUFFQSxHQUFBLEdBQU0sUUFBQSxDQUFFLEtBQUYsRUFBUyxLQUFULENBQUE7U0FDSixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQWQsSUFBcUI7QUFEakI7O0FBRU4sSUFBQSxHQUFPLFFBQUEsQ0FBRSxLQUFGLENBQUE7U0FDTCxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWQsSUFBeUI7QUFEcEI7O0FBSVAsSUFBQSxHQUFPLFFBQUEsQ0FBQSxDQUFBO0FBQ1AsTUFBQSxDQUFBLEVBQUE7RUFBRSxDQUFBLEdBQUksT0FBTyxDQUFDLElBQVIsQ0FDRjtJQUFBLEtBQUEsRUFDRTtNQUFBLElBQUEsRUFDRTtRQUFBLEdBQUEsRUFBSztNQUFMO0lBREYsQ0FERjtJQUdBLElBQUEsRUFDRTtNQUFBLElBQUEsRUFDRTtRQUFBLEdBQUEsRUFBSztNQUFMO0lBREY7RUFKRixDQURFO0VBUUosQ0FBQSxHQUFJLE9BQU8sQ0FBQyxJQUFSLENBQ0Y7SUFBQSxLQUFBLEVBQ0U7TUFBQSxLQUFBLEVBQ0U7UUFBQSxHQUFBLEVBQUs7TUFBTDtJQURGLENBREY7SUFHQSxLQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQ0U7UUFBQSxHQUFBLEVBQUs7TUFBTDtJQURGLENBSkY7SUFNQSxNQUFBLEVBQ0U7TUFBQSxHQUFBLEVBQ0U7UUFBQSxHQUFBLEVBQUs7TUFBTDtJQURGO0VBUEYsQ0FERTtTQVlKO0lBQ0UsQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFQO0lBQWdCLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBVDtJQUFpQixRQUFBLENBQUEsQ0FBQTtBQUNyQyxVQUFBO01BQU0sS0FBQSxHQUFRLEtBQUEsQ0FBTSxDQUFOO2FBQ1IsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFJLENBQUMsVUFBTCxDQUFnQixLQUFoQixDQUFUO0lBRitCLENBQWpCLENBQWhCLENBREY7SUFLRSxDQUFDLENBQUMsSUFBRixDQUFPLDRCQUFQO0lBQXFDLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBVDtJQUFpQixRQUFBLENBQUEsQ0FBQTtBQUMxRCxVQUFBLE1BQUE7SUFBQSxHQUFBO0lBQUE7TUFBTSxNQUFBLEdBQVMsQ0FBRSxDQUFGO0lBQUssQ0FBTDtJQUFRLENBQVI7TUFDVCxLQUFBLEdBQVEsR0FBQSxDQUFJLENBQUo7SUFBTztRQUFBLEdBQUEsRUFBSztNQUFMLENBQVA7SUFBZSxNQUFmO2FBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsQ0FBZjt1REFBZ0MsQ0FBRSxxQkFBbEM7SUFIb0QsQ0FBakIsQ0FBckMsQ0FMRjtJQVVFLENBQUMsQ0FBQyxJQUFGLENBQU8sMENBQVA7SUFBbUQsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFUO0lBQWlCLFFBQUEsQ0FBQSxDQUFBO0FBQ3hFLFVBQUEsR0FBQTtJQUFBO01BQU0sS0FBQSxHQUFRLEdBQUEsQ0FBSSxDQUFKO0lBQU87UUFBQSxPQUFBLEVBQVM7TUFBVCxDQUFQO2FBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsQ0FBZjt1Q0FBK0IsQ0FBRSxnQkFBakM7SUFGa0UsQ0FBakIsQ0FBbkQsQ0FWRjtJQWNFLENBQUMsQ0FBQyxJQUFGLENBQU8sd0JBQVA7SUFBaUMsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFUO0lBQWlCLFFBQUEsQ0FBQSxDQUFBO0FBQ3RELFVBQUEsQ0FBQTtJQUFBLENBQUE7SUFBQSxDQUFBO0lBQUEsR0FBQTtJQUFBO01BQU0sQ0FBQSxHQUFJLFFBQUEsQ0FBRSxLQUFGLENBQUE7ZUFBYSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQWQsR0FBb0I7TUFBakM7TUFDSixDQUFBLEdBQUksUUFBQSxDQUFFLEtBQUYsQ0FBQTtlQUFhLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBZCxJQUFxQjtNQUFsQztNQUNKLENBQUEsR0FBSSxRQUFBLENBQUUsS0FBRixDQUFBO2VBQWEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFkLElBQXFCO01BQWxDO01BRUosS0FBQSxHQUFRLEdBQUEsQ0FBSSxDQUFFLENBQUY7SUFBSyxDQUFMO0lBQVEsQ0FBUixDQUFKO2FBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsQ0FBZjt1REFBZ0MsQ0FBRSxxQkFBbEM7SUFOZ0QsQ0FBakIsQ0FBakMsQ0FkRjs7QUFyQks7O0FBNkNQLE9BQUE7RUFBUyxJQUFBLFNBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBUYWxvcywgJHN0YXJ0LCAkZW5kIH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgeyBzdGFydCwgcnVuIH0gZnJvbSBcIi4uLy4uL3NyYy9zeW5jXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxuYWRkID0gKCB0YWxvcywgZXZlbnQgKSAtPlxuICB0YWxvcy5jb250ZXh0LnN1bSArPSBldmVudFxuZ3JvdyA9ICggdGFsb3MgKSAtPlxuICB0YWxvcy5jb250ZXh0LnByb2R1Y3QgKj0gMlxuXG5cbnRlc3QgPSAtPlxuICBBID0gTWFjaGluZS5tYWtlXG4gICAgc3RhcnQ6XG4gICAgICBob2xkOiBcbiAgICAgICAgcnVuOiBhZGRcbiAgICBob2xkOlxuICAgICAgaG9sZDpcbiAgICAgICAgcnVuOiBhZGRcblxuICBCID0gTWFjaGluZS5tYWtlXG4gICAgc3RhcnQ6XG4gICAgICBmaXJzdDogXG4gICAgICAgIHJ1bjogZ3Jvd1xuICAgIGZpcnN0OlxuICAgICAgc2Vjb25kOlxuICAgICAgICBydW46IGdyb3dcbiAgICBzZWNvbmQ6IFxuICAgICAgZW5kOlxuICAgICAgICBydW46IGdyb3dcblxuXG4gIFtcbiAgICBoLnRlc3QgXCJzdGFydFwiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIGN5Y2xlID0gc3RhcnQgQVxuICAgICAgaC5hc3NlcnQgVHlwZS5pc0l0ZXJhdG9yIGN5Y2xlXG5cbiAgICBoLnRlc3QgXCJydW4gd2hpbGUgY29uc3VtaW5nIGV2ZW50c1wiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIGV2ZW50cyA9IFsgMSwgMiwgMyBdXG4gICAgICB0YWxvcyA9IHJ1biBBLCBzdW06IDAsIGV2ZW50c1xuICAgICAgaC5hc3NlcnQuZXF1YWwgNiwgdGFsb3M/LmNvbnRleHQ/LnN1bVxuXG4gICAgaC50ZXN0IFwicnVuIHdpdGhvdXQgZXZlbnRzIGFuZCByZWNvbnN1bWUgY29udGV4dFwiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gcnVuIEIsIHByb2R1Y3Q6IDFcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDgsIHRhbG9zLmNvbnRleHQ/LnByb2R1Y3RcblxuICAgIGgudGVzdCBcImZ1bmN0aW9uYWwgY29tcG9zaXRpb25cIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBhID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtID0gMVxuICAgICAgYiA9ICggdGFsb3MgKSAtPiB0YWxvcy5jb250ZXh0LnN1bSArPSAyXG4gICAgICBjID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtICs9IDMgXG4gICAgICBcbiAgICAgIHRhbG9zID0gcnVuIFsgYSwgYiwgYyBdXG4gICAgICBoLmFzc2VydC5lcXVhbCA2LCB0YWxvcz8uY29udGV4dD8uc3VtXG5cbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIGJhc2ljIH0iXX0=
 //# sourceURL=/@dashkite/talos/test/sync/basic.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9zeW5jL2Jhc2ljLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBUYWxvcywgJHN0YXJ0LCAkZW5kIH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgeyBzdGFydCwgcnVuIH0gZnJvbSBcIi4uLy4uL3NyYy9zeW5jXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxuYWRkID0gKCB0YWxvcywgZXZlbnQgKSAtPlxuICB0YWxvcy5jb250ZXh0LnN1bSArPSBldmVudFxuZ3JvdyA9ICggdGFsb3MgKSAtPlxuICB0YWxvcy5jb250ZXh0LnByb2R1Y3QgKj0gMlxuXG5cbnRlc3QgPSAtPlxuICBBID0gTWFjaGluZS5tYWtlXG4gICAgc3RhcnQ6XG4gICAgICBob2xkOiBcbiAgICAgICAgcnVuOiBhZGRcbiAgICBob2xkOlxuICAgICAgaG9sZDpcbiAgICAgICAgcnVuOiBhZGRcblxuICBCID0gTWFjaGluZS5tYWtlXG4gICAgc3RhcnQ6XG4gICAgICBmaXJzdDogXG4gICAgICAgIHJ1bjogZ3Jvd1xuICAgIGZpcnN0OlxuICAgICAgc2Vjb25kOlxuICAgICAgICBydW46IGdyb3dcbiAgICBzZWNvbmQ6IFxuICAgICAgZW5kOlxuICAgICAgICBydW46IGdyb3dcblxuXG4gIFtcbiAgICBoLnRlc3QgXCJzdGFydFwiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIGN5Y2xlID0gc3RhcnQgQVxuICAgICAgaC5hc3NlcnQgVHlwZS5pc0l0ZXJhdG9yIGN5Y2xlXG5cbiAgICBoLnRlc3QgXCJydW4gd2hpbGUgY29uc3VtaW5nIGV2ZW50c1wiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIGV2ZW50cyA9IFsgMSwgMiwgMyBdXG4gICAgICB0YWxvcyA9IHJ1biBBLCBzdW06IDAsIGV2ZW50c1xuICAgICAgaC5hc3NlcnQuZXF1YWwgNiwgdGFsb3M/LmNvbnRleHQ/LnN1bVxuXG4gICAgaC50ZXN0IFwicnVuIHdpdGhvdXQgZXZlbnRzIGFuZCByZWNvbnN1bWUgY29udGV4dFwiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gcnVuIEIsIHByb2R1Y3Q6IDFcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDgsIHRhbG9zLmNvbnRleHQ/LnByb2R1Y3RcblxuICAgIGgudGVzdCBcImZ1bmN0aW9uYWwgY29tcG9zaXRpb25cIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBhID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtID0gMVxuICAgICAgYiA9ICggdGFsb3MgKSAtPiB0YWxvcy5jb250ZXh0LnN1bSArPSAyXG4gICAgICBjID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtICs9IDMgXG4gICAgICBcbiAgICAgIHRhbG9zID0gcnVuIFsgYSwgYiwgYyBdXG4gICAgICBoLmFzc2VydC5lcXVhbCA2LCB0YWxvcz8uY29udGV4dD8uc3VtXG5cbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIGJhc2ljIH0iLG51bGxdLCJuYW1lcyI6WyJiYXNpYyIsInRlc3QiLCJhZGQiLCJncm93IiwidGFsb3MiLCJldmVudCIsImNvbnRleHQiLCJzdW0iLCJwcm9kdWN0IiwiQSIsIkIiLCJNYWNoaW5lIiwibWFrZSIsInN0YXJ0IiwiaG9sZCIsInJ1biIsImZpcnN0Iiwic2Vjb25kIiwiZW5kIiwiaCIsInRhcmdldCIsImN5Y2xlIiwiYXNzZXJ0IiwiVHlwZSIsImlzSXRlcmF0b3IiLCJldmVudHMiLCJyZWYiLCJlcXVhbCIsImEiLCJiIiwiYyJdLCJtYXBwaW5ncyI6Ijs7OzsrQkF3RFNBOzs7ZUFBQUM7OztxQkF4RFQ7c0JBQ0E7OERBQ0E7aUVBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFIQSxJQUFBQyxLQUFBQyxNQUFBRjtBQUtBQyxNQUFNLFNBQUVFLEtBQUYsRUFBU0MsS0FBVDtXQUNKRCxNQUFNRSxPQUFPLENBQUNDLEdBQWQsSUFBcUJGO0FBRGpCO0FBRU5GLE9BQU8sU0FBRUMsS0FBRjtXQUNMQSxNQUFNRSxPQUFPLENBQUNFLE9BQWQsSUFBeUI7QUFEcEI7QUFJUFAsT0FBTztJQUNQLElBQUFRLEdBQUFDO0lBQUVELElBQUlFLFlBQU8sQ0FBQ0MsSUFBUixDQUNGO1FBQUFDLE9BQ0U7WUFBQUMsTUFDRTtnQkFBQUMsS0FBS2I7WUFBTDtRQURGO1FBRUZZLE1BQ0U7WUFBQUEsTUFDRTtnQkFBQUMsS0FBS2I7WUFBTDtRQURGO0lBSkY7SUFPRlEsSUFBSUMsWUFBTyxDQUFDQyxJQUFSLENBQ0Y7UUFBQUMsT0FDRTtZQUFBRyxPQUNFO2dCQUFBRCxLQUFLWjtZQUFMO1FBREY7UUFFRmEsT0FDRTtZQUFBQyxRQUNFO2dCQUFBRixLQUFLWjtZQUFMO1FBREY7UUFFRmMsUUFDRTtZQUFBQyxLQUNFO2dCQUFBSCxLQUFLWjtZQUFMO1FBREY7SUFQRjtXQVdGO1FBQ0VnQixTQUFFbEIsSUFBRixDQUFPLFNBQVNrQixTQUFFQyxNQUFGLENBQVMsUUFBUTtZQUNyQyxJQUFBQztZQUFNQSxRQUFRUixJQUFBQSxXQUFBLEVBQU1KO21CQUNkVSxTQUFFRyxNQUFGLENBQVNDLE1BQUtDLFVBQUwsQ0FBZ0JIO1FBRk07UUFJakNGLFNBQUVsQixJQUFGLENBQU8sOEJBQThCa0IsU0FBRUMsTUFBRixDQUFTLFFBQVE7WUFDMUQsSUFBQUssUUFBQUMsS0FBQXRCO1lBQU1xQixTQUFTO2dCQUFFO2dCQUFHO2dCQUFHO2FBQVI7WUFDVHJCLFFBQVFXLElBQUFBLFNBQUEsRUFBSU4sR0FBRztnQkFBQUYsS0FBSztZQUFMLEdBQVFrQjttQkFDdkJOLFNBQUVHLE1BQU0sQ0FBQ0ssS0FBVCxDQUFlLHVEQUFtQnBCLEdBQUEsR0FBQSxLQUFBLElBQUEsS0FBQTtRQUhrQjtRQUt0RFksU0FBRWxCLElBQUYsQ0FBTyw0Q0FBNENrQixTQUFFQyxNQUFGLENBQVMsUUFBUTtZQUN4RSxJQUFBTSxLQUFBdEI7WUFBTUEsUUFBUVcsSUFBQUEsU0FBQSxFQUFJTCxHQUFHO2dCQUFBRixTQUFTO1lBQVQ7bUJBQ2ZXLFNBQUVHLE1BQU0sQ0FBQ0ssS0FBVCxDQUFlLHVDQUFrQm5CLE9BQUEsR0FBQSxLQUFBO1FBRmlDO1FBSXBFVyxTQUFFbEIsSUFBRixDQUFPLDBCQUEwQmtCLFNBQUVDLE1BQUYsQ0FBUyxRQUFRO1lBQ3RELElBQUFRLEdBQUFDLEdBQUFDLEdBQUFKLEtBQUF0QjtZQUFNd0IsSUFBSSxTQUFFeEIsS0FBRjt1QkFBYUEsTUFBTUUsT0FBTyxDQUFDQyxHQUFkLEdBQW9CO1lBQWpDO1lBQ0pzQixJQUFJLFNBQUV6QixLQUFGO3VCQUFhQSxNQUFNRSxPQUFPLENBQUNDLEdBQWQsSUFBcUI7WUFBbEM7WUFDSnVCLElBQUksU0FBRTFCLEtBQUY7dUJBQWFBLE1BQU1FLE9BQU8sQ0FBQ0MsR0FBZCxJQUFxQjtZQUFsQztZQUVKSCxRQUFRVyxJQUFBQSxTQUFBLEVBQUk7Z0JBQUVhO2dCQUFHQztnQkFBR0M7YUFBWjttQkFDUlgsU0FBRUcsTUFBTSxDQUFDSyxLQUFULENBQWUsdURBQW1CcEIsR0FBQSxHQUFBLEtBQUEsSUFBQSxLQUFBO1FBTmM7O0FBbkMvQyJ9