var Step, pipe, run, start;
import { generic } from "@dashkite/joy/generic";
import * as Fn from "@dashkite/joy/function";
import * as Type from "@dashkite/joy/type";
import { Machine } from "./machine";
import { Talos } from "./talos";
import { isMachine } from "./types";
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
    run: function(edge, talos, event) {
        var error;
        if (edge.run != null) {
            try {
                return edge.run(talos, event);
            } catch (error1) {
                error = error1;
                return talos.catch(error);
            }
        }
    },
    move: function(edge, talos, event) {
        var error;
        try {
            return edge.move(talos, event);
        } catch (error1) {
            error = error1;
            return talos.catch(error);
        }
    },
    tick: function*(talos, event) {
        var edge, vertex;
        vertex = Step.matchVertex(talos);
        yield talos;
        edge = Step.matchEdge(vertex, talos, event);
        yield talos;
        Step.run(edge, talos, event);
        yield talos;
        Step.move(edge, talos, event);
        return yield talos;
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
    var ref;
    while(true){
        ref = Step.tick(talos, talos.context);
        for (talos of ref){
            if (talos.ended) {
                yield talos;
                return;
            }
        }
        yield talos; // prevents accumulation
    }
});
generic(start, isMachine, Type.isIterable, function(machine, events) {
    var talos;
    talos = Talos.make(machine);
    return start(talos, events);
});
// Create generator where state machine consumes values from iterator.
generic(start, Talos.isType, Type.isIterable, function*(talos, events) {
    var event, ref;
    for (event of events){
        ref = Step.tick(talos, event);
        for (talos of ref){
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
export { Step, start, run, pipe }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3N5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUE7O0FBQUEsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxNQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsT0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxTQUFUO0NBQUEsTUFBQTs7QUFHQSxJQUFBLEdBQ0U7RUFBQSxXQUFBLEVBQWEsUUFBQSxDQUFFLEtBQUYsQ0FBQTtBQUNmLFFBQUE7SUFBSSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUUsS0FBSyxDQUFDLEtBQVI7SUFDNUIsSUFBSSxjQUFKO01BQ0UsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFJLEtBQUosQ0FBVSxxQ0FBVixDQUFaLEVBREY7O1dBRUE7RUFKVyxDQUFiO0VBTUEsU0FBQSxFQUFXLFFBQUEsQ0FBRSxNQUFGLEVBQVUsS0FBVixFQUFpQixLQUFqQixDQUFBO0FBQ2IsUUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7QUFBSTtJQUFBLEtBQUEscUNBQUE7O0FBQ0U7UUFDRSxJQUFHLENBQUUsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEtBQWpCLENBQUYsQ0FBQSxLQUE4QixJQUFqQztBQUNFLGlCQUFPLEtBRFQ7U0FERjtPQUdBLGNBQUE7UUFBTTtBQUNKLGVBQU8sS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFaLEVBRFQ7O0lBSkY7V0FNQSxLQUFLLENBQUMsS0FBTixDQUFZLElBQUksS0FBSixDQUFVLDRCQUFWLENBQVo7RUFQUyxDQU5YO0VBZUEsR0FBQSxFQUFLLFFBQUEsQ0FBRSxJQUFGLEVB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QUFBLEdBQUUsSUFBRixDQUFBO0FBQ0YsUUFBQTtJQUFJLEtBQUEsR0FBUSxHQUFBLENBQUksS0FBQSxDQUFNLEVBQU4sRUFBVSxHQUFBLElBQVYsQ0FBSjtJQUNSLElBQUcsbUJBQUg7TUFDRSxNQUFNLEtBQUssQ0FBQyxNQURkOztXQUVBLEtBQUssQ0FBQztFQUpSO0FBREs7O0FBT1AsT0FBQSxDQUFBOztBQUNBLE9BQUEsQ0FBQTs7QUFDQSxPQUFBLENBQUE7O0FBQ0EsT0FBQSxDQUFBOztBQUNBLE9BQUE7RUFDRSxJQURGO0VBRUUsS0FGRjtFQUdFLEdBSEY7RUFJRSxJQUpGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0ICogYXMgRm4gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZnVuY3Rpb25cIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IE1hY2hpbmUgfSBmcm9tIFwiLi9tYWNoaW5lXCJcbmltcG9ydCB7IFRhbG9zIH0gZnJvbSBcIi4vdGFsb3NcIlxuaW1wb3J0IHsgaXNNYWNoaW5lIH0gZnJvbSBcIi4vdHlwZXNcIlxuXG5cblN0ZXAgPVxuICBtYXRjaFZlcnRleDogKCB0YWxvcyApIC0+XG4gICAgdmVydGV4ID0gdGFsb3MubWFjaGluZS5ncmFwaFsgdGFsb3Muc3RhdGUgXVxuICAgIGlmICF2ZXJ0ZXg/XG4gICAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJ0YWxvcyBzdGF0ZSBpcyBub3QgaW4gbWFjaGluZSBncmFwaFwiXG4gICAgdmVydGV4XG5cbiAgbWF0Y2hFZGdlOiAoIHZlcnRleCwgdGFsb3MsIGV2ZW50ICkgLT5cbiAgICBmb3IgZWRnZSBpbiB2ZXJ0ZXguZWRnZXNcbiAgICAgIHRyeVxuICAgICAgICBpZiAoIGVkZ2Uud2hlbiB0YWxvcywgZXZlbnQgKSA9PSB0cnVlXG4gICAgICAgICAgcmV0dXJuIGVkZ2VcbiAgICAgIGNhdGNoIGVycm9yXG4gICAgICAgIHJldHVybiB0YWxvcy5jYXRjaCBlcnJvclxuICAgIHRhbG9zLmNhdGNoIG5ldyBFcnJvciBcIm5vIG1hdGNoaW5nIHdoZW4gY29uZGl0aW9uXCJcblxuICBydW46ICggZWRnZSwgdGFsb3MsIGV2ZW50ICkgLT5cbiAgICBpZiBlZGdlLnJ1bj9cbiAgICAgIHRyeVxuICAgICAgICBlZGdlLnJ1biB0YWxvcywgZXZlbnRcbiAgICAgIGNhdGNoIGVycm9yXG4gICAgICAgIHRhbG9zLmNhdGNoIGVycm9yXG5cbiAgbW92ZTogKCBlZGdlLCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIHRyeVxuICAgICAgZWRnZS5tb3ZlIHRhbG9zLCBldmVudFxuICAgIGNhdGNoIGVycm9yXG4gICAgICB0YWxvcy5jYXRjaCBlcnJvclxuXG4gIHRpY2s6ICggdGFsb3MsIGV2ZW50ICkgLT5cbiAgICB2ZXJ0ZXggPSBTdGVwLm1hdGNoVmVydGV4IHRhbG9zXG4gICAgeWllbGQgdGFsb3NcbiAgICBlZGdlID0gU3RlcC5tYXRjaEVkZ2UgdmVydGV4LCB0YWxvcywgZXZlbnRcbiAgICB5aWVsZCB0YWxvc1xuICAgIFN0ZXAucnVuIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zXG4gICAgU3RlcC5tb3ZlIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zXG5cblxuc3RhcnQgPSBnZW5lcmljIG5hbWU6IFwidGFsb3M6IHN5bmMgc3RhcnRcIlxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsICggbWFjaGluZSApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIGl0cyBvd24gY29udGV4dCByZXBlYXRlZGx5LlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCAoIHRhbG9zICkgLT5cbiAgbG9vcFxuICAgIGZvciB0YWxvcyBmcm9tIFN0ZXAudGljayB0YWxvcywgdGFsb3MuY29udGV4dFxuICAgICAgaWYgdGFsb3MuZW5kZWRcbiAgICAgICAgeWllbGQgdGFsb3NcbiAgICAgICAgcmV0dXJuXG4gICAgeWllbGQgdGFsb3NcbiAgcmV0dXJuICMgcHJldmVudHMgYWNjdW11bGF0aW9uXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc0l0ZXJhYmxlLCAoIG1hY2hpbmUsIGV2ZW50cyApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuIyBDcmVhdGUgZ2VuZXJhdG9yIHdoZXJlIHN0YXRlIG1hY2hpbmUgY29uc3VtZXMgdmFsdWVzIGZyb20gaXRlcmF0b3IuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNJdGVyYWJsZSwgKCB0YWxvcywgZXZlbnRzICkgLT5cbiAgZm9yIGV2ZW50IGZyb20gZXZlbnRzXG4gICAgZm9yIHRhbG9zIGZyb20gU3RlcC50aWNrIHRhbG9zLCBldmVudFxuICAgICAgaWYgdGFsb3MuZW5kZWRcbiAgICAgICAgeWllbGQgdGFsb3NcbiAgICAgICAgcmV0dXJuXG4gICAgeWllbGQgdGFsb3NcbiAgcmV0dXJuICMgcHJldmVudHMgYWNjdW11bGF0aW9uXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc09iamVjdCwgKCBtYWNoaW5lLCBjb250ZXh0ICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3NcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCAoIHRhbG9zLCBjb250ZXh0ICkgLT5cbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3NcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzT2JqZWN0LCBUeXBlLmlzSXRlcmFibGUsICggbWFjaGluZSwgY29udGV4dCwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNPYmplY3QsIFR5cGUuaXNJdGVyYWJsZSwgKCB0YWxvcywgY29udGV4dCwgZXZlbnRzICkgLT5cbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG5cbiMgQ29udmVuaWVuY2UgZnVuY3Rpb24gdG8ga2VlcCBnb2luZyBhbmQgb25seSByZXR1cm4gdGhlIGZpbmFsIHRhbG9zLlxucnVuID0gZ2VuZXJpYyBuYW1lOiBcInRhbG9zOiBzeW5jIHJ1blwiXG5cbiMgRnVydGhlciBjb252ZW5pZW5jZSB0byBzdXBwb3J0IGF1dG9tYXRpY2FsbHkgdXNpbmcgc3RhcnQuXG5nZW5lcmljIHJ1biwgVHlwZS5pc0FueSwgKCBhcmdzLi4uICkgLT5cbiAgcnVuIHN0YXJ0IGFyZ3MuLi5cblxuZ2VuZXJpYyBydW4sIFR5cGUuaXNJdGVyYXRvciwgKCBpdGVyYXRvciApIC0+XG4gIGZvciB0YWxvcyBmcm9tIGl0ZXJhdG9yXG4gICAgcmVzdWx0ID0gdGFsb3NcbiAgcmVzdWx0XG5cbnBpcGUgPSAoIGZ4ICkgLT5cbiAgKCBhcmdzLi4uICkgLT5cbiAgICB0YWxvcyA9IHJ1biBzdGFydCBmeCwgYXJncy4uLlxuICAgIGlmIHRhbG9zLmVycm9yP1xuICAgICAgdGhyb3cgdGFsb3MuZXJyb3JcbiAgICB0YWxvcy5jb250ZXh0XG5cbmV4cG9ydCAqIGZyb20gXCIuL3N0YXRlc1wiXG5leHBvcnQgKiBmcm9tIFwiLi9tYWNoaW5lXCJcbmV4cG9ydCAqIGZyb20gXCIuL3RhbG9zXCJcbmV4cG9ydCAqIGZyb20gXCIuL3R5cGVzXCJcbmV4cG9ydCB7XG4gIFN0ZXAgIFxuICBzdGFydFxuICBydW5cbiAgcGlwZVxufSJdfQ==
 //# sourceURL=src/sync.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zeW5jLmNvZmZlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5pbXBvcnQgKiBhcyBGbiBmcm9tIFwiQGRhc2hraXRlL2pveS9mdW5jdGlvblwiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgTWFjaGluZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuaW1wb3J0IHsgVGFsb3MgfSBmcm9tIFwiLi90YWxvc1wiXG5pbXBvcnQgeyBpc01hY2hpbmUgfSBmcm9tIFwiLi90eXBlc1wiXG5cblxuU3RlcCA9XG4gIG1hdGNoVmVydGV4OiAoIHRhbG9zICkgLT5cbiAgICB2ZXJ0ZXggPSB0YWxvcy5tYWNoaW5lLmdyYXBoWyB0YWxvcy5zdGF0ZSBdXG4gICAgaWYgIXZlcnRleD9cbiAgICAgIHRhbG9zLmNhdGNoIG5ldyBFcnJvciBcInRhbG9zIHN0YXRlIGlzIG5vdCBpbiBtYWNoaW5lIGdyYXBoXCJcbiAgICB2ZXJ0ZXhcblxuICBtYXRjaEVkZ2U6ICggdmVydGV4LCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGZvciBlZGdlIGluIHZlcnRleC5lZGdlc1xuICAgICAgdHJ5XG4gICAgICAgIGlmICggZWRnZS53aGVuIHRhbG9zLCBldmVudCApID09IHRydWVcbiAgICAgICAgICByZXR1cm4gZWRnZVxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgcmV0dXJuIHRhbG9zLmNhdGNoIGVycm9yXG4gICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwibm8gbWF0Y2hpbmcgd2hlbiBjb25kaXRpb25cIlxuXG4gIHJ1bjogKCBlZGdlLCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGlmIGVkZ2UucnVuP1xuICAgICAgdHJ5XG4gICAgICAgIGVkZ2UucnVuIHRhbG9zLCBldmVudFxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgY2F0Y2ggZXJyb3JcbiAgICAgIHRhbG9zLmNhdGNoIGVycm9yXG5cbiAgdGljazogKCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIHZlcnRleCA9IFN0ZXAubWF0Y2hWZXJ0ZXggdGFsb3NcbiAgICB5aWVsZCB0YWxvc1xuICAgIGVkZ2UgPSBTdGVwLm1hdGNoRWRnZSB2ZXJ0ZXgsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zXG4gICAgU3RlcC5ydW4gZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3NcbiAgICBTdGVwLm1vdmUgZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3NcblxuXG5zdGFydCA9IGdlbmVyaWMgbmFtZTogXCJ0YWxvczogc3luYyBzdGFydFwiXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgKCBtYWNoaW5lICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3NcblxuIyBDcmVhdGUgZ2VuZXJhdG9yIHdoZXJlIHN0YXRlIG1hY2hpbmUgY29uc3VtZXMgaXRzIG93biBjb250ZXh0IHJlcGVhdGVkbHkuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsICggdGFsb3MgKSAtPlxuICBsb29wXG4gICAgZm9yIHRhbG9zIGZyb20gU3RlcC50aWNrIHRhbG9zLCB0YWxvcy5jb250ZXh0XG4gICAgICBpZiB0YWxvcy5lbmRlZFxuICAgICAgICB5aWVsZCB0YWxvc1xuICAgICAgICByZXR1cm5cbiAgICB5aWVsZCB0YWxvc1xuICByZXR1cm4gIyBwcmV2ZW50cyBhY2N1bXVsYXRpb25cblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzSXRlcmFibGUsICggbWFjaGluZSwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyB2YWx1ZXMgZnJvbSBpdGVyYXRvci5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0l0ZXJhYmxlLCAoIHRhbG9zLCBldmVudHMgKSAtPlxuICBmb3IgZXZlbnQgZnJvbSBldmVudHNcbiAgICBmb3IgdGFsb3MgZnJvbSBTdGVwLnRpY2sgdGFsb3MsIGV2ZW50XG4gICAgICBpZiB0YWxvcy5lbmRlZFxuICAgICAgICB5aWVsZCB0YWxvc1xuICAgICAgICByZXR1cm5cbiAgICB5aWVsZCB0YWxvc1xuICByZXR1cm4gIyBwcmV2ZW50cyBhY2N1bXVsYXRpb25cblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzT2JqZWN0LCAoIG1hY2hpbmUsIGNvbnRleHQgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvc1xuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNPYmplY3QsICggdGFsb3MsIGNvbnRleHQgKSAtPlxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvc1xuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsIFR5cGUuaXNPYmplY3QsIFR5cGUuaXNJdGVyYWJsZSwgKCBtYWNoaW5lLCBjb250ZXh0LCBldmVudHMgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvcywgZXZlbnRzXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgVHlwZS5pc0l0ZXJhYmxlLCAoIHRhbG9zLCBjb250ZXh0LCBldmVudHMgKSAtPlxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvcywgZXZlbnRzXG5cblxuIyBDb252ZW5pZW5jZSBmdW5jdGlvbiB0byBrZWVwIGdvaW5nIGFuZCBvbmx5IHJldHVybiB0aGUgZmluYWwgdGFsb3MuXG5ydW4gPSBnZW5lcmljIG5hbWU6IFwidGFsb3M6IHN5bmMgcnVuXCJcblxuIyBGdXJ0aGVyIGNvbnZlbmllbmNlIHRvIHN1cHBvcnQgYXV0b21hdGljYWxseSB1c2luZyBzdGFydC5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzQW55LCAoIGFyZ3MuLi4gKSAtPlxuICBydW4gc3RhcnQgYXJncy4uLlxuXG5nZW5lcmljIHJ1biwgVHlwZS5pc0l0ZXJhdG9yLCAoIGl0ZXJhdG9yICkgLT5cbiAgZm9yIHRhbG9zIGZyb20gaXRlcmF0b3JcbiAgICByZXN1bHQgPSB0YWxvc1xuICByZXN1bHRcblxucGlwZSA9ICggZnggKSAtPlxuICAoIGFyZ3MuLi4gKSAtPlxuICAgIHRhbG9zID0gcnVuIHN0YXJ0IGZ4LCBhcmdzLi4uXG4gICAgaWYgdGFsb3MuZXJyb3I/XG4gICAgICB0aHJvdyB0YWxvcy5lcnJvclxuICAgIHRhbG9zLmNvbnRleHRcblxuZXhwb3J0ICogZnJvbSBcIi4vc3RhdGVzXCJcbmV4cG9ydCAqIGZyb20gXCIuL21hY2hpbmVcIlxuZXhwb3J0ICogZnJvbSBcIi4vdGFsb3NcIlxuZXhwb3J0ICogZnJvbSBcIi4vdHlwZXNcIlxuZXhwb3J0IHtcbiAgU3RlcCAgXG4gIHN0YXJ0XG4gIHJ1blxuICBwaXBlXG59Il0sIm5hbWVzIjpbIlN0ZXAiLCJwaXBlIiwicnVuIiwic3RhcnQiLCJnZW5lcmljIiwiRm4iLCJUeXBlIiwiTWFjaGluZSIsIlRhbG9zIiwiaXNNYWNoaW5lIiwibWF0Y2hWZXJ0ZXgiLCJ0YWxvcyIsInZlcnRleCIsIm1hY2hpbmUiLCJncmFwaCIsInN0YXRlIiwiY2F0Y2giLCJFcnJvciIsIm1hdGNoRWRnZSIsImV2ZW50IiwiZWRnZSIsImVycm9yIiwiaSIsImxlbiIsInJlZiIsImVkZ2VzIiwibGVuZ3RoIiwid2hlbiIsImVycm9yMSIsIm1vdmUiLCJ0aWNrIiwibmFtZSIsIm1ha2UiLCJpc1R5cGUiLCJjb250ZXh0IiwiZW5kZWQiLCJpc0l0ZXJhYmxlIiwiZXZlbnRzIiwiaXNPYmplY3QiLCJpc0FueSIsImFyZ3MiLCJpc0l0ZXJhdG9yIiwiaXRlcmF0b3IiLCJyZXN1bHQiLCJmeCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQUEsTUFBQUMsTUFBQUMsS0FBQUM7QUFBQSxTQUFTQyxPQUFULFFBQUEsd0JBQUE7QUFDQSxZQUFPQyxRQUFQLHlCQUFBO0FBQ0EsWUFBT0MsVUFBUCxxQkFBQTtBQUNBLFNBQVNDLE9BQVQsUUFBQSxZQUFBO0FBQ0EsU0FBU0MsS0FBVCxRQUFBLFVBQUE7QUFDQSxTQUFTQyxTQUFULFFBQUEsVUFBQTtBQUdBVCxPQUNFO0lBQUFVLGFBQWEsU0FBRUMsS0FBRjtRQUNmLElBQUFDO1FBQUlBLFNBQVNELE1BQU1FLE9BQU8sQ0FBQ0MsS0FBSyxDQUFFSCxNQUFNSSxLQUFSLENBQUE7UUFDNUIsSUFBSUgsVUFBQSxNQUFKO1lBQ0VELE1BQU1LLEtBQU4sQ0FBWSxJQUFJQyxNQUFNOztlQUN4Qkw7SUFKVztJQU1iTSxXQUFXLFNBQUVOLE1BQUYsRUFBVUQsS0FBVixFQUFpQlEsS0FBakI7UUFDYixJQUFBQyxNQUFBQyxPQUFBQyxHQUFBQyxLQUFBQztRQUFJQSxNQUFBWixPQUFBYSxLQUFBO1FBQUEsSUFBQUgsSUFBQSxHQUFBQyxNQUFBQyxJQUFBRSxNQUFBLEVBQUFKLElBQUFDLEtBQUFELElBQUE7O1lBQ0UsSUFBQTtnQkFDRSxJQUFHLEFBQUVGLEtBQUtPLElBQUwsQ0FBVWhCLE9BQU9RLFdBQVcsTUFBakM7b0JBQ0UsT0FBT0M7O2NBQ1gsT0FBQVEsUUFBQTtnQkFBTVAsUUFBQU87Z0JBQ0osT0FBT2pCLE1BQU1LLEtBQU4sQ0FBWUs7O1FBTHZCO2VBTUFWLE1BQU1LLEtBQU4sQ0FBWSxJQUFJQyxNQUFNO0lBUGI7SUFTWGYsS0FBSyxTQUFFa0IsSUFBRixFQUFRVCxLQUFSLEVBQWVR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