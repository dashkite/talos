"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Step: function() {
        return Step;
    },
    start: function() {
        return start;
    },
    run: function() {
        return run;
    },
    build: function() {
        return build;
    },
    pipe: function() {
        return pipe;
    }
});
const _generic = require("@dashkite/joy/generic");
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _kaiko = /*#__PURE__*/ _interop_require_default(require("@dashkite/kaiko"));
const _machine = require("./machine");
const _talos = require("./talos");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
    var newObj = {};
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
var Step, build, pipe, run, start;
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
    step: function(talos, event) {
        var edge, vertex;
        console.log("new event", {
            event
        });
        vertex = Step.matchVertex(talos);
        if (talos.ended) {
            return talos;
        }
        edge = Step.matchEdge(vertex, talos, event);
        if (talos.ended) {
            return talos;
        }
        Step.run(edge, talos, event);
        if (talos.ended) {
            return talos;
        }
        Step.move(edge, talos, event);
        return talos;
    },
    generator: function*() {
        while(true){
            Step.step(this, (yield));
            if (this.ended) {
                return this;
            }
        }
    }
};
start = function(machine) {
    var talos;
    talos = _talos.Talos.make(machine);
    talos.generator = Step.generator.bind(talos);
    talos.cycle = talos.generator();
    talos.cycle.next();
    return talos;
};
run = (0, _generic.generic)({
    name: "talos: run",
    default: function(...args) {
        throw new Error(`talos run: input is malformed ${JSON.stringify(args)}`);
    }
});
(0, _generic.generic)(run, _type.isObject, function(machine) {
    var talos;
    talos = start(machine);
    return run(talos, talos.context);
});
(0, _generic.generic)(run, _talos.Talos.isType, function(talos) {
    return run(talos, talos.context);
});
(0, _generic.generic)(run, _type.isObject, _type.isAny, function(machine, context) {
    var talos;
    talos = start(machine);
    return run(talos, context);
});
(0, _generic.generic)(run, _talos.Talos.isType, _type.isAny, function(talos, context) {
    talos.context = context;
    while(true){
        talos.cycle.next(talos.context);
        console.log("event processed", talos.state, talos.context);
        if (talos.ended) {
            break;
        }
    }
    if (talos.error != null) {
        console.error(talos.error);
    }
    return talos;
});
(0, _generic.generic)(run, _type.isObject, _type.isAny, _type.isIterable, function(machine, context, events) {
    var talos;
    talos = start(machine);
    return run(talos, context, events);
});
(0, _generic.generic)(run, _talos.Talos.isType, _type.isAny, _type.isIterable, function(talos, context, events) {
    var event;
    talos.context = context;
    for (event of events){
        talos.cycle.next(event);
        console.log("event processed", talos.state, talos.context);
        if (talos.ended) {
            break;
        }
    }
    if (talos.error != null) {
        console.error(talos.error);
    }
    return talos;
});
build = function(talos) {
    return function(...args) {
        return run(talos, ...args);
    };
};
pipe = function(fx) {
    var machine;
    machine = _machine.Machine.make(fx);
    return function(context) {
        var talos;
        talos = start(machine);
        run(talos, context);
        return talos.context;
    };
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvc3luYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUE7O0FBQUEsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxHQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFHQSxJQUFBLEdBQ0U7RUFBQSxXQUFBLEVBQWEsUUFBQSxDQUFFLEtBQUYsQ0FBQTtBQUNmLFFBQUE7SUFBSSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUUsS0FBSyxDQUFDLEtBQVI7SUFDNUIsSUFBSSxjQUFKO01BQ0UsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFJLEtBQUosQ0FBVSxxQ0FBVixDQUFaLEVBREY7O1dBRUE7RUFKVyxDQUFiO0VBTUEsU0FBQSxFQUFXLFFBQUEsQ0FBRSxNQUFGLEVBQVUsS0FBVixFQUFpQixLQUFqQixDQUFBO0FBQ2IsUUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7QUFBSTtJQUFBLEtBQUEscUNBQUE7O0FBQ0U7UUFDRSxJQUFHLENBQUUsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEtBQWpCLENBQUYsQ0FBQSxLQUE4QixJQUFqQztBQUNFLGlCQUFPLEtBRFQ7U0FERjtPQUdBLGNBQUE7UUFBTTtBQUNKLGVBQU8sS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFaLEVBRFQ7O0lBSkY7V0FNQSxLQUFLLENBQUMsS0FBTixDQUFZLElBQUksS0FBSixDQUFVLDRCQUFWLENBQVo7RUFQUyxDQU5YO0VBZUEsR0FBQSxFQUFLLFFBQUEsQ0FBRSxJQUFGLEVBQVEsS0FBUixFQUFlLEtBQWYsQ0FBQTtBQUNQLFFBQUE7SUFBSSxJQUFHLGdCQUFIO0FBQ0U7ZUFDRSxJQUFJLENBQUMsR0FBTCxDQUFTLEtBQVQsRUFBZ0IsS0FBaEIsRUFERjtPQUVBLGNBQUE7UUFBTTtlQUNKLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBWixFQURGO09BSEY7O0VBREcsQ0FmTDtFQXNCQSxJQUFBLEVBQU0sUUFBQSxDQUFFLElBQUYsRUFBUSxLQUFSLEVBQWUsS0FBZixDQUFBO0FBQ1IsUUFBQTtBQUFJO2FBQ0UsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEtBQWpCLEVBREY7S0FFQSxjQUFBO01BQU07YUFDSixLQUFLLENBQUMsS0FBTixDQUFZLEtBQVosRUFERjs7RUFISSxDQXRCTjtFQTRCQSxJQUFBLEVBQU0sUUFBQSxDQUFFLEtBQUYsRUFBUyxLQUFULENBQUE7QUFDUixRQUFBLElBQUEsRUFBQTtJQUFJLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWixFQUF5QixDQUFFLEtBQUYsQ0FBekI7SUFDQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsS0FBakI7SUFDVCxJQUFnQixLQUFLLENBQUMsS0FBdEI7QUFBQSxhQUFPLE1BQVA7O0lBRUEsSUFBQSxHQUFPLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZixFQUF1QixLQUF2QixFQUE4QixLQUE5QjtJQUNQLElBQWdCLEtBQUssQ0FBQyxLQUF0QjtBQUFBLGFBQU8sTUFBUDs7SUFFQSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCLEtBQXRCO0lBQ0EsSUFBZ0IsS0FBSyxDQUFDLEtBQXRCO0FBQUEsYUFBTyxNQUFQOztJQUVBLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QixLQUF2QjtXQUNBO0VBWkksQ0E1Qk47RUEwQ0EsU0FBQSxFQUFXLFNBQUEsQ0FBQSxDQUFBO0FBQ1QsV0FBQSxJQUFBO01BQ0UsSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFWLEVBQWEsQ0FBQSxLQUFBLENBQWI7TUFDQSxJQUFZLElBQUMsQ0FBQSxLQUFiO0FBQUEsZUFBTyxLQUFQOztJQUZGO0VBRFM7QUExQ1g7O0FBZ0RGLEtBQUEsR0FBUSxRQUFBLENBQUUsT0FBRixDQUFBO0FBQ1IsTUFBQTtFQUFFLEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFXLE9BQVg7RUFDUixLQUFLLENBQUMsU0FBTixHQUFrQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsS0FBcEI7RUFDbEIsS0FBSyxDQUFDLEtBQU4sR0FBYyxLQUFLLENBQUMsU0FBTixDQUFBO0VBQ2QsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFaLENBQUE7U0FDQTtBQUxNOztBQVFSLEdBQUEsR0FBTSxPQUFBLENBQ0o7RUFBQSxJQUFBLEVBQU0sWUFBTjtFQUNBLE9BQUEsRUFBUyxRQUFBLENBQUEsR0FBRSxJQUFGLENBQUE7SUFDUCxNQUFNLElBQUksS0FBSixDQUFVLENBQUEsOEJBQUEsQ0FBQSxDQUFrQyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWYsQ0FBbEMsQ0FBQSxDQUFWO0VBREM7QUFEVCxDQURJOztBQUtOLE9BQUEsQ0FBUSxHQUFSLEVBQWEsSUFBSSxDQUFDLFFBQWxCLEVBQTRCLFFBQUEsQ0FBRSxPQUFGLENBQUE7QUFDNUIsTUFBQTtFQUFFLEtBQUEsR0FBUSxLQUFBLENBQU0sT0FBTjtTQUNSLEdBQUEsQ0FBSSxLQUFKLEVBQVcsS0FBSyxDQUFDLE9BQWpCO0FBRjBCLENBQTVCOztBQUlBLE9BQUEsQ0FBUSxHQUFSLEVBQWEsS0FBSyxDQUFDLE1BQW5CLEVBQTJCLFFBQUEsQ0FBRSxLQUFGLENBQUE7U0FDekIsR0FBQSxDQUFJLEtBQUosRUFBVyxLQUFLLENBQUMsT0FBakI7QUFEeUIsQ0FBM0I7O0FBR0EsT0FBQSxDQUFRLEdBQVIsRUFBYSxJQUFJLENBQUMsUUFBbEIsRUFBNEIsSUFBSSxDQUFDLEtBQWpDLEVBQXdDLFFBQUEsQ0FBRSxPQUFGLEVBQVcsT0FBWCxDQUFBO0FBQ3hDLE1BQUE7RUFBRSxLQUFBLEdBQVEsS0FBQSxDQUFNLE9BQU47U0FDUixHQUFBLENBQUksS0FBSixFQUFXLE9BQVg7QUFGc0MsQ0FBeEM7O0FBSUEsT0FBQSxDQUFRLEdBQVIsRUFBYSxLQUFLLENBQUMsTUFBbkIsRUFBMkIsSUFBSSxDQUFDLEtBQWhDLEVBQXVDLFFBQUEsQ0FBRSxLQUFGLEVBQVMsT0FBVCxDQUFBO0VBQ3JDLEtBQUssQ0FBQyxPQUFOLEdBQWdCO0FBQ2hCLFNBQUEsSUFBQTtJQUNFLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBWixDQUFpQixLQUFLLENBQUMsT0FBdkI7SUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLEtBQUssQ0FBQyxLQUFyQyxFQUE0QyxLQUFLLENBQUMsT0FBbEQ7SUFDQSxJQUFTLEtBQUssQ0FBQyxLQUFmO0FBQUEsWUFBQTs7RUFIRjtFQUlBLElBQUcsbUJBQUg7SUFDRSxPQUFPLENBQUMsS0FBUixDQUFjLEtBQUssQ0FBQyxLQUFwQixFQURGOztTQUVBO0FBUnFDLENBQXZDOztBQVVBLE9BQUEsQ0FBUSxHQUFSLEVBQWEsSUFBSSxDQUFDLFFBQWxCLEVBQTRCLElBQUksQ0FBQyxLQUFqQyxFQUF3QyxJQUFJLENBQUMsVUFBN0MsRUFBeUQsUUFBQSxDQUFFLE9BQUYsRUFBVyxPQUFYLEVBQW9CLE1BQXBCLENBQUE7QUFDekQsTUFBQTtFQUFFLEtBQUEsR0FBUSxLQUFBLENBQU0sT0FBTjtTQUNSLEdBQUEsQ0FBSSxLQUFKLEVBQVcsT0FBWCxFQUFvQixNQUFwQjtBQUZ1RCxDQUF6RDs7QUFJQSxPQUFBLENBQVEsR0FBUixFQUFhLEtBQUssQ0FBQyxNQUFuQixFQUEyQixJQUFJLENBQUMsS0FBaEMsRUFBdUMsSUFBSSxDQUFDLFVBQTVDLEVBQXdELFFBQUEsQ0FBRSxLQUFGLEVBQVMsT0FBVCxFQUFrQixNQUFsQixDQUFBO0FBQ3hELE1BQUE7RUFBRSxLQUFLLENBQUMsT0FBTixHQUFnQjtFQUNoQixLQUFBLGVBQUE7SUFDRSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQVosQ0FBaUIsS0FBakI7SUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLEtBQUssQ0FBQyxLQUFyQyxFQUE0QyxLQUFLLENBQUMsT0FBbEQ7SUFDQSxJQUFTLEtBQUssQ0FBQyxLQUFmO0FBQUEsWUFBQTs7RUFIRjtFQUlBLElBQUcsbUJBQUg7SUFDRSxPQUFPLENBQUMsS0FBUixDQUFjLEtBQUssQ0FBQyxLQUFwQixFQURGOztTQUVBO0FBUnNELENBQXhEOztBQVlBLEtBQUEsR0FBUSxRQUFBLENBQUUsS0FBRixDQUFBO1NBQ04sUUFBQSxDQUFBLEdBQUUsSUFBRixDQUFBO1dBQWUsR0FBQSxDQUFJLEtBQUosRUFBVyxHQUFBLElBQVg7RUFBZjtBQURNOztBQUdSLElBQUEsR0FBTyxRQUFBLENBQUUsRUFBRixDQUFBO0FBQ1AsTUFBQTtFQUFFLE9BQUEsR0FBVSxPQUFPLENBQUMsSUFBUixDQUFhLEVBQWI7U0FDVixRQUFBLENBQUUsT0FBRixDQUFBO0FBQ0YsUUFBQTtJQUFJLEtBQUEsR0FBUSxLQUFBLENBQU0sT0FBTjtJQUNSLEdBQUEsQ0FBSSxLQUFKLEVBQVcsT0FBWDtXQUNBLEtBQUssQ0FBQztFQUhSO0FBRks7O0FBUVAsT0FBQTtFQUNFLElBREY7RUFFRSxLQUZGO0VBR0UsR0FIRjtFQUlFLEtBSkY7RUFLRSxJQUxGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCBsb2cgZnJvbSBcIkBkYXNoa2l0ZS9rYWlrb1wiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyBUYWxvcyB9IGZyb20gXCIuL3RhbG9zXCJcblxuXG5TdGVwID1cbiAgbWF0Y2hWZXJ0ZXg6ICggdGFsb3MgKSAtPlxuICAgIHZlcnRleCA9IHRhbG9zLm1hY2hpbmUuZ3JhcGhbIHRhbG9zLnN0YXRlIF1cbiAgICBpZiAhdmVydGV4P1xuICAgICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwidGFsb3Mgc3RhdGUgaXMgbm90IGluIG1hY2hpbmUgZ3JhcGhcIlxuICAgIHZlcnRleFxuXG4gIG1hdGNoRWRnZTogKCB2ZXJ0ZXgsIHRhbG9zLCBldmVudCApIC0+XG4gICAgZm9yIGVkZ2UgaW4gdmVydGV4LmVkZ2VzXG4gICAgICB0cnlcbiAgICAgICAgaWYgKCBlZGdlLndoZW4gdGFsb3MsIGV2ZW50ICkgPT0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBlZGdlXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICByZXR1cm4gdGFsb3MuY2F0Y2ggZXJyb3JcbiAgICB0YWxvcy5jYXRjaCBuZXcgRXJyb3IgXCJubyBtYXRjaGluZyB3aGVuIGNvbmRpdGlvblwiXG5cbiAgcnVuOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgaWYgZWRnZS5ydW4/XG4gICAgICB0cnlcbiAgICAgICAgZWRnZS5ydW4gdGFsb3MsIGV2ZW50XG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICB0YWxvcy5jYXRjaCBlcnJvclxuXG4gIG1vdmU6ICggZWRnZSwgdGFsb3MsIGV2ZW50ICkgLT5cbiAgICB0cnlcbiAgICAgIGVkZ2UubW92ZSB0YWxvcywgZXZlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBzdGVwOiAoIHRhbG9zLCBldmVudCApIC0+XG4gICAgY29uc29sZS5sb2cgXCJuZXcgZXZlbnRcIiwgeyBldmVudCB9XG4gICAgdmVydGV4ID0gU3RlcC5tYXRjaFZlcnRleCB0YWxvc1xuICAgIHJldHVybiB0YWxvcyBpZiB0YWxvcy5lbmRlZFxuXG4gICAgZWRnZSA9IFN0ZXAubWF0Y2hFZGdlIHZlcnRleCwgdGFsb3MsIGV2ZW50XG4gICAgcmV0dXJuIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG5cbiAgICBTdGVwLnJ1biBlZGdlLCB0YWxvcywgZXZlbnRcbiAgICByZXR1cm4gdGFsb3MgaWYgdGFsb3MuZW5kZWRcblxuICAgIFN0ZXAubW92ZSBlZGdlLCB0YWxvcywgZXZlbnRcbiAgICB0YWxvc1xuXG4gIGdlbmVyYXRvcjogLT5cbiAgICBsb29wXG4gICAgICBTdGVwLnN0ZXAgQCwgeWllbGRcbiAgICAgIHJldHVybiBAIGlmIEBlbmRlZFxuXG5cbnN0YXJ0ID0gKCBtYWNoaW5lICkgLT5cbiAgdGFsb3MgPSBUYWxvcy5tYWtlIG1hY2hpbmVcbiAgdGFsb3MuZ2VuZXJhdG9yID0gU3RlcC5nZW5lcmF0b3IuYmluZCB0YWxvc1xuICB0YWxvcy5jeWNsZSA9IHRhbG9zLmdlbmVyYXRvcigpXG4gIHRhbG9zLmN5Y2xlLm5leHQoKVxuICB0YWxvc1xuXG5cbnJ1biA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidGFsb3M6IHJ1blwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcInRhbG9zIHJ1bjogaW5wdXQgaXMgbWFsZm9ybWVkICN7IEpTT04uc3RyaW5naWZ5IGFyZ3MgfVwiXG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzT2JqZWN0LCAoIG1hY2hpbmUgKSAtPlxuICB0YWxvcyA9IHN0YXJ0IG1hY2hpbmVcbiAgcnVuIHRhbG9zLCB0YWxvcy5jb250ZXh0XG5cbmdlbmVyaWMgcnVuLCBUYWxvcy5pc1R5cGUsICggdGFsb3MgKSAtPlxuICBydW4gdGFsb3MsIHRhbG9zLmNvbnRleHRcblxuZ2VuZXJpYyBydW4sIFR5cGUuaXNPYmplY3QsIFR5cGUuaXNBbnksICggbWFjaGluZSwgY29udGV4dCApIC0+XG4gIHRhbG9zID0gc3RhcnQgbWFjaGluZVxuICBydW4gdGFsb3MsIGNvbnRleHRcblxuZ2VuZXJpYyBydW4sIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0FueSwgKCB0YWxvcywgY29udGV4dCApIC0+XG4gIHRhbG9zLmNvbnRleHQgPSBjb250ZXh0XG4gIGxvb3BcbiAgICB0YWxvcy5jeWNsZS5uZXh0IHRhbG9zLmNvbnRleHRcbiAgICBjb25zb2xlLmxvZyBcImV2ZW50IHByb2Nlc3NlZFwiLCB0YWxvcy5zdGF0ZSwgdGFsb3MuY29udGV4dFxuICAgIGJyZWFrIGlmIHRhbG9zLmVuZGVkXG4gIGlmIHRhbG9zLmVycm9yP1xuICAgIGNvbnNvbGUuZXJyb3IgdGFsb3MuZXJyb3JcbiAgdGFsb3NcblxuZ2VuZXJpYyBydW4sIFR5cGUuaXNPYmplY3QsIFR5cGUuaXNBbnksIFR5cGUuaXNJdGVyYWJsZSwgKCBtYWNoaW5lLCBjb250ZXh0LCBldmVudHMgKSAtPlxuICB0YWxvcyA9IHN0YXJ0IG1hY2hpbmVcbiAgcnVuIHRhbG9zLCBjb250ZXh0LCBldmVudHNcblxuZ2VuZXJpYyBydW4sIFRhbG9zLmlzVHlwZSwgVHlwZS5pc0FueSwgVHlwZS5pc0l0ZXJhYmxlLCAoIHRhbG9zLCBjb250ZXh0LCBldmVudHMgKSAtPlxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBmb3IgZXZlbnQgZnJvbSBldmVudHNcbiAgICB0YWxvcy5jeWNsZS5uZXh0IGV2ZW50XG4gICAgY29uc29sZS5sb2cgXCJldmVudCBwcm9jZXNzZWRcIiwgdGFsb3Muc3RhdGUsIHRhbG9zLmNvbnRleHRcbiAgICBicmVhayBpZiB0YWxvcy5lbmRlZFxuICBpZiB0YWxvcy5lcnJvcj9cbiAgICBjb25zb2xlLmVycm9yIHRhbG9zLmVycm9yXG4gIHRhbG9zXG5cblxuXG5idWlsZCA9ICggdGFsb3MgKSAtPlxuICAoIGFyZ3MuLi4gKSAtPiBydW4gdGFsb3MsIGFyZ3MuLi5cblxucGlwZSA9ICggZnggKSAtPlxuICBtYWNoaW5lID0gTWFjaGluZS5tYWtlIGZ4XG4gICggY29udGV4dCApIC0+IFxuICAgIHRhbG9zID0gc3RhcnQgbWFjaGluZVxuICAgIHJ1biB0YWxvcywgY29udGV4dFxuICAgIHRhbG9zLmNvbnRleHRcblxuXG5leHBvcnQge1xuICBTdGVwICBcbiAgc3RhcnRcbiAgcnVuXG4gIGJ1aWxkXG4gIHBpcGVcbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/sync.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3N5bmMuY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgbG9nIGZyb20gXCJAZGFzaGtpdGUva2Fpa29cIlxuaW1wb3J0IHsgTWFjaGluZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuaW1wb3J0IHsgVGFsb3MgfSBmcm9tIFwiLi90YWxvc1wiXG5cblxuU3RlcCA9XG4gIG1hdGNoVmVydGV4OiAoIHRhbG9zICkgLT5cbiAgICB2ZXJ0ZXggPSB0YWxvcy5tYWNoaW5lLmdyYXBoWyB0YWxvcy5zdGF0ZSBdXG4gICAgaWYgIXZlcnRleD9cbiAgICAgIHRhbG9zLmNhdGNoIG5ldyBFcnJvciBcInRhbG9zIHN0YXRlIGlzIG5vdCBpbiBtYWNoaW5lIGdyYXBoXCJcbiAgICB2ZXJ0ZXhcblxuICBtYXRjaEVkZ2U6ICggdmVydGV4LCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGZvciBlZGdlIGluIHZlcnRleC5lZGdlc1xuICAgICAgdHJ5XG4gICAgICAgIGlmICggZWRnZS53aGVuIHRhbG9zLCBldmVudCApID09IHRydWVcbiAgICAgICAgICByZXR1cm4gZWRnZVxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgcmV0dXJuIHRhbG9zLmNhdGNoIGVycm9yXG4gICAgdGFsb3MuY2F0Y2ggbmV3IEVycm9yIFwibm8gbWF0Y2hpbmcgd2hlbiBjb25kaXRpb25cIlxuXG4gIHJ1bjogKCBlZGdlLCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGlmIGVkZ2UucnVuP1xuICAgICAgdHJ5XG4gICAgICAgIGVkZ2UucnVuIHRhbG9zLCBldmVudFxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgdGFsb3MuY2F0Y2ggZXJyb3JcblxuICBtb3ZlOiAoIGVkZ2UsIHRhbG9zLCBldmVudCApIC0+XG4gICAgdHJ5XG4gICAgICBlZGdlLm1vdmUgdGFsb3MsIGV2ZW50XG4gICAgY2F0Y2ggZXJyb3JcbiAgICAgIHRhbG9zLmNhdGNoIGVycm9yXG5cbiAgc3RlcDogKCB0YWxvcywgZXZlbnQgKSAtPlxuICAgIGNvbnNvbGUubG9nIFwibmV3IGV2ZW50XCIsIHsgZXZlbnQgfVxuICAgIHZlcnRleCA9IFN0ZXAubWF0Y2hWZXJ0ZXggdGFsb3NcbiAgICByZXR1cm4gdGFsb3MgaWYgdGFsb3MuZW5kZWRcblxuICAgIGVkZ2UgPSBTdGVwLm1hdGNoRWRnZSB2ZXJ0ZXgsIHRhbG9zLCBldmVudFxuICAgIHJldHVybiB0YWxvcyBpZiB0YWxvcy5lbmRlZFxuXG4gICAgU3RlcC5ydW4gZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgcmV0dXJuIHRhbG9zIGlmIHRhbG9zLmVuZGVkXG5cbiAgICBTdGVwLm1vdmUgZWRnZSwgdGFsb3MsIGV2ZW50XG4gICAgdGFsb3NcblxuICBnZW5lcmF0b3I6IC0+XG4gICAgbG9vcFxuICAgICAgU3RlcC5zdGVwIEAsIHlpZWxkXG4gICAgICByZXR1cm4gQCBpZiBAZW5kZWRcblxuXG5zdGFydCA9ICggbWFjaGluZSApIC0+XG4gIHRhbG9zID0gVGFsb3MubWFrZSBtYWNoaW5lXG4gIHRhbG9zLmdlbmVyYXRvciA9IFN0ZXAuZ2VuZXJhdG9yLmJpbmQgdGFsb3NcbiAgdGFsb3MuY3ljbGUgPSB0YWxvcy5nZW5lcmF0b3IoKVxuICB0YWxvcy5jeWNsZS5uZXh0KClcbiAgdGFsb3NcblxuXG5ydW4gPSBnZW5lcmljIFxuICBuYW1lOiBcInRhbG9zOiBydW5cIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJ0YWxvcyBydW46IGlucHV0IGlzIG1hbGZvcm1lZCAjeyBKU09OLnN0cmluZ2lmeSBhcmdzIH1cIlxuXG5nZW5lcmljIHJ1biwgVHlwZS5pc09iamVjdCwgKCBtYWNoaW5lICkgLT5cbiAgdGFsb3MgPSBzdGFydCBtYWNoaW5lXG4gIHJ1biB0YWxvcywgdGFsb3MuY29udGV4dFxuXG5nZW5lcmljIHJ1biwgVGFsb3MuaXNUeXBlLCAoIHRhbG9zICkgLT5cbiAgcnVuIHRhbG9zLCB0YWxvcy5jb250ZXh0XG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzT2JqZWN0LCBUeXBlLmlzQW55LCAoIG1hY2hpbmUsIGNvbnRleHQgKSAtPlxuICB0YWxvcyA9IHN0YXJ0IG1hY2hpbmVcbiAgcnVuIHRhbG9zLCBjb250ZXh0XG5cbmdlbmVyaWMgcnVuLCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNBbnksICggdGFsb3MsIGNvbnRleHQgKSAtPlxuICB0YWxvcy5jb250ZXh0ID0gY29udGV4dFxuICBsb29wXG4gICAgdGFsb3MuY3ljbGUubmV4dCB0YWxvcy5jb250ZXh0XG4gICAgY29uc29sZS5sb2cgXCJldmVudCBwcm9jZXNzZWRcIiwgdGFsb3Muc3RhdGUsIHRhbG9zLmNvbnRleHRcbiAgICBicmVhayBpZiB0YWxvcy5lbmRlZFxuICBpZiB0YWxvcy5lcnJvcj9cbiAgICBjb25zb2xlLmVycm9yIHRhbG9zLmVycm9yXG4gIHRhbG9zXG5cbmdlbmVyaWMgcnVuLCBUeXBlLmlzT2JqZWN0LCBUeXBlLmlzQW55LCBUeXBlLmlzSXRlcmFibGUsICggbWFjaGluZSwgY29udGV4dCwgZXZlbnRzICkgLT5cbiAgdGFsb3MgPSBzdGFydCBtYWNoaW5lXG4gIHJ1biB0YWxvcywgY29udGV4dCwgZXZlbnRzXG5cbmdlbmVyaWMgcnVuLCBUYWxvcy5pc1R5cGUsIFR5cGUuaXNBbnksIFR5cGUuaXNJdGVyYWJsZSwgKCB0YWxvcywgY29udGV4dCwgZXZlbnRzICkgLT5cbiAgdGFsb3MuY29udGV4dCA9IGNvbnRleHRcbiAgZm9yIGV2ZW50IGZyb20gZXZlbnRzXG4gICAgdGFsb3MuY3ljbGUubmV4dCBldmVudFxuICAgIGNvbnNvbGUubG9nIFwiZXZlbnQgcHJvY2Vzc2VkXCIsIHRhbG9zLnN0YXRlLCB0YWxvcy5jb250ZXh0XG4gICAgYnJlYWsgaWYgdGFsb3MuZW5kZWRcbiAgaWYgdGFsb3MuZXJyb3I/XG4gICAgY29uc29sZS5lcnJvciB0YWxvcy5lcnJvclxuICB0YWxvc1xuXG5cblxuYnVpbGQgPSAoIHRhbG9zICkgLT5cbiAgKCBhcmdzLi4uICkgLT4gcnVuIHRhbG9zLCBhcmdzLi4uXG5cbnBpcGUgPSAoIGZ4ICkgLT5cbiAgbWFjaGluZSA9IE1hY2hpbmUubWFrZSBmeFxuICAoIGNvbnRleHQgKSAtPiBcbiAgICB0YWxvcyA9IHN0YXJ0IG1hY2hpbmVcbiAgICBydW4gdGFsb3MsIGNvbnRleHRcbiAgICB0YWxvcy5jb250ZXh0XG5cblxuZXhwb3J0IHtcbiAgU3RlcCAgXG4gIHN0YXJ0XG4gIHJ1blxuICBidWlsZFxuICBwaXBlXG59IixudWxsXSwibmFtZXMiOlsiU3RlcCIsInN0YXJ0IiwicnVuIiwiYnVpbGQiLCJwaXBlIiwibWF0Y2hWZXJ0ZXgiLCJ0YWxvcyIsInZlcnRleCIsIm1hY2hpbmUiLCJncmFwaCIsInN0YXRlIiwiY2F0Y2giLCJFcnJvciIsIm1hdGNoRWRnZSIsImV2ZW50IiwiZWRnZSIsImVycm9yIiwiaSIsImxlbiIsInJlZiIsImVkZ2VzIiwibGVuZ3RoIiwid2hlbiIsImVycm9yMSIsIm1vdmUiLCJzdGVwIiwiY29uc29sZSIsImxvZyIsImVuZGVkIiwiZ2VuZXJhdG9yIiwiVGFsb3MiLCJtYWtlIiwiYmluZCIsImN5Y2xlIiwibmV4dCIsImdlbmVyaWMiLCJuYW1lIiwiZGVmYXVsdCIsImFyZ3MiLCJKU09OIiwic3RyaW5naWZ5IiwiVHlwZSIsImlzT2JqZWN0IiwiY29udGV4dCIsImlzVHlwZSIsImlzQW55IiwiaXNJdGVyYWJsZSIsImV2ZW50cyIsImZ4IiwiTWFjaGluZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFzSEVBLElBREY7ZUFDRUE7O0lBQ0FDLEtBRkY7ZUFFRUE7O0lBQ0FDLEdBSEY7ZUFHRUE7O0lBQ0FDLEtBSkY7ZUFJRUE7O0lBQ0FDLElBTEY7ZUFLRUE7Ozt5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