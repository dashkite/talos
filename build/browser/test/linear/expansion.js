var test;
import * as Type from "@dashkite/joy/type";
import * as Value from "@dashkite/joy/value";
import { Graph, expand, $start, $halt } from "../../src";
import * as h from "../helpers";
test = function() {
    return h.target("linear-expansion", function() {
        var double, expected, graph, sum, triple;
        sum = function(x, y, z) {
            return x + y + z;
        };
        double = function(x) {
            return 2 * x;
        };
        triple = function(x) {
            return 3 * x;
        };
        graph = expand([
            sum,
            double,
            triple,
            function(x) {
                return 4 * x;
            }
        ]);
        expected = {
            [$start]: {
                name: "sum",
                edges: [
                    {
                        accept: true,
                        run: sum,
                        move: "1"
                    }
                ]
            },
            "1": {
                name: "double",
                edges: [
                    {
                        accept: true,
                        run: double,
                        move: "2"
                    }
                ]
            },
            "2": {
                name: "triple",
                edges: [
                    {
                        accept: true,
                        run: triple,
                        move: "3"
                    }
                ]
            },
            "3": {
                name: "anonymous-3",
                edges: [
                    {
                        accept: true,
                        run: graph["3"].edges[0].run,
                        move: $halt
                    }
                ]
            }
        };
        if (!Value.equal(expected, graph)) {
            console.error(graph);
            throw new Error("expanded graph does not match expected shape");
        }
        graph = Graph.make(graph);
        return h.assert(Graph.isType(graph), "failed to make graph instance");
    });
};
export { test as expansion }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdC9saW5lYXIvZXhwYW5zaW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBQSxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFNBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixNQUFoQjtFQUF3QixNQUF4QjtFQUFnQyxLQUFoQztDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLEtBQVAsTUFBQTs7QUFFQSxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7U0FBRyxDQUFDLENBQUMsTUFBRixDQUFTLGtCQUFULEVBQTZCLFFBQUEsQ0FBQSxDQUFBO0FBQ3ZDLFFBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUUsR0FBQSxHQUFNLFFBQUEsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsQ0FBQTthQUFlLENBQUEsR0FBSSxDQUFKLEdBQVE7SUFBdkI7SUFDTixNQUFBLEdBQVMsUUFBQSxDQUFFLENBQUYsQ0FBQTthQUFTLENBQUEsR0FBSTtJQUFiO0lBQ1QsTUFBQSxHQUFTLFFBQUEsQ0FBRSxDQUFGLENBQUE7YUFBUyxDQUFBLEdBQUk7SUFBYjtJQUVULEtBQUEsR0FBUSxNQUFBLENBQU87TUFDYixHQURhO01BRWIsTUFGYTtNQUdiLE1BSGE7TUFJYixRQUFBLENBQUUsQ0FBRixDQUFBO2VBQVMsQ0FBQSxHQUFJO01BQWIsQ0FKYTtLQUFQO0lBT1IsUUFBQSxHQUNFO01BQUEsQ0FBRSxNQUFGLENBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxLQUFOO1FBQ0EsS0FBQSxFQUFPO1VBQ0w7WUFBQSxNQUFBLEVBQVEsSUFBUjtZQUNBLEdBQUEsRUFBSyxHQURMO1lBRUEsSUFBQSxFQUFNO1VBRk4sQ0FESzs7TUFEUCxDQURGO01BT0EsR0FBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFFBQU47UUFDQSxLQUFBLEVBQU87VUFDTDtZQUFBLE1BQUEsRUFBUSxJQUFSO1lBQ0EsR0FBQSxFQUFLLE1BREw7WUFFQSxJQUFBLEVBQU07VUFGTixDQURLOztNQURQLENBUkY7TUFjQSxHQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sUUFBTjtRQUNBLEtBQUEsRUFBTztVQUNMO1lBQUEsTUFBQSxFQUFRLElBQVI7WUFDQSxHQUFBLEVBQUssTUFETDtZQUVBLElBQUEsRUFBTTtVQUZOLENBREs7O01BRFAsQ0FmRjtNQXFCQSxHQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sYUFBTjtRQUNBLEtBQUEsRUFBTztVQUNMO1lBQUEsTUFBQSxFQUFRLElBQVI7WUFDQSxHQUFBLEVBQUssS0FBSyxDQUFDLEdBQUQsQ0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFELENBQUcsQ0FBQyxHQUR6QjtZQUVBLElBQUEsRUFBTTtVQUZOLENBREs7O01BRFA7SUF0QkY7SUE2QkYsSUFBRyxDQUFFLEtBQUssQ0FBQyxLQUFOLENBQVksUUFBWixFQUFzQixLQUF0QixDQUFMO01BQ0UsT0FBTyxDQUFDLEtBQVIsQ0FBYyxLQUFkO01BQ0EsTUFBTSxJQUFJLEtBQUosQ0FBVSw4Q0FBVixFQUZSOztJQUlBLEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFXLEtBQVg7V0FDUixDQUFDLENBQUMsTUFBRixDQUFXLEtBQUssQ0FBQyxNQUFOLENBQWEsS0FBYixDQUFYLEVBQWlDLCtCQUFqQztFQS9DcUMsQ0FBN0I7QUFBSDs7QUFrRFAsT0FBQTtFQUFTLElBQUEsYUFBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgKiBhcyBWYWx1ZSBmcm9tIFwiQGRhc2hraXRlL2pveS92YWx1ZVwiXG5pbXBvcnQgeyBHcmFwaCwgZXhwYW5kLCAkc3RhcnQsICRoYWx0IH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxudGVzdCA9IC0+IGgudGFyZ2V0IFwibGluZWFyLWV4cGFuc2lvblwiLCAtPlxuICBzdW0gPSAoIHgsIHksIHogKSAtPiB4ICsgeSArIHogXG4gIGRvdWJsZSA9ICggeCApIC0+IDIgKiB4XG4gIHRyaXBsZSA9ICggeCApIC0+IDMgKiB4XG5cbiAgZ3JhcGggPSBleHBhbmQgW1xuICAgIHN1bVxuICAgIGRvdWJsZVxuICAgIHRyaXBsZVxuICAgICggeCApIC0+IDQgKiB4XG4gIF1cblxuICBleHBlY3RlZCA9IFxuICAgIFsgJHN0YXJ0IF06XG4gICAgICBuYW1lOiBcInN1bVwiXG4gICAgICBlZGdlczogW1xuICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgcnVuOiBzdW1cbiAgICAgICAgbW92ZTogXCIxXCJcbiAgICAgIF1cbiAgICBcIjFcIjpcbiAgICAgIG5hbWU6IFwiZG91YmxlXCJcbiAgICAgIGVkZ2VzOiBbXG4gICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICBydW46IGRvdWJsZVxuICAgICAgICBtb3ZlOiBcIjJcIlxuICAgICAgXVxuICAgIFwiMlwiOlxuICAgICAgbmFtZTogXCJ0cmlwbGVcIlxuICAgICAgZWRnZXM6IFtcbiAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgIHJ1bjogdHJpcGxlXG4gICAgICAgIG1vdmU6IFwiM1wiXG4gICAgICBdXG4gICAgXCIzXCI6XG4gICAgICBuYW1lOiBcImFub255bW91cy0zXCJcbiAgICAgIGVkZ2VzOiBbXG4gICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICBydW46IGdyYXBoW1wiM1wiXS5lZGdlc1swXS5ydW5cbiAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgIF1cblxuICBpZiAhIFZhbHVlLmVxdWFsIGV4cGVjdGVkLCBncmFwaFxuICAgIGNvbnNvbGUuZXJyb3IgZ3JhcGhcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJleHBhbmRlZCBncmFwaCBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBzaGFwZVwiXG5cbiAgZ3JhcGggPSBHcmFwaC5tYWtlIGdyYXBoXG4gIGguYXNzZXJ0ICggR3JhcGguaXNUeXBlIGdyYXBoICksIFwiZmFpbGVkIHRvIG1ha2UgZ3JhcGggaW5zdGFuY2VcIlxuXG5cbmV4cG9ydCB7IHRlc3QgYXMgZXhwYW5zaW9uIH0iXX0=
 //# sourceURL=test/linear/expansion.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbGluZWFyL2V4cGFuc2lvbi5jb2ZmZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCAqIGFzIFZhbHVlIGZyb20gXCJAZGFzaGtpdGUvam95L3ZhbHVlXCJcbmltcG9ydCB7IEdyYXBoLCBleHBhbmQsICRzdGFydCwgJGhhbHQgfSBmcm9tIFwiLi4vLi4vc3JjXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gLT4gaC50YXJnZXQgXCJsaW5lYXItZXhwYW5zaW9uXCIsIC0+XG4gIHN1bSA9ICggeCwgeSwgeiApIC0+IHggKyB5ICsgeiBcbiAgZG91YmxlID0gKCB4ICkgLT4gMiAqIHhcbiAgdHJpcGxlID0gKCB4ICkgLT4gMyAqIHhcblxuICBncmFwaCA9IGV4cGFuZCBbXG4gICAgc3VtXG4gICAgZG91YmxlXG4gICAgdHJpcGxlXG4gICAgKCB4ICkgLT4gNCAqIHhcbiAgXVxuXG4gIGV4cGVjdGVkID0gXG4gICAgWyAkc3RhcnQgXTpcbiAgICAgIG5hbWU6IFwic3VtXCJcbiAgICAgIGVkZ2VzOiBbXG4gICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICBydW46IHN1bVxuICAgICAgICBtb3ZlOiBcIjFcIlxuICAgICAgXVxuICAgIFwiMVwiOlxuICAgICAgbmFtZTogXCJkb3VibGVcIlxuICAgICAgZWRnZXM6IFtcbiAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgIHJ1bjogZG91YmxlXG4gICAgICAgIG1vdmU6IFwiMlwiXG4gICAgICBdXG4gICAgXCIyXCI6XG4gICAgICBuYW1lOiBcInRyaXBsZVwiXG4gICAgICBlZGdlczogW1xuICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgcnVuOiB0cmlwbGVcbiAgICAgICAgbW92ZTogXCIzXCJcbiAgICAgIF1cbiAgICBcIjNcIjpcbiAgICAgIG5hbWU6IFwiYW5vbnltb3VzLTNcIlxuICAgICAgZWRnZXM6IFtcbiAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgIHJ1bjogZ3JhcGhbXCIzXCJdLmVkZ2VzWzBdLnJ1blxuICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgXVxuXG4gIGlmICEgVmFsdWUuZXF1YWwgZXhwZWN0ZWQsIGdyYXBoXG4gICAgY29uc29sZS5lcnJvciBncmFwaFxuICAgIHRocm93IG5ldyBFcnJvciBcImV4cGFuZGVkIGdyYXBoIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIHNoYXBlXCJcblxuICBncmFwaCA9IEdyYXBoLm1ha2UgZ3JhcGhcbiAgaC5hc3NlcnQgKCBHcmFwaC5pc1R5cGUgZ3JhcGggKSwgXCJmYWlsZWQgdG8gbWFrZSBncmFwaCBpbnN0YW5jZVwiXG5cblxuZXhwb3J0IHsgdGVzdCBhcyBleHBhbnNpb24gfSJdLCJuYW1lcyI6WyJ0ZXN0IiwiVHlwZSIsIlZhbHVlIiwiR3JhcGgiLCJleHBhbmQiLCIkc3RhcnQiLCIkaGFsdCIsImgiLCJ0YXJnZXQiLCJkb3VibGUiLCJleHBlY3RlZCIsImdyYXBoIiwic3VtIiwidHJpcGxlIiwieCIsInkiLCJ6IiwibmFtZSIsImVkZ2VzIiwiYWNjZXB0IiwicnVuIiwibW92ZSIsImVxdWFsIiwiY29uc29sZSIsImVycm9yIiwiRXJyb3IiLCJtYWtlIiwiYXNzZXJ0IiwiaXNUeXBlIiwiZXhwYW5zaW9uIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFBQTtBQUFBLFlBQU9DLFVBQVAscUJBQUE7QUFDQSxZQUFPQyxXQUFQLHNCQUFBO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsTUFBaEIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxRQUFBLFlBQUE7QUFDQSxZQUFPQyxPQUFQLGFBQUE7QUFFQVAsT0FBTztXQUFHTyxFQUFFQyxNQUFGLENBQVMsb0JBQW9CO1FBQ3ZDLElBQUFDLFFBQUFDLFVBQUFDLE9BQUFDLEtBQUFDO1FBQUVELE1BQU0sU0FBRUUsQ0FBRixFQUFLQyxDQUFMLEVBQVFDLENBQVI7bUJBQWVGLElBQUlDLElBQUlDO1FBQXZCO1FBQ05QLFNBQVMsU0FBRUssQ0FBRjttQkFBUyxJQUFJQTtRQUFiO1FBQ1RELFNBQVMsU0FBRUMsQ0FBRjttQkFBUyxJQUFJQTtRQUFiO1FBRVRILFFBQVFQLE9BQU87WUFDYlE7WUFDQUg7WUFDQUk7WUFDQSxTQUFFQyxDQUFGO3VCQUFTLElBQUlBO1lBQWI7U0FKTTtRQU9SSixXQUNFO1lBQUEsQ0FBRUwsT0FBRixFQUNFO2dCQUFBWSxNQUFNO2dCQUNOQyxPQUFPO29CQUNMO3dCQUFBQyxRQUFRO3dCQUNSQyxLQUFLUjt3QkFDTFMsTUFBTTtvQkFGTjs7WUFGRjtZQU1GLEtBQ0U7Z0JBQUFKLE1BQU07Z0JBQ05DLE9BQU87b0JBQ0w7d0JBQUFDLFFBQVE7d0JBQ1JDLEtBQUtYO3dCQUNMWSxNQUFNO29CQUZOOztZQUZGO1lBTUYsS0FDRTtnQkFBQUosTUFBTTtnQkFDTkMsT0FBTztvQkFDTDt3QkFBQUMsUUFBUTt3QkFDUkMsS0FBS1A7d0JBQ0xRLE1BQU07b0JBRk47O1lBRkY7WUFNRixLQUNFO2dCQUFBSixNQUFNO2dCQUNOQyxPQUFPO29CQUNMO3dCQUFBQyxRQUFRO3dCQUNSQyxLQUFLVCxLQUFLLENBQUMsSUFBSSxDQUFDTyxLQUFLLENBQUMsRUFBRSxDQUFDRSxHQUR6Qjt3QkFFQUMsTUFBTWY7b0JBRk47O1lBRkY7UUF0QkY7UUE2QkYsSUFBRyxDQUFFSixNQUFNb0IsS0FBTixDQUFZWixVQUFVQyxRQUEzQjtZQUNFWSxRQUFRQyxLQUFSLENBQWNiO1lBQ2QsTUFBTSxJQUFJYyxNQUFNOztRQUVsQmQsUUFBUVIsTUFBTXVCLElBQU4sQ0FBV2Y7ZUFDbkJKLEVBQUVvQixNQUFGLENBQVd4QixNQUFNeUIsTUFBTixDQUFhakIsUUFBUztJQS9DSTtBQUFoQztBQWtEUCxTQUFTWCxRQUFBNkIsU0FBVCJ9