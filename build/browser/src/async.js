var Step, flow, run, start;
import { generic } from "@dashkite/joy/generic";
import * as Fn from "@dashkite/joy/function";
import * as Type from "@dashkite/joy/type";
import { Machine } from "./machine";
import { Talos } from "./talos";
import { isMachine, isIteratorKind, isGeneratorFunctionKind } from "./types";
Step = {
    matchVertex: function(talos) {
        var vertex;
        vertex = talos.machine.graph[talos.state];
        if (vertex == null) {
            talos.catch(new Error("talos: state is not in machine graph"));
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
        return talos.catch(new Error("talos: no matching when condition"));
    },
    run: async function*(edge, talos, event) {
        var error;
        try {
            if (isGeneratorFunctionKind(edge.run)) {
                return yield* await edge.run(talos, event);
            } else if (Type.isFunction(edge.run)) {
                return await edge.run(talos, event);
            }
        } catch (error1) {
            error = error1;
            return talos.catch(error);
        }
    },
    move: async function(edge, talos, event) {
        var error, previous;
        try {
            previous = talos.state;
            await edge.move(talos, event);
            return talos.previousState = previous;
        } catch (error1) {
            error = error1;
            return talos.catch(error);
        }
    },
    tick: async function*(talos, event) {
        var edge, vertex;
        vertex = Step.matchVertex(talos);
        if (talos.ended) {
            yield talos;
        }
        edge = await Step.matchEdge(vertex, talos, event);
        if (talos.ended) {
            yield talos;
        }
        yield* await Step.run(edge, talos, event);
        if (talos.ended) {
            yield talos;
        }
        await Step.move(edge, talos, event);
        return yield talos; // this is the happy-path yield
    }
};
start = generic({
    name: "talos: async start"
});
generic(start, isMachine, function(machine) {
    var talos;
    talos = Talos.make(machine);
    return start(talos);
});
// Create generator where state machine consumes its own context repeatedly.
generic(start, Talos.isType, async function*(talos) {
    var current, ref;
    while(true){
        ref = Step.tick(talos, talos.context);
        for await (current of ref){
            yield current;
            if (talos.ended) {
                return;
            }
        }
    }
});
generic(start, isMachine, isIteratorKind, function(machine, events) {
    var talos;
    talos = Talos.make(machine);
    return start(talos, events);
});
// Create generator where state machine consumes values from reactor.
generic(start, Talos.isType, isIteratorKind, async function*(talos, events) {
    var current, event, ref;
    for await (event of events){
        ref = Step.tick(talos, event);
        for await (current of ref){
            yield current;
            if (talos.ended) {
                return;
            }
        }
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
    name: "talos: async run"
});
// Further convenience to support automatically using start.
generic(run, Type.isAny, function() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    return run(start(...args));
});
generic(run, Type.isReactor, async function(reactor) {
    var result, talos;
    for await (talos of reactor){
        result = talos;
    }
    return result;
});
flow = function(fx) {
    return async function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        var talos;
        talos = await run(start(fx, ...args));
        if (talos.error != null) {
            throw talos.error;
        }
        return talos.context;
    };
};
export * from "./states";
export * from "./machine";
export * from "./talos";
export * from "./types";
export { Step, start, run, flow }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvYXN5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUE7O0FBQUEsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxNQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsT0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxTQUFUO0VBQW9CLGNBQXBCO0VBQW9DLHVCQUFwQztDQUFBLE1BQUE7O0FBR0EsSUFBQSxHQUNFO0VBQUEsV0FBQSxFQUFhLFFBQUEsQ0FBRSxLQUFGLENBQUE7QUFDZixRQUFBO0lBQUksTUFBQSxHQUFTLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFFLEtBQUssQ0FBQyxLQUFSO0lBQzVCLElBQUksY0FBSjtNQUNFLEtBQUssQ0FBQyxLQUFOLENBQVksSUFBSSxLQUFKLENBQVUsc0NBQVYsQ0FBWixFQURGOztXQUVBO0VBSlcsQ0FBYjtFQU1BLFNBQUEsRUFBVyxNQUFBLFFBQUEsQ0FBRSxNQUFGLEVBQVUsS0FBVixFQUFpQixLQUFqQixDQUFBO0FBQ2IsUUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7QUFBSTtJQUFBLEtBQUEscUNBQUE7O0FBQ0U7UUFDRSxJQUFHLENBQUUsQ0FBQSxNQUFNLElBQUksQ0FBQyxJQUFMLENBQVUsS0FBVixFQUFpQixLQUFqQixDQUFOLENBQUYsQ0FBQSxLQUFvQyxJQUF2QztBQUNFLGlCQUFPLEtBRFQ7U0FERjtPQUdBLGNBQUE7UUFBTTtBQUNKLGVBQU8sS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFaLEVBRFQ7O0lBSkY7V0FNQSxLQUFLLENBQUMsS0FBTixDQUFZLElBQUksS0FBSixDQUFVLG1DQUFWLENBQVo7RUFQUyxDQU5YO0VBZUEsR0FBQSxFQUFLLE1BQUEsU0FBQSxDQUFFLElBQUYsRUFBUSxLQUFSLEVBQWUsS0FBZixDQUFBO0FBQ1AsUUFBQTtBQUFJO01BQ0UsSUFBRyx1QkFBQSxDQUF3QixJQUFJLENBQUMsR0FBN0IsQ0FBSDtlQUNFLENBQUEsT0FBVyxDQUFBLE1BQU0sSUFBSSxDQUFDLEdBQUwsQ0FBUyxLQUFULEVBQWdCLEtBQWhCLENBQU4sQ0FBWCxFQURGO09BQUEsTUFFSyxJQUFHLElBQUksQ0FBQyxVQUFMLENBQWdCLElBQUksQ0FBQyxHQUFyQixDQUFIO2VBQ0gsQ0FBQSxNQUFNLElBQUksQ0FBQyxHQUFMLENBQVMsS0FBVCxFQUFnQixLQUFoQixDQUFOLEVBREc7T0FIUDtLQUtBLGNBQUE7TUFBTTthQUNKLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBWixFQURGOztFQU5HLENBZkw7RUF3QkEsSUFBQSxFQUFNLE1BQUEsUUFBQSxDQUFFLElBQUYsRUFBUSxLQUFSLEVBQWUsS0FBZixDQUFBO0FBQ1IsUUFBQSxLQUFBLEVBQUE7QUFBSTtNQUNFLFFBQUEsR0FBVyxLQUFLLENBQUM7TUFDakIsTUFBTSxJQUFJLENBQUMsSUFBTCxDQUFVLEtBQVYsRUFBaUIsS0FBakI7YUFDTixLQUFLLENBQUMsYUFBTixHQUFzQixTQUh4QjtLQUlBLGNBQUE7TUFBTTthQUNKLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBWixFQURGOztFQUxJLENBeEJOO0VBZ0NBLElBQUEsRUFBTSxNQUFBLFNBQUEsQ0FBRSxLQUFGLEVBQVMsS0FBVCxDQUFBO0FBQ1IsUUFBQSxJQUFBLEVBQUE7SUFBSSxNQUFBLEdBQVMsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsS0FBakI7SUFDVCxJQUFlLEtBQUssQ0FBQyxLQUFyQjtNQUFBLE1BQU0sTUFBTjs7SUFDQSxJQUFBLEdBQU8sQ0FBQSxNQUFNLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZixFQUF1QixLQUF2QixFQUE4QixLQUE5QixDQUFOO0lBQ1AsSUFBZSxLQUFLLENBQUMsS0FBckI7TUFBQSxNQUFNLE1BQU47O0lBQ0EsT0FBVyxDQUFBLE1BQU0sSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFULEVBQWUsS0FBZixFQUFzQixLQUF0QixDQUFOO0lBQ1gsSUFBZSxLQUFLLENBQUMsS0FBckI7TUFBQSxNQUFNLE1BQU47O0lBQ0EsTUFBTSxJQUFJLENBQUMsSUFBTCxDQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUIsS0FBdkI7V0FDTixDQUFBLE1BQU0sS0FBTixFQVJJO0VBQUE7QUFoQ047O0FBMkNGLEtBQUEsR0FBUSxPQUFBLENBQVE7RUFBQSxJQUFBLEVBQU07QUFBTixDQUFSOztBQUVSLE9BQUEsQ0FBUSxLQUFSLEVBQWUsU0FBZixFQUEwQixRQUFBLENBQUUsT0FBRixDQUFBO0FBQzFCLE1BQUE7RUFBRSxLQUFBLEdBQVEsS0FBSyxDQUFDLElBQU4sQ0FBVyxPQUFYO1NBQ1IsS0FBQSxDQUFNLEtBQU47QUFGd0IsQ0FBMUIsRUF0REE7OztBQTJEQSxPQUFBLENBQVEsS0FBUixFQUFlLEtBQUssQ0FBQyxNQUFyQixFQUE2QixNQUFBLFNBQUEsQ0FBRSxLQUFGLENBQUE7QUFDN0IsTUFBQSxPQUFBLEVBQUE7QUFBRSxTQUFBLElBQUE7QUFDRTtJQUFBLDBCQUFBO01BQ0UsTUFBTTtNQUNOLElBQVUsS0FBSyxDQUFDLEtBQWhCO0FBQUEsZUFBQTs7SUFGRjtFQURGO0FBRDJCLENBQTdCOztBQU1BLE9BQUEsQ0FBUSxLQUFSLEVBQWUsU0FBZixFQUEwQixjQUExQixFQUEwQyxRQUFBLENBQUUsT0FBRixFQUFXLE1BQVgsQ0FBQTtBQUMxQyxNQUFBO0VBQUUsS0FBQSxHQUFRLEtBQUssQ0FBQyxJQUFOLENBQVcsT0FBWDtTQUNSLEtBQUEsQ0FBTSxLQUFOLEVBQWEsTUFBYjtBQUZ3QyxDQUExQyxFQWpFQTs7O0FBc0VBLE9BQUEsQ0FBUSxLQUFSLEVBQWUsS0FBSyxDQUFDLE1BQXJCLEVBQTZCLGNBQTdCLEVBQTZDLE1BQUEsU0FBQSxDQUFFLEtBQUYsRUFBUyxNQUFULENBQUE7QUFDN0MsTUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0VBQUUsMkJBQUE7QUFDRTtJQUFBLDBCQUFBO01BQ0UsTUFBTTtNQUNOLElBQVUsS0FBSyxDQUFDLEtBQWhCO0FBQUEsZUFBQTs7SUFGRjtFQURGO0FBRDJDLENBQTdDOztBQU1BLE9BQUEsQ0FBUSxLQUFSLEVBQWUsU0FBZixFQUEwQixJQUFJLENBQUMsUUFBL0IsRUFBeUMsUUFBQSxDQUFFLE9BQUYsRUFBVyxPQUFYLENBQUE7QUFDekMsTUFBQTtFQUFFLEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFXLE9BQVg7RUFDUixLQUFLLENBQUMsT0FBTixHQUFnQjtTQUNoQixLQUFBLENBQU0sS0FBTjtBQUh1QyxDQUF6Qzs7QUFLQSxPQUFBLENBQVEsS0FBUixFQUFlLEtBQUssQ0FBQyxNQUFyQixFQUE2QixJQUFJLENBQUMsUUFBbEMsRUFBNEMsUUFBQSxDQUFFLEtBQUYsRUFBUyxPQUFULENBQUE7RUFDMUMsS0FBSyxDQUFDLE9BQU4sR0FBZ0I7U0FDaEIsS0FBQSxDQUFNLEtBQU47QUFGMEMsQ0FBNUM7O0FBSUEsT0FBQSxDQUFRLEtBQVIsRUFBZSxTQUFmLEVBQTBCLElBQUksQ0FBQyxRQUEvQixFQUF5QyxjQUF6QyxFQUF5RCxRQUFBLENBQUUsT0FBRixFQUFXLE9BQVgsRUFBb0IsTUFBcEIsQ0FBQTtBQUN6RCxNQUFBO0VBQUUsS0FBQSxHQUFRLEtBQUssQ0FBQyxJQUFOLENBQVcsT0FBWDtFQUNSLEtBQUssQ0FBQyxPQUFOLEdBQWdCO1NBQ2hCLEtBQUEsQ0FBTSxLQUFOLEVBQWEsTUFBYjtBQUh1RCxDQUF6RDs7QUFLQSxPQUFBLENBQVEsS0FBUixFQUFlLEtBQUssQ0FBQyxNQUFyQixFQUE2QixJQUFJLENBQUMsUUFBbEMsRUFBNEMsY0FBNUMsRUFBNEQsUUFBQSxDQUFFLEtBQUYsRUFBUyxPQUFULEVBQWtCLE1BQWxCLENBQUE7RUFDMUQsS0FBSyxDQUFDLE9BQU4sR0FBZ0I7U0FDaEIsS0FBQSxDQUFNLEtBQU4sRUFBYSxNQUFiO0FBRjBELENBQTVELEVBMUZBOzs7QUFnR0EsR0FBQSxHQUFNLE9BQUEsQ0FBUTtFQUFBLElBQUEsRUFBTTtBQUFOLENBQVIsRUFoR047OztBQW1HQSxPQUFBLENBQVEsR0FBUixFQUFhLElBQUksQ0FBQyxLQUFsQixFQUF5QixRQUFBLENBQUEsR0FBRSxJQUFGLENBQUE7U0FDdkIsR0FBQSxDQUFJLEtBQUEsQ0FBTSxHQUFBLElBQU4sQ0FBSjtBQUR1QixDQUF6Qjs7QUFHQSxPQUFBLENBQVEsR0FBUixFQUFhLElBQUksQ0FBQyxTQUFsQixFQUE2QixNQUFBLFFBQUEsQ0FBRSxPQUFGLENBQUE7QUFDN0IsTUFBQSxNQUFBLEVBQUE7RUFBRSw0QkFBQTtJQUNFLE1BQUEsR0FBUztFQURYO1NBRUE7QUFIMkIsQ0FBN0I7O0FBS0EsSUFBQSxHQUFPLFFBQUEsQ0FBRSxFQUFGLENBQUE7U0FDTCxNQUFBLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtBQUNGLFFBQUE7SUFBSSxLQUFBLEdBQVEsQ0FBQSxNQUFNLEdBQUEsQ0FBSSxLQUFBLENBQU0sRUFBTixFQUFVLEdBQUEsSUFBVixDQUFKLENBQU47SUFDUixJQUFHLG1CQUFIO01BQ0UsTUFBTSxLQUFLLENBQUMsTUFEZDs7V0FFQSxLQUFLLENBQUM7RUFKUjtBQURLOztBQU9QLE9BQUEsQ0FBQTs7QUFDQSxPQUFBLENBQUE7O0FBQ0EsT0FBQSxDQUFBOztBQUNBLE9BQUEsQ0FBQTs7QUFDQSxPQUFBO0VBQ0UsSUFERjtFQUVFLEtBRkY7RUFHRSxHQUhGO0VBSUUsSUFKRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcbmltcG9ydCB7IGlzTWFjaGluZSwgaXNJdGVyYXRvcktpbmQsIGlzR2VuZXJhdG9yRnVuY3Rpb25LaW5kIH0gZnJvbSBcIi4vdHlwZXNcIlxuXG5cblN0ZXAgPVxuICBtYXRjaFZlcnRleDogKCB0YWxvcyApIC0+XG4gICAgdmVydGV4ID0gdGFsb3MubWFjaGluZS5ncmFwaFsgdGFsb3Muc3RhdGUgXVxuICAgIGlmICF2ZXJ0ZXg/XG4gICAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJ0YWxvczogc3RhdGUgaXMgbm90IGluIG1hY2hpbmUgZ3JhcGhcIlxuICAgIHZlcnRleFxuXG4gIG1hdGNoRWRnZTogKCB2ZXJ0ZXgsIHRhbG9zLCBldmVudCApIC0+XG4gICAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgICB0cnlcbiAgICAgICAgaWYgKCBhd2FpdCBlZGdlLndoZW4gdGFsb3MsIGV2ZW50ICkgPT0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBlZGdlXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJ0YWxvczogbm8gbWF0Y2hpbmcgd2hlbiBjb25kaXRpb25cIlxuXG4gIHJ1bjogKCBlZGdlLCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIHRyeVxuICAgICAgaWYgaXNHZW5lcmF0b3JGdW5jdGlvbktpbmQgZWRnZS5ydW5cbiAgICAgICAgeWllbGQgZnJvbSBhd2FpdCBlZGdlLnJ1biB0YWxvcywgZXZlbnRcbiAgICAgIGVsc2UgaWYgVHlwZS5pc0Z1bmN0aW9uIGVkZ2UucnVuXG4gICAgICAgIGF3YWl0IGVkZ2UucnVuIHRhbG9zLCBldmVudFxuICAgIGNhdGNoIGVycm9yXG4gICAgICB0YWxvcy5jYXRjaCBlcnJvclxuXG4gIG1vdmU6ICggZWRnZSwgdGFsb3MsIGV2ZW50ICkgLT5cbiAgICB0cnlcbiAgICAgIHByZXZpb3VzID0gdGFsb3Muc3RhdGVcbiAgICAgIGF3YWl0IGVkZ2UubW92ZSB0YWxvcywgZXZlbnRcbiAgICAgIHRhbG9zLnByZXZpb3VzU3RhdGUgPSBwcmV2aW91c1xuICAgIGNhdGNoIGVycm9yXG4gICAgICB0YWxvcy5jYXRjaCBlcnJvclxuXG4gIHRpY2s6ICggdGFsb3MsIGV2ZW50ICkgLT5cbiAgICB2ZXJ0ZXggPSBTdGVwLm1hdGNoVmVydGV4IHRhbG9zXG4gICAgeWllbGQgdGFsb3MgaWYgdGFsb3MuZW5kZWRcbiAgICBlZGdlID0gYXdhaXQgU3RlcC5tYXRjaEVkZ2UgdmVydGV4LCB0YWxvcywgZXZlbnRcbiAgICB5aWVsZCB0YWxvcyBpZiB0YWxvcy5lbmRlZFxuICAgIHlpZWxkIGZyb20gYXdhaXQgU3RlcC5ydW4gZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3MgaWYgdGFsb3MuZW5kZWRcbiAgICBhd2FpdCBTdGVwLm1vdmUgZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3MgICAjIHRoaXMgaXMgdGhlIGhhcHB5LXBhdGggeWllbGRcblxuXG5zdGFydCA9IGdlbmVyaWMgbmFtZTogXCJ0YWxvczogYXN5bmMgc3RhcnRcIlxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsICggbWFjaGluZSApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIGl0cyBvd24gY29udGV4dCByZXBlYXRlZGx5LlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCAoIHRhbG9zICkgLT5cbiAgbG9vcFxuICAgIGZvciBhd2FpdCBjdXJyZW50IGZyb20gU3RlcC50aWNrIHRhbG9zLCB0YWxvcy5jb250ZXh0XG4gICAgICB5aWVsZCBjdXJyZW50XG4gICAgICByZXR1cm4gaWYgdGFsb3MuZW5kZWRcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBpc0l0ZXJhdG9yS2luZCwgKCBtYWNoaW5lLCBldmVudHMgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICBzdGFydCB0YWxvcywgZXZlbnRzXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIHZhbHVlcyBmcm9tIHJlYWN0b3IuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsIGlzSXRlcmF0b3JLaW5kLCAoIHRhbG9zLCBldmVudHMgKSAtPlxuICBmb3IgYXdhaXQgZXZlbnQgZnJvbSBldmVudHNcbiAgICBmb3IgYXdhaXQgY3VycmVudCBmcm9tIFN0ZXAudGljayB0YWxvcywgZXZlbnRcbiAgICAgIHlpZWxkIGN1cnJlbnRcbiAgICAgIHJldHVybiBpZiB0YWxvcy5lbmRlZFxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsIFR5cGUuaXNPYmplY3QsICggbWFjaGluZSwgY29udGV4dCApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgKCB0YWxvcywgY29udGV4dCApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc09iamVjdCwgaXNJdGVyYXRvcktpbmQsICggbWFjaGluZSwgY29udGV4dCwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNPYmplY3QsIGlzSXRlcmF0b3JLaW5kLCAoIHRhbG9zLCBjb250ZXh0LCBldmVudHMgKSAtPlxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvcywgZXZlbnRzXG5cblxuIyBDb252ZW5pZW5jZSBmdW5jdGlvbiB0byBrZWVwIGdvaW5nIGFuZCBvbmx5IHJldHVybiB0aGUgZmluYWwgdGFsb3MuXG5ydW4gPSBnZW5lcmljIG5hbWU6IFwidGFsb3M6IGFzeW5jIHJ1blwiXG5cbiMgRnVydGhlciBjb252ZW5pZW5jZSB0byBzdXBwb3J0IGF1dG9tYXRpY2FsbHkgdXNpbmcgc3RhcnQuXG5nZW5lcmljIHJ1biwgVHlwZS5pc0FueSwgKCBhcmdzLi4uICkgLT5cbiAgcnVuIHN0YXJ0IGFyZ3MuLi5cblxuZ2VuZXJpYyBydW4sIFR5cGUuaXNSZWFjdG9yLCAoIHJlYWN0b3IgKSAtPlxuICBmb3IgYXdhaXQgdGFsb3MgZnJvbSByZWFjdG9yXG4gICAgcmVzdWx0ID0gdGFsb3NcbiAgcmVzdWx0XG5cbmZsb3cgPSAoIGZ4ICkgLT5cbiAgKCBhcmdzLi4uICkgLT5cbiAgICB0YWxvcyA9IGF3YWl0IHJ1biBzdGFydCBmeCwgYXJncy4uLlxuICAgIGlmIHRhbG9zLmVycm9yP1xuICAgICAgdGhyb3cgdGFsb3MuZXJyb3JcbiAgICB0YWxvcy5jb250ZXh0XG5cbmV4cG9ydCAqIGZyb20gXCIuL3N0YXRlc1wiXG5leHBvcnQgKiBmcm9tIFwiLi9tYWNoaW5lXCJcbmV4cG9ydCAqIGZyb20gXCIuL3RhbG9zXCJcbmV4cG9ydCAqIGZyb20gXCIuL3R5cGVzXCJcbmV4cG9ydCB7XG4gIFN0ZXAgIFxuICBzdGFydFxuICBydW5cbiAgZmxvd1xufSJdfQ==
 //# sourceURL=/@dashkite/talos/src/async.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2FzeW5jLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5pbXBvcnQgKiBhcyBGbiBmcm9tIFwiQGRhc2hraXRlL2pveS9mdW5jdGlvblwiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgTWFjaGluZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuaW1wb3J0IHsgVGFsb3MgfSBmcm9tIFwiLi90YWxvc1wiXG5pbXBvcnQgeyBpc01hY2hpbmUsIGlzSXRlcmF0b3JLaW5kLCBpc0dlbmVyYXRvckZ1bmN0aW9uS2luZCB9IGZyb20gXCIuL3R5cGVzXCJcblxuXG5TdGVwID1cbiAgbWF0Y2hWZXJ0ZXg6ICggdGFsb3MgKSAtPlxuICAgIHZlcnRleCA9IHRhbG9zLm1hY2hpbmUuZ3JhcGhbIHRhbG9zLnN0YXRlIF1cbiAgICBpZiAhdmVydGV4P1xuICAgICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwidGFsb3M6IHN0YXRlIGlzIG5vdCBpbiBtYWNoaW5lIGdyYXBoXCJcbiAgICB2ZXJ0ZXhcblxuICBtYXRjaEVkZ2U6ICggdmVydGV4LCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGZvciBlZGdlIGluIHZlcnRleC5lZGdlc1xuICAgICAgdHJ5XG4gICAgICAgIGlmICggYXdhaXQgZWRnZS53aGVuIHRhbG9zLCBldmVudCApID09IHRydWVcbiAgICAgICAgICByZXR1cm4gZWRnZVxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgcmV0dXJuIHRhbG9zLmNhdGNoIGVycm9yXG4gICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwidGFsb3M6IG5vIG1hdGNoaW5nIHdoZW4gY29uZGl0aW9uXCJcblxuICBydW46ICggZWRnZSwgdGFsb3MsIGV2ZW50ICkgLT5cbiAgICB0cnlcbiAgICAgIGlmIGlzR2VuZXJhdG9yRnVuY3Rpb25LaW5kIGVkZ2UucnVuXG4gICAgICAgIHlpZWxkIGZyb20gYXdhaXQgZWRnZS5ydW4gdGFsb3MsIGV2ZW50XG4gICAgICBlbHNlIGlmIFR5cGUuaXNGdW5jdGlvbiBlZGdlLnJ1blxuICAgICAgICBhd2FpdCBlZGdlLnJ1biB0YWxvcywgZXZlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBwcmV2aW91cyA9IHRhbG9zLnN0YXRlXG4gICAgICBhd2FpdCBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgICB0YWxvcy5wcmV2aW91c1N0YXRlID0gcHJldmlvdXNcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICB0aWNrOiAoIHRhbG9zLCBldmVudCApIC0+XG4gICAgdmVydGV4ID0gU3RlcC5tYXRjaFZlcnRleCB0YWxvc1xuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgZWRnZSA9IGF3YWl0IFN0ZXAubWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3MgaWYgdGFsb3MuZW5kZWRcbiAgICB5aWVsZCBmcm9tIGF3YWl0IFN0ZXAucnVuIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgYXdhaXQgU3RlcC5tb3ZlIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zICAgIyB0aGlzIGlzIHRoZSBoYXBweS1wYXRoIHlpZWxkXG5cblxuc3RhcnQgPSBnZW5lcmljIG5hbWU6IFwidGFsb3M6IGFzeW5jIHN0YXJ0XCJcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCAoIG1hY2hpbmUgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICBzdGFydCB0YWxvc1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyBpdHMgb3duIGNvbnRleHQgcmVwZWF0ZWRseS5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgKCB0YWxvcyApIC0+XG4gIGxvb3BcbiAgICBmb3IgYXdhaXQgY3VycmVudCBmcm9tIFN0ZXAudGljayB0YWxvcywgdGFsb3MuY29udGV4dFxuICAgICAgeWllbGQgY3VycmVudFxuICAgICAgcmV0dXJuIGlmIHRhbG9zLmVuZGVkXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgaXNJdGVyYXRvcktpbmQsICggbWFjaGluZSwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyB2YWx1ZXMgZnJvbSByZWFjdG9yLlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBpc0l0ZXJhdG9yS2luZCwgKCB0YWxvcywgZXZlbnRzICkgLT5cbiAgZm9yIGF3YWl0IGV2ZW50IGZyb20gZXZlbnRzXG4gICAgZm9yIGF3YWl0IGN1cnJlbnQgZnJvbSBTdGVwLnRpY2sgdGFsb3MsIGV2ZW50XG4gICAgICB5aWVsZCBjdXJyZW50XG4gICAgICByZXR1cm4gaWYgdGFsb3MuZW5kZWRcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzT2JqZWN0LCAoIG1hY2hpbmUsIGNvbnRleHQgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvc1xuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNPYmplY3QsICggdGFsb3MsIGNvbnRleHQgKSAtPlxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvc1xuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsIFR5cGUuaXNPYmplY3QsIGlzSXRlcmF0b3JLaW5kLCAoIG1hY2hpbmUsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCBpc0l0ZXJhdG9yS2luZCwgKCB0YWxvcywgY29udGV4dCwgZXZlbnRzICkgLT5cbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG5cbiMgQ29udmVuaWVuY2UgZnVuY3Rpb24gdG8ga2VlcCBnb2luZyBhbmQgb25seSByZXR1cm4gdGhlIGZpbmFsIHRhbG9zLlxucnVuID0gZ2VuZXJpYyBuYW1lOiBcInRhbG9zOiBhc3luYyBydW5cIlxuXG4jIEZ1cnRoZXIgY29udmVuaWVuY2UgdG8gc3VwcG9ydCBhdXRvbWF0aWNhbGx5IHVzaW5nIHN0YXJ0LlxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBbnksICggYXJncy4uLiApIC0+XG4gIHJ1biBzdGFydCBhcmdzLi4uXG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzUmVhY3RvciwgKCByZWFjdG9yICkgLT5cbiAgZm9yIGF3YWl0IHRhbG9zIGZyb20gcmVhY3RvclxuICAgIHJlc3VsdCA9IHRhbG9zXG4gIHJlc3VsdFxuXG5mbG93ID0gKCBmeCApIC0+XG4gICggYXJncy4uLiApIC0+XG4gICAgdGFsb3MgPSBhd2FpdCBydW4gc3RhcnQgZngsIGFyZ3MuLi5cbiAgICBpZiB0YWxvcy5lcnJvcj9cbiAgICAgIHRocm93IHRhbG9zLmVycm9yXG4gICAgdGFsb3MuY29udGV4dFxuXG5leHBvcnQgKiBmcm9tIFwiLi9zdGF0ZXNcIlxuZXhwb3J0ICogZnJvbSBcIi4vbWFjaGluZVwiXG5leHBvcnQgKiBmcm9tIFwiLi90YWxvc1wiXG5leHBvcnQgKiBmcm9tIFwiLi90eXBlc1wiXG5leHBvcnQge1xuICBTdGVwICBcbiAgc3RhcnRcbiAgcnVuXG4gIGZsb3dcbn0iLG51bGxdLCJuYW1lcyI6WyJTdGVwIiwiZmxvdyIsInJ1biIsInN0YXJ0IiwiZ2VuZXJpYyIsIkZuIiwiVHlwZSIsIk1hY2hpbmUiLCJUYWxvcyIsImlzTWFjaGluZSIsImlzSXRlcmF0b3JLaW5kIiwiaXNHZW5lcmF0b3JGdW5jdGlvbktpbmQiLCJtYXRjaFZlcnRleCIsInRhbG9zIiwidmVydGV4IiwibWFjaGluZSIsImdyYXBoIiwic3RhdGUiLCJjYXRjaCIsIkVycm9yIiwibWF0Y2hFZGdlIiwiZXZlbnQiLCJlZGdlIiwiZXJyb3IiLCJpIiwibGVuIiwicmVmIiwiZWRnZXMiLCJsZW5ndGgiLCJ3aGVuIiwiZXJyb3IxIiwiaXNGdW5jdGlvbiIsIm1vdmUiLCJwcmV2aW91cyIsInByZXZpb3VzU3RhdGUiLCJ0aWNrIiwiZW5kZWQiLCJuYW1lIiwibWFrZSIsImlzVHlwZSIsImN1cnJlbnQiLCJjb250ZXh0IiwiZXZlbnRzIiwiaXNPYmplY3QiLCJpc0FueSIsImFyZ3MiLCJpc1JlYWN0b3IiLCJyZWFjdG9yIiwicmVzdWx0IiwiZngiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBLE1BQUFDLE1BQUFDLEtBQUFDO0FBQUEsU0FBU0MsT0FBVCxRQUFBLHdCQUFBO0FBQ0EsWUFBT0MsUUFBUCx5QkFBQTtBQUNBLFlBQU9DLFVBQVAscUJBQUE7QUFDQSxTQUFTQyxPQUFULFFBQUEsWUFBQTtBQUNBLFNBQVNDLEtBQVQsUUFBQSxVQUFBO0FBQ0EsU0FBU0MsU0FBVCxFQUFvQkMsY0FBcEIsRUFBb0NDLHVCQUFwQyxRQUFBLFVBQUE7QUFHQVgsT0FDRTtJQUFBWSxhQUFhLFNBQUVDLEtBQUY7UUFDZixJQUFBQztRQUFJQSxTQUFTRCxNQUFNRSxPQUFPLENBQUNDLEtBQUssQ0FBRUgsTUFBTUksS0FBUixDQUFBO1FBQzVCLElBQUlILFVBQUEsTUFBSjtZQUNFRCxNQUFNSyxLQUFOLENBQVksSUFBSUMsTUFBTTs7ZUFD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