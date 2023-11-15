"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Talos = void 0;
var Meta = _interopRequireWildcard(require("@dashkite/joy/metaclass"));
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var Value = _interopRequireWildcard(require("@dashkite/joy/value"));
var _states = require("../internal/states.js");
var _generic = require("@dashkite/joy/generic");
var _helpers = require("../helpers.js");
var _errors = require("./errors.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Talos, create, isError, isState;
isState = (0, _helpers.oneOf)([Type.isString, Type.isSymbol]);
isError = (0, _helpers.oneOf)([Type.isUndefined, _errors.TalosError.isType]);
create = (0, _generic.generic)({
  name: "talos create",
  default: function (...args) {
    throw new Error(`Talos.create: input is malformed ${JSON.stringify(args)}`);
  }
});
(0, _generic.generic)(create, isState, Type.isObject, isError, function (state, context, error) {
  return new Talos({
    state,
    context,
    error
  });
});
(0, _generic.generic)(create, function () {
  return create(_states.$start, {}, null);
});
(0, _generic.generic)(create, isState, Type.isObject, function (state, context) {
  return create(state, context, null);
});
(0, _generic.generic)(create, isState, function (state) {
  return create(state, {}, null);
});
(0, _generic.generic)(create, Type.isObject, function (context) {
  return create(_states.$start, context, null);
});
exports.Talos = Talos = function () {
  class Talos {
    constructor({
      state: state1,
      context: context1,
      error: error1
    }) {
      this.state = state1;
      this.context = context1;
      this.error = error1;
    }
    halt() {
      return this.state = _states.$halt;
    }
    throw(error) {
      this.halt();
      return this.error = error != null ? error : _errors.TalosError.create();
    }
    reset(state) {
      this.state = state != null ? state : _states.$start;
      this.context = {};
      return this.error = null;
    }
    clone() {
      var context;
      context = Value.clone(this.context);
      return new Talos({
        state: this.state,
        context,
        error: this.error
      });
    }
  }
  ;
  Meta.mixin(Talos.prototype, [Meta.getters({
    starting: function () {
      return (0, _states.atStart)(this.state);
    },
    halted: function () {
      return (0, _states.atHalt)(this.state);
    },
    success: function () {
      return this.halted && this.error == null;
    },
    failure: function () {
      return this.halted && this.error != null;
    },
    running: function () {
      return !this.halted;
    }
  })]);
  Talos.create = create;
  Talos.isType = Type.isType(Talos);
  return Talos;
}.call(void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL3RhbG9zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBLElBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUE7QUFDQSxJQUFBLElBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUE7QUFDQSxJQUFBLEtBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBQSxPQUFBO0FBRUEsSUFBQSxRQUFBLEdBQUEsT0FBQTtBQUFBLElBQUEsUUFBQSxHQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBQSxPQUFBO0FBQUEsU0FBQSx5QkFBQSxDQUFBLDZCQUFBLE9BQUEsbUJBQUEsQ0FBQSxPQUFBLE9BQUEsSUFBQSxDQUFBLE9BQUEsT0FBQSxZQUFBLHdCQUFBLFlBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQTtBQUFBLFNBQUEsd0JBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLFNBQUEsQ0FBQSxlQUFBLENBQUEsdUJBQUEsQ0FBQSx5QkFBQSxDQUFBLFdBQUEsT0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsd0JBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxTQUFBLFVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLElBQUEsTUFBQSxDQUFBLHdCQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsb0JBQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEtB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WSxLQUFaLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgVmFsdWUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdmFsdWVcIlxuaW1wb3J0IHsgJHN0YXJ0LCAkaGFsdCwgYXRTdGFydCwgYXRIYWx0IH0gZnJvbSBcIi4uL2ludGVybmFsL3N0YXRlc1wiXG5pbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5pbXBvcnQgeyBvbmVPZiB9IGZyb20gXCIuLi9oZWxwZXJzXCJcbmltcG9ydCB7IFRhbG9zRXJyb3IgfSBmcm9tIFwiLi9lcnJvcnNcIlxuXG5cbmlzU3RhdGUgPSBvbmVPZiBbXG4gIFR5cGUuaXNTdHJpbmdcbiAgVHlwZS5pc1N5bWJvbFxuXVxuXG5pc0Vycm9yID0gb25lT2YgW1xuICBUeXBlLmlzVW5kZWZpbmVkXG4gIFRhbG9zRXJyb3IuaXNUeXBlXG5dXG5cbmNyZWF0ZSA9IGdlbmVyaWMgXG4gIG5hbWU6IFwidGFsb3MgY3JlYXRlXCJcbiAgZGVmYXVsdDogKCBhcmdzLi4uICkgLT4gXG4gICAgdGhyb3cgbmV3IEVycm9yIFwiVGFsb3MuY3JlYXRlOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbmdlbmVyaWMgY3JlYXRlLCBpc1N0YXRlLCBUeXBlLmlzT2JqZWN0LCBpc0Vycm9yLCAoIHN0YXRlLCBjb250ZXh0LCBlcnJvciApIC0+XG4gIG5ldyBUYWxvcyB7IHN0YXRlLCBjb250ZXh0LCBlcnJvciB9XG5cbmdlbmVyaWMgY3JlYXRlLCAtPlxuICBjcmVhdGUgJHN0YXJ0LCB7fSwgbnVsbFxuXG5nZW5lcmljIGNyZWF0ZSwgaXNTdGF0ZSwgVHlwZS5pc09iamVjdCwgKCBzdGF0ZSwgY29udGV4dCApIC0+XG4gIGNyZWF0ZSBzdGF0ZSwgY29udGV4dCwgbnVsbFxuXG5nZW5lcmljIGNyZWF0ZSwgaXNTdGF0ZSwgKCBzdGF0ZSApIC0+XG4gIGNyZWF0ZSBzdGF0ZSwge30sIG51bGxcblxuZ2VuZXJpYyBjcmVhdGUsIFR5cGUuaXNPYmplY3QsICggY29udGV4dCApIC0+XG4gIGNyZWF0ZSAkc3RhcnQsIGNvbnRleHQsIG51bGxcblxuY2xhc3MgVGFsb3NcbiAgY29uc3RydWN0b3I6ICh7IEBzdGF0ZSwgQGNvbnRleHQsIEBlcnJvciB9KSAtPlxuXG4gIE1ldGEubWl4aW4gQDo6LCBbXG4gICAgTWV0YS5nZXR0ZXJzXG4gICAgICBzdGFydGluZzogLT4gYXRTdGFydCBAc3RhdGVcbiAgICAgIGhhbHRlZDogLT4gYXRIYWx0IEBzdGF0ZVxuICAgICAgc3VjY2VzczogLT4gQGhhbHRlZCAmJiAhQGVycm9yP1xuICAgICAgZmFpbHVyZTogLT4gQGhhbHRlZCAmJiBAZXJyb3I/XG4gICAgICBydW5uaW5nOiAtPiAhQGhhbHRlZFxuICBdXG5cbiAgQGNyZWF0ZTogY3JlYXRlXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuICBoYWx0OiAtPlxuICAgIEBzdGF0ZSA9ICRoYWx0XG5cbiAgdGhyb3c6ICggZXJyb3IgKSAtPlxuICAgIEBoYWx0KClcbiAgICBAZXJyb3IgPSBlcnJvciA/IFRhbG9zRXJyb3IuY3JlYXRlKClcblxuICByZXNldDogKCBzdGF0ZSApIC0+XG4gICAgQHN0YXRlID0gc3RhdGUgPyAkc3RhcnRcbiAgICBAY29udGV4dCA9IHt9XG4gICAgQGVycm9yID0gbnVsbFxuXG4gIGNsb25lOiAtPlxuICAgIGNvbnRleHQgPSBWYWx1ZS5jbG9uZSBAY29udGV4dFxuICAgIG5ldyBUYWxvcyB7IEBzdGF0ZSwgY29udGV4dCwgQGVycm9yIH1cbiAgICAgIFxuXG5leHBvcnQge1xuICBUYWxvc1xufSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=src/containers/talos.coffee