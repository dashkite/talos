var add, grow, test;
import { Machine, Talos, $start, $end, start, run, pipe } from "../../src/sync";
import * as Type from "@dashkite/joy/type";
import * as h from "../helpers";
add = function(talos, event) {
    return talos.context.sum += event;
};
grow = function(talos) {
    return talos.context.product *= 2;
};
test = function() {
    var A, B;
    A = Machine.make({
        graph: {
            start: {
                hold: {
                    run: add
                }
            },
            hold: {
                hold: {
                    run: add
                }
            }
        }
    });
    B = Machine.make({
        graph: {
            start: {
                first: {
                    run: grow
                }
            },
            first: {
                second: {
                    run: grow
                }
            },
            second: {
                end: {
                    run: grow
                }
            }
        }
    });
    return [
        h.test("start", h.target("sync", function() {
            return h.assert(Type.isIterator(start(A)));
        })),
        h.test("run while consuming events", h.target("sync", function() {
            var events, ref, talos;
            events = [
                1,
                2,
                3
            ];
            talos = run(A, {
                sum: 0
            }, events);
            return h.assert.equal(6, talos != null ? (ref = talos.context) != null ? ref.sum : void 0 : void 0);
        })),
        h.test("run without events and reconsume context", h.target("sync", function() {
            var ref, talos;
            talos = run(B, {
                product: 1
            });
            return h.assert.equal(8, (ref = talos.context) != null ? ref.product : void 0);
        })),
        h.test("pipe functional composition", h.target("sync", function() {
            var a, b, b2, c, context, error, f, g;
            a = function(talos) {
                return talos.context.sum = 1;
            };
            b = function(talos) {
                return talos.context.sum += 2;
            };
            b2 = function() {
                throw new Error("b2");
            };
            c = function(talos) {
                return talos.context.sum += 3;
            };
            f = pipe([
                a,
                b,
                b,
                c
            ]);
            h.assert(Type.isFunction(f));
            context = f();
            h.assert.equal(8, context != null ? context.sum : void 0);
            g = pipe([
                a,
                b,
                b2,
                c
            ]);
            try {
                g();
                throw new Error("did not throw");
            } catch (error1) {
                error = error1;
                return h.assert(error.message === "b2");
            }
        })),
        h.test("handles error", h.target("sync", function() {
            var a, b, c, talos;
            a = async function(talos) {
                return talos.context.sum = await 1;
            };
            b = function(talos) {
                throw new Error("b");
            };
            c = async function(talos) {
                return talos.context.sum += await 3;
            };
            talos = run(start([
                a,
                b,
                c
            ]));
            h.assert(talos.failure);
            h.assert.equal($end, talos.state);
            return h.assert.equal("b", talos.previousState);
        }))
    ];
};
export { test as basic }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL0BkYXNoa2l0ZS90YWxvcy90ZXN0L3N5bmMvYmFzaWMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsT0FBVDtFQUFrQixLQUFsQjtFQUF5QixNQUF6QjtFQUFpQyxJQUFqQztFQUF1QyxLQUF2QztFQUE4QyxHQUE5QztFQUFtRCxJQUFuRDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLEdBQUEsR0FBTSxRQUFBLENBQUUsS0FBRixFQUFTLEtBQVQsQ0FBQTtTQUNKLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBZCxJQUFxQjtBQURqQjs7QUFFTixJQUFBLEdBQU8sUUFBQSxDQUFFLEtBQUYsQ0FBQTtTQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZCxJQUF5QjtBQURwQjs7QUFJUCxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7QUFDUCxNQUFBLENBQUEsRUFBQTtFQUFFLENBQUEsR0FBSSxPQUFPLENBQUMsSUFBUixDQUFhO0lBQUEsS0FBQSxFQUNmO01BQUEsS0FBQSxFQUNFO1FBQUEsSUFBQSxFQUNFO1VBQUEsR0FBQSxFQUFLO1FBQUw7TUFERixDQURGO01BR0EsSUFBQSxFQUNFO1FBQUEsSUFBQSxFQUNFO1VBQUEsR0FBQSxFQUFLO1FBQUw7TUFERjtJQUpGO0VBRGUsQ0FBYjtFQVFKLENBQUEsR0FBSSxPQUFPLENBQUMsSUFBUixDQUFhO0lBQUEsS0FBQSxFQUNmO01BQUEsS0FBQSxFQUNFO1FBQUEsS0FBQSxFQUNFO1VBQUEsR0FBQSxFQUFLO1FBQUw7TUFERixDQURGO01BR0EsS0FBQSxFQUNFO1FBQUEsTUFBQSxFQUNFO1VBQUEsR0FBQSxFQUFLO1FBQUw7TUFERixDQUpGO01BTUEsTUFBQSxFQUNFO1FBQUEsR0FBQSxFQUNFO1VBQUEsR0FBQSxFQUFLO1FBQUw7TUFERjtJQVBGO0VBRGUsQ0FBYjtTQVlKO0lBQ0UsQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFQO0lBQWdCLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBVDtJQUFpQixRQUFBLENBQUEsQ0FBQTthQUMvQixDQUFDLENBQUMsTUFBRixDQUFTLElBQUksQ0FBQyxVQUFMLENBQWdCLEtBQUEsQ0FBTSxDQUFOLENBQWhCLENBQVQ7SUFEK0IsQ0FBakIsQ0FBaEIsQ0FERjtJQUlFLENBQUMsQ0FBQyxJQUFGLENBQU8sNEJBQVA7SUFBcUMsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFUO0lBQWlCLFFBQUEsQ0FBQSxDQUFBO0FBQzFELFVBQUEsTUFBQTtJQUFBLEdBQUE7SUFBQTtNQUFNLE1BQUEsR0FBUyxDQUFFLENBQUY7SUFBSyxDQUFMO0lBQVEsQ0FBUjtNQUNULEtBQUEsR0FBUSxHQUFBLENBQUksQ0FBSjtJQUFPO1FBQUEsR0FBQSxFQUFLO01BQUwsQ0FBUDtJQUFlLE1BQWY7YUFDUixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxDQUFmO3VEQUFnQyxDQUFFLHFCQUFsQztJQUhvRCxDQUFqQixDQUFyQyxDQUpGO0lBU0UsQ0FBQyxDQUFDLElBQUYsQ0FBTywwQ0FBUDtJQUFtRCxDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQ7SUFBaUIsUUFBQSxDQUFBLENBQUE7QUFDeEUsVUFBQSxHQUFBO0lBQUE7TUFBTSxLQUFBLEdBQVEsR0FBQSxDQUFJLENBQUo7SUFBTztRQUFBLE9BQUEsRUFBUztNQUFULENBQVA7YUFDUixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxDQUFmO3VDQUErQixDQUFFLGdCQUFqQztJQUZrRSxDQUFqQixDQUFuRCxDQVRGO0lBYUUsQ0FBQyxDQUFDLElBQUYsQ0FBTyw2QkFBUDtJQUFzQyxDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQ7SUFBaUIsUUFBQSxDQUFBLENBQUE7QUFDM0QsVUFBQSxDQUFBO0lBQUEsQ0FBQTtJQUFBLEVBQUE7SUFBQSxDQUFBO0lBQUEsT0FBQTtJQUFBLEtBQUE7SUFBQSxDQUFBO0lBQUE7TUFBTSxDQUFBLEdBQUksUUFBQSxDQUFFLEtBQUYsQ0FBQTtlQUFhLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBZCxHQUFvQjtNQUFqQztNQUNKLENBQUEsR0FBSSxRQUFBLENBQUUsS0FBRixDQUFBO2VBQWEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFkLElBQXFCO01BQWxDO01BQ0osRUFBQSxHQUFLLFFBQUEsQ0FBQSxDQUFBO1FBQUcsTUFBTSxJQUFJLEtBQUosQ0FBVSxJQUFWO01BQVQ7TUFDTCxDQUFBLEdBQUksUUFBQSxDQUFFLEtBQUYsQ0FBQTtlQUFhLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBZCxJQUFxQjtNQUFsQztNQUVKLENBQUEsR0FBSSxJQUFBLENBQUssQ0FBRSxDQUFGO0lBQUssQ0FBTDtJQUFRLENBQVI7SUFBVyxDQUFYLENBQUw7TUFDSixDQUFDLENBQUMsTUFBRixDQUFTLElBQUksQ0FBQyxVQUFMLENBQWdCLENBQWhCLENBQVQ7TUFDQSxPQUFBLEdBQVUsQ0FBQSxDQUFBO01BQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULENBQWUsQ0FBZjtzQkFBa0IsT0FBTyxDQUFFLFlBQTNCO01BRUEsQ0FBQSxHQUFJLElBQUEsQ0FBSyxDQUFFLENBQUY7SUFBSyxDQUFMO0lBQVEsRUFBUjtJQUFZLENBQVosQ0FBTDtBQUNKO1FBQ0UsQ0FBQSxDQUFBO1FBQ0EsTUFBTSxJQUFJLEtBQUosQ0FBVSxlQUFWLEVBRlI7T0FHQSxjQUFBO1FBQU07ZUFDSixDQUFDLENBQUMsTUFBRixDQUFTLEtBQUssQ0FBQyxPQUFOLEtBQWlCLElBQTFCLEVBREY7O0lBZnFELENBQWpCLENBQXRDLENBYkY7SUErQkUsQ0FBQyxDQUFDLElBQUYsQ0FBTyxlQUFQO0lBQXdCLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBVDtJQUFpQixRQUFBLENBQUEsQ0FBQTtBQUM3QyxVQUFBLENBQUE7SUFBQSxDQUFBO0lBQUEsQ0FBQTtJQUFBO01BQU0sQ0FBQSxHQUFJLE1BQUEsUUFBQSxDQUFFLEtBQUYsQ0FBQTtlQUFhLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBZCxHQUFvQixDQUFBLE1BQU0sQ0FBTjtNQUFqQztNQUNKLENBQUEsR0FBSSxRQUFBLENBQUUsS0FBRixDQUFBO1FBQWEsTUFBTSxJQUFJLEtBQUosQ0FBVSxHQUFWO01BQW5CO01BQ0osQ0FBQSxHQUFJLE1BQUEsUUFBQSxDQUFFLEtBQUYsQ0FBQTtlQUFhLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBZCxJQUFxQixDQUFBLE1BQU0sQ0FBTjtNQUFsQztNQUVKLEtBQUEsR0FBUSxHQUFBLENBQUksS0FBQSxDQUFNLENBQUUsQ0FBRjtJQUFLLENBQUw7SUFBUSxDQUFSLENBQU4sQ0FBSjtNQUNSLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBSyxDQUFDLE9BQWY7TUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxJQUFmO0lBQXFCLEtBQUssQ0FBQyxLQUEzQjthQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxDQUFlLEdBQWY7SUFBb0IsS0FBSyxDQUFDLGFBQTFCO0lBUnVDLENBQWpCLENBQXhCLENBL0JGOztBQXJCSzs7QUErRFAsT0FBQTtFQUFTLElBQUEsU0FBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hY2hpbmUsIFRhbG9zLCAkc3RhcnQsICRlbmQsIHN0YXJ0LCBydW4sIHBpcGUgfSBmcm9tIFwiLi4vLi4vc3JjL3N5bmNcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG5hZGQgPSAoIHRhbG9zLCBldmVudCApIC0+XG4gIHRhbG9zLmNvbnRleHQuc3VtICs9IGV2ZW50XG5ncm93ID0gKCB0YWxvcyApIC0+XG4gIHRhbG9zLmNvbnRleHQucHJvZHVjdCAqPSAyXG5cblxudGVzdCA9IC0+XG4gIEEgPSBNYWNoaW5lLm1ha2UgZ3JhcGg6XG4gICAgc3RhcnQ6XG4gICAgICBob2xkOiBcbiAgICAgICAgcnVuOiBhZGRcbiAgICBob2xkOlxuICAgICAgaG9sZDpcbiAgICAgICAgcnVuOiBhZGRcblxuICBCID0gTWFjaGluZS5tYWtlIGdyYXBoOlxuICAgIHN0YXJ0OlxuICAgICAgZmlyc3Q6IFxuICAgICAgICBydW46IGdyb3dcbiAgICBmaXJzdDpcbiAgICAgIHNlY29uZDpcbiAgICAgICAgcnVuOiBncm93XG4gICAgc2Vjb25kOiBcbiAgICAgIGVuZDpcbiAgICAgICAgcnVuOiBncm93XG5cblxuICBbXG4gICAgaC50ZXN0IFwic3RhcnRcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBoLmFzc2VydCBUeXBlLmlzSXRlcmF0b3Igc3RhcnQgQVxuXG4gICAgaC50ZXN0IFwicnVuIHdoaWxlIGNvbnN1bWluZyBldmVudHNcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBldmVudHMgPSBbIDEsIDIsIDMgXVxuICAgICAgdGFsb3MgPSBydW4gQSwgc3VtOiAwLCBldmVudHNcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDYsIHRhbG9zPy5jb250ZXh0Py5zdW1cblxuICAgIGgudGVzdCBcInJ1biB3aXRob3V0IGV2ZW50cyBhbmQgcmVjb25zdW1lIGNvbnRleHRcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IHJ1biBCLCBwcm9kdWN0OiAxXG4gICAgICBoLmFzc2VydC5lcXVhbCA4LCB0YWxvcy5jb250ZXh0Py5wcm9kdWN0XG5cbiAgICBoLnRlc3QgXCJwaXBlIGZ1bmN0aW9uYWwgY29tcG9zaXRpb25cIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBhID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtID0gMVxuICAgICAgYiA9ICggdGFsb3MgKSAtPiB0YWxvcy5jb250ZXh0LnN1bSArPSAyXG4gICAgICBiMiA9IC0+IHRocm93IG5ldyBFcnJvciBcImIyXCJcbiAgICAgIGMgPSAoIHRhbG9zICkgLT4gdGFsb3MuY29udGV4dC5zdW0gKz0gM1xuICAgICAgXG4gICAgICBmID0gcGlwZSBbIGEsIGIsIGIsIGMgXVxuICAgICAgaC5hc3NlcnQgVHlwZS5pc0Z1bmN0aW9uIGZcbiAgICAgIGNvbnRleHQgPSBmKClcbiAgICAgIGguYXNzZXJ0LmVxdWFsIDgsIGNvbnRleHQ/LnN1bVxuXG4gICAgICBnID0gcGlwZSBbIGEsIGIsIGIyLCBjIF1cbiAgICAgIHRyeVxuICAgICAgICBnKClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwiZGlkIG5vdCB0aHJvd1wiXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICBoLmFzc2VydCBlcnJvci5tZXNzYWdlID09IFwiYjJcIlxuXG4gICAgaC50ZXN0IFwiaGFuZGxlcyBlcnJvclwiLCBoLnRhcmdldCBcInN5bmNcIiwgLT5cbiAgICAgIGEgPSAoIHRhbG9zICkgLT4gdGFsb3MuY29udGV4dC5zdW0gPSBhd2FpdCAxXG4gICAgICBiID0gKCB0YWxvcyApIC0+IHRocm93IG5ldyBFcnJvciBcImJcIlxuICAgICAgYyA9ICggdGFsb3MgKSAtPiB0YWxvcy5jb250ZXh0LnN1bSArPSBhd2FpdCAzIFxuXG4gICAgICB0YWxvcyA9IHJ1biBzdGFydCBbIGEsIGIsIGMgXVxuICAgICAgaC5hc3NlcnQgdGFsb3MuZmFpbHVyZVxuICAgICAgaC5hc3NlcnQuZXF1YWwgJGVuZCwgdGFsb3Muc3RhdGVcbiAgICAgIGguYXNzZXJ0LmVxdWFsIFwiYlwiLCB0YWxvcy5wcmV2aW91c1N0YXRlXG4gIF1cblxuZXhwb3J0IHsgdGVzdCBhcyBiYXNpYyB9Il19
 //# sourceURL=/@dashkite/talos/test/sync/basic.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9AZGFzaGtpdGUvdGFsb3MvdGVzdC9zeW5jL2Jhc2ljLmNvZmZlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBUYWxvcywgJHN0YXJ0LCAkZW5kLCBzdGFydCwgcnVuLCBwaXBlIH0gZnJvbSBcIi4uLy4uL3NyYy9zeW5jXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgKiBhcyBoIGZyb20gXCIuLi9oZWxwZXJzXCJcblxuYWRkID0gKCB0YWxvcywgZXZlbnQgKSAtPlxuICB0YWxvcy5jb250ZXh0LnN1bSArPSBldmVudFxuZ3JvdyA9ICggdGFsb3MgKSAtPlxuICB0YWxvcy5jb250ZXh0LnByb2R1Y3QgKj0gMlxuXG5cbnRlc3QgPSAtPlxuICBBID0gTWFjaGluZS5tYWtlIGdyYXBoOlxuICAgIHN0YXJ0OlxuICAgICAgaG9sZDogXG4gICAgICAgIHJ1bjogYWRkXG4gICAgaG9sZDpcbiAgICAgIGhvbGQ6XG4gICAgICAgIHJ1bjogYWRkXG5cbiAgQiA9IE1hY2hpbmUubWFrZSBncmFwaDpcbiAgICBzdGFydDpcbiAgICAgIGZpcnN0OiBcbiAgICAgICAgcnVuOiBncm93XG4gICAgZmlyc3Q6XG4gICAgICBzZWNvbmQ6XG4gICAgICAgIHJ1bjogZ3Jvd1xuICAgIHNlY29uZDogXG4gICAgICBlbmQ6XG4gICAgICAgIHJ1bjogZ3Jvd1xuXG5cbiAgW1xuICAgIGgudGVzdCBcInN0YXJ0XCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgaC5hc3NlcnQgVHlwZS5pc0l0ZXJhdG9yIHN0YXJ0IEFcblxuICAgIGgudGVzdCBcInJ1biB3aGlsZSBjb25zdW1pbmcgZXZlbnRzXCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgZXZlbnRzID0gWyAxLCAyLCAzIF1cbiAgICAgIHRhbG9zID0gcnVuIEEsIHN1bTogMCwgZXZlbnRzXG4gICAgICBoLmFzc2VydC5lcXVhbCA2LCB0YWxvcz8uY29udGV4dD8uc3VtXG5cbiAgICBoLnRlc3QgXCJydW4gd2l0aG91dCBldmVudHMgYW5kIHJlY29uc3VtZSBjb250ZXh0XCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBydW4gQiwgcHJvZHVjdDogMVxuICAgICAgaC5hc3NlcnQuZXF1YWwgOCwgdGFsb3MuY29udGV4dD8ucHJvZHVjdFxuXG4gICAgaC50ZXN0IFwicGlwZSBmdW5jdGlvbmFsIGNvbXBvc2l0aW9uXCIsIGgudGFyZ2V0IFwic3luY1wiLCAtPlxuICAgICAgYSA9ICggdGFsb3MgKSAtPiB0YWxvcy5jb250ZXh0LnN1bSA9IDFcbiAgICAgIGIgPSAoIHRhbG9zICkgLT4gdGFsb3MuY29udGV4dC5zdW0gKz0gMlxuICAgICAgYjIgPSAtPiB0aHJvdyBuZXcgRXJyb3IgXCJiMlwiXG4gICAgICBjID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtICs9IDNcbiAgICAgIFxuICAgICAgZiA9IHBpcGUgWyBhLCBiLCBiLCBjIF1cbiAgICAgIGguYXNzZXJ0IFR5cGUuaXNGdW5jdGlvbiBmXG4gICAgICBjb250ZXh0ID0gZigpXG4gICAgICBoLmFzc2VydC5lcXVhbCA4LCBjb250ZXh0Py5zdW1cblxuICAgICAgZyA9IHBpcGUgWyBhLCBiLCBiMiwgYyBdXG4gICAgICB0cnlcbiAgICAgICAgZygpXG4gICAgICAgIHRocm93IG5ldyBFcnJvciBcImRpZCBub3QgdGhyb3dcIlxuICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgaC5hc3NlcnQgZXJyb3IubWVzc2FnZSA9PSBcImIyXCJcblxuICAgIGgudGVzdCBcImhhbmRsZXMgZXJyb3JcIiwgaC50YXJnZXQgXCJzeW5jXCIsIC0+XG4gICAgICBhID0gKCB0YWxvcyApIC0+IHRhbG9zLmNvbnRleHQuc3VtID0gYXdhaXQgMVxuICAgICAgYiA9ICggdGFsb3MgKSAtPiB0aHJvdyBuZXcgRXJyb3IgXCJiXCJcbiAgICAgIGMgPSAoIHRhbG9zICkgLT4gdGFsb3MuY29udGV4dC5zdW0gKz0gYXdhaXQgMyBcblxuICAgICAgdGFsb3MgPSBydW4gc3RhcnQgWyBhLCBiLCBjIF1cbiAgICAgIGguYXNzZXJ0IHRhbG9zLmZhaWx1cmVcbiAgICAgIGguYXNzZXJ0LmVxdWFsICRlbmQsIHRhbG9zLnN0YXRlXG4gICAgICBoLmFzc2VydC5lcXVhbCBcImJcIiwgdGFsb3MucHJldmlvdXNTdGF0ZVxuICBdXG5cbmV4cG9ydCB7IHRlc3QgYXMgYmFzaWMgfSJdLCJuYW1lcyI6WyJhZGQiLCJncm93IiwidGVzdCIsIk1hY2hpbmUiLCJUYWxvcyIsIiRzdGFydCIsIiRlbmQiLCJzdGFydCIsInJ1biIsInBpcGUiLCJUeXBlIiwiaCIsInRhbG9zIiwiZXZlbnQiLCJjb250ZXh0Iiwic3VtIiwicHJvZHVjdCIsIkEiLCJCIiwibWFrZSIsImdyYXBoIiwiaG9sZCIsImZpcnN0Iiwic2Vjb25kIiwiZW5kIiwidGFyZ2V0IiwiYXNzZXJ0IiwiaXNJdGVyYXRvciIsImV2ZW50cyIsInJlZiIsImVxdWFsIiwiYSIsImIiLCJiMiIsImMiLCJlcnJvciIsImYiLCJnIiwiRXJyb3IiLCJpc0Z1bmN0aW9uIiwiZXJyb3IxIiwibWVzc2FnZSIsImZhaWx1cmUiLCJzdGF0ZSIsInByZXZpb3VzU3RhdGUiLCJiYXNpYyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQUEsS0FBQUMsTUFBQUM7QUFBQSxTQUFTQyxPQUFULEVBQWtCQyxLQUFsQixFQUF5QkMsTUFBekIsRUFBaUNDLElBQWpDLEVBQXVDQyxLQUF2QyxFQUE4Q0MsR0FBOUMsRUFBbURDLElBQW5ELFFBQUEsaUJBQUE7QUFDQSxZQUFPQyxVQUFQLHFCQUFBO0FBQ0EsWUFBT0MsT0FBUCxhQUFBO0FBRUFYLE1BQU0sU0FBRVksS0FBRixFQUFTQyxLQUFUO1dBQ0pELE1BQU1FLE9BQU8sQ0FBQ0MsR0FBZCxJQUFxQkY7QUFEakI7QUFFTlosT0FBTyxTQUFFVyxLQUFGO1dBQ0xBLE1BQU1FLE9BQU8sQ0FBQ0UsT0FBZCxJQUF5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