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
    Machine: function() {
        return Machine;
    },
    Vertex: function() {
        return Vertex;
    },
    Edges: function() {
        return Edges;
    },
    Edge: function() {
        return Edge;
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
var Edge, Edges, Machine, Vertex, areVertexEdges, isState, normalizeMove, normalizeWhen, prioritize;
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
Machine = {
    make: function(value) {
        var _graph, j, key, len, machine, ref;
        _graph = Machine.format(value);
        machine = {
            graph: {}
        };
        ref = Reflect.ownKeys(_graph);
        for(j = 0, len = ref.length; j < len; j++){
            key = ref[j];
            value = _graph[key];
            machine.graph[key] = Vertex.make(key, value);
        }
        return machine;
    },
    format: function(value) {
        var _value, graph, j, key, len, ref;
        if (_type.isObject(value)) {
            graph = {};
            _value = value.graph != null ? value.graph : value;
            ref = Reflect.ownKeys(_value);
            for(j = 0, len = ref.length; j < len; j++){
                key = ref[j];
                graph[key] = _value[key];
            }
        } else if (_type.isArray(value)) {
            graph = Machine.expand(value);
        } else {
            throw new Error("Talos machine representation is malformed");
        }
        if (graph[_states.$start] == null) {
            if (graph.start != null) {
                graph[_states.$start] = graph.start;
                delete graph.start;
            } else {
                throw new Error("no start state defined for this machine");
            }
        }
        if (graph[_states.$end] == null) {
            if (graph.end != null) {
                graph[_states.$end] = graph.end;
                delete graph.end;
            }
        }
        return graph;
    },
    expand: function(fx) {
        var cache, current, f, getName, graph, i, j, len, names, next, ref;
        if (fx.length === 0) {
            return {
                [_states.$start]: {
                    end: {
                        when: true,
                        next: _states.$end
                    }
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
        graph = {};
        cache = {};
        for(i = j = 0, len = fx.length; j < len; i = ++j){
            f = fx[i];
            current = (ref = cache.current) != null ? ref : getName(f);
            if (i === 0) {
                cache.startName = current;
            }
            if (i === fx.length - 1) {
                next = _states.$end;
            } else {
                next = getName(fx[i + 1]);
            }
            graph[current] = {
                next: {
                    when: true,
                    run: f,
                    move: next
                }
            };
            cache.current = next;
        }
        graph[_states.$start] = {
            next: {
                when: true,
                move: cache.startName
            }
        };
        return graph;
    }
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvbWFjaGluZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsY0FBQSxFQUFBLE9BQUEsRUFBQSxhQUFBLEVBQUEsYUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0VBQWlCLElBQWpCO0NBQUEsTUFBQTs7QUFFQSxPQUFBLEdBQVUsUUFBQSxDQUFFLENBQUYsQ0FBQTtTQUFTLENBQUUsSUFBSSxDQUFDLFFBQUwsQ0FBYyxDQUFkLENBQUYsQ0FBQSxJQUF1QixDQUFFLElBQUksQ0FBQyxRQUFMLENBQWMsQ0FBZCxDQUFGO0FBQWhDOztBQUNWLGNBQUEsR0FBaUIsUUFBQSxDQUFFLENBQUYsQ0FBQTtBQUNqQixNQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBO0VBQUUsSUFBaUIsZUFBakI7QUFBQSxXQUFPLE1BQVA7O0VBQ0EsSUFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTCxDQUFhLENBQUMsQ0FBQyxLQUFmLENBQWpCO0FBQUEsV0FBTyxNQUFQOztBQUNBO0VBQUEsS0FBQSxxQ0FBQTs7UUFBeUIsQ0FBQyxJQUFJLENBQUMsUUFBTCxDQUFjLElBQWQ7QUFDeEIsYUFBTzs7RUFEVDtTQUVBO0FBTGU7O0FBUWpCLGFBQUEsR0FBZ0IsUUFBQSxDQUFFLENBQUYsQ0FBQTtFQUNkLElBQUcsT0FBQSxDQUFRLENBQVIsQ0FBSDtXQUNFLFFBQUEsQ0FBRSxLQUFGLEVBQVMsS0FBVCxDQUFBO2FBQW9CLEtBQUEsS0FBUztJQUE3QixFQURGO0dBQUEsTUFFSyxJQUFHLElBQUksQ0FBQyxVQUFMLENBQWdCLENBQWhCLENBQUg7V0FDSCxFQURHO0dBQUEsTUFFQSxJQUFH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QUFBLEVBQU0sS0FBSyxDQUFDO01BQTFCO0lBQU47V0FDbEI7RUF2Q007QUFuQ1I7O0FBNkVGLE9BQUE7RUFBUyxPQUFUO0VBQWtCLE1BQWxCO0VBQTBCLEtBQTFCO0VBQWlDLElBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7ICRzdGFydCwgJGVuZCB9IGZyb20gXCIuL3N0YXRlc1wiXG5cbmlzU3RhdGUgPSAoIHggKSAtPiAoIFR5cGUuaXNTdHJpbmcgeCApIHx8ICggVHlwZS5pc1N5bWJvbCB4IClcbmFyZVZlcnRleEVkZ2VzID0gKCB4ICkgLT5cbiAgcmV0dXJuIGZhbHNlIGlmICF4LmVkZ2VzP1xuICByZXR1cm4gZmFsc2UgaWYgIVR5cGUuaXNBcnJheSB4LmVkZ2VzXG4gIGZvciBlZGdlIGluIHguZWRnZXMgd2hlbiAhVHlwZS5pc09iamVjdCBlZGdlXG4gICAgcmV0dXJuIGZhbHNlXG4gIHRydWVcblxuXG5ub3JtYWxpemVXaGVuID0gKCB4ICkgLT5cbiAgaWYgaXNTdGF0ZSB4XG4gICAgKCB0YWxvcywgZXZlbnQgKSAtPiBldmVudCA9PSBjb25kaXRpb25cbiAgZWxzZSBpZiBUeXBlLmlzRnVuY3Rpb24geFxuICAgIHhcbiAgZWxzZSBpZiBUeXBlLmlzQm9vbGVhbiB4XG4gICAgLT4geFxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yIFwidW5hYmxlIHRvIG5vcm1hbGl6ZSB3aGVuIGRlc2NyaXB0aW9uXCJcblxubm9ybWFsaXplTW92ZSA9ICggeCApIC0+XG4gIGlmIGlzU3RhdGUgeFxuICAgICggdGFsb3MsIGV2ZW50ICkgLT4gdGFsb3Muc3RhdGUgPSB4XG4gIGVsc2UgaWYgVHlwZS5pc0Z1bmN0aW9uIHhcbiAgICB4XG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJ1bmFibGUgdG8gbm9ybWFsaXplIG1vdmUgZGVzY3JpcHRpb25cIlxuXG5wcmlvcml0aXplID0gKCBmcmFtZXMgKSAtPlxuICBmcmFtZXMuc29ydCAoIGEsIGIgKSAtPiBcbiAgICBpZiBhLnByaW9yaXR5IDwgYi5wcmlvcml0eVxuICAgICAgLTFcbiAgICBlbHNlIGlmIGEucHJpb3JpdHkgPiBiLnByaW9yaXR5XG4gICAgICAxXG4gICAgZWxzZVxuICAgICAgMFxuXG5cbkVkZ2UgPVxuICBtYWtlOiBnZW5lcmljIG5hbWU6IFwidGFsb3M6IGVkZ2UgbWFrZVwiXG5cbmdlbmVyaWMgRWRnZS5tYWtlLCBUeXBlLmlzT2JqZWN0LCAoIG9iamVjdCApIC0+XG4gIHdoZW46IG5vcm1hbGl6ZVdoZW4gb2JqZWN0LndoZW5cbiAgcnVuOiBvYmplY3QucnVuXG4gIG1vdmU6IG5vcm1hbGl6ZU1vdmUgb2JqZWN0Lm1vdmVcblxuZ2VuZXJpYyBFZGdlLm1ha2UsIGlzU3RhdGUsIFR5cGUuaXNBbnksICggbW92ZSwgX3doZW4gKSAtPlxuICBFZGdlLm1ha2UgeyBtb3ZlLCB3aGVuOiBfd2hlbiB9XG5cbmdlbmVyaWMgRWRnZS5tYWtlLCBpc1N0YXRlLCBUeXBlLmlzT2JqZWN0LCAoIG1vdmUsIG9iamVjdCApIC0+XG4gIHdoZW46IG5vcm1hbGl6ZVdoZW4gb2JqZWN0LndoZW4gPyB0cnVlXG4gIHJ1bjogb2JqZWN0LnJ1blxuICBtb3ZlOiBub3JtYWxpemVNb3ZlIG9iamVjdC5tb3ZlID8gbW92ZVxuXG5cbkVkZ2VzID0gXG4gIG1ha2U6IGdlbmVyaWMgbmFtZTogXCJ0YWxvczogZWRnZXMgbWFrZVwiXG5cbmdlbmVyaWMgRWRnZXMubWFrZSwgVHlwZS5pc09iamVjdCwgKCBvYmplY3QgKSAtPlxuICBmcmFtZXMgPSBbXVxuICBkZWZhdWx0RnJhbWUgPSBudWxsXG4gIGZvciBrZXkgaW4gUmVmbGVjdC5vd25LZXlzIG9iamVjdFxuICAgIHZhbHVlID0gb2JqZWN0WyBrZXkgXVxuICAgIHByaW9yaXR5ID0gdmFsdWUucHJpb3JpdHkgPyAxMDBcbiAgICBpZiBrZXkgPT0gXCJkZWZhdWx0XCJcbiAgICAgIGRlZmF1bHRGcmFtZSA9IHsga2V5LCB2YWx1ZSB9XG4gICAgZWxzZVxuICAgICAga2V5ID0gJGVuZCBpZiBrZXkgPT0gXCJlbmRcIlxuICAgICAgZnJhbWVzLnB1c2ggeyBrZXksIHZhbHVlLCBwcmlvcml0eSB9XG5cbiAgcHJpb3JpdGl6ZSBmcmFtZXNcblxuICBlZGdlcyA9IFtdXG4gIGZvciB7IGtleSwgdmFsdWUgfSBpbiBmcmFtZXNcbiAgICBlZGdlcy5wdXNoIEVkZ2UubWFrZSBrZXksIHZhbHVlXG5cbiAgaWYgZGVmYXVsdEZyYW1lP1xuICAgICMgZGVmYXVsdCBpcyBhIHNwZWNpYWwgY2FzZSBlbXBoYXNpemluZyBhbiBhbHdheXMgdHJ1ZSBcIndoZW5cIiBmdW5jdGlvbi5cbiAgICB7IHZhbHVlIH0gPSBkZWZhdWx0RnJhbWVcbiAgICBpZiBUeXBlLmlzT2JqZWN0IHZhbHVlXG4gICAgICBlZGdlcy5wdXNoIEVkZ2UubWFrZSB7IHZhbHVlLi4uLCB3aGVuOiB0cnVlIH1cbiAgICBlbHNlXG4gICAgICBlZGdlcy5wdXNoIEVkZ2UubWFrZSB3aGVuOiB0cnVlLCBtb3ZlOiB2YWx1ZVxuICBcbiAgZWRnZXNcbiAgXG5cbmdlbmVyaWMgRWRnZXMubWFrZSwgVHlwZS5pc0FycmF5LCAoIGFycmF5ICkgLT5cbiAgZm9yIGVkZ2UgaW4gYXJyYXlcbiAgICBFZGdlLm1ha2UgZWRnZVxuXG5nZW5lcmljIEVkZ2VzLm1ha2UsIFR5cGUuaXNGdW5jdGlvbiwgKCBmICkgLT5cbiAgZWRnZSA9IHdoZW46IHRydWUsIHJ1bjogZiwgbW92ZTogJGVuZFxuICBbIEVkZ2UubWFrZSBlZGdlIF1cblxuZ2VuZXJpYyBFZGdlcy5tYWtlLCBpc1N0YXRlLCAoIG1vdmUgKSAtPlxuICBFZGdlcy5tYWtlIFsgbW92ZSBdOiB0cnVlXG5cbmdlbmVyaWMgRWRnZXMubWFrZSwgYXJlVmVydGV4RWRnZXMsICh7IGVkZ2VzIH0pIC0+XG4gIGZvciBlZGdlIGluIGVkZ2VzXG4gICAgd2hlbjogZWRnZS53aGVuXG4gICAgcnVuOiBlZGdlLnJ1blxuICAgIG1vdmU6IGVkZ2UubW92ZVxuXG5cblZlcnRleCA9XG4gIG1ha2U6ICgga2V5LCB2YWx1ZSApIC0+XG4gICAgbmFtZToga2V5XG4gICAgZWRnZXM6IEVkZ2VzLm1ha2UgdmFsdWVcblxuXG5NYWNoaW5lID1cbiAgbWFrZTogKCB2YWx1ZSApIC0+IFxuICAgIF9ncmFwaCA9IE1hY2hpbmUuZm9ybWF0IHZhbHVlXG4gICAgbWFjaGluZSA9IGdyYXBoOiB7fVxuXG4gICAgZm9yIGtleSBpbiBSZWZsZWN0Lm93bktleXMgX2dyYXBoXG4gICAgICB2YWx1ZSA9IF9ncmFwaFsga2V5IF1cbiAgICAgIG1hY2hpbmUuZ3JhcGhbIGtleSBdID0gVmVydGV4Lm1ha2Uga2V5LCB2YWx1ZVxuICAgIFxuICAgIG1hY2hpbmVcblxuICBmb3JtYXQ6ICggdmFsdWUgKSAtPlxuICAgIGlmIFR5cGUuaXNPYmplY3QgdmFsdWVcbiAgICAgIGdyYXBoID0ge31cbiAgICAgIF92YWx1ZSA9IGlmIHZhbHVlLmdyYXBoPyB0aGVuIHZhbHVlLmdyYXBoIGVsc2UgdmFsdWVcbiAgICAgIGZvciBrZXkgaW4gUmVmbGVjdC5vd25LZXlzIF92YWx1ZVxuICAgICAgICBncmFwaFsga2V5IF0gPSBfdmFsdWVbIGtleSBdXG4gICAgZWxzZSBpZiBUeXBlLmlzQXJyYXkgdmFsdWVcbiAgICAgIGdyYXBoID0gTWFjaGluZS5leHBhbmQgdmFsdWVcbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJUYWxvcyBtYWNoaW5lIHJlcHJlc2VudGF0aW9uIGlzIG1hbGZvcm1lZFwiXG4gICAgXG4gICAgaWYgIWdyYXBoWyAkc3RhcnQgXT9cbiAgICAgIGlmIGdyYXBoLnN0YXJ0P1xuICAgICAgICBncmFwaFsgJHN0YXJ0IF0gPSBncmFwaC5zdGFydFxuICAgICAgICBkZWxldGUgZ3JhcGguc3RhcnRcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwibm8gc3RhcnQgc3RhdGUgZGVmaW5lZCBmb3IgdGhpcyBtYWNoaW5lXCJcblxuICAgIGlmICFncmFwaFsgJGVuZCBdP1xuICAgICAgaWYgZ3JhcGguZW5kP1xuICAgICAgICBncmFwaFsgJGVuZCBdID0gZ3JhcGguZW5kXG4gICAgICAgIGRlbGV0ZSBncmFwaC5lbmRcblxuICAgIGdyYXBoXG5cbiAgZXhwYW5kOiAoIGZ4ICkgLT5cbiAgICBpZiBmeC5sZW5ndGggPT0gMFxuICAgICAgcmV0dXJuIFxuICAgICAgICBbICRzdGFydCBdOiBcbiAgICAgICAgICBlbmQ6XG4gICAgICAgICAgICB3aGVuOiB0cnVlXG4gICAgICAgICAgICBuZXh0OiAkZW5kXG5cbiAgICBuYW1lcyA9IHt9XG4gICAgZ2V0TmFtZSA9ICggZiApIC0+XG4gICAgICBuYW1lID0gZi5uYW1lIHx8IFwiYW5vbnltb3VzXCJcbiAgICAgIGlmIG5hbWVzWyBuYW1lIF0/XG4gICAgICAgIFwiI3sgbmFtZSB9LSN7ICsrbmFtZXNbIG5hbWUgXSB9XCJcbiAgICAgIGVsc2VcbiAgICAgICAgbmFtZXNbIG5hbWUgXSA9IDFcbiAgICAgICAgbmFtZVxuXG5cbiAgICBncmFwaCA9IHt9XG4gICAgY2FjaGUgPSB7fVxuICAgIGZvciBmLCBpIGluIGZ4XG4gICAgICBjdXJyZW50ID0gY2FjaGUuY3VycmVudCA/IGdldE5hbWUgZlxuICAgICAgaWYgaSA9PSAwXG4gICAgICAgIGNhY2hlLnN0YXJ0TmFtZSA9IGN1cnJlbnRcbiAgICAgIFxuICAgICAgaWYgaSA9PSBmeC5sZW5ndGggLSAxXG4gICAgICAgIG5leHQgPSAkZW5kXG4gICAgICBlbHNlXG4gICAgICAgIG5leHQgPSBnZXROYW1lIGZ4WyBpICsgMSBdXG5cbiAgICAgIGdyYXBoWyBjdXJyZW50IF0gPSBcbiAgICAgICAgbmV4dDpcbiAgICAgICAgICB3aGVuOiB0cnVlXG4gICAgICAgICAgcnVuOiBmXG4gICAgICAgICAgbW92ZTogbmV4dFxuXG4gICAgICBjYWNoZS5jdXJyZW50ID0gbmV4dFxuICAgIFxuICAgIGdyYXBoWyAkc3RhcnQgXSA9IG5leHQ6IHsgd2hlbjogdHJ1ZSwgbW92ZTogY2FjaGUuc3RhcnROYW1lIH1cbiAgICBncmFwaFxuXG5cbmV4cG9ydCB7IE1hY2hpbmUsIFZlcnRleCwgRWRnZXMsIEVkZ2UgfSJdfQ==
 //# sourceURL=/@dashkite/talos/src/machine.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL21hY2hpbmUuY29mZmVlIiwiPGFub24+Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyAkc3RhcnQsICRlbmQgfSBmcm9tIFwiLi9zdGF0ZXNcIlxuXG5pc1N0YXRlID0gKCB4ICkgLT4gKCBUeXBlLmlzU3RyaW5nIHggKSB8fCAoIFR5cGUuaXNTeW1ib2wgeCApXG5hcmVWZXJ0ZXhFZGdlcyA9ICggeCApIC0+XG4gIHJldHVybiBmYWxzZSBpZiAheC5lZGdlcz9cbiAgcmV0dXJuIGZhbHNlIGlmICFUeXBlLmlzQXJyYXkgeC5lZGdlc1xuICBmb3IgZWRnZSBpbiB4LmVkZ2VzIHdoZW4gIVR5cGUuaXNPYmplY3QgZWRnZVxuICAgIHJldHVybiBmYWxzZVxuICB0cnVlXG5cblxubm9ybWFsaXplV2hlbiA9ICggeCApIC0+XG4gIGlmIGlzU3RhdGUgeFxuICAgICggdGFsb3MsIGV2ZW50ICkgLT4gZXZlbnQgPT0gY29uZGl0aW9uXG4gIGVsc2UgaWYgVHlwZS5pc0Z1bmN0aW9uIHhcbiAgICB4XG4gIGVsc2UgaWYgVHlwZS5pc0Jvb2xlYW4geFxuICAgIC0+IHhcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvciBcInVuYWJsZSB0byBub3JtYWxpemUgd2hlbiBkZXNjcmlwdGlvblwiXG5cbm5vcm1hbGl6ZU1vdmUgPSAoIHggKSAtPlxuICBpZiBpc1N0YXRlIHhcbiAgICAoIHRhbG9zLCBldmVudCApIC0+IHRhbG9zLnN0YXRlID0geFxuICBlbHNlIGlmIFR5cGUuaXNGdW5jdGlvbiB4XG4gICAgeFxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yIFwidW5hYmxlIHRvIG5vcm1hbGl6ZSBtb3ZlIGRlc2NyaXB0aW9uXCJcblxucHJpb3JpdGl6ZSA9ICggZnJhbWVzICkgLT5cbiAgZnJhbWVzLnNvcnQgKCBhLCBiICkgLT4gXG4gICAgaWYgYS5wcmlvcml0eSA8IGIucHJpb3JpdHlcbiAgICAgIC0xXG4gICAgZWxzZSBpZiBhLnByaW9yaXR5ID4gYi5wcmlvcml0eVxuICAgICAgMVxuICAgIGVsc2VcbiAgICAgIDBcblxuXG5FZGdlID1cbiAgbWFrZTogZ2VuZXJpYyBuYW1lOiBcInRhbG9zOiBlZGdlIG1ha2VcIlxuXG5nZW5lcmljIEVkZ2UubWFrZSwgVHlwZS5pc09iamVjdCwgKCBvYmplY3QgKSAtPlxuICB3aGVuOiBub3JtYWxpemVXaGVuIG9iamVjdC53aGVuXG4gIHJ1bjogb2JqZWN0LnJ1blxuICBtb3ZlOiBub3JtYWxpemVNb3ZlIG9iamVjdC5tb3ZlXG5cbmdlbmVyaWMgRWRnZS5tYWtlLCBpc1N0YXRlLCBUeXBlLmlzQW55LCAoIG1vdmUsIF93aGVuICkgLT5cbiAgRWRnZS5tYWtlIHsgbW92ZSwgd2hlbjogX3doZW4gfVxuXG5nZW5lcmljIEVkZ2UubWFrZSwgaXNTdGF0ZSwgVHlwZS5pc09iamVjdCwgKCBtb3ZlLCBvYmplY3QgKSAtPlxuICB3aGVuOiBub3JtYWxpemVXaGVuIG9iamVjdC53aGVuID8gdHJ1ZVxuICBydW46IG9iamVjdC5ydW5cbiAgbW92ZTogbm9ybWFsaXplTW92ZSBvYmplY3QubW92ZSA/IG1vdmVcblxuXG5FZGdlcyA9IFxuICBtYWtlOiBnZW5lcmljIG5hbWU6IFwidGFsb3M6IGVkZ2VzIG1ha2VcIlxuXG5nZW5lcmljIEVkZ2VzLm1ha2UsIFR5cGUuaXNPYmplY3QsICggb2JqZWN0ICkgLT5cbiAgZnJhbWVzID0gW11cbiAgZGVmYXVsdEZyYW1lID0gbnVsbFxuICBmb3Iga2V5IGluIFJlZmxlY3Qub3duS2V5cyBvYmplY3RcbiAgICB2YWx1ZSA9IG9iamVjdFsga2V5IF1cbiAgICBwcmlvcml0eSA9IHZhbHVlLnByaW9yaXR5ID8gMTAwXG4gICAgaWYga2V5ID09IFwiZGVmYXVsdFwiXG4gICAgICBkZWZhdWx0RnJhbWUgPSB7IGtleSwgdmFsdWUgfVxuICAgIGVsc2VcbiAgICAgIGtleSA9ICRlbmQgaWYga2V5ID09IFwiZW5kXCJcbiAgICAgIGZyYW1lcy5wdXNoIHsga2V5LCB2YWx1ZSwgcHJpb3JpdHkgfVxuXG4gIHByaW9yaXRpemUgZnJhbWVzXG5cbiAgZWRnZXMgPSBbXVxuICBmb3IgeyBrZXksIHZhbHVlIH0gaW4gZnJhbWVzXG4gICAgZWRnZXMucHVzaCBFZGdlLm1ha2Uga2V5LCB2YWx1ZVxuXG4gIGlmIGRlZmF1bHRGcmFtZT9cbiAgICAjIGRlZmF1bHQgaXMgYSBzcGVjaWFsIGNhc2UgZW1waGFzaXppbmcgYW4gYWx3YXlzIHRydWUgXCJ3aGVuXCIgZnVuY3Rpb24uXG4gICAgeyB2YWx1ZSB9ID0gZGVmYXVsdEZyYW1lXG4gICAgaWYgVHlwZS5pc09iamVjdCB2YWx1ZVxuICAgICAgZWRnZXMucHVzaCBFZGdlLm1ha2UgeyB2YWx1ZS4uLiwgd2hlbjogdHJ1ZSB9XG4gICAgZWxzZVxuICAgICAgZWRnZXMucHVzaCBFZGdlLm1ha2Ugd2hlbjogdHJ1ZSwgbW92ZTogdmFsdWVcbiAgXG4gIGVkZ2VzXG4gIFxuXG5nZW5lcmljIEVkZ2VzLm1ha2UsIFR5cGUuaXNBcnJheSwgKCBhcnJheSApIC0+XG4gIGZvciBlZGdlIGluIGFycmF5XG4gICAgRWRnZS5tYWtlIGVkZ2VcblxuZ2VuZXJpYyBFZGdlcy5tYWtlLCBUeXBlLmlzRnVuY3Rpb24sICggZiApIC0+XG4gIGVkZ2UgPSB3aGVuOiB0cnVlLCBydW46IGYsIG1vdmU6ICRlbmRcbiAgWyBFZGdlLm1ha2UgZWRnZSBdXG5cbmdlbmVyaWMgRWRnZXMubWFrZSwgaXNTdGF0ZSwgKCBtb3ZlICkgLT5cbiAgRWRnZXMubWFrZSBbIG1vdmUgXTogdHJ1ZVxuXG5nZW5lcmljIEVkZ2VzLm1ha2UsIGFyZVZlcnRleEVkZ2VzLCAoeyBlZGdlcyB9KSAtPlxuICBmb3IgZWRnZSBpbiBlZGdlc1xuICAgIHdoZW46IGVkZ2Uud2hlblxuICAgIHJ1bjogZWRnZS5ydW5cbiAgICBtb3ZlOiBlZGdlLm1vdmVcblxuXG5WZXJ0ZXggPVxuICBtYWtlOiAoIGtleSwgdmFsdWUgKSAtPlxuICAgIG5hbWU6IGtleVxuICAgIGVkZ2VzOiBFZGdlcy5tYWtlIHZhbHVlXG5cblxuTWFjaGluZSA9XG4gIG1ha2U6ICggdmFsdWUgKSAtPiBcbiAgICBfZ3JhcGggPSBNYWNoaW5lLmZvcm1hdCB2YWx1ZVxuICAgIG1hY2hpbmUgPSBncmFwaDoge31cblxuICAgIGZvciBrZXkgaW4gUmVmbGVjdC5vd25LZXlzIF9ncmFwaFxuICAgICAgdmFsdWUgPSBfZ3JhcGhbIGtleSBdXG4gICAgICBtYWNoaW5lLmdyYXBoWyBrZXkgXSA9IFZlcnRleC5tYWtlIGtleSwgdmFsdWVcbiAgICBcbiAgICBtYWNoaW5lXG5cbiAgZm9ybWF0OiAoIHZhbHVlICkgLT5cbiAgICBpZiBUeXBlLmlzT2JqZWN0IHZhbHVlXG4gICAgICBncmFwaCA9IHt9XG4gICAgICBfdmFsdWUgPSBpZiB2YWx1ZS5ncmFwaD8gdGhlbiB2YWx1ZS5ncmFwaCBlbHNlIHZhbHVlXG4gICAgICBmb3Iga2V5IGluIFJlZmxlY3Qub3duS2V5cyBfdmFsdWVcbiAgICAgICAgZ3JhcGhbIGtleSBdID0gX3ZhbHVlWyBrZXkgXVxuICAgIGVsc2UgaWYgVHlwZS5pc0FycmF5IHZhbHVlXG4gICAgICBncmFwaCA9IE1hY2hpbmUuZXhwYW5kIHZhbHVlXG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVGFsb3MgbWFjaGluZSByZXByZXNlbnRhdGlvbiBpcyBtYWxmb3JtZWRcIlxuICAgIFxuICAgIGlmICFncmFwaFsgJHN0YXJ0IF0/XG4gICAgICBpZiBncmFwaC5zdGFydD9cbiAgICAgICAgZ3JhcGhbICRzdGFydCBdID0gZ3JhcGguc3RhcnRcbiAgICAgICAgZGVsZXRlIGdyYXBoLnN0YXJ0XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvciBcIm5vIHN0YXJ0IHN0YXRlIGRlZmluZWQgZm9yIHRoaXMgbWFjaGluZVwiXG5cbiAgICBpZiAhZ3JhcGhbICRlbmQgXT9cbiAgICAgIGlmIGdyYXBoLmVuZD9cbiAgICAgICAgZ3JhcGhbICRlbmQgXSA9IGdyYXBoLmVuZFxuICAgICAgICBkZWxldGUgZ3JhcGguZW5kXG5cbiAgICBncmFwaFxuXG4gIGV4cGFuZDogKCBmeCApIC0+XG4gICAgaWYgZngubGVuZ3RoID09IDBcbiAgICAgIHJldHVybiBcbiAgICAgICAgWyAkc3RhcnQgXTogXG4gICAgICAgICAgZW5kOlxuICAgICAgICAgICAgd2hlbjogdHJ1ZVxuICAgICAgICAgICAgbmV4dDogJGVuZFxuXG4gICAgbmFtZXMgPSB7fVxuICAgIGdldE5hbWUgPSAoIGYgKSAtPlxuICAgICAgbmFtZSA9IGYubmFtZSB8fCBcImFub255bW91c1wiXG4gICAgICBpZiBuYW1lc1sgbmFtZSBdP1xuICAgICAgICBcIiN7IG5hbWUgfS0jeyArK25hbWVzWyBuYW1lIF0gfVwiXG4gICAgICBlbHNlXG4gICAgICAgIG5hbWVzWyBuYW1lIF0gPSAxXG4gICAgICAgIG5hbWVcblxuXG4gICAgZ3JhcGggPSB7fVxuICAgIGNhY2hlID0ge31cbiAgICBmb3IgZiwgaSBpbiBmeFxuICAgICAgY3VycmVudCA9IGNhY2hlLmN1cnJlbnQgPyBnZXROYW1lIGZcbiAgICAgIGlmIGkgPT0gMFxuICAgICAgICBjYWNoZS5zdGFydE5hbWUgPSBjdXJyZW50XG4gICAgICBcbiAgICAgIGlmIGkgPT0gZngubGVuZ3RoIC0gMVxuICAgICAgICBuZXh0ID0gJGVuZFxuICAgICAgZWxzZVxuICAgICAgICBuZXh0ID0gZ2V0TmFtZSBmeFsgaSArIDEgXVxuXG4gICAgICBncmFwaFsgY3VycmVudCBdID0gXG4gICAgICAgIG5leHQ6XG4gICAgICAgICAgd2hlbjogdHJ1ZVxuICAgICAgICAgIHJ1bjogZlxuICAgICAgICAgIG1vdmU6IG5leHRcblxuICAgICAgY2FjaGUuY3VycmVudCA9IG5leHRcbiAgICBcbiAgICBncmFwaFsgJHN0YXJ0IF0gPSBuZXh0OiB7IHdoZW46IHRydWUsIG1vdmU6IGNhY2hlLnN0YXJ0TmFtZSB9XG4gICAgZ3JhcGhcblxuXG5leHBvcnQgeyBNYWNoaW5lLCBWZXJ0ZXgsIEVkZ2VzLCBFZGdlIH0iLG51bGxdLCJuYW1lcyI6WyJNYWNoaW5lIiwiVmVydGV4IiwiRWRnZXMiLCJFZGdlIiwiYXJlVmVydGV4RWRnZXMiLCJpc1N0YXRlIiwibm9ybWFsaXplTW92ZSIsIm5vcm1hbGl6ZVdoZW4iLCJwcmlvcml0aXplIiwieCIsIlR5cGUiLCJpc1N0cmluZyIsImlzU3ltYm9sIiwiZWRnZSIsImoiLCJsZW4iLCJyZWYiLCJlZGdlcyIsImlzQXJyYXkiLCJsZW5ndGgiLCJpc09iamVjdCIsInRhbG9zIiwiZXZlbnQiLCJjb25kaXRpb24iLCJpc0Z1bmN0aW9uIiwiaXNCb29sZWFuIiwiRXJyb3IiLCJzdGF0ZSIsImZyYW1lcyIsInNvcnQiLCJhIiwiYiIsInByaW9yaXR5IiwibWFrZSIsImdlbmVyaWMiLCJuYW1lIiwib2JqZWN0Iiwid2hlbiIsInJ1biIsIm1vdmUiLCJpc0FueSIsIl93aGVuIiwicmVmMSIsImRlZmF1bHRGcmFtZSIsImsiLCJrZXkiLCJsZW4xIiwidmFsdWUiLCJSZWZsZWN0Iiwib3duS2V5cyIsIiRlbmQiLCJwdXNoIiwiYXJyYXkiLCJyZXN1bHRzIiwiZiIsIl9ncmFwaCIsIm1hY2hpbmUiLCJmb3JtYXQiLCJncmFwaCIsIl92YWx1ZSIsImV4cGFuZCIsIiRzdGFydCIsInN0YXJ0IiwiZW5kIiwiZngiLCJjYWNoZSIsImN1cnJlbnQiLCJnZXROYW1lIiwiaSIsIm5hbWVzIiwibmV4dCIsInN0YXJ0TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFnTVNBLE9BQVQ7ZUFBU0E7O0lBQVNDLE1BQWxCO2VBQWtCQTs7SUFBUUMsS0FBMUI7ZUFBMEJBOztJQUFPQyxJQUFqQztlQUFpQ0E7Ozt5QkFoTWpDOzhEQUNBO3dCQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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