var test;
import * as Time from "@dashkite/joy/time";
import { Graph, Talos, $start, $halt } from "../../src";
import { step } from "../../src/stable/async";
import * as h from "../helpers";
test = async function() {
    var graph, talos;
    graph = null;
    talos = null;
    return [
        await h.test("define graph", h.target("stable-async", function() {
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
                            run: async function(context) {
                                await Time.sleep(1);
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
                            run: async function(context) {
                                await Time.sleep(1);
                                return context.message = "this overwrite shouldn't happen";
                            },
                            move: $halt
                        },
                        {
                            accept: true,
                            run: async function() {
                                return await Time.sleep(1);
                            },
                            move: $halt
                        }
                    ]
                }
            });
        })),
        await h.test("define talos", h.target("stable-async", function() {
            return talos = Talos.make();
        })),
        await h.test("run talos", h.target("stable-async", async function() {
            h.assert.equal($start, talos.state);
            await step(graph, talos, null);
            h.assert.equal("A", talos.state);
            // Ignores transitions that don't match
            await step(graph, talos, null);
            h.assert.equal("A", talos.state);
            await step(graph, talos, "go");
            h.assert.equal("B", talos.state);
            h.assert.equal("made it to A, going to B", talos.context.message);
            await step(graph, talos, "go");
            h.assert(talos.success);
            return h.assert.equal("made it to A, going to B", talos.context.message);
        }))
    ];
};
export { test as async }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdC9zdGFibGUvYXN5bmMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixLQUFoQjtFQUF1QixNQUF2QjtFQUErQixLQUEvQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBQSxLQUFQLE1BQUE7O0FBRUEsSUFBQSxHQUFPLE1BQUEsUUFBQSxDQUFBLENBQUE7QUFDUCxNQUFBLEtBQUEsRUFBQTtFQUFFLEtBQUEsR0FBUTtFQUNSLEtBQUEsR0FBUTtTQUVSO0lBQ0UsQ0FBQSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUDtJQUF1QixDQUFDLENBQUMsTUFBRixDQUFTLGNBQVQ7SUFBeUIsUUFBQSxDQUFBLENBQUE7YUFDcEQsS0FBQSxHQUFRLEtBQUssQ0FBQyxJQUFOLENBQ047UUFBQSxDQUFFLE1BQUYsQ0FBQSxFQUNFO1VBQUEsS0FBQSxFQUFPO1lBQ0w7Y0FBQSxNQUFBLEVBQVEsSUFBUjtjQUNBLEdBQUEsRUFBSyxJQURMO2NBRUEsSUFBQSxFQUFNO1lBRk4sQ0FESzs7UUFBUCxDQURGO1FBTUEsQ0FBQSxFQUNFO1VBQUEsS0FBQSxFQUFPO1lBQ0w7Y0FBQSxNQUFBLEVBQVEsSUFBUjtjQUNBLEdBQUEsRUFBSyxNQUFBLFFBQUEsQ0FBRSxPQUFGLENBQUE7Z0JBQ0gsTUFBTSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVg7dUJBQ04sT0FBTyxDQUFDLE9BQVIsR0FBa0I7Y0FGZixDQURMO2NBSUEsSUFBQSxFQUFNO1lBSk4sQ0FESzs7UUFBUCxDQVBGO1FBY0EsQ0FBQSxFQUNFO1VBQUEsS0FBQSxFQUFPO1lBQ0g7Y0FBQSxNQUFBLEVBQVEsS0FBUjtjQUNBLEdBQUEsRUFBSyxNQUFBLFFBQUEsQ0FBRSxPQUFGLENBQUE7Z0JBQ0gsTUFBTSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVg7dUJBQ04sT0FBTyxDQUFDLE9BQVIsR0FBa0I7Y0FGZixDQURMO2NBSUEsSUFBQSxFQUFNO1lBSk4sQ0FERztZQU9IO2NBQUEsTUFBQSxFQUFRLElBQVI7Y0FDQSxHQUFBLEVBQUssTUFBQSxRQUFBLENBQUEsQ0FBQTt1QkFBRyxDQUFBLE1BQU0sSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFYLENBQU47Y0FBSCxDQURMO2NBRUEsSUFBQSxFQUFNO1lBRk4sQ0FQRzs7UUFBUDtNQWZGLENBRE07SUFENEMsQ0FBekIsQ0FBdkIsQ0FBTixDQURGO0lBOEJFLENBQUEsTUFBTSxDQUFDLENBQUMsSUFBRixDQUFPLGNBQVA7SUFBdUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxjQUFUO0lBQXlCLFFBQUEsQ0FBQSxDQUFBO2FBQ3BELEtBQUEsR0FBUSxLQUFLLENBQUMsSUFBTixDQUFBO0lBRDRDLENBQXpCLENBQXZCLENBQU4sQ0E5QkY7SUFpQ0UsQ0FBQSxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sV0FBUDtJQUFvQixDQUFDLENBQUMsTUFBRixDQUFTLGNBQVQ7SUFBeUIsTUFBQSxRQUFBLENBQUEsQ0FBQTtNQUNqRCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxNQUFmO0lBQXVCLEtBQUssQ0FBQyxLQUE3QjtNQUVBLE1BQU0sSUFBQSxDQUFLLEtBQUw7SUFBWSxLQUFaO0lBQW1CLElBQW5CO01BQ04sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsR0FBZjtJQUFvQixLQUFLLENBQUMsS0FBMUIsRUFITjs7TUFNTSxNQUFNLElBQUEsQ0FBSyxLQUFMO0lBQVksS0FBWjtJQUFtQixJQUFuQjtNQUNOLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLEdBQWY7SUFBb0IsS0FBSyxDQUFDLEtBQTFCO01BRUEsTUFBTSxJQUFBLENBQUssS0FBTDtJQUFZLEtBQVo7SUFBbUIsSUFBbkI7TUFDTixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxHQUFmO0lBQW9CLEtBQUssQ0FBQyxLQUExQjtNQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLDBCQUFmO0lBQTJDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBekQ7TUFFQSxNQUFNLElBQUEsQ0FBSyxLQUFMO0lBQVksS0FBWjtJQUFtQixJQUFuQjtNQUNOLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBSyxDQUFDLE9BQWY7YUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSwwQkFBZjtJQUEyQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXpEO0lBaEJpRCxDQUF6QixDQUFwQixDQUFOLENBakNGOztBQUpLOztBQXdEUCxPQUFBO0VBQVMsSUFBQSxTQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVGltZSBmcm9tIFwiQGRhc2hraXRlL2pveS90aW1lXCJcbmltcG9ydCB7IEdyYXBoLCBUYWxvcywgJHN0YXJ0LCAkaGFsdCB9IGZyb20gXCIuLi8uLi9zcmNcIlxuaW1wb3J0IHsgc3RlcCB9IGZyb20gXCIuLi8uLi9zcmMvc3RhYmxlL2FzeW5jXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG50ZXN0ID0gLT5cbiAgZ3JhcGggPSBudWxsXG4gIHRhbG9zID0gbnVsbFxuXG4gIFtcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgZ3JhcGhcIiwgaC50YXJnZXQgXCJzdGFibGUtYXN5bmNcIiwgLT5cbiAgICAgIGdyYXBoID0gR3JhcGgubWFrZVxuICAgICAgICBbICRzdGFydCBdOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgIHJ1bjogbnVsbFxuICAgICAgICAgICAgbW92ZTogXCJBXCJcbiAgICAgICAgICBdXG4gICAgICAgIEE6XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogXCJnb1wiXG4gICAgICAgICAgICBydW46ICggY29udGV4dCApIC0+XG4gICAgICAgICAgICAgIGF3YWl0IFRpbWUuc2xlZXAgMVxuICAgICAgICAgICAgICBjb250ZXh0Lm1lc3NhZ2UgPSBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiXG4gICAgICAgICAgICBtb3ZlOiBcIkJcIlxuICAgICAgICAgIF1cbiAgICAgICAgQjpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgICBhY2NlcHQ6IGZhbHNlXG4gICAgICAgICAgICAgIHJ1bjogKCBjb250ZXh0ICkgLT5cbiAgICAgICAgICAgICAgICBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1lc3NhZ2UgPSBcInRoaXMgb3ZlcndyaXRlIHNob3VsZG4ndCBoYXBwZW5cIlxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgICAgLFxuICAgICAgICAgICAgICBhY2NlcHQ6IHRydWVcbiAgICAgICAgICAgICAgcnVuOiAtPiBhd2FpdCBUaW1lLnNsZWVwIDFcbiAgICAgICAgICAgICAgbW92ZTogJGhhbHRcbiAgICAgICAgICBdXG4gICAgXG4gICAgYXdhaXQgaC50ZXN0IFwiZGVmaW5lIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RhYmxlLWFzeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IFRhbG9zLm1ha2UoKVxuXG4gICAgYXdhaXQgaC50ZXN0IFwicnVuIHRhbG9zXCIsIGgudGFyZ2V0IFwic3RhYmxlLWFzeW5jXCIsIC0+XG4gICAgICBoLmFzc2VydC5lcXVhbCAkc3RhcnQsIHRhbG9zLnN0YXRlXG4gICAgICBcbiAgICAgIGF3YWl0IHN0ZXAgZ3JhcGgsIHRhbG9zLCBudWxsXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkFcIiwgdGFsb3Muc3RhdGVcblxuICAgICAgIyBJZ25vcmVzIHRyYW5zaXRpb25zIHRoYXQgZG9uJ3QgbWF0Y2hcbiAgICAgIGF3YWl0IHN0ZXAgZ3JhcGgsIHRhbG9zLCBudWxsXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkFcIiwgdGFsb3Muc3RhdGVcblxuICAgICAgYXdhaXQgc3RlcCBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJCXCIsIHRhbG9zLnN0YXRlXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcblxuICAgICAgYXdhaXQgc3RlcCBncmFwaCwgdGFsb3MsIFwiZ29cIlxuICAgICAgaC5hc3NlcnQgdGFsb3Muc3VjY2Vzc1xuICAgICAgaC5hc3NlcnQuZXF1YWwgXCJtYWRlIGl0IHRvIEEsIGdvaW5nIHRvIEJcIiwgdGFsb3MuY29udGV4dC5tZXNzYWdlXG4gIF1cblxuZXhwb3J0IHsgdGVzdCBhcyBhc3luYyB9Il19
 //# sourceURL=test/stable/async.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc3RhYmxlL2FzeW5jLmNvZmZlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUaW1lIGZyb20gXCJAZGFzaGtpdGUvam95L3RpbWVcIlxuaW1wb3J0IHsgR3JhcGgsIFRhbG9zLCAkc3RhcnQsICRoYWx0IH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgeyBzdGVwIH0gZnJvbSBcIi4uLy4uL3NyYy9zdGFibGUvYXN5bmNcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbnRlc3QgPSAtPlxuICBncmFwaCA9IG51bGxcbiAgdGFsb3MgPSBudWxsXG5cbiAgW1xuICAgIGF3YWl0IGgudGVzdCBcImRlZmluZSBncmFwaFwiLCBoLnRhcmdldCBcInN0YWJsZS1hc3luY1wiLCAtPlxuICAgICAgZ3JhcGggPSBHcmFwaC5tYWtlXG4gICAgICAgIFsgJHN0YXJ0IF06XG4gICAgICAgICAgZWRnZXM6IFtcbiAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgcnVuOiBudWxsXG4gICAgICAgICAgICBtb3ZlOiBcIkFcIlxuICAgICAgICAgIF1cbiAgICAgICAgQTpcbiAgICAgICAgICBlZGdlczogW1xuICAgICAgICAgICAgYWNjZXB0OiBcImdvXCJcbiAgICAgICAgICAgIHJ1bjogKCBjb250ZXh0ICkgLT5cbiAgICAgICAgICAgICAgYXdhaXQgVGltZS5zbGVlcCAxXG4gICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCJcbiAgICAgICAgICAgIG1vdmU6IFwiQlwiXG4gICAgICAgICAgXVxuICAgICAgICBCOlxuICAgICAgICAgIGVkZ2VzOiBbXG4gICAgICAgICAgICAgIGFjY2VwdDogZmFsc2VcbiAgICAgICAgICAgICAgcnVuOiAoIGNvbnRleHQgKSAtPlxuICAgICAgICAgICAgICAgIGF3YWl0IFRpbWUuc2xlZXAgMVxuICAgICAgICAgICAgICAgIGNvbnRleHQubWVzc2FnZSA9IFwidGhpcyBvdmVyd3JpdGUgc2hvdWxkbid0IGhhcHBlblwiXG4gICAgICAgICAgICAgIG1vdmU6ICRoYWx0XG4gICAgICAgICAgICAsXG4gICAgICAgICAgICAgIGFjY2VwdDogdHJ1ZVxuICAgICAgICAgICAgICBydW46IC0+IGF3YWl0IFRpbWUuc2xlZXAgMVxuICAgICAgICAgICAgICBtb3ZlOiAkaGFsdFxuICAgICAgICAgIF1cbiAgICBcbiAgICBhd2FpdCBoLnRlc3QgXCJkZWZpbmUgdGFsb3NcIiwgaC50YXJnZXQgXCJzdGFibGUtYXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gVGFsb3MubWFrZSgpXG5cbiAgICBhd2FpdCBoLnRlc3QgXCJydW4gdGFsb3NcIiwgaC50YXJnZXQgXCJzdGFibGUtYXN5bmNcIiwgLT5cbiAgICAgIGguYXNzZXJ0LmVxdWFsICRzdGFydCwgdGFsb3Muc3RhdGVcbiAgICAgIFxuICAgICAgYXdhaXQgc3RlcCBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICAjIElnbm9yZXMgdHJhbnNpdGlvbnMgdGhhdCBkb24ndCBtYXRjaFxuICAgICAgYXdhaXQgc3RlcCBncmFwaCwgdGFsb3MsIG51bGxcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiQVwiLCB0YWxvcy5zdGF0ZVxuXG4gICAgICBhd2FpdCBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIkJcIiwgdGFsb3Muc3RhdGVcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwibWFkZSBpdCB0byBBLCBnb2luZyB0byBCXCIsIHRhbG9zLmNvbnRleHQubWVzc2FnZVxuXG4gICAgICBhd2FpdCBzdGVwIGdyYXBoLCB0YWxvcywgXCJnb1wiXG4gICAgICBoLmFzc2VydCB0YWxvcy5zdWNjZXNzXG4gICAgICBoLmFzc2VydC5lcXVhbCBcIm1hZGUgaXQgdG8gQSwgZ29pbmcgdG8gQlwiLCB0YWxvcy5jb250ZXh0Lm1lc3NhZ2VcbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIGFzeW5jIH0iXSwibmFtZXMiOlsidGVzdCIsIlRpbWUiLCJHcmFwaCIsIlRhbG9zIiwiJHN0YXJ0IiwiJGhhbHQiLCJzdGVwIiwiaCIsImdyYXBoIiwidGFsb3MiLCJ0YXJnZXQiLCJtYWtlIiwiZWRnZXMiLCJhY2NlcHQiLCJydW4iLCJtb3ZlIiwiQSIsImNvbnRleHQiLCJzbGVlcCIsIm1lc3NhZ2UiLCJCIiwiYXNzZXJ0IiwiZXF1YWwiLCJzdGF0ZSIsInN1Y2Nlc3MiLCJhc3luYyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQUE7QUFBQSxZQUFPQyxVQUFQLHFCQUFBO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsS0FBaEIsRUFBdUJDLE1BQXZCLEVBQStCQyxLQUEvQixRQUFBLFlBQUE7QUFDQSxTQUFTQyxJQUFULFFBQUEseUJBQUE7QUFDQSxZQUFPQyxPQUFQLGFBQUE7QUFFQVAsT0FBTztJQUNQLElBQUFRLE9BQUFDO0lBQUVELFFBQVE7SUFDUkMsUUFBUTtXQUVSO1FBQ0UsTUFBTUYsRUFBRVAsSUFBRixDQUFPLGdCQUFnQk8sRUFBRUcsTUFBRixDQUFTLGdCQUFnQjttQkFDcERGLFFBQVFOLE1BQU1TLElBQU4sQ0FDTjtnQkFBQSxDQUFFUCxPQUFGLEVBQ0U7b0JBQUFRLE9BQU87d0JBQ0w7NEJBQUFDLFFBQVE7NEJBQ1JDLEtBQUs7NEJBQ0xDLE1BQU07d0JBRk47O2dCQURGO2dCQUtGQyxHQUNFO29CQUFBSixPQUFPO3dCQUNMOzRCQUFBQyxRQUFROzRCQUNSQyxLQUFLLGVBQUVHLE9BQUY7Z0NBQ0gsTUFBTWhCLEtBQUtpQixLQUFMLENBQVc7dUNBQ2pCRCxRQUFRRSxPQUFSLEdBQWtCOzRCQUZmOzRCQUdMSixNQUFNO3dCQUpOOztnQkFERjtnQkFPRkssR0FDRTtvQkFBQVIsT0FBTzt3QkFDSDs0QkFBQUMsUUFBUTs0QkFDUkMsS0FBSyxlQUFFRyxPQUFGO2dDQUNILE1BQU1oQixLQUFLaUIsS0FBTCxDQUFXO3VDQUNqQkQsUUFBUUUsT0FBUixHQUFrQjs0QkFGZjs0QkFHTEosTUFBTVY7d0JBSk47d0JBTUE7NEJBQUFRLFFBQVE7NEJBQ1JDLEtBQUs7dUNBQUcsTUFBTWIsS0FBS2lCLEtBQUwsQ0FBVzs0QkFBcEI7NEJBQ0xILE1BQU1WO3dCQUZOOztnQkFQSjtZQWZGO1FBRmtEO1FBNkJ0RCxNQUFNRSxFQUFFUCxJQUFGLENBQU8sZ0JBQWdCTyxFQUFFRyxNQUFGLENBQVMsZ0JBQWdCO21CQUNwREQsUUFBUU4sTUFBTVEsSUFBTjtRQUQ0QztRQUd0RCxNQUFNSixFQUFFUCxJQUFGLENBQU8sYUFBYU8sRUFBRUcsTUFBRixDQUFTLGdCQUFnQjtZQUNqREgsRUFBRWMsTUFBTSxDQUFDQyxLQUFULENBQWVsQixRQUFRSyxNQUFNYyxLQUE3QjtZQUVBLE1BQU1qQixLQUFLRSxPQUFPQyxPQUFPO1lBQ3pCRixFQUFFYyxNQUFNLENBQUNDLEtBQVQsQ0FBZSxLQUFLYixNQUFNYyxLQUExQjs7WUFHQSxNQUFNakIsS0FBS0UsT0FBT0MsT0FBTztZQUN6QkYsRUFBRWMsTUFBTSxDQUFDQyxLQUFULENBQWUsS0FBS2IsTUFBTWMsS0FBMUI7WUFFQSxNQUFNakIsS0FBS0UsT0FBT0MsT0FBTztZQUN6QkYsRUFBRWMsTUFBTSxDQUFDQyxLQUFULENBQWUsS0FBS2IsTUFBTWMsS0FBMUI7WUFDQWhCLEVBQUVjLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlLDRCQUE0QmIsTUFBTVEsT0FBTyxDQUFDRSxPQUF6RDtZQUVBLE1BQU1iLEtBQUtFLE9BQU9DLE9BQU87WUFDekJGLEVBQUVjLE1BQUYsQ0FBU1osTUFBTWUsT0FBZjttQkFDQWpCLEVBQUVjLE1BQU0sQ0FBQ0MsS0FBVCxDQUFlLDRCQUE0QmIsTUFBTVEsT0FBTyxDQUFDRSxPQUF6RDtRQWhCaUQ7O0FBckNoRDtBQXdEUCxTQUFTbkIsUUFBQXlCLEtBQVQifQ==