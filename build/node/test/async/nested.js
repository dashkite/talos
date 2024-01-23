"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nested", {
    enumerable: true,
    get: function() {
        return test;
    }
});
const _async = require("../../src/async");
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
    var A, B, Run;
    Run = {
        grow: async function(talos) {
            return talos.context.product *= await 2;
        }
    };
    A = _async.Machine.make({
        name: "A",
        graph: {
            start: {
                default: "second"
            },
            second: {
                default: {
                    run: Run.grow,
                    move: "third"
                }
            },
            third: {
                default: {
                    run: Run.grow,
                    move: _async.$end
                }
            }
        }
    });
    Run.join = async function*(talos) {
        var inner, ref, results;
        ref = (0, _async.start)(A, talos.context);
        results = [];
        for await (inner of ref){
            results.push((yield inner));
        }
        return results;
    };
    B = _async.Machine.make({
        name: "B",
        graph: {
            start: {
                default: "first"
            },
            first: {
                default: {
                    run: Run.grow,
                    move: "join"
                }
            },
            join: {
                default: {
                    run: Run.join,
                    move: _async.$end
                }
            }
        }
    });
    return [
        _helpers.test("completes operation", _helpers.target("sync", async function() {
            var ref, talos;
            talos = await (0, _async.run)(B, {
                product: 1
            });
            return _helpers.assert.equal(8, (ref = talos.context) != null ? ref.product : void 0);
        })),
        _helpers.test("exposes lower order talos instance", _helpers.target("sync", async function() {
            var expected, ref, states, talos;
            states = [];
            ref = (0, _async.start)(B, {
                product: 1
            });
            for await (talos of ref){
                states.push({
                    name: talos.name,
                    state: talos.state
                });
            }
            expected = [
                {
                    name: "B",
                    state: "first"
                },
                {
                    name: "B",
                    state: "join"
                },
                {
                    name: "A",
                    state: "second"
                },
                {
                    name: "A",
                    state: "third"
                },
                {
                    name: "A",
                    state: _async.$end
                },
                {
                    name: "B",
                    state: _async.$end
                }
            ];
            return _helpers.assert.deepEqual(expected, states);
        }))
    ];
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L2FzeW5jL25lc3RlZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsT0FBVDtFQUFrQixJQUFsQjtFQUF3QixLQUF4QjtFQUErQixHQUEvQjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLEtBQVAsTUFBQTs7QUFHQSxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7QUFDUCxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7RUFBRSxHQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sTUFBQSxRQUFBLENBQUUsS0FBRixDQUFBO2FBQ0osS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFkLElBQXlCLENBQUEsTUFBTSxDQUFOO0lBRHJCO0VBQU47RUFHRixDQUFBLEdBQUksT0FBTyxDQUFDLElBQVIsQ0FDRjtJQUFBLElBQUEsRUFBTSxHQUFOO0lBQ0EsS0FBQSxFQUNFO01BQUEsS0FBQSxFQUNFO1FBQUEsT0FBQSxFQUFTO01BQVQsQ0FERjtNQUVBLE1BQUEsRUFDRTtRQUFBLE9BQUEsRUFDRTtVQUFBLEdBQUEsRUFBSyxHQUFHLENBQUMsSUFBVDtVQUNBLElBQUEsRUFBTTtRQUROO01BREYsQ0FIRjtNQU1BLEtBQUEsRUFDRTtRQUFBLE9BQUEsRUFDRTtVQUFBLEdBQUEsRUFBSyxHQUFHLENBQUMsSUFBVDtVQUNBLElBQUEsRUFBTTtRQUROO01BREY7SUFQRjtFQUZGLENBREU7RUFjSixHQUFHLENBQUMsSUFBSixHQUFXLE1BQUEsU0FBQSxDQUFFLEtBQUYsQ0FBQTtBQUNiLFFBQUEsS0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFJO0FBQUE7SUFBQSx3QkFBQTttQkFDRSxDQUFBLE1BQU0sS0FBTjtJQURGLENBQUE7O0VBRFM7RUFJWCxDQUFBLEdBQUksT0FBTyxDQUFDLElBQVIsQ0FDRjtJQUFBLElBQUEsRUFBTSxHQUFOO0lBQ0EsS0FBQSxFQUNFO01BQUEsS0FBQSxFQUNFO1FBQUEsT0FBQSxFQUFTO01BQVQsQ0FERjtNQUVBLEtBQUEsRUFDRTtRQUFBLE9BQUEsRUFDRTtVQUFBLEdBQUEsRUFBSyxHQUFHLENBQUMsSUFBVDtVQUNBLElBQUEsRUFBTTtRQUROO01BREYsQ0FIRjtNQU1BLElBQUEsRUFDRTtRQUFBLE9BQUEsRUFDRTtVQUFBLEdBQUEsRUFBSyxHQUFHLENBQUMsSUFBVDtVQUNBLElBQUEsRUFBTTtRQUROO01BREY7SUFQRjtFQUZGLENBREU7U0FlSjtJQUNFLENBQUMsQ0FBQyxJQUFGLENBQU8scUJBQVA7SUFBOEIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFUO0lBQWlCLE1BQUEsUUFBQSxDQUFBLENBQUE7QUFDbkQsVUFBQSxHQUFBO0lBQUE7TUFBTSxLQUFBLEdBQVEsQ0FBQSxNQUFNLEdBQUEsQ0FBSSxDQUFKO0lBQU87UUFBQSxPQUFBLEVBQVM7TUFBVCxDQUFQLENBQU47YUFDUixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxDQUFmO3VDQUErQixDQUFFLGdCQUFqQztJQUY2QyxDQUFqQixDQUE5QixDQURGO0lBS0UsQ0FBQyxDQUFDLElBQUYsQ0FBTyxvQ0FBUDtJQUE2QyxDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQ7SUFBaUIsTUFBQSxRQUFBLENBQUEsQ0FBQTtBQUNsRSxVQUFBLFFBQUE7SUFBQSxHQUFBO0lBQUEsTUFBQTtJQUFBO01BQU0sTUFBQSxHQUFTO0FBQ1Q7OztNQUFBLHdCQUFBO1FBQ0UsTUFBTSxDQUFDLElBQVAsQ0FDRTtVQUFBLElBQUEsRUFBTSxLQUFLLENBQUMsSUFBWjtVQUNBLEtBQUEsRUFBTyxLQUFLLENBQUM7UUFEYixDQURGO01BREY7TUFLQSxRQUFBLEdBQVc7UUFDVDtVQUFBLElBQUEsRUFBTSxHQUFOO1VBQ0EsS0FBQSxFQUFPO1FBRFAsQ0FEUztRQUlUO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU87UUFEUCxDQUpTO1FBT1Q7VUFBQSxJQUFBLEVBQU0sR0FBTjtVQUNBLEtBQUEsRUFBTztRQURQLENBUFM7UUFVVDtVQUFBLElBQUEsRUFBTSxHQUFOO1VBQ0EsS0FBQSxFQUFPO1FBRFAsQ0FWUztRQWFUO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU87UUFEUCxDQWJTO1FBZ0JUO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU87UUFEUCxDQWhCUzs7YUFvQlgsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFULENBQW1CLFFBQW5CO0lBQTZCLE1BQTdCO0lBM0I0RCxDQUFqQixDQUE3QyxDQUxGOztBQXRDSzs7QUEwRVAsT0FBQTtFQUFTLElBQUEsVUFBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hY2hpbmUsICRlbmQsIHN0YXJ0LCBydW4gfSBmcm9tIFwiLi4vLi4vc3JjL2FzeW5jXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG5cbnRlc3QgPSAtPlxuICBSdW4gPSBcbiAgICBncm93OiAoIHRhbG9zICkgLT5cbiAgICAgIHRhbG9zLmNvbnRleHQucHJvZHVjdCAqPSBhd2FpdCAyXG5cbiAgQSA9IE1hY2hpbmUubWFrZVxuICAgIG5hbWU6IFwiQVwiXG4gICAgZ3JhcGg6XG4gICAgICBzdGFydDpcbiAgICAgICAgZGVmYXVsdDogXCJzZWNvbmRcIlxuICAgICAgc2Vjb25kOlxuICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICBydW46IFJ1bi5ncm93XG4gICAgICAgICAgbW92ZTogXCJ0aGlyZFwiXG4gICAgICB0aGlyZDogXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uZ3Jvd1xuICAgICAgICAgIG1vdmU6ICRlbmRcblxuICBSdW4uam9pbiA9ICggdGFsb3MgKSAtPlxuICAgIGZvciBhd2FpdCBpbm5lciBmcm9tIHN0YXJ0IEEsIHRhbG9zLmNvbnRleHRcbiAgICAgIHlpZWxkIGlubmVyXG5cbiAgQiA9IE1hY2hpbmUubWFrZSBcbiAgICBuYW1lOiBcIkJcIlxuICAgIGdyYXBoOlxuICAgICAgc3RhcnQ6XG4gICAgICAgIGRlZmF1bHQ6IFwiZmlyc3RcIiBcbiAgICAgIGZpcnN0OlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJ1bjogUnVuLmdyb3dcbiAgICAgICAgICBtb3ZlOiBcImpvaW5cIlxuICAgICAgam9pbjogXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uam9pblxuICAgICAgICAgIG1vdmU6ICRlbmRcblxuXG4gIFtcbiAgICBoLnRlc3QgXCJjb21wbGV0ZXMgb3BlcmF0aW9uXCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBhd2FpdCBydW4gQiwgcHJvZHVjdDogMVxuICAgICAgaC5hc3NlcnQuZXF1YWwgOCwgdGFsb3MuY29udGV4dD8ucHJvZHVjdFxuXG4gICAgaC50ZXN0IFwiZXhwb3NlcyBsb3dlciBvcmRlciB0YWxvcyBpbnN0YW5jZVwiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIHN0YXRlcyA9IFtdXG4gICAgICBmb3IgYXdhaXQgdGFsb3MgZnJvbSBzdGFydCBCLCBwcm9kdWN0OiAxXG4gICAgICAgIHN0YXRlcy5wdXNoXG4gICAgICAgICAgbmFtZTogdGFsb3MubmFtZVxuICAgICAgICAgIHN0YXRlOiB0YWxvcy5zdGF0ZVxuICAgIFxuICAgICAgZXhwZWN0ZWQgPSBbIFxuICAgICAgICBuYW1lOiBcIkJcIlxuICAgICAgICBzdGF0ZTogXCJmaXJzdFwiXG4gICAgICAsIFxuICAgICAgICBuYW1lOiBcIkJcIlxuICAgICAgICBzdGF0ZTogXCJqb2luXCJcbiAgICAgICwgXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiBcInNlY29uZFwiXG4gICAgICAsIFxuICAgICAgICBuYW1lOiBcIkFcIlxuICAgICAgICBzdGF0ZTogXCJ0aGlyZFwiXG4gICAgICAsXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiAkZW5kXG4gICAgICAsXG4gICAgICAgIG5hbWU6IFwiQlwiXG4gICAgICAgIHN0YXRlOiAkZW5kXG4gICAgICBdXG4gICAgICBcbiAgICAgIGguYXNzZXJ0LmRlZXBFcXVhbCBleHBlY3RlZCwgc3RhdGVzXG4gICAgICBcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIG5lc3RlZCB9Il19
 //# sourceURL=/@dashkite/talos/test/async/nested.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9hc3luYy9uZXN0ZWQuY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hY2hpbmUsICRlbmQsIHN0YXJ0LCBydW4gfSBmcm9tIFwiLi4vLi4vc3JjL2FzeW5jXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG5cbnRlc3QgPSAtPlxuICBSdW4gPSBcbiAgICBncm93OiAoIHRhbG9zICkgLT5cbiAgICAgIHRhbG9zLmNvbnRleHQucHJvZHVjdCAqPSBhd2FpdCAyXG5cbiAgQSA9IE1hY2hpbmUubWFrZVxuICAgIG5hbWU6IFwiQVwiXG4gICAgZ3JhcGg6XG4gICAgICBzdGFydDpcbiAgICAgICAgZGVmYXVsdDogXCJzZWNvbmRcIlxuICAgICAgc2Vjb25kOlxuICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICBydW46IFJ1bi5ncm93XG4gICAgICAgICAgbW92ZTogXCJ0aGlyZFwiXG4gICAgICB0aGlyZDogXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uZ3Jvd1xuICAgICAgICAgIG1vdmU6ICRlbmRcblxuICBSdW4uam9pbiA9ICggdGFsb3MgKSAtPlxuICAgIGZvciBhd2FpdCBpbm5lciBmcm9tIHN0YXJ0IEEsIHRhbG9zLmNvbnRleHRcbiAgICAgIHlpZWxkIGlubmVyXG5cbiAgQiA9IE1hY2hpbmUubWFrZSBcbiAgICBuYW1lOiBcIkJcIlxuICAgIGdyYXBoOlxuICAgICAgc3RhcnQ6XG4gICAgICAgIGRlZmF1bHQ6IFwiZmlyc3RcIiBcbiAgICAgIGZpcnN0OlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJ1bjogUnVuLmdyb3dcbiAgICAgICAgICBtb3ZlOiBcImpvaW5cIlxuICAgICAgam9pbjogXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uam9pblxuICAgICAgICAgIG1vdmU6ICRlbmRcblxuXG4gIFtcbiAgICBoLnRlc3QgXCJjb21wbGV0ZXMgb3BlcmF0aW9uXCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBhd2FpdCBydW4gQiwgcHJvZHVjdDogMVxuICAgICAgaC5hc3NlcnQuZXF1YWwgOCwgdGFsb3MuY29udGV4dD8ucHJvZHVjdFxuXG4gICAgaC50ZXN0IFwiZXhwb3NlcyBsb3dlciBvcmRlciB0YWxvcyBpbnN0YW5jZVwiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIHN0YXRlcyA9IFtdXG4gICAgICBmb3IgYXdhaXQgdGFsb3MgZnJvbSBzdGFydCBCLCBwcm9kdWN0OiAxXG4gICAgICAgIHN0YXRlcy5wdXNoXG4gICAgICAgICAgbmFtZTogdGFsb3MubmFtZVxuICAgICAgICAgIHN0YXRlOiB0YWxvcy5zdGF0ZVxuICAgIFxuICAgICAgZXhwZWN0ZWQgPSBbIFxuICAgICAgICBuYW1lOiBcIkJcIlxuICAgICAgICBzdGF0ZTogXCJmaXJzdFwiXG4gICAgICAsIFxuICAgICAgICBuYW1lOiBcIkJcIlxuICAgICAgICBzdGF0ZTogXCJqb2luXCJcbiAgICAgICwgXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiBcInNlY29uZFwiXG4gICAgICAsIFxuICAgICAgICBuYW1lOiBcIkFcIlxuICAgICAgICBzdGF0ZTogXCJ0aGlyZFwiXG4gICAgICAsXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiAkZW5kXG4gICAgICAsXG4gICAgICAgIG5hbWU6IFwiQlwiXG4gICAgICAgIHN0YXRlOiAkZW5kXG4gICAgICBdXG4gICAgICBcbiAgICAgIGguYXNzZXJ0LmRlZXBFcXVhbCBleHBlY3RlZCwgc3RhdGVzXG4gICAgICBcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIG5lc3RlZCB9IixudWxsXSwibmFtZXMiOlsibmVzdGVkIiwidGVzdCIsIkEiLCJCIiwiUnVuIiwiZ3JvdyIsInRhbG9zIiwiY29udGV4dCIsInByb2R1Y3QiLCJNYWNoaW5lIiwibWFrZSIsIm5hbWUiLCJncmFwaCIsInN0YXJ0IiwiZGVmYXVsdCIsInNlY29uZCIsInJ1biIsIm1vdmUiLCJ0aGlyZCIsIiRlbmQiLCJqb2luIiwiaW5uZXIiLCJyZWYiLCJyZXN1bHRzIiwiZmlyc3QiLCJoIiwidGFyZ2V0IiwiYXNzZXJ0IiwiZXF1YWwiLCJleHBlY3RlZCIsInN0YXRlcyIsInB1c2giLCJzdGF0ZSIsImRlZXBFcXVhbCJdLCJtYXBwaW5ncyI6Ijs7OzsrQkE4RVNBOzs7ZUFBQUM7Ozt1QkE5RVQ7aUVBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQSxJQUFBQTtBQUlBQSxPQUFPO0lBQ1AsSUFBQUMsR0FBQUMsR0FBQUM7SUFBRUEsTUFDRTtRQUFBQyxNQUFNLGVBQUVDLEtBQUY7bUJBQ0pBLE1BQU1DLE9BQU8sQ0FBQ0MsT0FBZCxJQUF5QixNQUFNO1FBRDNCO0lBQU47SUFHRk4sSUFBSU8sY0FBTyxDQUFDQyxJQUFSLENBQ0Y7UUFBQUMsTUFBTTtRQUNOQyxPQUNFO1lBQUFDLE9BQ0U7Z0JBQUFDLFNBQVM7WUFBVDtZQUNGQyxRQUNFO2dCQUFBRCxTQUNFO29CQUFBRSxLQUFLWixJQUFJQyxJQUFUO29CQUNBWSxNQUFNO2dCQUROO1lBREY7WUFHRkMsT0FDRTtnQkFBQUosU0FDRTtvQkFBQUUsS0FBS1osSUFBSUMsSUFBVDtvQkFDQVksTUFBTUUsV0FBQTtnQkFETjtZQURGO1FBUEY7SUFGRjtJQWFGZixJQUFJZ0IsSUFBSixHQUFXLGdCQUFFZCxLQUFGO1FBQ2IsSUFBQWUsT0FBQUMsS0FBQUM7UUFBSUQsTUFBQVQsSUFBQUEsWUFBQSxFQUFBWCxHQUFBSSxNQUFBQyxPQUFBO1FBQUFnQixVQUFBLEVBQUE7UUFBQSxXQUFBRixTQUFBQyxJQUFBO3lCQUNFLENBQUEsTUFBTUQsS0FBQTtRQURSOztJQURTO0lBSVhsQixJQUFJTSxjQUFPLENBQUNDLElBQVIsQ0FDRjtRQUFBQyxNQUFNO1FBQ05DLE9BQ0U7WUFBQUMsT0FDRTtnQkFBQUMsU0FBUztZQUFUO1lBQ0ZVLE9BQ0U7Z0JBQUFWLFNBQ0U7b0JBQUFFLEtBQUtaLElBQUlDLElBQVQ7b0JBQ0FZLE1BQU07Z0JBRE47WUFERjtZQUdGRyxNQUNFO2dCQUFBTixTQUNFO29CQUFBRSxLQUFLWixJQUFJZ0IsSUFBVDtvQkFDQUgsTUFBTUUsV0FBQTtnQkFETjtZQURGO1FBUEY7SUFGRjtXQWNGO1FBQ0VNLFNBQUV4QixJQUFGLENBQU8sdUJBQXVCd0IsU0FBRUMsTUFBRixDQUFTLFFBQVE7WUFDbkQsSUFBQUosS0FBQWhCO1lBQU1BLFFBQVEsTUFBTVUsSUFBQUEsVUFBQSxFQUFJYixHQUFHO2dCQUFBSyxTQUFTO1lBQVQ7bUJBQ3JCaUIsU0FBRUUsTUFBTSxDQUFDQyxLQUFULENBQWUsdUNBQWtCcEIsT0FBQSxHQUFBLEtBQUE7UUFGWTtRQUkvQ2lCLFNBQUV4QixJQUFGLENBQU8sc0NBQXNDd0IsU0FBRUMsTUFBRixDQUFTLFFBQVE7WUFDbEUsSUFBQUcsVUFBQVAsS0FBQVEsUUFBQXhCO1lBQU13QixTQUFTLEVBQUE7WUFDVFIsTUFBQVQsSUFBQUEsWUFBQSxFQUFBVixHQUFBOzs7WUFBQSxXQUFBRyxTQUFBZ0IsSUFBQTtnQkFDRVEsT0FBT0MsSUFBUCxDQUNFO29CQUFBcEIsTUFBTUwsTUFBTUssSUFBWjtvQkFDQXFCLE9BQU8xQixNQUFNMEIsS0FBQTtnQkFEYjtZQUZKO1lBS0FILFdBQVc7Z0JBQ1Q7b0JBQUFsQixNQUFNO29CQUNOcUIsT0FBTztnQkFEUDtnQkFHQTtvQkFBQXJCLE1BQU07b0JBQ05xQixPQUFPO2dCQURQO2dCQUdBO29CQUFBckIsTUFBTTtvQkFDTnFCLE9BQU87Z0JBRFA7Z0JBR0E7b0JBQUFyQixNQUFNO29CQUNOcUIsT0FBTztnQkFEUDtnQkFHQTtvQkFBQXJCLE1BQU07b0JBQ05xQixPQUFPYixXQUFBO2dCQURQO2dCQUdBO29CQUFBUixNQUFNO29CQUNOcUIsT0FBT2IsV0FBQTtnQkFEUDs7bUJBSUZNLFNBQUVFLE1BQU0sQ0FBQ00sU0FBVCxDQUFtQkosVUFBVUM7UUEzQitCOztBQTNDM0QifQ==