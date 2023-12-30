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
    A = _sync.Machine.make({
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
    B = _sync.Machine.make({
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
            return _helpers.assert(_type.isIterator((0, _sync.start)(A)));
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
        _helpers.test("pipe functional composition", _helpers.target("sync", function() {
            var a, b, b2, c, context, error, f, g;
            a = function(talos) {
                return talos.context.sum = 1;
            };
            b = function(talos) {
                return talos.context.sum += 2;
            };
            b2 = function() {
                throw new Error("b2");
            };
            c = function(talos) {
                return talos.context.sum += 3;
            };
            f = (0, _sync.pipe)([
                a,
                b,
                b,
                c
            ]);
            _helpers.assert(_type.isFunction(f));
            context = f();
            _helpers.assert.equal(8, context != null ? context.sum : void 0);
            g = (0, _sync.pipe)([
                a,
                b,
                b2,
                c
            ]);
            try {
                g();
                throw new Error("did not throw");
            } catch (error1) {
                error = error1;
                return _helpers.assert(error.message === "b2");
            }
        }))
    ];
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L3N5bmMvYmFzaWMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsT0FBVDtFQUFrQixLQUFsQjtFQUF5QixNQUF6QjtFQUFpQyxJQUFqQztFQUNFLEtBREY7RUFDUyxHQURUO0VBQ2MsSUFEZDtDQUFBLE1BQUE7O0FBRUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLEdBQUEsR0FBTSxRQUFBLENBQUUsS0FBRixFQUFTLEtBQVQsQ0FBQTtTQUNKLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBZCxJQUFxQjtBQURqQjs7QUFFTixJQUFBLEdBQU8sUUFBQSxDQUFFLEtBQUYsQ0FBQTtTQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZCxJQUF5QjtBQURwQjs7QUFJUCxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7QUFDUCxNQUFBLENBQUEsRUFBQTtFQUFFLENBQUEsR0FBSSxPQUFPLENBQUMsSUFBUixDQUNGO0lBQUEsS0FBQSxFQUNFO01BQUEsSUFBQSxFQUNFO1FBQUEsR0FBQSxFQUFLO01BQUw7SUFERixDQURGO0lBR0EsSUFBQSxFQUNFO01BQUEsSUFBQSxFQUNFO1FBQUEsR0FBQSxFQUFLO01BQUw7SUFERjtFQUpGLENBREU7RUFRSixDQUFBLEdBQUksT0FBTyxDQUFDLElBQVIsQ0FDRjtJQUFBLEtBQUEsRUFDRTtNQUFBLEtBQUEsRUFDRTtRQUFBLEdBQUEsRUFBSztNQUFMO0lBREYsQ0FERjtJQUdBLEtBQUEsRUFDRTtNQUFBLE1BQUEsRUFDRTtRQUFBLEdBQUEsRUFBSztNQUFMO0lBREYsQ0FKRjtJQU1BLE1BQUEsRUFDRTtNQUFBLEdBQUEsRUFDRTtRQUFBLEdBQUEsRUFBSztNQUFMO0lBREY7RUFQRixDQURFO1NBWUo7SUFDRSxDQUFDLENBQUMsSUFBRixDQUFPLE9BQVA7SUFBZ0IsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFUO0lBQWlCLFFBQUEsQ0FBQSxDQUFBO2FBQy9CLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsS0FBQSxDQUFNLENBQU4sQ0FBaEIsQ0FBVDtJQUQrQixDQUFqQixDQUFoQixDQURGO0lBSUUsQ0FBQyxDQUFDLElBQUYsQ0FBTyw0QkFBUDtJQUFxQyxDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQ7SUFBaUIsUUFBQSxDQUFBLENBQUE7QUFDMUQsVUFBQSxNQUFBO0lBQUEsR0FBQTtJQUFBO01BQU0sTUFBQSxHQUFTLENBQUUsQ0FBRjtJQUFLLENBQUw7SUFBUSxDQUFSO01BQ1QsS0FBQSxHQUFRLEdBQUEsQ0FBSSxDQUFKO0lBQU87UUFBQSxHQUFBLEVBQUs7TUFBTCxDQUFQO0lBQWUsTUFBZjthQUNSLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLENBQWY7dURBQWdDLENBQUUscUJBQWxDO0lBSG9ELENBQWpCLENBQXJDLENBSkY7SUFTRSxDQUFDLENBQUMsSUFBRixDQUFPLDBDQUFQO0lBQW1ELENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBVDtJQUFpQixRQUFBLENBQUEsQ0FBQTtBQUN4RSxVQUFBLEdBQUE7SUFBQTtNQUFNLEtBQUEsR0FBUSxHQUFBLENBQUksQ0FBSjtJQUFPO1FBQUEsT0FBQSxFQUFTO01BQVQsQ0FBUDthQUNSLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLENBQWY7dUNBQStCLENBQUUsZ0JBQWpDO0lBRmtFLENBQWpCLENBQW5ELENBVEY7SUFhRSxDQUFDLENBQUMsSUFBRixDQUFPLDZCQUFQO0lBQXNDLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBVDtJQUFpQixRQUFBLENBQUEsQ0FBQTtBQUMzRCxVQUFBLENBQUE7SUFBQSxDQUFBO0lBQUEsRUFBQTtJQUFBLENBQUE7SUFBQSxPQUFBO0lBQUEsS0FBQTtJQUFBLENBQUE7SUFBQTtNQUFNLENBQUEsR0FBSSxRQUFBLENBQUUsS0FBRixDQUFBO2VBQWEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFkLEdBQW9CO01BQWpDO01BQ0osQ0FBQSxHQUFJLFFBQUEsQ0FBRSxLQUFGLENBQUE7ZUFBYSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQWQsSUFBcUI7TUFBbEM7TUFDSixFQUFBLEdBQUssUUFBQSxDQUFBLENBQUE7UUFBRyxNQUFNLElBQUksS0FBSixDQUFVLElBQVY7TUFBVDtNQUNMLENBQUEsR0FBSSxRQUFBLENBQUUsS0FBRixDQUFBO2VBQWEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFkLElBQXFCO01BQWxDO01BRUosQ0FBQSxHQUFJLElBQUEsQ0FBSyxDQUFFLENBQUY7SUFBSyxDQUFMO0lBQVEsQ0FBUjtJQUFXLENBQVgsQ0FBTDtNQUNKLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBVDtNQUNBLE9BQUEsR0FBVSxDQUFBLENBQUE7TUFDVixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxDQUFmO3NCQUFrQixPQUFPLENBQUUsWUFBM0I7TUFFQSxDQUFBLEdBQUksSUFBQSxDQUFLLENBQUUsQ0FBRjtJQUFLLENBQUw7SUFBUSxFQUFSO0lBQVksQ0FBWixDQUFMO0FBQ0o7UUFDRSxDQUFBLENBQUE7UUFDQSxNQUFNLElBQUksS0FBSixDQUFVLGVBQVYsRUFGUjtPQUdBLGNBQUE7UUFBTTtlQUNKLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBSyxDQUFDLE9BQU4sS0FBaUIsSUFBMUIsRUFERjs7SUFmcUQsQ0FBakIsQ0FBdEMsQ0FiRjs7QUFyQks7O0FBcURQLE9BQUE7RUFBUyxJQUFBLFNBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBUYWxvcywgJHN0YXJ0LCAkZW5kLCBcbiAgc3RhcnQsIHJ1biwgcGlwZSB9IGZyb20gXCIuLi8uLi9zcmMvc3luY1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbmFkZCA9ICggdGFsb3MsIGV2ZW50ICkgLT5cbiAgdGFsb3MuY29udGV4dC5zdW0gKz0gZXZlbnRcbmdyb3cgPSAoIHRhbG9zICkgLT5cbiAgdGFsb3MuY29udGV4dC5wcm9kdWN0ICo9IDJcblxuXG50ZXN0ID0gLT5cbiAgQSA9IE1hY2hpbmUubWFrZVxuICAgIHN0YXJ0OlxuICAgICAgaG9sZDogXG4gICAgICAgIHJ1bjogYWRkXG4gICAgaG9sZDpcbiAgICAgIGhvbGQ6XG4gICAgICAgIHJ1bjogYWRkXG5cbiAgQiA9IE1hY2hpbmUubWFrZVxuICAgIHN0YXJ0OlxuICAgICAgZmlyc3Q6IFxuICAgICAgICBydW46IGdyb3dcbiAgICBmaXJzdDpcbiAgICAgIHNlY29uZDpcbiAgICAgICAgcnVuOiBncm93XG4gICAgc2Vjb25kOiBcbiAgICAgIGVuZDpcbiAgICAgICAgcnVuOiBncm93XG5cblxuICBbXG4gICAgaC50ZXN0IFwic3RhcnRcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBoLmFzc2VydCBUeXBlLmlzSXRlcmF0b3Igc3RhcnQgQVxuXG4gICAgaC50ZXN0IFwicnVuIHdoaWxlIGNvbnN1bWluZyBldmVudHNcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBldmVudHMgPSBbIDEsIDIsIDMgXVxuICAgICAgdGFsb3MgPSBydW4gQSwgc3VtOiAwLCBldmVudHNcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDYsIHRhbG9zPy5jb250ZXh0Py5zdW1cblxuICAgIGgudGVzdCBcInJ1biB3aXRob3V0IGV2ZW50cyBhbmQgcmVjb25zdW1lIGNvbnRleHRcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IHJ1biBCLCBwcm9kdWN0OiAxXG4gICAgICBoLmFzc2VydC5lcXVhbCA4LCB0YWxvcy5jb250ZXh0Py5wcm9kdWN0XG5cbiAgICBoLnRlc3QgXCJwaXBlIGZ1bmN0aW9uYWwgY29tcG9zaXRpb25cIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBhID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtID0gMVxuICAgICAgYiA9ICggdGFsb3MgKSAtPiB0YWxvcy5jb250ZXh0LnN1bSArPSAyXG4gICAgICBiMiA9IC0+IHRocm93IG5ldyBFcnJvciBcImIyXCJcbiAgICAgIGMgPSAoIHRhbG9zICkgLT4gdGFsb3MuY29udGV4dC5zdW0gKz0gM1xuICAgICAgXG4gICAgICBmID0gcGlwZSBbIGEsIGIsIGIsIGMgXVxuICAgICAgaC5hc3NlcnQgVHlwZS5pc0Z1bmN0aW9uIGZcbiAgICAgIGNvbnRleHQgPSBmKClcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDgsIGNvbnRleHQ/LnN1bVxuXG4gICAgICBnID0gcGlwZSBbIGEsIGIsIGIyLCBjIF1cbiAgICAgIHRyeVxuICAgICAgICBnKClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwiZGlkIG5vdCB0aHJvd1wiXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICBoLmFzc2VydCBlcnJvci5tZXNzYWdlID09IFwiYjJcIlxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgYmFzaWMgfSJdfQ==
 //# sourceURL=/@dashkite/talos/test/sync/basic.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9zeW5jL2Jhc2ljLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBUYWxvcywgJHN0YXJ0LCAkZW5kLCBcbiAgc3RhcnQsIHJ1biwgcGlwZSB9IGZyb20gXCIuLi8uLi9zcmMvc3luY1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbmFkZCA9ICggdGFsb3MsIGV2ZW50ICkgLT5cbiAgdGFsb3MuY29udGV4dC5zdW0gKz0gZXZlbnRcbmdyb3cgPSAoIHRhbG9zICkgLT5cbiAgdGFsb3MuY29udGV4dC5wcm9kdWN0ICo9IDJcblxuXG50ZXN0ID0gLT5cbiAgQSA9IE1hY2hpbmUubWFrZVxuICAgIHN0YXJ0OlxuICAgICAgaG9sZDogXG4gICAgICAgIHJ1bjogYWRkXG4gICAgaG9sZDpcbiAgICAgIGhvbGQ6XG4gICAgICAgIHJ1bjogYWRkXG5cbiAgQiA9IE1hY2hpbmUubWFrZVxuICAgIHN0YXJ0OlxuICAgICAgZmlyc3Q6IFxuICAgICAgICBydW46IGdyb3dcbiAgICBmaXJzdDpcbiAgICAgIHNlY29uZDpcbiAgICAgICAgcnVuOiBncm93XG4gICAgc2Vjb25kOiBcbiAgICAgIGVuZDpcbiAgICAgICAgcnVuOiBncm93XG5cblxuICBbXG4gICAgaC50ZXN0IFwic3RhcnRcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBoLmFzc2VydCBUeXBlLmlzSXRlcmF0b3Igc3RhcnQgQVxuXG4gICAgaC50ZXN0IFwicnVuIHdoaWxlIGNvbnN1bWluZyBldmVudHNcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBldmVudHMgPSBbIDEsIDIsIDMgXVxuICAgICAgdGFsb3MgPSBydW4gQSwgc3VtOiAwLCBldmVudHNcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDYsIHRhbG9zPy5jb250ZXh0Py5zdW1cblxuICAgIGgudGVzdCBcInJ1biB3aXRob3V0IGV2ZW50cyBhbmQgcmVjb25zdW1lIGNvbnRleHRcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IHJ1biBCLCBwcm9kdWN0OiAxXG4gICAgICBoLmFzc2VydC5lcXVhbCA4LCB0YWxvcy5jb250ZXh0Py5wcm9kdWN0XG5cbiAgICBoLnRlc3QgXCJwaXBlIGZ1bmN0aW9uYWwgY29tcG9zaXRpb25cIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBhID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtID0gMVxuICAgICAgYiA9ICggdGFsb3MgKSAtPiB0YWxvcy5jb250ZXh0LnN1bSArPSAyXG4gICAgICBiMiA9IC0+IHRocm93IG5ldyBFcnJvciBcImIyXCJcbiAgICAgIGMgPSAoIHRhbG9zICkgLT4gdGFsb3MuY29udGV4dC5zdW0gKz0gM1xuICAgICAgXG4gICAgICBmID0gcGlwZSBbIGEsIGIsIGIsIGMgXVxuICAgICAgaC5hc3NlcnQgVHlwZS5pc0Z1bmN0aW9uIGZcbiAgICAgIGNvbnRleHQgPSBmKClcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDgsIGNvbnRleHQ/LnN1bVxuXG4gICAgICBnID0gcGlwZSBbIGEsIGIsIGIyLCBjIF1cbiAgICAgIHRyeVxuICAgICAgICBnKClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwiZGlkIG5vdCB0aHJvd1wiXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICBoLmFzc2VydCBlcnJvci5tZXNzYWdlID09IFwiYjJcIlxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgYmFzaWMgfSIsbnVsbF0sIm5hbWVzIjpbImJhc2ljIiwidGVzdCIsImFkZCIsImdyb3ciLCJ0YWxvcyIsImV2ZW50IiwiY29udGV4dCIsInN1bSIsInByb2R1Y3QiLCJBIiwiQiIsIk1hY2hpbmUiLCJtYWtlIiwic3RhcnQiLCJob2xkIiwicnVuIiwiZmlyc3QiLCJzZWNvbmQiLCJlbmQiLCJoIiwidGFyZ2V0IiwiYXNzZXJ0IiwiVHlwZSIsImlzSXRlcmF0b3IiLCJldmVudHMiLCJyZWYiLCJlcXVhbCIsImEiLCJiIiwiYjIiLCJjIiwiZXJyb3IiLCJmIiwiZyIsIkVycm9yIiwicGlwZSIsImlzRnVuY3Rpb24iLCJlcnJvcjEiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7OytCQWdFU0E7OztlQUFBQzs7O3NCQWhFVDs4REFFQTtpRUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUhBLElBQUFDLEtBQUFDLE1BQUFGO0FBS0FDLE1BQU0sU0FBRUUsS0FBRixFQUFTQyxLQUFUO1dBQ0pELE1BQU1FLE9BQU8sQ0FBQ0MsR0FBZCxJQUFxQkY7QUFEakI7QUFFTkYsT0FBTyxTQUFFQyxLQUFGO1dBQ0xBLE1BQU1FLE9BQU8sQ0FBQ0UsT0FBZCxJQUF5QjtBQURwQjtBQUlQUCxPQUFPO0lBQ1AsSUFBQVEsR0FBQUM7SUFBRUQsSUFBSUUsYUFBTyxDQUFDQyxJQUFSLENBQ0Y7UUFBQUMsT0FDRTtZQUFBQyxNQUNFO2dCQUFBQyxLQUFLYjtZQUFMO1FBREY7UUFFRlksTUFDRTtZQUFBQSxNQUNFO2dCQUFBQyxLQUFLYjtZQUFMO1FBREY7SUFKRjtJQU9GUSxJQUFJQyxhQUFPLENBQUNDLElBQVIsQ0FDRjtRQUFBQyxPQUNFO1lBQUFHLE9BQ0U7Z0JBQUFELEtBQUtaO1lBQUw7UUFERjtRQUVGYSxPQUNFO1lBQUFDLFFBQ0U7Z0JBQUFGLEtBQUtaO1lBQUw7UUFERjtRQUVGYyxRQUNFO1lBQUFDLEtBQ0U7Z0JBQUFILEtBQUtaO1lBQUw7UUFERjtJQVBGO1dBV0Y7UUFDRWdCLFNBQUVsQixJQUFGLENBQU8sU0FBU2tCLFNBQUVDLE1BQUYsQ0FBUyxRQUFRO21CQUMvQkQsU0FBRUUsTUFBRixDQUFTQyxNQUFLQyxVQUFMLENBQWdCVixJQUFBQSxXQUFBLEVBQU1KO1FBREE7UUFHakNVLFNBQUVsQixJQUFGLENBQU8sOEJBQThCa0IsU0FBRUMsTUFBRixDQUFTLFFBQVE7WUFDMUQsSUFBQUksUUFBQUMsS0FBQXJCO1lBQU1vQixTQUFTO2dCQUFFO2dCQUFHO2dCQUFHO2FBQVI7WUFDVHBCLFFBQVFXLElBQUFBLFNBQUEsRUFBSU4sR0FBRztnQkFBQUYsS0FBSztZQUFMLEdBQVFpQjttQkFDdkJMLFNBQUVFLE1BQU0sQ0FBQ0ssS0FBVCxDQUFlLHVEQUFtQm5CLEdBQUEsR0FBQSxLQUFBLElBQUEsS0FBQTtRQUhrQjtRQUt0RFksU0FBRWxCLElBQUYsQ0FBTyw0Q0FBNENrQixTQUFFQyxNQUFGLENBQVMsUUFBUTtZQUN4RSxJQUFBSyxLQUFBckI7WUFBTUEsUUFBUVcsSUFBQUEsU0FBQSxFQUFJTCxHQUFHO2dCQUFBRixTQUFTO1lBQVQ7bUJBQ2ZXLFNBQUVFLE1BQU0sQ0FBQ0ssS0FBVCxDQUFlLHVDQUFrQmxCLE9BQUEsR0FBQSxLQUFBO1FBRmlDO1FBSXBFVyxTQUFFbEIsSUFBRixDQUFPLCtCQUErQmtCLFNBQUVDLE1BQUYsQ0FBUyxRQUFRO1lBQzNELElBQUFPLEdBQUFDLEdBQUFDLElBQUFDLEdBQUF4QixTQUFBeUIsT0FBQUMsR0FBQUM7WUFBTU4sSUFBSSxTQUFFdkIsS0FBRjt1QkFBYUEsTUFBTUUsT0FBTyxDQUFDQyxHQUFkLEdBQW9CO1lBQWpDO1lBQ0pxQixJQUFJLFNBQUV4QixLQUFGO3VCQUFhQSxNQUFNRSxPQUFPLENBQUNDLEdBQWQsSUFBcUI7WUFBbEM7WUFDSnNCLEtBQUs7Z0JBQUcsTUFBTSxJQUFJSyxNQUFNO1lBQW5CO1lBQ0xKLElBQUksU0FBRTFCLEtBQUY7dUJBQWFBLE1BQU1FLE9BQU8sQ0FBQ0MsR0FBZCxJQUFxQjtZQUFsQztZQUVKeUIsSUFBSUcsSUFBQUEsVUFBQSxFQUFLO2dCQUFFUjtnQkFBR0M7Z0JBQUdBO2dCQUFHRTthQUFoQjtZQUNKWCxTQUFFRSxNQUFGLENBQVNDLE1BQUtjLFVBQUwsQ0FBZ0JKO1lBQ3pCMUIsVUFBVTBCO1lBQ1ZiLFNBQUVFLE1BQU0sQ0FBQ0ssS0FBVCxDQUFlLHFCQUFHcEIsUUFBU0MsR0FBQSxHQUFBLEtBQUE7WUFFM0IwQixJQUFJRSxJQUFBQSxVQUFBLEVBQUs7Z0JBQUVSO2dCQUFHQztnQkFBR0M7Z0JBQUlDO2FBQWpCO1lBQ0osSUFBQTtnQkFDRUc7Z0JBQ0EsTUFBTSxJQUFJQyxNQUFNO2NBQ2xCLE9BQUFHLFFBQUE7Z0JBQU1OLFFBQUFNO3VCQUNKbEIsU0FBRUUsTUFBRixDQUFTVSxNQUFNTyxPQUFOLEtBQWlCOztRQWhCeUI7O0FBbENwRCJ9