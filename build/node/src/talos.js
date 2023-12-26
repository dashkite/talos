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
            this.state = _states.$start;
            this.context = {};
            this.error = null;
        }
        static make(_machine1) {
            var machine;
            machine = _machine.Machine.clone(_machine1);
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvdGFsb3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtFQUFpQixJQUFqQjtFQUF1QixPQUF2QjtFQUFnQyxLQUFoQztDQUFBLE1BQUE7O0FBR007RUFBTixNQUFBLE1BQUE7SUFDRSxXQUFhLENBQUM7UUFBRztNQUFILENBQUQsQ0FBQTtNQUFHLElBQUMsQ0FBQTtNQUNmLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFDVCxJQUFDLENBQUEsT0FBRCxHQUFXLENBQUE7TUFDWCxJQUFDLENBQUEsS0FBRCxHQUFTO0lBSEU7O0lBYU4sT0FBTixJQUFNLENBQUUsUUFBRixDQUFBO0FBQ1QsVUFBQTtNQUFJLE9BQUEsR0FBVSxPQUFPLENBQUMsS0FBUixDQUFjLFFBQWQ7YUFDVixJQUFJLEtBQUosQ0FBVSxDQUFFLE9BQUYsQ0FBVjtJQUZLOztJQU1QLEdBQUssQ0FBQSxDQUFBO2FBQ0gsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUROOztJQUdMLEtBQU8sQ0FBRSxLQUFGLENBQUE7TUFDTCxJQUFDLENBQUEsR0FBRCxDQUFBO2FBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUZKOztFQXZCVDs7RUFNRSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUMsQ0FBQSxTQUFaLEVBQWdCO0lBQ2QsSUFBSSxDQUFDLE9BQUwsQ0FDRTtNQUFBLEtBQUEsRUFBTyxRQUFBLENBQUEsQ0FBQTtlQUFHLEtBQUEsQ0FBTSxJQUFDLENBQUEsS0FBUDtNQUFILENBQVA7TUFDQSxPQUFBLEVBQVMsUUFBQSxDQUFBLENBQUE7ZUFBRyxJQUFDLENBQUEsS0FBRCxJQUFXO01BQWQsQ0FEVDtNQUVBLE9BQUEsRUFBUyxRQUFBLENBQUEsQ0FBQTtlQUFHLElBQUMsQ0FBQSxLQUFELElBQVU7TUFBYixDQUZUO01BR0EsT0FBQSxFQUFTLFFBQUEsQ0FBQSxDQUFBO2VBQUcsQ0FBQyxJQUFDLENBQUE7TUFBTDtJQUhULENBREYsQ0FEYztHQUFoQjs7RUFZQSxLQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksS0FBWjs7Ozs7O0FBVVgsT0FBQTtFQUNFLEtBREYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgTWFjaGluZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuaW1wb3J0IHsgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZCB9IGZyb20gXCIuL3N0YXRlc1wiXG5cblxuY2xhc3MgVGFsb3NcbiAgY29uc3RydWN0b3I6ICh7IEBtYWNoaW5lIH0pIC0+XG4gICAgQHN0YXRlID0gJHN0YXJ0XG4gICAgQGNvbnRleHQgPSB7fVxuICAgIEBlcnJvciA9IG51bGxcblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVyc1xuICAgICAgZW5kZWQ6IC0+IGF0RW5kIEBzdGF0ZVxuICAgICAgc3VjY2VzczogLT4gQGVuZGVkICYmICFAZXJyb3I/XG4gICAgICBmYWlsdXJlOiAtPiBAZW5kZWQgJiYgQGVycm9yP1xuICAgICAgcnVubmluZzogLT4gIUBlbmRlZFxuICBdXG5cbiAgQG1ha2U6ICggX21hY2hpbmUgKSAtPiBcbiAgICBtYWNoaW5lID0gTWFjaGluZS5jbG9uZSBfbWFjaGluZVxuICAgIG5ldyBUYWxvcyB7IG1hY2hpbmUgfVxuICBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIGVuZDogLT5cbiAgICBAc3RhdGUgPSAkZW5kXG5cbiAgY2F0Y2g6ICggZXJyb3IgKSAtPlxuICAgIEBlbmQoKVxuICAgIEBlcnJvciA9IGVycm9yXG5cblxuZXhwb3J0IHtcbiAgVGFsb3Ncbn0iXX0=
 //# sourceURL=/@dashkite/talos/src/talos.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL3RhbG9zLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgTWFjaGluZSB9IGZyb20gXCIuL21hY2hpbmVcIlxuaW1wb3J0IHsgJHN0YXJ0LCAkZW5kLCBhdFN0YXJ0LCBhdEVuZCB9IGZyb20gXCIuL3N0YXRlc1wiXG5cblxuY2xhc3MgVGFsb3NcbiAgY29uc3RydWN0b3I6ICh7IEBtYWNoaW5lIH0pIC0+XG4gICAgQHN0YXRlID0gJHN0YXJ0XG4gICAgQGNvbnRleHQgPSB7fVxuICAgIEBlcnJvciA9IG51bGxcblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVyc1xuICAgICAgZW5kZWQ6IC0+IGF0RW5kIEBzdGF0ZVxuICAgICAgc3VjY2VzczogLT4gQGVuZGVkICYmICFAZXJyb3I/XG4gICAgICBmYWlsdXJlOiAtPiBAZW5kZWQgJiYgQGVycm9yP1xuICAgICAgcnVubmluZzogLT4gIUBlbmRlZFxuICBdXG5cbiAgQG1ha2U6ICggX21hY2hpbmUgKSAtPiBcbiAgICBtYWNoaW5lID0gTWFjaGluZS5jbG9uZSBfbWFjaGluZVxuICAgIG5ldyBUYWxvcyB7IG1hY2hpbmUgfVxuICBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIGVuZDogLT5cbiAgICBAc3RhdGUgPSAkZW5kXG5cbiAgY2F0Y2g6ICggZXJyb3IgKSAtPlxuICAgIEBlbmQoKVxuICAgIEBlcnJvciA9IGVycm9yXG5cblxuZXhwb3J0IHtcbiAgVGFsb3Ncbn0iLG51bGxdLCJuYW1lcyI6WyJUYWxvcyIsImNvbnN0cnVjdG9yIiwibWFjaGluZSIsIm1hY2hpbmUxIiwic3RhdGUiLCIkc3RhcnQiLCJjb250ZXh0IiwiZXJyb3IiLCJtYWtlIiwiX21hY2hpbmUiLCJNYWNoaW5lIiwiY2xvbmUiLCJlbmQiLCIkZW5kIiwiY2F0Y2giLCJNZXRhIiwibWl4aW4iLCJwcm90b3R5cGUiLCJnZXR0ZXJzIiwiZW5kZWQiLCJhdEVuZCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwicnVubmluZyIsImlzVHlwZSIsIlR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7K0JBbUNFQTs7O2VBQUFBOzs7bUVBbkNGOzhEQUNBO3lCQUNBO3dCQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSEEsSUFBQUE7QUFNTUEsUUFBQSxDQUFBO0lBQU4sTUFBQUE7UUFDRUMsWUFBYyxFQUFHQyxTQUFBQyxRQUFBLEVBQUosQ0FBQTtZQUFHLElBQUMsQ0FBQUQsT0FBQSxHQUFBQztZQUNmLElBQUMsQ0FBQUMsS0FBRCxHQUFTQyxjQUFBO1lBQ1QsSUFBQyxDQUFBQyxPQUFELEdBQVcsQ0FBQTtZQUNYLElBQUMsQ0FBQUMsS0FBRCxHQUFTO1FBSEU7UUFhTixPQUFOQyxLQUFRQyxTQUFGLEVBQUE7WUFDVCxJQUFBUDtZQUFJQSxVQUFVUSxnQkFBTyxDQUFDQyxLQUFSLENBQWNGO21CQUN4QixJQUFJVCxNQUFNO2dCQUFFRTtZQUFGO1FBRkw7UUFNUFUsTUFBSzttQkFDSCxJQUFDLENBQUFSLEtBQUQsR0FBU1MsWUFBQTtRQUROO1FBR0xDLE1BQVNQLEtBQUYsRUFBQTtZQUNMLElBQUMsQ0FBQUssR0FBRDttQkFDQSxJQUFDLENBQUFMLEtBQUQsR0FBU0E7UUFGSjtJQXZCVDs7SUFNRVEsV0FBS0MsS0FBTCxDQUFXaEIsTUFBQ2lCLFNBQVosRUFBZ0I7UUFDZEYsV0FBS0csT0FBTCxDQUNFO1lBQUFDLE9BQU87dUJBQUdDLElBQUFBLGFBQUEsRUFBTSxJQUFDLENBQUFoQixLQUFQO1lBQUg7WUFDUGlCLFNBQVM7dUJBQUcsSUFBQyxDQUFBRixLQUFELElBQVcsSUFBQSxDQUFBWixLQUFBLElBQUE7WUFBZDtZQUNUZSxTQUFTO3VCQUFHLElBQUMsQ0FBQUgsS0FBRCxJQUFVLElBQUEsQ0FBQVosS0FBQSxJQUFBO1lBQWI7WUFDVGdCLFNBQVM7dUJBQUcsQ0FBQyxJQUFDLENBQUFKLEtBQUE7WUFBTDtRQUhUO0tBRko7SUFZQW5CLE1BQUN3QixNQUFELEdBQVNDLE1BQUtELE1BQUwsQ0FBWXhCIn0=