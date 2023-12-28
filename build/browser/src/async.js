var Step, build, flow, flowWith, isIterator, run, start;
import { generic } from "@dashkite/joy/generic";
import * as Fn from "@dashkite/joy/function";
import * as Type from "@dashkite/joy/type";
import log from "@dashkite/kaiko";
import { Machine } from "./machine";
import { Talos } from "./talos";
// These async functions can consume sync iterators, so long as we let async
// behavior take over downstream.
isIterator = function(x) {
    return x[Symbol.asyncIterator] != null || x[Symbol.iterator] != null;
};
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
generic(start, Type.isObject, function(machine) {
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
generic(start, Type.isObject, isIterator, function(machine, events) {
    var talos;
    talos = Talos.make(machine);
    return start(talos, events);
});
// Create generator where state machine consumes values from iterator.
generic(start, Talos.isType, isIterator, async function*(talos, events) {
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
generic(start, Type.isObject, Type.isObject, function(machine, context) {
    var talos;
    talos = Talos.make(machine);
    talos.context = context;
    return start(talos);
});
generic(start, Talos.isType, Type.isObject, function(talos, context) {
    talos.context = context;
    return start(talos);
});
generic(start, Type.isObject, Type.isObject, isIterator, function(machine, context, events) {
    var talos;
    talos = Talos.make(machine);
    talos.context = context;
    return start(talos, events);
});
generic(start, Talos.isType, Type.isObject, isIterator, function(talos, context, events) {
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
generic(run, isIterator, async function(cycle) {
    var result, talos;
    for await (talos of cycle){
        result = talos;
    }
    return result;
});
// Convenience function to provide a curried functional interface for cycle run.
// "start" allows first argument to be talos instance or machine definition.
build = function(talos) {
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return run(start(talos, ...args));
    };
};
flow = function(fx) {
    var machine;
    machine = Machine.make(fx);
    return async function(context) {
        var cycle, talos;
        cycle = start(machine, context);
        talos = await run(cycle);
        if (talos.error != null) {
            throw talos.error;
        }
        return talos.context;
    };
};
flowWith = Fn.curry(function(f, gx) {
    var machine;
    machine = Machine.make(gx);
    return async function(context) {
        var cycle, result, talos;
        cycle = start(machine, context);
        result = null;
        for await (talos of cycle){
            await f(talos);
            result = talos;
        }
        if (result.error != null) {
            throw result.error;
        }
        return result.context;
    };
});
export { Step, start, run, build, flow, flowWith }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2FzeW5jLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxVQUFBLEVBQUEsR0FBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsTUFBUCxNQUFBOztBQUNBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxHQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQSxVQUxBOzs7O0FBU0EsVUFBQSxHQUFhLFFBQUEsQ0FBRSxDQUFGLENBQUE7U0FBUyxpQ0FBQSxJQUE4QjtBQUF2Qzs7QUFFYixJQUFBLEdBQ0U7RUFBQSxXQUFBLEVBQWEsUUFBQSxDQUFFLEtBQUYsQ0FBQTtBQUNmLFFBQUE7SUFBSSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUUsS0FBSyxDQUFDLEtBQVI7SUFDNUIsSUFBSSxjQUFKO01BQ0UsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFJLEtBQUosQ0FBVSxxQ0FBVixDQUFaLEVBREY7O1dBRUE7RUFKVyxDQUFiO0VBTUEsU0FBQSxFQUFXLE1BQUEsUUFBQSxDQUFFLE1BQUYsRUFBVSxLQUFWLEVBQWlCLEtBQWpCLENBQUE7QUFDYixRQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFJO0lBQUEsS0FBQSxxQ0FBQTs7QUFDRTtRQUNFLElBQUcsQ0FBRSxDQUFBLE1BQU0sSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEtBQWpCLENBQU4sQ0FBRixDQUFBLEtBQW9DLElBQXZDO0FBQ0UsaUJBQU8sS0FEVDtTQURGO09BR0EsY0FBQTtRQUFNO0FBQ0osZUFBTyxLQUFLLENBQUMsS0FBTixDQUFZLEtB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T0FBZjtJQUNSLE1BQUEsR0FBUztJQUNULDBCQUFBO01BQ0UsTUFBTSxDQUFBLENBQUUsS0FBRjtNQUNOLE1BQUEsR0FBUztJQUZYO0lBR0EsSUFBRyxvQkFBSDtNQUNFLE1BQU0sTUFBTSxDQUFDLE1BRGY7O1dBRUEsTUFBTSxDQUFDO0VBUlQ7QUFGa0IsQ0FBVDs7QUFZWCxPQUFBO0VBQ0UsSUFERjtFQUVFLEtBRkY7RUFHRSxHQUhGO0VBSUUsS0FKRjtFQUtFLElBTEY7RUFNRSxRQU5GIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0ICogYXMgRm4gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZnVuY3Rpb25cIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCBsb2cgZnJvbSBcIkBkYXNoa2l0ZS9rYWlrb1wiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcblxuIyBUaGVzZSBhc3luYyBmdW5jdGlvbnMgY2FuIGNvbnN1bWUgc3luYyBpdGVyYXRvcnMsIHNvIGxvbmcgYXMgd2UgbGV0IGFzeW5jXG4jIGJlaGF2aW9yIHRha2Ugb3ZlciBkb3duc3RyZWFtLlxuaXNJdGVyYXRvciA9ICggeCApIC0+IHhbIFN5bWJvbC5hc3luY0l0ZXJhdG9yIF0/IHx8IHhbIFN5bWJvbC5pdGVyYXRvciBdP1xuXG5TdGVwID1cbiAgbWF0Y2hWZXJ0ZXg6ICggdGFsb3MgKSAtPlxuICAgIHZlcnRleCA9IHRhbG9zLm1hY2hpbmUuZ3JhcGhbIHRhbG9zLnN0YXRlIF1cbiAgICBpZiAhdmVydGV4P1xuICAgICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwidGFsb3Mgc3RhdGUgaXMgbm90IGluIG1hY2hpbmUgZ3JhcGhcIlxuICAgIHZlcnRleFxuXG4gIG1hdGNoRWRnZTogKCB2ZXJ0ZXgsIHRhbG9zLCBldmVudCApIC0+XG4gICAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgICB0cnlcbiAgICAgICAgaWYgKCBhd2FpdCBlZGdlLndoZW4gdGFsb3MsIGV2ZW50ICkgPT0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBlZGdlXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJubyBtYXRjaGluZyB3aGVuIGNvbmRpdGlvblwiXG5cbiAgcnVuOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgaWYgZWRnZS5ydW4/XG4gICAgICB0cnlcbiAgICAgICAgYXdhaXQgZWRnZS5ydW4gdGFsb3MsIGV2ZW50XG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICB0YWxvcy5jYXRjaCBlcnJvclxuXG4gIG1vdmU6ICggZWRnZSwgdGFsb3MsIGV2ZW50ICkgLT5cbiAgICB0cnlcbiAgICAgIGF3YWl0IGVkZ2UubW92ZSB0YWxvcywgZXZlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICB0aWNrOiAoIHRhbG9zLCBldmVudCApIC0+XG4gICAgdmVydGV4ID0gU3RlcC5tYXRjaFZlcnRleCB0YWxvc1xuICAgIHlpZWxkIHRhbG9zXG4gICAgZWRnZSA9IGF3YWl0IFN0ZXAubWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3NcbiAgICBhd2FpdCBTdGVwLnJ1biBlZGdlLCB0YWxvcywgZXZlbnRcbiAgICB5aWVsZCB0YWxvc1xuICAgIGF3YWl0IFN0ZXAubW92ZSBlZGdlLCB0YWxvcywgZXZlbnRcbiAgICB5aWVsZCB0YWxvc1xuXG5cbnN0YXJ0ID0gZ2VuZXJpYyBcbiAgbmFtZTogXCJ0YWxvczogc3luYyBzdGFydFwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yIFwidGFsb3Mgc3luYyBzdGFydDogaW5wdXQgaXMgbWFsZm9ybWVkICN7IEpTT04uc3RyaW5naWZ5IGFyZ3MgfVwiXG5cbmdlbmVyaWMgc3RhcnQsIFR5cGUuaXNPYmplY3QsICggbWFjaGluZSApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIGl0cyBvd24gY29udGV4dCByZXBlYXRlZGx5LlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCAoIHRhbG9zICkgLT5cbiAgbG9vcFxuICAgIGZvciBhd2FpdCB0YWxvcyBmcm9tIFN0ZXAudGljayB0YWxvcywgdGFsb3MuY29udGV4dFxuICAgICAgaWYgdGFsb3MuZW5kZWRcbiAgICAgICAgeWllbGQgdGFsb3NcbiAgICAgICAgcmV0dXJuXG4gICAgeWllbGQgdGFsb3NcbiAgcmV0dXJuICMgcHJldmVudHMgYWNjdW11bGF0aW9uXG5cbmdlbmVyaWMgc3RhcnQsIFR5cGUuaXNPYmplY3QsIGlzSXRlcmF0b3IsICggbWFjaGluZSwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyB2YWx1ZXMgZnJvbSBpdGVyYXRvci5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgaXNJdGVyYXRvciwgKCB0YWxvcywgZXZlbnRzICkgLT5cbiAgZm9yIGF3YWl0IGV2ZW50IGZyb20gZXZlbnRzXG4gICAgZm9yIGF3YWl0IHRhbG9zIGZyb20gU3RlcC50aWNrIHRhbG9zLCBldmVudFxuICAgICAgaWYgdGFsb3MuZW5kZWRcbiAgICAgICAgeWllbGQgdGFsb3NcbiAgICAgICAgcmV0dXJuXG4gICAgeWllbGQgdGFsb3NcbiAgcmV0dXJuICMgcHJldmVudHMgYWNjdW11bGF0aW9uXG5cbmdlbmVyaWMgc3RhcnQsIFR5cGUuaXNPYmplY3QsIFR5cGUuaXNPYmplY3QsICggbWFjaGluZSwgY29udGV4dCApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgKCB0YWxvcywgY29udGV4dCApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIFR5cGUuaXNPYmplY3QsIFR5cGUuaXNPYmplY3QsIGlzSXRlcmF0b3IsICggbWFjaGluZSwgY29udGV4dCwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNPYmplY3QsIGlzSXRlcmF0b3IsICggdGFsb3MsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuXG4jIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGtlZXAgZ29pbmcgYW5kIG9ubHkgcmV0dXJuIHRoZSBmaW5hbCB0YWxvcy5cbnJ1biA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidGFsb3M6IHN5bmMgcnVuXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwidGFsb3Mgc3luYyBydW46IGlucHV0IGlzIG1hbGZvcm1lZCAjeyBKU09OLnN0cmluZ2lmeSBhcmdzIH1cIlxuXG5nZW5lcmljIHJ1biwgaXNJdGVyYXRvciwgKCBjeWNsZSApIC0+XG4gIGZvciBhd2FpdCB0YWxvcyBmcm9tIGN5Y2xlXG4gICAgcmVzdWx0ID0gdGFsb3NcbiAgcmVzdWx0XG5cbiMgQ29udmVuaWVuY2UgZnVuY3Rpb24gdG8gcHJvdmlkZSBhIGN1cnJpZWQgZnVuY3Rpb25hbCBpbnRlcmZhY2UgZm9yIGN5Y2xlIHJ1bi5cbiMgXCJzdGFydFwiIGFsbG93cyBmaXJzdCBhcmd1bWVudCB0byBiZSB0YWxvcyBpbnN0YW5jZSBvciBtYWNoaW5lIGRlZmluaXRpb24uXG5idWlsZCA9ICggdGFsb3MgKSAtPlxuICAoIGFyZ3MuLi4gKSAtPiBydW4gc3RhcnQgdGFsb3MsIGFyZ3MuLi5cblxuZmxvdyA9ICggZnggKSAtPlxuICBtYWNoaW5lID0gTWFjaGluZS5tYWtlIGZ4XG4gICggY29udGV4dCApIC0+IFxuICAgIGN5Y2xlID0gc3RhcnQgbWFjaGluZSwgY29udGV4dFxuICAgIHRhbG9zID0gYXdhaXQgcnVuIGN5Y2xlXG4gICAgaWYgdGFsb3MuZXJyb3I/XG4gICAgICB0aHJvdyB0YWxvcy5lcnJvclxuICAgIHRhbG9zLmNvbnRleHRcblxuZmxvd1dpdGggPSBGbi5jdXJyeSAoIGYsIGd4ICkgLT5cbiAgbWFjaGluZSA9IE1hY2hpbmUubWFrZSBneFxuICAoIGNvbnRleHQgKSAtPiBcbiAgICBjeWNsZSA9IHN0YXJ0IG1hY2hpbmUsIGNvbnRleHRcbiAgICByZXN1bHQgPSBudWxsXG4gICAgZm9yIGF3YWl0IHRhbG9zIGZyb20gY3ljbGVcbiAgICAgIGF3YWl0IGYgdGFsb3NcbiAgICAgIHJlc3VsdCA9IHRhbG9zXG4gICAgaWYgcmVzdWx0LmVycm9yP1xuICAgICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gICAgcmVzdWx0LmNvbnRleHRcblxuZXhwb3J0IHtcbiAgU3RlcCAgXG4gIHN0YXJ0XG4gIHJ1blxuICBidWlsZFxuICBmbG93XG4gIGZsb3dXaXRoXG59Il19
 //# sourceURL=src/async.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hc3luYy5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0ICogYXMgRm4gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZnVuY3Rpb25cIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCBsb2cgZnJvbSBcIkBkYXNoa2l0ZS9rYWlrb1wiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcblxuIyBUaGVzZSBhc3luYyBmdW5jdGlvbnMgY2FuIGNvbnN1bWUgc3luYyBpdGVyYXRvcnMsIHNvIGxvbmcgYXMgd2UgbGV0IGFzeW5jXG4jIGJlaGF2aW9yIHRha2Ugb3ZlciBkb3duc3RyZWFtLlxuaXNJdGVyYXRvciA9ICggeCApIC0+IHhbIFN5bWJvbC5hc3luY0l0ZXJhdG9yIF0/IHx8IHhbIFN5bWJvbC5pdGVyYXRvciBdP1xuXG5TdGVwID1cbiAgbWF0Y2hWZXJ0ZXg6ICggdGFsb3MgKSAtPlxuICAgIHZlcnRleCA9IHRhbG9zLm1hY2hpbmUuZ3JhcGhbIHRhbG9zLnN0YXRlIF1cbiAgICBpZiAhdmVydGV4P1xuICAgICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwidGFsb3Mgc3RhdGUgaXMgbm90IGluIG1hY2hpbmUgZ3JhcGhcIlxuICAgIHZlcnRleFxuXG4gIG1hdGNoRWRnZTogKCB2ZXJ0ZXgsIHRhbG9zLCBldmVudCApIC0+XG4gICAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgICB0cnlcbiAgICAgICAgaWYgKCBhd2FpdCBlZGdlLndoZW4gdGFsb3MsIGV2ZW50ICkgPT0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBlZGdlXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJubyBtYXRjaGluZyB3aGVuIGNvbmRpdGlvblwiXG5cbiAgcnVuOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgaWYgZWRnZS5ydW4/XG4gICAgICB0cnlcbiAgICAgICAgYXdhaXQgZWRnZS5ydW4gdGFsb3MsIGV2ZW50XG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICB0YWxvcy5jYXRjaCBlcnJvclxuXG4gIG1vdmU6ICggZWRnZSwgdGFsb3MsIGV2ZW50ICkgLT5cbiAgICB0cnlcbiAgICAgIGF3YWl0IGVkZ2UubW92ZSB0YWxvcywgZXZlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICB0aWNrOiAoIHRhbG9zLCBldmVudCApIC0+XG4gICAgdmVydGV4ID0gU3RlcC5tYXRjaFZlcnRleCB0YWxvc1xuICAgIHlpZWxkIHRhbG9zXG4gICAgZWRnZSA9IGF3YWl0IFN0ZXAubWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIGV2ZW50XG4gICAgeWllbGQgdGFsb3NcbiAgICBhd2FpdCBTdGVwLnJ1biBlZGdlLCB0YWxvcywgZXZlbnRcbiAgICB5aWVsZCB0YWxvc1xuICAgIGF3YWl0IFN0ZXAubW92ZSBlZGdlLCB0YWxvcywgZXZlbnRcbiAgICB5aWVsZCB0YWxvc1xuXG5cbnN0YXJ0ID0gZ2VuZXJpYyBcbiAgbmFtZTogXCJ0YWxvczogc3luYyBzdGFydFwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yIFwidGFsb3Mgc3luYyBzdGFydDogaW5wdXQgaXMgbWFsZm9ybWVkICN7IEpTT04uc3RyaW5naWZ5IGFyZ3MgfVwiXG5cbmdlbmVyaWMgc3RhcnQsIFR5cGUuaXNPYmplY3QsICggbWFjaGluZSApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHN0YXJ0IHRhbG9zXG5cbiMgQ3JlYXRlIGdlbmVyYXRvciB3aGVyZSBzdGF0ZSBtYWNoaW5lIGNvbnN1bWVzIGl0cyBvd24gY29udGV4dCByZXBlYXRlZGx5LlxuZ2VuZXJpYyBzdGFydCwgVGFsb3MuaXNUeXBlLCAoIHRhbG9zICkgLT5cbiAgbG9vcFxuICAgIGZvciBhd2FpdCB0YWxvcyBmcm9tIFN0ZXAudGljayB0YWxvcywgdGFsb3MuY29udGV4dFxuICAgICAgaWYgdGFsb3MuZW5kZWRcbiAgICAgICAgeWllbGQgdGFsb3NcbiAgICAgICAgcmV0dXJuXG4gICAgeWllbGQgdGFsb3NcbiAgcmV0dXJuICMgcHJldmVudHMgYWNjdW11bGF0aW9uXG5cbmdlbmVyaWMgc3RhcnQsIFR5cGUuaXNPYmplY3QsIGlzSXRlcmF0b3IsICggbWFjaGluZSwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG4jIENyZWF0ZSBnZW5lcmF0b3Igd2hlcmUgc3RhdGUgbWFjaGluZSBjb25zdW1lcyB2YWx1ZXMgZnJvbSBpdGVyYXRvci5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgaXNJdGVyYXRvciwgKCB0YWxvcywgZXZlbnRzICkgLT5cbiAgZm9yIGF3YWl0IGV2ZW50IGZyb20gZXZlbnRzXG4gICAgZm9yIGF3YWl0IHRhbG9zIGZyb20gU3RlcC50aWNrIHRhbG9zLCBldmVudFxuICAgICAgaWYgdGFsb3MuZW5kZWRcbiAgICAgICAgeWllbGQgdGFsb3NcbiAgICAgICAgcmV0dXJuXG4gICAgeWllbGQgdGFsb3NcbiAgcmV0dXJuICMgcHJldmVudHMgYWNjdW11bGF0aW9uXG5cbmdlbmVyaWMgc3RhcnQsIFR5cGUuaXNPYmplY3QsIFR5cGUuaXNPYmplY3QsICggbWFjaGluZSwgY29udGV4dCApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc09iamVjdCwgKCB0YWxvcywgY29udGV4dCApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zXG5cbmdlbmVyaWMgc3RhcnQsIFR5cGUuaXNPYmplY3QsIFR5cGUuaXNPYmplY3QsIGlzSXRlcmF0b3IsICggbWFjaGluZSwgY29udGV4dCwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgc3RhcnQgdGFsb3MsIGV2ZW50c1xuXG5nZW5lcmljIHN0YXJ0LCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNPYmplY3QsIGlzSXRlcmF0b3IsICggdGFsb3MsIGNvbnRleHQsIGV2ZW50cyApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIHN0YXJ0IHRhbG9zLCBldmVudHNcblxuXG4jIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGtlZXAgZ29pbmcgYW5kIG9ubHkgcmV0dXJuIHRoZSBmaW5hbCB0YWxvcy5cbnJ1biA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidGFsb3M6IHN5bmMgcnVuXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwidGFsb3Mgc3luYyBydW46IGlucHV0IGlzIG1hbGZvcm1lZCAjeyBKU09OLnN0cmluZ2lmeSBhcmdzIH1cIlxuXG5nZW5lcmljIHJ1biwgaXNJdGVyYXRvciwgKCBjeWNsZSApIC0+XG4gIGZvciBhd2FpdCB0YWxvcyBmcm9tIGN5Y2xlXG4gICAgcmVzdWx0ID0gdGFsb3NcbiAgcmVzdWx0XG5cbiMgQ29udmVuaWVuY2UgZnVuY3Rpb24gdG8gcHJvdmlkZSBhIGN1cnJpZWQgZnVuY3Rpb25hbCBpbnRlcmZhY2UgZm9yIGN5Y2xlIHJ1bi5cbiMgXCJzdGFydFwiIGFsbG93cyBmaXJzdCBhcmd1bWVudCB0byBiZSB0YWxvcyBpbnN0YW5jZSBvciBtYWNoaW5lIGRlZmluaXRpb24uXG5idWlsZCA9ICggdGFsb3MgKSAtPlxuICAoIGFyZ3MuLi4gKSAtPiBydW4gc3RhcnQgdGFsb3MsIGFyZ3MuLi5cblxuZmxvdyA9ICggZnggKSAtPlxuICBtYWNoaW5lID0gTWFjaGluZS5tYWtlIGZ4XG4gICggY29udGV4dCApIC0+IFxuICAgIGN5Y2xlID0gc3RhcnQgbWFjaGluZSwgY29udGV4dFxuICAgIHRhbG9zID0gYXdhaXQgcnVuIGN5Y2xlXG4gICAgaWYgdGFsb3MuZXJyb3I/XG4gICAgICB0aHJvdyB0YWxvcy5lcnJvclxuICAgIHRhbG9zLmNvbnRleHRcblxuZmxvd1dpdGggPSBGbi5jdXJyeSAoIGYsIGd4ICkgLT5cbiAgbWFjaGluZSA9IE1hY2hpbmUubWFrZSBneFxuICAoIGNvbnRleHQgKSAtPiBcbiAgICBjeWNsZSA9IHN0YXJ0IG1hY2hpbmUsIGNvbnRleHRcbiAgICByZXN1bHQgPSBudWxsXG4gICAgZm9yIGF3YWl0IHRhbG9zIGZyb20gY3ljbGVcbiAgICAgIGF3YWl0IGYgdGFsb3NcbiAgICAgIHJlc3VsdCA9IHRhbG9zXG4gICAgaWYgcmVzdWx0LmVycm9yP1xuICAgICAgdGhyb3cgcmVzdWx0LmVycm9yXG4gICAgcmVzdWx0LmNvbnRleHRcblxuZXhwb3J0IHtcbiAgU3RlcCAgXG4gIHN0YXJ0XG4gIHJ1blxuICBidWlsZFxuICBmbG93XG4gIGZsb3dXaXRoXG59Il0sIm5hbWVzIjpbIlN0ZXAiLCJidWlsZCIsImZsb3ciLCJmbG93V2l0aCIsImlzSXRlcmF0b3IiLCJydW4iLCJzdGFydCIsImdlbmVyaWMiLCJGbiIsIlR5cGUiLCJsb2ciLCJNYWNoaW5lIiwiVGFsb3MiLCJ4IiwiU3ltYm9sIiwiYXN5bmNJdGVyYXRvciIsIml0ZXJhdG9yIiwibWF0Y2hWZXJ0ZXgiLCJ0YWxvcyIsInZlcnRleCIsIm1hY2hpbmUiLCJncmFwaCIsInN0YXRlIiwiY2F0Y2giLCJFcnJvciIsIm1hdGNoRWRnZSIsImV2ZW50IiwiZWRnZSIsImVycm9yIiwiaSIsImxlbiIsInJlZiIsImVkZ2VzIiwibGVuZ3RoIiwid2hlbiIsImVycm9yMSIsIm1vdmUiLCJ0aWNrIiwibmFtZSIsImRlZmF1bHQiLCJhcmdzIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzT2JqZWN0IiwibWFrZSIsImlzVHlwZSIsImNvbnRleHQiLCJlbmRlZCIsImV2ZW50cyIsImN5Y2xlIiwicmVzdWx0IiwiZngiLCJjdXJyeSIsImYiLCJneCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQUEsTUFBQUMsT0FBQUMsTUFBQUMsVUFBQUMsWUFBQUMsS0FBQUM7QUFBQSxTQUFTQyxPQUFULFFBQUEsd0JBQUE7QUFDQSxZQUFPQyxRQUFQLHlCQUFBO0FBQ0EsWUFBT0MsVUFBUCxxQkFBQTtBQUNBLE9BQU9DLFNBQVAsa0JBQUE7QUFDQSxTQUFTQyxPQUFULFFBQUEsWUFBQTtBQUNBLFNBQVNDLEtBQVQsUUFBQSxVQUxBOzs7QUFTQVIsYUFBYSxTQUFFUyxDQUFGO1dBQVMsQUFBQUEsQ0FBQSxDQUFBQyxPQUFBQyxhQUFBLENBQUEsSUFBQSxRQUE4QkYsQ0FBQSxDQUFBQyxPQUFBRSxRQUFBLENBQUEsSUFBQTtBQUF2QztBQUViaEIsT0FDRTtJQUFBaUIsYUFBYSxTQUFFQyxLQUFGO1FBQ2YsSUFBQUM7UUFBSUEsU0FBU0QsTUFBTUUsT0FBTyxDQUFDQyxLQUFLLENBQUVILE1BQU1JLEtBQVIsQ0FBQTtRQUM1QixJQUFJSCxVQUFBLE1BQUo7WUFDRUQsTUFBTUssS0FBTixDQUFZLElBQUlDLE1BQU07O2VBQ3hCTDtJQUpXO0lBTWJNLFdBQVcsZUFBRU4sTUFBRixFQUFVRCxLQUFWLEVBQWlCUSxLQUFqQjtRQUNiLElBQUFDLE1BQUFDLE9BQUFDLEdBQUFDLEtBQUFDO1FBQUlBLE1BQUFaLE9BQUFhLEtBQUE7UUFBQSxJQUFBSCxJQUFBLEdBQUFDLE1BQUFDLElBQUFFLE1BQUEsRUFBQUosSUFBQUMsS0FBQUQsSUFBQTs7WUFDRSxJQUFBO2dCQUNFLElBQUcsQUFBRSxNQUFNRixLQUFLTyxJQUFMLENBQVVoQixPQUFPUSxXQUFXLE1BQXZDO29CQUNFLE9BQU9DOztjQUNYLE9BQUFRLFFBQUE7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