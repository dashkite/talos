"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Talos", {
    enumerable: true,
    get: function() {
        return Talos;
    }
});
const _metaclass = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/metaclass"));
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _machine = require("./machine");
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
var Talos;
Talos = (function() {
    class Talos {
        constructor({ machine: machine1 }){
            this.machine = machine1;
            this.name = this.machine.name;
            this.state = _states.$start;
            this.context = {};
            this.error = null;
        }
        static make(_machine1) {
            var machine;
            machine = _machine.Machine.make(_machine1);
            return new Talos({
                machine
            });
        }
        end() {
            return this.state = _states.$end;
        }
        catch(error) {
            this.end();
            return this.error = error;
        }
    }
    ;
    _metaclass.mixin(Talos.prototype, [
        _metaclass.getters({
            ended: function() {
                return (0, _states.atEnd)(this.state);
            },
            success: function() {
                return this.ended && this.error == null;
            },
            failure: function() {
                return this.ended && this.error != null;
            },
            running: function() {
                return !this.ended;
            }
        })
    ]);
    Talos.isType = _type.isType(Talos);
    return Talos;
}).call(void 0);
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvdGFsb3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtFQUFpQixJQUFqQjtFQUF1QixPQUF2QjtFQUFnQyxLQUFoQztDQUFBLE1BQUE7O0FBR007RUFBTixNQUFBLE1BQUE7SUFDRSxXQUFhLENBQUM7UUFBRztNQUFILENBQUQsQ0FBQTtNQUFHLElBQUMsQ0FBQTtNQUNmLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLE9BQU8sQ0FBQztNQUNqQixJQUFDLENBQUEsS0FBRCxHQUFTO01BQ1QsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFBO01BQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUpFOztJQWNOLE9BQU4sSUFBTSxDQUFFLFFBQUYsQ0FBQTtBQUNULFVBQUE7TUFBSSxPQUFBLEdBQVUsT0FBTyxDQUFDLElBQVIsQ0FBYSxRQUFiO2FBQ1YsSUFBSSxLQUFKLENBQVUsQ0FBRSxPQUFGLENBQVY7SUFGSzs7SUFNUCxHQUFLLENBQUEsQ0FBQTthQUNILElBQUMsQ0FBQSxLQUFELEdBQVM7SUFETjs7SUFHTCxLQUFPLENBQUUsS0FBRixDQUFBO01BQ0wsSUFBQyxDQUFBLEdBQUQsQ0FBQTthQUNBLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFGSjs7RUF4QlQ7O0VBT0UsSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFDLENBQUEsU0FBWixFQUFnQjtJQUNkLElBQUksQ0FBQyxPQUFMLENBQ0U7TUFBQSxLQUFBLEVBQU8sUUFBQSxDQUFBLENBQUE7ZUFBRyxLQUFBLENBQU0sSUFBQyxDQUFBLEtBQVA7TUFBSCxDQUFQO01BQ0EsT0FBQSxFQUFTLFFBQUEsQ0FBQSxDQUFBO2VBQUcsSUFBQyxDQUFBLEtBQUQsSUFBVztNQUFkLENBRFQ7TUFFQSxPQUFBLEVBQVMsUUFBQSxDQUFBLENBQUE7ZUFBRyxJQUFDLENBQUEsS0FBRCxJQUFVO01BQWIsQ0FGVDtNQUdBLE9BQUEsRUFBUyxRQUFBLENBQUEsQ0FBQTtlQUFHLENBQUMsSUFBQyxDQUFBO01BQUw7SUFIVCxDQURGLENBRGM7R0FBaEI7O0VBWUEsS0FBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLEtBQVo7Ozs7OztBQVVYLE9BQUE7RUFDRSxLQURGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IE1hY2hpbmUgfSBmcm9tIFwiLi9tYWNoaW5lXCJcbmltcG9ydCB7ICRzdGFydCwgJGVuZCwgYXRTdGFydCwgYXRFbmQgfSBmcm9tIFwiLi9zdGF0ZXNcIlxuXG5cbmNsYXNzIFRhbG9zXG4gIGNvbnN0cnVjdG9yOiAoeyBAbWFjaGluZSB9KSAtPlxuICAgIEBuYW1lID0gQG1hY2hpbmUubmFtZVxuICAgIEBzdGF0ZSA9ICRzdGFydFxuICAgIEBjb250ZXh0ID0ge31cbiAgICBAZXJyb3IgPSBudWxsXG5cbiAgTWV0YS5taXhpbiBAOjosIFtcbiAgICBNZXRhLmdldHRlcnNcbiAgICAgIGVuZGVkOiAtPiBhdEVuZCBAc3RhdGVcbiAgICAgIHN1Y2Nlc3M6IC0+IEBlbmRlZCAmJiAhQGVycm9yP1xuICAgICAgZmFpbHVyZTogLT4gQGVuZGVkICYmIEBlcnJvcj9cbiAgICAgIHJ1bm5pbmc6IC0+ICFAZW5kZWRcbiAgXVxuXG4gIEBtYWtlOiAoIF9tYWNoaW5lICkgLT4gXG4gICAgbWFjaGluZSA9IE1hY2hpbmUubWFrZSBfbWFjaGluZVxuICAgIG5ldyBUYWxvcyB7IG1hY2hpbmUgfVxuICBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIGVuZDogLT5cbiAgICBAc3RhdGUgPSAkZW5kXG5cbiAgY2F0Y2g6ICggZXJyb3IgKSAtPlxuICAgIEBlbmQoKVxuICAgIEBlcnJvciA9IGVycm9yXG5cblxuZXhwb3J0IHtcbiAgVGFsb3Ncbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/talos.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3RhbG9zLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgTWFjaGluZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuaW1wb3J0IHsgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZCB9IGZyb20gXCIuL3N0YXRlc1wiXG5cblxuY2xhc3MgVGFsb3NcbiAgY29uc3RydWN0b3I6ICh7IEBtYWNoaW5lIH0pIC0+XG4gICAgQG5hbWUgPSBAbWFjaGluZS5uYW1lXG4gICAgQHN0YXRlID0gJHN0YXJ0XG4gICAgQGNvbnRleHQgPSB7fVxuICAgIEBlcnJvciA9IG51bGxcblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVyc1xuICAgICAgZW5kZWQ6IC0+IGF0RW5kIEBzdGF0ZVxuICAgICAgc3VjY2VzczogLT4gQGVuZGVkICYmICFAZXJyb3I/XG4gICAgICBmYWlsdXJlOiAtPiBAZW5kZWQgJiYgQGVycm9yP1xuICAgICAgcnVubmluZzogLT4gIUBlbmRlZFxuICBdXG5cbiAgQG1ha2U6ICggX21hY2hpbmUgKSAtPiBcbiAgICBtYWNoaW5lID0gTWFjaGluZS5tYWtlIF9tYWNoaW5lXG4gICAgbmV3IFRhbG9zIHsgbWFjaGluZSB9XG4gIFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbiAgZW5kOiAtPlxuICAgIEBzdGF0ZSA9ICRlbmRcblxuICBjYXRjaDogKCBlcnJvciApIC0+XG4gICAgQGVuZCgpXG4gICAgQGVycm9yID0gZXJyb3JcblxuXG5leHBvcnQge1xuICBUYWxvc1xufSIsbnVsbF0sIm5hbWVzIjpbIlRhbG9zIiwiY29uc3RydWN0b3IiLCJtYWNoaW5lIiwibWFjaGluZTEiLCJuYW1lIiwic3RhdGUiLCIkc3RhcnQiLCJjb250ZXh0IiwiZXJyb3IiLCJtYWtlIiwiX21hY2hpbmUiLCJNYWNoaW5lIiwiZW5kIiwiJGVuZCIsImNhdGNoIiwiTWV0YSIsIm1peGluIiwicHJvdG90eXBlIiwiZ2V0dGVycyIsImVuZGVkIiwiYXRFbmQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInJ1bm5pbmciLCJpc1R5cGUiLCJUeXBlIl0sIm1hcHBpbmdzIjoiOzs7OytCQW9DRUE7OztlQUFBQTs7O21FQXBDRjs4REFDQTt5QkFDQTt3QkFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUhBLElBQUFBO0FBTU1BLFFBQUEsQ0FBQTtJQUFOLE1BQUFBO1FBQ0VDLFlBQWMsRUFBR0MsU0FBQUMsUUFBQSxFQUFKLENBQUE7WUFBRyxJQUFDLENBQUFELE9BQUEsR0FBQUM7WUFDZixJQUFDLENBQUFDLElBQUQsR0FBUSxJQUFDLENBQUFGLE9BQU8sQ0FBQ0UsSUFBQTtZQUNqQixJQUFDLENBQUFDLEtBQUQsR0FBU0MsY0FBQTtZQUNULElBQUMsQ0FBQUMsT0FBRCxHQUFXLENBQUE7WUFDWCxJQUFDLENBQUFDLEtBQUQsR0FBUztRQUpFO1FBY04sT0FBTkMsS0FBUUMsU0FBRixFQUFBO1lBQ1QsSUFBQVI7WUFBSUEsVUFBVVMsZ0JBQU8sQ0FBQ0YsSUFBUixDQUFhQzttQkFDdkIsSUFBSVYsTUFBTTtnQkFBRUU7WUFBRjtRQUZMO1FBTVBVLE1BQUs7bUJBQ0gsSUFBQyxDQUFBUCxLQUFELEdBQVNRLFlBQUE7UUFETjtRQUdMQyxNQUFTTixLQUFGLEVBQUE7WUFDTCxJQUFDLENBQUFJLEdBQUQ7bUJBQ0EsSUFBQyxDQUFBSixLQUFELEdBQVNBO1FBRko7SUF4QlQ7O0lBT0VPLFdBQUtDLEtBQUwsQ0FBV2hCLE1BQUNpQixTQUFaLEVBQWdCO1FBQ2RGLFdBQUtHLE9BQUwsQ0FDRTtZQUFBQyxPQUFPO3VCQUFHQyxJQUFBQSxhQUFBLEVBQU0sSUFBQyxDQUFBZixLQUFQO1lBQUg7WUFDUGdCLFNBQVM7dUJBQUcsSUFBQyxDQUFBRixLQUFELElBQVcsSUFBQSxDQUFBWCxLQUFBLElBQUE7WUFBZDtZQUNUYyxTQUFTO3VCQUFHLElBQUMsQ0FBQUgsS0FBRCxJQUFVLElBQUEsQ0FBQVgsS0FBQSxJQUFBO1lBQWI7WUFDVGUsU0FBUzt1QkFBRyxDQUFDLElBQUMsQ0FBQUosS0FBQTtZQUFMO1FBSFQ7S0FGSjtJQVlBbkIsTUFBQ3dCLE1BQUQsR0FBU0MsTUFBS0QsTUFBTCxDQUFZeEIifQ==