"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "basic", {
    enumerable: true,
    get: function() {
        return(// console.log machine
        test);
    }
});
const _src = require("../../src");
const _helpers = /*#__PURE__*/ _interop_require_wildcard(require("../helpers"));
const _nodeutil = /*#__PURE__*/ _interop_require_default(require("node:util"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
var A, B, C, target, test;
A = function() {
    return "beta";
};
B = function() {
    return "gamma";
};
C = function() {
    return "delta";
};
target = [
    {
        when: A
    }
];
test = function() {
    return [
        _helpers.test("edge expansion", _helpers.target("edge", function() {
            var machine;
            machine = _src.Machine.make({
                start: {
                    beta: true
                },
                beta: {
                    ignore: false,
                    gamma: "gamma"
                },
                gamma: {
                    delta: function(talos, event) {
                        return event === "delta";
                    }
                },
                delta: {
                    epsilon: {
                        when: "epsilon",
                        move: "omicron"
                    }
                },
                ignore: {
                    doesnt: "matter"
                },
                omicron: [
                    {
                        when: false,
                        move: "eta"
                    },
                    {
                        when: true,
                        move: "rho"
                    }
                ],
                rho: function(x) {
                    return console.log("running default");
                }
            });
            return console.log(_nodeutil.default.inspect(machine, {
                depth: null,
                colors: true
            }));
        }))
    ];
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L21hY2hpbmUvYmFzaWMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsTUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUNBLE9BQU8sSUFBUCxNQUFBOztBQUVBLENBQUEsR0FBSSxRQUFBLENBQUEsQ0FBQTtTQUFHO0FBQUg7O0FBQ0osQ0FBQSxHQUFJLFFBQUEsQ0FBQSxDQUFBO1NBQUc7QUFBSDs7QUFDSixDQUFBLEdBQUksUUFBQSxDQUFBLENBQUE7U0FBRztBQUFIOztBQUVKLE1BQUEsR0FBUztFQUNMO0lBQUEsSUFBQSxFQUFNO0VBQU4sQ0FESzs7O0FBS1QsSUFBQSxHQUFPLFFBQUEsQ0FBQSxDQUFBO1NBQ0w7SUFDRSxDQUFDLENBQUMsSUFBRixDQUFPLGdCQUFQO0lBQXlCLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBVDtJQUFpQixRQUFBLENBQUEsQ0FBQTtBQUM5QyxVQUFBO01BQU0sT0FBQSxHQUFVLE9BQU8sQ0FBQyxJQUFSLENBQ1I7UUFBQSxLQUFBLEVBQ0U7VUFBQSxJQUFBLEVBQU07UUFBTixDQURGO1FBRUEsSUFBQSxFQUNFO1VBQUEsTUFBQSxFQUFRLEtBQVI7VUFDQSxLQUFBLEVBQU87UUFEUCxDQUhGO1FBS0EsS0FBQSxFQUNFO1VBQUEsS0FBQSxFQUFPLFFBQUEsQ0FBRSxLQUFGO0lBQVMsS0FBVCxDQUFBO21CQUFvQixLQUFBLEtBQVM7VUFBN0I7UUFBUCxDQU5GO1FBT0EsS0FBQSxFQUNFO1VBQUEsT0FBQSxFQUNFO1lBQUEsSUFBQSxFQUFNLFNBQU47WUFDQSxJQUFBLEVBQU07VUFETjtRQURGLENBUkY7UUFXQSxNQUFBLEVBQ0U7VUFBQSxNQUFBLEVBQVE7UUFBUixDQVpGO1FBYUEsT0FBQSxFQUFTO1VBQ0w7WUFBQSxJQUFBLEVBQU0sS0FBTjtZQUNBLElBQUEsRUFBTTtVQUROLENBREs7VUFJTDtZQUFBLElBQUEsRUFBTSxJQUFOO1lBQ0EsSUFBQSxFQUFNO1VBRE4sQ0FKSztTQWJUO1FBb0JBLEdBQUEsRUFBSyxRQUFBLENBQUUsQ0FBRixDQUFBO2lCQUFTLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVo7UUFBVDtNQXBCTCxDQURRO2FBdUJWLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBSSxDQUFDLE9BQUwsQ0FBYSxPQUFiO0lBQXNCO1FBQUEsS0FBQSxFQUFPLElBQVA7UUFBYSxNQUFBLEVBQVE7TUFBckIsQ0FBdEIsQ0FBWjtJQXhCd0MsQ0FBakIsQ0FBekIsQ0FERjs7QUFESzs7QUFnQ1AsT0FBQTs7RUFBUyxJQUFBLFNBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcbmltcG9ydCB1dGlsIGZyb20gXCJub2RlOnV0aWxcIlxuXG5BID0gLT4gXCJiZXRhXCJcbkIgPSAtPiBcImdhbW1hXCJcbkMgPSAtPiBcImRlbHRhXCJcblxudGFyZ2V0ID0gW1xuICAgIHdoZW46IEFcbl1cblxuXG50ZXN0ID0gLT5cbiAgW1xuICAgIGgudGVzdCBcImVkZ2UgZXhwYW5zaW9uXCIsIGgudGFyZ2V0IFwiZWRnZVwiLCAtPlxuICAgICAgbWFjaGluZSA9IE1hY2hpbmUubWFrZVxuICAgICAgICBzdGFydDpcbiAgICAgICAgICBiZXRhOiB0cnVlXG4gICAgICAgIGJldGE6XG4gICAgICAgICAgaWdub3JlOiBmYWxzZVxuICAgICAgICAgIGdhbW1hOiBcImdhbW1hXCJcbiAgICAgICAgZ2FtbWE6XG4gICAgICAgICAgZGVsdGE6ICggdGFsb3MsIGV2ZW50ICkgLT4gZXZlbnQgPT0gXCJkZWx0YVwiXG4gICAgICAgIGRlbHRhOlxuICAgICAgICAgIGVwc2lsb246XG4gICAgICAgICAgICB3aGVuOiBcImVwc2lsb25cIlxuICAgICAgICAgICAgbW92ZTogXCJvbWljcm9uXCJcbiAgICAgICAgaWdub3JlOlxuICAgICAgICAgIGRvZXNudDogXCJtYXR0ZXJcIlxuICAgICAgICBvbWljcm9uOiBbXG4gICAgICAgICAgICB3aGVuOiBmYWxzZVxuICAgICAgICAgICAgbW92ZTogXCJldGFcIlxuICAgICAgICAgICxcbiAgICAgICAgICAgIHdoZW46IHRydWVcbiAgICAgICAgICAgIG1vdmU6IFwicmhvXCJcbiAgICAgICAgXVxuICAgICAgICByaG86ICggeCApIC0+IGNvbnNvbGUubG9nIFwicnVubmluZyBkZWZhdWx0XCJcblxuICAgICAgY29uc29sZS5sb2cgdXRpbC5pbnNwZWN0IG1hY2hpbmUsIGRlcHRoOiBudWxsLCBjb2xvcnM6IHRydWVcbiAgICAgICMgY29uc29sZS5sb2cgbWFjaGluZVxuICAgICAgICBcblxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgYmFzaWMgfSJdfQ==
 //# sourceURL=/@dashkite/talos/test/machine/basic.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9tYWNoaW5lL2Jhc2ljLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lIH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcbmltcG9ydCB1dGlsIGZyb20gXCJub2RlOnV0aWxcIlxuXG5BID0gLT4gXCJiZXRhXCJcbkIgPSAtPiBcImdhbW1hXCJcbkMgPSAtPiBcImRlbHRhXCJcblxudGFyZ2V0ID0gW1xuICAgIHdoZW46IEFcbl1cblxuXG50ZXN0ID0gLT5cbiAgW1xuICAgIGgudGVzdCBcImVkZ2UgZXhwYW5zaW9uXCIsIGgudGFyZ2V0IFwiZWRnZVwiLCAtPlxuICAgICAgbWFjaGluZSA9IE1hY2hpbmUubWFrZVxuICAgICAgICBzdGFydDpcbiAgICAgICAgICBiZXRhOiB0cnVlXG4gICAgICAgIGJldGE6XG4gICAgICAgICAgaWdub3JlOiBmYWxzZVxuICAgICAgICAgIGdhbW1hOiBcImdhbW1hXCJcbiAgICAgICAgZ2FtbWE6XG4gICAgICAgICAgZGVsdGE6ICggdGFsb3MsIGV2ZW50ICkgLT4gZXZlbnQgPT0gXCJkZWx0YVwiXG4gICAgICAgIGRlbHRhOlxuICAgICAgICAgIGVwc2lsb246XG4gICAgICAgICAgICB3aGVuOiBcImVwc2lsb25cIlxuICAgICAgICAgICAgbW92ZTogXCJvbWljcm9uXCJcbiAgICAgICAgaWdub3JlOlxuICAgICAgICAgIGRvZXNudDogXCJtYXR0ZXJcIlxuICAgICAgICBvbWljcm9uOiBbXG4gICAgICAgICAgICB3aGVuOiBmYWxzZVxuICAgICAgICAgICAgbW92ZTogXCJldGFcIlxuICAgICAgICAgICxcbiAgICAgICAgICAgIHdoZW46IHRydWVcbiAgICAgICAgICAgIG1vdmU6IFwicmhvXCJcbiAgICAgICAgXVxuICAgICAgICByaG86ICggeCApIC0+IGNvbnNvbGUubG9nIFwicnVubmluZyBkZWZhdWx0XCJcblxuICAgICAgY29uc29sZS5sb2cgdXRpbC5pbnNwZWN0IG1hY2hpbmUsIGRlcHRoOiBudWxsLCBjb2xvcnM6IHRydWVcbiAgICAgICMgY29uc29sZS5sb2cgbWFjaGluZVxuICAgICAgICBcblxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgYmFzaWMgfSIsbnVsbF0sIm5hbWVzIjpbImJhc2ljIiwidGVzdCIsIkEiLCJCIiwiQyIsInRhcmdldCIsIndoZW4iLCJoIiwibWFjaGluZSIsIk1hY2hpbmUiLCJtYWtlIiwic3RhcnQiLCJiZXRhIiwiaWdub3JlIiwiZ2FtbWEiLCJkZWx0YSIsInRhbG9zIiwiZXZlbnQiLCJlcHNpbG9uIiwibW92ZSIsImRvZXNudCIsIm9taWNyb24iLCJyaG8iLCJ4IiwiY29uc29sZSIsImxvZyIsInV0aWwiLCJpbnNwZWN0IiwiZGVwdGgiLCJjb2xvcnMiXSwibWFwcGluZ3MiOiI7Ozs7K0JBNkNTQTs7OztRQUFBQzs7O3FCQTdDVDtpRUFDQTtpRUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRkEsSUFBQUMsR0FBQUMsR0FBQUMsR0FBQUMsUUFBQUo7QUFJQUMsSUFBSTtXQUFHO0FBQUg7QUFDSkMsSUFBSTtXQUFHO0FBQUg7QUFDSkMsSUFBSTtXQUFHO0FBQUg7QUFFSkMsU0FBUztJQUNMO1FBQUFDLE1BQU1KO0lBQU47O0FBSUpELE9BQU87V0FDTDtRQUNFTSxTQUFFTixJQUFGLENBQU8sa0JBQWtCTSxTQUFFRixNQUFGLENBQVMsUUFBUTtZQUM5QyxJQUFBRztZQUFNQSxVQUFVQyxZQUFPLENBQUNDLElBQVIsQ0FDUjtnQkFBQUMsT0FDRTtvQkFBQUMsTUFBTTtnQkFBTjtnQkFDRkEsTUFDRTtvQkFBQUMsUUFBUTtvQkFDUkMsT0FBTztnQkFEUDtnQkFFRkEsT0FDRTtvQkFBQUMsT0FBTyxTQUFFQyxLQUFGLEVBQVNDLEtBQVQ7K0JBQW9CQSxVQUFTO29CQUE3QjtnQkFBUDtnQkFDRkYsT0FDRTtvQkFBQUcsU0FDRTt3QkFBQVosTUFBTTt3QkFDTmEsTUFBTTtvQkFETjtnQkFERjtnQkFHRk4sUUFDRTtvQkFBQU8sUUFBUTtnQkFBUjtnQkFDRkMsU0FBUztvQkFDTDt3QkFBQWYsTUFBTTt3QkFDTmEsTUFBTTtvQkFETjtvQkFHQTt3QkFBQWIsTUFBTTt3QkFDTmEsTUFBTTtvQkFETjtpQkFqQko7Z0JBb0JBRyxLQUFLLFNBQUVDLENBQUY7MkJBQVNDLFFBQVFDLEdBQVIsQ0FBWTtnQkFBckI7WUFwQkw7bUJBc0JGRCxRQUFRQyxHQUFSLENBQVlDLGlCQUFJLENBQUNDLE9BQUwsQ0FBYW5CLFNBQVM7Z0JBQUFvQixPQUFPO2dCQUFNQyxRQUFRO1lBQXJCO1FBeEJNOztBQUZ2QyJ9