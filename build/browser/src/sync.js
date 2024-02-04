var Step, pipe, run, start;
import { generic } from "@dashkite/joy/generic";
import * as Fn from "@dashkite/joy/function";
import * as Type from "@dashkite/joy/type";
import { Machine } from "./machine";
import { Talos } from "./talos";
import { isMachine, isGeneratorFunction } from "./types";
Step = {
    matchVertex: function(talos) {
        var vertex;
        vertex = talos.machine.graph[talos.state];
        if (vertex == null) {
            talos.catch(new Error("talos state is not in machine graph"));
        }
        return vertex;
    },
    matchEdge: function(vertex, talos, event) {
        var edge, error, i, len, ref;
        ref = vertex.edges;
        for(i = 0, len = ref.length; i < len; i++){
            edge = ref[i];
            try {
                if (edge.when(talos, event) === true) {
                    return edge;
                }
            } catch (error1) {
                error = error1;
                return talos.catch(error);
            }
        }
        return talos.catch(new Error("no matching when condition"));
    },
    run: function*(edge, talos, event) {
        var error;
        try {
            if (isGeneratorFunction(edge.run)) {
                return yield* edge.run(talos, event);
            } else if (Type.isFunction(edge.run)) {
                return edge.run(talos, event);
            }
        } catch (error1) {
            error = error1;
            return talos.catch(error);
        }
    },
    move: function(edge, talos, event) {
        var error, previous;
        try {
            previous = talos.state;
            edge.move(talos, event);
            return talos.previousState = previous;
        } catch (error1) {
            error = error1;
            return talos.catch(error);
        }
    },
    tick: function*(talos, event) {
        var edge, vertex;
        vertex = Step.matchVertex(talos);
        if (talos.ended) {
            yield talos;
        }
        edge = Step.matchEdge(vertex, talos, event);
        if (talos.ended) {
            yield talos;
        }
        yield* Step.run(edge, talos, event);
        if (talos.ended) {
            yield talos;
        }
        Step.move(edge, talos, event);
        return yield talos; // this is the happy-path yield
    }
};
start = generic({
    name: "talos: sync start"
});
generic(start, isMachine, function(machine) {
    var talos;
    talos = Talos.make(machine);
    return start(talos);
});
// Create generator where state machine consumes its own context repeatedly.
generic(start, Talos.isType, function*(talos) {
    var current, ref;
    while(true){
        ref = Step.tick(talos, talos.context);
        for (current of ref){
            yield current;
            if (talos.ended) {
                return;
            }
        }
    }
});
generic(start, isMachine, Type.isIterable, function(machine, events) {
    var talos;
    talos = Talos.make(machine);
    return start(talos, events);
});
// Create generator where state machine consumes values from iterator.
generic(start, Talos.isType, Type.isIterable, function*(talos, events) {
    var current, event, ref;
    for (event of events){
        ref = Step.tick(talos, event);
        for (current of ref){
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
generic(start, isMachine, Type.isObject, Type.isIterable, function(machine, context, events) {
    var talos;
    talos = Talos.make(machine);
    talos.context = context;
    return start(talos, events);
});
generic(start, Talos.isType, Type.isObject, Type.isIterable, function(talos, context, events) {
    talos.context = context;
    return start(talos, events);
});
// Convenience function to keep going and only return the final talos.
run = generic({
    name: "talos: sync run"
});
// Further convenience to support automatically using start.
generic(run, Type.isAny, function() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    return run(start(...args));
});
generic(run, Type.isIterator, function(iterator) {
    var result, talos;
    for (talos of iterator){
        result = talos;
    }
    return result;
});
pipe = function(fx) {
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        var talos;
        talos = run(start(fx, ...args));
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
export { Step, start, run, pipe }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvc3luYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsT0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLE1BQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLFNBQVQ7RUFBb0IsbUJBQXBCO0NBQUEsTUFBQTs7QUFHQSxJQUFBLEdBQ0U7RUFBQSxXQUFBLEVBQWEsUUFBQSxDQUFFLEtBQUYsQ0FBQTtBQUNmLFFBQUE7SUFBSSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUUsS0FBSyxDQUFDLEtBQVI7SUFDNUIsSUFBSSxjQUFKO01BQ0UsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFJLEtBQUosQ0FBVSxxQ0FBVixDQUFaLEVBREY7O1dBRUE7RUFKVyxDQUFiO0VBTUEsU0FBQSxFQUFXLFFBQUEsQ0FBRSxNQUFGLEVBQVUsS0FBVixFQUFpQixLQUFqQixDQUFBO0FBQ2IsUUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7QUFBSTtJQUFBLEtBQUEscUNBQUE7O0FBQ0U7UUFDRSxJQUFHLENBQUUsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEtBQWpCLENBQUYsQ0FBQSxLQUE4QixJQUFqQztBQUNFLGlCQUFPLEtBRFQ7U0FERjtPQUdBLGNBQUE7UUFBTTtBQUNKLGVBQU8sS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFaLEVBRFQ7O0lBSkY7V0FNQSxLQUFLLENBQUMsS0FBTixDQUFZLElBQUksS0FBSixDQUFVLDRCQUFWLENBQVo7RUFQUyxDQU5YO0VBZUEsR0FBQSxFQUFLLFNBQUEsQ0FBRSxJQUFGLEVBQVEsS0FBUixFQUFlLEtBQWYsQ0FBQTtBQUNQLFFBQUE7QUFBSTtNQUNFLElBQUcsbUJBQUEsQ0FBb0IsSUFBSSxDQUFDLEdBQXpCLENBQUg7ZUFDRSxDQUFBLE9BQVcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxLQUFULEVBQWdCLEtBQWhCLENBQVgsRUFERjtPQUFBLE1BRUssSUFBRyxJQUFJLENBQUMsVUFBTCxDQUFnQixJQUFJLENBQUMsR0FBckIsQ0FBSDtlQUNILElBQUksQ0FBQyxHQUFMLENBQVMsS0FBVCxFQUFnQixLQUFoQixFQURHO09BSFA7S0FLQSxjQUFBO01BQU07YUFDSixLQUFLLENBQUMsS0FBTixDQUFZLEtBQVosRUFERjs7RUFORyxDQWZMO0VBd0JBLElBQUEsRUFBTSxRQUFBLENBQUUsSUFBRixFQUFRLEtBQVIsRUFBZSxLQUFmLENBQUE7QUFDUixRQUFBLEtBQUEsRUFBQTtBQUFJO01BQ0UsUUFBQSxHQUFXLEtBQUssQ0FBQztNQUNqQixJQUFJLENBQUMsSUFBTCxDQUFVLEtBQVYsRUFBaUIsS0FBakI7YUFDQSxLQUFLLENBQUMsYUFBTixHQUFzQixTQUh4QjtLQUlBLGNBQUE7TUFBTTthQUNKLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBWixFQURGOztFQUxJLENBeEJOO0VBZ0NBLElBQUEsRUFBTSxTQUFBLENBQUUsS0FBRixFQUFTLEtBQVQsQ0FBQTtBQUNSLFFBQUEsSUFBQSxFQUFBO0lBQUksTUFBQSxHQUFTLElBQUksQ0FBQyxXQUFMLENBQWlCLEtBQWpCO0lBQ1QsSUFBZSxLQUFLLENBQUMsS0FBckI7TUFBQSxNQUFNLE1BQU47O0lBQ0EsSUFBQSxHQUFPLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZixFQUF1QixLQUF2QixFQUE4QixLQUE5QjtJQUNQLElBQWUsS0FBSyxDQUFDLEtBQXJCO01BQUEsTUFBTSxNQUFOOztJQUNBLE9BQVcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFULEVBQWUsS0FBZixFQUFzQixLQUF0QjtJQUNYLElBQWUsS0FBSyxDQUFDLEtBQXJCO01BQUEsTUFBTSxNQUFOOztJQUNBLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QixLQUF2QjtXQUNBLENBQUEsTUFBTSxLQUFOLEVBUkk7RUFBQTtBQWhDTjs7QUEyQ0YsS0FBQSxHQUFRLE9BQUEsQ0FBUTtFQUFBLElBQUEsRUFBTTtBQUFOLENBQVI7O0FBRVIsT0FBQSxDQUFRLEtBQVIsRUFBZSxTQUFmLEVBQTBCLFFBQUEsQ0FBRSxPQUFGLENBQUE7QUFDMUIsTUFBQTtFQUFFLEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFXLE9BQVg7U0FDUixLQUFBLENBQU0sS0FBTjtBQUZ3QixDQUExQixFQXREQTs7O0FBMkRBLE9BQUEsQ0FBUSxLQUFSLEVBQWUsS0FBSyxDQUFDLE1BQXJCLEVBQTZCLFNBQUEsQ0FBRSxLQUFGLENBQUE7QUFDN0IsTUFBQSxPQUFBLEVBQUE7QUFBRSxTQUFBLElBQUE7QUFDRTtJQUFBLEtBQUEsY0FBQTtNQUNFLE1BQU07TUFDTixJQUFVLEtBQUssQ0FBQyxLQUFoQjtBQUFBLGVBQUE7O0lBRkY7RUFERjtBQUQyQixDQUE3Qjs7QUFNQSxPQUFBLENBQVEsS0FBUixFQUFlLFNBQWYsRUFBMEIsSUFBSSxDQUFDLFVBQS9CLEVBQTJDLFFBQUEsQ0FBRSxPQUFGLEVBQVcsTUFBWCxDQUFBO0FBQzNDLE1BQUE7RUFBRSxLQUFBLEdBQVEsS0FBSyxDQUFDLElBQU4sQ0FBVyxPQUFYO1NBQ1IsS0FBQSxDQUFNLEtBQU4sRUFBYSxNQUFiO0FBRnlDLENBQTNDLEVBakVBOzs7QUFzRUEsT0FBQSxDQUFRLEtBQVIsRUFBZSxLQUFLLENBQUMsTUFBckIsRUFBNkIsSUFBSSxDQUFDLFVBQWxDLEVBQThDLFNBQUEsQ0FBRSxLQUFGLEVBQVMsTUFBVCxDQUFBO0FBQzlDLE1BQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtFQUFFLEtBQUEsZUFBQTtBQUNFO0lBQUEsS0FBQSxjQUFBO01BQ0UsTUFBTTtNQUNOLElBQVUsS0FBSyxDQUFDLEtBQWhCO0FBQUEsZUFBQTs7SUFGRjtFQURGO0FBRDRDLENBQTlDOztBQU1BLE9BQUEsQ0FBUSxLQUFSLEVBQWUsU0FBZixFQUEwQixJQUFJLENBQUMsUUFBL0IsRUFBeUMsUUFBQSxDQUFFLE9BQUYsRUFBVyxPQUFYLENBQUE7QUFDekMsTUFBQTtFQUFFLEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFXLE9BQVg7RUFDUixLQUFLLENBQUMsT0FBTixHQUFnQjtTQUNoQixLQUFBLENBQU0sS0FBTjtBQUh1QyxDQUF6Qzs7QUFLQSxPQUFBLENBQVEsS0FBUixFQUFlLEtBQUssQ0FBQyxNQUFyQixFQUE2QixJQUFJLENBQUMsUUFBbEMsRUFBNEMsUUFBQSxDQUFFLEtBQUYsRUFBUyxPQUFULENBQUE7RUFDMUMsS0FBSyxDQUFDLE9BQU4sR0FBZ0I7U0FDaEIsS0FBQSxDQUFNLEtBQU47QUFGMEMsQ0FBNUM7O0FBSUEsT0FBQSxDQUFRLEtBQVIsRUFBZSxTQUFmLEVBQTBCLElBQUksQ0FBQyxRQUEvQixFQUF5QyxJQUFJLENBQUMsVUFBOUMsRUFBMEQsUUFBQSxDQUFFLE9BQUYsRUFBVyxPQUFYLEVBQW9CLE1BQXBCLENBQUE7QUFDMUQsTUFBQTtFQUFFLEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFXLE9BQVg7RUFDUixLQUFLLENBQUMsT0FBTixHQUFnQjtTQUNoQixLQUFBLENBQU0sS0FBTixFQUFhLE1BQWI7QUFId0QsQ0FBMUQ7O0FBS0EsT0FBQSxDQUFRLEtBQVIsRUFBZSxLQUFLLENBQUMsTUFBckIsRUFBNkIsSUFBSSxDQUFDLFFBQWxDLEVBQTRDLElBQUksQ0FBQyxVQUFqRCxFQUE2RCxRQUFBLENBQUUsS0FBRixFQUFTLE9BQVQsRUFBa0IsTUFBbEIsQ0FBQTtFQUMzRCxLQUFLLENBQUMsT0FBTixHQUFnQjtTQUNoQixLQUFBLENBQU0sS0FBTixFQUFhLE1BQWI7QUFGMkQsQ0FBN0QsRUExRkE7OztBQWdHQSxHQUFBLEdBQU0sT0FBQSxDQUFRO0VBQUEsSUFBQSxFQUFNO0FBQU4sQ0FBUixFQWhHTjs7O0FBbUdBLE9BQUEsQ0FBUSxHQUFSLEVBQWEsSUFBSSxDQUFDLEtBQWxCLEVBQXlCLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtTQUN2QixHQUFBLENBQUksS0FBQSxDQUFNLEdBQUEsSUFBTixDQUFKO0FBRHVCLENBQXpCOztBQUdBLE9BQUEsQ0FBUSxHQUFSLEVBQWEsSUFBSSxDQUFDLFVBQWxCLEVBQThCLFFBQUEsQ0FBRSxRQUFGLENBQUE7QUFDOUIsTUFBQSxNQUFBLEVBQUE7RUFBRSxLQUFBLGlCQUFBO0lBQ0UsTUFBQSxHQUFTO0VBRFg7U0FFQTtBQUg0QixDQUE5Qjs7QUFLQSxJQUFBLEdBQU8sUUFBQSxDQUFFLEVBQUYsQ0FBQTtTQUNMLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtBQUNGLFFBQUE7SUFBSSxLQUFBLEdBQVEsR0FBQSxDQUFJLEtBQUEsQ0FBTSxFQUFOLEVBQVUsR0FBQSxJQUFWLENBQUo7SUFDUixJQUFHLG1CQUFIO01BQ0UsTUFBTSxLQUFLLENBQUMsTUFEZDs7V0FFQSxLQUFLLENBQUM7RUFKUjtBQURLOztBQU9QLE9BQUEsQ0FBQTs7QUFDQSxPQUFBLENBQUE7O0FBQ0EsT0FBQSxDQUFBOztBQUNBLE9BQUEsQ0FBQTs7QUFDQSxPQUFBO0VBQ0UsSUFERjtFQUVFLEtBRkY7RUFHRSxHQUhGO0VBSUUsSUFKRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcbmltcG9ydCB7IGlzTWFjaGluZSwgaXNHZW5lcmF0b3JGdW5jdGlvbiB9IGZyb20gXCIuL3R5cGVzXCJcblxuXG5TdGVwID1cbiAgbWF0Y2hWZXJ0ZXg6ICggdGFsb3MgKSAtPlxuICAgIHZlcnRleCA9IHRhbG9zLm1hY2hpbmUuZ3JhcGhbIHRhbG9zLnN0YXRlIF1cbiAgICBpZiAhdmVydGV4P1xuICAgICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwidGFsb3Mgc3RhdGUgaXMgbm90IGluIG1hY2hpbmUgZ3JhcGhcIlxuICAgIHZlcnRleFxuXG4gIG1hdGNoRWRnZTogKCB2ZXJ0ZXgsIHRhbG9zLCBldmVudCApIC0+XG4gICAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgICB0cnlcbiAgICAgICAgaWYgKCBlZGdlLndoZW4gdGFsb3MsIGV2ZW50ICkgPT0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBlZGdlXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJubyBtYXRjaGluZyB3aGVuIGNvbmRpdGlvblwiXG5cbiAgcnVuOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBpZiBpc0dlbmVyYXRvckZ1bmN0aW9uIGVkZ2UucnVuXG4gICAgICAgIHlpZWxkIGZyb20gZWRnZS5ydW4gdGFsb3MsIGV2ZW50XG4gICAgICBlbHNlIGlmIFR5cGUuaXNGdW5jdGlvbiBlZGdlLnJ1blxuICAgICAgICBlZGdlLnJ1biB0YWxvcywgZXZlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBwcmV2aW91cyA9IHRhbG9zLnN0YXRlXG4gICAgICBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgICB0YWxvcy5wcmV2aW91c1N0YXRlID0gcHJldmlvdXNcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICB0aWNrOiAoIHRhbG9zLCBldmVudCApIC0+XG4gICAgdmVydGV4ID0gU3RlcC5tYXRjaFZlcnRleCB0YWxvc1xuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgZWRnZSA9IFN0ZXAubWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3MgaWYgdGFsb3MuZW5kZWRcbiAgICB5aWVsZCBmcm9tIFN0ZXAucnVuIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgU3RlcC5tb3ZlIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zICAgIyB0aGlzIGlzIHRoZSBoYXBweS1wYXRoIHlpZWxkXG5cblxuc3RhcnQgPSBnZW5lcmljIG5hbWU6IFwidGFsb3M6IHN5bmMgc3RhcnRcIlxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsICggbWFjaGluZSApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIGl0cyBvd24gY29udGV4dCByZXBlYXRlZGx5LlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCAoIHRhbG9zICkgLT5cbiAgbG9vcFxuICAgIGZvciBjdXJyZW50IGZyb20gU3RlcC50aWNrIHRhbG9zLCB0YWxvcy5jb250ZXh0XG4gICAgICB5aWVsZCBjdXJyZW50XG4gICAgICByZXR1cm4gaWYgdGFsb3MuZW5kZWRcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzSXRlcmFibGUsICggbWFjaGluZSwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyB2YWx1ZXMgZnJvbSBpdGVyYXRvci5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0l0ZXJhYmxlLCAoIHRhbG9zLCBldmVudHMgKSAtPlxuICBmb3IgZXZlbnQgZnJvbSBldmVudHNcbiAgICBmb3IgY3VycmVudCBmcm9tIFN0ZXAudGljayB0YWxvcywgZXZlbnRcbiAgICAgIHlpZWxkIGN1cnJlbnRcbiAgICAgIHJldHVybiBpZiB0YWxvcy5lbmRlZFxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsIFR5cGUuaXNPYmplY3QsICggbWFjaGluZSwgY29udGV4dCApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgKCB0YWxvcywgY29udGV4dCApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc09iamVjdCwgVHlwZS5pc0l0ZXJhYmxlLCAoIG1hY2hpbmUsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCBUeXBlLmlzSXRlcmFibGUsICggdGFsb3MsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuXG4jIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGtlZXAgZ29pbmcgYW5kIG9ubHkgcmV0dXJuIHRoZSBmaW5hbCB0YWxvcy5cbnJ1biA9IGdlbmVyaWMgbmFtZTogXCJ0YWxvczogc3luYyBydW5cIlxuXG4jIEZ1cnRoZXIgY29udmVuaWVuY2UgdG8gc3VwcG9ydCBhdXRvbWF0aWNhbGx5IHVzaW5nIHN0YXJ0LlxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBbnksICggYXJncy4uLiApIC0+XG4gIHJ1biBzdGFydCBhcmdzLi4uXG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzSXRlcmF0b3IsICggaXRlcmF0b3IgKSAtPlxuICBmb3IgdGFsb3MgZnJvbSBpdGVyYXRvclxuICAgIHJlc3VsdCA9IHRhbG9zXG4gIHJlc3VsdFxuXG5waXBlID0gKCBmeCApIC0+XG4gICggYXJncy4uLiApIC0+XG4gICAgdGFsb3MgPSBydW4gc3RhcnQgZngsIGFyZ3MuLi5cbiAgICBpZiB0YWxvcy5lcnJvcj9cbiAgICAgIHRocm93IHRhbG9zLmVycm9yXG4gICAgdGFsb3MuY29udGV4dFxuXG5leHBvcnQgKiBmcm9tIFwiLi9zdGF0ZXNcIlxuZXhwb3J0ICogZnJvbSBcIi4vbWFjaGluZVwiXG5leHBvcnQgKiBmcm9tIFwiLi90YWxvc1wiXG5leHBvcnQgKiBmcm9tIFwiLi90eXBlc1wiXG5leHBvcnQge1xuICBTdGVwICBcbiAgc3RhcnRcbiAgcnVuXG4gIHBpcGVcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/sync.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3N5bmMuY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcbmltcG9ydCB7IGlzTWFjaGluZSwgaXNHZW5lcmF0b3JGdW5jdGlvbiB9IGZyb20gXCIuL3R5cGVzXCJcblxuXG5TdGVwID1cbiAgbWF0Y2hWZXJ0ZXg6ICggdGFsb3MgKSAtPlxuICAgIHZlcnRleCA9IHRhbG9zLm1hY2hpbmUuZ3JhcGhbIHRhbG9zLnN0YXRlIF1cbiAgICBpZiAhdmVydGV4P1xuICAgICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwidGFsb3Mgc3RhdGUgaXMgbm90IGluIG1hY2hpbmUgZ3JhcGhcIlxuICAgIHZlcnRleFxuXG4gIG1hdGNoRWRnZTogKCB2ZXJ0ZXgsIHRhbG9zLCBldmVudCApIC0+XG4gICAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgICB0cnlcbiAgICAgICAgaWYgKCBlZGdlLndoZW4gdGFsb3MsIGV2ZW50ICkgPT0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBlZGdlXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJubyBtYXRjaGluZyB3aGVuIGNvbmRpdGlvblwiXG5cbiAgcnVuOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBpZiBpc0dlbmVyYXRvckZ1bmN0aW9uIGVkZ2UucnVuXG4gICAgICAgIHlpZWxkIGZyb20gZWRnZS5ydW4gdGFsb3MsIGV2ZW50XG4gICAgICBlbHNlIGlmIFR5cGUuaXNGdW5jdGlvbiBlZGdlLnJ1blxuICAgICAgICBlZGdlLnJ1biB0YWxvcywgZXZlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBwcmV2aW91cyA9IHRhbG9zLnN0YXRlXG4gICAgICBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgICB0YWxvcy5wcmV2aW91c1N0YXRlID0gcHJldmlvdXNcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICB0aWNrOiAoIHRhbG9zLCBldmVudCApIC0+XG4gICAgdmVydGV4ID0gU3RlcC5tYXRjaFZlcnRleCB0YWxvc1xuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgZWRnZSA9IFN0ZXAubWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3MgaWYgdGFsb3MuZW5kZWRcbiAgICB5aWVsZCBmcm9tIFN0ZXAucnVuIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgU3RlcC5tb3ZlIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zICAgIyB0aGlzIGlzIHRoZSBoYXBweS1wYXRoIHlpZWxkXG5cblxuc3RhcnQgPSBnZW5lcmljIG5hbWU6IFwidGFsb3M6IHN5bmMgc3RhcnRcIlxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsICggbWFjaGluZSApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIGl0cyBvd24gY29udGV4dCByZXBlYXRlZGx5LlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCAoIHRhbG9zICkgLT5cbiAgbG9vcFxuICAgIGZvciBjdXJyZW50IGZyb20gU3RlcC50aWNrIHRhbG9zLCB0YWxvcy5jb250ZXh0XG4gICAgICB5aWVsZCBjdXJyZW50XG4gICAgICByZXR1cm4gaWYgdGFsb3MuZW5kZWRcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzSXRlcmFibGUsICggbWFjaGluZSwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyB2YWx1ZXMgZnJvbSBpdGVyYXRvci5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0l0ZXJhYmxlLCAoIHRhbG9zLCBldmVudHMgKSAtPlxuICBmb3IgZXZlbnQgZnJvbSBldmVudHNcbiAgICBmb3IgY3VycmVudCBmcm9tIFN0ZXAudGljayB0YWxvcywgZXZlbnRcbiAgICAgIHlpZWxkIGN1cnJlbnRcbiAgICAgIHJldHVybiBpZiB0YWxvcy5lbmRlZFxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsIFR5cGUuaXNPYmplY3QsICggbWFjaGluZSwgY29udGV4dCApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgKCB0YWxvcywgY29udGV4dCApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc09iamVjdCwgVHlwZS5pc0l0ZXJhYmxlLCAoIG1hY2hpbmUsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCBUeXBlLmlzSXRlcmFibGUsICggdGFsb3MsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuXG4jIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGtlZXAgZ29pbmcgYW5kIG9ubHkgcmV0dXJuIHRoZSBmaW5hbCB0YWxvcy5cbnJ1biA9IGdlbmVyaWMgbmFtZTogXCJ0YWxvczogc3luYyBydW5cIlxuXG4jIEZ1cnRoZXIgY29udmVuaWVuY2UgdG8gc3VwcG9ydCBhdXRvbWF0aWNhbGx5IHVzaW5nIHN0YXJ0LlxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBbnksICggYXJncy4uLiApIC0+XG4gIHJ1biBzdGFydCBhcmdzLi4uXG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzSXRlcmF0b3IsICggaXRlcmF0b3IgKSAtPlxuICBmb3IgdGFsb3MgZnJvbSBpdGVyYXRvclxuICAgIHJlc3VsdCA9IHRhbG9zXG4gIHJlc3VsdFxuXG5waXBlID0gKCBmeCApIC0+XG4gICggYXJncy4uLiApIC0+XG4gICAgdGFsb3MgPSBydW4gc3RhcnQgZngsIGFyZ3MuLi5cbiAgICBpZiB0YWxvcy5lcnJvcj9cbiAgICAgIHRocm93IHRhbG9zLmVycm9yXG4gICAgdGFsb3MuY29udGV4dFxuXG5leHBvcnQgKiBmcm9tIFwiLi9zdGF0ZXNcIlxuZXhwb3J0ICogZnJvbSBcIi4vbWFjaGluZVwiXG5leHBvcnQgKiBmcm9tIFwiLi90YWxvc1wiXG5leHBvcnQgKiBmcm9tIFwiLi90eXBlc1wiXG5leHBvcnQge1xuICBTdGVwICBcbiAgc3RhcnRcbiAgcnVuXG4gIHBpcGVcbn0iLG51bGxdLCJuYW1lcyI6WyJTdGVwIiwicGlwZSIsInJ1biIsInN0YXJ0IiwiZ2VuZXJpYyIsIkZuIiwiVHlwZSIsIk1hY2hpbmUiLCJUYWxvcyIsImlzTWFjaGluZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJtYXRjaFZlcnRleCIsInRhbG9zIiwidmVydGV4IiwibWFjaGluZSIsImdyYXBoIiwic3RhdGUiLCJjYXRjaCIsIkVycm9yIiwibWF0Y2hFZGdlIiwiZXZlbnQiLCJlZGdlIiwiZXJyb3IiLCJpIiwibGVuIiwicmVmIiwiZWRnZXMiLCJsZW5ndGgiLCJ3aGVuIiwiZXJyb3IxIiwiaXNGdW5jdGlvbiIsIm1vdmUiLCJwcmV2aW91cyIsInByZXZpb3VzU3RhdGUiLCJ0aWNrIiwiZW5kZWQiLCJuYW1lIiwibWFrZSIsImlzVHlwZSIsImN1cnJlbnQiLCJjb250ZXh0IiwiaXNJdGVyYWJsZSIsImV2ZW50cyIsImlzT2JqZWN0IiwiaXNBbnkiLCJhcmdzIiwiaXNJdGVyYXRvciIsIml0ZXJhdG9yIiwicmVzdWx0IiwiZngiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBLE1BQUFDLE1BQUFDLEtBQUFDO0FBQUEsU0FBU0MsT0FBVCxRQUFBLHdCQUFBO0FBQ0EsWUFBT0MsUUFBUCx5QkFBQTtBQUNBLFlBQU9DLFVBQVAscUJBQUE7QUFDQSxTQUFTQyxPQUFULFFBQUEsWUFBQTtBQUNBLFNBQVNDLEtBQVQsUUFBQSxVQUFBO0FBQ0EsU0FBU0MsU0FBVCxFQUFvQkMsbUJBQXBCLFFBQUEsVUFBQTtBQUdBVixPQUNFO0lBQUFXLGFBQWEsU0FBRUMsS0FBRjtRQUNmLElBQUFDO1FBQUlBLFNBQVNELE1BQU1FLE9BQU8sQ0FBQ0MsS0FBSyxDQUFFSCxNQUFNSSxLQUFSLENBQUE7UUFDNUIsSUFBSUgsVUFBQSxNQUFKO1lBQ0VELE1BQU1LLEtBQU4sQ0FBWSxJQUFJQyxNQUFNOztlQUN4Qkw7SUFKVztJQU1iTSxXQUFXLFNBQUVOLE1BQUYsRUFBVUQsS0FBVixFQUFpQlEsS0FBakI7UUFDYixJQUFBQyxNQUFBQyxPQUFBQyxHQUFBQyxLQUFBQztRQUFJQSxNQUFBWixPQUFBYSxLQUFBO1FBQUEs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