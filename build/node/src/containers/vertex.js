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
    isState: function() {
        return isState;
    },
    Vertex: function() {
        return Vertex;
    }
});
const _metaclass = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/metaclass"));
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _value = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/value"));
const _generic = require("@dashkite/joy/generic");
const _helpers = require("../helpers");
const _edge = require("./edge");
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
var Vertex, _make, isState;
isState = (0, _helpers.oneOf)([
    _type.isString,
    _type.isSymbol
]);
_make = function(type) {
    var make;
    make = (0, _generic.generic)({
        name: "vertex make",
        default: function(...args) {
            throw new Error(`Vertex.make: input is malformed ${JSON.stringify(args)}`);
        }
    });
    (0, _generic.generic)(make, isState, _type.isArray, function(state, edges) {
        var edge;
        return new Vertex({
            state: state,
            edges: function() {
                var i, len, results;
                results = [];
                for(i = 0, len = edges.length; i < len; i++){
                    edge = edges[i];
                    results.push(_edge.Edge.make(edge));
                }
                return results;
            }()
        });
    });
    (0, _generic.generic)(make, isState, _type.isObject, function(state, _vertex) {
        var edge, edges, metadata;
        ({ edges, ...metadata } = _vertex);
        return new Vertex({
            metadata,
            state,
            edges: function() {
                var i, len, results;
                results = [];
                for(i = 0, len = edges.length; i < len; i++){
                    edge = edges[i];
                    results.push(_edge.Edge.make(edge));
                }
                return results;
            }()
        });
    });
    (0, _generic.generic)(make, isState, _type.isUndefined(function(state, _null) {
        return make(state, []);
    }));
    (0, _generic.generic)(make, isState, function(state) {
        return make(state, []);
    });
    (0, _generic.generic)(make, type.isType, function(vertex) {
        return vertex.clone();
    });
    (0, _generic.generic)(make, isState, type.isType, function(state, _vertex) {
        var vertex;
        vertex = _vertex.clone();
        vertex.state = state;
        return vertex;
    });
    return make;
};
Vertex = (function() {
    class Vertex {
        constructor({ state: state1, edges: edges1, metadata: metadata1 }){
            this.state = state1;
            this.edges = edges1;
            this.metadata = metadata1;
        }
        clone() {
            var edge, edges, state;
            state = _value.clone(this.state);
            edges = (function() {
                var i, len, ref, results;
                ref = this.edges;
                results = [];
                for(i = 0, len = ref.length; i < len; i++){
                    edge = ref[i];
                    results.push(edge.clone());
                }
                return results;
            }).call(this);
            return new Vertex({
                state,
                edges
            });
        }
    }
    ;
    _metaclass.mixin(Vertex.prototype, [
        _metaclass.getters({})
    ]);
    Vertex.make = _make(Vertex);
    Vertex.isType = _type.isType(Vertex);
    return Vertex;
}).call(void 0);
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvY29udGFpbmVycy92ZXJ0ZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQTs7QUFBQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFNBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsT0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFHQSxPQUFBLEdBQVUsS0FBQSxDQUFNLENBQ2QsSUFBSSxDQUFDLFFBRFMsRUFFZCxJQUFJLENBQUMsUUFGUyxDQUFOOztBQUtWLEtBQUEsR0FBUSxRQUFBLENBQUUsSUFBRixDQUFBO0FBQ1IsTUFBQTtFQUFFLElBQUEsR0FBTyxPQUFBLENBQ0w7SUFBQSxJQUFBLEVBQU0sYUFBTjtJQUNBLE9BQUEsRUFBUyxRQUFBLENBQUEsR0FBRSxJQUFGLENBQUE7TUFDUCxNQUFNLElBQUksS0FBSixDQUFVLENBQUEsZ0NBQUEsQ0FBQSxDQUFtQyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWYsQ0FBbkMsQ0FBQSxDQUFWO0lBREM7RUFEVCxDQURLO0VBS1AsT0FBQSxDQUFRLElBQVIsRUFBYyxPQUFkLEVBQXVCLElBQUksQ0FBQyxPQUE1QixFQUFxQyxRQUFBLENBQUUsS0FBRixFQUFTLEtBQVQsQ0FBQTtBQUN2QyxRQUFBO1dBQUksSUFBSSxNQUFKLENBQ0U7TUFBQSxLQUFBLEVBQU8sS0FBUDtNQUNBLEtBQUE7O0FBQVM7UUFBQSxLQUFBLHVDQUFBOzt1QkFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLElBQVY7UUFBQSxDQUFBOzs7SUFEVCxDQURGO0VBRG1DLENBQXJDO0VBS0EsT0FBQSxDQUFRLElBQVIsRUFBYyxPQUFkLEVBQXVCLElBQUksQ0FBQyxRQUE1QixFQUFzQyxRQUFBLENBQUUsS0FBRixFQUFTLE9BQVQsQ0FBQTtBQUN4QyxRQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7SUFBSSxDQUFBLENBQUUsS0FBRixFQUFTLEdBQUEsUUFBVCxDQUFBLEdBQXlCLE9BQXpCO1dBQ0EsSUFBSSxNQUFKLENBQVc7TUFDVCxRQURTO01BRVQsS0FGUztNQUdULEtBQUE7O0FBQVM7UUFBQSxLQUFBLHVDQUFBOzt1QkFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLElBQVY7UUFBQSxDQUFBOzs7SUFIQSxDQUFYO0VBRm9DLENBQXRDO0VBUUEsT0FBQSxDQUFRLElBQVIsRUFBYyxPQUFkLEVBQXVCLElBQUksQ0FBQyxXQUFMLENBQWlCLFFBQUEsQ0FBRSxLQUFGLEVBQVMsS0FBVCxDQUFBO1dBQ3RDLElBQUEsQ0FBSyxLQUFMLEVBQVksRUFBWjtFQURzQyxDQUFqQixDQUF2QjtFQUdBLE9BQUEsQ0FBUSxJQUFSLEVBQWMsT0FBZCxFQUF1QixRQUFBLENBQUUsS0FBRixDQUFBO1dBQ3JCLElBQUEsQ0FBSyxLQUFMLEVBQVksRUFBWjtFQURxQixDQUF2QjtFQUdBLE9BQUEsQ0FBUSxJQUFSLEVBQWMsSUFBSSxDQUFDLE1BQW5CLEVBQTJCLFFBQUEsQ0FBRSxNQUFGLENBQUE7V0FDekIsTUFBTSxDQUFDLEtBQVAsQ0FBQTtFQUR5QixDQUEzQjtFQUdBLE9BQUEsQ0FBUSxJQUFSLEVBQWMsT0FBZCxFQUF1QixJQUFJLENBQUMsTUFBNUIsRUFBb0MsUUFBQSxDQUFFLEtBQUYsRUFBUyxPQUFULENBQUE7QUFDdEMsUUFBQTtJQUFJLE1BQUEsR0FBUyxPQUFPLENBQUMsS0FBUixDQUFBO0lBQ1QsTUFBTSxDQUFDLEtBQVAsR0FBZTtXQUNmO0VBSGtDLENBQXBDO1NBS0E7QUFqQ007O0FBb0NGO0VBQU4sTUFBQSxPQUFBO0lBQ0UsV0FBYSxDQUFDO1FBQUcsYUFBSDtRQUFXLGFBQVg7UUFBbUI7TUFBbkIsQ0FBRCxDQUFBO01BQUcsSUFBQyxDQUFBO01BQU8sSUFBQyxDQUFBO01BQU8sSUFBQyxDQUFBO0lBQXBCOztJQVNiLEtBQU8sQ0FBQSxDQUFBO0FBQ1QsVUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBO01BQUksS0FBQSxHQUFRLEtBQUssQ0FBQyxLQUFOLENBQVksSUFBQyxDQUFBLEtBQWI7TUFDUixLQUFBOztBQUFVO0FBQUE7UUFBQSxLQUFBLHFDQUFBOzt1QkFBQSxJQUFJLENBQUMsS0FBTCxDQUFBO1FBQUEsQ0FBQTs7O2FBQ1YsSUFBSSxNQUFKLENBQVcsQ0FBRSxLQUFGLEVBQVMsS0FBVCxDQUFYO0lBSEs7O0VBVlQ7O0VBR0UsSUFBSSxDQUFDLEtBQUwsQ0FBVyxNQUFDLENBQUEsU0FBWixFQUFnQixDQUNkLElBQUksQ0FBQyxPQUFMLENBQWEsQ0FBQSxDQUFiLENBRGMsQ0FBaEI7O0VBSUEsTUFBQyxDQUFBLElBQUQsR0FBTyxLQUFBLENBQU0sTUFBTjs7RUFDUCxNQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksTUFBWjs7Ozs7O0FBUVgsT0FBQTtFQUNFLE9BREY7RUFFRSxNQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCAqIGFzIFZhbHVlIGZyb20gXCJAZGFzaGtpdGUvam95L3ZhbHVlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcbmltcG9ydCB7IG9uZU9mIH0gZnJvbSBcIi4uL2hlbHBlcnNcIlxuaW1wb3J0IHsgRWRnZSB9IGZyb20gXCIuL2VkZ2VcIlxuXG5cbmlzU3RhdGUgPSBvbmVPZiBbXG4gIFR5cGUuaXNTdHJpbmdcbiAgVHlwZS5pc1N5bWJvbFxuXVxuXG5fbWFrZSA9ICggdHlwZSApIC0+XG4gIG1ha2UgPSBnZW5lcmljIFxuICAgIG5hbWU6IFwidmVydGV4IG1ha2VcIlxuICAgIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVmVydGV4Lm1ha2U6IGlucHV0IGlzIG1hbGZvcm1lZCAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuICBnZW5lcmljIG1ha2UsIGlzU3RhdGUsIFR5cGUuaXNBcnJheSwgKCBzdGF0ZSwgZWRnZXMgKSAtPlxuICAgIG5ldyBWZXJ0ZXhcbiAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgZWRnZXM6ICggRWRnZS5tYWtlIGVkZ2UgZm9yIGVkZ2UgaW4gZWRnZXMgKVxuXG4gIGdlbmVyaWMgbWFrZSwgaXNTdGF0ZSwgVHlwZS5pc09iamVjdCwgKCBzdGF0ZSwgX3ZlcnRleCApIC0+XG4gICAgeyBlZGdlcywgbWV0YWRhdGEuLi4gfSA9IF92ZXJ0ZXggICAgXG4gICAgbmV3IFZlcnRleCB7XG4gICAgICBtZXRhZGF0YVxuICAgICAgc3RhdGVcbiAgICAgIGVkZ2VzOiAoIEVkZ2UubWFrZSBlZGdlIGZvciBlZGdlIGluIGVkZ2VzIClcbiAgICB9XG5cbiAgZ2VuZXJpYyBtYWtlLCBpc1N0YXRlLCBUeXBlLmlzVW5kZWZpbmVkICggc3RhdGUsIF9udWxsICkgLT5cbiAgICBtYWtlIHN0YXRlLCBbXVxuXG4gIGdlbmVyaWMgbWFrZSwgaXNTdGF0ZSwgKCBzdGF0ZSApIC0+XG4gICAgbWFrZSBzdGF0ZSwgW11cblxuICBnZW5lcmljIG1ha2UsIHR5cGUuaXNUeXBlLCAoIHZlcnRleCApIC0+XG4gICAgdmVydGV4LmNsb25lKClcblxuICBnZW5lcmljIG1ha2UsIGlzU3RhdGUsIHR5cGUuaXNUeXBlLCAoIHN0YXRlLCBfdmVydGV4ICkgLT5cbiAgICB2ZXJ0ZXggPSBfdmVydGV4LmNsb25lKClcbiAgICB2ZXJ0ZXguc3RhdGUgPSBzdGF0ZVxuICAgIHZlcnRleFxuXG4gIG1ha2VcblxuXG5jbGFzcyBWZXJ0ZXhcbiAgY29uc3RydWN0b3I6ICh7IEBzdGF0ZSwgQGVkZ2VzLCBAbWV0YWRhdGEgfSkgLT5cblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVycyB7fVxuICBdXG5cbiAgQG1ha2U6IF9tYWtlIEBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIGNsb25lOiAtPlxuICAgIHN0YXRlID0gVmFsdWUuY2xvbmUgQHN0YXRlXG4gICAgZWRnZXMgPSAoIGVkZ2UuY2xvbmUoKSBmb3IgZWRnZSBpbiBAZWRnZXMgKVxuICAgIG5ldyBWZXJ0ZXggeyBzdGF0ZSwgZWRnZXMgfVxuXG5cbmV4cG9ydCB7XG4gIGlzU3RhdGVcbiAgVmVydGV4XG59Il19
 //# sourceURL=/@dashkite/talos/src/containers/vertex.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2NvbnRhaW5lcnMvdmVydGV4LmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgVmFsdWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdmFsdWVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0IHsgb25lT2YgfSBmcm9tIFwiLi4vaGVscGVyc1wiXG5pbXBvcnQgeyBFZGdlIH0gZnJvbSBcIi4vZWRnZVwiXG5cblxuaXNTdGF0ZSA9IG9uZU9mIFtcbiAgVHlwZS5pc1N0cmluZ1xuICBUeXBlLmlzU3ltYm9sXG5dXG5cbl9tYWtlID0gKCB0eXBlICkgLT5cbiAgbWFrZSA9IGdlbmVyaWMgXG4gICAgbmFtZTogXCJ2ZXJ0ZXggbWFrZVwiXG4gICAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJWZXJ0ZXgubWFrZTogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG4gIGdlbmVyaWMgbWFrZSwgaXNTdGF0ZSwgVHlwZS5pc0FycmF5LCAoIHN0YXRlLCBlZGdlcyApIC0+XG4gICAgbmV3IFZlcnRleFxuICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICBlZGdlczogKCBFZGdlLm1ha2UgZWRnZSBmb3IgZWRnZSBpbiBlZGdlcyApXG5cbiAgZ2VuZXJpYyBtYWtlLCBpc1N0YXRlLCBUeXBlLmlzT2JqZWN0LCAoIHN0YXRlLCBfdmVydGV4ICkgLT5cbiAgICB7IGVkZ2VzLCBtZXRhZGF0YS4uLiB9ID0gX3ZlcnRleCAgICBcbiAgICBuZXcgVmVydGV4IHtcbiAgICAgIG1ldGFkYXRhXG4gICAgICBzdGF0ZVxuICAgICAgZWRnZXM6ICggRWRnZS5tYWtlIGVkZ2UgZm9yIGVkZ2UgaW4gZWRnZXMgKVxuICAgIH1cblxuICBnZW5lcmljIG1ha2UsIGlzU3RhdGUsIFR5cGUuaXNVbmRlZmluZWQgKCBzdGF0ZSwgX251bGwgKSAtPlxuICAgIG1ha2Ugc3RhdGUsIFtdXG5cbiAgZ2VuZXJpYyBtYWtlLCBpc1N0YXRlLCAoIHN0YXRlICkgLT5cbiAgICBtYWtlIHN0YXRlLCBbXVxuXG4gIGdlbmVyaWMgbWFrZSwgdHlwZS5pc1R5cGUsICggdmVydGV4ICkgLT5cbiAgICB2ZXJ0ZXguY2xvbmUoKVxuXG4gIGdlbmVyaWMgbWFrZSwgaXNTdGF0ZSwgdHlwZS5pc1R5cGUsICggc3RhdGUsIF92ZXJ0ZXggKSAtPlxuICAgIHZlcnRleCA9IF92ZXJ0ZXguY2xvbmUoKVxuICAgIHZlcnRleC5zdGF0ZSA9IHN0YXRlXG4gICAgdmVydGV4XG5cbiAgbWFrZVxuXG5cbmNsYXNzIFZlcnRleFxuICBjb25zdHJ1Y3RvcjogKHsgQHN0YXRlLCBAZWRnZXMsIEBtZXRhZGF0YSB9KSAtPlxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzIHt9XG4gIF1cblxuICBAbWFrZTogX21ha2UgQFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbiAgY2xvbmU6IC0+XG4gICAgc3RhdGUgPSBWYWx1ZS5jbG9uZSBAc3RhdGVcbiAgICBlZGdlcyA9ICggZWRnZS5jbG9uZSgpIGZvciBlZGdlIGluIEBlZGdlcyApXG4gICAgbmV3IFZlcnRleCB7IHN0YXRlLCBlZGdlcyB9XG5cblxuZXhwb3J0IHtcbiAgaXNTdGF0ZVxuICBWZXJ0ZXhcbn0iLG51bGxdLCJuYW1lcyI6WyJpc1N0YXRlIiwiVmVydGV4IiwiX21ha2UiLCJvbmVPZiIsIlR5cGUiLCJpc1N0cmluZyIsImlzU3ltYm9sIiwidHlwZSIsIm1ha2UiLCJnZW5lcmljIiwibmFtZSIsImRlZmF1bHQiLCJhcmdzIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNBcnJheSIsInN0YXRlIiwiZWRnZXMiLCJlZGdlIiwicmVzdWx0cyIsImkiLCJsZW4iLCJsZW5ndGgiLCJFZGdlIiwiaXNPYmplY3QiLCJfdmVydGV4IiwibWV0YWRhdGEiLCJpc1VuZGVmaW5lZCIsIl9udWxsIiwiaXNUeXBlIiwidmVydGV4IiwiY2xvbmUiLCJjb25zdHJ1Y3RvciIsInN0YXRlMSIsImVkZ2VzMSIsIm1ldGFkYXRhMSIsIlZhbHVlIiwicmVmIiwiTWV0YSIsIm1peGluIiwicHJvdG90eXBlIiwiZ2V0dGVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFrRUVBLE9BREY7ZUFDRUE7O0lBQ0FDLE1BRkY7ZUFFRUE7OzttRUFuRUY7OERBQ0E7K0RBQ0E7eUJBQ0E7eUJBQ0E7c0JBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFMQSxJQUFBQSxRQUFBQyxPQUFBRjtBQVFBQSxVQUFVRyxJQUFBQSxjQUFBLEVBQU07SUFDZEMsTUFBS0MsUUFEUztJQUVkRCxNQUFLRSxRQUZTO0NBQU47QUFLVkosUUFBUSxTQUFFSyxJQUFGO0lBQ1IsSUFBQUM7SUFBRUEsT0FBT0MsSUFBQUEsZ0JBQUEsRUFDTDtRQUFBQyxNQUFNO1FBQ05DLFNBQVMsU0FBQSxHQUFFQyxJQUFGO1lBQ1AsTUFBTSxJQUFJQyxNQUFNLENBQUEsZ0NBQUEsRUFBbUNDLEtBQUtDLFNBQUwsQ0FBZUgsTUFBbEQsQ0FBVjtRQURDO0lBRFQ7SUFJRkgsSUFBQUEsZ0JBQUEsRUFBUUQsTUFBTVIsU0FBU0ksTUFBS1ksT0FBNUIsRUFBcUMsU0FBRUMsS0FBRixFQUFTQyxLQUFUO1FBQ3ZDLElBQUFDO2VBQUksSUFBSWxCLE9BQ0Y7WUFBQWdCLE9BQU9BO1lBQ1BDLE9BQUE7O2dCQUFTRSxVQUFBLEVBQUE7Z0JBQUEsSUFBQUMsSUFBQSxHQUFBQyxNQUFBSixNQUFBSyxNQUFBLEVBQUFGLElBQUFDLEtBQUFELElBQUE7O2lDQUFBRyxVQUFJLENBQUNoQixJQUFMLENBQVVXO2dCQUFWOzs7UUFEVDtJQUZpQztJQUtyQ1YsSUFBQUEsZ0JBQUEsRUFBUUQsTUFBTVIsU0FBU0ksTUFBS3FCLFFBQTVCLEVBQXNDLFNBQUVSLEtBQUYsRUFBU1MsT0FBVDtRQUN4QyxJQUFBUCxNQUFBRCxPQUFBUztRQUFJLENBQUEsRUFBRVQsS0FBRixFQUFTLEdBQUFTLFVBQVQsR0FBeUJELE9BQUE7ZUFDekIsSUFBSXpCLE9BQU87WUFDVDBCO1lBQ0FWO1lBQ0FDLE9BQUE7O2dCQUFTRSxVQUFBLEVBQUE7Z0JBQUEsSUFBQUMsSUFBQSxHQUFBQyxNQUFBSixNQUFBSyxNQUFBLEVBQUFGLElBQUFDLEtBQUFELElBQUE7O2lDQUFBRyxVQUFJLENBQUNoQixJQUFMLENBQVVXO2dCQUFWOzs7UUFIQTtJQUZ5QjtJQVF0Q1YsSUFBQUEsZ0JBQUEsRUFBUUQsTUFBTVIsU0FBU0ksTUFBS3dCLFdBQUwsQ0FBaUIsU0FBRVgsS0FBRixFQUFTWSxLQUFUO2VBQ3RDckIsS0FBS1MsT0FBTyxFQUFaO0lBRHNDO0lBR3hDUixJQUFBQSxnQkFBQSxFQUFRRCxNQUFNUixTQUFTLFNBQUVpQixLQUFGO2VBQ3JCVCxLQUFLUyxPQUFPLEVBQVo7SUFEcUI7SUFHdkJSLElBQUFBLGdCQUFBLEVBQVFELE1BQU1ELEtBQUt1QixNQUFuQixFQUEyQixTQUFFQyxNQUFGO2VBQ3pCQSxPQUFPQyxLQUFQO0lBRHlCO0lBRzNCdkIsSUFBQUEsZ0JBQUEsRUFBUUQsTUFBTVIsU0FBU08sS0FBS3VCLE1BQTVCLEVBQW9DLFNBQUViLEtBQUYsRUFBU1MsT0FBVDtRQUN0QyxJQUFBSztRQUFJQSxTQUFTTCxRQUFRTSxLQUFSO1FBQ1RELE9BQU9kLEtBQVAsR0FBZUE7ZUFDZmM7SUFIa0M7V0FLcEN2QjtBQWpDTTtBQW9DRlAsU0FBQSxDQUFBO0lBQU4sTUFBQUE7UUFDRWdDLFlBQWMsRUFBR2hCLE9BQUFpQixNQUFILEVBQVdoQixPQUFBaUIsTUFBWCxFQUFtQlIsVUFBQVMsU0FBQSxFQUFwQixDQUFBO1lBQUcsSUFBQyxDQUFBbkIsS0FBQSxHQUFBaUI7WUFBTyxJQUFDLENBQUFoQixLQUFBLEdBQUFpQjtZQUFPLElBQUMsQ0FBQVIsUUFBQSxHQUFBUztRQUFwQjtRQVNiSixRQUFPO1lBQ1QsSUFBQWIsTUFBQUQsT0FBQUQ7WUFBSUEsUUFBUW9CLE9BQU1MLEtBQU4sQ0FBWSxJQUFDLENBQUFmLEtBQWI7WUFDUkMsUUFBQSxDQUFBOztnQkFBVW9CLE1BQUEsSUFBQSxDQUFBcEIsS0FBQTtnQkFBQUUsVUFBQSxFQUFBO2dCQUFBLElBQUFDLElBQUEsR0FBQUMsTUFBQWdCLElBQUFmLE1BQUEsRUFBQUYsSUFBQUMsS0FBQUQsSUFBQTs7aUNBQUFGLEtBQUthLEtBQUw7Z0JBQUE7OzttQkFDVixJQUFJL0IsT0FBTztnQkFBRWdCO2dCQUFPQztZQUFUO1FBSE47SUFWVDs7SUFHRXFCLFdBQUtDLEtBQUwsQ0FBV3ZDLE9BQUN3QyxTQUFaLEVBQWdCO1FBQ2RGLFdBQUtHLE9BQUwsQ0FBYSxDQUFBO0tBRGY7SUFJQXpDLE9BQUNPLElBQUQsR0FBT04sTUFBTUQ7SUFDYkEsT0FBQzZCLE1BQUQsR0FBUzFCLE1BQUswQixNQUFMLENBQVk3QiJ9