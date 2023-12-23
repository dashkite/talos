var _debug, _step, debug, matchEdge, matchVertex, move, run, step;
import * as Type from "@dashkite/joy/type";
import { negate } from "@dashkite/joy/predicate";
import { generic } from "@dashkite/joy/generic";
import { Graph, Talos } from "../containers";
import * as Errors from "../containers/errors";
matchVertex = function(graph, talos) {
    var vertex;
    vertex = graph.get(talos);
    if (vertex == null) {
        talos.throw(Errors.InvalidState.make("talos state is not in graph"));
    }
    return vertex;
};
matchEdge = async function(vertex, talos, transforms) {
    var edge, i, len, ref;
    ref = vertex.edges;
    for(i = 0, len = ref.length; i < len; i++){
        edge = ref[i];
        if (await edge.accept(talos, ...transforms) === true) {
            return edge;
        }
    }
};
run = async function(edge, talos, transforms) {
    var error;
    if (edge.run != null) {
        try {
            return await edge.run(talos, ...transforms);
        } catch (error1) {
            error = error1;
            return talos.throw(Errors.FailedRun.make(error, "encountered an error while running edge function"));
        }
    }
};
move = async function(edge, talos, transforms) {
    var error;
    try {
        return await edge.move(talos, ...transforms);
    } catch (error1) {
        error = error1;
        return talos.throw(Errors.FailedMove.make(error, "encountered an error while moving states"));
    }
};
step = generic({
    name: "step talos",
    default: function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        throw new Error(`step: input is malformed ${JSON.stringify(args)}`);
    }
});
generic(step, Graph.isType, Talos.isType, Type.isAny, function(graph, talos) {
    for(var _len = arguments.length, transforms = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
        transforms[_key - 2] = arguments[_key];
    }
    return _step(graph, talos, transforms);
});
generic(step, Graph.isType, Talos.isType, function(graph, talos) {
    return _step(graph, talos, []);
});
generic(step, Graph.isType, negate(Talos.isType), function(graph) {
    for(var _len = arguments.length, transforms = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        transforms[_key - 1] = arguments[_key];
    }
    return _step(graph, Talos.make(), transforms);
});
_step = async function(graph, talos, transforms) {
    var edge, vertex;
    vertex = matchVertex(graph, talos);
    if (talos.halted) {
        return talos;
    }
    edge = await matchEdge(vertex, talos, transforms);
    if (edge == null) {
        return talos;
    }
    if (talos.halted) {
        return talos;
    }
    await run(edge, talos, transforms);
    if (talos.halted) {
        return talos;
    }
    await move(edge, talos, transforms);
    return talos;
};
debug = generic({
    name: "debug step talos",
    default: function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        throw new Error(`debug step: input is malformed ${JSON.stringify(args)}`);
    }
});
generic(debug, Graph.isType, Talos.isType, Type.isAny, function(graph, talos) {
    for(var _len = arguments.length, transforms = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
        transforms[_key - 2] = arguments[_key];
    }
    return _debug(graph, talos, transforms);
});
generic(debug, Graph.isType, Talos.isType, function(graph, talos) {
    return _debug(graph, talos, []);
});
generic(debug, Graph.isType, negate(Talos.isType), function(graph) {
    for(var _len = arguments.length, transforms = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        transforms[_key - 1] = arguments[_key];
    }
    return _debug(graph, Talos.make(), transforms);
});
_debug = async function(graph, talos, transforms) {
    var edge, vertex;
    console.log("starting step", {
        graph,
        talos,
        transforms
    });
    vertex = matchVertex(graph, talos);
    if (talos.halted) {
        console.error("encountered error matching vertex", talos.error.error, talos);
        return talos;
    } else {
        console.log("vertex matched", {
            vertex,
            talos
        });
    }
    edge = await matchEdge(vertex, talos, transforms);
    if (edge == null) {
        console.log("no edge match, ignoring transforms");
        return talos;
    }
    if (talos.halted) {
        console.error("encountered error matching edge", talos.error.error, talos);
        return talos;
    } else {
        console.log("edge matched", {
            edge,
            talos
        });
    }
    await run(edge, talos, transforms);
    if (talos.halted) {
        console.error("encountered error running edge function", talos.error.error, talos);
        return talos;
    } else {
        console.log("edge function complete", {
            talos
        });
    }
    await move(edge, talos, transforms);
    if (talos.halted) {
        console.error("encountered error running move function", talos.error.error, talos);
        return talos;
    } else {
        console.log("talos move complete", {
            talos
        });
    }
    return talos;
};
export { step, debug, matchVertex, matchEdge, run, move }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3N0YWJsZS9hc3luYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLEtBQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsVUFBUCxNQUFBOztBQUdBLFdBQUEsR0FBYyxRQUFBLENBQUUsS0FBRixFQUFTLEtBQVQsQ0FBQTtBQUNkLE1BQUE7RUFBRSxNQUFBLEdBQVMsS0FBSyxDQUFDLEdBQU4sQ0FBVSxLQUFWO0VBQ1QsSUFBSSxjQUFKO0lBQ0UsS0FBSyxDQUFDLEtBQU4sQ0FBWSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQXBCLENBQXlCLDZCQUF6QixDQUFaLEVBREY7O1NBR0E7QUFMWTs7QUFPZCxTQUFBLEdBQVksTUFBQSxRQUFBLENBQUUsTUFBRixFQUFVLEtBQVYsRUFBaUIsVUFBakIsQ0FBQTtBQUNaLE1BQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7QUFBRTtFQUFBLEtBQUEscUNBQUE7O0lBQ0UsSUFBRyxDQUFFLENBQUEsTUFBTSxJQUFJLENBQUMsTUFBTCxDQUFZLEtBQVosRUFBbUIsR0FBQSxVQUFuQixDQUFOLENBQUYsQ0FBQSxLQUE4QyxJQUFqRDtBQUNFLGFBQU8sS0FEVDs7RUFERjtBQURVOztBQU1aLEdBQUEsR0FBTSxNQUFBLFFBQUEsQ0FBRSxJQUFGLEVBQVEsS0FBUixFQUFlLFVBQWYsQ0FBQTtBQUNOLE1BQUE7RUFBRSxJQUFHLGdCQUFIO0FBQ0U7YUFDRSxDQUFBLE1BQU0sSUFBSSxDQUFDLEdBQUws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dCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgbmVnYXRlIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvcHJlZGljYXRlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCB7IEdyYXBoLCBUYWxvcyB9IGZyb20gXCIuLi9jb250YWluZXJzXCJcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tIFwiLi4vY29udGFpbmVycy9lcnJvcnNcIlxuXG5cbm1hdGNoVmVydGV4ID0gKCBncmFwaCwgdGFsb3MgKSAtPlxuICB2ZXJ0ZXggPSBncmFwaC5nZXQgdGFsb3NcbiAgaWYgIXZlcnRleD9cbiAgICB0YWxvcy50aHJvdyBFcnJvcnMuSW52YWxpZFN0YXRlLm1ha2UgXCJ0YWxvcyBzdGF0ZSBpcyBub3RcbiAgICAgIGluIGdyYXBoXCJcbiAgdmVydGV4XG5cbm1hdGNoRWRnZSA9ICggdmVydGV4LCB0YWxvcywgdHJhbnNmb3JtcyApIC0+XG4gIGZvciBlZGdlIGluIHZlcnRleC5lZGdlc1xuICAgIGlmICggYXdhaXQgZWRnZS5hY2NlcHQgdGFsb3MsIHRyYW5zZm9ybXMuLi4gKSA9PSB0cnVlXG4gICAgICByZXR1cm4gZWRnZVxuICByZXR1cm5cblxucnVuID0gKCBlZGdlLCB0YWxvcywgdHJhbnNmb3JtcyApIC0+XG4gIGlmIGVkZ2UucnVuP1xuICAgIHRyeVxuICAgICAgYXdhaXQgZWRnZS5ydW4gdGFsb3MsIHRyYW5zZm9ybXMuLi5cbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MudGhyb3cgRXJyb3JzLkZhaWxlZFJ1bi5tYWtlIGVycm9yLCBcbiAgICAgICAgXCJlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBydW5uaW5nIGVkZ2UgZnVuY3Rpb25cIlxuXG5tb3ZlID0gKCBlZGdlLCB0YWxvcywgdHJhbnNmb3JtcyApIC0+XG4gIHRyeVxuICAgIGF3YWl0IGVkZ2UubW92ZSB0YWxvcywgdHJhbnNmb3Jtcy4uLlxuICBjYXRjaCBlcnJvclxuICAgIHRhbG9zLnRocm93IEVycm9ycy5GYWlsZWRNb3ZlLm1ha2UgZXJyb3IsIFxuICAgICAgXCJlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBtb3Zpbmcgc3RhdGVzXCJcblxuXG5zdGVwID0gZ2VuZXJpYyBcbiAgbmFtZTogXCJzdGVwIHRhbG9zXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwic3RlcDogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIHN0ZXAsIEdyYXBoLmlzVHlwZSwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzQW55LCAoIGdyYXBoLCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIF9zdGVwIGdyYXBoLCB0YWxvcywgdHJhbnNmb3Jtc1xuXG5nZW5lcmljIHN0ZXAsIEdyYXBoLmlzVHlwZSwgVGFsb3MuaXNUeXBlLCAoIGdyYXBoLCB0YWxvcyApIC0+XG4gIF9zdGVwIGdyYXBoLCB0YWxvcywgW11cblxuZ2VuZXJpYyBzdGVwLCBHcmFwaC5pc1R5cGUsICggbmVnYXRlIFRhbG9zLmlzVHlwZSApLCAoIGdyYXBoLCB0cmFuc2Zvcm1zLi4uICkgLT5cbiAgX3N0ZXAgZ3JhcGgsIFRhbG9zLm1ha2UoKSwgdHJhbnNmb3Jtc1xuXG5cbl9zdGVwID0gKCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMgKSAtPlxuICB2ZXJ0ZXggPSBtYXRjaFZlcnRleCBncmFwaCwgdGFsb3NcbiAgcmV0dXJuIHRhbG9zIGlmIHRhbG9zLmhhbHRlZFxuXG4gIGVkZ2UgPSBhd2FpdCBtYXRjaEVkZ2UgdmVydGV4LCB0YWxvcywgdHJhbnNmb3Jtc1xuICByZXR1cm4gdGFsb3MgaWYgIWVkZ2U/XG4gIHJldHVybiB0YWxvcyBpZiB0YWxvcy5oYWx0ZWRcblxuICBhd2FpdCBydW4gZWRnZSwgdGFsb3MsIHRyYW5zZm9ybXNcbiAgcmV0dXJuIHRhbG9zIGlmIHRhbG9zLmhhbHRlZFxuXG4gIGF3YWl0IG1vdmUgZWRnZSwgdGFsb3MsIHRyYW5zZm9ybXNcbiAgdGFsb3NcblxuXG5cbmRlYnVnID0gZ2VuZXJpYyBcbiAgbmFtZTogXCJkZWJ1ZyBzdGVwIHRhbG9zXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwiZGVidWcgc3RlcDogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIGRlYnVnLCBHcmFwaC5pc1R5cGUsIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0FueSwgKCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMuLi4gKSAtPlxuICBfZGVidWcgZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zXG5cbmdlbmVyaWMgZGVidWcsIEdyYXBoLmlzVHlwZSwgVGFsb3MuaXNUeXBlLCAoIGdyYXBoLCB0YWxvcyApIC0+XG4gIF9kZWJ1ZyBncmFwaCwgdGFsb3MsIFtdXG5cbmdlbmVyaWMgZGVidWcsIEdyYXBoLmlzVHlwZSwgKCBuZWdhdGUgVGFsb3MuaXNUeXBlICksICggZ3JhcGgsIHRyYW5zZm9ybXMuLi4gKSAtPlxuICBfZGVidWcgZ3JhcGgsIFRhbG9zLm1ha2UoKSwgdHJhbnNmb3Jtc1xuXG5cbl9kZWJ1ZyA9ICggZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgY29uc29sZS5sb2cgXCJzdGFydGluZyBzdGVwXCIsIHsgZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zIH1cblxuICB2ZXJ0ZXggPSBtYXRjaFZlcnRleCBncmFwaCwgdGFsb3NcbiAgaWYgdGFsb3MuaGFsdGVkXG4gICAgY29uc29sZS5lcnJvciBcImVuY291bnRlcmVkIGVycm9yIG1hdGNoaW5nIHZlcnRleFwiLCB0YWxvcy5lcnJvci5lcnJvciwgdGFsb3NcbiAgICByZXR1cm4gdGFsb3NcbiAgZWxzZVxuICAgIGNvbnNvbGUubG9nIFwidmVydGV4IG1hdGNoZWRcIiwgeyB2ZXJ0ZXgsIHRhbG9zIH1cbiAgXG4gIGVkZ2UgPSBhd2FpdCBtYXRjaEVkZ2UgdmVydGV4LCB0YWxvcywgdHJhbnNmb3Jtc1xuICBpZiAhZWRnZT9cbiAgICBjb25zb2xlLmxvZyBcIm5vIGVkZ2UgbWF0Y2gsIGlnbm9yaW5nIHRyYW5zZm9ybXNcIlxuICAgIHJldHVybiB0YWxvc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgbWF0Y2hpbmcgZWRnZVwiLCB0YWxvcy5lcnJvci5lcnJvciwgdGFsb3NcbiAgICByZXR1cm4gdGFsb3NcbiAgZWxzZVxuICAgIGNvbnNvbGUubG9nIFwiZWRnZSBtYXRjaGVkXCIsIHsgZWRnZSwgdGFsb3MgfVxuXG4gIGF3YWl0IHJ1biBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgcnVubmluZyBlZGdlIGZ1bmN0aW9uXCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJlZGdlIGZ1bmN0aW9uIGNvbXBsZXRlXCIsIHsgdGFsb3MgfVxuXG4gIGF3YWl0IG1vdmUgZWRnZSwgdGFsb3MsIHRyYW5zZm9ybXNcbiAgaWYgdGFsb3MuaGFsdGVkXG4gICAgY29uc29sZS5lcnJvciBcImVuY291bnRlcmVkIGVycm9yIHJ1bm5pbmcgbW92ZSBmdW5jdGlvblwiLCB0YWxvcy5lcnJvci5lcnJvciwgdGFsb3NcbiAgICByZXR1cm4gdGFsb3NcbiAgZWxzZVxuICAgIGNvbnNvbGUubG9nIFwidGFsb3MgbW92ZSBjb21wbGV0ZVwiLCB7IHRhbG9zIH1cblxuICB0YWxvc1xuXG5cblxuZXhwb3J0IHtcbiAgc3RlcFxuICBkZWJ1Z1xuXG4gIG1hdGNoVmVydGV4XG4gIG1hdGNoRWRnZSBcbiAgcnVuXG4gIG1vdmVcbn0iXX0=
 //# sourceURL=src/stable/async.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdGFibGUvYXN5bmMuY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBuZWdhdGUgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9wcmVkaWNhdGVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0IHsgR3JhcGgsIFRhbG9zIH0gZnJvbSBcIi4uL2NvbnRhaW5lcnNcIlxuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gXCIuLi9jb250YWluZXJzL2Vycm9yc1wiXG5cblxubWF0Y2hWZXJ0ZXggPSAoIGdyYXBoLCB0YWxvcyApIC0+XG4gIHZlcnRleCA9IGdyYXBoLmdldCB0YWxvc1xuICBpZiAhdmVydGV4P1xuICAgIHRhbG9zLnRocm93IEVycm9ycy5JbnZhbGlkU3RhdGUubWFrZSBcInRhbG9zIHN0YXRlIGlzIG5vdFxuICAgICAgaW4gZ3JhcGhcIlxuICB2ZXJ0ZXhcblxubWF0Y2hFZGdlID0gKCB2ZXJ0ZXgsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgaWYgKCBhd2FpdCBlZGdlLmFjY2VwdCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApID09IHRydWVcbiAgICAgIHJldHVybiBlZGdlXG4gIHJldHVyblxuXG5ydW4gPSAoIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgaWYgZWRnZS5ydW4/XG4gICAgdHJ5XG4gICAgICBhd2FpdCBlZGdlLnJ1biB0YWxvcywgdHJhbnNmb3Jtcy4uLlxuICAgIGNhdGNoIGVycm9yXG4gICAgICB0YWxvcy50aHJvdyBFcnJvcnMuRmFpbGVkUnVuLm1ha2UgZXJyb3IsIFxuICAgICAgICBcImVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIHJ1bm5pbmcgZWRnZSBmdW5jdGlvblwiXG5cbm1vdmUgPSAoIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zICkgLT5cbiAgdHJ5XG4gICAgYXdhaXQgZWRnZS5tb3ZlIHRhbG9zLCB0cmFuc2Zvcm1zLi4uXG4gIGNhdGNoIGVycm9yXG4gICAgdGFsb3MudGhyb3cgRXJyb3JzLkZhaWxlZE1vdmUubWFrZSBlcnJvciwgXG4gICAgICBcImVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIG1vdmluZyBzdGF0ZXNcIlxuXG5cbnN0ZXAgPSBnZW5lcmljIFxuICBuYW1lOiBcInN0ZXAgdGFsb3NcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJzdGVwOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgc3RlcCwgR3JhcGguaXNUeXBlLCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNBbnksICggZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zLi4uICkgLT5cbiAgX3N0ZXAgZ3JhcGgsIHRhbG9zLCB0cmFuc2Zvcm1zXG5cbmdlbmVyaWMgc3RlcCwgR3JhcGguaXNUeXBlLCBUYWxvcy5pc1R5cGUsICggZ3JhcGgsIHRhbG9zICkgLT5cbiAgX3N0ZXAgZ3JhcGgsIHRhbG9zLCBbXVxuXG5nZW5lcmljIHN0ZXAsIEdyYXBoLmlzVHlwZSwgKCBuZWdhdGUgVGFsb3MuaXNUeXBlICksICggZ3JhcGgsIHRyYW5zZm9ybXMuLi4gKSAtPlxuICBfc3RlcCBncmFwaCwgVGFsb3MubWFrZSgpLCB0cmFuc2Zvcm1zXG5cblxuX3N0ZXAgPSAoIGdyYXBoLCB0YWxvcywgdHJhbnNmb3JtcyApIC0+XG4gIHZlcnRleCA9IG1hdGNoVmVydGV4IGdyYXBoLCB0YWxvc1xuICByZXR1cm4gdGFsb3MgaWYgdGFsb3MuaGFsdGVkXG5cbiAgZWRnZSA9IGF3YWl0IG1hdGNoRWRnZSB2ZXJ0ZXgsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIHJldHVybiB0YWxvcyBpZiAhZWRnZT9cbiAgcmV0dXJuIHRhbG9zIGlmIHRhbG9zLmhhbHRlZFxuXG4gIGF3YWl0IHJ1biBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICByZXR1cm4gdGFsb3MgaWYgdGFsb3MuaGFsdGVkXG5cbiAgYXdhaXQgbW92ZSBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICB0YWxvc1xuXG5cblxuZGVidWcgPSBnZW5lcmljIFxuICBuYW1lOiBcImRlYnVnIHN0ZXAgdGFsb3NcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJkZWJ1ZyBzdGVwOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgZGVidWcsIEdyYXBoLmlzVHlwZSwgVGFsb3MuaXNUeXBlLCBUeXBlLmlzQW55LCAoIGdyYXBoLCB0YWxvcywgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIF9kZWJ1ZyBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXNcblxuZ2VuZXJpYyBkZWJ1ZywgR3JhcGguaXNUeXBlLCBUYWxvcy5pc1R5cGUsICggZ3JhcGgsIHRhbG9zICkgLT5cbiAgX2RlYnVnIGdyYXBoLCB0YWxvcywgW11cblxuZ2VuZXJpYyBkZWJ1ZywgR3JhcGguaXNUeXBlLCAoIG5lZ2F0ZSBUYWxvcy5pc1R5cGUgKSwgKCBncmFwaCwgdHJhbnNmb3Jtcy4uLiApIC0+XG4gIF9kZWJ1ZyBncmFwaCwgVGFsb3MubWFrZSgpLCB0cmFuc2Zvcm1zXG5cblxuX2RlYnVnID0gKCBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMgKSAtPlxuICBjb25zb2xlLmxvZyBcInN0YXJ0aW5nIHN0ZXBcIiwgeyBncmFwaCwgdGFsb3MsIHRyYW5zZm9ybXMgfVxuXG4gIHZlcnRleCA9IG1hdGNoVmVydGV4IGdyYXBoLCB0YWxvc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgbWF0Y2hpbmcgdmVydGV4XCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJ2ZXJ0ZXggbWF0Y2hlZFwiLCB7IHZlcnRleCwgdGFsb3MgfVxuICBcbiAgZWRnZSA9IGF3YWl0IG1hdGNoRWRnZSB2ZXJ0ZXgsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIGlmICFlZGdlP1xuICAgIGNvbnNvbGUubG9nIFwibm8gZWRnZSBtYXRjaCwgaWdub3JpbmcgdHJhbnNmb3Jtc1wiXG4gICAgcmV0dXJuIHRhbG9zXG4gIGlmIHRhbG9zLmhhbHRlZFxuICAgIGNvbnNvbGUuZXJyb3IgXCJlbmNvdW50ZXJlZCBlcnJvciBtYXRjaGluZyBlZGdlXCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJlZGdlIG1hdGNoZWRcIiwgeyBlZGdlLCB0YWxvcyB9XG5cbiAgYXdhaXQgcnVuIGVkZ2UsIHRhbG9zLCB0cmFuc2Zvcm1zXG4gIGlmIHRhbG9zLmhhbHRlZFxuICAgIGNvbnNvbGUuZXJyb3IgXCJlbmNvdW50ZXJlZCBlcnJvciBydW5uaW5nIGVkZ2UgZnVuY3Rpb25cIiwgdGFsb3MuZXJyb3IuZXJyb3IsIHRhbG9zXG4gICAgcmV0dXJuIHRhbG9zXG4gIGVsc2VcbiAgICBjb25zb2xlLmxvZyBcImVkZ2UgZnVuY3Rpb24gY29tcGxldGVcIiwgeyB0YWxvcyB9XG5cbiAgYXdhaXQgbW92ZSBlZGdlLCB0YWxvcywgdHJhbnNmb3Jtc1xuICBpZiB0YWxvcy5oYWx0ZWRcbiAgICBjb25zb2xlLmVycm9yIFwiZW5jb3VudGVyZWQgZXJyb3IgcnVubmluZyBtb3ZlIGZ1bmN0aW9uXCIsIHRhbG9zLmVycm9yLmVycm9yLCB0YWxvc1xuICAgIHJldHVybiB0YWxvc1xuICBlbHNlXG4gICAgY29uc29sZS5sb2cgXCJ0YWxvcyBtb3ZlIGNvbXBsZXRlXCIsIHsgdGFsb3MgfVxuXG4gIHRhbG9zXG5cblxuXG5leHBvcnQge1xuICBzdGVwXG4gIGRlYnVnXG5cbiAgbWF0Y2hWZXJ0ZXhcbiAgbWF0Y2hFZGdlIFxuICBydW5cbiAgbW92ZVxufSJdLCJuYW1lcyI6WyJfZGVidWciLCJfc3RlcCIsImRlYnVnIiwibWF0Y2hFZGdlIiwibWF0Y2hWZXJ0ZXgiLCJtb3ZlIiwicnVuIiwic3RlcCIsIlR5cGUiLCJuZWdhdGUiLCJnZW5lcmljIiwiR3JhcGgiLCJUYWxvcyIsIkVycm9ycyIsImdyYXBoIiwidGFsb3MiLCJ2ZXJ0ZXgiLCJnZXQiLCJ0aHJvdyIsIkludmFsaWRTdGF0ZSIsIm1ha2UiLCJ0cmFuc2Zvcm1zIiwiZWRnZSIsImkiLCJsZW4iLCJyZWYiLCJlZGdlcyIsImxlbmd0aCIsImFjY2VwdCIsImVycm9yIiwiZXJyb3IxIiwiRmFpbGVkUnVuIiwiRmFpbGVkTW92ZSIsIm5hbWUiLCJkZWZhdWx0IiwiYXJncyIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzVHlwZSIsImlzQW55IiwiaGFsdGVkIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQUEsUUFBQUMsT0FBQUMsT0FBQUMsV0FBQUMsYUFBQUMsTUFBQUMsS0FBQUM7QUFBQSxZQUFPQyxVQUFQLHFCQUFBO0FBQ0EsU0FBU0MsTUFBVCxRQUFBLDBCQUFBO0FBQ0EsU0FBU0MsT0FBVCxRQUFBLHdCQUFBO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsS0FBaEIsUUFBQSxnQkFBQTtBQUNBLFlBQU9DLFlBQVAsdUJBQUE7QUFHQVQsY0FBYyxTQUFFVSxLQUFGLEVBQVNDLEtBQVQ7SUFDZCxJQUFBQztJQUFFQSxTQUFTRixNQUFNRyxHQUFOLENBQVVGO0lBQ25CLElBQUlDLFVBQUEsTUFBSjtRQUNFRCxNQUFNRyxLQUFOLENBQVlMLE9BQU9NLFlBQVksQ0FBQ0MsSUFBcEIsQ0FBeUI7O1dBRXZDSjtBQUxZO0FBT2RiLFlBQVksZUFBRWEsTUFBRixFQUFVRCxLQUFWLEVBQWlCTSxVQUFqQjtJQUNaLElBQUFDLE1BQUFDLEdBQUFDLEtBQUFDO0lBQUVBLE1BQUFULE9BQUFVLEtBQUE7SUFBQSxJQUFBSCxJQUFBLEdBQUFDLE1BQUFDLElBQUFFLE1BQUEsRUFBQUosSUFBQUMsS0FBQUQsSUFBQTs7UUFDRSxJQUFHLEFBQUUsTUFBTUQsS0FBS00sTUFBTCxDQUFZYixVQUFPTSxnQkFBbUIsTUFBakQ7WUFDRSxPQUFPQzs7SUFGWDtBQURVO0FBTVpoQixNQUFNLGVBQUVnQixJQUFGLEVBQVFQLEtBQVIsRUFBZU0sVUFBZjtJQUNOLElBQUFRO0lBQUUsSUFBR1AsS0FBQWhCLEdBQUEsSUFBQSxNQUFIO1FBQ0UsSUFBQTttQkFDRSxNQUFNZ0IsS0FBS2hCLEdBQUwsQ0FBU1MsVUFBT007VUFDeEIsT0FBQVMsUUFBQTtZQUFNRCxRQUFBQzttQkFDSmYsTUFBTUcsS0FBTixDQUFZTCxPQUFPa0IsU0FBUyxDQUFDWCxJQUFqQixDQUFzQlMsT0FDaEM7OztBQU5GO0FBUU54QixPQUFPLGVBQUVpQixJQUFGLEVBQVFQLEtBQVIsRUFBZU0sVUFBZjtJQUNQLElBQUFRO0lBQUUsSUFBQTtlQUNFLE1BQU1QLEtBQUtqQixJQUFMLENBQVVVLFVBQU9NO01BQ3pCLE9BQUFTLFFBQUE7UUFBTUQsUUFBQUM7ZUFDSmYsTUFBTUcsS0FBTixDQUFZTCxPQUFPbUIsVUFBVSxDQUFDWixJQUFsQixDQUF1QlMsT0FDakM7O0FBTEM7QUFRUHRCLE9BQU9HLFFBQ0w7SUFBQXVCLE1BQU07SUFDTkMsU0FBUztRQUFBLElBQUEsSUFBQSxPQUFBLFVBQUEsUUFBQSxBQUFFQyxPQUFGLFVBQUEsT0FBQSxPQUFBLEdBQUEsT0FBQSxNQUFBLE9BQUE7WUFBRUEsS0FBRixRQUFBLFNBQUEsQ0FBQSxLQUFBO1FBQUU7UUFDVCxNQUFNLElBQUlDLE1BQU0sQ0FBQSx5QkFBQSxFQUE0QkMsS0FBS0MsU0FBTCxDQUFlSCxNQUEzQyxDQUFWO0lBREM7QUFEVDtBQUlGekIsUUFBUUgsTUFBTUksTUFBTTRCLE1BQXBCLEVBQTRCM0IsTUFBTTJCLE1BQWxDLEVBQTBDL0IsS0FBS2dDLEtBQS9DLEVBQXNELFNBQUUxQixLQUFGLEVBQVNDLEtBQVQ7SUFBQSxJQUFBLElBQUEsT0FBQSxVQUFBLFFBQUEsQUFBZ0JNLGFBQWhCLFVBQUEsT0FBQSxJQUFBLE9BQUEsUUFBQSxPQUFBLEdBQUEsT0FBQSxNQUFBLE9BQUE7UUFBZ0JBLFdBQWhCLE9BQUEsS0FBQSxTQUFBLENBQUEsS0FBQTtJQUFnQjtXQUNwRXBCLE1BQU1hLE9BQU9DLE9BQU9NO0FBRGdDO0FBR3REWCxRQUFRSCxNQUFNSSxNQUFNNEIsTUFBcEIsRUFBNEIzQixNQUFNMkIsTUFBbEMsRUFBMEMsU0FBRXpCLEtBQUYsRUFBU0MsS0FBVDtXQUN4Q2QsTUFBTWEsT0FBT0MsT0FBTyxFQUFwQjtBQUR3QztBQUcxQ0wsUUFBUUgsTUFBTUksTUFBTTRCLE1BQXBCLEVBQThCOUIsT0FBT0csTUFBTTJCLE1BQWIsR0FBdUIsU0FBRXpCLEtBQUY7SUFBQSxJQUFBLElBQUEsT0FBQSxVQUFBLFFBQUEsQUFBU08sYUFBVCxVQUFBLE9BQUEsSUFBQSxPQUFBLFFBQUEsT0FBQSxHQUFBLE9BQUEsTUFBQSxPQUFBO1FBQVNBLFdBQVQsT0FBQSxLQUFBLFNBQUEsQ0FBQSxLQUFBO0lBQVM7V0FDNURwQixNQUFNYSxPQUFPRixNQUFNUSxJQUFOLElBQWNDO0FBRHdCO0FBSXJEcEIsUUFBUSxlQUFFYSxLQUFGLEVBQVNDLEtBQVQsRUFBZ0JNLFVBQWhCO0lBQ1IsSUFBQUMsTUFBQU47SUFBRUEsU0FBU1osWUFBWVUsT0FBT0M7SUFDNUIsSUFBZ0JBLE1BQU0wQixNQUF0QixFQUFBO1FBQUEsT0FBTzFCOztJQUVQTyxPQUFPLE1BQU1uQixVQUFVYSxRQUFRRCxPQUFPTTtJQUN0QyxJQUFpQkMsUUFBQSxNQUFqQjtRQUFBLE9BQU9QOztJQUNQLElBQWdCQSxNQUFNMEIsTUFBdEIsRUFBQTtRQUFBLE9BQU8xQjs7SUFFUCxNQUFNVCxJQUFJZ0IsTUFBTVAsT0FBT007SUFDdkIsSUFBZ0JOLE1BQU0wQixNQUF0QixFQUFBO1FBQUEsT0FBTzFCOztJQUVQLE1BQU1WLEtBQUtpQixNQUFNUCxPQUFPTTtXQUN4Qk47QUFaTTtBQWdCUmIsUUFBUVEsUUFDTjtJQUFBdUIsTUFBTTtJQUNOQyxTQUFTO1FBQUEsSUFBQSxJQUFBLE9BQUEsVUFBQSxRQUFBLEFBQUVDLE9BQUYsVUFBQSxPQUFBLE9BQUEsR0FBQSxPQUFBLE1BQUEsT0FBQTtZQUFFQSxLQUFGLFFBQUEsU0FBQSxDQUFBLEtBQUE7UUFBRTtRQUNULE1BQU0sSUFBSUMsTUFBTSxDQUFBLCtCQUFBLEVBQWtDQyxLQUFLQyxTQUFMLENBQWVILE1BQWpELENBQVY7SUFEQztBQURUO0FBSUZ6QixRQUFRUixPQUFPUyxNQUFNNEIsTUFBckIsRUFBNkIzQixNQUFNMkIsTUFBbkMsRUFBMkMvQixLQUFLZ0MsS0FBaEQsRUFBdUQsU0FBRTFCLEtBQUYsRUFBU0MsS0FBVDtJQUFBLElBQUEsSUFBQSxPQUFBLFVBQUEsUUFBQSxBQUFnQk0sYUFBaEIsVUFBQSxPQUFBLElBQUEsT0FBQSxRQUFBLE9BQUEsR0FBQSxPQUFBLE1BQUEsT0FBQTtRQUFnQkEsV0FBaEIsT0FBQSxLQUFBLFNBQUEsQ0FBQSxLQUFBO0lBQWdCO1dBQ3JFckIsT0FBT2MsT0FBT0MsT0FBT007QUFEZ0M7QUFHdkRYLFFBQVFSLE9BQU9TLE1BQU00QixNQUFyQixFQUE2QjNCLE1BQU0yQixNQUFuQyxFQUEyQyxTQUFFekIsS0FBRixFQUFTQyxLQUFUO1dBQ3pDZixPQUFPYyxPQUFPQyxPQUFPLEVBQXJCO0FBRHlDO0FBRzNDTCxRQUFRUixPQUFPUyxNQUFNNEIsTUFBckIsRUFBK0I5QixPQUFPRyxNQUFNMkIsTUFBYixHQUF1QixTQUFFekIsS0FBRjtJQUFBLElBQUEsSUFBQSxPQUFBLFVBQUEsUUFBQSxBQUFTTyxhQUFULFVBQUEsT0FBQSxJQUFBLE9BQUEsUUFBQSxPQUFBLEdBQUEsT0FBQSxNQUFBLE9BQUE7UUFBU0EsV0FBVCxPQUFBLEtBQUEsU0FBQSxDQUFBLEtBQUE7SUFBUztXQUM3RHJCLE9BQU9jLE9BQU9GLE1BQU1RLElBQU4sSUFBY0M7QUFEd0I7QUFJdERyQixTQUFTLGVBQUVjLEtBQUYsRUFBU0MsS0FBVCxFQUFnQk0sVUFBaEI7SUFDVCxJQUFBQyxNQUFBTjtJQUFFMEIsUUFBUUMsR0FBUixDQUFZLGlCQUFpQjtRQUFFN0I7UUFBT0M7UUFBT007SUFBaEI7SUFFN0JMLFNBQVNaLFlBQVlVLE9BQU9DO0lBQzVCLElBQUdBLE1BQU0wQixNQUFULEVBQUE7UUFDRUMsUUFBUWIsS0FBUixDQUFjLHFDQUFxQ2QsTUFBTWMsS0FBSyxDQUFDQSxLQUEvRCxFQUFzRWQ7UUFDdEUsT0FBT0E7V0FGVDtRQUlFMkIsUUFBUUMsR0FBUixDQUFZLGtCQUFrQjtZQUFFM0I7WUFBUUQ7UUFBVjs7SUFFaENPLE9BQU8sTUFBTW5CLFVBQVVhLFFBQVFELE9BQU9NO0lBQ3RDLElBQUlDLFFBQUEsTUFBSjtRQUNFb0IsUUFBUUMsR0FBUixDQUFZO1FBQ1osT0FBTzVCOztJQUNULElBQUdBLE1BQU0wQixNQUFULEVBQUE7UUFDRUMsUUFBUWIsS0FBUixDQUFjLG1DQUFtQ2QsTUFBTWMsS0FBSyxDQUFDQSxLQUE3RCxFQUFvRWQ7UUFDcEUsT0FBT0E7V0FGVDtRQUlFMkIsUUFBUUMsR0FBUixDQUFZLGdCQUFnQjtZQUFFckI7WUFBTVA7UUFBUjs7SUFFOUIsTUFBTVQsSUFBSWdCLE1BQU1QLE9BQU9NO0lBQ3ZCLElBQUdOLE1BQU0wQixNQUFULEVBQUE7UUFDRUMsUUFBUWIsS0FBUixDQUFjLDJDQUEyQ2QsTUFBTWMsS0FBSyxDQUFDQSxLQUFyRSxFQUE0RWQ7UUFDNUUsT0FBT0E7V0FGVDtRQUlFMkIsUUFBUUMsR0FBUixDQUFZLDBCQUEwQjtZQUFFNUI7UUFBRjs7SUFFeEMsTUFBTVYsS0FBS2lCLE1BQU1QLE9BQU9NO0lBQ3hCLElBQUdOLE1BQU0wQixNQUFULEVBQUE7UUFDRUMsUUFBUWIsS0FBUixDQUFjLDJDQUEyQ2QsTUFBTWMsS0FBSyxDQUFDQSxLQUFyRSxFQUE0RWQ7UUFDNUUsT0FBT0E7V0FGVDtRQUlFMkIsUUFBUUMsR0FBUixDQUFZLHVCQUF1QjtZQUFFNUI7UUFBRjs7V0FFckNBO0FBbENPO0FBc0NULFNBQ0VSLElBREYsRUFFRUwsS0FGRixFQUlFRSxXQUpGLEVBS0VELFNBTEYsRUFNRUcsR0FORixFQU9FRCxJQVBGIn0=