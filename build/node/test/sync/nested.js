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
const _sync = require("../../src/sync");
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
    var newObj = {
        __proto__: null
    };
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
        grow: function(talos) {
            return talos.context.product *= 2;
        }
    };
    A = _sync.Machine.make({
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
                    move: _sync.$end
                }
            }
        }
    });
    Run.join = function*(talos) {
        var inner, ref, results;
        ref = (0, _sync.start)(A, talos.context);
        results = [];
        for (inner of ref){
            results.push((yield inner));
        }
        return results;
    };
    B = _sync.Machine.make({
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
                    move: _sync.$end
                }
            }
        }
    });
    return [
        _helpers.test("completes operation", _helpers.target("sync", function() {
            var ref, talos;
            talos = (0, _sync.run)(B, {
                product: 1
            });
            return _helpers.assert.equal(8, (ref = talos.context) != null ? ref.product : void 0);
        })),
        _helpers.test("exposes lower order talos instance", _helpers.target("sync", function() {
            var expected, ref, states, talos;
            states = [];
            ref = (0, _sync.start)(B, {
                product: 1
            });
            for (talos of ref){
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
                    state: _sync.$end
                },
                {
                    name: "B",
                    state: _sync.$end
                }
            ];
            return _helpers.assert.deepEqual(expected, states);
        }))
    ];
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L3N5bmMvbmVzdGVkLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxPQUFUO0VBQWtCLElBQWxCO0VBQXdCLEtBQXhCO0VBQStCLEdBQS9CO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUdBLElBQUEsR0FBTyxRQUFBLENBQUEsQ0FBQTtBQUNQLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtFQUFFLEdBQUEsR0FDRTtJQUFBLElBQUEsRUFBTSxRQUFBLENBQUUsS0FBRixDQUFBO2FBQ0osS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFkLElBQXlCO0lBRHJCO0VBQU47RUFHRixDQUFBLEdBQUksT0FBTyxDQUFDLElBQVIsQ0FDRjtJQUFBLElBQUEsRUFBTSxHQUFOO0lBQ0EsS0FBQSxFQUNFO01BQUEsS0FBQSxFQUNFO1FBQUEsT0FBQSxFQUFTO01BQVQsQ0FERjtNQUVBLE1BQUEsRUFDRTtRQUFBLE9BQUEsRUFDRTtVQUFBLEdBQUEsRUFBSyxHQUFHLENBQUMsSUFBVDtVQUNBLElBQUEsRUFBTTtRQUROO01BREYsQ0FIRjtNQU1BLEtBQUEsRUFDRTtRQUFBLE9BQUEsRUFDRTtVQUFBLEdBQUEsRUFBSyxHQUFHLENBQUMsSUFBVDtVQUNBLElBQUEsRUFBTTtRQUROO01BREY7SUFQRjtFQUZGLENBREU7RUFjSixHQUFHLENBQUMsSUFBSixHQUFXLFNBQUEsQ0FBRSxLQUFGLENBQUE7QUFDYixRQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUE7QUFBSTtBQUFBO0lBQUEsS0FBQSxZQUFBO21CQUNFLENBQUEsTUFBTSxLQUFOO0lBREYsQ0FBQTs7RUFEUztFQUlYLENBQUEsR0FBSSxPQUFPLENBQUMsSUFBUixDQUNGO0lBQUEsSUFBQSxFQUFNLEdBQU47SUFDQSxLQUFBLEVBQ0U7TUFBQSxLQUFBLEVBQ0U7UUFBQSxPQUFBLEVBQVM7TUFBVCxDQURGO01BRUEsS0FBQSxFQUNFO1FBQUEsT0FBQSxFQUNFO1VBQUEsR0FBQSxFQUFLLEdBQUcsQ0FBQyxJQUFUO1VBQ0EsSUFBQSxFQUFNO1FBRE47TUFERixDQUhGO01BTUEsSUFBQSxFQUNFO1FBQUEsT0FBQSxFQUNFO1VBQUEsR0FBQSxFQUFLLEdBQUcsQ0FBQyxJQUFUO1VBQ0EsSUFBQSxFQUFNO1FBRE47TUFERjtJQVBGO0VBRkYsQ0FERTtTQWVKO0lBQ0UsQ0FBQyxDQUFDLElBQUYsQ0FBTyxxQkFBUDtJQUE4QixDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQ7SUFBaUIsUUFBQSxDQUFBLENBQUE7QUFDbkQsVUFBQSxHQUFBO0lBQUE7TUFBTSxLQUFBLEdBQVEsR0FBQSxDQUFJLENBQUo7SUFBTztRQUFBLE9BQUEsRUFBUztNQUFULENBQVA7YUFDUixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxDQUFmO3VDQUErQixDQUFFLGdCQUFqQztJQUY2QyxDQUFqQixDQUE5QixDQURGO0lBS0UsQ0FBQyxDQUFDLElBQUYsQ0FBTyxvQ0FBUDtJQUE2QyxDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQ7SUFBaUIsUUFBQSxDQUFBLENBQUE7QUFDbEUsVUFBQSxRQUFBO0lBQUEsR0FBQTtJQUFBLE1BQUE7SUFBQTtNQUFNLE1BQUEsR0FBUztBQUNUOzs7TUFBQSxLQUFBLFlBQUE7UUFDRSxNQUFNLENBQUMsSUFBUCxDQUNFO1VBQUEsSUFBQSxFQUFNLEtBQUssQ0FBQyxJQUFaO1VBQ0EsS0FBQSxFQUFPLEtBQUssQ0FBQztRQURiLENBREY7TUFERjtNQUtBLFFBQUEsR0FBVztRQUNUO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU87UUFEUCxDQURTO1FBSVQ7VUFBQSxJQUFBLEVBQU0sR0FBTjtVQUNBLEtBQUEsRUFBTztRQURQLENBSlM7UUFPVDtVQUFBLElBQUEsRUFBTSxHQUFOO1VBQ0EsS0FBQSxFQUFPO1FBRFAsQ0FQUztRQVVUO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU87UUFEUCxDQVZTO1FBYVQ7VUFBQSxJQUFBLEVBQU0sR0FBTjtVQUNBLEtBQUEsRUFBTztRQURQLENBYlM7UUFnQlQ7VUFBQSxJQUFBLEVBQU0sR0FBTjtVQUNBLEtBQUEsRUFBTztRQURQLENBaEJTOzthQW9CWCxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVQsQ0FBbUIsUUFBbkI7SUFBNkIsTUFBN0I7SUEzQjRELENBQWpCLENBQTdDLENBTEY7O0FBdENLOztBQTBFUCxPQUFBO0VBQVMsSUFBQSxVQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFjaGluZSwgJGVuZCwgc3RhcnQsIHJ1biB9IGZyb20gXCIuLi8uLi9zcmMvc3luY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxuXG50ZXN0ID0gLT5cbiAgUnVuID0gXG4gICAgZ3JvdzogKCB0YWxvcyApIC0+XG4gICAgICB0YWxvcy5jb250ZXh0LnByb2R1Y3QgKj0gMlxuXG4gIEEgPSBNYWNoaW5lLm1ha2UgXG4gICAgbmFtZTogXCJBXCJcbiAgICBncmFwaDpcbiAgICAgIHN0YXJ0OlxuICAgICAgICBkZWZhdWx0OiBcInNlY29uZFwiXG4gICAgICBzZWNvbmQ6XG4gICAgICAgIGRlZmF1bHQ6IFxuICAgICAgICAgIHJ1bjogUnVuLmdyb3dcbiAgICAgICAgICBtb3ZlOiBcInRoaXJkXCJcbiAgICAgIHRoaXJkOiBcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBydW46IFJ1bi5ncm93XG4gICAgICAgICAgbW92ZTogJGVuZFxuXG4gIFJ1bi5qb2luID0gKCB0YWxvcyApIC0+XG4gICAgZm9yIGlubmVyIGZyb20gc3RhcnQgQSwgdGFsb3MuY29udGV4dFxuICAgICAgeWllbGQgaW5uZXJcblxuICBCID0gTWFjaGluZS5tYWtlIFxuICAgIG5hbWU6IFwiQlwiXG4gICAgZ3JhcGg6XG4gICAgICBzdGFydDpcbiAgICAgICAgZGVmYXVsdDogXCJmaXJzdFwiIFxuICAgICAgZmlyc3Q6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uZ3Jvd1xuICAgICAgICAgIG1vdmU6IFwiam9pblwiXG4gICAgICBqb2luOiBcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBydW46IFJ1bi5qb2luXG4gICAgICAgICAgbW92ZTogJGVuZFxuXG5cbiAgW1xuICAgIGgudGVzdCBcImNvbXBsZXRlcyBvcGVyYXRpb25cIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IHJ1biBCLCBwcm9kdWN0OiAxXG4gICAgICBoLmFzc2VydC5lcXVhbCA4LCB0YWxvcy5jb250ZXh0Py5wcm9kdWN0XG5cbiAgICBoLnRlc3QgXCJleHBvc2VzIGxvd2VyIG9yZGVyIHRhbG9zIGluc3RhbmNlXCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgc3RhdGVzID0gW11cbiAgICAgIGZvciB0YWxvcyBmcm9tIHN0YXJ0IEIsIHByb2R1Y3Q6IDFcbiAgICAgICAgc3RhdGVzLnB1c2hcbiAgICAgICAgICBuYW1lOiB0YWxvcy5uYW1lXG4gICAgICAgICAgc3RhdGU6IHRhbG9zLnN0YXRlXG4gICAgXG4gICAgICBleHBlY3RlZCA9IFsgXG4gICAgICAgIG5hbWU6IFwiQlwiXG4gICAgICAgIHN0YXRlOiBcImZpcnN0XCJcbiAgICAgICwgXG4gICAgICAgIG5hbWU6IFwiQlwiXG4gICAgICAgIHN0YXRlOiBcImpvaW5cIlxuICAgICAgLCBcbiAgICAgICAgbmFtZTogXCJBXCJcbiAgICAgICAgc3RhdGU6IFwic2Vjb25kXCJcbiAgICAgICwgXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiBcInRoaXJkXCJcbiAgICAgICxcbiAgICAgICAgbmFtZTogXCJBXCJcbiAgICAgICAgc3RhdGU6ICRlbmRcbiAgICAgICxcbiAgICAgICAgbmFtZTogXCJCXCJcbiAgICAgICAgc3RhdGU6ICRlbmRcbiAgICAgIF1cbiAgICAgIFxuICAgICAgaC5hc3NlcnQuZGVlcEVxdWFsIGV4cGVjdGVkLCBzdGF0ZXNcbiAgICAgIFxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgbmVzdGVkIH0iXX0=
 //# sourceURL=/@dashkite/talos/test/sync/nested.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9zeW5jL25lc3RlZC5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFjaGluZSwgJGVuZCwgc3RhcnQsIHJ1biB9IGZyb20gXCIuLi8uLi9zcmMvc3luY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxuXG50ZXN0ID0gLT5cbiAgUnVuID0gXG4gICAgZ3JvdzogKCB0YWxvcyApIC0+XG4gICAgICB0YWxvcy5jb250ZXh0LnByb2R1Y3QgKj0gMlxuXG4gIEEgPSBNYWNoaW5lLm1ha2UgXG4gICAgbmFtZTogXCJBXCJcbiAgICBncmFwaDpcbiAgICAgIHN0YXJ0OlxuICAgICAgICBkZWZhdWx0OiBcInNlY29uZFwiXG4gICAgICBzZWNvbmQ6XG4gICAgICAgIGRlZmF1bHQ6IFxuICAgICAgICAgIHJ1bjogUnVuLmdyb3dcbiAgICAgICAgICBtb3ZlOiBcInRoaXJkXCJcbiAgICAgIHRoaXJkOiBcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBydW46IFJ1bi5ncm93XG4gICAgICAgICAgbW92ZTogJGVuZFxuXG4gIFJ1bi5qb2luID0gKCB0YWxvcyApIC0+XG4gICAgZm9yIGlubmVyIGZyb20gc3RhcnQgQSwgdGFsb3MuY29udGV4dFxuICAgICAgeWllbGQgaW5uZXJcblxuICBCID0gTWFjaGluZS5tYWtlIFxuICAgIG5hbWU6IFwiQlwiXG4gICAgZ3JhcGg6XG4gICAgICBzdGFydDpcbiAgICAgICAgZGVmYXVsdDogXCJmaXJzdFwiIFxuICAgICAgZmlyc3Q6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uZ3Jvd1xuICAgICAgICAgIG1vdmU6IFwiam9pblwiXG4gICAgICBqb2luOiBcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBydW46IFJ1bi5qb2luXG4gICAgICAgICAgbW92ZTogJGVuZFxuXG5cbiAgW1xuICAgIGgudGVzdCBcImNvbXBsZXRlcyBvcGVyYXRpb25cIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IHJ1biBCLCBwcm9kdWN0OiAxXG4gICAgICBoLmFzc2VydC5lcXVhbCA4LCB0YWxvcy5jb250ZXh0Py5wcm9kdWN0XG5cbiAgICBoLnRlc3QgXCJleHBvc2VzIGxvd2VyIG9yZGVyIHRhbG9zIGluc3RhbmNlXCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgc3RhdGVzID0gW11cbiAgICAgIGZvciB0YWxvcyBmcm9tIHN0YXJ0IEIsIHByb2R1Y3Q6IDFcbiAgICAgICAgc3RhdGVzLnB1c2hcbiAgICAgICAgICBuYW1lOiB0YWxvcy5uYW1lXG4gICAgICAgICAgc3RhdGU6IHRhbG9zLnN0YXRlXG4gICAgXG4gICAgICBleHBlY3RlZCA9IFsgXG4gICAgICAgIG5hbWU6IFwiQlwiXG4gICAgICAgIHN0YXRlOiBcImZpcnN0XCJcbiAgICAgICwgXG4gICAgICAgIG5hbWU6IFwiQlwiXG4gICAgICAgIHN0YXRlOiBcImpvaW5cIlxuICAgICAgLCBcbiAgICAgICAgbmFtZTogXCJBXCJcbiAgICAgICAgc3RhdGU6IFwic2Vjb25kXCJcbiAgICAgICwgXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiBcInRoaXJkXCJcbiAgICAgICxcbiAgICAgICAgbmFtZTogXCJBXCJcbiAgICAgICAgc3RhdGU6ICRlbmRcbiAgICAgICxcbiAgICAgICAgbmFtZTogXCJCXCJcbiAgICAgICAgc3RhdGU6ICRlbmRcbiAgICAgIF1cbiAgICAgIFxuICAgICAgaC5hc3NlcnQuZGVlcEVxdWFsIGV4cGVjdGVkLCBzdGF0ZXNcbiAgICAgIFxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgbmVzdGVkIH0iXSwibmFtZXMiOlsibmVzdGVkIiwidGVzdCIsIkEiLCJCIiwiUnVuIiwiZ3JvdyIsInRhbG9zIiwiY29udGV4dCIsInByb2R1Y3QiLCJNYWNoaW5lIiwibWFrZSIsIm5hbWUiLCJncmFwaCIsInN0YXJ0IiwiZGVmYXVsdCIsInNlY29uZCIsInJ1biIsIm1vdmUiLCJ0aGlyZCIsIiRlbmQiLCJqb2luIiwiaW5uZXIiLCJyZWYiLCJyZXN1bHRzIiwiZmlyc3QiLCJoIiwidGFyZ2V0IiwiYXNzZXJ0IiwiZXF1YWwiLCJleHBlY3RlZCIsInN0YXRlcyIsInB1c2giLCJzdGF0ZSIsImRlZXBFcXVhbCJdLCJtYXBwaW5ncyI6Ijs7OzsrQkE4RVNBOzs7ZUFBQUM7OztzQkE5RVQ7aUVBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQURBLElBQUFBO0FBSUFBLE9BQU87SUFDUCxJQUFBQyxHQUFBQyxHQUFBQztJQUFFQSxNQUNFO1FBQUFDLE1BQU0sU0FBRUMsS0FBRjttQkFDSkEsTUFBTUMsT0FBTyxDQUFDQyxPQUFkLElBQXlCO1FBRHJCO0lBQU47SUFHRk4sSUFBSU8sYUFBTyxDQUFDQyxJQUFSLENBQ0Y7UUFBQUMsTUFBTTtRQUNOQyxPQUNFO1lBQUFDLE9BQ0U7Z0JBQUFDLFNBQVM7WUFBVDtZQUNGQyxRQUNFO2dCQUFBRCxTQUNFO29CQUFBRSxLQUFLWixJQUFJQyxJQUFUO29CQUNBWSxNQUFNO2dCQUROO1lBREY7WUFHRkMsT0FDRTtnQkFBQUosU0FDRTtvQkFBQUUsS0FBS1osSUFBSUMsSUFBVDtvQkFDQVksTUFBTUUsVUFBQTtnQkFETjtZQURGO1FBUEY7SUFGRjtJQWFGZixJQUFJZ0IsSUFBSixHQUFXLFVBQUVkLEtBQUY7UUFDYixJQUFBZSxPQUFBQyxLQUFBQztRQUFJRCxNQUFBVCxJQUFBQSxXQUFBLEVBQUFYLEdBQUFJLE1BQUFDLE9BQUE7UUFBQWdCLFVBQUEsRUFBQTtRQUFBLEtBQUFGLFNBQUFDLElBQUE7eUJBQ0UsQ0FBQSxNQUFNRCxLQUFBO1FBRFI7O0lBRFM7SUFJWGxCLElBQUlNLGFBQU8sQ0FBQ0MsSUFBUixDQUNGO1FBQUFDLE1BQU07UUFDTkMsT0FDRTtZQUFBQyxPQUNFO2dCQUFBQyxTQUFTO1lBQVQ7WUFDRlUsT0FDRTtnQkFBQVYsU0FDRTtvQkFBQUUsS0FBS1osSUFBSUMsSUFBVDtvQkFDQVksTUFBTTtnQkFETjtZQURGO1lBR0ZHLE1BQ0U7Z0JBQUFOLFNBQ0U7b0JBQUFFLEtBQUtaLElBQUlnQixJQUFUO29CQUNBSCxNQUFNRSxVQUFBO2dCQUROO1lBREY7UUFQRjtJQUZGO1dBY0Y7UUFDRU0sU0FBRXhCLElBQUYsQ0FBTyx1QkFBdUJ3QixTQUFFQyxNQUFGLENBQVMsUUFBUTtZQUNuRCxJQUFBSixLQUFBaEI7WUFBTUEsUUFBUVUsSUFBQUEsU0FBQSxFQUFJYixHQUFHO2dCQUFBSyxTQUFTO1lBQVQ7bUJBQ2ZpQixTQUFFRSxNQUFNLENBQUNDLEtBQVQsQ0FBZSx1Q0FBa0JwQixPQUFBLEdBQUEsS0FBQTtRQUZZO1FBSS9DaUIsU0FBRXhCLElBQUYsQ0FBTyxzQ0FBc0N3QixTQUFFQyxNQUFGLENBQVMsUUFBUTtZQUNsRSxJQUFBRyxVQUFBUCxLQUFBUSxRQUFBeEI7WUFBTXdCLFNBQVMsRUFBQTtZQUNUUixNQUFBVCxJQUFBQSxXQUFBLEVBQUFWLEdBQUE7OztZQUFBLEtBQUFHLFNBQUFnQixJQUFBO2dCQUNFUSxPQUFPQyxJQUFQLENBQ0U7b0JBQUFwQixNQUFNTCxNQUFNSyxJQUFaO29CQUNBcUIsT0FBTzFCLE1BQU0wQixLQUFBO2dCQURiO1lBRko7WUFLQUgsV0FBVztnQkFDVDtvQkFBQWxCLE1BQU07b0JBQ05xQixPQUFPO2dCQURQO2dCQUdBO29CQUFBckIsTUFBTTtvQkFDTnFCLE9BQU87Z0JBRFA7Z0JBR0E7b0JBQUFyQixNQUFNO29CQUNOcUIsT0FBTztnQkFEUDtnQkFHQTtvQkFBQXJCLE1BQU07b0JBQ05xQixPQUFPO2dCQURQO2dCQUdBO29CQUFBckIsTUFBTTtvQkFDTnFCLE9BQU9iLFVBQUE7Z0JBRFA7Z0JBR0E7b0JBQUFSLE1BQU07b0JBQ05xQixPQUFPYixVQUFBO2dCQURQOzttQkFJRk0sU0FBRUUsTUFBTSxDQUFDTSxTQUFULENBQW1CSixVQUFVQztRQTNCK0I7O0FBM0MzRCJ9