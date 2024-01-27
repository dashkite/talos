var test;
import { Machine, $end, start, run } from "../../src/sync";
import * as h from "../helpers";
test = function() {
    var A, B, Run;
    Run = {
        grow: function(talos) {
            return talos.context.product *= 2;
        }
    };
    A = Machine.make({
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
                    move: $end
                }
            }
        }
    });
    Run.join = function*(talos) {
        var inner, ref, results;
        ref = start(A, talos.context);
        results = [];
        for (inner of ref){
            results.push((yield inner));
        }
        return results;
    };
    B = Machine.make({
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
                    move: $end
                }
            }
        }
    });
    return [
        h.test("completes operation", h.target("sync", function() {
            var ref, talos;
            talos = run(B, {
                product: 1
            });
            return h.assert.equal(8, (ref = talos.context) != null ? ref.product : void 0);
        })),
        h.test("exposes lower order talos instance", h.target("sync", function() {
            var expected, ref, states, talos;
            states = [];
            ref = start(B, {
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
                    state: $end
                },
                {
                    name: "B",
                    state: $end
                }
            ];
            return h.assert.deepEqual(expected, states);
        }))
    ];
};
export { test as nested }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdC9zeW5jL25lc3RlZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsT0FBVDtFQUFrQixJQUFsQjtFQUF3QixLQUF4QjtFQUErQixHQUEvQjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLEtBQVAsTUFBQTs7QUFHQSxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7QUFDUCxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7RUFBRSxHQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sUUFBQSxDQUFFLEtBQUYsQ0FBQTthQUNKLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZCxJQUF5QjtJQURyQjtFQUFOO0VBR0YsQ0FBQSxHQUFJLE9BQU8sQ0FBQyxJQUFSLENBQ0Y7SUFBQSxJQUFBLEVBQU0sR0FBTjtJQUNBLEtBQUEsRUFDRTtNQUFBLEtBQUEsRUFDRTtRQUFBLE9BQUEsRUFBUztNQUFULENBREY7TUFFQSxNQUFBLEVBQ0U7UUFBQSxPQUFBLEVBQ0U7VUFBQSxHQUFBLEVBQUssR0FBRyxDQUFDLElBQVQ7VUFDQSxJQUFBLEVBQU07UUFETjtNQURGLENBSEY7TUFNQSxLQUFBLEVBQ0U7UUFBQSxPQUFBLEVBQ0U7VUFBQSxHQUFBLEVBQUssR0FBRyxDQUFDLElBQVQ7VUFDQSxJQUFBLEVBQU07UUFETjtNQURGO0lBUEY7RUFGRixDQURFO0VBY0osR0FBRyxDQUFDLElBQUosR0FBVyxTQUFBLENBQUUsS0FBRixDQUFBO0FBQ2IsUUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUk7QUFBQTtJQUFBLEtBQUEsWUFBQTttQkFDRSxDQUFBLE1BQU0sS0FBTjtJQURGLENBQUE7O0VBRFM7RUFJWCxDQUFBLEdBQUksT0FBTyxDQUFDLElBQVIsQ0FDRjtJQUFBLElBQUEsRUFBTSxHQUFOO0lBQ0EsS0FBQSxFQUNFO01BQUEsS0FBQSxFQUNFO1FBQUEsT0FBQSxFQUFTO01BQVQsQ0FERjtNQUVBLEtBQUEsRUFDRTtRQUFBLE9BQUEsRUFDRTtVQUFBLEdBQUEsRUFBSyxHQUFHLENBQUMsSUFBVDtVQUNBLElBQUEsRUFBTTtRQUROO01BREYsQ0FIRjtNQU1BLElBQUEsRUFDRTtRQUFBLE9BQUEsRUFDRTtVQUFBLEdBQUEsRUFBSyxHQUFHLENBQUMsSUFBVDtVQUNBLElBQUEsRUFBTTtRQUROO01BREY7SUFQRjtFQUZGLENBREU7U0FlSjtJQUNFLENBQUMsQ0FBQyxJQUFGLENBQU8scUJBQVA7SUFBOEIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFUO0lBQWlCLFFBQUEsQ0FBQSxDQUFBO0FBQ25ELFVBQUEsR0FBQTtJQUFBO01BQU0sS0FBQSxHQUFRLEdBQUEsQ0FBSSxDQUFKO0lBQU87UUFBQSxPQUFBLEVBQVM7TUFBVCxDQUFQO2FBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsQ0FBZjt1Q0FBK0IsQ0FBRSxnQkFBakM7SUFGNkMsQ0FBakIsQ0FBOUIsQ0FERjtJQUtFLENBQUMsQ0FBQyxJQUFGLENBQU8sb0NBQVA7SUFBNkMsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFUO0lBQWlCLFFBQUEsQ0FBQSxDQUFBO0FBQ2xFLFVBQUEsUUFBQTtJQUFBLEdBQUE7SUFBQSxNQUFBO0lBQUE7TUFBTSxNQUFBLEdBQVM7QUFDVDs7O01BQUEsS0FBQSxZQUFBO1FBQ0UsTUFBTSxDQUFDLElBQVAsQ0FDRTtVQUFBLElBQUEsRUFBTSxLQUFLLENBQUMsSUFBWjtVQUNBLEtBQUEsRUFBTyxLQUFLLENBQUM7UUFEYixDQURGO01BREY7TUFLQSxRQUFBLEdBQVc7UUFDVDtVQUFBLElBQUEsRUFBTSxHQUFOO1VBQ0EsS0FBQSxFQUFPO1FBRFAsQ0FEUztRQUlUO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU87UUFEUCxDQUpTO1FBT1Q7VUFBQSxJQUFBLEVBQU0sR0FBTjtVQUNBLEtBQUEsRUFBTztRQURQLENBUFM7UUFVVDtVQUFBLElBQUEsRUFBTSxHQUFOO1VBQ0EsS0FBQSxFQUFPO1FBRFAsQ0FWUztRQWFUO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU87UUFEUCxDQWJTO1FBZ0JUO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU87UUFEUCxDQWhCUzs7YUFvQlgsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFULENBQW1CLFFBQW5CO0lBQTZCLE1BQTdCO0lBM0I0RCxDQUFqQixDQUE3QyxDQUxGOztBQXRDSzs7QUEwRVAsT0FBQTtFQUFTLElBQUEsVUFBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hY2hpbmUsICRlbmQsIHN0YXJ0LCBydW4gfSBmcm9tIFwiLi4vLi4vc3JjL3N5bmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cblxudGVzdCA9IC0+XG4gIFJ1biA9IFxuICAgIGdyb3c6ICggdGFsb3MgKSAtPlxuICAgICAgdGFsb3MuY29udGV4dC5wcm9kdWN0ICo9IDJcblxuICBBID0gTWFjaGluZS5tYWtlIFxuICAgIG5hbWU6IFwiQVwiXG4gICAgZ3JhcGg6XG4gICAgICBzdGFydDpcbiAgICAgICAgZGVmYXVsdDogXCJzZWNvbmRcIlxuICAgICAgc2Vjb25kOlxuICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICBydW46IFJ1bi5ncm93XG4gICAgICAgICAgbW92ZTogXCJ0aGlyZFwiXG4gICAgICB0aGlyZDogXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uZ3Jvd1xuICAgICAgICAgIG1vdmU6ICRlbmRcblxuICBSdW4uam9pbiA9ICggdGFsb3MgKSAtPlxuICAgIGZvciBpbm5lciBmcm9tIHN0YXJ0IEEsIHRhbG9zLmNvbnRleHRcbiAgICAgIHlpZWxkIGlubmVyXG5cbiAgQiA9IE1hY2hpbmUubWFrZSBcbiAgICBuYW1lOiBcIkJcIlxuICAgIGdyYXBoOlxuICAgICAgc3RhcnQ6XG4gICAgICAgIGRlZmF1bHQ6IFwiZmlyc3RcIiBcbiAgICAgIGZpcnN0OlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJ1bjogUnVuLmdyb3dcbiAgICAgICAgICBtb3ZlOiBcImpvaW5cIlxuICAgICAgam9pbjogXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uam9pblxuICAgICAgICAgIG1vdmU6ICRlbmRcblxuXG4gIFtcbiAgICBoLnRlc3QgXCJjb21wbGV0ZXMgb3BlcmF0aW9uXCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBydW4gQiwgcHJvZHVjdDogMVxuICAgICAgaC5hc3NlcnQuZXF1YWwgOCwgdGFsb3MuY29udGV4dD8ucHJvZHVjdFxuXG4gICAgaC50ZXN0IFwiZXhwb3NlcyBsb3dlciBvcmRlciB0YWxvcyBpbnN0YW5jZVwiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIHN0YXRlcyA9IFtdXG4gICAgICBmb3IgdGFsb3MgZnJvbSBzdGFydCBCLCBwcm9kdWN0OiAxXG4gICAgICAgIHN0YXRlcy5wdXNoXG4gICAgICAgICAgbmFtZTogdGFsb3MubmFtZVxuICAgICAgICAgIHN0YXRlOiB0YWxvcy5zdGF0ZVxuICAgIFxuICAgICAgZXhwZWN0ZWQgPSBbIFxuICAgICAgICBuYW1lOiBcIkJcIlxuICAgICAgICBzdGF0ZTogXCJmaXJzdFwiXG4gICAgICAsIFxuICAgICAgICBuYW1lOiBcIkJcIlxuICAgICAgICBzdGF0ZTogXCJqb2luXCJcbiAgICAgICwgXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiBcInNlY29uZFwiXG4gICAgICAsIFxuICAgICAgICBuYW1lOiBcIkFcIlxuICAgICAgICBzdGF0ZTogXCJ0aGlyZFwiXG4gICAgICAsXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiAkZW5kXG4gICAgICAsXG4gICAgICAgIG5hbWU6IFwiQlwiXG4gICAgICAgIHN0YXRlOiAkZW5kXG4gICAgICBdXG4gICAgICBcbiAgICAgIGguYXNzZXJ0LmRlZXBFcXVhbCBleHBlY3RlZCwgc3RhdGVzXG4gICAgICBcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIG5lc3RlZCB9Il19
 //# sourceURL=test/sync/nested.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc3luYy9uZXN0ZWQuY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hY2hpbmUsICRlbmQsIHN0YXJ0LCBydW4gfSBmcm9tIFwiLi4vLi4vc3JjL3N5bmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cblxudGVzdCA9IC0+XG4gIFJ1biA9IFxuICAgIGdyb3c6ICggdGFsb3MgKSAtPlxuICAgICAgdGFsb3MuY29udGV4dC5wcm9kdWN0ICo9IDJcblxuICBBID0gTWFjaGluZS5tYWtlIFxuICAgIG5hbWU6IFwiQVwiXG4gICAgZ3JhcGg6XG4gICAgICBzdGFydDpcbiAgICAgICAgZGVmYXVsdDogXCJzZWNvbmRcIlxuICAgICAgc2Vjb25kOlxuICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICBydW46IFJ1bi5ncm93XG4gICAgICAgICAgbW92ZTogXCJ0aGlyZFwiXG4gICAgICB0aGlyZDogXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uZ3Jvd1xuICAgICAgICAgIG1vdmU6ICRlbmRcblxuICBSdW4uam9pbiA9ICggdGFsb3MgKSAtPlxuICAgIGZvciBpbm5lciBmcm9tIHN0YXJ0IEEsIHRhbG9zLmNvbnRleHRcbiAgICAgIHlpZWxkIGlubmVyXG5cbiAgQiA9IE1hY2hpbmUubWFrZSBcbiAgICBuYW1lOiBcIkJcIlxuICAgIGdyYXBoOlxuICAgICAgc3RhcnQ6XG4gICAgICAgIGRlZmF1bHQ6IFwiZmlyc3RcIiBcbiAgICAgIGZpcnN0OlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJ1bjogUnVuLmdyb3dcbiAgICAgICAgICBtb3ZlOiBcImpvaW5cIlxuICAgICAgam9pbjogXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcnVuOiBSdW4uam9pblxuICAgICAgICAgIG1vdmU6ICRlbmRcblxuXG4gIFtcbiAgICBoLnRlc3QgXCJjb21wbGV0ZXMgb3BlcmF0aW9uXCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBydW4gQiwgcHJvZHVjdDogMVxuICAgICAgaC5hc3NlcnQuZXF1YWwgOCwgdGFsb3MuY29udGV4dD8ucHJvZHVjdFxuXG4gICAgaC50ZXN0IFwiZXhwb3NlcyBsb3dlciBvcmRlciB0YWxvcyBpbnN0YW5jZVwiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIHN0YXRlcyA9IFtdXG4gICAgICBmb3IgdGFsb3MgZnJvbSBzdGFydCBCLCBwcm9kdWN0OiAxXG4gICAgICAgIHN0YXRlcy5wdXNoXG4gICAgICAgICAgbmFtZTogdGFsb3MubmFtZVxuICAgICAgICAgIHN0YXRlOiB0YWxvcy5zdGF0ZVxuICAgIFxuICAgICAgZXhwZWN0ZWQgPSBbIFxuICAgICAgICBuYW1lOiBcIkJcIlxuICAgICAgICBzdGF0ZTogXCJmaXJzdFwiXG4gICAgICAsIFxuICAgICAgICBuYW1lOiBcIkJcIlxuICAgICAgICBzdGF0ZTogXCJqb2luXCJcbiAgICAgICwgXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiBcInNlY29uZFwiXG4gICAgICAsIFxuICAgICAgICBuYW1lOiBcIkFcIlxuICAgICAgICBzdGF0ZTogXCJ0aGlyZFwiXG4gICAgICAsXG4gICAgICAgIG5hbWU6IFwiQVwiXG4gICAgICAgIHN0YXRlOiAkZW5kXG4gICAgICAsXG4gICAgICAgIG5hbWU6IFwiQlwiXG4gICAgICAgIHN0YXRlOiAkZW5kXG4gICAgICBdXG4gICAgICBcbiAgICAgIGguYXNzZXJ0LmRlZXBFcXVhbCBleHBlY3RlZCwgc3RhdGVzXG4gICAgICBcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIG5lc3RlZCB9Il0sIm5hbWVzIjpbInRlc3QiLCJNYWNoaW5lIiwiJGVuZCIsInN0YXJ0IiwicnVuIiwiaCIsIkEiLCJCIiwiUnVuIiwiZ3JvdyIsInRhbG9zIiwiY29udGV4dCIsInByb2R1Y3QiLCJtYWtlIiwibmFtZSIsImdyYXBoIiwiZGVmYXVsdCIsInNlY29uZCIsIm1vdmUiLCJ0aGlyZCIsImpvaW4iLCJpbm5lciIsInJlZiIsInJlc3VsdHMiLCJmaXJzdCIsInRhcmdldCIsImFzc2VydCIsImVxdWFsIiwiZXhwZWN0ZWQiLCJzdGF0ZXMiLCJwdXNoIiwic3RhdGUiLCJkZWVwRXF1YWwiLCJuZXN0ZWQiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBO0FBQUEsU0FBU0MsT0FBVCxFQUFrQkMsSUFBbEIsRUFBd0JDLEtBQXhCLEVBQStCQyxHQUEvQixRQUFBLGlCQUFBO0FBQ0EsWUFBT0MsT0FBUCxhQUFBO0FBR0FMLE9BQU87SUFDUCxJQUFBTSxHQUFBQyxHQUFBQztJQUFFQSxNQUNFO1FBQUFDLE1BQU0sU0FBRUMsS0FBRjttQkFDSkEsTUFBTUMsT0FBTyxDQUFDQyxPQUFkLElBQXlCO1FBRHJCO0lBQU47SUFHRk4sSUFBSUwsUUFBUVksSUFBUixDQUNGO1FBQUFDLE1BQU07UUFDTkMsT0FDRTtZQUFBWixPQUNFO2dCQUFBYSxTQUFTO1lBQVQ7WUFDRkMsUUFDRTtnQkFBQUQsU0FDRTtvQkFBQVosS0FBS0ksSUFBSUMsSUFBVDtvQkFDQVMsTUFBTTtnQkFETjtZQURGO1lBR0ZDLE9BQ0U7Z0JBQUFILFNBQ0U7b0JBQUFaLEtBQUtJLElBQUlDLElBQVQ7b0JBQ0FTLE1BQU1oQjtnQkFETjtZQURGO1FBUEY7SUFGRjtJQWFGTSxJQUFJWSxJQUFKLEdBQVcsVUFBRVYsS0FBRjtRQUNiLElBQUFXLE9BQUFDLEtBQUFDO1FBQUlELE1BQUFuQixNQUFBRyxHQUFBSSxNQUFBQyxPQUFBO1FBQUFZLFVBQUEsRUFBQTtRQUFBLEtBQUFGLFNBQUFDLElBQUE7eUJBQ0UsQ0FBQSxNQUFNRCxLQUFBO1FBRFI7O0lBRFM7SUFJWGQsSUFBSU4sUUFBUVksSUFBUixDQUNGO1FBQUFDLE1BQU07UUFDTkMsT0FDRTtZQUFBWixPQUNFO2dCQUFBYSxTQUFTO1lBQVQ7WUFDRlEsT0FDRTtnQkFBQVIsU0FDRTtvQkFBQVosS0FBS0ksSUFBSUMsSUFBVDtvQkFDQVMsTUFBTTtnQkFETjtZQURGO1lBR0ZFLE1BQ0U7Z0JBQUFKLFNBQ0U7b0JBQUFaLEtBQUtJLElBQUlZLElBQVQ7b0JBQ0FGLE1BQU1oQjtnQkFETjtZQURGO1FBUEY7SUFGRjtXQWNGO1FBQ0VHLEVBQUVMLElBQUYsQ0FBTyx1QkFBdUJLLEVBQUVvQixNQUFGLENBQVMsUUFBUTtZQUNuRCxJQUFBSCxLQUFBWjtZQUFNQSxRQUFRTixJQUFJRyxHQUFHO2dCQUFBSyxTQUFTO1lBQVQ7bUJBQ2ZQLEVBQUVxQixNQUFNLENBQUNDLEtBQVQsQ0FBZSx1Q0FBa0JmLE9BQUEsR0FBQSxLQUFBO1FBRlk7UUFJL0NQLEVBQUVMLElBQUYsQ0FBTyxzQ0FBc0NLLEVBQUVvQixNQUFGLENBQVMsUUFBUTtZQUNsRSxJQUFBRyxVQUFBTixLQUFBTyxRQUFBbkI7WUFBTW1CLFNBQVMsRUFBQTtZQUNUUCxNQUFBbkIsTUFBQUksR0FBQTs7O1lBQUEsS0FBQUcsU0FBQVksSUFBQTtnQkFDRU8sT0FBT0MsSUFBUCxDQUNFO29CQUFBaEIsTUFBTUosTUFBTUksSUFBWjtvQkFDQWlCLE9BQU9yQixNQUFNcUIsS0FBQTtnQkFEYjtZQUZKO1lBS0FILFdBQVc7Z0JBQ1Q7b0JBQUFkLE1BQU07b0JBQ05pQixPQUFPO2dCQURQO2dCQUdBO29CQUFBakIsTUFBTTtvQkFDTmlCLE9BQU87Z0JBRFA7Z0JBR0E7b0JBQUFqQixNQUFNO29CQUNOaUIsT0FBTztnQkFEUDtnQkFHQTtvQkFBQWpCLE1BQU07b0JBQ05pQixPQUFPO2dCQURQO2dCQUdBO29CQUFBakIsTUFBTTtvQkFDTmlCLE9BQU83QjtnQkFEUDtnQkFHQTtvQkFBQVksTUFBTTtvQkFDTmlCLE9BQU83QjtnQkFEUDs7bUJBSUZHLEVBQUVxQixNQUFNLENBQUNNLFNBQVQsQ0FBbUJKLFVBQVVDO1FBM0IrQjs7QUEzQzNEO0FBMEVQLFNBQVM3QixRQUFBaUMsTUFBVCJ9