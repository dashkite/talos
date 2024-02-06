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
generic(run, Type.isAny, function(...args) {
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
    return function(...args) {
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
export { Step, start, run, pipe }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvc3luYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsT0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLE1BQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLFNBQVQ7RUFBb0IsbUJBQXBCO0NBQUEsTUFBQTs7QUFHQSxJQUFBLEdBQ0U7RUFBQSxXQUFBLEVBQWEsUUFBQSxDQUFFLEtBQUYsQ0FBQTtBQUNmLFFBQUE7SUFBSSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUUsS0FBSyxDQUFDLEtBQVI7SUFDNUIsSUFBSSxjQUFKO01BQ0UsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFJLEtBQUosQ0FBVSxxQ0FBVixDQUFaLEVBREY7O1dBRUE7RUFKVyxDQUFiO0VBTUEsU0FBQSxFQUFXLFFBQUEsQ0FBRSxNQUFGLEVBQVUsS0FBVixFQUFpQixLQUFqQixDQUFBO0FBQ2IsUUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7QUFBSTtJQUFBLEtBQUEscUNBQUE7O0FBQ0U7UUFDRSxJQUFHLENBQUUsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEtBQWpCLENBQUYsQ0FBQSxLQUE4QixJQUFqQztBQUNFLGlCQUFPLEtBRFQ7U0FERjtPQUdBLGNBQUE7UUFBTTtBQUNKLGVBQU8sS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFaLEVBRFQ7O0lBSkY7V0FNQSxLQUFLLENBQUMsS0FBTixDQUFZLElBQUksS0FBSixDQUFVLDRCQUFWLENBQVo7RUFQUyxDQU5YO0VB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QUFNO0FBQU4sQ0FBUixFQWhHTjs7O0FBbUdBLE9BQUEsQ0FBUSxHQUFSLEVBQWEsSUFBSSxDQUFDLEtBQWxCLEVBQXlCLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtTQUN2QixHQUFBLENBQUksS0FBQSxDQUFNLEdBQUEsSUFBTixDQUFKO0FBRHVCLENBQXpCOztBQUdBLE9BQUEsQ0FBUSxHQUFSLEVBQWEsSUFBSSxDQUFDLFVBQWxCLEVBQThCLFFBQUEsQ0FBRSxRQUFGLENBQUE7QUFDOUIsTUFBQSxNQUFBLEVBQUE7RUFBRSxLQUFBLGlCQUFBO0lBQ0UsTUFBQSxHQUFTO0VBRFg7U0FFQTtBQUg0QixDQUE5Qjs7QUFLQSxJQUFBLEdBQU8sUUFBQSxDQUFFLEVBQUYsQ0FBQTtTQUNMLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtBQUNGLFFBQUE7SUFBSSxLQUFBLEdBQVEsR0FBQSxDQUFJLEtBQUEsQ0FBTSxFQUFOLEVBQVUsR0FBQSxJQUFWLENBQUo7SUFDUixJQUFHLG1CQUFIO01BQ0UsTUFBTSxLQUFLLENBQUMsTUFEZDs7V0FFQSxLQUFLLENBQUM7RUFKUjtBQURLOztBQU9QLE9BQUEsQ0FBQTs7QUFDQSxPQUFBLENBQUE7O0FBQ0EsT0FBQSxDQUFBOztBQUNBLE9BQUEsQ0FBQTs7QUFDQSxPQUFBO0VBQ0UsSUFERjtFQUVFLEtBRkY7RUFHRSxHQUhGO0VBSUUsSUFKRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcbmltcG9ydCB7IGlzTWFjaGluZSwgaXNHZW5lcmF0b3JGdW5jdGlvbiB9IGZyb20gXCIuL3R5cGVzXCJcblxuXG5TdGVwID1cbiAgbWF0Y2hWZXJ0ZXg6ICggdGFsb3MgKSAtPlxuICAgIHZlcnRleCA9IHRhbG9zLm1hY2hpbmUuZ3JhcGhbIHRhbG9zLnN0YXRlIF1cbiAgICBpZiAhdmVydGV4P1xuICAgICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwidGFsb3Mgc3RhdGUgaXMgbm90IGluIG1hY2hpbmUgZ3JhcGhcIlxuICAgIHZlcnRleFxuXG4gIG1hdGNoRWRnZTogKCB2ZXJ0ZXgsIHRhbG9zLCBldmVudCApIC0+XG4gICAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgICB0cnlcbiAgICAgICAgaWYgKCBlZGdlLndoZW4gdGFsb3MsIGV2ZW50ICkgPT0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBlZGdlXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJubyBtYXRjaGluZyB3aGVuIGNvbmRpdGlvblwiXG5cbiAgcnVuOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBpZiBpc0dlbmVyYXRvckZ1bmN0aW9uIGVkZ2UucnVuXG4gICAgICAgIHlpZWxkIGZyb20gZWRnZS5ydW4gdGFsb3MsIGV2ZW50XG4gICAgICBlbHNlIGlmIFR5cGUuaXNGdW5jdGlvbiBlZGdlLnJ1blxuICAgICAgICBlZGdlLnJ1biB0YWxvcywgZXZlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBwcmV2aW91cyA9IHRhbG9zLnN0YXRlXG4gICAgICBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgICB0YWxvcy5wcmV2aW91c1N0YXRlID0gcHJldmlvdXNcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICB0aWNrOiAoIHRhbG9zLCBldmVudCApIC0+XG4gICAgdmVydGV4ID0gU3RlcC5tYXRjaFZlcnRleCB0YWxvc1xuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgZWRnZSA9IFN0ZXAubWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3MgaWYgdGFsb3MuZW5kZWRcbiAgICB5aWVsZCBmcm9tIFN0ZXAucnVuIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgU3RlcC5tb3ZlIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zICAgIyB0aGlzIGlzIHRoZSBoYXBweS1wYXRoIHlpZWxkXG5cblxuc3RhcnQgPSBnZW5lcmljIG5hbWU6IFwidGFsb3M6IHN5bmMgc3RhcnRcIlxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsICggbWFjaGluZSApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIGl0cyBvd24gY29udGV4dCByZXBlYXRlZGx5LlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCAoIHRhbG9zICkgLT5cbiAgbG9vcFxuICAgIGZvciBjdXJyZW50IGZyb20gU3RlcC50aWNrIHRhbG9zLCB0YWxvcy5jb250ZXh0XG4gICAgICB5aWVsZCBjdXJyZW50XG4gICAgICByZXR1cm4gaWYgdGFsb3MuZW5kZWRcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzSXRlcmFibGUsICggbWFjaGluZSwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyB2YWx1ZXMgZnJvbSBpdGVyYXRvci5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0l0ZXJhYmxlLCAoIHRhbG9zLCBldmVudHMgKSAtPlxuICBmb3IgZXZlbnQgZnJvbSBldmVudHNcbiAgICBmb3IgY3VycmVudCBmcm9tIFN0ZXAudGljayB0YWxvcywgZXZlbnRcbiAgICAgIHlpZWxkIGN1cnJlbnRcbiAgICAgIHJldHVybiBpZiB0YWxvcy5lbmRlZFxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsIFR5cGUuaXNPYmplY3QsICggbWFjaGluZSwgY29udGV4dCApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgKCB0YWxvcywgY29udGV4dCApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc09iamVjdCwgVHlwZS5pc0l0ZXJhYmxlLCAoIG1hY2hpbmUsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCBUeXBlLmlzSXRlcmFibGUsICggdGFsb3MsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuXG4jIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGtlZXAgZ29pbmcgYW5kIG9ubHkgcmV0dXJuIHRoZSBmaW5hbCB0YWxvcy5cbnJ1biA9IGdlbmVyaWMgbmFtZTogXCJ0YWxvczogc3luYyBydW5cIlxuXG4jIEZ1cnRoZXIgY29udmVuaWVuY2UgdG8gc3VwcG9ydCBhdXRvbWF0aWNhbGx5IHVzaW5nIHN0YXJ0LlxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBbnksICggYXJncy4uLiApIC0+XG4gIHJ1biBzdGFydCBhcmdzLi4uXG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzSXRlcmF0b3IsICggaXRlcmF0b3IgKSAtPlxuICBmb3IgdGFsb3MgZnJvbSBpdGVyYXRvclxuICAgIHJlc3VsdCA9IHRhbG9zXG4gIHJlc3VsdFxuXG5waXBlID0gKCBmeCApIC0+XG4gICggYXJncy4uLiApIC0+XG4gICAgdGFsb3MgPSBydW4gc3RhcnQgZngsIGFyZ3MuLi5cbiAgICBpZiB0YWxvcy5lcnJvcj9cbiAgICAgIHRocm93IHRhbG9zLmVycm9yXG4gICAgdGFsb3MuY29udGV4dFxuXG5leHBvcnQgKiBmcm9tIFwiLi9zdGF0ZXNcIlxuZXhwb3J0ICogZnJvbSBcIi4vbWFjaGluZVwiXG5leHBvcnQgKiBmcm9tIFwiLi90YWxvc1wiXG5leHBvcnQgKiBmcm9tIFwiLi90eXBlc1wiXG5leHBvcnQge1xuICBTdGVwICBcbiAgc3RhcnRcbiAgcnVuXG4gIHBpcGVcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/sync.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3N5bmMuY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcbmltcG9ydCB7IGlzTWFjaGluZSwgaXNHZW5lcmF0b3JGdW5jdGlvbiB9IGZyb20gXCIuL3R5cGVzXCJcblxuXG5TdGVwID1cbiAgbWF0Y2hWZXJ0ZXg6ICggdGFsb3MgKSAtPlxuICAgIHZlcnRleCA9IHRhbG9zLm1hY2hpbmUuZ3JhcGhbIHRhbG9zLnN0YXRlIF1cbiAgICBpZiAhdmVydGV4P1xuICAgICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwidGFsb3Mgc3RhdGUgaXMgbm90IGluIG1hY2hpbmUgZ3JhcGhcIlxuICAgIHZlcnRleFxuXG4gIG1hdGNoRWRnZTogKCB2ZXJ0ZXgsIHRhbG9zLCBldmVudCApIC0+XG4gICAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgICB0cnlcbiAgICAgICAgaWYgKCBlZGdlLndoZW4gdGFsb3MsIGV2ZW50ICkgPT0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBlZGdlXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJubyBtYXRjaGluZyB3aGVuIGNvbmRpdGlvblwiXG5cbiAgcnVuOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBpZiBpc0dlbmVyYXRvckZ1bmN0aW9uIGVkZ2UucnVuXG4gICAgICAgIHlpZWxkIGZyb20gZWRnZS5ydW4gdGFsb3MsIGV2ZW50XG4gICAgICBlbHNlIGlmIFR5cGUuaXNGdW5jdGlvbiBlZGdlLnJ1blxuICAgICAgICBlZGdlLnJ1biB0YWxvcywgZXZlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBwcmV2aW91cyA9IHRhbG9zLnN0YXRlXG4gICAgICBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgICB0YWxvcy5wcmV2aW91c1N0YXRlID0gcHJldmlvdXNcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICB0aWNrOiAoIHRhbG9zLCBldmVudCApIC0+XG4gICAgdmVydGV4ID0gU3RlcC5tYXRjaFZlcnRleCB0YWxvc1xuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgZWRnZSA9IFN0ZXAubWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3MgaWYgdGFsb3MuZW5kZWRcbiAgICB5aWVsZCBmcm9tIFN0ZXAucnVuIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgU3RlcC5tb3ZlIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zICAgIyB0aGlzIGlzIHRoZSBoYXBweS1wYXRoIHlpZWxkXG5cblxuc3RhcnQgPSBnZW5lcmljIG5hbWU6IFwidGFsb3M6IHN5bmMgc3RhcnRcIlxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsICggbWFjaGluZSApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIGl0cyBvd24gY29udGV4dCByZXBlYXRlZGx5LlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCAoIHRhbG9zICkgLT5cbiAgbG9vcFxuICAgIGZvciBjdXJyZW50IGZyb20gU3RlcC50aWNrIHRhbG9zLCB0YWxvcy5jb250ZXh0XG4gICAgICB5aWVsZCBjdXJyZW50XG4gICAgICByZXR1cm4gaWYgdGFsb3MuZW5kZWRcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzSXRlcmFibGUsICggbWFjaGluZSwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyB2YWx1ZXMgZnJvbSBpdGVyYXRvci5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0l0ZXJhYmxlLCAoIHRhbG9zLCBldmVudHMgKSAtPlxuICBmb3IgZXZlbnQgZnJvbSBldmVudHNcbiAgICBmb3IgY3VycmVudCBmcm9tIFN0ZXAudGljayB0YWxvcywgZXZlbnRcbiAgICAgIHlpZWxkIGN1cnJlbnRcbiAgICAgIHJldHVybiBpZiB0YWxvcy5lbmRlZFxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsIFR5cGUuaXNPYmplY3QsICggbWFjaGluZSwgY29udGV4dCApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgKCB0YWxvcywgY29udGV4dCApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc09iamVjdCwgVHlwZS5pc0l0ZXJhYmxlLCAoIG1hY2hpbmUsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCBUeXBlLmlzSXRlcmFibGUsICggdGFsb3MsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuXG4jIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGtlZXAgZ29pbmcgYW5kIG9ubHkgcmV0dXJuIHRoZSBmaW5hbCB0YWxvcy5cbnJ1biA9IGdlbmVyaWMgbmFtZTogXCJ0YWxvczogc3luYyBydW5cIlxuXG4jIEZ1cnRoZXIgY29udmVuaWVuY2UgdG8gc3VwcG9ydCBhdXRvbWF0aWNhbGx5IHVzaW5nIHN0YXJ0LlxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBbnksICggYXJncy4uLiApIC0+XG4gIHJ1biBzdGFydCBhcmdzLi4uXG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzSXRlcmF0b3IsICggaXRlcmF0b3IgKSAtPlxuICBmb3IgdGFsb3MgZnJvbSBpdGVyYXRvclxuICAgIHJlc3VsdCA9IHRhbG9zXG4gIHJlc3VsdFxuXG5waXBlID0gKCBmeCApIC0+XG4gICggYXJncy4uLiApIC0+XG4gICAgdGFsb3MgPSBydW4gc3RhcnQgZngsIGFyZ3MuLi5cbiAgICBpZiB0YWxvcy5lcnJvcj9cbiAgICAgIHRocm93IHRhbG9zLmVycm9yXG4gICAgdGFsb3MuY29udGV4dFxuXG5leHBvcnQgKiBmcm9tIFwiLi9zdGF0ZXNcIlxuZXhwb3J0ICogZnJvbSBcIi4vbWFjaGluZVwiXG5leHBvcnQgKiBmcm9tIFwiLi90YWxvc1wiXG5leHBvcnQgKiBmcm9tIFwiLi90eXBlc1wiXG5leHBvcnQge1xuICBTdGVwICBcbiAgc3RhcnRcbiAgcnVuXG4gIHBpcGVcbn0iXSwibmFtZXMiOlsiU3RlcCIsInBpcGUiLCJydW4iLCJzdGFydCIsImdlbmVyaWMiLCJGbiIsIlR5cGUiLCJNYWNoaW5lIiwiVGFsb3MiLCJpc01hY2hpbmUiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwibWF0Y2hWZXJ0ZXgiLCJ0YWxvcyIsInZlcnRleCIsIm1hY2hpbmUiLCJncmFwaCIsInN0YXRlIiwiY2F0Y2giLCJFcnJvciIsIm1hdGNoRWRnZSIsImV2ZW50IiwiZWRnZSIsImVycm9yIiwiaSIsImxlbiIsInJlZiIsImVkZ2VzIiwibGVuZ3RoIiwid2hlbiIsImVycm9yMSIsImlzRnVuY3Rpb24iLCJtb3ZlIiwicHJldmlvdXMiLCJwcmV2aW91c1N0YXRlIiwidGljayIsImVuZGVkIiwibmFtZSIsIm1ha2UiLCJpc1R5cGUiLCJjdXJyZW50IiwiY29udGV4dCIsImlzSXRlcmFibGUiLCJldmVudHMiLCJpc09iamVjdCIsImlzQW55IiwiYXJncyIsImlzSXRlcmF0b3IiLCJpdGVyYXRvciIsInJlc3VsdCIsImZ4Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFBQSxNQUFBQyxNQUFBQyxLQUFBQztBQUFBLFNBQVNDLE9BQVQsUUFBQSx3QkFBQTtBQUNBLFlBQU9DLFFBQVAseUJBQUE7QUFDQSxZQUFPQyxVQUFQLHFCQUFBO0FBQ0EsU0FBU0MsT0FBVCxRQUFBLFlBQUE7QUFDQSxTQUFTQyxLQUFULFFBQUEsVUFBQTtBQUNBLFNBQVNDLFNBQVQsRUFBb0JDLG1CQUFwQixRQUFBLFVBQUE7QUFHQVYsT0FDRTtJQUFBVyxhQUFhLFNBQUVDLEtBQUY7UUFDZixJQUFBQztRQUFJQSxTQUFTRCxNQUFNRSxPQUFPLENBQUNDLEtBQUssQ0FBRUgsTUFBTUksS0FBUixDQUFBO1FBQzVCLElBQUlILFVBQUEsTUFBSjtZQUNFRCxNQUFNSyxLQUFOLENBQVksSUFBSUMsTUFBTTs7ZUFDeEJMO0lBSlc7SUFNYk0sV0FBVyxTQUFFTixNQUFGLEVBQVVELEtBQVYsRUFBaUJRLEtBQWpCO1FBQ2IsSUFBQUMsTUFBQUMsT0FBQUMsR0FBQUMsS0FBQUM7UUFBSUEsTUFBQVosT0FBQWEsS0FBQTtRQUFBLElBQUFILElBQUEsR0FB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