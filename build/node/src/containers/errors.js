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
    TalosError: function() {
        return TalosError;
    },
    InvalidState: function() {
        return InvalidState;
    },
    MissingTransition: function() {
        return MissingTransition;
    },
    FailedRun: function() {
        return FailedRun;
    },
    FailedMove: function() {
        return FailedMove;
    }
});
const _metaclass = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/metaclass"));
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _generic = require("@dashkite/joy/generic");
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
var FailedMove, FailedRun, InvalidState, MissingTransition, TalosError, _make, isError;
isError = _type.isKind(Error);
_make = function(type) {
    var make;
    make = (0, _generic.generic)({
        name: "error make",
        default: function(...args) {
            throw new Error(`TalosError.make: input is malformed ${JSON.stringify(args)}`);
        }
    });
    (0, _generic.generic)(make, function() {
        return new type({
            message: "talos encountered an error"
        });
    });
    (0, _generic.generic)(make, _type.isString, function(message) {
        return new type({
            message
        });
    });
    (0, _generic.generic)(make, isError, _type.isString, function(error, message) {
        return new type({
            message,
            error
        });
    });
    return make;
};
TalosError = (function() {
    class TalosError extends Error {
        constructor({ message }){
            super(message);
        }
    }
    ;
    TalosError.make = _make(TalosError);
    TalosError.isType = _type.isType(TalosError);
    TalosError.isKind = _type.isKind(TalosError);
    return TalosError;
}).call(void 0);
InvalidState = (function() {
    class InvalidState extends TalosError {
        constructor({ message }){
            super(message);
        }
    }
    ;
    InvalidState.make = _make(InvalidState);
    InvalidState.isType = _type.isType(InvalidState);
    return InvalidState;
}).call(void 0);
MissingTransition = (function() {
    class MissingTransition extends TalosError {
        constructor({ message }){
            super(message);
        }
    }
    ;
    MissingTransition.make = _make(MissingTransition);
    MissingTransition.isType = _type.isType(MissingTransition);
    return MissingTransition;
}).call(void 0);
FailedRun = (function() {
    class FailedRun extends TalosError {
        constructor({ error, message }){
            super(message);
            this.error = error;
        }
    }
    ;
    FailedRun.make = _make(FailedRun);
    FailedRun.isType = _type.isType(FailedRun);
    return FailedRun;
}).call(void 0);
FailedMove = (function() {
    class FailedMove extends TalosError {
        constructor({ error, message }){
            super(message);
            this.error = error;
        }
    }
    ;
    FailedMove.make = _make(FailedMove);
    FailedMove.isType = _type.isType(FailedMove);
    return FailedMove;
}).call(void 0);
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvY29udGFpbmVycy9lcnJvcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsVUFBQSxFQUFBLFNBQUEsRUFBQSxZQUFBLEVBQUEsaUJBQUEsRUFBQSxVQUFBLEVBQUEsS0FBQSxFQUFBOztBQUFBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsT0FBVDtDQUFBLE1BQUE7O0FBRUEsT0FBQSxHQUFVLElBQUksQ0FBQyxNQUFMLENBQVksS0FBWjs7QUFFVixLQUFBLEdBQVEsUUFBQSxDQUFFLElBQUYsQ0FBQTtBQUNSLE1BQUE7RUFBRSxJQUFBLEdBQU8sT0FBQSxDQUNMO0lBQUEsSUFBQSxFQUFNLFlBQU47SUFDQSxPQUFBLEVBQVMsUUFBQSxDQUFBLEdBQUUsSUFBRixDQUFBO01BQ1AsTUFBTSxJQUFJLEtBQUosQ0FBVSxDQUFBLG9DQUFBLENBQUEsQ0FBdUMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLENBQXZDLENBQUEsQ0FBVjtJQURDO0VBRFQsQ0FESztFQUtQLE9BQUEsQ0FBUSxJQUFSLEVBQWMsUUFBQSxDQUFBLENBQUE7V0FDWixJQUFJLElBQUosQ0FBUztNQUFBLE9BQUEsRUFBUztJQUFULENBQVQ7RUFEWSxDQUFkO0VBR0EsT0FBQSxDQUFRLElBQVIsRUFBYyxJQUFJLENBQUMsUUFBbkIsRUFBNkIsUUFBQSxDQUFFLE9BQUYsQ0FBQTtXQUMzQixJQUFJLElBQUosQ0FBUyxDQUFFLE9BQUYsQ0FBVDtFQUQyQixDQUE3QjtFQUdBLE9BQUEsQ0FBUSxJQUFSLEVBQWMsT0FBZCxFQUF1QixJQUFJLENBQUMsUUFBNUIsRUFBc0MsUUFBQSxDQUFFLEtBQUYsRUFBUyxPQUFULENBQUE7V0FDcEMsSUFBSSxJQUFKLENBQVMsQ0FBRSxPQUFGLEVBQVcsS0FBWCxDQUFUO0VBRG9DLENBQXRDO1NBR0E7QUFmTTs7QUFpQkY7RUFBTixNQUFBLFdBQUEsUUFBeUIsTUFBekI7SUFDRSxXQUFhLENBQUMsQ0FBRSxPQUFGLENBQUQsQ0FBQTtXQUNYLENBQU0sT0FBTjtJQURXOztFQURmOztFQUlFLFVBQUMsQ0FBQSxJQUFELEdBQU8sS0FBQSxDQUFNLFVBQU47O0VBQ1AsVUFBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLFVBQVo7O0VBQ1QsVUFBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLFVBQVo7Ozs7OztBQUdMO0VBQU4sTUFBQSxhQUFBLFFBQTJCLFdBQTNCO0lBQ0UsV0FBYSxDQUFDLENBQUUsT0FBRixDQUFELENBQUE7V0FDWCxDQUFNLE9BQU47SUFEVzs7RUFEZjs7RUFJRSxZQUFDLENBQUEsSUFBRCxHQUFPLEtBQUEsQ0FBTSxZQUFOOztFQUNQLFlBQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxZQUFaOzs7Ozs7QUFFTDtFQUFOLE1BQUEsa0JBQUEsUUFBZ0MsV0FBaEM7SUFDRSxXQUFhLENBQUMsQ0FBRSxPQUFGLENBQUQsQ0FBQTtXQUNYLENBQU0sT0FBTjtJQURXOztFQURmOztFQUlFLGlCQUFDLENBQUEsSUFBRCxHQUFPLEtBQUEsQ0FBTSxpQkFBTjs7RUFDUCxpQkFBQyxDQUFBLE1BQUQsR0FBUyxJQUFJLENBQUMsTUFBTCxDQUFZLGlCQUFaOzs7Ozs7QUFFTDtFQUFOLE1BQUEsVUFBQSxRQUF3QixXQUF4QjtJQUNFLFdBQWEsQ0FBQyxDQUFFLEtBQUYsRUFBUyxPQUFULENBQUQsQ0FBQTtXQUNYLENBQU0sT0FBTjtNQUNBLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFGRTs7RUFEZjs7RUFLRSxTQUFDLENBQUEsSUFBRCxHQUFPLEtBQUEsQ0FBTSxTQUFOOztFQUNQLFNBQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxTQUFaOzs7Ozs7QUFFTDtFQUFOLE1BQUEsV0FBQSxRQUF5QixXQUF6QjtJQUNFLFdBQWEsQ0FBQyxDQUFFLEtBQUYsRUFBUyxPQUFULENBQUQsQ0FBQTtXQUNYLENBQU0sT0FBTjtNQUNBLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFGRTs7RUFEZjs7RUFLRSxVQUFDLENBQUEsSUFBRCxHQUFPLEtBQUEsQ0FBTSxVQUFOOztFQUNQLFVBQUMsQ0FBQSxNQUFELEdBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBWSxVQUFaOzs7Ozs7QUFHWCxPQUFBO0VBQ0UsVUFERjtFQUVFLFlBRkY7RUFHRSxpQkFIRjtFQUlFLFNBSkY7RUFLRSxVQUxGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCB7IGdlbmVyaWMgfSBmcm9tIFwiQGRhc2hraXRlL2pveS9nZW5lcmljXCJcblxuaXNFcnJvciA9IFR5cGUuaXNLaW5kIEVycm9yXG5cbl9tYWtlID0gKCB0eXBlICkgLT5cbiAgbWFrZSA9IGdlbmVyaWMgXG4gICAgbmFtZTogXCJlcnJvciBtYWtlXCJcbiAgICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICAgIHRocm93IG5ldyBFcnJvciBcIlRhbG9zRXJyb3IubWFrZTogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG4gIGdlbmVyaWMgbWFrZSwgLT5cbiAgICBuZXcgdHlwZSBtZXNzYWdlOiBcInRhbG9zIGVuY291bnRlcmVkIGFuIGVycm9yXCJcblxuICBnZW5lcmljIG1ha2UsIFR5cGUuaXNTdHJpbmcsICggbWVzc2FnZSApIC0+XG4gICAgbmV3IHR5cGUgeyBtZXNzYWdlIH1cblxuICBnZW5lcmljIG1ha2UsIGlzRXJyb3IsIFR5cGUuaXNTdHJpbmcsICggZXJyb3IsIG1lc3NhZ2UgKSAtPlxuICAgIG5ldyB0eXBlIHsgbWVzc2FnZSwgZXJyb3IgfVxuXG4gIG1ha2VcblxuY2xhc3MgVGFsb3NFcnJvciBleHRlbmRzIEVycm9yXG4gIGNvbnN0cnVjdG9yOiAoeyBtZXNzYWdlIH0pIC0+XG4gICAgc3VwZXIgbWVzc2FnZVxuXG4gIEBtYWtlOiBfbWFrZSBAXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcbiAgQGlzS2luZDogVHlwZS5pc0tpbmQgQFxuXG5cbmNsYXNzIEludmFsaWRTdGF0ZSBleHRlbmRzIFRhbG9zRXJyb3JcbiAgY29uc3RydWN0b3I6ICh7IG1lc3NhZ2UgfSkgLT5cbiAgICBzdXBlciBtZXNzYWdlXG5cbiAgQG1ha2U6IF9tYWtlIEBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG5jbGFzcyBNaXNzaW5nVHJhbnNpdGlvbiBleHRlbmRzIFRhbG9zRXJyb3JcbiAgY29uc3RydWN0b3I6ICh7IG1lc3NhZ2UgfSkgLT5cbiAgICBzdXBlciBtZXNzYWdlXG5cbiAgQG1ha2U6IF9tYWtlIEBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG5jbGFzcyBGYWlsZWRSdW4gZXh0ZW5kcyBUYWxvc0Vycm9yXG4gIGNvbnN0cnVjdG9yOiAoeyBlcnJvciwgbWVzc2FnZSB9KSAtPlxuICAgIHN1cGVyIG1lc3NhZ2VcbiAgICBAZXJyb3IgPSBlcnJvclxuXG4gIEBtYWtlOiBfbWFrZSBAXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuY2xhc3MgRmFpbGVkTW92ZSBleHRlbmRzIFRhbG9zRXJyb3JcbiAgY29uc3RydWN0b3I6ICh7IGVycm9yLCBtZXNzYWdlIH0pIC0+XG4gICAgc3VwZXIgbWVzc2FnZVxuICAgIEBlcnJvciA9IGVycm9yXG5cbiAgQG1ha2U6IF9tYWtlIEBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG5cbmV4cG9ydCB7XG4gIFRhbG9zRXJyb3JcbiAgSW52YWxpZFN0YXRlXG4gIE1pc3NpbmdUcmFuc2l0aW9uXG4gIEZhaWxlZFJ1blxuICBGYWlsZWRNb3ZlXG59Il19
 //# sourceURL=/@dashkite/talos/src/containers/errors.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2NvbnRhaW5lcnMvZXJyb3JzLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuXG5pc0Vycm9yID0gVHlwZS5pc0tpbmQgRXJyb3JcblxuX21ha2UgPSAoIHR5cGUgKSAtPlxuICBtYWtlID0gZ2VuZXJpYyBcbiAgICBuYW1lOiBcImVycm9yIG1ha2VcIlxuICAgIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVGFsb3NFcnJvci5tYWtlOiBpbnB1dCBpcyBtYWxmb3JtZWQgI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbiAgZ2VuZXJpYyBtYWtlLCAtPlxuICAgIG5ldyB0eXBlIG1lc3NhZ2U6IFwidGFsb3MgZW5jb3VudGVyZWQgYW4gZXJyb3JcIlxuXG4gIGdlbmVyaWMgbWFrZSwgVHlwZS5pc1N0cmluZywgKCBtZXNzYWdlICkgLT5cbiAgICBuZXcgdHlwZSB7IG1lc3NhZ2UgfVxuXG4gIGdlbmVyaWMgbWFrZSwgaXNFcnJvciwgVHlwZS5pc1N0cmluZywgKCBlcnJvciwgbWVzc2FnZSApIC0+XG4gICAgbmV3IHR5cGUgeyBtZXNzYWdlLCBlcnJvciB9XG5cbiAgbWFrZVxuXG5jbGFzcyBUYWxvc0Vycm9yIGV4dGVuZHMgRXJyb3JcbiAgY29uc3RydWN0b3I6ICh7IG1lc3NhZ2UgfSkgLT5cbiAgICBzdXBlciBtZXNzYWdlXG5cbiAgQG1ha2U6IF9tYWtlIEBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuICBAaXNLaW5kOiBUeXBlLmlzS2luZCBAXG5cblxuY2xhc3MgSW52YWxpZFN0YXRlIGV4dGVuZHMgVGFsb3NFcnJvclxuICBjb25zdHJ1Y3RvcjogKHsgbWVzc2FnZSB9KSAtPlxuICAgIHN1cGVyIG1lc3NhZ2VcblxuICBAbWFrZTogX21ha2UgQFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbmNsYXNzIE1pc3NpbmdUcmFuc2l0aW9uIGV4dGVuZHMgVGFsb3NFcnJvclxuICBjb25zdHJ1Y3RvcjogKHsgbWVzc2FnZSB9KSAtPlxuICAgIHN1cGVyIG1lc3NhZ2VcblxuICBAbWFrZTogX21ha2UgQFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cbmNsYXNzIEZhaWxlZFJ1biBleHRlbmRzIFRhbG9zRXJyb3JcbiAgY29uc3RydWN0b3I6ICh7IGVycm9yLCBtZXNzYWdlIH0pIC0+XG4gICAgc3VwZXIgbWVzc2FnZVxuICAgIEBlcnJvciA9IGVycm9yXG5cbiAgQG1ha2U6IF9tYWtlIEBcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG5jbGFzcyBGYWlsZWRNb3ZlIGV4dGVuZHMgVGFsb3NFcnJvclxuICBjb25zdHJ1Y3RvcjogKHsgZXJyb3IsIG1lc3NhZ2UgfSkgLT5cbiAgICBzdXBlciBtZXNzYWdlXG4gICAgQGVycm9yID0gZXJyb3JcblxuICBAbWFrZTogX21ha2UgQFxuICBAaXNUeXBlOiBUeXBlLmlzVHlwZSBAXG5cblxuZXhwb3J0IHtcbiAgVGFsb3NFcnJvclxuICBJbnZhbGlkU3RhdGVcbiAgTWlzc2luZ1RyYW5zaXRpb25cbiAgRmFpbGVkUnVuXG4gIEZhaWxlZE1vdmVcbn0iLG51bGxdLCJuYW1lcyI6WyJUYWxvc0Vycm9yIiwiSW52YWxpZFN0YXRlIiwiTWlzc2luZ1RyYW5zaXRpb24iLCJGYWlsZWRSdW4iLCJGYWlsZWRNb3ZlIiwiX21ha2UiLCJpc0Vycm9yIiwiVHlwZSIsImlzS2luZCIsIkVycm9yIiwidHlwZSIsIm1ha2UiLCJnZW5lcmljIiwibmFtZSIsImRlZmF1bHQiLCJhcmdzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1lc3NhZ2UiLCJpc1N0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