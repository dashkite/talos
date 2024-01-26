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
            this.previousState = null;
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
            this.previousState = this.state;
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvdGFsb3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtFQUFpQixJQUFqQjtFQUF1QixPQUF2QjtFQUFnQyxLQUFoQztDQUFBLE1BQUE7O0FBR007RUFBTixNQUFBLE1BQUE7SUFDRSxXQUFhLENBQUM7UUFBRztNQUFILENBQUQsQ0FBQTtNQUFHLElBQUMsQ0FBQTtNQUNmLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLE9BQU8sQ0FBQztNQUNqQixJQUFDLENBQUEsYUFBRCxHQUFpQjtNQUNqQixJQUFDLENBQUEsS0FBRCxHQUFTO01BQ1QsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFBO01BQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUxFOztJQWVOLE9BQU4sSUFBTSxDQUFFLFFBQUYsQ0FBQTtBQUNULFVBQUE7TUFBSSxPQUFBLEdBQVUsT0FBTyxDQUFDLElBQVIsQ0FBYSxRQUFiO2FBQ1YsSUFBSSxLQUFKLENBQVUsQ0FBRSxPQUFGLENBQVY7SUFGSzs7SUFNUCxHQUFLLENBQUEsQ0FBQTtNQUNILElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUMsQ0FBQTthQUNsQixJQUFDLENBQUEsS0FBRCxHQUFTO0lBRk47O0lBSUwsS0FBTyxDQUFFLEtBQUYsQ0FBQTtNQUNMLElBQUMsQ0FBQSxHQUFELENBQUE7YUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTO0lBRko7O0VBMUJUOztFQVFFLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBQyxDQUFBLFNBQVosRUFBZ0I7SUFDZCxJQUFJLENBQUMsT0FBTCxDQUNFO01BQUEsS0FBQSxFQUFPLFFBQUEsQ0FBQSxDQUFBO2VBQUcsS0FBQSxDQUFNLElBQUMsQ0FBQSxLQUFQO01BQUgsQ0FBUDtNQUNBLE9BQUEsRUFBUyxRQUFBLENBQUEsQ0FBQTtlQUFHLElBQUMsQ0FBQSxLQUFELElBQVc7TUFBZCxDQURUO01BRUEsT0FBQSxFQUFTLFFBQUEsQ0FBQSxDQUFBO2VBQUcsSUFBQyxDQUFBLEtBQUQsSUFBVTtNQUFiLENBRlQ7TUFHQSxPQUFBLEVBQVMsUUFBQSxDQUFBLENBQUE7ZUFBRyxDQUFDLElBQUMsQ0FBQTtNQUFMO0lBSFQsQ0FERixDQURjO0dBQWhCOztFQVlBLEtBQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxLQUFaOzs7Ozs7QUFXWCxPQUFBO0VBQ0UsS0FERiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE1ldGEgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvbWV0YWNsYXNzXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4vbWFjaGluZVwiXG5pbXBvcnQgeyAkc3RhcnQsICRlbmQsIGF0U3RhcnQsIGF0RW5kIH0gZnJvbSBcIi4vc3RhdGVzXCJcblxuXG5jbGFzcyBUYWxvc1xuICBjb25zdHJ1Y3RvcjogKHsgQG1hY2hpbmUgfSkgLT5cbiAgICBAbmFtZSA9IEBtYWNoaW5lLm5hbWVcbiAgICBAcHJldmlvdXNTdGF0ZSA9IG51bGxcbiAgICBAc3RhdGUgPSAkc3RhcnRcbiAgICBAY29udGV4dCA9IHt9XG4gICAgQGVycm9yID0gbnVsbFxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzXG4gICAgICBlbmRlZDogLT4gYXRFbmQgQHN0YXRlXG4gICAgICBzdWNjZXNzOiAtPiBAZW5kZWQgJiYgIUBlcnJvcj9cbiAgICAgIGZhaWx1cmU6IC0+IEBlbmRlZCAmJiBAZXJyb3I/XG4gICAgICBydW5uaW5nOiAtPiAhQGVuZGVkXG4gIF1cblxuICBAbWFrZTogKCBfbWFjaGluZSApIC0+IFxuICAgIG1hY2hpbmUgPSBNYWNoaW5lLm1ha2UgX21hY2hpbmVcbiAgICBuZXcgVGFsb3MgeyBtYWNoaW5lIH1cbiAgXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuICBlbmQ6IC0+XG4gICAgQHByZXZpb3VzU3RhdGUgPSBAc3RhdGVcbiAgICBAc3RhdGUgPSAkZW5kXG5cbiAgY2F0Y2g6ICggZXJyb3IgKSAtPlxuICAgIEBlbmQoKVxuICAgIEBlcnJvciA9IGVycm9yXG5cblxuZXhwb3J0IHtcbiAgVGFsb3Ncbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/talos.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3RhbG9zLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgTWFjaGluZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuaW1wb3J0IHsgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZCB9IGZyb20gXCIuL3N0YXRlc1wiXG5cblxuY2xhc3MgVGFsb3NcbiAgY29uc3RydWN0b3I6ICh7IEBtYWNoaW5lIH0pIC0+XG4gICAgQG5hbWUgPSBAbWFjaGluZS5uYW1lXG4gICAgQHByZXZpb3VzU3RhdGUgPSBudWxsXG4gICAgQHN0YXRlID0gJHN0YXJ0XG4gICAgQGNvbnRleHQgPSB7fVxuICAgIEBlcnJvciA9IG51bGxcblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVyc1xuICAgICAgZW5kZWQ6IC0+IGF0RW5kIEBzdGF0ZVxuICAgICAgc3VjY2VzczogLT4gQGVuZGVkICYmICFAZXJyb3I/XG4gICAgICBmYWlsdXJlOiAtPiBAZW5kZWQgJiYgQGVycm9yP1xuICAgICAgcnVubmluZzogLT4gIUBlbmRlZFxuICBdXG5cbiAgQG1ha2U6ICggX21hY2hpbmUgKSAtPiBcbiAgICBtYWNoaW5lID0gTWFjaGluZS5tYWtlIF9tYWNoaW5lXG4gICAgbmV3IFRhbG9zIHsgbWFjaGluZSB9XG4gIFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbiAgZW5kOiAtPlxuICAgIEBwcmV2aW91c1N0YXRlID0gQHN0YXRlXG4gICAgQHN0YXRlID0gJGVuZFxuXG4gIGNhdGNoOiAoIGVycm9yICkgLT5cbiAgICBAZW5kKClcbiAgICBAZXJyb3IgPSBlcnJvclxuXG5cbmV4cG9ydCB7XG4gIFRhbG9zXG59IixudWxsXSwibmFtZXMiOlsiVGFsb3MiLCJjb25zdHJ1Y3RvciIsIm1hY2hpbmUiLCJtYWNoaW5lMSIsIm5hbWUiLCJwcmV2aW91c1N0YXRlIiwic3RhdGUiLCIkc3RhcnQiLCJjb250ZXh0IiwiZXJyb3IiLCJtYWtlIiwiX21hY2hpbmUiLCJNYWNoaW5lIiwiZW5kIiwiJGVuZCIsImNhdGNoIiwiTWV0YSIsIm1peGluIiwicHJvdG90eXBlIiwiZ2V0dGVycyIsImVuZGVkIiwiYXRFbmQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInJ1bm5pbmciLCJpc1R5cGUiLCJUeXBlIl0sIm1hcHBpbmdzIjoiOzs7OytCQXNDRUE7OztlQUFBQTs7O21FQXRDRjs4REFDQTt5QkFDQTt3QkFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUhBLElBQUFBO0FBTU1BLFFBQUEsQ0FBQTtJQUFOLE1BQUFBO1FBQ0VDLFlBQWMsRUFBR0MsU0FBQUMsUUFBQSxFQUFKLENBQUE7WUFBRyxJQUFDLENBQUFELE9BQUEsR0FBQUM7WUFDZixJQUFDLENBQUFDLElBQUQsR0FBUSxJQUFDLENBQUFGLE9BQU8sQ0FBQ0UsSUFBQTtZQUNqQixJQUFDLENBQUFDLGFBQUQsR0FBaUI7WUFDakIsSUFBQyxDQUFBQyxLQUFELEdBQVNDLGNBQUE7WUFDVCxJQUFDLENBQUFDLE9BQUQsR0FBVyxDQUFBO1lBQ1gsSUFBQyxDQUFBQyxLQUFELEdBQVM7UUFMRTtRQWVOLE9BQU5DLEtBQVFDLFNBQUYsRUFBQTtZQUNULElBQUFUO1lBQUlBLFVBQVVVLGdCQUFPLENBQUNGLElBQVIsQ0FBYUM7bUJBQ3ZCLElBQUlYLE1BQU07Z0JBQUVFO1lBQUY7UUFGTDtRQU1QVyxNQUFLO1lBQ0gsSUFBQyxDQUFBUixhQUFELEdBQWlCLElBQUMsQ0FBQUMsS0FBQTttQkFDbEIsSUFBQyxDQUFBQSxLQUFELEdBQVNRLFlBQUE7UUFGTjtRQUlMQyxNQUFTTixLQUFGLEVBQUE7WUFDTCxJQUFDLENBQUFJLEdBQUQ7bUJBQ0EsSUFBQyxDQUFBSixLQUFELEdBQVNBO1FBRko7SUExQlQ7O0lBUUVPLFdBQUtDLEtBQUwsQ0FBV2pCLE1BQUNrQixTQUFaLEVBQWdCO1FBQ2RGLFdBQUtHLE9BQUwsQ0FDRTtZQUFBQyxPQUFPO3VCQUFHQyxJQUFBQSxhQUFBLEVBQU0sSUFBQyxDQUFBZixLQUFQO1lBQUg7WUFDUGdCLFNBQVM7dUJBQUcsSUFBQyxDQUFBRixLQUFELElBQVcsSUFBQSxDQUFBWCxLQUFBLElBQUE7WUFBZDtZQUNUYyxTQUFTO3VCQUFHLElBQUMsQ0FBQUgsS0FBRCxJQUFVLElBQUEsQ0FBQVgsS0FBQSxJQUFBO1lBQWI7WUFDVGUsU0FBUzt1QkFBRyxDQUFDLElBQUMsQ0FBQUosS0FBQTtZQUFMO1FBSFQ7S0FGSjtJQVlBcEIsTUFBQ3lCLE1BQUQsR0FBU0MsTUFBS0QsTUFBTCxDQUFZekIifQ==