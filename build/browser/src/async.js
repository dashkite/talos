var Step, run, start;
import { generic } from "@dashkite/joy/generic";
import * as Fn from "@dashkite/joy/function";
import * as Type from "@dashkite/joy/type";
import log from "@dashkite/kaiko";
import { Machine } from "./machine";
import { Talos } from "./talos";
import { isMachine, isIteratorKind } from "./types";
Step = {
    matchVertex: function(talos) {
        var vertex;
        vertex = talos.machine.graph[talos.state];
        if (vertex == null) {
            talos.catch(new Error("talos state is not in machine graph"));
        }
        return vertex;
    },
    matchEdge: async function(vertex, talos, event) {
        var edge, error, i, len, ref;
        ref = vertex.edges;
        for(i = 0, len = ref.length; i < len; i++){
            edge = ref[i];
            try {
                if (await edge.when(talos, event) === true) {
                    return edge;
                }
            } catch (error1) {
                error = error1;
                return talos.catch(error);
            }
        }
        return talos.catch(new Error("no matching when condition"));
    },
    run: async function(edge, talos, event) {
        var error;
        if (edge.run != null) {
            try {
                return await edge.run(talos, event);
            } catch (error1) {
                error = error1;
                return talos.catch(error);
            }
        }
    },
    move: async function(edge, talos, event) {
        var error;
        try {
            return await edge.move(talos, event);
        } catch (error1) {
            error = error1;
            return talos.catch(error);
        }
    },
    tick: async function*(talos, event) {
        var edge, vertex;
        vertex = Step.matchVertex(talos);
        yield talos;
        edge = await Step.matchEdge(vertex, talos, event);
        yield talos;
        await Step.run(edge, talos, event);
        yield talos;
        await Step.move(edge, talos, event);
        return yield talos;
    }
};
start = generic({
    name: "talos: sync start",
    default: function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        throw new Error(`talos sync start: input is malformed ${JSON.stringify(args)}`);
    }
});
generic(start, isMachine, function(machine) {
    var talos;
    talos = Talos.make(machine);
    return start(talos);
});
// Create generator where state machine consumes its own context repeatedly.
generic(start, Talos.isType, async function*(talos) {
    var ref;
    while(true){
        ref = Step.tick(talos, talos.context);
        for await (talos of ref){
            if (talos.ended) {
                yield talos;
                return;
            }
        }
        yield talos; // prevents accumulation
    }
});
generic(start, isMachine, isIteratorKind, function(machine, events) {
    var talos;
    talos = Talos.make(machine);
    return start(talos, events);
});
// Create generator where state machine consumes values from iterator.
generic(start, Talos.isType, isIteratorKind, async function*(talos, events) {
    var event, ref;
    for await (event of events){
        ref = Step.tick(talos, event);
        for await (talos of ref){
            if (talos.ended) {
                yield talos;
                return;
            }
        }
        yield talos; // prevents accumulation
    }
});
generic(start, isMachine, Type.isObject, function(machine, context) {
    var talos;
    talos = Talos.make(machine);
    talos.context = context;
    return start(talos);
});
generic(start, Talos.isType, Type.isObject, function(talos, context) {
    talos.context = context;
    return start(talos);
});
generic(start, isMachine, Type.isObject, isIteratorKind, function(machine, context, events) {
    var talos;
    talos = Talos.make(machine);
    talos.context = context;
    return start(talos, events);
});
generic(start, Talos.isType, Type.isObject, isIteratorKind, function(talos, context, events) {
    talos.context = context;
    return start(talos, events);
});
// Convenience function to keep going and only return the final talos.
run = generic({
    name: "talos: sync run",
    default: function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        throw new Error(`talos sync run: input is malformed ${JSON.stringify(args)}`);
    }
});
// Further convenience to support automatically using start.
generic(run, Type.isAny, function() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    return run(start(...args));
});
generic(run, isIteratorKind, async function(cycle) {
    var result, talos;
    for await (talos of cycle){
        result = talos;
    }
    return result;
});
generic(run, Type.isArray, function(fx) {
    return run(start(fx));
});
generic(run, Type.isArray, Type.isAny, function(fx) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        args[_key - 1] = arguments[_key];
    }
    return run(start(fx), ...args);
});
export { Step, start, run }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2FzeW5jLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLElBQUEsRUFBQSxHQUFBLEVBQUE7O0FBQUEsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxNQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLEdBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsT0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxTQUFUO0VBQW9CLGNBQXBCO0NBQUEsTUFBQTs7QUFHQSxJQUFBLEdBQ0U7RUFBQSxXQUFBLEVBQWEsUUFBQSxDQUFFLEtBQUYsQ0FBQTtBQUNmLFFBQUE7SUFBSSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUUsS0FBSyxDQUFDLEtBQVI7SUFDNUIsSUFBSSxjQUFKO01BQ0UsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFJLEtBQUosQ0FBVSxxQ0FBVixDQUFaLEVBREY7O1dBRUE7RUFKVyxDQUFiO0VBTUEsU0FBQSxFQUFXLE1BQUEsUUFBQSxDQUFFLE1BQUYsRUFBVSxLQUFWLEVBQWlCLEtBQWpCLENBQUE7QUFDYixRQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFJO0lBQUEsS0FBQSxxQ0FBQTs7QUFDRTtRQUNFLElBQUcsQ0FBRSxDQUFBLE1BQU0sSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEtBQWpCLENBQU4sQ0FBRixDQUFBLEtBQW9DLElBQXZDO0FBQ0UsaUJBQU8sS0FEVDtTQURGO09BR0EsY0FBQTtRQUFNO0FBQ0osZUFBTyxLQUFLLENBQUMsS0FBTixDQUFZLEtBQVosRUFEVDs7SUFKRjtXQU1BLEtBQUssQ0FBQyxLQUFOLENBQVksSUFBSSxLQUFKLENBQVUsNEJBQVYsQ0FBWjtFQVBTLENBTlg7RUFlQSxHQUFBLEVBQUssTUFBQSxRQUFBLENBQUUsSUFBRixFQUFRLEtBQVIsRUFBZSxLQUFmLENBQUE7QUFDUCxRQUFBO0lBQUksSUFBRyxnQkFBSDtBQUNFO2VBQ0UsQ0FBQSxNQUFNLElBQUksQ0FBQyxHQUFMLENBQVMsS0FBVCxFQUFnQixLQUFoQixDQUFOLEVBREY7T0FFQSxjQUFBO1FBQU07ZUFDSixLQUFLLENBQUMsS0FBTixDQUFZLEtBQVosRUFERjtPQUhGOztFQURHLENBZkw7RUFzQkEsSUFBQSxFQUFNLE1BQUEsUUFBQSxDQUFFLElBQUYsRUFBUSxLQUFSLEVBQWUsS0FBZixDQUFBO0FBQ1IsUUFBQTtBQUFJO2FBQ0UsQ0FBQSxNQUFNLElBQUksQ0FBQyxJQUFMLENBQVUsS0FBVixFQUFpQixLQUFqQixDQUFOLEVBREY7S0FFQSxjQUFBO01BQU07YUFDSixLQUFLLENBQUMsS0FBTixDQUFZLEtBQVosRUFERjs7RUFISSxDQXRCTjtFQTRCQSxJQUFBLEVBQU0sTUFBQSxTQUFBLENBQUUsS0FBRixFQUFTLEtBQVQsQ0FBQTtBQUNSLFFBQUEsSUFBQSxFQUFBO0lBQUksTUFBQSxHQUFTLElBQUksQ0FBQyxXQUFMLENBQWlCLEtBQWpCO0lBQ1QsTUFBTTtJQUNOLElBQUEsR0FBTyxDQUFBLE1BQU0sSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLEtBQXZCLEVBQThCLEtBQTlCLENBQU47SUFDUCxNQUFNO0lBQ04sTUFBTSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCLEtBQXRCO0lBQ04sTUFBTTtJQUNOLE1BQU0sSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFWLEVBQWdCLEtBQWhCLEVBQXVCLEtBQXZCO1dBQ04sQ0FBQSxNQUFNLEtBQU47RUFSSTtBQTVCTjs7QUF1Q0YsS0FBQSxHQUFRLE9BQUEsQ0FDTjtFQUFBLElBQUEsRUFBTSxtQkFBTjtFQUNBLE9BQUEsRUFBUyxRQUFBLENBQUEsR0FBRSxJQUFGLENBQUE7SUFDUCxNQUFNLElBQUksS0FBSixDQUFVLENBQUEscUNBQUEsQ0FBQSxDQUF5QyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWYsQ0FBekMsQ0FBQSxDQUFWO0VBREM7QUFEVCxDQURNOztBQU1SLE9BQUEsQ0FBUSxLQUFSLEVBQWUsU0FBZixFQUEwQixRQUFBLENBQUUsT0FBRixDQUFBO0FBQzFCLE1BQUE7RUFBRSxLQUFBLEdBQVEsS0FBSyxDQUFDLElBQU4sQ0FBVyxPQUFYO1NBQ1IsS0FBQSxDQUFNLEtBQU47QUFGd0IsQ0FBMUIsRUF2REE7OztBQTREQSxPQUFBLENBQVEsS0FBUixFQUFlLEtBQUssQ0FBQyxNQUFyQixFQUE2QixNQUFBLFNBQUEsQ0FBRSxLQUFGLENBQUE7QUFDN0IsTUFBQTtBQUFFLFNBQUEsSUFBQTtBQUNFO0lBQUEsd0JBQUE7TUFDRSxJQUFHLEtBQUssQ0FBQyxLQUFUO1FBQ0UsTUFBTTtBQUNOLGVBRkY7O0lBREY7SUFJQSxNQUFNLE1BTFI7RUFBQTtBQUQyQixDQUE3Qjs7QUFTQSxPQUFBLENBQVEsS0FBUixFQUFlLFNBQWYsRUFBMEIsY0FBMUIsRUFBMEMsUUFBQSxDQUFFLE9BQUYsRUFBVyxNQUFYLENBQUE7QUFDMUMsTUFBQTtFQUFFLEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFXLE9BQVg7U0FDUixLQUFBLENBQU0sS0FBTixFQUFhLE1BQWI7QUFGd0MsQ0FBMUMsRUFyRUE7OztBQTBFQSxPQUFBLENBQVEsS0FBUixFQUFlLEtBQUssQ0FBQyxNQUFyQixFQUE2QixjQUE3QixFQUE2QyxNQUFBLFNBQUEsQ0FBRSxLQUFGLEVBQVMsTUFBVCxDQUFBO0FBQzdDLE1BQUEsS0FBQSxFQUFBO0VBQUUsMkJBQUE7QUFDRTtJQUFBLHdCQUFBO01BQ0UsSUFBRyxLQUFLLENBQUMsS0FBVDtRQUNFLE1BQU07QUFDTixlQUZGOztJQURGO0lBSUEsTUFBTSxNQUxSO0VBQUE7QUFEMkMsQ0FBN0M7O0FBU0EsT0FBQSxDQUFRLEtBQVIsRUFBZSxTQUFmLEVBQTBCLElBQUksQ0FBQyxRQUEvQixFQUF5QyxRQUFBLENBQUUsT0FBRixFQUFXLE9BQVgsQ0FBQTtBQUN6QyxNQUFBO0VBQUUsS0FBQSxHQUFRLEtBQUssQ0FBQyxJQUFOLENBQVcsT0FBWDtFQUNSLEtBQUssQ0FBQyxPQUFOLEdBQWdCO1NBQ2hCLEtBQUEsQ0FBTSxLQUFOO0FBSHVDLENBQXpDOztBQUtBLE9BQUEsQ0FBUSxLQUFSLEVBQWUsS0FBSyxDQUFDLE1BQXJCLEVBQTZCLElBQUksQ0FBQyxRQUFsQyxFQUE0QyxRQUFBLENBQUUsS0FBRixFQUFTLE9BQVQsQ0FBQTtFQUMxQyxLQUFLLENBQUMsT0FBTixHQUFnQjtTQUNoQixLQUFBLENBQU0sS0FBTjtBQUYwQyxDQUE1Qzs7QUFJQSxPQUFBLENBQVEsS0FBUixFQUFlLFNBQWYsRUFBMEIsSUFBSSxDQUFDLFFBQS9CLEVBQXlDLGNBQXpDLEVBQXlELFFBQUEsQ0FBRSxPQUFGLEVBQVcsT0FBWCxFQUFvQixNQUFwQixDQUFBO0FBQ3pELE1BQUE7RUFBRSxLQUFBLEdBQVEsS0FBSyxDQUFDLElBQU4sQ0FBVyxPQUFYO0VBQ1IsS0FBSyxDQUFDLE9BQU4sR0FBZ0I7U0FDaEIsS0FBQSxDQUFNLEtBQU4sRUFBYSxNQUFiO0FBSHVELENBQXpEOztBQUtBLE9BQUEsQ0FBUSxLQUFSLEVBQWUsS0FBSyxDQUFDLE1BQXJCLEVBQTZCLElBQUksQ0FBQyxRQUFsQyxFQUE0QyxjQUE1QyxFQUE0RCxRQUFBLENBQUUsS0FBRixFQUFTLE9BQVQsRUFBa0IsTUFBbEIsQ0FBQTtFQUMxRCxLQUFLLENBQUMsT0FBTixHQUFnQjtTQUNoQixLQUFBLENBQU0sS0FBTixFQUFhLE1BQWI7QUFGMEQsQ0FBNUQsRUFqR0E7OztBQXVHQSxHQUFBLEdBQU0sT0FBQSxDQUNKO0VBQUEsSUFBQSxFQUFNLGlCQUFOO0VBQ0EsT0FBQSxFQUFTLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtJQUNQLE1BQU0sSUFBSSxLQUFKLENBQVUsQ0FBQSxtQ0FBQSxDQUFBLENBQXVDLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixDQUF2QyxDQUFBLENBQVY7RUFEQztBQURULENBREksRUF2R047OztBQTZHQSxPQUFBLENBQVEsR0FBUixFQUFhLElBQUksQ0FBQyxLQUFsQixFQUF5QixRQUFBLENBQUEsR0FBRSxJQUFGLENBQUE7U0FDdkIsR0FBQSxDQUFJLEtBQUEsQ0FBTSxHQUFBLElBQU4sQ0FBSjtBQUR1QixDQUF6Qjs7QUFHQSxPQUFBLENBQVEsR0FBUixFQUFhLGNBQWIsRUFBNkIsTUFBQSxRQUFBLENBQUUsS0FBRixDQUFBO0FBQzdCLE1BQUEsTUFBQSxFQUFBO0VBQUUsMEJBQUE7SUFDRSxNQUFBLEdBQVM7RUFEWDtTQUVBO0FBSDJCLENBQTdCOztBQUtBLE9BQUEsQ0FBUSxHQUFSLEVBQWEsSUFBSSxDQUFDLE9BQWxCLEVBQTJCLFFBQUEsQ0FBRSxFQUFGLENBQUE7U0FDekIsR0FBQSxDQUFJLEtBQUEsQ0FBTSxFQUFOLENBQUo7QUFEeUIsQ0FBM0I7O0FBR0EsT0FBQSxDQUFRLEdBQVIsRUFBYSxJQUFJLENBQUMsT0FBbEIsRUFBMkIsSUFBSSxDQUFDLEtBQWhDLEVBQXVDLFFBQUEsQ0FBRSxFQUFGLEVBQUEsR0FBTSxJQUFOLENBQUE7U0FDckMsR0FBQSxDQUFNLEtBQUEsQ0FBTSxFQUFOLENBQU4sRUFBa0IsR0FBQSxJQUFsQjtBQURxQyxDQUF2Qzs7QUFJQSxPQUFBO0VBQ0UsSUFERjtFQUVFLEtBRkY7RUFHRSxHQUhGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0ICogYXMgRm4gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZnVuY3Rpb25cIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCBsb2cgZnJvbSBcIkBkYXNoa2l0ZS9rYWlrb1wiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcbmltcG9ydCB7IGlzTWFjaGluZSwgaXNJdGVyYXRvcktpbmQgfSBmcm9tIFwiLi90eXBlc1wiXG5cblxuU3RlcCA9XG4gIG1hdGNoVmVydGV4OiAoIHRhbG9zICkgLT5cbiAgICB2ZXJ0ZXggPSB0YWxvcy5tYWNoaW5lLmdyYXBoWyB0YWxvcy5zdGF0ZSBdXG4gICAgaWYgIXZlcnRleD9cbiAgICAgIHRhbG9zLmNhdGNoIG5ldyBFcnJvciBcInRhbG9zIHN0YXRlIGlzIG5vdCBpbiBtYWNoaW5lIGdyYXBoXCJcbiAgICB2ZXJ0ZXhcblxuICBtYXRjaEVkZ2U6ICggdmVydGV4LCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGZvciBlZGdlIGluIHZlcnRleC5lZGdlc1xuICAgICAgdHJ5XG4gICAgICAgIGlmICggYXdhaXQgZWRnZS53aGVuIHRhbG9zLCBldmVudCApID09IHRydWVcbiAgICAgICAgICByZXR1cm4gZWRnZVxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgcmV0dXJuIHRhbG9zLmNhdGNoIGVycm9yXG4gICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwibm8gbWF0Y2hpbmcgd2hlbiBjb25kaXRpb25cIlxuXG4gIHJ1bjogKCBlZGdlLCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGlmIGVkZ2UucnVuP1xuICAgICAgdHJ5XG4gICAgICAgIGF3YWl0IGVkZ2UucnVuIHRhbG9zLCBldmVudFxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBhd2FpdCBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgY2F0Y2ggZXJyb3JcbiAgICAgIHRhbG9zLmNhdGNoIGVycm9yXG5cbiAgdGljazogKCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIHZlcnRleCA9IFN0ZXAubWF0Y2hWZXJ0ZXggdGFsb3NcbiAgICB5aWVsZCB0YWxvc1xuICAgIGVkZ2UgPSBhd2FpdCBTdGVwLm1hdGNoRWRnZSB2ZXJ0ZXgsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zXG4gICAgYXdhaXQgU3RlcC5ydW4gZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3NcbiAgICBhd2FpdCBTdGVwLm1vdmUgZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3NcblxuXG5zdGFydCA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidGFsb3M6IHN5bmMgc3RhcnRcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPlxuICAgIHRocm93IG5ldyBFcnJvciBcInRhbG9zIHN5bmMgc3RhcnQ6IGlucHV0IGlzIG1hbGZvcm1lZCAjeyBKU09OLnN0cmluZ2lmeSBhcmdzIH1cIlxuXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgKCBtYWNoaW5lICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3NcblxuIyBDcmVhdGUgZ2VuZXJhdG9yIHdoZXJlIHN0YXRlIG1hY2hpbmUgY29uc3VtZXMgaXRzIG93biBjb250ZXh0IHJlcGVhdGVkbHkuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsICggdGFsb3MgKSAtPlxuICBsb29wXG4gICAgZm9yIGF3YWl0IHRhbG9zIGZyb20gU3RlcC50aWNrIHRhbG9zLCB0YWxvcy5jb250ZXh0XG4gICAgICBpZiB0YWxvcy5lbmRlZFxuICAgICAgICB5aWVsZCB0YWxvc1xuICAgICAgICByZXR1cm5cbiAgICB5aWVsZCB0YWxvc1xuICByZXR1cm4gIyBwcmV2ZW50cyBhY2N1bXVsYXRpb25cblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBpc0l0ZXJhdG9yS2luZCwgKCBtYWNoaW5lLCBldmVudHMgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICBzdGFydCB0YWxvcywgZXZlbnRzXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIHZhbHVlcyBmcm9tIGl0ZXJhdG9yLlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBpc0l0ZXJhdG9yS2luZCwgKCB0YWxvcywgZXZlbnRzICkgLT5cbiAgZm9yIGF3YWl0IGV2ZW50IGZyb20gZXZlbnRzXG4gICAgZm9yIGF3YWl0IHRhbG9zIGZyb20gU3RlcC50aWNrIHRhbG9zLCBldmVudFxuICAgICAgaWYgdGFsb3MuZW5kZWRcbiAgICAgICAgeWllbGQgdGFsb3NcbiAgICAgICAgcmV0dXJuXG4gICAgeWllbGQgdGFsb3NcbiAgcmV0dXJuICMgcHJldmVudHMgYWNjdW11bGF0aW9uXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc09iamVjdCwgKCBtYWNoaW5lLCBjb250ZXh0ICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3NcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCAoIHRhbG9zLCBjb250ZXh0ICkgLT5cbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3NcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzT2JqZWN0LCBpc0l0ZXJhdG9yS2luZCwgKCBtYWNoaW5lLCBjb250ZXh0LCBldmVudHMgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvcywgZXZlbnRzXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgaXNJdGVyYXRvcktpbmQsICggdGFsb3MsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuXG4jIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGtlZXAgZ29pbmcgYW5kIG9ubHkgcmV0dXJuIHRoZSBmaW5hbCB0YWxvcy5cbnJ1biA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidGFsb3M6IHN5bmMgcnVuXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwidGFsb3Mgc3luYyBydW46IGlucHV0IGlzIG1hbGZvcm1lZCAjeyBKU09OLnN0cmluZ2lmeSBhcmdzIH1cIlxuXG4jIEZ1cnRoZXIgY29udmVuaWVuY2UgdG8gc3VwcG9ydCBhdXRvbWF0aWNhbGx5IHVzaW5nIHN0YXJ0LlxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBbnksICggYXJncy4uLiApIC0+XG4gIHJ1biBzdGFydCBhcmdzLi4uXG5cbmdlbmVyaWMgcnVuLCBpc0l0ZXJhdG9yS2luZCwgKCBjeWNsZSApIC0+XG4gIGZvciBhd2FpdCB0YWxvcyBmcm9tIGN5Y2xlXG4gICAgcmVzdWx0ID0gdGFsb3NcbiAgcmVzdWx0XG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzQXJyYXksICggZnggKSAtPlxuICBydW4gc3RhcnQgZnhcblxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBcnJheSwgVHlwZS5pc0FueSwgKCBmeCwgYXJncy4uLiApIC0+XG4gIHJ1biAoIHN0YXJ0IGZ4ICksIGFyZ3MuLi5cblxuXG5leHBvcnQge1xuICBTdGVwICBcbiAgc3RhcnRcbiAgcnVuXG59Il19
 //# sourceURL=src/async.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hc3luYy5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0ICogYXMgRm4gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZnVuY3Rpb25cIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCBsb2cgZnJvbSBcIkBkYXNoa2l0ZS9rYWlrb1wiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcbmltcG9ydCB7IGlzTWFjaGluZSwgaXNJdGVyYXRvcktpbmQgfSBmcm9tIFwiLi90eXBlc1wiXG5cblxuU3RlcCA9XG4gIG1hdGNoVmVydGV4OiAoIHRhbG9zICkgLT5cbiAgICB2ZXJ0ZXggPSB0YWxvcy5tYWNoaW5lLmdyYXBoWyB0YWxvcy5zdGF0ZSBdXG4gICAgaWYgIXZlcnRleD9cbiAgICAgIHRhbG9zLmNhdGNoIG5ldyBFcnJvciBcInRhbG9zIHN0YXRlIGlzIG5vdCBpbiBtYWNoaW5lIGdyYXBoXCJcbiAgICB2ZXJ0ZXhcblxuICBtYXRjaEVkZ2U6ICggdmVydGV4LCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGZvciBlZGdlIGluIHZlcnRleC5lZGdlc1xuICAgICAgdHJ5XG4gICAgICAgIGlmICggYXdhaXQgZWRnZS53aGVuIHRhbG9zLCBldmVudCApID09IHRydWVcbiAgICAgICAgICByZXR1cm4gZWRnZVxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgcmV0dXJuIHRhbG9zLmNhdGNoIGVycm9yXG4gICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwibm8gbWF0Y2hpbmcgd2hlbiBjb25kaXRpb25cIlxuXG4gIHJ1bjogKCBlZGdlLCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGlmIGVkZ2UucnVuP1xuICAgICAgdHJ5XG4gICAgICAgIGF3YWl0IGVkZ2UucnVuIHRhbG9zLCBldmVudFxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBhd2FpdCBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgY2F0Y2ggZXJyb3JcbiAgICAgIHRhbG9zLmNhdGNoIGVycm9yXG5cbiAgdGljazogKCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIHZlcnRleCA9IFN0ZXAubWF0Y2hWZXJ0ZXggdGFsb3NcbiAgICB5aWVsZCB0YWxvc1xuICAgIGVkZ2UgPSBhd2FpdCBTdGVwLm1hdGNoRWRnZSB2ZXJ0ZXgsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zXG4gICAgYXdhaXQgU3RlcC5ydW4gZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3NcbiAgICBhd2FpdCBTdGVwLm1vdmUgZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3NcblxuXG5zdGFydCA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidGFsb3M6IHN5bmMgc3RhcnRcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPlxuICAgIHRocm93IG5ldyBFcnJvciBcInRhbG9zIHN5bmMgc3RhcnQ6IGlucHV0IGlzIG1hbGZvcm1lZCAjeyBKU09OLnN0cmluZ2lmeSBhcmdzIH1cIlxuXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgKCBtYWNoaW5lICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3NcblxuIyBDcmVhdGUgZ2VuZXJhdG9yIHdoZXJlIHN0YXRlIG1hY2hpbmUgY29uc3VtZXMgaXRzIG93biBjb250ZXh0IHJlcGVhdGVkbHkuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsICggdGFsb3MgKSAtPlxuICBsb29wXG4gICAgZm9yIGF3YWl0IHRhbG9zIGZyb20gU3RlcC50aWNrIHRhbG9zLCB0YWxvcy5jb250ZXh0XG4gICAgICBpZiB0YWxvcy5lbmRlZFxuICAgICAgICB5aWVsZCB0YWxvc1xuICAgICAgICByZXR1cm5cbiAgICB5aWVsZCB0YWxvc1xuICByZXR1cm4gIyBwcmV2ZW50cyBhY2N1bXVsYXRpb25cblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBpc0l0ZXJhdG9yS2luZCwgKCBtYWNoaW5lLCBldmVudHMgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICBzdGFydCB0YWxvcywgZXZlbnRzXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIHZhbHVlcyBmcm9tIGl0ZXJhdG9yLlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBpc0l0ZXJhdG9yS2luZCwgKCB0YWxvcywgZXZlbnRzICkgLT5cbiAgZm9yIGF3YWl0IGV2ZW50IGZyb20gZXZlbnRzXG4gICAgZm9yIGF3YWl0IHRhbG9zIGZyb20gU3RlcC50aWNrIHRhbG9zLCBldmVudFxuICAgICAgaWYgdGFsb3MuZW5kZWRcbiAgICAgICAgeWllbGQgdGFsb3NcbiAgICAgICAgcmV0dXJuXG4gICAgeWllbGQgdGFsb3NcbiAgcmV0dXJuICMgcHJldmVudHMgYWNjdW11bGF0aW9uXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc09iamVjdCwgKCBtYWNoaW5lLCBjb250ZXh0ICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3NcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCAoIHRhbG9zLCBjb250ZXh0ICkgLT5cbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3NcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzT2JqZWN0LCBpc0l0ZXJhdG9yS2luZCwgKCBtYWNoaW5lLCBjb250ZXh0LCBldmVudHMgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvcywgZXZlbnRzXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgaXNJdGVyYXRvcktpbmQsICggdGFsb3MsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuXG4jIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGtlZXAgZ29pbmcgYW5kIG9ubHkgcmV0dXJuIHRoZSBmaW5hbCB0YWxvcy5cbnJ1biA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidGFsb3M6IHN5bmMgcnVuXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwidGFsb3Mgc3luYyBydW46IGlucHV0IGlzIG1hbGZvcm1lZCAjeyBKU09OLnN0cmluZ2lmeSBhcmdzIH1cIlxuXG4jIEZ1cnRoZXIgY29udmVuaWVuY2UgdG8gc3VwcG9ydCBhdXRvbWF0aWNhbGx5IHVzaW5nIHN0YXJ0LlxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBbnksICggYXJncy4uLiApIC0+XG4gIHJ1biBzdGFydCBhcmdzLi4uXG5cbmdlbmVyaWMgcnVuLCBpc0l0ZXJhdG9yS2luZCwgKCBjeWNsZSApIC0+XG4gIGZvciBhd2FpdCB0YWxvcyBmcm9tIGN5Y2xlXG4gICAgcmVzdWx0ID0gdGFsb3NcbiAgcmVzdWx0XG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzQXJyYXksICggZnggKSAtPlxuICBydW4gc3RhcnQgZnhcblxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBcnJheSwgVHlwZS5pc0FueSwgKCBmeCwgYXJncy4uLiApIC0+XG4gIHJ1biAoIHN0YXJ0IGZ4ICksIGFyZ3MuLi5cblxuXG5leHBvcnQge1xuICBTdGVwICBcbiAgc3RhcnRcbiAgcnVuXG59Il0sIm5hbWVzIjpbIlN0ZXAiLCJydW4iLCJzdGFydCIsImdlbmVyaWMiLCJGbiIsIlR5cGUiLCJsb2ciLCJNYWNoaW5lIiwiVGFsb3MiLCJpc01hY2hpbmUiLCJpc0l0ZXJhdG9yS2luZCIsIm1hdGNoVmVydGV4IiwidGFsb3MiLCJ2ZXJ0ZXgiLCJtYWNoaW5lIiwiZ3JhcGgiLCJzdGF0ZSIsImNhdGNoIiwiRXJyb3IiLCJtYXRjaEVkZ2UiLCJldmVudCIsImVkZ2UiLCJlcnJvciIsImkiLCJsZW4iLCJyZWYiLCJlZGdlcyIsImxlbmd0aCIsIndoZW4iLCJlcnJvcjEiLCJtb3ZlIiwidGljayIsIm5hbWUiLCJkZWZhdWx0IiwiYXJncyIsIkpTT04iLCJzdHJpbmdpZnkiLCJtYWtlIiwiaXNUeXBlIiwiY29udGV4dCIsImVuZGVkIiwiZXZlbnRzIiwiaXNPYmplY3QiLCJpc0FueSIsImN5Y2xlIiwicmVzdWx0IiwiaXNBcnJheSIsImZ4Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFBQSxNQUFBQyxLQUFBQztBQUFBLFNBQVNDLE9BQVQsUUFBQSx3QkFBQTtBQUNBLFlBQU9DLFFBQVAseUJBQUE7QUFDQSxZQUFPQyxVQUFQLHFCQUFBO0FBQ0EsT0FBT0MsU0FBUCxrQkFBQTtBQUNBLFNBQVNDLE9BQVQsUUFBQSxZQUFBO0FBQ0EsU0FBU0MsS0FBVCxRQUFBLFVBQUE7QUFDQSxTQUFTQyxTQUFULEVBQW9CQyxjQUFwQixRQUFBLFVBQUE7QUFHQVYsT0FDRTtJQUFBVyxhQUFhLFNBQUVDLEtBQUY7UUFDZixJQUFBQztRQUFJQSxTQUFTRCxNQUFNRSxPQUFPLENBQUNDLEtBQUssQ0FBRUgsTUFBTUksS0FBUixDQUFBO1FBQzVCLElBQUlILFVBQUEsTUFBSjtZQUNFRCxNQUFNSyxLQUFOLENBQVksSUFBSUMsTUFBTTs7ZUFDeEJMO0lBSlc7SUFNYk0sV0FBVyxlQUFFTixNQUFGLEVBQVVELEtBQVYsRUFBaUJRLEtBQWpCO1FBQ2IsSUFBQUMsTUFBQUMsT0FBQUMsR0FBQUMsS0FBQUM7UUFBSUEsTUFBQVosT0FBQWEs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