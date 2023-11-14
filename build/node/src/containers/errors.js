"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalosError = exports.MissingTransition = exports.InvalidState = exports.FailedRun = exports.FailedMove = void 0;
var Meta = _interopRequireWildcard(require("@dashkite/joy/metaclass"));
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
var _generic = require("@dashkite/joy/generic");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var FailedMove, FailedRun, InvalidState, MissingTransition, TalosError, _create, isError;
isError = Type.isKind(Error);
_create = function (type) {
  var create;
  create = (0, _generic.generic)({
    name: "error create",
    default: function (...args) {
      throw new Error(`TalosError.create: input is malformed ${JSON.stringify(args)}`);
    }
  });
  (0, _generic.generic)(create, function () {
    return new type({
      message: "talos encountered an error"
    });
  });
  (0, _generic.generic)(create, Type.isString, function (messsage) {
    return new type({
      message
    });
  });
  (0, _generic.generic)(create, isError, Type.isString, function (error, messsage) {
    return new type({
      message,
      error
    });
  });
  return create;
};
exports.TalosError = TalosError = function () {
  class TalosError extends Error {
    constructor({
      message
    }) {
      super(message);
    }
  }
  ;
  TalosError.create = _create(TalosError);
  TalosError.isType = Type.isType(TalosError);
  TalosError.isKind = Type.isKind(TalosError);
  return TalosError;
}.call(void 0);
exports.InvalidState = InvalidState = function () {
  class InvalidState extends TalosError {
    constructor({
      message
    }) {
      super(message);
    }
  }
  ;
  InvalidState.create = _create(InvalidState);
  InvalidState.isType = Type.isType(InvalidState);
  return InvalidState;
}.call(void 0);
exports.MissingTransition = MissingTransition = function () {
  class MissingTransition extends TalosError {
    constructor({
      message
    }) {
      super(message);
    }
  }
  ;
  MissingTransition.create = _create(MissingTransition);
  MissingTransition.isType = Type.isType(MissingTransition);
  return MissingTransition;
}.call(void 0);
exports.FailedRun = FailedRun = function () {
  class FailedRun extends TalosError {
    constructor({
      error,
      message
    }) {
      super(message);
      this.error = error;
    }
  }
  ;
  FailedRun.create = _create(FailedRun);
  FailedRun.isType = Type.isType(FailedRun);
  return FailedRun;
}.call(void 0);
exports.FailedMove = FailedMove = function () {
  class FailedMove extends TalosError {
    constructor({
      error,
      message
    }) {
      super(message);
      this.error = error;
    }
  }
  ;
  FailedMove.create = _create(FailedMove);
  FailedMove.isType = Type.isType(FailedMove);
  return FailedMove;
}.call(void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL2Vycm9ycy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQTtBQUFBLFNBQUEseUJBQUEsQ0FBQSw2QkFBQSxPQUFBLG1CQUFBLENBQUEsT0FBQSxPQUFBLElBQUEsQ0FBQSxPQUFBLE9BQUEsWUFBQSx3QkFBQSxZQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUE7QUFBQSxTQUFBLHdCQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsVUFBQSxTQUFBLENBQUEsZUFBQSxDQUFBLHVCQUFBLENBQUEseUJBQUEsQ0FBQSxXQUFBLE9BQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLHdCQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsU0FBQSxVQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxJQUFBLE1BQUEsQ0FBQSx3QkFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLG9CQUFBLENBQUEsSUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSx3QkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsWUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUE7QUFGQSxJQUFBLFVBQUEsRUFBQSxTQUFBLEVBQUEsWUFBQSxFQUFBLGlCQUFBLEVBQUEsVUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBO0FBSUEsT0FBQSxHQUFVLElBQUksQ0FBQyxNQUFMLENBQVksS0FBWixDQUFBO0FBRVYsT0FBQSxHQUFVLFNBQUEsQ0FBRSxJQUFGLEVBQUE7RUFDVixJQUFBLE1BQUE7RUFBRSxNQUFBLEdBQVMsSUFBQSxnQkFBQSxFQUNQO0lBQUEsSUFBQSxFQUFNLGNBQU47SUFDQSxPQUFBLEVBQVMsU0FBQSxDQUFBLEdBQUUsSUFBRixFQUFBO01BQ1AsTUFBTSxJQUFJLEtBQUosQ0FBVSx5Q0FBeUMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUF4RCxDQUFBLEVBQVYsQ0FBQTtJQURDO0VBRFQsQ0FETyxDQUFBO0VBS1QsSUFBQSxnQkFBQSxFQUFRLE1BQVIsRUFBZ0IsWUFBQTtXQUNkLElBQUksSUFBSixDQUFTO01BQUEsT0FBQSxFQUFTO0lBQVQsQ0FBVCxDQUFBO0VBRGMsQ0FBaEIsQ0FBQTtFQUdBLElBQUEsZ0JBQUEsRUFBUSxNQUFSLEVBQWdCLElBQUksQ0FBQyxRQUFyQixFQUErQixVQUFFLFFBQUYsRUFBQTtXQUM3QixJQUFJLElBQUosQ0FBUztNQUFFO0lBQUYsQ0FBVCxDQUFBO0VBRDZCLENBQS9CLENBQUE7RUFHQSxJQUFBLGdCQUFBLEVBQVEsTUFBUixFQUFnQixPQUFoQixFQUF5QixJQUFJLENBQUMsUUFBOUIsRUFBd0MsVUFBRSxLQUFGLEVBQVMsUUFBVCxFQUFBO1dBQ3RDLElBQUksSUFBSixDQUFTO01BQUUsT0FBRjtNQUFXO0lBQVgsQ0FBVCxDQUFBO0VBRHNDLENBQXhDLENBQUE7U0FHQSxNQUFBO0FBZlEsQ0FBQTtBQWlCSixPQUFBLENBQUEsVUFBQSxHQUFBLFVBQUEsR0FBQSxZQUFBO0VBQU4sTUFBQSxVQUFBLFNBQXlCLEtBQUEsQ0FBekI7SUFDRSxXQUFhLENBQUM7TUFBRTtJQUFGLENBQUQsRUFBQTtXQUNYLENBQU0sT0FBTixDQUFBO0lBRFc7RUFEZjtFQUFBO0VBSUUsVUFBQyxDQUFBLE1BQUQsR0FBUyxPQUFBLENBQVEsVUFBUixDQUFBO0VBQ1QsVUFBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLFVBQVosQ0FBQTtFQUNULFVBQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxVQUFaLENBQUE7OztBQUdMLE9BQUEsQ0FBQSxZQUFBLEdBQUEsWUFBQSxHQUFBLFlBQUE7RUFBTixNQUFBLFlBQUEsU0FBMkIsVUFBQSxDQUEzQjtJQUNFLFdBQWEsQ0FBQztNQUFFO0lBQUYsQ0FBRCxFQUFBO1dBQ1gsQ0FBTSxPQUFOLENBQUE7SUFEVztFQURmO0VBQUE7RUFJRSxZQUFDLENBQUEsTUFBRCxHQUFTLE9BQUEsQ0FBUSxZQUFSLENBQUE7RUFDVCxZQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksWUFBWixDQUFBOzs7QUFFTCxPQUFBLENBQUEsaUJBQUEsR0FBQSxpQkFBQSxHQUFBLFlBQUE7RUFBTixNQUFBLGlCQUFBLFNBQWdDLFVBQUEsQ0FBaEM7SUFDRSxXQUFhLENBQUM7TUFBRTtJQUFGLENBQUQsRUFBQTtXQUNYLENBQU0sT0FBTixDQUFBO0lBRFc7RUFEZjtFQUFBO0VBSUUsaUJBQUMsQ0FBQSxNQUFELEdBQVMsT0FBQSxDQUFRLGlCQUFSLENBQUE7RUFDVCxpQkFBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLGlCQUFaLENBQUE7OztBQUVMLE9BQUEsQ0FBQSxTQUFBLEdBQUEsU0FBQSxHQUFBLFlBQUE7RUFBTixNQUFBLFNBQUEsU0FBd0IsVUFBQSxDQUF4QjtJQUNFLFdBQWEsQ0FBQztNQUFFLEtBQUY7TUFBUztJQUFULENBQUQsRUFBQTtXQUNYLENBQU0sT0FBTixDQUFBO01BQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxLQUFBO0lBRkU7RUFEZjtFQUFBO0VBS0UsU0FBQyxDQUFBLE1BQUQsR0FBUyxPQUFBLENBQVEsU0FBUixDQUFBO0VBQ1QsU0FBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLFNBQVosQ0FBQTs7O0FBRUwsT0FBQSxDQUFBLFVBQUEsR0FBQSxVQUFBLEdBQUEsWUFBQTtFQUFOLE1BQUEsVUFBQSxTQUF5QixVQUFBLENBQXpCO0lBQ0UsV0FBYSxDQUFDO01BQUUsS0FBRjtNQUFTO0lBQVQsQ0FBRCxFQUFBO1dBQ1gsQ0FBTSxPQUFOLENBQUE7TUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLEtBQUE7SUFGRTtFQURmO0VBQUE7RUFLRSxVQUFDLENBQUEsTUFBRCxHQUFTLE9BQUEsQ0FBUSxVQUFSLENBQUE7RUFDVCxVQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksVUFBWixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcblxuaXNFcnJvciA9IFR5cGUuaXNLaW5kIEVycm9yXG5cbl9jcmVhdGUgPSAoIHR5cGUgKSAtPlxuICBjcmVhdGUgPSBnZW5lcmljIFxuICAgIG5hbWU6IFwiZXJyb3IgY3JlYXRlXCJcbiAgICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICAgIHRocm93IG5ldyBFcnJvciBcIlRhbG9zRXJyb3IuY3JlYXRlOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbiAgZ2VuZXJpYyBjcmVhdGUsIC0+XG4gICAgbmV3IHR5cGUgbWVzc2FnZTogXCJ0YWxvcyBlbmNvdW50ZXJlZCBhbiBlcnJvclwiXG5cbiAgZ2VuZXJpYyBjcmVhdGUsIFR5cGUuaXNTdHJpbmcsICggbWVzc3NhZ2UgKSAtPlxuICAgIG5ldyB0eXBlIHsgbWVzc2FnZSB9XG5cbiAgZ2VuZXJpYyBjcmVhdGUsIGlzRXJyb3IsIFR5cGUuaXNTdHJpbmcsICggZXJyb3IsIG1lc3NzYWdlICkgLT5cbiAgICBuZXcgdHlwZSB7IG1lc3NhZ2UsIGVycm9yIH1cblxuICBjcmVhdGVcblxuY2xhc3MgVGFsb3NFcnJvciBleHRlbmRzIEVycm9yXG4gIGNvbnN0cnVjdG9yOiAoeyBtZXNzYWdlIH0pIC0+XG4gICAgc3VwZXIgbWVzc2FnZVxuXG4gIEBjcmVhdGU6IF9jcmVhdGUgQFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG4gIEBpc0tpbmQ6IFR5cGUuaXNLaW5kIEBcblxuXG5jbGFzcyBJbnZhbGlkU3RhdGUgZXh0ZW5kcyBUYWxvc0Vycm9yXG4gIGNvbnN0cnVjdG9yOiAoeyBtZXNzYWdlIH0pIC0+XG4gICAgc3VwZXIgbWVzc2FnZVxuXG4gIEBjcmVhdGU6IF9jcmVhdGUgQFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbmNsYXNzIE1pc3NpbmdUcmFuc2l0aW9uIGV4dGVuZHMgVGFsb3NFcnJvclxuICBjb25zdHJ1Y3RvcjogKHsgbWVzc2FnZSB9KSAtPlxuICAgIHN1cGVyIG1lc3NhZ2VcblxuICBAY3JlYXRlOiBfY3JlYXRlIEBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG5jbGFzcyBGYWlsZWRSdW4gZXh0ZW5kcyBUYWxvc0Vycm9yXG4gIGNvbnN0cnVjdG9yOiAoeyBlcnJvciwgbWVzc2FnZSB9KSAtPlxuICAgIHN1cGVyIG1lc3NhZ2VcbiAgICBAZXJyb3IgPSBlcnJvclxuXG4gIEBjcmVhdGU6IF9jcmVhdGUgQFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbmNsYXNzIEZhaWxlZE1vdmUgZXh0ZW5kcyBUYWxvc0Vycm9yXG4gIGNvbnN0cnVjdG9yOiAoeyBlcnJvciwgbWVzc2FnZSB9KSAtPlxuICAgIHN1cGVyIG1lc3NhZ2VcbiAgICBAZXJyb3IgPSBlcnJvclxuXG4gIEBjcmVhdGU6IF9jcmVhdGUgQFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cblxuZXhwb3J0IHtcbiAgVGFsb3NFcnJvclxuICBJbnZhbGlkU3RhdGVcbiAgTWlzc2luZ1RyYW5zaXRpb25cbiAgRmFpbGVkUnVuXG4gIEZhaWxlZE1vdmVcbn0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/containers/errors.coffee