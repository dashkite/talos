var add, grow, test;
import { Machine, Talos, $start, $end } from "../../src";
import { start, run, build, flow } from "../../src/async";
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
    });
    B = Machine.make({
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
    });
    return [
        h.test("start", h.target("async", function() {
            var talos;
            talos = start(A);
            return h.assert(Talos.isType(talos));
        })),
        h.test("run while waiting on events", h.target("async", async function() {
            var events, ref, talos;
            events = [
                new Promise(function(resolve, reject) {
                    return resolve(1);
                }),
                new Promise(function(resolve, reject) {
                    return resolve(2);
                }),
                new Promise(function(resolve, reject) {
                    return resolve(3);
                })
            ];
            talos = start(A);
            await run(talos, {
                sum: 0
            }, events);
            return h.assert.equal(6, (ref = talos.context) != null ? ref.sum : void 0);
        })),
        h.test("auto-run without events", h.target("async", async function() {
            var ref, talos;
            talos = start(B);
            await run(talos, {
                product: 1
            });
            return h.assert.equal(8, (ref = talos.context) != null ? ref.product : void 0);
        })),
        h.test("build", h.target("async", async function() {
            var f, ref, talos;
            f = build(B);
            h.assert(Type.isFunction(f));
            talos = await f({
                product: 1
            });
            return h.assert.equal(8, (ref = talos.context) != null ? ref.product : void 0);
        })),
        h.test("flow", h.target("async", async function() {
            var a, b, c, context, f;
            a = async function(talos, context) {
                return context.sum = await 1;
            };
            b = async function(talos, context) {
                return context.sum += await 2;
            };
            c = async function(talos, context) {
                return context.sum += await 3;
            };
            f = flow([
                a,
                b,
                c
            ]);
            h.assert(Type.isFunction(f));
            context = await f({});
            return h.assert.equal(6, context != null ? context.sum : void 0);
        }))
    ];
};
export { test as basic }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdC9hc3luYy9iYXNpYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxPQUFUO0VBQWtCLEtBQWxCO0VBQXlCLE1BQXpCO0VBQWlDLElBQWpDO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixHQUFoQjtFQUFxQixLQUFyQjtFQUE0QixJQUE1QjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsS0FBUCxNQUFBOztBQUVBLEdBQUEsR0FBTSxRQUFBLENBQUUsS0FBRixFQUFTLEtBQVQsQ0FBQTtTQUNKLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBZCxJQUFxQjtBQURqQjs7QUFFTixJQUFBLEdBQU8sUUFBQSxDQUFFLEtBQUYsQ0FBQTtTQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZCxJQUF5QjtBQURwQjs7QUFJUCxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7QUFDUCxNQUFBLENBQUEsRUFBQTtFQUFFLENBQUEsR0FBSSxPQUFPLENBQUMsSUFBUixDQUNGO0lBQUEsS0FBQSxFQUNFO01BQUEsSUFBQSxFQUNFO1FBQUEsR0FBQSxFQUFLO01BQUw7SUFERixDQURGO0lBR0EsSUFBQSxFQUNFO01BQUEsSUFBQSxFQUNFO1FBQUEsR0FBQSxFQUFLO01BQUw7SUFERjtFQUpGLENBREU7RUFRSixDQUFBLEdBQUksT0FBTyxDQUFDLElBQVIsQ0FDRjtJQUFBLEtBQUEsRUFDRTtNQUFBLEtBQUEsRUFDRTtRQUFBLEdBQUEsRUFBSztNQUFMO0lBREYsQ0FERjtJQUdBLEtBQUEsRUFDRTtNQUFBLE1BQUEsRUFDRTtRQUFBLEdBQUEsRUFBSztNQUFMO0lBREYsQ0FKRjtJQU1BLE1BQUEsRUFDRTtNQUFBLEdBQUEsRUFDRTtRQUFBLEdBQUEsRUFBSztNQUFMO0lB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QVQsQ0FBQTtlQUFzQixPQUFPLENBQUMsR0FBUixJQUFlLENBQUEsTUFBTSxDQUFOO01BQXJDO01BRUosQ0FBQSxHQUFJLElBQUEsQ0FBSyxDQUFFLENBQUY7SUFBSyxDQUFMO0lBQVEsQ0FBUixDQUFMO01BQ0osQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixDQUFUO01BQ0EsT0FBQSxHQUFVLENBQUEsTUFBTSxDQUFBLENBQUUsQ0FBQSxDQUFGLENBQU47YUFDVixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsQ0FBZSxDQUFmO3NCQUFrQixPQUFPLENBQUUsWUFBM0I7SUFSK0IsQ0FBbEIsQ0FBZixDQTFCRjs7QUFyQks7O0FBMkRQLE9BQUE7RUFBUyxJQUFBLFNBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYWNoaW5lLCBUYWxvcywgJHN0YXJ0LCAkZW5kIH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgeyBzdGFydCwgcnVuLCBidWlsZCwgZmxvdyB9IGZyb20gXCIuLi8uLi9zcmMvYXN5bmNcIlxuaW1wb3J0ICogYXMgVHlwZSBmcm9tIFwiQGRhc2hraXRlL2pveS90eXBlXCJcbmltcG9ydCAqIGFzIGggZnJvbSBcIi4uL2hlbHBlcnNcIlxuXG5hZGQgPSAoIHRhbG9zLCBldmVudCApIC0+XG4gIHRhbG9zLmNvbnRleHQuc3VtICs9IGV2ZW50XG5ncm93ID0gKCB0YWxvcyApIC0+XG4gIHRhbG9zLmNvbnRleHQucHJvZHVjdCAqPSAyXG5cblxudGVzdCA9IC0+XG4gIEEgPSBNYWNoaW5lLm1ha2VcbiAgICBzdGFydDpcbiAgICAgIGhvbGQ6IFxuICAgICAgICBydW46IGFkZFxuICAgIGhvbGQ6XG4gICAgICBob2xkOlxuICAgICAgICBydW46IGFkZFxuXG4gIEIgPSBNYWNoaW5lLm1ha2VcbiAgICBzdGFydDpcbiAgICAgIGZpcnN0OiBcbiAgICAgICAgcnVuOiBncm93XG4gICAgZmlyc3Q6XG4gICAgICBzZWNvbmQ6XG4gICAgICAgIHJ1bjogZ3Jvd1xuICAgIHNlY29uZDogXG4gICAgICBlbmQ6XG4gICAgICAgIHJ1bjogZ3Jvd1xuXG5cbiAgW1xuICAgIGgudGVzdCBcInN0YXJ0XCIsIGgudGFyZ2V0IFwiYXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gc3RhcnQgQVxuICAgICAgaC5hc3NlcnQgVGFsb3MuaXNUeXBlIHRhbG9zXG5cbiAgICBoLnRlc3QgXCJydW4gd2hpbGUgd2FpdGluZyBvbiBldmVudHNcIiwgaC50YXJnZXQgXCJhc3luY1wiLCAtPlxuICAgICAgZXZlbnRzID0gWyBcbiAgICAgICAgbmV3IFByb21pc2UgKCByZXNvbHZlLCByZWplY3QgKSAtPiByZXNvbHZlIDFcbiAgICAgICAgbmV3IFByb21pc2UgKCByZXNvbHZlLCByZWplY3QgKSAtPiByZXNvbHZlIDJcbiAgICAgICAgbmV3IFByb21pc2UgKCByZXNvbHZlLCByZWplY3QgKSAtPiByZXNvbHZlIDNcbiAgICAgIF1cbiAgICAgIHRhbG9zID0gc3RhcnQgQVxuICAgICAgYXdhaXQgcnVuIHRhbG9zLCBzdW06IDAsIGV2ZW50c1xuICAgICAgaC5hc3NlcnQuZXF1YWwgNiwgdGFsb3MuY29udGV4dD8uc3VtXG5cbiAgICBoLnRlc3QgXCJhdXRvLXJ1biB3aXRob3V0IGV2ZW50c1wiLCBoLnRhcmdldCBcImFzeW5jXCIsIC0+XG4gICAgICB0YWxvcyA9IHN0YXJ0IEJcbiAgICAgIGF3YWl0IHJ1biB0YWxvcywgcHJvZHVjdDogMVxuICAgICAgaC5hc3NlcnQuZXF1YWwgOCwgdGFsb3MuY29udGV4dD8ucHJvZHVjdFxuXG4gICAgaC50ZXN0IFwiYnVpbGRcIiwgaC50YXJnZXQgXCJhc3luY1wiLCAtPlxuICAgICAgZiA9IGJ1aWxkIEJcbiAgICAgIGguYXNzZXJ0IFR5cGUuaXNGdW5jdGlvbiBmXG4gICAgICB0YWxvcyA9IGF3YWl0IGYgcHJvZHVjdDogMVxuICAgICAgaC5hc3NlcnQuZXF1YWwgOCwgdGFsb3MuY29udGV4dD8ucHJvZHVjdFxuXG4gICAgaC50ZXN0IFwiZmxvd1wiLCBoLnRhcmdldCBcImFzeW5jXCIsIC0+XG4gICAgICBhID0gKCB0YWxvcywgY29udGV4dCApIC0+IGNvbnRleHQuc3VtID0gYXdhaXQgMVxuICAgICAgYiA9ICggdGFsb3MsIGNvbnRleHQgKSAtPiBjb250ZXh0LnN1bSArPSBhd2FpdCAyXG4gICAgICBjID0gKCB0YWxvcywgY29udGV4dCApIC0+IGNvbnRleHQuc3VtICs9IGF3YWl0IDMgXG5cbiAgICAgIGYgPSBmbG93IFsgYSwgYiwgYyBdXG4gICAgICBoLmFzc2VydCBUeXBlLmlzRnVuY3Rpb24gZlxuICAgICAgY29udGV4dCA9IGF3YWl0IGYge31cbiAgICAgIGguYXNzZXJ0LmVxdWFsIDYsIGNvbnRleHQ/LnN1bVxuXG4gIF1cblxuZXhwb3J0IHsgdGVzdCBhcyBiYXNpYyB9Il19
 //# sourceURL=test/async/basic.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYXN5bmMvYmFzaWMuY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hY2hpbmUsIFRhbG9zLCAkc3RhcnQsICRlbmQgfSBmcm9tIFwiLi4vLi4vc3JjXCJcbmltcG9ydCB7IHN0YXJ0LCBydW4sIGJ1aWxkLCBmbG93IH0gZnJvbSBcIi4uLy4uL3NyYy9hc3luY1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0ICogYXMgaCBmcm9tIFwiLi4vaGVscGVyc1wiXG5cbmFkZCA9ICggdGFsb3MsIGV2ZW50ICkgLT5cbiAgdGFsb3MuY29udGV4dC5zdW0gKz0gZXZlbnRcbmdyb3cgPSAoIHRhbG9zICkgLT5cbiAgdGFsb3MuY29udGV4dC5wcm9kdWN0ICo9IDJcblxuXG50ZXN0ID0gLT5cbiAgQSA9IE1hY2hpbmUubWFrZVxuICAgIHN0YXJ0OlxuICAgICAgaG9sZDogXG4gICAgICAgIHJ1bjogYWRkXG4gICAgaG9sZDpcbiAgICAgIGhvbGQ6XG4gICAgICAgIHJ1bjogYWRkXG5cbiAgQiA9IE1hY2hpbmUubWFrZVxuICAgIHN0YXJ0OlxuICAgICAgZmlyc3Q6IFxuICAgICAgICBydW46IGdyb3dcbiAgICBmaXJzdDpcbiAgICAgIHNlY29uZDpcbiAgICAgICAgcnVuOiBncm93XG4gICAgc2Vjb25kOiBcbiAgICAgIGVuZDpcbiAgICAgICAgcnVuOiBncm93XG5cblxuICBbXG4gICAgaC50ZXN0IFwic3RhcnRcIiwgaC50YXJnZXQgXCJhc3luY1wiLCAtPlxuICAgICAgdGFsb3MgPSBzdGFydCBBXG4gICAgICBoLmFzc2VydCBUYWxvcy5pc1R5cGUgdGFsb3NcblxuICAgIGgudGVzdCBcInJ1biB3aGlsZSB3YWl0aW5nIG9uIGV2ZW50c1wiLCBoLnRhcmdldCBcImFzeW5jXCIsIC0+XG4gICAgICBldmVudHMgPSBbIFxuICAgICAgICBuZXcgUHJvbWlzZSAoIHJlc29sdmUsIHJlamVjdCApIC0+IHJlc29sdmUgMVxuICAgICAgICBuZXcgUHJvbWlzZSAoIHJlc29sdmUsIHJlamVjdCApIC0+IHJlc29sdmUgMlxuICAgICAgICBuZXcgUHJvbWlzZSAoIHJlc29sdmUsIHJlamVjdCApIC0+IHJlc29sdmUgM1xuICAgICAgXVxuICAgICAgdGFsb3MgPSBzdGFydCBBXG4gICAgICBhd2FpdCBydW4gdGFsb3MsIHN1bTogMCwgZXZlbnRzXG4gICAgICBoLmFzc2VydC5lcXVhbCA2LCB0YWxvcy5jb250ZXh0Py5zdW1cblxuICAgIGgudGVzdCBcImF1dG8tcnVuIHdpdGhvdXQgZXZlbnRzXCIsIGgudGFyZ2V0IFwiYXN5bmNcIiwgLT5cbiAgICAgIHRhbG9zID0gc3RhcnQgQlxuICAgICAgYXdhaXQgcnVuIHRhbG9zLCBwcm9kdWN0OiAxXG4gICAgICBoLmFzc2VydC5lcXVhbCA4LCB0YWxvcy5jb250ZXh0Py5wcm9kdWN0XG5cbiAgICBoLnRlc3QgXCJidWlsZFwiLCBoLnRhcmdldCBcImFzeW5jXCIsIC0+XG4gICAgICBmID0gYnVpbGQgQlxuICAgICAgaC5hc3NlcnQgVHlwZS5pc0Z1bmN0aW9uIGZcbiAgICAgIHRhbG9zID0gYXdhaXQgZiBwcm9kdWN0OiAxXG4gICAgICBoLmFzc2VydC5lcXVhbCA4LCB0YWxvcy5jb250ZXh0Py5wcm9kdWN0XG5cbiAgICBoLnRlc3QgXCJmbG93XCIsIGgudGFyZ2V0IFwiYXN5bmNcIiwgLT5cbiAgICAgIGEgPSAoIHRhbG9zLCBjb250ZXh0ICkgLT4gY29udGV4dC5zdW0gPSBhd2FpdCAxXG4gICAgICBiID0gKCB0YWxvcywgY29udGV4dCApIC0+IGNvbnRleHQuc3VtICs9IGF3YWl0IDJcbiAgICAgIGMgPSAoIHRhbG9zLCBjb250ZXh0ICkgLT4gY29udGV4dC5zdW0gKz0gYXdhaXQgMyBcblxuICAgICAgZiA9IGZsb3cgWyBhLCBiLCBjIF1cbiAgICAgIGguYXNzZXJ0IFR5cGUuaXNGdW5jdGlvbiBmXG4gICAgICBjb250ZXh0ID0gYXdhaXQgZiB7fVxuICAgICAgaC5hc3NlcnQuZXF1YWwgNiwgY29udGV4dD8uc3VtXG5cbiAgXVxuXG5leHBvcnQgeyB0ZXN0IGFzIGJhc2ljIH0iXSwibmFtZXMiOlsiYWRkIiwiZ3JvdyIsInRlc3QiLCJNYWNoaW5lIiwiVGFsb3MiLCIkc3RhcnQiLCIkZW5kIiwic3RhcnQiLCJydW4iLCJidWlsZCIsImZsb3ciLCJUeXBlIiwiaCIsInRhbG9zIiwiZXZlbnQiLCJjb250ZXh0Iiwic3VtIiwicHJvZHVjdCIsIkEiLCJCIiwibWFrZSIsImhvbGQiLCJmaXJzdCIsInNlY29uZCIsImVuZCIsInRhcmdldCIsImFzc2VydCIsImlzVHlwZSIsImV2ZW50cyIsInJlZiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXF1YWwiLCJmIiwiaXNGdW5jdGlvbiIsImEiLCJiIiwiYyIsImJhc2ljIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFBQSxLQUFBQyxNQUFBQztBQUFBLFNBQVNDLE9BQVQsRUFBa0JDLEtBQWxCLEVBQXlCQyxNQUF6QixFQUFpQ0MsSUFBakMsUUFBQSxZQUFBO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsR0FBaEIsRUFBcUJDLEtBQXJCLEVBQTRCQyxJQUE1QixRQUFBLGtCQUFBO0FBQ0EsWUFBT0MsVUFBUCxxQkFBQTtBQUNBLFlBQU9DLE9BQVAsYUFBQTtBQUVBWixNQUFNLFNBQUVhLEtBQUYsRUFBU0MsS0FBVDtXQUNKRCxNQUFNRSxPQUFPLENBQUNDLEdBQWQsSUFBcUJGO0FBRGpCO0FBRU5iLE9BQU8sU0FBRVksS0FBRjtXQUNMQSxNQUFNRSxPQUFPLENBQUNFLE9BQWQsSUFBeUI7QUFEcEI7QUFJUGYsT0FBTztJQUNQLElBQUFnQixHQUFBQztJQUFFRCxJQUFJZixRQUFRaUIsSUFBUixDQUNGO1FBQUFiLE9BQ0U7WUFBQWMsTUFDRTtnQkFBQWIsS0FBS1I7WUFBTDtRQURGO1FBRUZxQixNQUNFO1lBQUFBLE1BQ0U7Z0JBQUFiLEtBQUtSO1lBQUw7UUFERjtJQUpGO0lBT0ZtQixJQUFJaEIsUUFB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