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
const _async = require("../../src/async");
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
    A = _async.Machine.make({
        graph: {
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
        }
    });
    B = _async.Machine.make({
        graph: {
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
        }
    });
    return [
        _helpers.test("start", _helpers.target("async", function() {
            return _helpers.assert(_type.isReactor((0, _async.start)(A)));
        })),
        _helpers.test("run while consuming events", _helpers.target("async", async function() {
            var events, ref, talos;
            events = [
                new Promise(function(resolve, reject) {
                    return resolve(1);
                }),
                new Promise(function(resolve, reject) {
                    return resolve(2);
                }),
                new Promise(function(resolve, reject) {
                    return resolve(3);
                })
            ];
            talos = await (0, _async.run)(A, {
                sum: 0
            }, events);
            return _helpers.assert.equal(6, (ref = talos.context) != null ? ref.sum : void 0);
        })),
        _helpers.test("run without events and reconsume context", _helpers.target("async", async function() {
            var ref, talos;
            talos = await (0, _async.run)(B, {
                product: 1
            });
            return _helpers.assert.equal(8, (ref = talos.context) != null ? ref.product : void 0);
        })),
        _helpers.test("flow functional composition", _helpers.target("async", async function() {
            var a, b, b2, c, context, error, f, g;
            a = async function(talos) {
                return talos.context.sum = await 1;
            };
            b = async function(talos) {
                return talos.context.sum += await 2;
            };
            b2 = async function() {
                await null;
                throw new Error("b2");
            };
            c = async function(talos) {
                return talos.context.sum += await 3;
            };
            f = (0, _async.flow)([
                a,
                b,
                b,
                c
            ]);
            _helpers.assert(_type.isFunction(f));
            context = await f();
            _helpers.assert.equal(8, context != null ? context.sum : void 0);
            g = (0, _async.flow)([
                a,
                b,
                b2,
                c
            ]);
            try {
                await g();
                throw new Error("did not throw");
            } catch (error1) {
                error = error1;
                return _helpers.assert(error.message === "b2");
            }
        }))
    ];
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2FzeW5jL2Jhc2ljLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7O0FBQUEsT0FBQTtFQUFTLE9BQVQ7RUFBa0IsS0FBbEI7RUFBeUIsTUFBekI7RUFBaUMsSUFBakM7RUFDRSxLQURGO0VBQ1MsR0FEVDtFQUNjLElBRGQ7Q0FBQSxNQUFBOztBQUVBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLEtBQVAsTUFBQTs7QUFFQSxHQUFBLEdBQU0sUUFBQSxDQUFFLEtBQUYsRUFBUyxLQUFULENBQUE7U0FDSixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQWQsSUFBcUI7QUFEakI7O0FBRU4sSUFBQSxHQUFPLFFBQUEsQ0FBRSxLQUFGLENBQUE7U0FDTCxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWQsSUFBeUI7QUFEcEI7O0FBSVAsSUFBQSxHQUFPLFFBQUEsQ0FBQSxDQUFBO0FBQ1AsTUFBQSxDQUFBLEVBQUE7RUFBRSxDQUFBLEdBQUksT0FBTyxDQUFDLElBQVIsQ0FBYTtJQUFBLEtBQUEsRUFDZjtNQUFBLEtBQUEsRUFDRTtRQUFBLElBQUEsRUFDRTtVQUFBLEdBQUEsRUFBSztRQUFMO01BREYsQ0FERjtNQUdBLElBQUEsRUFDRTtRQUFBLElBQUEsRUFDRTtVQUFBLEdBQUEsRUFBSztRQUFMO01BREY7SUFKRjtFQURlLENBQWI7RUFRSixDQUFBLEdBQUksT0FBTyxDQUFDLElBQVIsQ0FBYTtJQUFBLEtBQUEsRUFDZjtNQUFBLEtBQUEsRUFDRTtRQUFBLEtBQUEsRUFDRTtVQUFBLEdBQUEsRUFBSztRQUFMO01BREYsQ0FERjtNQUdBLEtBQUEsRUFDRTtRQUFBLE1BQUEsRUFDRTtVQUFBLEdBQUEsRUFBSztRQUFMO01BREYsQ0FKRjtNQU1BLE1BQUEsRUFDRTtRQUFBLEdBQUEsRUFDRTtVQUFBLEdB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LE9BQU8sQ0FBRSxZQUEzQjtNQUVBLENBQUEsR0FBSSxJQUFBLENBQUssQ0FBRSxDQUFGO0lBQUssQ0FBTDtJQUFRLEVBQVI7SUFBWSxDQUFaLENBQUw7QUFDSjtRQUNFLE1BQU0sQ0FBQSxDQUFBO1FBQ04sTUFBTSxJQUFJLEtBQUosQ0FBVSxlQUFWLEVBRlI7T0FHQSxjQUFBO1FBQU07ZUFDSixDQUFDLENBQUMsTUFBRixDQUFTLEtBQUssQ0FBQyxPQUFOLEtBQWlCLElBQTFCLEVBREY7O0lBZnNELENBQWxCLENBQXRDLENBakJGOztBQXJCSzs7QUEwRFAsT0FBQTtFQUFTLElBQUEsU0FBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hY2hpbmUsIFRhbG9zLCAkc3RhcnQsICRlbmQsXG4gIHN0YXJ0LCBydW4sIGZsb3cgfSBmcm9tIFwiLi4vLi4vc3JjL2FzeW5jXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxuYWRkID0gKCB0YWxvcywgZXZlbnQgKSAtPlxuICB0YWxvcy5jb250ZXh0LnN1bSArPSBldmVudFxuZ3JvdyA9ICggdGFsb3MgKSAtPlxuICB0YWxvcy5jb250ZXh0LnByb2R1Y3QgKj0gMlxuXG5cbnRlc3QgPSAtPlxuICBBID0gTWFjaGluZS5tYWtlIGdyYXBoOlxuICAgIHN0YXJ0OlxuICAgICAgaG9sZDogXG4gICAgICAgIHJ1bjogYWRkXG4gICAgaG9sZDpcbiAgICAgIGhvbGQ6XG4gICAgICAgIHJ1bjogYWRkXG5cbiAgQiA9IE1hY2hpbmUubWFrZSBncmFwaDpcbiAgICBzdGFydDpcbiAgICAgIGZpcnN0OiBcbiAgICAgICAgcnVuOiBncm93XG4gICAgZmlyc3Q6XG4gICAgICBzZWNvbmQ6XG4gICAgICAgIHJ1bjogZ3Jvd1xuICAgIHNlY29uZDogXG4gICAgICBlbmQ6XG4gICAgICAgIHJ1bjogZ3Jvd1xuXG5cbiAgW1xuICAgIGgudGVzdCBcInN0YXJ0XCIsIGgudGFyZ2V0IFwiYXN5bmNcIiwgLT5cbiAgICAgIGguYXNzZXJ0IFR5cGUuaXNSZWFjdG9yIHN0YXJ0IEFcblxuICAgIGgudGVzdCBcInJ1biB3aGlsZSBjb25zdW1pbmcgZXZlbnRzXCIsIGgudGFyZ2V0IFwiYXN5bmNcIiwgLT5cbiAgICAgIGV2ZW50cyA9IFsgXG4gICAgICAgIG5ldyBQcm9taXNlICggcmVzb2x2ZSwgcmVqZWN0ICkgLT4gcmVzb2x2ZSAxXG4gICAgICAgIG5ldyBQcm9taXNlICggcmVzb2x2ZSwgcmVqZWN0ICkgLT4gcmVzb2x2ZSAyXG4gICAgICAgIG5ldyBQcm9taXNlICggcmVzb2x2ZSwgcmVqZWN0ICkgLT4gcmVzb2x2ZSAzXG4gICAgICBdXG4gICAgICB0YWxvcyA9IGF3YWl0IHJ1biBBLCBzdW06IDAsIGV2ZW50c1xuICAgICAgaC5hc3NlcnQuZXF1YWwgNiwgdGFsb3MuY29udGV4dD8uc3VtXG5cbiAgICBoLnRlc3QgXCJydW4gd2l0aG91dCBldmVudHMgYW5kIHJlY29uc3VtZSBjb250ZXh0XCIsIGgudGFyZ2V0IFwiYXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gYXdhaXQgcnVuIEIsIHByb2R1Y3Q6IDFcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDgsIHRhbG9zLmNvbnRleHQ/LnByb2R1Y3RcblxuICAgIGgudGVzdCBcImZsb3cgZnVuY3Rpb25hbCBjb21wb3NpdGlvblwiLCBoLnRhcmdldCBcImFzeW5jXCIsIC0+XG4gICAgICBhID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtID0gYXdhaXQgMVxuICAgICAgYiA9ICggdGFsb3MgKSAtPiB0YWxvcy5jb250ZXh0LnN1bSArPSBhd2FpdCAyXG4gICAgICBiMiA9IC0+IGF3YWl0IG51bGw7IHRocm93IG5ldyBFcnJvciBcImIyXCJcbiAgICAgIGMgPSAoIHRhbG9zICkgLT4gdGFsb3MuY29udGV4dC5zdW0gKz0gYXdhaXQgMyBcblxuICAgICAgZiA9IGZsb3cgWyBhLCBiLCBiLCBjIF1cbiAgICAgIGguYXNzZXJ0IFR5cGUuaXNGdW5jdGlvbiBmXG4gICAgICBjb250ZXh0ID0gYXdhaXQgZigpXG4gICAgICBoLmFzc2VydC5lcXVhbCA4LCBjb250ZXh0Py5zdW1cblxuICAgICAgZyA9IGZsb3cgWyBhLCBiLCBiMiwgYyBdXG4gICAgICB0cnlcbiAgICAgICAgYXdhaXQgZygpXG4gICAgICAgIHRocm93IG5ldyBFcnJvciBcImRpZCBub3QgdGhyb3dcIlxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgaC5hc3NlcnQgZXJyb3IubWVzc2FnZSA9PSBcImIyXCJcblxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgYmFzaWMgfSJdfQ==
 //# sourceURL=/@dashkite/talos/test/async/basic.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9hc3luYy9iYXNpYy5jb2ZmZWUiLCI8YW5vbj4iXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFjaGluZSwgVGFsb3MsICRzdGFydCwgJGVuZCxcbiAgc3RhcnQsIHJ1biwgZmxvdyB9IGZyb20gXCIuLi8uLi9zcmMvYXN5bmNcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG5hZGQgPSAoIHRhbG9zLCBldmVudCApIC0+XG4gIHRhbG9zLmNvbnRleHQuc3VtICs9IGV2ZW50XG5ncm93ID0gKCB0YWxvcyApIC0+XG4gIHRhbG9zLmNvbnRleHQucHJvZHVjdCAqPSAyXG5cblxudGVzdCA9IC0+XG4gIEEgPSBNYWNoaW5lLm1ha2UgZ3JhcGg6XG4gICAgc3RhcnQ6XG4gICAgICBob2xkOiBcbiAgICAgICAgcnVuOiBhZGRcbiAgICBob2xkOlxuICAgICAgaG9sZDpcbiAgICAgICAgcnVuOiBhZGRcblxuICBCID0gTWFjaGluZS5tYWtlIGdyYXBoOlxuICAgIHN0YXJ0OlxuICAgICAgZmlyc3Q6IFxuICAgICAgICBydW46IGdyb3dcbiAgICBmaXJzdDpcbiAgICAgIHNlY29uZDpcbiAgICAgICAgcnVuOiBncm93XG4gICAgc2Vjb25kOiBcbiAgICAgIGVuZDpcbiAgICAgICAgcnVuOiBncm93XG5cblxuICBbXG4gICAgaC50ZXN0IFwic3RhcnRcIiwgaC50YXJnZXQgXCJhc3luY1wiLCAtPlxuICAgICAgaC5hc3NlcnQgVHlwZS5pc1JlYWN0b3Igc3RhcnQgQVxuXG4gICAgaC50ZXN0IFwicnVuIHdoaWxlIGNvbnN1bWluZyBldmVudHNcIiwgaC50YXJnZXQgXCJhc3luY1wiLCAtPlxuICAgICAgZXZlbnRzID0gWyBcbiAgICAgICAgbmV3IFByb21pc2UgKCByZXNvbHZlLCByZWplY3QgKSAtPiByZXNvbHZlIDFcbiAgICAgICAgbmV3IFByb21pc2UgKCByZXNvbHZlLCByZWplY3QgKSAtPiByZXNvbHZlIDJcbiAgICAgICAgbmV3IFByb21pc2UgKCByZXNvbHZlLCByZWplY3QgKSAtPiByZXNvbHZlIDNcbiAgICAgIF1cbiAgICAgIHRhbG9zID0gYXdhaXQgcnVuIEEsIHN1bTogMCwgZXZlbnRzXG4gICAgICBoLmFzc2VydC5lcXVhbCA2LCB0YWxvcy5jb250ZXh0Py5zdW1cblxuICAgIGgudGVzdCBcInJ1biB3aXRob3V0IGV2ZW50cyBhbmQgcmVjb25zdW1lIGNvbnRleHRcIiwgaC50YXJnZXQgXCJhc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBhd2FpdCBydW4gQiwgcHJvZHVjdDogMVxuICAgICAgaC5hc3NlcnQuZXF1YWwgOCwgdGFsb3MuY29udGV4dD8ucHJvZHVjdFxuXG4gICAgaC50ZXN0IFwiZmxvdyBmdW5jdGlvbmFsIGNvbXBvc2l0aW9uXCIsIGgudGFyZ2V0IFwiYXN5bmNcIiwgLT5cbiAgICAgIGEgPSAoIHRhbG9zICkgLT4gdGFsb3MuY29udGV4dC5zdW0gPSBhd2FpdCAxXG4gICAgICBiID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtICs9IGF3YWl0IDJcbiAgICAgIGIyID0gLT4gYXdhaXQgbnVsbDsgdGhyb3cgbmV3IEVycm9yIFwiYjJcIlxuICAgICAgYyA9ICggdGFsb3MgKSAtPiB0YWxvcy5jb250ZXh0LnN1bSArPSBhd2FpdCAzIFxuXG4gICAgICBmID0gZmxvdyBbIGEsIGIsIGIsIGMgXVxuICAgICAgaC5hc3NlcnQgVHlwZS5pc0Z1bmN0aW9uIGZcbiAgICAgIGNvbnRleHQgPSBhd2FpdCBmKClcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDgsIGNvbnRleHQ/LnN1bVxuXG4gICAgICBnID0gZmxvdyBbIGEsIGIsIGIyLCBjIF1cbiAgICAgIHRyeVxuICAgICAgICBhd2FpdCBnKClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwiZGlkIG5vdCB0aHJvd1wiXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICBoLmFzc2VydCBlcnJvci5tZXNzYWdlID09IFwiYjJcIlxuXG4gIF1cblxuZXhwb3J0IHsgdGVzdCBhcyBiYXNpYyB9IixudWxsXSwibmFtZXMiOlsiYmFzaWMiLCJ0ZXN0IiwiYWRkIiwiZ3JvdyIsInRhbG9zIiwiZXZlbnQiLCJjb250ZXh0Iiwic3VtIiwicHJvZHVjdCIsIkEiLCJCIiwiTWFjaGluZSIsIm1ha2UiLCJncmFwaCIsInN0YXJ0IiwiaG9sZCIsInJ1biIsImZpcnN0Iiwic2Vjb25kIiwiZW5kIiwiaCIsInRhcmdldCIsImFzc2VydCIsIlR5cGUiLCJpc1JlYWN0b3IiLCJldmVudHMiLCJyZWYiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVxdWFsIiwiYSIsImIiLCJiMiIsImMiLCJlcnJvciIsImYiLCJnIiwiRXJyb3IiLCJmbG93IiwiaXNGdW5jdGlvbiIsImVycm9yMSIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7K0JBcUVTQTs7O2VBQUFDOzs7dUJBckVUOzhEQUVBO2lFQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSEEsSUFBQUMsS0FBQUMsTUFBQUY7QUFLQUMsTUFBTSxTQUFFRSxLQUFGLEVBQVNDLEtBQVQ7V0FDSkQsTUFBTUUsT0FBTyxDQUFDQyxHQUFkLElBQXFCRjtBQURqQjtBQUVORixPQUFPLFNBQUVDLEtBQUY7V0FDTEEsTUFBTUUsT0FBTyxDQUFDRSxPQUFkLElBQXlCO0FBRHBCO0FBSVBQLE9BQU87SUFDUCxJQUFBUSxHQUFBQztJQUFFRCxJQUFJRSxjQUFPLENBQUNDLElBQVIsQ0FBYTtRQUFBQyxPQUNmO1lBQUFDLE9BQ0U7Z0JBQUFDLE1BQ0U7b0JBQUFDLEtBQUtkO2dCQUFMO1lBREY7WUFFRmEsTUFDRTtnQkFBQUEsTUFDRTtvQkFBQUMsS0FBS2Q7Z0JBQUw7WUFERjtRQUpGO0lBRGU7SUFRakJRLElBQUlDLGNBQU8sQ0FBQ0MsSUFBUixDQUFhO1FBQUFDLE9BQ2Y7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