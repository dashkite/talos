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
    expand: function() {
        return expand;
    },
    check: function() {
        return check;
    },
    isFunctionArray: function() {
        return isFunctionArray;
    },
    nameVertex: function() {
        return nameVertex;
    },
    finished: function() {
        return finished;
    }
});
const _type = /*#__PURE__*/ _interop_require_wildcard(require("@dashkite/joy/type"));
const _states = require("../states");
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
var check, expand, finished, isFunctionArray, nameVertex;
expand = function(fx) {
    var current, f, graph, i, j, len, next;
    graph = {};
    for(i = j = 0, len = fx.length; j < len; i = ++j){
        f = fx[i];
        current = i === 0 ? _states.$start : `${i}`;
        next = i === fx.length - 1 ? _states.$halt : `${i + 1}`;
        graph[current] = {
            name: f.name == null || f.name === "" ? `anonymous-${i}` : f.name,
            edges: [
                {
                    accept: true,
                    run: f,
                    move: next
                }
            ]
        };
    }
    return graph;
};
check = function(talos) {
    if (talos.error != null) {
        throw talos.error.error;
    }
};
isFunctionArray = function(fx) {
    var f, j, len;
    if (!_type.isArray(fx)) {
        return false;
    }
    for(j = 0, len = fx.length; j < len; j++){
        f = fx[j];
        if (!_type.isFunction(f)) {
            return false;
        }
    }
    return true;
};
nameVertex = function(vertex) {
    var name;
    name = vertex.metadata.name;
    if (_type.isSymbol(name)) {
        return `[Symbol ${name.toString()} ]`;
    } else {
        return name;
    }
};
finished = function(name) {
    return function(talos) {
        if (talos.failure) {
            console.error(`[ ${name} ] encountered error`, talos.error.error);
            return true;
        } else if (talos.success) {
            console.log(`[ ${name} ] graph traversal complete`, talos.context);
            return true;
        } else {
            return false;
        }
    };
};
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy9zcmMvbGluZWFyL2hlbHBlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7RUFBaUIsS0FBakI7Q0FBQSxNQUFBOztBQUdBLE1BQUEsR0FBUyxRQUFBLENBQUUsRUFBRixDQUFBO0FBQ1QsTUFBQSxPQUFBLEVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQTtFQUFFLEtBQUEsR0FBUSxDQUFBO0VBQ1IsS0FBQSw0Q0FBQTs7SUFDRSxPQUFBLEdBQWEsQ0FBQSxLQUFLLENBQVIsR0FBZSxNQUFmLEdBQTJCLENBQUEsQ0FBQSxDQUFJLENBQUosQ0FBQTtJQUNyQyxJQUFBLEdBQVUsQ0FBQSxLQUFLLEVBQUUsQ0FBQyxNQUFILEdBQVksQ0FBcEIsR0FBMkIsS0FBM0IsR0FBc0MsQ0FBQSxDQUFBLENBQUksQ0FBQSxHQUFJLENBQVIsQ0FBQTtJQUU3QyxLQUFLLENBQUUsT0FBRixDQUFMLEdBQ0U7TUFBQSxJQUFBLEVBQVUsZ0JBQUQsSUFBWSxDQUFDLENBQUMsSUFBRixLQUFVLEVBQXpCLEdBQWlDLENBQUEsVUFBQSxDQUFBLENBQWMsQ0FBZCxDQUFBLENBQWpDLEdBQXlELENBQUMsQ0FBQyxJQUFqRTtNQUNBLEtBQUEsRUFBTztRQUNMO1VBQUEsTUFBQSxFQUFRLElBQVI7VUFDQSxHQUFBLEVBQUssQ0FETDtVQUVBLElBQUEsRUFBTTtRQUZOLENBREs7O0lBRFA7RUFMSjtTQVlBO0FBZE87O0FBZ0JULEtBQUEsR0FBUSxRQUFBLENBQUUsS0FBRixDQUFBO0VBQ04sSUFBRyxtQkFBSDtJQUNFLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxNQURwQjs7QUFETTs7QUFJUixlQUFBLEdBQWtCLFFBQUEsQ0FBRSxFQUFGLENBQUE7QUFDbEIsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0VBQUUsSUFBRyxDQUFFLElBQUksQ0FBQyxPQUFMLENBQWEsRUFBYixDQUFMO0FBQ0UsV0FBTyxNQURUOztFQUVBLEtBQUEsb0NBQUE7O0lBQ0UsSUFBZ0IsQ0FBRSxJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixDQUFsQjtBQUFBLGFBQU8sTUFBUDs7RUFERjtTQUVBO0FBTGdCOztBQVFsQixVQUFBLEdBQWEsUUFBQSxDQUFFLE1BQUYsQ0FBQTtBQUNiLE1BQUE7RUFBRSxJQUFBLEdBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztFQUN2QixJQUFHLElBQUksQ0FBQyxRQUFMLENBQWMsSUFBZCxDQUFIO1dBQ0UsQ0FBQSxRQUFBLENBQUEsQ0FBWSxJQUFJLENBQUMsUUFBTCxDQUFBLENBQVosQ0FBQSxFQUFBLEVBREY7R0FBQSxNQUFBO1dBR0UsS0FIRjs7QUFGVzs7QUFPYixRQUFBLEdBQVcsUUFBQSxDQUFFLElBQUYsQ0FBQTtTQUNULFFBQUEsQ0FBRSxLQUFGLENBQUE7SUFDRSxJQUFHLEtBQUssQ0FBQyxPQUFUO01BQ0UsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLEVBQUEsQ0FBQSxDQUFNLElBQU4sQ0FBQSxvQkFBQSxDQUFkLEVBQWlELEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBN0Q7YUFDQSxLQUZGO0tBQUEsTUFHSyxJQUFHLEtBQUssQ0FBQyxPQUFUO01BQ0gsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFBLEVBQUEsQ0FBQSxDQUFNLElBQU4sQ0FBQSwyQkFBQSxDQUFaLEVBQXNELEtBQUssQ0FBQyxPQUE1RDthQUNBLEtBRkc7S0FBQSxNQUFBO2FBSUgsTUFKRzs7RUFKUDtBQURTOztBQVlYLE9BQUE7RUFDRSxNQURGO0VBRUUsS0FGRjtFQUdFLGVBSEY7RUFJRSxVQUpGO0VBS0UsUUFMRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyAkc3RhcnQsICRoYWx0IH0gZnJvbSBcIi4uL3N0YXRlc1wiXG5cblxuZXhwYW5kID0gKCBmeCApIC0+XG4gIGdyYXBoID0ge30gICAgXG4gIGZvciBmLCBpIGluIGZ4XG4gICAgY3VycmVudCA9IGlmIGkgPT0gMCB0aGVuICRzdGFydCBlbHNlIFwiI3sgaSB9XCJcbiAgICBuZXh0ID0gaWYgaSA9PSBmeC5sZW5ndGggLSAxIHRoZW4gJGhhbHQgZWxzZSBcIiN7IGkgKyAxIH1cIlxuXG4gICAgZ3JhcGhbIGN1cnJlbnQgXSA9IFxuICAgICAgbmFtZTogaWYgIWYubmFtZT8gfHwgZi5uYW1lID09IFwiXCIgdGhlbiBcImFub255bW91cy0jeyBpIH1cIiBlbHNlIGYubmFtZVxuICAgICAgZWRnZXM6IFtcbiAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgIHJ1bjogZlxuICAgICAgICBtb3ZlOiBuZXh0XG4gICAgICBdIFxuICBcbiAgZ3JhcGhcblxuY2hlY2sgPSAoIHRhbG9zICkgLT5cbiAgaWYgdGFsb3MuZXJyb3I/XG4gICAgdGhyb3cgdGFsb3MuZXJyb3IuZXJyb3JcblxuaXNGdW5jdGlvbkFycmF5ID0gKCBmeCApIC0+XG4gIGlmICEgVHlwZS5pc0FycmF5IGZ4XG4gICAgcmV0dXJuIGZhbHNlXG4gIGZvciBmIGluIGZ4XG4gICAgcmV0dXJuIGZhbHNlIGlmICEgVHlwZS5pc0Z1bmN0aW9uIGZcbiAgdHJ1ZVxuXG5cbm5hbWVWZXJ0ZXggPSAoIHZlcnRleCApIC0+XG4gIG5hbWUgPSB2ZXJ0ZXgubWV0YWRhdGEubmFtZVxuICBpZiBUeXBlLmlzU3ltYm9sIG5hbWVcbiAgICBcIltTeW1ib2wgI3sgbmFtZS50b1N0cmluZygpIH0gXVwiXG4gIGVsc2VcbiAgICBuYW1lXG5cbmZpbmlzaGVkID0gKCBuYW1lICkgLT5cbiAgKCB0YWxvcyApIC0+XG4gICAgaWYgdGFsb3MuZmFpbHVyZVxuICAgICAgY29uc29sZS5lcnJvciBcIlsgI3sgbmFtZSB9IF0gZW5jb3VudGVyZWQgZXJyb3JcIiwgdGFsb3MuZXJyb3IuZXJyb3JcbiAgICAgIHRydWVcbiAgICBlbHNlIGlmIHRhbG9zLnN1Y2Nlc3NcbiAgICAgIGNvbnNvbGUubG9nIFwiWyAjeyBuYW1lIH0gXSBncmFwaCB0cmF2ZXJzYWwgY29tcGxldGVcIiwgdGFsb3MuY29udGV4dFxuICAgICAgdHJ1ZVxuICAgIGVsc2VcbiAgICAgIGZhbHNlXG5cblxuZXhwb3J0IHtcbiAgZXhwYW5kXG4gIGNoZWNrXG4gIGlzRnVuY3Rpb25BcnJheVxuICBuYW1lVmVydGV4XG4gIGZpbmlzaGVkXG59Il19
 //# sourceURL=/@dashkite/talos/src/linear/helpers.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3Mvc3JjL2xpbmVhci9oZWxwZXJzLmNvZmZlZSIsIjxhbm9uPiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgJHN0YXJ0LCAkaGFsdCB9IGZyb20gXCIuLi9zdGF0ZXNcIlxuXG5cbmV4cGFuZCA9ICggZnggKSAtPlxuICBncmFwaCA9IHt9ICAgIFxuICBmb3IgZiwgaSBpbiBmeFxuICAgIGN1cnJlbnQgPSBpZiBpID09IDAgdGhlbiAkc3RhcnQgZWxzZSBcIiN7IGkgfVwiXG4gICAgbmV4dCA9IGlmIGkgPT0gZngubGVuZ3RoIC0gMSB0aGVuICRoYWx0IGVsc2UgXCIjeyBpICsgMSB9XCJcblxuICAgIGdyYXBoWyBjdXJyZW50IF0gPSBcbiAgICAgIG5hbWU6IGlmICFmLm5hbWU/IHx8IGYubmFtZSA9PSBcIlwiIHRoZW4gXCJhbm9ueW1vdXMtI3sgaSB9XCIgZWxzZSBmLm5hbWVcbiAgICAgIGVkZ2VzOiBbXG4gICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICBydW46IGZcbiAgICAgICAgbW92ZTogbmV4dFxuICAgICAgXSBcbiAgXG4gIGdyYXBoXG5cbmNoZWNrID0gKCB0YWxvcyApIC0+XG4gIGlmIHRhbG9zLmVycm9yP1xuICAgIHRocm93IHRhbG9zLmVycm9yLmVycm9yXG5cbmlzRnVuY3Rpb25BcnJheSA9ICggZnggKSAtPlxuICBpZiAhIFR5cGUuaXNBcnJheSBmeFxuICAgIHJldHVybiBmYWxzZVxuICBmb3IgZiBpbiBmeFxuICAgIHJldHVybiBmYWxzZSBpZiAhIFR5cGUuaXNGdW5jdGlvbiBmXG4gIHRydWVcblxuXG5uYW1lVmVydGV4ID0gKCB2ZXJ0ZXggKSAtPlxuICBuYW1lID0gdmVydGV4Lm1ldGFkYXRhLm5hbWVcbiAgaWYgVHlwZS5pc1N5bWJvbCBuYW1lXG4gICAgXCJbU3ltYm9sICN7IG5hbWUudG9TdHJpbmcoKSB9IF1cIlxuICBlbHNlXG4gICAgbmFtZVxuXG5maW5pc2hlZCA9ICggbmFtZSApIC0+XG4gICggdGFsb3MgKSAtPlxuICAgIGlmIHRhbG9zLmZhaWx1cmVcbiAgICAgIGNvbnNvbGUuZXJyb3IgXCJbICN7IG5hbWUgfSBdIGVuY291bnRlcmVkIGVycm9yXCIsIHRhbG9zLmVycm9yLmVycm9yXG4gICAgICB0cnVlXG4gICAgZWxzZSBpZiB0YWxvcy5zdWNjZXNzXG4gICAgICBjb25zb2xlLmxvZyBcIlsgI3sgbmFtZSB9IF0gZ3JhcGggdHJhdmVyc2FsIGNvbXBsZXRlXCIsIHRhbG9zLmNvbnRleHRcbiAgICAgIHRydWVcbiAgICBlbHNlXG4gICAgICBmYWxzZVxuXG5cbmV4cG9ydCB7XG4gIGV4cGFuZFxuICBjaGVja1xuICBpc0Z1bmN0aW9uQXJyYXlcbiAgbmFtZVZlcnRleFxuICBmaW5pc2hlZFxufSIsbnVsbF0sIm5hbWVzIjpbImV4cGFuZCIsImNoZWNrIiwiaXNGdW5jdGlvbkFycmF5IiwibmFtZVZlcnRleCIsImZpbmlzaGVkIiwiZngiLCJjdXJyZW50IiwiZiIsImdyYXBoIiwiaSIsImoiLCJsZW4iLCJuZXh0IiwibGVuZ3RoIiwiJHN0YXJ0IiwiJGhhbHQiLCJuYW1lIiwiZWRnZXMiLCJhY2NlcHQiLCJydW4iLCJtb3ZlIiwidGFsb3MiLCJlcnJvciIsIlR5cGUiLCJpc0FycmF5IiwiaXNGdW5jdGlvbiIsInZlcnRleCIsIm1ldGFkYXRhIiwiaXNTeW1ib2wiLCJ0b1N0cmluZyIsImZhaWx1cmUiLCJjb25zb2xlIiwic3VjY2VzcyIsImxvZyIsImNvbnRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBb0RFQSxNQURGO2VBQ0VBOztJQUNBQyxLQUZGO2VBRUVBOztJQUNBQyxlQUhGO2VBR0VBOztJQUNBQyxVQUpGO2VBSUVBOztJQUNBQyxRQUxGO2VBS0VBOzs7OERBeERGO3dCQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREEsSUFBQUgsT0FBQUQsUUFBQUksVUFBQUYsaUJBQUFDO0FBSUFILFNBQVMsU0FBRUssRUFBRjtJQUNULElBQUFDLFNBQUFDLEdBQUFDLE9BQUFDLEdBQUFDLEdBQUFDLEtBQUFDO0lBQUVKLFFBQVEsQ0FBQTtJQUNSLElBQUFDLElBQUFDLElBQUEsR0FBQUMsTUFBQU4sR0FBQVEsTUFBQSxFQUFBSCxJQUFBQyxLQUFBRixJQUFBLEVBQUFDLEVBQUE7O1FBQ0VKLFVBQWFHLE1BQUssSUFBT0ssY0FBZixHQUEyQixDQUFBLEVBQUlMLEVBQUosQ0FBQTtRQUNyQ0csT0FBVUgsTUFBS0osR0FBR1EsTUFBSCxHQUFZLElBQU9FLGFBQTNCLEdBQXNDLENBQUEsRUFBSU4sSUFBSSxFQUFSLENBQUE7UUFFN0NELEtBQUssQ0FBRUYsUUFBUCxHQUNFO1lBQUFVLE1BQVUsQUFBQVQsRUFBQVMsSUFBQSxJQUFBLFFBQVdULEVBQUVTLElBQUYsS0FBVSxLQUFRLENBQUEsVUFBQSxFQUFjUCxFQUFkLENBQWpDLEdBQXlERixFQUFFUyxJQUFqRTtZQUNBQyxPQUFPO2dCQUNMO29CQUFBQyxRQUFRO29CQUNSQyxLQUFLWjtvQkFDTGEsTUFBTVI7Z0JBRk47O1FBRkY7SUFMSjtXQVlBSjtBQWRPO0FBZ0JUUCxRQUFRLFNBQUVvQixLQUFGO0lBQ04sSUFBR0EsTUFBQUMsS0FBQSxJQUFBLE1BQUg7UUFDRSxNQUFNRCxNQUFNQyxLQUFLLENBQUNBLEtBQUE7O0FBRmQ7QUFJUnBCLGtCQUFrQixTQUFFRyxFQUFGO0lBQ2xCLElBQUFFLEdBQUFHLEdBQUFDO0lBQUUsSUFBRyxDQUFFWSxNQUFLQyxPQUFMLENBQWFuQixLQUFsQjtRQUNFLE9BQU87O0lBQ1QsSUFBQUssSUFBQSxHQUFBQyxNQUFBTixHQUFBUSxNQUFBLEVBQUFILElBQUFDLEtBQUFELElBQUE7O1FBQ0UsSUFBZ0IsQ0FBRWEsTUFBS0UsVUFBTCxDQUFnQmxCLElBQWxDO1lBQUEsT0FBTzs7SUFEVDtXQUVBO0FBTGdCO0FBUWxCSixhQUFhLFNBQUV1QixNQUFGO0lBQ2IsSUFBQVY7SUFBRUEsT0FBT1UsT0FBT0MsUUFBUSxDQUFDWCxJQUFBO0lBQ3ZCLElBQUdPLE1BQUtLLFFBQUwsQ0FBY1osT0FBakI7ZUFDRSxDQUFBLFFBQUEsRUFBWUEsS0FBS2EsUUFBTCxHQUFaLEVBQUEsQ0FBQTtXQURGO2VBR0ViOztBQUxTO0FBT2JaLFdBQVcsU0FBRVksSUFBRjtXQUNULFNBQUVLLEtBQUY7UUFDRSxJQUFHQSxNQUFNUyxPQUFULEVBQUE7WUFDRUMsUUFBUVQsS0FBUixDQUFjLENBQUEsRUFBQSxFQUFNTixLQUFOLG9CQUFBLENBQWQsRUFBaURLLE1BQU1DLEtBQUssQ0FBQ0EsS0FBN0Q7bUJBQ0E7ZUFDRyxJQUFHRCxNQUFNVyxPQUFULEVBQUE7WUFDSEQsUUFBUUUsR0FBUixDQUFZLENBQUEsRUFBQSxFQUFNakIsS0FBTiwyQkFBQSxDQUFaLEVBQXNESyxNQUFNYSxPQUE1RDttQkFDQTtlQUZHO21CQUlIOztJQVJKO0FBRFMifQ==