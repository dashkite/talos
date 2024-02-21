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
    Edge: function() {
        return Edge;
    },
    Edges: function() {
        return Edges;
    },
    Machine: function() {
        return Machine;
    },
    Vertex: function() {
        return Vertex;
    }
});
const _generic = require("@dashkite/joy/generic");
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _states = require("./states");
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
    var newObj = {
        __proto__: null
    };
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
var Edge, Edges, Graph, Machine, Vertex, areVertexEdges, isEdgeShorthand, isFunctionArray, isMachineDescription, isNamedFunctionArray, isState, normalizeMove, normalizeWhen, prioritize, indexOf = [].indexOf;
isState = function(x) {
    return _type.isString(x) || _type.isSymbol(x);
};
areVertexEdges = function(x) {
    var edge, j, len, ref;
    if (x.edges == null) {
        return false;
    }
    if (!_type.isArray(x.edges)) {
        return false;
    }
    ref = x.edges;
    for(j = 0, len = ref.length; j < len; j++){
        edge = ref[j];
        if (!_type.isObject(edge)) {
            return false;
        }
    }
    return true;
};
normalizeWhen = function(x) {
    if (isState(x)) {
        return function(talos, event) {
            return event === condition;
        };
    } else if (_type.isFunction(x)) {
        return x;
    } else if (_type.isBoolean(x)) {
        return function() {
            return x;
        };
    } else {
        throw new Error("unable to normalize when description");
    }
};
normalizeMove = function(x) {
    if (isState(x)) {
        return function(talos, event) {
            return talos.state = x;
        };
    } else if (_type.isFunction(x)) {
        return x;
    } else {
        throw new Error("unable to normalize move description");
    }
};
prioritize = function(frames) {
    return frames.sort(function(a, b) {
        if (a.priority < b.priority) {
            return -1;
        } else if (a.priority > b.priority) {
            return 1;
        } else {
            return 0;
        }
    });
};
Edge = {
    make: (0, _generic.generic)({
        name: "talos: edge make"
    })
};
(0, _generic.generic)(Edge.make, _type.isObject, function(object) {
    return {
        when: normalizeWhen(object.when),
        run: object.run,
        move: normalizeMove(object.move)
    };
});
(0, _generic.generic)(Edge.make, isState, _type.isAny, function(move, _when) {
    return Edge.make({
        move,
        when: _when
    });
});
(0, _generic.generic)(Edge.make, isState, _type.isObject, function(move, object) {
    var ref, ref1;
    return {
        when: normalizeWhen((ref = object.when) != null ? ref : true),
        run: object.run,
        move: normalizeMove((ref1 = object.move) != null ? ref1 : move)
    };
});
isEdgeShorthand = function(value) {
    var allowed, j, key, len, ref;
    if (!_type.isObject(value)) {
        return false;
    }
    allowed = [
        "when",
        "run",
        "move"
    ];
    ref = Reflect.ownKeys(value);
    for(j = 0, len = ref.length; j < len; j++){
        key = ref[j];
        if (indexOf.call(allowed, key) < 0) {
            return false;
        }
    }
    return true;
};
Edges = {
    make: (0, _generic.generic)({
        name: "talos: edges make"
    })
};
(0, _generic.generic)(Edges.make, _type.isObject, function(object) {
    var defaultFrame, edges, frames, j, k, key, len, len1, priority, ref, ref1, value;
    frames = [];
    defaultFrame = null;
    ref = Reflect.ownKeys(object);
    for(j = 0, len = ref.length; j < len; j++){
        key = ref[j];
        value = object[key];
        priority = (ref1 = value.priority) != null ? ref1 : 100;
        if (key === "default") {
            defaultFrame = {
                key,
                value
            };
        } else {
            if (key === "end") {
                key = _states.$end;
            }
            frames.push({
                key,
                value,
                priority
            });
        }
    }
    prioritize(frames);
    edges = [];
    for(k = 0, len1 = frames.length; k < len1; k++){
        ({ key, value } = frames[k]);
        edges.push(Edge.make(key, value));
    }
    if (defaultFrame != null) {
        // default is a special case emphasizing an always true "when" function.
        ({ value } = defaultFrame);
        if (_type.isObject(value)) {
            edges.push(Edge.make({
                ...value,
                when: true
            }));
        } else {
            edges.push(Edge.make({
                when: true,
                move: value
            }));
        }
    }
    return edges;
});
(0, _generic.generic)(Edges.make, isEdgeShorthand, function(short) {
    var ref, ref1;
    return Edges.make({
        short: {
            when: (ref = short.when) != null ? ref : true,
            run: short.run,
            move: (ref1 = short.move) != null ? ref1 : _states.$end
        }
    });
});
(0, _generic.generic)(Edges.make, _type.isArray, function(array) {
    var edge, j, len, results;
    results = [];
    for(j = 0, len = array.length; j < len; j++){
        edge = array[j];
        results.push(Edge.make(edge));
    }
    return results;
});
(0, _generic.generic)(Edges.make, _type.isFunction, function(f) {
    var edge;
    edge = {
        when: true,
        run: f,
        move: _states.$end
    };
    return [
        Edge.make(edge)
    ];
});
(0, _generic.generic)(Edges.make, isState, function(move) {
    return Edges.make({
        [move]: true
    });
});
(0, _generic.generic)(Edges.make, areVertexEdges, function({ edges }) {
    var edge, j, len, results;
    results = [];
    for(j = 0, len = edges.length; j < len; j++){
        edge = edges[j];
        results.push({
            when: edge.when,
            run: edge.run,
            move: edge.move
        });
    }
    return results;
});
Vertex = {
    make: function(key, value) {
        return {
            name: key,
            edges: Edges.make(value)
        };
    }
};
Graph = {
    fromObject: function(object) {
        var graph, j, key, len, ref;
        if (object[_states.$start] == null) {
            if (object.start != null) {
                object[_states.$start] = object.start;
                delete object.start;
            } else {
                throw new Error("no start state defined for this machine");
            }
        }
        if (object[_states.$end] == null) {
            if (object.end != null) {
                object[_states.$end] = object.end;
                delete object.end;
            }
        }
        graph = {};
        ref = Reflect.ownKeys(object);
        for(j = 0, len = ref.length; j < len; j++){
            key = ref[j];
            graph[key] = Vertex.make(key, object[key]);
        }
        return graph;
    },
    fromFunctionArray: function(fx) {
        var f, getName, graph, i, j, len, name, names, previous;
        if (fx.length === 0) {
            return {
                start: {
                    move: _states.$end
                }
            };
        }
        names = {};
        getName = function(f) {
            var name;
            name = f.name || "anonymous";
            if (names[name] != null) {
                return `${name}-${++names[name]}`;
            } else {
                names[name] = 1;
                return name;
            }
        };
        graph = {
            start: {}
        };
        previous = "start";
        for(i = j = 0, len = fx.length; j < len; i = ++j){
            f = fx[i];
            name = getName(f);
            graph[name] = {
                run: f
            };
            graph[previous].move = name;
            previous = name;
        }
        graph[previous].move = _states.$end;
        return graph;
    },
    fromNamedFunctionArray: function(array) {
        var f, graph, i, j, k, len, len1, name, pair, pairs, previous;
        if (array.length === 0) {
            return {
                start: {
                    move: _states.$end
                }
            };
        }
        pairs = [];
        for(i = j = 0, len = array.length; j < len; i = j += 2){
            name = array[i];
            pairs.push([
                name,
                array[i + 1]
            ]);
        }
        graph = {
            start: {}
        };
        previous = "start";
        for(k = 0, len1 = pairs.length; k < len1; k++){
            pair = pairs[k];
            name = pair[0];
            f = pair[1];
            graph[name] = {
                run: f
            };
            graph[previous].move = name;
            previous = name;
        }
        graph[previous].move = _states.$end;
        return graph;
    }
};
isMachineDescription = function(value) {
    return _type.isObject(value) && _type.isObject(value.graph);
};
isFunctionArray = function(value) {
    var item, j, len;
    if (!_type.isArray(value)) {
        return false;
    }
    for(j = 0, len = value.length; j < len; j++){
        item = value[j];
        if (!_type.isFunction(item)) {
            return false;
        }
    }
    return true;
};
isNamedFunctionArray = function(value) {
    var index, item, j, len;
    if (!_type.isArray(value)) {
        return false;
    }
    for(index = j = 0, len = value.length; j < len; index = ++j){
        item = value[index];
        if (index % 2 === 0) {
            if (!_type.isString(item)) {
                return false;
            }
        } else {
            if (!_type.isFunction(item)) {
                return false;
            }
        }
    }
    return true;
};
Machine = {
    make: (0, _generic.generic)({
        name: "talos: machine make"
    })
};
(0, _generic.generic)(Machine.make, _type.isObject, function(graph) {
    return Machine.make({
        graph
    });
});
(0, _generic.generic)(Machine.make, _type.isString, _type.isObject, function(name, graph) {
    return Machine.make({
        name,
        graph
    });
});
(0, _generic.generic)(Machine.make, isMachineDescription, function(machine) {
    var ref;
    return {
        name: (ref = machine.name) != null ? ref : "anonymous",
        graph: Graph.fromObject(machine.graph)
    };
});
(0, _generic.generic)(Machine.make, _type.isString, isMachineDescription, function(name, machine) {
    return Machine.make({
        name,
        graph: machine.graph
    });
});
(0, _generic.generic)(Machine.make, isNamedFunctionArray, function(ax) {
    return Machine.make({
        graph: Graph.fromNamedFunctionArray(ax)
    });
});
(0, _generic.generic)(Machine.make, isFunctionArray, function(fx) {
    return Machine.make({
        graph: Graph.fromFunctionArray(fx)
    });
});
(0, _generic.generic)(Machine.make, _type.isString, isNamedFunctionArray, function(name, ax) {
    return Machine.make({
        name,
        graph: Graph.fromNamedFunctionArray(ax)
    });
});
(0, _generic.generic)(Machine.make, _type.isString, isFunctionArray, function(name, fx) {
    return Machine.make({
        name,
        graph: Graph.fromFunctionArray(fx)
    });
});
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvbWFjaGluZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLGNBQUEsRUFBQSxlQUFBLEVBQUEsZUFBQSxFQUFBLG9CQUFBLEVBQUEsb0JBQUEsRUFBQSxPQUFBLEVBQUEsYUFBQSxFQUFBLGFBQUEsRUFBQSxVQUFBO0VBQUE7O0FBQUEsT0FBQTtFQUFTLE9BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7RUFBaUIsSUFBakI7Q0FBQSxNQUFBOztBQUVBLE9BQUEsR0FBVSxRQUFBLENBQUUsQ0FBRixDQUFBO1NBQVMsQ0FBRSxJQUFJLENBQUMsUUFBTCxDQUFjLENBQWQsQ0FBRixDQUFBLElBQXVCLENBQUUsSUFBSSxDQUFDLFFBQUwsQ0FBYyxDQUFkLENBQUY7QUFBaEM7O0FBQ1YsY0FBQSxHQUFpQixRQUFBLENBQUUsQ0FBRixDQUFBO0FBQ2pCLE1BQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7RUFBRSxJQUFpQixlQUFqQjtBQUFBLFdBQU8sTUFBUDs7RUFDQSxJQUFnQixDQUFDLElBQUksQ0FBQyxPQUFMLENBQWEsQ0FBQyxDQUFDLEtBQWYsQ0FBakI7QUFBQSxXQUFPLE1BQVA7O0FBQ0E7RUFBQSxLQUFBLHFDQUFBOztRQUF5QixDQUFDLElBQUksQ0FBQyxRQUFMLENBQWMsSUFBZDtBQUN4QixhQUFPOztFQURUO1NBRUE7QUFMZTs7QUFRakIsYUFBQSxHQUFnQixRQUFBLENBQUUsQ0FBRixDQUFBO0VBQ2QsSUFBRyxPQUFBLENBQVEsQ0FBUixDQUFIO1dBQ0UsUUFBQSxDQUFFLEtBQUYsRUFBUyxLQUFULENBQUE7YUFBb0IsS0FBQSxLQUFTO0lBQTdCLEVBREY7R0FBQSxNQUVL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ZW5lcmljXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyAkc3RhcnQsICRlbmQgfSBmcm9tIFwiLi9zdGF0ZXNcIlxuXG5pc1N0YXRlID0gKCB4ICkgLT4gKCBUeXBlLmlzU3RyaW5nIHggKSB8fCAoIFR5cGUuaXNTeW1ib2wgeCApXG5hcmVWZXJ0ZXhFZGdlcyA9ICggeCApIC0+XG4gIHJldHVybiBmYWxzZSBpZiAheC5lZGdlcz9cbiAgcmV0dXJuIGZhbHNlIGlmICFUeXBlLmlzQXJyYXkgeC5lZGdlc1xuICBmb3IgZWRnZSBpbiB4LmVkZ2VzIHdoZW4gIVR5cGUuaXNPYmplY3QgZWRnZVxuICAgIHJldHVybiBmYWxzZVxuICB0cnVlXG5cblxubm9ybWFsaXplV2hlbiA9ICggeCApIC0+XG4gIGlmIGlzU3RhdGUgeFxuICAgICggdGFsb3MsIGV2ZW50ICkgLT4gZXZlbnQgPT0gY29uZGl0aW9uXG4gIGVsc2UgaWYgVHlwZS5pc0Z1bmN0aW9uIHhcbiAgICB4XG4gIGVsc2UgaWYgVHlwZS5pc0Jvb2xlYW4geFxuICAgIC0+IHhcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvciBcInVuYWJsZSB0byBub3JtYWxpemUgd2hlbiBkZXNjcmlwdGlvblwiXG5cbm5vcm1hbGl6ZU1vdmUgPSAoIHggKSAtPlxuICBpZiBpc1N0YXRlIHhcbiAgICAoIHRhbG9zLCBldmVudCApIC0+IHRhbG9zLnN0YXRlID0geFxuICBlbHNlIGlmIFR5cGUuaXNGdW5jdGlvbiB4XG4gICAgeFxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yIFwidW5hYmxlIHRvIG5vcm1hbGl6ZSBtb3ZlIGRlc2NyaXB0aW9uXCJcblxucHJpb3JpdGl6ZSA9ICggZnJhbWVzICkgLT5cbiAgZnJhbWVzLnNvcnQgKCBhLCBiICkgLT4gXG4gICAgaWYgYS5wcmlvcml0eSA8IGIucHJpb3JpdHlcbiAgICAgIC0xXG4gICAgZWxzZSBpZiBhLnByaW9yaXR5ID4gYi5wcmlvcml0eVxuICAgICAgMVxuICAgIGVsc2VcbiAgICAgIDBcblxuXG5FZGdlID1cbiAgbWFrZTogZ2VuZXJpYyBuYW1lOiBcInRhbG9zOiBlZGdlIG1ha2VcIlxuXG5nZW5lcmljIEVkZ2UubWFrZSwgVHlwZS5pc09iamVjdCwgKCBvYmplY3QgKSAtPlxuICB3aGVuOiBub3JtYWxpemVXaGVuIG9iamVjdC53aGVuXG4gIHJ1bjogb2JqZWN0LnJ1blxuICBtb3ZlOiBub3JtYWxpemVNb3ZlIG9iamVjdC5tb3ZlXG5cbmdlbmVyaWMgRWRnZS5tYWtlLCBpc1N0YXRlLCBUeXBlLmlzQW55LCAoIG1vdmUsIF93aGVuICkgLT5cbiAgRWRnZS5tYWtlIHsgbW92ZSwgd2hlbjogX3doZW4gfVxuXG5nZW5lcmljIEVkZ2UubWFrZSwgaXNTdGF0ZSwgVHlwZS5pc09iamVjdCwgKCBtb3ZlLCBvYmplY3QgKSAtPlxuICB3aGVuOiBub3JtYWxpemVXaGVuIG9iamVjdC53aGVuID8gdHJ1ZVxuICBydW46IG9iamVjdC5ydW5cbiAgbW92ZTogbm9ybWFsaXplTW92ZSBvYmplY3QubW92ZSA/IG1vdmVcblxuXG5pc0VkZ2VTaG9ydGhhbmQgPSAoIHZhbHVlICkgLT5cbiAgaWYgIVR5cGUuaXNPYmplY3QgdmFsdWVcbiAgICByZXR1cm4gZmFsc2VcbiAgYWxsb3dlZCA9IFsgXCJ3aGVuXCIsIFwicnVuXCIsIFwibW92ZVwiIF1cbiAgZm9yIGtleSBpbiAoUmVmbGVjdC5vd25LZXlzIHZhbHVlKSB3aGVuIGtleSBub3QgaW4gYWxsb3dlZFxuICAgIHJldHVybiBmYWxzZVxuICB0cnVlXG5cblxuRWRnZXMgPSBcbiAgbWFrZTogZ2VuZXJpYyBuYW1lOiBcInRhbG9zOiBlZGdlcyBtYWtlXCJcblxuZ2VuZXJpYyBFZGdlcy5tYWtlLCBUeXBlLmlzT2JqZWN0LCAoIG9iamVjdCApIC0+XG4gIGZyYW1lcyA9IFtdXG4gIGRlZmF1bHRGcmFtZSA9IG51bGxcbiAgZm9yIGtleSBpbiBSZWZsZWN0Lm93bktleXMgb2JqZWN0XG4gICAgdmFsdWUgPSBvYmplY3RbIGtleSBdXG4gICAgcHJpb3JpdHkgPSB2YWx1ZS5wcmlvcml0eSA/IDEwMFxuICAgIGlmIGtleSA9PSBcImRlZmF1bHRcIlxuICAgICAgZGVmYXVsdEZyYW1lID0geyBrZXksIHZhbHVlIH1cbiAgICBlbHNlXG4gICAgICBrZXkgPSAkZW5kIGlmIGtleSA9PSBcImVuZFwiXG4gICAgICBmcmFtZXMucHVzaCB7IGtleSwgdmFsdWUsIHByaW9yaXR5IH1cblxuICBwcmlvcml0aXplIGZyYW1lc1xuXG4gIGVkZ2VzID0gW11cbiAgZm9yIHsga2V5LCB2YWx1ZSB9IGluIGZyYW1lc1xuICAgIGVkZ2VzLnB1c2ggRWRnZS5tYWtlIGtleSwgdmFsdWVcblxuICBpZiBkZWZhdWx0RnJhbWU/XG4gICAgIyBkZWZhdWx0IGlzIGEgc3BlY2lhbCBjYXNlIGVtcGhhc2l6aW5nIGFuIGFsd2F5cyB0cnVlIFwid2hlblwiIGZ1bmN0aW9uLlxuICAgIHsgdmFsdWUgfSA9IGRlZmF1bHRGcmFtZVxuICAgIGlmIFR5cGUuaXNPYmplY3QgdmFsdWVcbiAgICAgIGVkZ2VzLnB1c2ggRWRnZS5tYWtlIHsgdmFsdWUuLi4sIHdoZW46IHRydWUgfVxuICAgIGVsc2VcbiAgICAgIGVkZ2VzLnB1c2ggRWRnZS5tYWtlIHdoZW46IHRydWUsIG1vdmU6IHZhbHVlXG4gIFxuICBlZGdlc1xuICBcblxuZ2VuZXJpYyBFZGdlcy5tYWtlLCBpc0VkZ2VTaG9ydGhhbmQsICggc2hvcnQgKSAtPlxuICBFZGdlcy5tYWtlXG4gICAgc2hvcnQ6XG4gICAgICB3aGVuOiBzaG9ydC53aGVuID8gdHJ1ZVxuICAgICAgcnVuOiBzaG9ydC5ydW5cbiAgICAgIG1vdmU6IHNob3J0Lm1vdmUgPyAkZW5kXG5cbmdlbmVyaWMgRWRnZXMubWFrZSwgVHlwZS5pc0FycmF5LCAoIGFycmF5ICkgLT5cbiAgZm9yIGVkZ2UgaW4gYXJyYXlcbiAgICBFZGdlLm1ha2UgZWRnZVxuXG5nZW5lcmljIEVkZ2VzLm1ha2UsIFR5cGUuaXNGdW5jdGlvbiwgKCBmICkgLT5cbiAgZWRnZSA9IHdoZW46IHRydWUsIHJ1bjogZiwgbW92ZTogJGVuZFxuICBbIEVkZ2UubWFrZSBlZGdlIF1cblxuZ2VuZXJpYyBFZGdlcy5tYWtlLCBpc1N0YXRlLCAoIG1vdmUgKSAtPlxuICBFZGdlcy5tYWtlIFsgbW92ZSBdOiB0cnVlXG5cbmdlbmVyaWMgRWRnZXMubWFrZSwgYXJlVmVydGV4RWRnZXMsICh7IGVkZ2VzIH0pIC0+XG4gIGZvciBlZGdlIGluIGVkZ2VzXG4gICAgd2hlbjogZWRnZS53aGVuXG4gICAgcnVuOiBlZGdlLnJ1blxuICAgIG1vdmU6IGVkZ2UubW92ZVxuXG5cblZlcnRleCA9XG4gIG1ha2U6ICgga2V5LCB2YWx1ZSApIC0+XG4gICAgbmFtZToga2V5XG4gICAgZWRnZXM6IEVkZ2VzLm1ha2UgdmFsdWVcblxuXG5HcmFwaCA9XG4gIGZyb21PYmplY3Q6ICggb2JqZWN0ICkgLT5cbiAgICBpZiAhb2JqZWN0WyAkc3RhcnQgXT9cbiAgICAgIGlmIG9iamVjdC5zdGFydD9cbiAgICAgICAgb2JqZWN0WyAkc3RhcnQgXSA9IG9iamVjdC5zdGFydFxuICAgICAgICBkZWxldGUgb2JqZWN0LnN0YXJ0XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvciBcIm5vIHN0YXJ0IHN0YXRlIGRlZmluZWQgZm9yIHRoaXMgbWFjaGluZVwiXG5cbiAgICBpZiAhb2JqZWN0WyAkZW5kIF0/XG4gICAgICBpZiBvYmplY3QuZW5kP1xuICAgICAgICBvYmplY3RbICRlbmQgXSA9IG9iamVjdC5lbmRcbiAgICAgICAgZGVsZXRlIG9iamVjdC5lbmRcblxuICAgIGdyYXBoID0ge31cbiAgICBmb3Iga2V5IGluIFJlZmxlY3Qub3duS2V5cyBvYmplY3RcbiAgICAgIGdyYXBoWyBrZXkgXSA9IFZlcnRleC5tYWtlIGtleSwgb2JqZWN0WyBrZXkgXVxuICAgIGdyYXBoXG5cbiAgZnJvbUZ1bmN0aW9uQXJyYXk6ICggZnggKSAtPiBcbiAgICBpZiBmeC5sZW5ndGggPT0gMFxuICAgICAgcmV0dXJuIHN0YXJ0OiBtb3ZlOiAkZW5kIFxuXG4gICAgbmFtZXMgPSB7fVxuICAgIGdldE5hbWUgPSAoIGYgKSAtPlxuICAgICAgbmFtZSA9IGYubmFtZSB8fCBcImFub255bW91c1wiXG4gICAgICBpZiBuYW1lc1sgbmFtZSBdP1xuICAgICAgICBcIiN7IG5hbWUgfS0jeyArK25hbWVzWyBuYW1lIF0gfVwiXG4gICAgICBlbHNlXG4gICAgICAgIG5hbWVzWyBuYW1lIF0gPSAxXG4gICAgICAgIG5hbWVcblxuICAgIGdyYXBoID0gc3RhcnQ6IHt9XG4gICAgcHJldmlvdXMgPSBcInN0YXJ0XCJcbiAgICBmb3IgZiwgaSBpbiBmeFxuICAgICAgbmFtZSA9IGdldE5hbWUgZlxuICAgICAgZ3JhcGhbIG5hbWUgXSA9IHJ1bjogZlxuICAgICAgZ3JhcGhbIHByZXZpb3VzIF0ubW92ZSA9IG5hbWVcbiAgICAgIHByZXZpb3VzID0gbmFtZVxuICAgIFxuICAgIGdyYXBoWyBwcmV2aW91cyBdLm1vdmUgPSAkZW5kXG4gICAgZ3JhcGhcbiAgXG4gIGZyb21OYW1lZEZ1bmN0aW9uQXJyYXk6ICggYXJyYXkgKSAtPiAgIFxuICAgIGlmIGFycmF5Lmxlbmd0aCA9PSAwXG4gICAgICByZXR1cm4gc3RhcnQ6IG1vdmU6ICRlbmRcbiAgICBcbiAgICBwYWlycyA9IFtdXG4gICAgZm9yIG5hbWUsIGkgaW4gYXJyYXkgYnkgMlxuICAgICAgcGFpcnMucHVzaCBbIG5hbWUsIGFycmF5W2kgKyAxXSBdXG5cbiAgICBncmFwaCA9IHN0YXJ0OiB7fVxuICAgIHByZXZpb3VzID0gXCJzdGFydFwiXG4gICAgZm9yIHBhaXIgaW4gcGFpcnNcbiAgICAgIG5hbWUgPSBwYWlyWyAwIF1cbiAgICAgIGYgPSBwYWlyWyAxIF1cbiAgICAgIGdyYXBoWyBuYW1lIF0gPSBydW46IGZcbiAgICAgIGdyYXBoWyBwcmV2aW91cyBdLm1vdmUgPSBuYW1lXG4gICAgICBwcmV2aW91cyA9IG5hbWVcbiAgICBcbiAgICBncmFwaFsgcHJldmlvdXMgXS5tb3ZlID0gJGVuZFxuICAgIGdyYXBoXG5cblxuaXNNYWNoaW5lRGVzY3JpcHRpb24gPSAoIHZhbHVlICkgLT5cbiAgKFR5cGUuaXNPYmplY3QgdmFsdWUpICYmIFxuICAgIChUeXBlLmlzT2JqZWN0IHZhbHVlLmdyYXBoKVxuXG5pc0Z1bmN0aW9uQXJyYXkgPSAoIHZhbHVlICkgLT5cbiAgaWYgIVR5cGUuaXNBcnJheSB2YWx1ZVxuICAgIHJldHVybiBmYWxzZVxuICBmb3IgaXRlbSBpbiB2YWx1ZSB3aGVuICFUeXBlLmlzRnVuY3Rpb24gaXRlbVxuICAgIHJldHVybiBmYWxzZVxuICB0cnVlXG5cbmlzTmFtZWRGdW5jdGlvbkFycmF5ID0gKCB2YWx1ZSApIC0+XG4gIGlmICFUeXBlLmlzQXJyYXkgdmFsdWVcbiAgICByZXR1cm4gZmFsc2VcbiAgZm9yIGl0ZW0sIGluZGV4IGluIHZhbHVlXG4gICAgaWYgaW5kZXggJSAyID09IDBcbiAgICAgIHJldHVybiBmYWxzZSBpZiAhVHlwZS5pc1N0cmluZyBpdGVtXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGZhbHNlIGlmICFUeXBlLmlzRnVuY3Rpb24gaXRlbVxuICB0cnVlXG5cbk1hY2hpbmUgPVxuICBtYWtlOiBnZW5lcmljIG5hbWU6IFwidGFsb3M6IG1hY2hpbmUgbWFrZVwiXG5cbmdlbmVyaWMgTWFjaGluZS5tYWtlLCBUeXBlLmlzT2JqZWN0LCAoIGdyYXBoICkgLT5cbiAgTWFjaGluZS5tYWtlIHsgZ3JhcGggfVxuXG5nZW5lcmljIE1hY2hpbmUubWFrZSwgVHlwZS5pc1N0cmluZywgVHlwZS5pc09iamVjdCwgKCBuYW1lLCBncmFwaCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IG5hbWUsIGdyYXBoIH1cblxuZ2VuZXJpYyBNYWNoaW5lLm1ha2UsIGlzTWFjaGluZURlc2NyaXB0aW9uLCAoIG1hY2hpbmUgKSAtPlxuICBuYW1lOiBtYWNoaW5lLm5hbWUgPyBcImFub255bW91c1wiXG4gIGdyYXBoOiBHcmFwaC5mcm9tT2JqZWN0IG1hY2hpbmUuZ3JhcGhcblxuZ2VuZXJpYyBNYWNoaW5lLm1ha2UsIFR5cGUuaXNTdHJpbmcsIGlzTWFjaGluZURlc2NyaXB0aW9uLCAoIG5hbWUsIG1hY2hpbmUgKSAtPlxuICBNYWNoaW5lLm1ha2UgeyBuYW1lLCBncmFwaDogbWFjaGluZS5ncmFwaCB9XG5cbmdlbmVyaWMgTWFjaGluZS5tYWtlLCBpc05hbWVkRnVuY3Rpb25BcnJheSwgKCBheCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IGdyYXBoOiBHcmFwaC5mcm9tTmFtZWRGdW5jdGlvbkFycmF5IGF4IH1cblxuZ2VuZXJpYyBNYWNoaW5lLm1ha2UsIGlzRnVuY3Rpb25BcnJheSwgKCBmeCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IGdyYXBoOiBHcmFwaC5mcm9tRnVuY3Rpb25BcnJheSBmeCB9XG5cbmdlbmVyaWMgTWFjaGluZS5tYWtlLCBUeXBlLmlzU3RyaW5nLCBpc05hbWVkRnVuY3Rpb25BcnJheSwgKCBuYW1lLCBheCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IG5hbWUsIGdyYXBoOiBHcmFwaC5mcm9tTmFtZWRGdW5jdGlvbkFycmF5IGF4IH1cblxuZ2VuZXJpYyBNYWNoaW5lLm1ha2UsIFR5cGUuaXNTdHJpbmcsIGlzRnVuY3Rpb25BcnJheSwgKCBuYW1lLCBmeCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IG5hbWUsIGdyYXBoOiBHcmFwaC5mcm9tRnVuY3Rpb25BcnJheSBmeCB9XG5cblxuZXhwb3J0IHsgTWFjaGluZSwgVmVydGV4LCBFZGdlcywgRWRnZSB9Il19
 //# sourceURL=/@dashkite/talos/src/machine.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL21hY2hpbmUuY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyAkc3RhcnQsICRlbmQgfSBmcm9tIFwiLi9zdGF0ZXNcIlxuXG5pc1N0YXRlID0gKCB4ICkgLT4gKCBUeXBlLmlzU3RyaW5nIHggKSB8fCAoIFR5cGUuaXNTeW1ib2wgeCApXG5hcmVWZXJ0ZXhFZGdlcyA9ICggeCApIC0+XG4gIHJldHVybiBmYWxzZSBpZiAheC5lZGdlcz9cbiAgcmV0dXJuIGZhbHNlIGlmICFUeXBlLmlzQXJyYXkgeC5lZGdlc1xuICBmb3IgZWRnZSBpbiB4LmVkZ2VzIHdoZW4gIVR5cGUuaXNPYmplY3QgZWRnZVxuICAgIHJldHVybiBmYWxzZVxuICB0cnVlXG5cblxubm9ybWFsaXplV2hlbiA9ICggeCApIC0+XG4gIGlmIGlzU3RhdGUgeFxuICAgICggdGFsb3MsIGV2ZW50ICkgLT4gZXZlbnQgPT0gY29uZGl0aW9uXG4gIGVsc2UgaWYgVHlwZS5pc0Z1bmN0aW9uIHhcbiAgICB4XG4gIGVsc2UgaWYgVHlwZS5pc0Jvb2xlYW4geFxuICAgIC0+IHhcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvciBcInVuYWJsZSB0byBub3JtYWxpemUgd2hlbiBkZXNjcmlwdGlvblwiXG5cbm5vcm1hbGl6ZU1vdmUgPSAoIHggKSAtPlxuICBpZiBpc1N0YXRlIHhcbiAgICAoIHRhbG9zLCBldmVudCApIC0+IHRhbG9zLnN0YXRlID0geFxuICBlbHNlIGlmIFR5cGUuaXNGdW5jdGlvbiB4XG4gICAgeFxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yIFwidW5hYmxlIHRvIG5vcm1hbGl6ZSBtb3ZlIGRlc2NyaXB0aW9uXCJcblxucHJpb3JpdGl6ZSA9ICggZnJhbWVzICkgLT5cbiAgZnJhbWVzLnNvcnQgKCBhLCBiICkgLT4gXG4gICAgaWYgYS5wcmlvcml0eSA8IGIucHJpb3JpdHlcbiAgICAgIC0xXG4gICAgZWxzZSBpZiBhLnByaW9yaXR5ID4gYi5wcmlvcml0eVxuICAgICAgMVxuICAgIGVsc2VcbiAgICAgIDBcblxuXG5FZGdlID1cbiAgbWFrZTogZ2VuZXJpYyBuYW1lOiBcInRhbG9zOiBlZGdlIG1ha2VcIlxuXG5nZW5lcmljIEVkZ2UubWFrZSwgVHlwZS5pc09iamVjdCwgKCBvYmplY3QgKSAtPlxuICB3aGVuOiBub3JtYWxpemVXaGVuIG9iamVjdC53aGVuXG4gIHJ1bjogb2JqZWN0LnJ1blxuICBtb3ZlOiBub3JtYWxpemVNb3ZlIG9iamVjdC5tb3ZlXG5cbmdlbmVyaWMgRWRnZS5tYWtlLCBpc1N0YXRlLCBUeXBlLmlzQW55LCAoIG1vdmUsIF93aGVuICkgLT5cbiAgRWRnZS5tYWtlIHsgbW92ZSwgd2hlbjogX3doZW4gfVxuXG5nZW5lcmljIEVkZ2UubWFrZSwgaXNTdGF0ZSwgVHlwZS5pc09iamVjdCwgKCBtb3ZlLCBvYmplY3QgKSAtPlxuICB3aGVuOiBub3JtYWxpemVXaGVuIG9iamVjdC53aGVuID8gdHJ1ZVxuICBydW46IG9iamVjdC5ydW5cbiAgbW92ZTogbm9ybWFsaXplTW92ZSBvYmplY3QubW92ZSA/IG1vdmVcblxuXG5pc0VkZ2VTaG9ydGhhbmQgPSAoIHZhbHVlICkgLT5cbiAgaWYgIVR5cGUuaXNPYmplY3QgdmFsdWVcbiAgICByZXR1cm4gZmFsc2VcbiAgYWxsb3dlZCA9IFsgXCJ3aGVuXCIsIFwicnVuXCIsIFwibW92ZVwiIF1cbiAgZm9yIGtleSBpbiAoUmVmbGVjdC5vd25LZXlzIHZhbHVlKSB3aGVuIGtleSBub3QgaW4gYWxsb3dlZFxuICAgIHJldHVybiBmYWxzZVxuICB0cnVlXG5cblxuRWRnZXMgPSBcbiAgbWFrZTogZ2VuZXJpYyBuYW1lOiBcInRhbG9zOiBlZGdlcyBtYWtlXCJcblxuZ2VuZXJpYyBFZGdlcy5tYWtlLCBUeXBlLmlzT2JqZWN0LCAoIG9iamVjdCApIC0+XG4gIGZyYW1lcyA9IFtdXG4gIGRlZmF1bHRGcmFtZSA9IG51bGxcbiAgZm9yIGtleSBpbiBSZWZsZWN0Lm93bktleXMgb2JqZWN0XG4gICAgdmFsdWUgPSBvYmplY3RbIGtleSBdXG4gICAgcHJpb3JpdHkgPSB2YWx1ZS5wcmlvcml0eSA/IDEwMFxuICAgIGlmIGtleSA9PSBcImRlZmF1bHRcIlxuICAgICAgZGVmYXVsdEZyYW1lID0geyBrZXksIHZhbHVlIH1cbiAgICBlbHNlXG4gICAgICBrZXkgPSAkZW5kIGlmIGtleSA9PSBcImVuZFwiXG4gICAgICBmcmFtZXMucHVzaCB7IGtleSwgdmFsdWUsIHByaW9yaXR5IH1cblxuICBwcmlvcml0aXplIGZyYW1lc1xuXG4gIGVkZ2VzID0gW11cbiAgZm9yIHsga2V5LCB2YWx1ZSB9IGluIGZyYW1lc1xuICAgIGVkZ2VzLnB1c2ggRWRnZS5tYWtlIGtleSwgdmFsdWVcblxuICBpZiBkZWZhdWx0RnJhbWU/XG4gICAgIyBkZWZhdWx0IGlzIGEgc3BlY2lhbCBjYXNlIGVtcGhhc2l6aW5nIGFuIGFsd2F5cyB0cnVlIFwid2hlblwiIGZ1bmN0aW9uLlxuICAgIHsgdmFsdWUgfSA9IGRlZmF1bHRGcmFtZVxuICAgIGlmIFR5cGUuaXNPYmplY3QgdmFsdWVcbiAgICAgIGVkZ2VzLnB1c2ggRWRnZS5tYWtlIHsgdmFsdWUuLi4sIHdoZW46IHRydWUgfVxuICAgIGVsc2VcbiAgICAgIGVkZ2VzLnB1c2ggRWRnZS5tYWtlIHdoZW46IHRydWUsIG1vdmU6IHZhbHVlXG4gIFxuICBlZGdlc1xuICBcblxuZ2VuZXJpYyBFZGdlcy5tYWtlLCBpc0VkZ2VTaG9ydGhhbmQsICggc2hvcnQgKSAtPlxuICBFZGdlcy5tYWtlXG4gICAgc2hvcnQ6XG4gICAgICB3aGVuOiBzaG9ydC53aGVuID8gdHJ1ZVxuICAgICAgcnVuOiBzaG9ydC5ydW5cbiAgICAgIG1vdmU6IHNob3J0Lm1vdmUgPyAkZW5kXG5cbmdlbmVyaWMgRWRnZXMubWFrZSwgVHlwZS5pc0FycmF5LCAoIGFycmF5ICkgLT5cbiAgZm9yIGVkZ2UgaW4gYXJyYXlcbiAgICBFZGdlLm1ha2UgZWRnZVxuXG5nZW5lcmljIEVkZ2VzLm1ha2UsIFR5cGUuaXNGdW5jdGlvbiwgKCBmICkgLT5cbiAgZWRnZSA9IHdoZW46IHRydWUsIHJ1bjogZiwgbW92ZTogJGVuZFxuICBbIEVkZ2UubWFrZSBlZGdlIF1cblxuZ2VuZXJpYyBFZGdlcy5tYWtlLCBpc1N0YXRlLCAoIG1vdmUgKSAtPlxuICBFZGdlcy5tYWtlIFsgbW92ZSBdOiB0cnVlXG5cbmdlbmVyaWMgRWRnZXMubWFrZSwgYXJlVmVydGV4RWRnZXMsICh7IGVkZ2VzIH0pIC0+XG4gIGZvciBlZGdlIGluIGVkZ2VzXG4gICAgd2hlbjogZWRnZS53aGVuXG4gICAgcnVuOiBlZGdlLnJ1blxuICAgIG1vdmU6IGVkZ2UubW92ZVxuXG5cblZlcnRleCA9XG4gIG1ha2U6ICgga2V5LCB2YWx1ZSApIC0+XG4gICAgbmFtZToga2V5XG4gICAgZWRnZXM6IEVkZ2VzLm1ha2UgdmFsdWVcblxuXG5HcmFwaCA9XG4gIGZyb21PYmplY3Q6ICggb2JqZWN0ICkgLT5cbiAgICBpZiAhb2JqZWN0WyAkc3RhcnQgXT9cbiAgICAgIGlmIG9iamVjdC5zdGFydD9cbiAgICAgICAgb2JqZWN0WyAkc3RhcnQgXSA9IG9iamVjdC5zdGFydFxuICAgICAgICBkZWxldGUgb2JqZWN0LnN0YXJ0XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvciBcIm5vIHN0YXJ0IHN0YXRlIGRlZmluZWQgZm9yIHRoaXMgbWFjaGluZVwiXG5cbiAgICBpZiAhb2JqZWN0WyAkZW5kIF0/XG4gICAgICBpZiBvYmplY3QuZW5kP1xuICAgICAgICBvYmplY3RbICRlbmQgXSA9IG9iamVjdC5lbmRcbiAgICAgICAgZGVsZXRlIG9iamVjdC5lbmRcblxuICAgIGdyYXBoID0ge31cbiAgICBmb3Iga2V5IGluIFJlZmxlY3Qub3duS2V5cyBvYmplY3RcbiAgICAgIGdyYXBoWyBrZXkgXSA9IFZlcnRleC5tYWtlIGtleSwgb2JqZWN0WyBrZXkgXVxuICAgIGdyYXBoXG5cbiAgZnJvbUZ1bmN0aW9uQXJyYXk6ICggZnggKSAtPiBcbiAgICBpZiBmeC5sZW5ndGggPT0gMFxuICAgICAgcmV0dXJuIHN0YXJ0OiBtb3ZlOiAkZW5kIFxuXG4gICAgbmFtZXMgPSB7fVxuICAgIGdldE5hbWUgPSAoIGYgKSAtPlxuICAgICAgbmFtZSA9IGYubmFtZSB8fCBcImFub255bW91c1wiXG4gICAgICBpZiBuYW1lc1sgbmFtZSBdP1xuICAgICAgICBcIiN7IG5hbWUgfS0jeyArK25hbWVzWyBuYW1lIF0gfVwiXG4gICAgICBlbHNlXG4gICAgICAgIG5hbWVzWyBuYW1lIF0gPSAxXG4gICAgICAgIG5hbWVcblxuICAgIGdyYXBoID0gc3RhcnQ6IHt9XG4gICAgcHJldmlvdXMgPSBcInN0YXJ0XCJcbiAgICBmb3IgZiwgaSBpbiBmeFxuICAgICAgbmFtZSA9IGdldE5hbWUgZlxuICAgICAgZ3JhcGhbIG5hbWUgXSA9IHJ1bjogZlxuICAgICAgZ3JhcGhbIHByZXZpb3VzIF0ubW92ZSA9IG5hbWVcbiAgICAgIHByZXZpb3VzID0gbmFtZVxuICAgIFxuICAgIGdyYXBoWyBwcmV2aW91cyBdLm1vdmUgPSAkZW5kXG4gICAgZ3JhcGhcbiAgXG4gIGZyb21OYW1lZEZ1bmN0aW9uQXJyYXk6ICggYXJyYXkgKSAtPiAgIFxuICAgIGlmIGFycmF5Lmxlbmd0aCA9PSAwXG4gICAgICByZXR1cm4gc3RhcnQ6IG1vdmU6ICRlbmRcbiAgICBcbiAgICBwYWlycyA9IFtdXG4gICAgZm9yIG5hbWUsIGkgaW4gYXJyYXkgYnkgMlxuICAgICAgcGFpcnMucHVzaCBbIG5hbWUsIGFycmF5W2kgKyAxXSBdXG5cbiAgICBncmFwaCA9IHN0YXJ0OiB7fVxuICAgIHByZXZpb3VzID0gXCJzdGFydFwiXG4gICAgZm9yIHBhaXIgaW4gcGFpcnNcbiAgICAgIG5hbWUgPSBwYWlyWyAwIF1cbiAgICAgIGYgPSBwYWlyWyAxIF1cbiAgICAgIGdyYXBoWyBuYW1lIF0gPSBydW46IGZcbiAgICAgIGdyYXBoWyBwcmV2aW91cyBdLm1vdmUgPSBuYW1lXG4gICAgICBwcmV2aW91cyA9IG5hbWVcbiAgICBcbiAgICBncmFwaFsgcHJldmlvdXMgXS5tb3ZlID0gJGVuZFxuICAgIGdyYXBoXG5cblxuaXNNYWNoaW5lRGVzY3JpcHRpb24gPSAoIHZhbHVlICkgLT5cbiAgKFR5cGUuaXNPYmplY3QgdmFsdWUpICYmIFxuICAgIChUeXBlLmlzT2JqZWN0IHZhbHVlLmdyYXBoKVxuXG5pc0Z1bmN0aW9uQXJyYXkgPSAoIHZhbHVlICkgLT5cbiAgaWYgIVR5cGUuaXNBcnJheSB2YWx1ZVxuICAgIHJldHVybiBmYWxzZVxuICBmb3IgaXRlbSBpbiB2YWx1ZSB3aGVuICFUeXBlLmlzRnVuY3Rpb24gaXRlbVxuICAgIHJldHVybiBmYWxzZVxuICB0cnVlXG5cbmlzTmFtZWRGdW5jdGlvbkFycmF5ID0gKCB2YWx1ZSApIC0+XG4gIGlmICFUeXBlLmlzQXJyYXkgdmFsdWVcbiAgICByZXR1cm4gZmFsc2VcbiAgZm9yIGl0ZW0sIGluZGV4IGluIHZhbHVlXG4gICAgaWYgaW5kZXggJSAyID09IDBcbiAgICAgIHJldHVybiBmYWxzZSBpZiAhVHlwZS5pc1N0cmluZyBpdGVtXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGZhbHNlIGlmICFUeXBlLmlzRnVuY3Rpb24gaXRlbVxuICB0cnVlXG5cbk1hY2hpbmUgPVxuICBtYWtlOiBnZW5lcmljIG5hbWU6IFwidGFsb3M6IG1hY2hpbmUgbWFrZVwiXG5cbmdlbmVyaWMgTWFjaGluZS5tYWtlLCBUeXBlLmlzT2JqZWN0LCAoIGdyYXBoICkgLT5cbiAgTWFjaGluZS5tYWtlIHsgZ3JhcGggfVxuXG5nZW5lcmljIE1hY2hpbmUubWFrZSwgVHlwZS5pc1N0cmluZywgVHlwZS5pc09iamVjdCwgKCBuYW1lLCBncmFwaCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IG5hbWUsIGdyYXBoIH1cblxuZ2VuZXJpYyBNYWNoaW5lLm1ha2UsIGlzTWFjaGluZURlc2NyaXB0aW9uLCAoIG1hY2hpbmUgKSAtPlxuICBuYW1lOiBtYWNoaW5lLm5hbWUgPyBcImFub255bW91c1wiXG4gIGdyYXBoOiBHcmFwaC5mcm9tT2JqZWN0IG1hY2hpbmUuZ3JhcGhcblxuZ2VuZXJpYyBNYWNoaW5lLm1ha2UsIFR5cGUuaXNTdHJpbmcsIGlzTWFjaGluZURlc2NyaXB0aW9uLCAoIG5hbWUsIG1hY2hpbmUgKSAtPlxuICBNYWNoaW5lLm1ha2UgeyBuYW1lLCBncmFwaDogbWFjaGluZS5ncmFwaCB9XG5cbmdlbmVyaWMgTWFjaGluZS5tYWtlLCBpc05hbWVkRnVuY3Rpb25BcnJheSwgKCBheCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IGdyYXBoOiBHcmFwaC5mcm9tTmFtZWRGdW5jdGlvbkFycmF5IGF4IH1cblxuZ2VuZXJpYyBNYWNoaW5lLm1ha2UsIGlzRnVuY3Rpb25BcnJheSwgKCBmeCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IGdyYXBoOiBHcmFwaC5mcm9tRnVuY3Rpb25BcnJheSBmeCB9XG5cbmdlbmVyaWMgTWFjaGluZS5tYWtlLCBUeXBlLmlzU3RyaW5nLCBpc05hbWVkRnVuY3Rpb25BcnJheSwgKCBuYW1lLCBheCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IG5hbWUsIGdyYXBoOiBHcmFwaC5mcm9tTmFtZWRGdW5jdGlvbkFycmF5IGF4IH1cblxuZ2VuZXJpYyBNYWNoaW5lLm1ha2UsIFR5cGUuaXNTdHJpbmcsIGlzRnVuY3Rpb25BcnJheSwgKCBuYW1lLCBmeCApIC0+XG4gIE1hY2hpbmUubWFrZSB7IG5hbWUsIGdyYXBoOiBHcmFwaC5mcm9tRnVuY3Rpb25BcnJheSBmeCB9XG5cblxuZXhwb3J0IHsgTWFjaGluZSwgVmVydGV4LCBFZGdlcywgRWRnZSB9Il0sIm5hbWVzIjpbIkVkZ2UiLCJFZGdlcyIsIk1hY2hpbmUiLCJWZXJ0ZXgiLCJHcmFwaCIsImFyZVZlcnRleEVkZ2VzIiwiaXNFZGdlU2hvcnRoYW5kIiwiaXNGdW5jdGlvbkFycmF5IiwiaXNNYWNoaW5lRGVzY3JpcHRpb24iLCJpc05hbWVkRnVuY3Rpb25BcnJheSIsImlzU3RhdGUiLCJub3JtYWxpemVNb3ZlIiwibm9ybWFsaXplV2hlbiIsInByaW9yaXRpemUiLCJpbmRleE9mIiwieCIsIlR5cGUiLCJpc1N0cmluZyIsImlzU3ltYm9sIiwiZWRnZSIsImoiLCJsZW4iLCJyZWYiLCJlZGdlcyIsImlzQXJyYXkiLCJsZW5ndGgiLCJpc09iamVjdCIsInRhbG9zIiwiZXZlbnQiLCJjb25kaXRpb24iLCJpc0Z1bmN0aW9uIiwiaXNCb29sZWFuIiwiRXJyb3IiLCJzdGF0ZSIsImZyYW1lcyIsInNvcnQiLCJhIiwiYiIsInByaW9yaXR5IiwibWFrZSIsImdlbmVyaWMiLCJuYW1lIiwib2JqZWN0Iiwid2hlbiIsInJ1biIsIm1vdmUiLCJpc0FueSIsIl93aGVuIiwicmVmMSIsInZhbHVlIiwiYWxsb3dlZCIsImtleSIsIlJlZmxlY3QiLCJvd25LZXlzIiwiZGVmYXVsdEZyYW1lIiwiayIsImxlbjEiLCIkZW5kIiwicHVzaCIsInNob3J0IiwiYXJyYXkiLCJyZXN1bHRzIiwiZiIsImZyb21PYmplY3QiLCJncmFwaCIsIiRzdGFydCIsInN0YXJ0IiwiZW5kIiwiZnJvbUZ1bmN0aW9uQXJyYXkiLCJmeCIsImdldE5hbWUiLCJpIiwibmFtZXMiLCJwcmV2aW91cyIsImZyb21OYW1lZEZ1bmN0aW9uQXJyYXkiLCJwYWlyIiwicGFpcnMiLCJpdGVtIiwiaW5kZXgiLCJtYWNoaW5lIiwiYXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBb1BpQ0EsSUFBakM7ZUFBaUNBOztJQUFQQyxLQUExQjtlQUEwQkE7O0lBQWpCQyxPQUFUO2VBQVNBOztJQUFTQyxNQUFsQjtlQUFrQkE7Ozt5QkFwUGxCOzhEQUNBO3dCQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFGQSxJQUFBSCxNQUFBQyxPQUFBRyxPQUFBRixTQUFBQyxRQUFBRSxnQkFBQUMs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