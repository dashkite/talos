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
        var error, inner, ref;
        try {
            if (isGeneratorFunctionKind(edge.run)) {
                ref = edge.run(talos, event);
                for await (inner of ref){
                    yield inner; // prevent accumulation
                }
            } else if (Type.isFunction(edge.run)) {
                return await edge.run(talos, event);
            }
        } catch (error1) {
            error = error1;
            talos.catch(error);
            return yield talos;
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
        var edge, inner, ref, vertex;
        vertex = Step.matchVertex(talos);
        if (talos.ended) {
            yield talos;
        }
        edge = await Step.matchEdge(vertex, talos, event);
        if (talos.ended) {
            yield talos;
        }
        ref = Step.run(edge, talos, event);
        for await (inner of ref){
            yield inner;
        }
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
export { Step, start, run, flow }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2FzeW5jLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsTUFBUCxNQUFBOztBQUNBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsU0FBVDtFQUFvQixjQUFwQjtFQUFvQyx1QkFBcEM7Q0FBQSxNQUFBOztBQUdBLElBQUEsR0FDRTtFQUFBLFdBQUEsRUFBYSxRQUFBLENBQUUsS0FBRixDQUFBO0FBQ2YsUUFBQTtJQUFJLE1BQUEsR0FBUyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBRSxLQUFLLENBQUMsS0FBUjtJQUM1QixJQUFJLGNBQUo7TUFDRSxLQUFLLENBQUMsS0FBTixDQUFZLElBQUksS0FBSixDQUFVLHNDQUFWLENBQVosRUFERjs7V0FFQTtFQUpXLENBQWI7RUFNQSxTQUFBLEVBQVcsTUFBQSxRQUFBLENBQUUsTUFBRixFQUFVLEtBQVYsRUFBaUIsS0FBakIsQ0FBQTtBQUNiLFFBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUk7SUFBQSxLQUFBLHFDQUFBOztBQUNFO1FBQ0UsSUFBRyxDQUFFLENBQUEsTUFBTSxJQUFJLENBQUMsSUFBTCxDQUFVLEtBQVYsRUFBaUIsS0FBakIsQ0FBTixDQUFGLENBQUEsS0FBb0MsSUFBdkM7QUFDRSxpQkFBTyxLQURUO1NBREY7T0FHQSxjQUFBO1FBQU07QUFDSixlQUFPLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBWixFQURUOztJQUpGO1dBTUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFJLEtBQUosQ0FBVSxtQ0FBVixD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QVIsRUFsR047OztBQXFHQSxPQUFBLENBQVEsR0FBUixFQUFhLElBQUksQ0FBQyxLQUFsQixFQUF5QixRQUFBLENBQUEsR0FBRSxJQUFGLENBQUE7U0FDdkIsR0FBQSxDQUFJLEtBQUEsQ0FBTSxHQUFBLElBQU4sQ0FBSjtBQUR1QixDQUF6Qjs7QUFHQSxPQUFBLENBQVEsR0FBUixFQUFhLElBQUksQ0FBQyxTQUFsQixFQUE2QixNQUFBLFFBQUEsQ0FBRSxPQUFGLENBQUE7QUFDN0IsTUFBQSxNQUFBLEVBQUE7RUFBRSw0QkFBQTtJQUNFLE1BQUEsR0FBUztFQURYO1NBRUE7QUFIMkIsQ0FBN0I7O0FBS0EsSUFBQSxHQUFPLFFBQUEsQ0FBRSxFQUFGLENBQUE7U0FDTCxNQUFBLFFBQUEsQ0FBQSxHQUFFLElBQUYsQ0FBQTtBQUNGLFFBQUE7SUFBSSxLQUFBLEdBQVEsQ0FBQSxNQUFNLEdBQUEsQ0FBSSxLQUFBLENBQU0sRUFBTixFQUFVLEdBQUEsSUFBVixDQUFKLENBQU47SUFDUixJQUFHLG1CQUFIO01BQ0UsTUFBTSxLQUFLLENBQUMsTUFEZDs7V0FFQSxLQUFLLENBQUM7RUFKUjtBQURLOztBQU9QLE9BQUEsQ0FBQTs7QUFDQSxPQUFBLENBQUE7O0FBQ0EsT0FBQSxDQUFBOztBQUNBLE9BQUEsQ0FBQTs7QUFDQSxPQUFBO0VBQ0UsSUFERjtFQUVFLEtBRkY7RUFHRSxHQUhGO0VBSUUsSUFKRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcbmltcG9ydCB7IGlzTWFjaGluZSwgaXNJdGVyYXRvcktpbmQsIGlzR2VuZXJhdG9yRnVuY3Rpb25LaW5kIH0gZnJvbSBcIi4vdHlwZXNcIlxuXG5cblN0ZXAgPVxuICBtYXRjaFZlcnRleDogKCB0YWxvcyApIC0+XG4gICAgdmVydGV4ID0gdGFsb3MubWFjaGluZS5ncmFwaFsgdGFsb3Muc3RhdGUgXVxuICAgIGlmICF2ZXJ0ZXg/XG4gICAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJ0YWxvczogc3RhdGUgaXMgbm90IGluIG1hY2hpbmUgZ3JhcGhcIlxuICAgIHZlcnRleFxuXG4gIG1hdGNoRWRnZTogKCB2ZXJ0ZXgsIHRhbG9zLCBldmVudCApIC0+XG4gICAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgICB0cnlcbiAgICAgICAgaWYgKCBhd2FpdCBlZGdlLndoZW4gdGFsb3MsIGV2ZW50ICkgPT0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBlZGdlXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJ0YWxvczogbm8gbWF0Y2hpbmcgd2hlbiBjb25kaXRpb25cIlxuXG4gIHJ1bjogKCBlZGdlLCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIHRyeVxuICAgICAgaWYgaXNHZW5lcmF0b3JGdW5jdGlvbktpbmQgZWRnZS5ydW5cbiAgICAgICAgZm9yIGF3YWl0IGlubmVyIGZyb20gZWRnZS5ydW4gdGFsb3MsIGV2ZW50XG4gICAgICAgICAgeWllbGQgaW5uZXJcbiAgICAgICAgcmV0dXJuICAjIHByZXZlbnQgYWNjdW11bGF0aW9uXG4gICAgICBlbHNlIGlmIFR5cGUuaXNGdW5jdGlvbiBlZGdlLnJ1blxuICAgICAgICBhd2FpdCBlZGdlLnJ1biB0YWxvcywgZXZlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICAgIHlpZWxkIHRhbG9zXG5cbiAgbW92ZTogKCBlZGdlLCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIHRyeVxuICAgICAgYXdhaXQgZWRnZS5tb3ZlIHRhbG9zLCBldmVudFxuICAgIGNhdGNoIGVycm9yXG4gICAgICB0YWxvcy5jYXRjaCBlcnJvclxuXG4gIHRpY2s6ICggdGFsb3MsIGV2ZW50ICkgLT5cbiAgICB2ZXJ0ZXggPSBTdGVwLm1hdGNoVmVydGV4IHRhbG9zXG4gICAgeWllbGQgdGFsb3MgaWYgdGFsb3MuZW5kZWRcbiAgICBlZGdlID0gYXdhaXQgU3RlcC5tYXRjaEVkZ2UgdmVydGV4LCB0YWxvcywgZXZlbnRcbiAgICB5aWVsZCB0YWxvcyBpZiB0YWxvcy5lbmRlZFxuICAgIGZvciBhd2FpdCBpbm5lciBmcm9tIFN0ZXAucnVuIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgICAgeWllbGQgaW5uZXJcbiAgICB5aWVsZCB0YWxvcyBpZiB0YWxvcy5lbmRlZFxuICAgIGF3YWl0IFN0ZXAubW92ZSBlZGdlLCB0YWxvcywgZXZlbnRcbiAgICB5aWVsZCB0YWxvcyAgICMgdGhpcyBpcyB0aGUgaGFwcHktcGF0aCB5aWVsZFxuXG5cbnN0YXJ0ID0gZ2VuZXJpYyBuYW1lOiBcInRhbG9zOiBhc3luYyBzdGFydFwiXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgKCBtYWNoaW5lICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3NcblxuIyBDcmVhdGUgZ2VuZXJhdG9yIHdoZXJlIHN0YXRlIG1hY2hpbmUgY29uc3VtZXMgaXRzIG93biBjb250ZXh0IHJlcGVhdGVkbHkuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsICggdGFsb3MgKSAtPlxuICBsb29wXG4gICAgZm9yIGF3YWl0IGN1cnJlbnQgZnJvbSBTdGVwLnRpY2sgdGFsb3MsIHRhbG9zLmNvbnRleHRcbiAgICAgIHlpZWxkIGN1cnJlbnRcbiAgICAgIHJldHVybiBpZiB0YWxvcy5lbmRlZFxuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsIGlzSXRlcmF0b3JLaW5kLCAoIG1hY2hpbmUsIGV2ZW50cyApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuIyBDcmVhdGUgZ2VuZXJhdG9yIHdoZXJlIHN0YXRlIG1hY2hpbmUgY29uc3VtZXMgdmFsdWVzIGZyb20gcmVhY3Rvci5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgaXNJdGVyYXRvcktpbmQsICggdGFsb3MsIGV2ZW50cyApIC0+XG4gIGZvciBhd2FpdCBldmVudCBmcm9tIGV2ZW50c1xuICAgIGZvciBhd2FpdCBjdXJyZW50IGZyb20gU3RlcC50aWNrIHRhbG9zLCBldmVudFxuICAgICAgeWllbGQgY3VycmVudFxuICAgICAgcmV0dXJuIGlmIHRhbG9zLmVuZGVkXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgVHlwZS5pc09iamVjdCwgKCBtYWNoaW5lLCBjb250ZXh0ICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3NcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCAoIHRhbG9zLCBjb250ZXh0ICkgLT5cbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3NcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzT2JqZWN0LCBpc0l0ZXJhdG9yS2luZCwgKCBtYWNoaW5lLCBjb250ZXh0LCBldmVudHMgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvcywgZXZlbnRzXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgaXNJdGVyYXRvcktpbmQsICggdGFsb3MsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuXG4jIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGtlZXAgZ29pbmcgYW5kIG9ubHkgcmV0dXJuIHRoZSBmaW5hbCB0YWxvcy5cbnJ1biA9IGdlbmVyaWMgbmFtZTogXCJ0YWxvczogYXN5bmMgcnVuXCJcblxuIyBGdXJ0aGVyIGNvbnZlbmllbmNlIHRvIHN1cHBvcnQgYXV0b21hdGljYWxseSB1c2luZyBzdGFydC5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzQW55LCAoIGFyZ3MuLi4gKSAtPlxuICBydW4gc3RhcnQgYXJncy4uLlxuXG5nZW5lcmljIHJ1biwgVHlwZS5pc1JlYWN0b3IsICggcmVhY3RvciApIC0+XG4gIGZvciBhd2FpdCB0YWxvcyBmcm9tIHJlYWN0b3JcbiAgICByZXN1bHQgPSB0YWxvc1xuICByZXN1bHRcblxuZmxvdyA9ICggZnggKSAtPlxuICAoIGFyZ3MuLi4gKSAtPlxuICAgIHRhbG9zID0gYXdhaXQgcnVuIHN0YXJ0IGZ4LCBhcmdzLi4uXG4gICAgaWYgdGFsb3MuZXJyb3I/XG4gICAgICB0aHJvdyB0YWxvcy5lcnJvclxuICAgIHRhbG9zLmNvbnRleHRcblxuZXhwb3J0ICogZnJvbSBcIi4vc3RhdGVzXCJcbmV4cG9ydCAqIGZyb20gXCIuL21hY2hpbmVcIlxuZXhwb3J0ICogZnJvbSBcIi4vdGFsb3NcIlxuZXhwb3J0ICogZnJvbSBcIi4vdHlwZXNcIlxuZXhwb3J0IHtcbiAgU3RlcCAgXG4gIHN0YXJ0XG4gIHJ1blxuICBmbG93XG59Il19
 //# sourceURL=src/async.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hc3luYy5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0ICogYXMgRm4gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZnVuY3Rpb25cIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IE1hY2hpbmUgfSBmcm9tIFwiLi9tYWNoaW5lXCJcbmltcG9ydCB7IFRhbG9zIH0gZnJvbSBcIi4vdGFsb3NcIlxuaW1wb3J0IHsgaXNNYWNoaW5lLCBpc0l0ZXJhdG9yS2luZCwgaXNHZW5lcmF0b3JGdW5jdGlvbktpbmQgfSBmcm9tIFwiLi90eXBlc1wiXG5cblxuU3RlcCA9XG4gIG1hdGNoVmVydGV4OiAoIHRhbG9zICkgLT5cbiAgICB2ZXJ0ZXggPSB0YWxvcy5tYWNoaW5lLmdyYXBoWyB0YWxvcy5zdGF0ZSBdXG4gICAgaWYgIXZlcnRleD9cbiAgICAgIHRhbG9zLmNhdGNoIG5ldyBFcnJvciBcInRhbG9zOiBzdGF0ZSBpcyBub3QgaW4gbWFjaGluZSBncmFwaFwiXG4gICAgdmVydGV4XG5cbiAgbWF0Y2hFZGdlOiAoIHZlcnRleCwgdGFsb3MsIGV2ZW50ICkgLT5cbiAgICBmb3IgZWRnZSBpbiB2ZXJ0ZXguZWRnZXNcbiAgICAgIHRyeVxuICAgICAgICBpZiAoIGF3YWl0IGVkZ2Uud2hlbiB0YWxvcywgZXZlbnQgKSA9PSB0cnVlXG4gICAgICAgICAgcmV0dXJuIGVkZ2VcbiAgICAgIGNhdGNoIGVycm9yXG4gICAgICAgIHJldHVybiB0YWxvcy5jYXRjaCBlcnJvclxuICAgIHRhbG9zLmNhdGNoIG5ldyBFcnJvciBcInRhbG9zOiBubyBtYXRjaGluZyB3aGVuIGNvbmRpdGlvblwiXG5cbiAgcnVuOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBpZiBpc0dlbmVyYXRvckZ1bmN0aW9uS2luZCBlZGdlLnJ1blxuICAgICAgICBmb3IgYXdhaXQgaW5uZXIgZnJvbSBlZGdlLnJ1biB0YWxvcywgZXZlbnRcbiAgICAgICAgICB5aWVsZCBpbm5lclxuICAgICAgICByZXR1cm4gICMgcHJldmVudCBhY2N1bXVsYXRpb25cbiAgICAgIGVsc2UgaWYgVHlwZS5pc0Z1bmN0aW9uIGVkZ2UucnVuXG4gICAgICAgIGF3YWl0IGVkZ2UucnVuIHRhbG9zLCBldmVudFxuICAgIGNhdGNoIGVycm9yXG4gICAgICB0YWxvcy5jYXRjaCBlcnJvclxuICAgICAgeWllbGQgdGFsb3NcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBhd2FpdCBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgY2F0Y2ggZXJyb3JcbiAgICAgIHRhbG9zLmNhdGNoIGVycm9yXG5cbiAgdGljazogKCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIHZlcnRleCA9IFN0ZXAubWF0Y2hWZXJ0ZXggdGFsb3NcbiAgICB5aWVsZCB0YWxvcyBpZiB0YWxvcy5lbmRlZFxuICAgIGVkZ2UgPSBhd2FpdCBTdGVwLm1hdGNoRWRnZSB2ZXJ0ZXgsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgZm9yIGF3YWl0IGlubmVyIGZyb20gU3RlcC5ydW4gZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgICB5aWVsZCBpbm5lclxuICAgIHlpZWxkIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG4gICAgYXdhaXQgU3RlcC5tb3ZlIGVkZ2UsIHRhbG9zLCBldmVudFxuICAgIHlpZWxkIHRhbG9zICAgIyB0aGlzIGlzIHRoZSBoYXBweS1wYXRoIHlpZWxkXG5cblxuc3RhcnQgPSBnZW5lcmljIG5hbWU6IFwidGFsb3M6IGFzeW5jIHN0YXJ0XCJcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCAoIG1hY2hpbmUgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICBzdGFydCB0YWxvc1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyBpdHMgb3duIGNvbnRleHQgcmVwZWF0ZWRseS5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgKCB0YWxvcyApIC0+XG4gIGxvb3BcbiAgICBmb3IgYXdhaXQgY3VycmVudCBmcm9tIFN0ZXAudGljayB0YWxvcywgdGFsb3MuY29udGV4dFxuICAgICAgeWllbGQgY3VycmVudFxuICAgICAgcmV0dXJuIGlmIHRhbG9zLmVuZGVkXG5cbmdlbmVyaWMgc3RhcnQsIGlzTWFjaGluZSwgaXNJdGVyYXRvcktpbmQsICggbWFjaGluZSwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyB2YWx1ZXMgZnJvbSByZWFjdG9yLlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBpc0l0ZXJhdG9yS2luZCwgKCB0YWxvcywgZXZlbnRzICkgLT5cbiAgZm9yIGF3YWl0IGV2ZW50IGZyb20gZXZlbnRzXG4gICAgZm9yIGF3YWl0IGN1cnJlbnQgZnJvbSBTdGVwLnRpY2sgdGFsb3MsIGV2ZW50XG4gICAgICB5aWVsZCBjdXJyZW50XG4gICAgICByZXR1cm4gaWYgdGFsb3MuZW5kZWRcblxuZ2VuZXJpYyBzdGFydCwgaXNNYWNoaW5lLCBUeXBlLmlzT2JqZWN0LCAoIG1hY2hpbmUsIGNvbnRleHQgKSAtPlxuICB0YWxvcyA9IFRhbG9zLm1ha2UgbWFjaGluZVxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvc1xuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNPYmplY3QsICggdGFsb3MsIGNvbnRleHQgKSAtPlxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBzdGFydCB0YWxvc1xuXG5nZW5lcmljIHN0YXJ0LCBpc01hY2hpbmUsIFR5cGUuaXNPYmplY3QsIGlzSXRlcmF0b3JLaW5kLCAoIG1hY2hpbmUsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzT2JqZWN0LCBpc0l0ZXJhdG9yS2luZCwgKCB0YWxvcywgY29udGV4dCwgZXZlbnRzICkgLT5cbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG5cbiMgQ29udmVuaWVuY2UgZnVuY3Rpb24gdG8ga2VlcCBnb2luZyBhbmQgb25seSByZXR1cm4gdGhlIGZpbmFsIHRhbG9zLlxucnVuID0gZ2VuZXJpYyBuYW1lOiBcInRhbG9zOiBhc3luYyBydW5cIlxuXG4jIEZ1cnRoZXIgY29udmVuaWVuY2UgdG8gc3VwcG9ydCBhdXRvbWF0aWNhbGx5IHVzaW5nIHN0YXJ0LlxuZ2VuZXJpYyBydW4sIFR5cGUuaXNBbnksICggYXJncy4uLiApIC0+XG4gIHJ1biBzdGFydCBhcmdzLi4uXG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzUmVhY3RvciwgKCByZWFjdG9yICkgLT5cbiAgZm9yIGF3YWl0IHRhbG9zIGZyb20gcmVhY3RvclxuICAgIHJlc3VsdCA9IHRhbG9zXG4gIHJlc3VsdFxuXG5mbG93ID0gKCBmeCApIC0+XG4gICggYXJncy4uLiApIC0+XG4gICAgdGFsb3MgPSBhd2FpdCBydW4gc3RhcnQgZngsIGFyZ3MuLi5cbiAgICBpZiB0YWxvcy5lcnJvcj9cbiAgICAgIHRocm93IHRhbG9zLmVycm9yXG4gICAgdGFsb3MuY29udGV4dFxuXG5leHBvcnQgKiBmcm9tIFwiLi9zdGF0ZXNcIlxuZXhwb3J0ICogZnJvbSBcIi4vbWFjaGluZVwiXG5leHBvcnQgKiBmcm9tIFwiLi90YWxvc1wiXG5leHBvcnQgKiBmcm9tIFwiLi90eXBlc1wiXG5leHBvcnQge1xuICBTdGVwICBcbiAgc3RhcnRcbiAgcnVuXG4gIGZsb3dcbn0iXSwibmFtZXMiOlsiU3RlcCIsImZsb3ciLCJydW4iLCJzdGFydCIsImdlbmVyaWMiLCJGbiIsIlR5cGUiLCJNYWNoaW5lIiwiVGFsb3MiLCJpc01hY2hpbmUiLCJpc0l0ZXJhdG9yS2luZCIsImlzR2VuZXJhdG9yRnVuY3Rpb25LaW5kIiwibWF0Y2hWZXJ0ZXgiLCJ0YWxvcyIsInZlcnRleCIsIm1hY2hpbmUiLCJncmFwaCIsInN0YXRlIiwiY2F0Y2giLCJFcnJvciIsIm1hdGNoRWRnZSIsImV2ZW50IiwiZWRnZSIsImVycm9yIiwiaSIsImxlbiIsInJlZiIsImVkZ2VzIiwibGVuZ3RoIiwid2hlbiIsImVycm9yMSIsImlubmVyIiwiaXNGdW5jdGlvbiIsIm1vdmUiLCJ0aWNrIiwiZW5kZWQiLCJuYW1lIiwibWFrZSIsImlzVHlwZSIsImN1cnJlbnQiLCJjb250ZXh0IiwiZXZlbnRzIiwiaXNPYmplY3QiLCJpc0FueSIsImFyZ3MiLCJpc1JlYWN0b3IiLCJyZWFjdG9yIiwicmVzdWx0IiwiZngiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBLE1BQUFDLE1BQUFDLEtBQUFDO0FBQUEsU0FBU0MsT0FBVCxRQUFBLHdCQUFBO0FBQ0EsWUFBT0MsUUFBUCx5QkFBQTtBQUNBLFlBQU9DLFVBQVAscUJBQUE7QUFDQSxTQUFTQyxPQUFULFFBQUEsWUFBQTtBQUNBLFNBQVNDLEtBQVQsUUFBQSxVQUFBO0FBQ0EsU0FBU0MsU0FBVCxFQUFvQkMsY0FBcEIsRUFBb0NDLHVCQUFwQyxRQUFBLFVBQUE7QUFHQVgsT0FDRTtJQUFBWSxhQUFhLFNBQUVDLEtBQUY7UUFDZixJQUFBQztRQUFJQSxTQUFTRCxNQUFNRSxPQUFPLENBQUNDLEtBQUssQ0FBRUgsTUFBTUksS0FBUixDQUFBO1FBQzVCLElBQUlILFVBQUEsTUFBSjtZQUNFRCxNQUFNSyxLQUFOLENBQVksSUFBSUMsTUFBTTs7ZUFDeEJMO0lBSlc7SUFNYk0sV0FBVyxlQUFFTixNQUFGLEVBQVVELEtBQVYsRUFBaUJRLEtBQWpCO1FBQ2IsSUFBQUMsTUFBQUMsT0FBQUMsR0FBQUMsS0FBQUM7UUFBSUEsTUFBQVosT0FBQWEsS0FBQTtRQUFBLElBQUFILElBQUEsR0FBQUMsTUFBQUMsSUFBQUUsTUFBQSxFQUFBSixJQUFBQyxLQUFBRCxJQUFBOztZQUNFLElBQUE7Z0JBQ0UsSUFBRyxBQUFFLE1BQU1GLEtBQUtPLElBQUwsQ0FBVWhCLE9BQU9RLFdBQVcsTUFBdkM7b0JBQ0UsT0FBT0M7O2NBQ1gsT0FBQVEsUUFBQTtnQkFBTVAsUUFBQU87Z0JBQ0osT0FBT2pCLE1BQU1LLEtBQU4sQ0FBWUs7O1FBTHZCO2VBTUFWLE1BQU1LLEtBQU4sQ0FBWSxJQUFJQyxNQUFNO0lBUGI7SUFTWGpCLEtBQUssZ0JBQUVvQixJQUFGLEVBQVFULEtBQVIsRUFBZVEsS0FBZjtRQUNQLElBQUFFLE9BQUFRLE9BQUFMO1FBQUksSUFBQTtZQUNFLElBQUdmLHdCQUF3QlcsS0FBS3BCLEdBQTdCLEdBQUg7Z0JBQ0V3QixNQUFBSixLQUFBcEIsR0FBQSxDQUFBVyxPQUFBUTtnQkFBQSxXQUFBVSxTQUFBTCxJQUFBO29CQUNFLE1BQU1LLE9BRFIsdUJBQUE7Z0JBQUE7bUJBR0csSUFBR3pCLEtBQUswQixVQUFMLENBQWdCVixLQUFLcEIsR0FBckIsR0FBSDt1QkFDSCxNQUFNb0IsS0FBS3BCLEdBQUwsQ0FBU1csT0FBT1E7O1VBQzFCLE9BQUFTLFFBQUE7WUFBTVAsUUFBQU87WUFDSmpCLE1BQU1LLEtBQU4sQ0FBWUs7bUJBQ1osTUFBTVY7O0lBVkw7SUFZTG9CLE1BQU0sZUFBRVgsSUFBRixFQUFRVCxLQUFSLEVBQWVRLEtBQWY7UUFDUixJQUFBRTtRQUFJLElBQUE7bUJBQ0UsTUFBTUQsS0FBS1csSUFBTCxDQUFVcEIsT0FBT1E7VUFDekIsT0FBQVMsUUFBQTtZQUFNUCxRQUFBTzttQkFDSmpCLE1BQU1LLEtBQU4sQ0FBWUs7O0lBSlY7SUFNTlcsTUFBTSxnQkFBRXJCLEtBQUYsRUFBU1EsS0FBVDtRQUNSLElBQUFDLE1BQUFTLE9BQUFMLEtBQUFaO1FBQUlBLFNBQVNkLEtBQUtZLFdBQUwsQ0FBaUJDO1FBQzFCLElBQWVBLE1BQU1zQixLQUFyQixFQUFBO1lBQUEsTUFBTXRCOztRQUNOUyxPQUFPLE1BQU10QixLQUFLb0IsU0FBTCxDQUFlTixRQUFRRCxPQUFPUTtRQUMzQyxJQUFlUixNQUFNc0IsS0FBckIsRUFBQTtZQUFBLE1BQU10Qjs7UUFDTmEsTUFBQTFCLEtBQUFFLEdBQUEsQ0FBQW9CLE1BQUFULE9BQUFRO1FBQUEsV0FBQVUsU0FBQUwsSUFBQTtZQUNFLE1BQU1LO1FBRFI7UUFFQSxJQUFlbEIsTUFBTXNCLEtBQXJCLEVBQUE7WUFBQSxNQUFNdEI7O1FBQ04sTUFBTWIsS0FBS2lDLElBQUwsQ0FBVVgsTUFBTVQsT0FBT1E7ZUFDN0IsTUFBTVIsT0FURiwrQkFBQTtJQUFBO0FBakNOO0FBNkNGVixRQUFRQyxRQUFRO0lBQUFnQyxNQUFNO0FBQU47QUFFaEJoQyxRQUFRRCxPQUFPTSxXQUFXLFNBQUVNLE9BQUY7SUFDMUIsSUFBQUY7SUFBRUEsUUFBUUwsTUFBTTZCLElBQU4sQ0FBV3RCO1dBQ25CWixNQUFNVTtBQUZrQjs7QUFLMUJULFFBQVFELE9BQU9LLE1BQU04QixNQUFyQixFQUE2QixnQkFBRXpCLEtBQUY7SUFDN0IsSUFBQTBCLFNBQUFiO0lBQUUsTUFBQSxLQUFBO1FBQ0VBLE1BQUExQixLQUFBa0MsSUFBQSxDQUFBckIsT0FBQUEsTUFBQTJCLE9BQUE7UUFBQSxXQUFBRCxXQUFBYixJQUFBO1lBQ0UsTUFBTWE7WUFDTixJQUFVMUIsTUFBTXNCLEtBQWhCLEVBQUE7Z0JBQUE7O1FBRkY7SUFERjtBQUQyQjtBQU03Qi9CLFFBQVFELE9BQU9NLFdBQVdDLGdCQUFnQixTQUFFSyxPQUFGLEVBQVcwQixNQUFYO0lBQzFDLElBQUE1QjtJQUFFQSxRQUFRTCxNQUFNNkIsSUFBTixDQUFXdEI7V0FDbkJaLE1BQU1VLE9BQU80QjtBQUYyQjs7QUFLMUNyQyxRQUFRRCxPQUFPSyxNQUFNOEIsTUFBckIsRUFBNkI1QixnQkFBZ0IsZ0JBQUVHLEtBQUYsRUFBUzRCLE1BQVQ7SUFDN0MsSUFBQUYsU0FBQWxCLE9BQUFLO0lBQUUsV0FBQUwsU0FBQW9CLE9BQUE7UUFDRWYsTUFBQTFCLEtBQUFrQyxJQUFBLENBQUFyQixPQUFBUTtRQUFBLFdBQUFrQixXQUFBYixJQUFBO1lBQ0UsTUFBTWE7WUFDTixJQUFVMUIsTUFBTXNCLEtBQWhCLEVBQUE7Z0JBQUE7O1FBRkY7SUFERjtBQUQyQztBQU03Qy9CLFFBQVFELE9BQU9NLFdBQVdILEtBQUtvQyxRQUEvQixFQUF5QyxTQUFFM0IsT0FBRixFQUFXeUIsT0FBWDtJQUN6QyxJQUFBM0I7SUFBRUEsUUFBUUwsTUFBTTZCLElBQU4sQ0FBV3RCO0lBQ25CRixNQUFNMkIsT0FBTixHQUFnQkE7V0FDaEJyQyxNQUFNVTtBQUhpQztBQUt6Q1QsUUFBUUQsT0FBT0ssTUFBTThCLE1BQXJCLEVBQTZCaEMsS0FBS29DLFFBQWxDLEVBQTRDLFNBQUU3QixLQUFGLEVBQVMyQixPQUFUO0lBQzFDM0IsTUFBTTJCLE9BQU4sR0FBZ0JBO1dBQ2hCckMsTUFBTVU7QUFGb0M7QUFJNUNULFFBQVFELE9BQU9NLFdBQVdILEtBQUtvQyxRQUEvQixFQUF5Q2hDLGdCQUFnQixTQUFFSyxPQUFGLEVBQVd5QixPQUFYLEVBQW9CQyxNQUFwQjtJQUN6RCxJQUFBNUI7SUFBRUEsUUFBUUwsTUFBTTZCLElBQU4sQ0FBV3RCO0lBQ25CRixNQUFNMkIsT0FBTixHQUFnQkE7V0FDaEJyQyxNQUFNVSxPQUFPNEI7QUFIMEM7QUFLekRyQyxRQUFRRCxPQUFPSyxNQUFNOEIsTUFBckIsRUFBNkJoQyxLQUFLb0MsUUFBbEMsRUFBNENoQyxnQkFBZ0IsU0FBRUcsS0FBRixFQUFTMkIsT0FBVCxFQUFrQkMsTUFBbEI7SUFDMUQ1QixNQUFNMkIsT0FBTixHQUFnQkE7V0FDaEJyQyxNQUFNVSxPQUFPNEI7QUFGNkM7O0FBTTVEdkMsTUFBTUUsUUFBUTtJQUFBZ0MsTUFBTTtBQUFOOztBQUdkaEMsUUFBUUYsS0FBS0ksS0FBS3FDLEtBQWxCLEVBQXlCO0lBQUEsSUFBQSxJQUFBLE9BQUEsVUFBQSxRQUFBLEFBQUVDLE9BQUYsVUFBQSxPQUFBLE9BQUEsR0FBQSxPQUFBLE1BQUEsT0FBQTtRQUFFQSxLQUFGLFFBQUEsU0FBQSxDQUFBLEtBQUE7SUFBRTtXQUN6QjFDLElBQUlDLFNBQU15QztBQURhO0FBR3pCeEMsUUFBUUYsS0FBS0ksS0FBS3VDLFNBQWxCLEVBQTZCLGVBQUVDLE9BQUY7SUFDN0IsSUFBQUMsUUFBQWxDO0lBQUUsV0FBQUEsU0FBQWlDLFFBQUE7UUFDRUMsU0FBU2xDO0lBRFg7V0FFQWtDO0FBSDJCO0FBSzdCOUMsT0FBTyxTQUFFK0MsRUFBRjtXQUNMO1FBQUEsSUFBQSxJQUFBLE9BQUEsVUFBQSxRQUFBLEFBQUVKLE9BQUYsVUFBQSxPQUFBLE9BQUEsR0FBQSxPQUFBLE1BQUEsT0FBQTtZQUFFQSxLQUFGLFFBQUEsU0FBQSxDQUFBLEtBQUE7UUFBRTtRQUNKLElBQUEvQjtRQUFJQSxRQUFRLE1BQU1YLElBQUlDLE1BQU02QyxPQUFJSjtRQUM1QixJQUFHL0IsTUFBQVUsS0FBQSxJQUFBLE1BQUg7WUFDRSxNQUFNVixNQUFNVSxLQUFBOztlQUNkVixNQUFNMkIsT0FBQTtJQUpSO0FBREs7QUFPUCxjQUFBLFdBQUE7QUFDQSxjQUFBLFlBQUE7QUFDQSxjQUFBLFVBQUE7QUFDQSxjQUFBLFVBQUE7QUFDQSxTQUNFeEMsSUFERixFQUVFRyxLQUZGLEVBR0VELEdBSEYsRUFJRUQsSUFKRiJ9