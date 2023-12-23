var test;
import { Graph, Talos, $start, $halt } from "../../src";
import { step } from "../../src/stable/sync";
import * as h from "../helpers";
test = function() {
    var graph, talos;
    graph = null;
    talos = null;
    return [
        h.test("define graph", h.target("stable-sync", function() {
            return graph = Graph.make({
                [$start]: {
                    edges: [
                        {
                            accept: true,
                            run: null,
                            move: "A"
                        }
                    ]
                },
                A: {
                    edges: [
                        {
                            accept: "go",
                            run: function(context) {
                                return context.message = "made it to A, going to B";
                            },
                            move: "B"
                        }
                    ]
                },
                B: {
                    edges: [
                        {
                            accept: false,
                            run: function(context) {
                                return context.message = "this overwrite shouldn't happen";
                            },
                            move: $halt
                        },
                        {
                            accept: true,
                            run: null,
                            move: $halt
                        }
                    ]
                }
            });
        })),
        h.test("define talos", h.target("stable-sync", function() {
            return talos = Talos.make();
        })),
        h.test("run talos", h.target("stable-sync", function() {
            h.assert.equal($start, talos.state);
            step(graph, talos, null);
            h.assert.equal("A", talos.state);
            // Ignores transitions that don't match
            step(graph, talos, null);
            h.assert.equal("A", talos.state);
            step(graph, talos, "go");
            h.assert.equal("B", talos.state);
            h.assert.equal("made it to A, going to B", talos.context.message);
            step(graph, talos, "go");
            h.assert(talos.success);
            return h.assert.equal("made it to A, going to B", talos.context.message);
        }))
    ];
};
export { test as sync }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdC9zdGFibGUvc3luYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixLQUFoQjtFQUF1QixNQUF2QjtFQUErQixLQUEvQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxLQUFQLE1BQUE7O0FBRUEsSUFBQSxHQUFPLFFBQUEsQ0FBQSxDQUFBO0FBQ1AsTUFBQSxLQUFBLEVBQUE7RUFBRSxLQUFBLEdBQVE7RUFDUixLQUFBLEdBQVE7U0FFUjtJQUNFLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUDtJQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQ7SUFBd0IsUUFBQSxDQUFBLENBQUE7YUFDN0MsS0FBQSxHQUFRLEtBQUssQ0FBQyxJQUFOLENBQ047UUFBQSxDQUFFLE1BQUYsQ0FBQSxFQUNFO1VBQUEsS0FBQSxFQUFPO1lBQ0w7Y0FBQSxNQUFBLEVBQVEsSUFBUjtjQUNBLEdBQUEsRUFBSyxJQURMO2NBRUEsSUFBQSxFQUFNO1lBRk4sQ0FESzs7UUFBUCxDQURGO1FBTUEsQ0FBQSxFQUNFO1VBQUEsS0FBQSxFQUFPO1lBQ0w7Y0FBQSxNQUFBLEVBQVEsSUFBUjtjQUNBLEdBQUEsRUFBSyxRQUFBLENBQUUsT0FBRixDQUFBO3VCQUNILE9BQU8sQ0FBQyxPQUFSLEdBQWtCO2NBRGYsQ0FETDtjQUdBLElBQUEsRUFBTTtZQUhOLENBREs7O1FBQVAsQ0FQRjtRQWFBLENBQUEsRUFDRTtVQUFBLEtBQUEsRUFBTztZQUNIO2NBQUEsTUFBQSxFQUFRLEtBQVI7Y0FDQSxHQUFBLEVBQUssUUFBQSxDQUFFLE9BQUYsQ0FBQTt1QkFDSCxPQUFPLENBQUMsT0FBUixHQUFrQjtjQURmLENBREw7Y0FHQSxJQUFBLEVBQU07WUFITixDQURHO1lBTUg7Y0FBQSxNQUFBLEVBQVEsSUFBUjtjQUNBLEdBQUEsRUFBSyxJQURMO2NBRUEsSUFBQSxFQUFNO1lBRk4sQ0FORzs7UUFBUDtNQWRGLENBRE07SUFEcUMsQ0FBeEIsQ0FBdkIsQ0FERjtJQTRCRSxDQUFDLENBQUMsSUFBRixDQUFPLGNBQVA7SUFBdUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxhQUFUO0lBQXdCLFFBQUEsQ0FBQSxDQUFBO2FBQzdDLEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFBO0lBRHFDLENBQXhCLENBQXZCLENBNUJGO0lBK0JFLENBQUMsQ0FBQyxJQUFGLENBQU8sV0FBUDtJQUFvQixDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQ7SUFBd0IsUUFBQSxDQUFBLENBQUE7TUFDMUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsTUFBZjtJQUF1QixLQUFLLENBQUMsS0FBN0I7TUFFQSxJQUFBLENBQUssS0FBTDtJQUFZLEtBQVo7SUFBbUIsSUFBbkI7TUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxHQUFmO0lBQW9CLEtBQUssQ0FBQyxLQUExQixFQUhOOztNQU1NLElBQUEsQ0FBSyxLQUFMO0lBQVksS0FBWjtJQUFtQixJQUFuQjtNQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLEdBQWY7SUFBb0IsS0FBSyxDQUFDLEtBQTFCO01BRUEsSUFBQSxDQUFLLEtBQUw7SUFBWSxLQUFaO0lBQW1CLElBQW5CO01BQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsR0FBZjtJQUFvQixLQUFLLENBQUMsS0FBMUI7TUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSwwQkFBZjtJQUEyQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXpEO01BRUEsSUFBQSxDQUFLLEtBQUw7SUFBWSxLQUFaO0lBQW1CLElBQW5CO01BQ0EsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFLLENBQUMsT0FBZjthQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLDBCQUFmO0lBQTJDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBekQ7SUFoQjBDLENBQXhCLENBQXBCLENBL0JGOztBQUpLOztBQXNEUCxPQUFBO0VBQVMsSUFBQSxRQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGgsIFRhbG9zLCAkc3RhcnQsICRoYWx0IH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgeyBzdGVwIH0gZnJvbSBcIi4uLy4uL3NyYy9zdGFibGUvc3luY1wiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxudGVzdCA9IC0+XG4gIGdyYXBoID0gbnVsbFxuICB0YWxvcyA9IG51bGxcblxuICBbXG4gICAgaC50ZXN0IFwiZGVmaW5lIGdyYXBoXCIsIGgudGFyZ2V0IFwic3RhYmxlLXN5bmNcIiwgLT5cbiAgICAgIGdyYXBoID0gR3JhcGgubWFrZVxuICAgICAgICBbICRzdGFydCBdOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgbW92ZTogXCJBXCJcbiAgICAgICAgICBdXG4gICAgICAgIEE6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogXCJnb1wiXG4gICAgICAgICAgICBydW46ICggY29udGV4dCApIC0+XG4gICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCJcbiAgICAgICAgICAgIG1vdmU6IFwiQlwiXG4gICAgICAgICAgXVxuICAgICAgICBCOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICAgIGFjY2VwdDogZmFsc2VcbiAgICAgICAgICAgICAgcnVuOiAoIGNvbnRleHQgKSAtPlxuICAgICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwidGhpcyBvdmVyd3JpdGUgc2hvdWxkbid0IGhhcHBlblwiXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgICAsXG4gICAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICBdXG4gICAgXG4gICAgaC50ZXN0IFwiZGVmaW5lIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RhYmxlLXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gVGFsb3MubWFrZSgpXG5cbiAgICBoLnRlc3QgXCJydW4gdGFsb3NcIiwgaC50YXJnZXQgXCJzdGFibGUtc3luY1wiLCAtPlxuICAgICAgaC5hc3NlcnQuZXF1YWwgJHN0YXJ0LCB0YWxvcy5zdGF0ZVxuICAgICAgXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgbnVsbFxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJBXCIsIHRhbG9zLnN0YXRlXG5cbiAgICAgICMgSWdub3JlcyB0cmFuc2l0aW9ucyB0aGF0IGRvbid0IG1hdGNoXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgbnVsbFxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJBXCIsIHRhbG9zLnN0YXRlXG5cbiAgICAgIHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQlwiLCB0YWxvcy5zdGF0ZVxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG5cbiAgICAgIHN0ZXAgZ3JhcGgsIHRhbG9zLCBcImdvXCJcbiAgICAgIGguYXNzZXJ0IHRhbG9zLnN1Y2Nlc3NcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgc3luYyB9Il19
 //# sourceURL=test/stable/sync.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc3RhYmxlL3N5bmMuY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoLCBUYWxvcywgJHN0YXJ0LCAkaGFsdCB9IGZyb20gXCIuLi8uLi9zcmNcIlxuaW1wb3J0IHsgc3RlcCB9IGZyb20gXCIuLi8uLi9zcmMvc3RhYmxlL3N5bmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAtPlxuICBncmFwaCA9IG51bGxcbiAgdGFsb3MgPSBudWxsXG5cbiAgW1xuICAgIGgudGVzdCBcImRlZmluZSBncmFwaFwiLCBoLnRhcmdldCBcInN0YWJsZS1zeW5jXCIsIC0+XG4gICAgICBncmFwaCA9IEdyYXBoLm1ha2VcbiAgICAgICAgWyAkc3RhcnQgXTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiB0cnVlXG4gICAgICAgICAgICBydW46IG51bGxcbiAgICAgICAgICAgIG1vdmU6IFwiQVwiXG4gICAgICAgICAgXVxuICAgICAgICBBOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IFwiZ29cIlxuICAgICAgICAgICAgcnVuOiAoIGNvbnRleHQgKSAtPlxuICAgICAgICAgICAgICBjb250ZXh0Lm1lc3NhZ2UgPSBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiXG4gICAgICAgICAgICBtb3ZlOiBcIkJcIlxuICAgICAgICAgIF1cbiAgICAgICAgQjpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgICBhY2NlcHQ6IGZhbHNlXG4gICAgICAgICAgICAgIHJ1bjogKCBjb250ZXh0ICkgLT5cbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1lc3NhZ2UgPSBcInRoaXMgb3ZlcndyaXRlIHNob3VsZG4ndCBoYXBwZW5cIlxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgICAgLFxuICAgICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgICAgcnVuOiBudWxsXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgXVxuICAgIFxuICAgIGgudGVzdCBcImRlZmluZSB0YWxvc1wiLCBoLnRhcmdldCBcInN0YWJsZS1zeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IFRhbG9zLm1ha2UoKVxuXG4gICAgaC50ZXN0IFwicnVuIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RhYmxlLXN5bmNcIiwgLT5cbiAgICAgIGguYXNzZXJ0LmVxdWFsICRzdGFydCwgdGFsb3Muc3RhdGVcbiAgICAgIFxuICAgICAgc3RlcCBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICAjIElnbm9yZXMgdHJhbnNpdGlvbnMgdGhhdCBkb24ndCBtYXRjaFxuICAgICAgc3RlcCBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkJcIiwgdGFsb3Muc3RhdGVcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuXG4gICAgICBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydCB0YWxvcy5zdWNjZXNzXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIHN5bmMgfSJdLCJuYW1lcyI6WyJ0ZXN0IiwiR3JhcGgiLCJUYWxvcyIsIiRzdGFydCIsIiRoYWx0Iiwic3RlcCIsImgiLCJncmFwaCIsInRhbG9zIiwidGFyZ2V0IiwibWFrZSIsImVkZ2VzIiwiYWNjZXB0IiwicnVuIiwibW92ZSIsIkEiLCJjb250ZXh0IiwibWVzc2FnZSIsIkIiLCJhc3NlcnQiLCJlcXVhbCIsInN0YXRlIiwic3VjY2VzcyIsInN5bmMiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBO0FBQUEsU0FBU0MsS0FBVCxFQUFnQkMsS0FBaEIsRUFBdUJDLE1BQXZCLEVBQStCQyxLQUEvQixRQUFBLFlBQUE7QUFDQSxTQUFTQyxJQUFULFFBQUEsd0JBQUE7QUFDQSxZQUFPQyxPQUFQLGFBQUE7QUFFQU4sT0FBTztJQUNQLElBQUFPLE9BQUFDO0lBQUVELFFBQVE7SUFDUkMsUUFBUTtXQUVSO1FBQ0VGLEVBQUVOLElBQUYsQ0FBTyxnQkFBZ0JNLEVBQUVHLE1BQUYsQ0FBUyxlQUFlO21CQUM3Q0YsUUFBUU4sTUFBTVMsSUFBTixDQUNOO2dCQUFBLENBQUVQLE9BQUYsRUFDRTtvQkFBQVEsT0FBTzt3QkFDTDs0QkFBQUMsUUFBUTs0QkFDUkMsS0FBSzs0QkFDTEMsTUFBTTt3QkFGTjs7Z0JBREY7Z0JBS0ZDLEdBQ0U7b0JBQUFKLE9BQU87d0JBQ0w7NEJBQUFDLFFBQVE7NEJBQ1JDLEtBQUssU0FBRUcsT0FBRjt1Q0FDSEEsUUFBUUMsT0FBUixHQUFrQjs0QkFEZjs0QkFFTEgsTUFBTTt3QkFITjs7Z0JBREY7Z0JBTUZJLEdBQ0U7b0JBQUFQLE9BQU87d0JBQ0g7NEJBQUFDLFFBQVE7NEJBQ1JDLEtBQUssU0FBRUcsT0FBRjt1Q0FDSEEsUUFBUUMsT0FBUixHQUFrQjs0QkFEZjs0QkFFTEgsTUFBTVY7d0JBSE47d0JBS0E7NEJBQUFRLFFBQVE7NEJBQ1JDLEtBQUs7NEJBQ0xDLE1BQU1WO3dCQUZOOztnQkFOSjtZQWRGO1FBRjJDO1FBMkIvQ0UsRUFBRU4sSUFBRixDQUFPLGdCQUFnQk0sRUFBRUcsTUFBRixDQUFTLGVBQWU7bUJBQzdDRCxRQUFRTixNQUFNUSxJQUFOO1FBRHFDO1FBRy9DSixFQUFFTixJQUFGLENBQU8sYUFBYU0sRUFBRUcsTUFBRixDQUFTLGVBQWU7WUFDMUNILEVBQUVhLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlakIsUUFBUUssTUFBTWEsS0FBN0I7WUFFQWhCLEtBQUtFLE9BQU9DLE9BQU87WUFDbkJGLEVBQUVhLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlLEtBQUtaLE1BQU1hLEtBQTFCOztZQUdBaEIsS0FBS0UsT0FBT0MsT0FBTztZQUNuQkYsRUFBRWEsTUFBTSxDQUFDQyxLQUFULENBQWUsS0FBS1osTUFBTWEsS0FBMUI7WUFFQWhCLEtBQUtFLE9BQU9DLE9BQU87WUFDbkJGLEVBQUVhLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlLEtBQUtaLE1BQU1hLEtBQTFCO1lBQ0FmLEVBQUVhLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlLDRCQUE0QlosTUFBTVEsT0FBTyxDQUFDQyxPQUF6RDtZQUVBWixLQUFLRSxPQUFPQyxPQUFPO1lBQ25CRixFQUFFYSxNQUFGLENBQVNYLE1BQU1jLE9BQWY7bUJBQ0FoQixFQUFFYSxNQUFNLENBQUNDLEtBQVQsQ0FBZSw0QkFBNEJaLE1BQU1RLE9BQU8sQ0FBQ0MsT0FBekQ7UUFoQjBDOztBQW5DekM7QUFzRFAsU0FBU2pCLFFBQUF1QixJQUFUIn0=