"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnknownState = exports.UnknownNext = exports.TalosError = exports.NextError = exports.ActionError = void 0;
var Meta = _interopRequireWildcard(require("@dashkite/joy/metaclass"));
var Type = _interopRequireWildcard(require("@dashkite/joy/type"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var ActionError, NextError, TalosError, UnknownNext, UnknownState;
exports.TalosError = TalosError = function () {
  class TalosError extends Error {
    constructor({
      message
    }) {
      super(message);
    }
    static create(options) {
      return new TalosError(options);
    }
  }
  ;
  TalosError.isType = Type.isType(TalosError);
  TalosError.isKind = Type.isKind(TalosError);
  return TalosError;
}.call(void 0);
exports.UnknownState = UnknownState = function () {
  class UnknownState extends TalosError {
    constructor() {
      super({
        message: "talos cannot find the current state in this graph"
      });
    }
    static create() {
      return new UnknownState();
    }
  }
  ;
  UnknownState.isType = Type.isType(UnknownState);
  return UnknownState;
}.call(void 0);
exports.UnknownNext = UnknownNext = function () {
  class UnknownNext extends TalosError {
    constructor({
      vertex
    }) {
      super({
        message: "talos cannot determine the next state from this vertex"
      });
      this.vertex = vertex;
    }
    static create(options) {
      return new UnknownNext(options);
    }
  }
  ;
  UnknownNext.isType = Type.isType(UnknownNext);
  return UnknownNext;
}.call(void 0);
exports.ActionError = ActionError = function () {
  class ActionError extends TalosError {
    constructor({
      error
    }) {
      super({
        message: "talos encountered an error while running this action"
      });
      this.error = error;
    }
    static create(options) {
      return new ActionError(options);
    }
  }
  ;
  ActionError.isType = Type.isType(ActionError);
  return ActionError;
}.call(void 0);
exports.NextError = NextError = function () {
  class NextError extends TalosError {
    constructor({
      error
    }) {
      super({
        message: "talos encountered an error while resolving next state"
      });
      this.error = error;
    }
    static create(options) {
      return new NextError(options);
    }
  }
  ;
  NextError.isType = Type.isType(NextError);
  return NextError;
}.call(void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL2Vycm9ycy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxJQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBO0FBQUEsU0FBQSx5QkFBQSxDQUFBLDZCQUFBLE9BQUEsbUJBQUEsQ0FBQSxPQUFBLE9BQUEsSUFBQSxDQUFBLE9BQUEsT0FBQSxZQUFBLHdCQUFBLFlBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQTtBQUFBLFNBQUEsd0JBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLFNBQUEsQ0FBQSxlQUFBLENBQUEsdUJBQUEsQ0FBQSx5QkFBQSxDQUFBLFdBQUEsT0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsd0JBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxTQUFBLFVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLElBQUEsTUFBQSxDQUFBLHdCQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsb0JBQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxJQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQTtBQURBLElBQUEsV0FBQSxFQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUE7QUFJTSxPQUFBLENBQUEsVUFBQSxHQUFBLFVBQUEsR0FBQSxZQUFBO0VBQU4sTUFBQSxVQUFBLFNBQXlCLEtBQUEsQ0FBekI7SUFDRSxXQUFhLENBQUM7TUFBRTtJQUFGLENBQUQsRUFBQTtXQUNYLENBQU0sT0FBTixDQUFBO0lBRFc7SUFHSixPQUFSLE1BQVEsQ0FBRSxPQUFGLEVBQUE7YUFDUCxJQUFJLFVBQUosQ0FBZSxPQUFmLENBQUE7SUFETztFQUpYO0VBQUE7RUFPRSxVQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksVUFBWixDQUFBO0VBQ1QsVUFBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLFVBQVosQ0FBQTs7O0FBR0wsT0FBQSxDQUFBLFlBQUEsR0FBQSxZQUFBLEdBQUEsWUFBQTtFQUFOLE1BQUEsWUFBQSxTQUEyQixVQUFBLENBQTNCO0lBQ0UsV0FBYSxDQUFBLEVBQUE7V0FDWCxDQUFNO1FBQUEsT0FBQSxFQUFTO01BQVQsQ0FBTixDQUFBO0lBRFc7SUFHSixPQUFSLE1BQVEsQ0FBQSxFQUFBO2FBQ1AsSUFBSSxZQUFKLENBQUEsQ0FBQTtJQURPO0VBSlg7RUFBQTtFQU9FLFlBQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxZQUFaLENBQUE7OztBQUdMLE9BQUEsQ0FBQSxXQUFBLEdBQUEsV0FBQSxHQUFBLFlBQUE7RUFBTixNQUFBLFdBQUEsU0FBMEIsVUFBQSxDQUExQjtJQUNFLFdBQWEsQ0FBQztNQUFFO0lBQUYsQ0FBRCxFQUFBO1dBQ1gsQ0FBTTtRQUFBLE9BQUEsRUFBUztNQUFULENBQU4sQ0FBQTtNQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBQTtJQUZDO0lBSUosT0FBUixNQUFRLENBQUUsT0FBRixFQUFBO2FBQ1AsSUFBSSxXQUFKLENBQWdCLE9BQWhCLENBQUE7SUFETztFQUxYO0VBQUE7RUFRRSxXQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksV0FBWixDQUFBOzs7QUFHTCxPQUFBLENBQUEsV0FBQSxHQUFBLFdBQUEsR0FBQSxZQUFBO0VBQU4sTUFBQSxXQUFBLFNBQTBCLFVBQUEsQ0FBMUI7SUFDRSxXQUFhLENBQUM7TUFBRTtJQUFGLENBQUQsRUFBQTtXQUNYLENBQU07UUFBQSxPQUFBLEVBQVM7TUFBVCxDQUFOLENBQUE7TUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLEtBQUE7SUFGRTtJQUlKLE9BQVIsTUFBUSxDQUFFLE9BQUYsRUFBQTthQUNQLElBQUksV0FBSixDQUFnQixPQUFoQixDQUFBO0lBRE87RUFMWDtFQUFBO0VBUUUsV0FBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLFdBQVosQ0FBQTs7O0FBR0wsT0FBQSxDQUFBLFNBQUEsR0FBQSxTQUFBLEdBQUEsWUFBQTtFQUFOLE1BQUEsU0FBQSxTQUF3QixVQUFBLENBQXhCO0lBQ0UsV0FBYSxDQUFDO01BQUU7SUFBRixDQUFELEVBQUE7V0FDWCxDQUFNO1FBQUEsT0FBQSxFQUFTO01BQVQsQ0FBTixDQUFBO01BQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxLQUFBO0lBRkU7SUFJSixPQUFSLE1BQVEsQ0FBRSxPQUFGLEVBQUE7YUFDUCxJQUFJLFNBQUosQ0FBYyxPQUFkLENBQUE7SUFETztFQUxYO0VBQUE7RUFRRSxTQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksU0FBWixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcblxuXG5jbGFzcyBUYWxvc0Vycm9yIGV4dGVuZHMgRXJyb3JcbiAgY29uc3RydWN0b3I6ICh7IG1lc3NhZ2UgfSkgLT5cbiAgICBzdXBlciBtZXNzYWdlXG5cbiAgQGNyZWF0ZTogKCBvcHRpb25zICkgLT5cbiAgICBuZXcgVGFsb3NFcnJvciBvcHRpb25zXG5cbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuICBAaXNLaW5kOiBUeXBlLmlzS2luZCBAXG5cblxuY2xhc3MgVW5rbm93blN0YXRlIGV4dGVuZHMgVGFsb3NFcnJvclxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlciBtZXNzYWdlOiBcInRhbG9zIGNhbm5vdCBmaW5kIHRoZSBjdXJyZW50IHN0YXRlIGluIHRoaXMgZ3JhcGhcIlxuXG4gIEBjcmVhdGU6IC0+XG4gICAgbmV3IFVua25vd25TdGF0ZSgpXG5cbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG5cbmNsYXNzIFVua25vd25OZXh0IGV4dGVuZHMgVGFsb3NFcnJvclxuICBjb25zdHJ1Y3RvcjogKHsgdmVydGV4IH0pIC0+XG4gICAgc3VwZXIgbWVzc2FnZTogXCJ0YWxvcyBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBuZXh0IHN0YXRlIGZyb20gdGhpcyB2ZXJ0ZXhcIlxuICAgIEB2ZXJ0ZXggPSB2ZXJ0ZXhcblxuICBAY3JlYXRlOiAoIG9wdGlvbnMgKSAtPlxuICAgIG5ldyBVbmtub3duTmV4dCBvcHRpb25zXG5cbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG5cbmNsYXNzIEFjdGlvbkVycm9yIGV4dGVuZHMgVGFsb3NFcnJvclxuICBjb25zdHJ1Y3RvcjogKHsgZXJyb3IgfSkgLT5cbiAgICBzdXBlciBtZXNzYWdlOiBcInRhbG9zIGVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIHJ1bm5pbmcgdGhpcyBhY3Rpb25cIlxuICAgIEBlcnJvciA9IGVycm9yXG5cbiAgQGNyZWF0ZTogKCBvcHRpb25zICkgLT5cbiAgICBuZXcgQWN0aW9uRXJyb3Igb3B0aW9uc1xuXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuXG5jbGFzcyBOZXh0RXJyb3IgZXh0ZW5kcyBUYWxvc0Vycm9yXG4gIGNvbnN0cnVjdG9yOiAoeyBlcnJvciB9KSAtPlxuICAgIHN1cGVyIG1lc3NhZ2U6IFwidGFsb3MgZW5jb3VudGVyZWQgYW4gZXJyb3Igd2hpbGUgcmVzb2x2aW5nIG5leHQgc3RhdGVcIlxuICAgIEBlcnJvciA9IGVycm9yXG5cbiAgQGNyZWF0ZTogKCBvcHRpb25zICkgLT5cbiAgICBuZXcgTmV4dEVycm9yIG9wdGlvbnNcblxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cblxuZXhwb3J0IHtcbiAgVGFsb3NFcnJvclxuICBVbmtub3duU3RhdGVcbiAgVW5rbm93bk5leHRcbiAgQWN0aW9uRXJyb3JcbiAgTmV4dEVycm9yXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/containers/errors.coffee