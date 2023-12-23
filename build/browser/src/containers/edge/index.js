var Edge, make;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { generic } from "@dashkite/joy/generic";
import * as Make from "./make";
make = generic({
    name: "edge make",
    default: function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        throw new Error(`Edge.make: input is malformed ${JSON.stringify(args)}`);
    }
});
generic(make, Type.isObject, function(edge) {
    return new Edge({
        accept: Make.accept(edge.accept),
        run: Make.run(edge.run),
        move: Make.move(edge.move)
    });
});
Edge = (function() {
    class Edge {
        constructor({ accept, run, move }){
            this.accept = accept;
            this.run = run;
            this.move = move;
        }
        clone() {
            return new Edge({
                accept: this.accept,
                run: this.run,
                move: this.move
            });
        }
    }
    ;
    Meta.mixin(Edge.prototype, [
        Meta.getters({})
    ]);
    Edge.make = make;
    Edge.isType = Type.isType(Edge);
    return Edge;
}).call(this);
export { Edge }; //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2NvbnRhaW5lcnMvZWRnZS9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxJQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFBLFFBQVAsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxPQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQUEsUUFBUCxNQUFBOztBQUdBLElBQUEsR0FBTyxPQUFBLENBQ0w7RUFBQSxJQUFBLEVBQU0sV0FBTjtFQUNBLE9BQUEsRUFBUyxRQUFBLENBQUEsR0FBRSxJQUFGLENBQUE7SUFDUCxNQUFNLElBQUksS0FBSixDQUFVLENBQUEsOEJBQUEsQ0FBQSxDQUFpQyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWYsQ0FBakMsQ0FBQSxDQUFWO0VBREM7QUFEVCxDQURLOztBQUtQLE9BQUEsQ0FBUSxJQUFSLEVBQWMsSUFBSSxDQUFDLFFBQW5CLEVBQTZCLFFBQUEsQ0FBRSxJQUFGLENBQUE7U0FDM0IsSUFBSSxJQUFKLENBQ0U7SUFBQSxNQUFBLEVBQVEsSUFBSSxDQUFDLE1BQUwsQ0FBWSxJQUFJLENBQUMsTUFBakIsQ0FBUjtJQUNBLEdBQUEsRUFBSyxJQUFJLENBQUMsR0FBTCxDQUFTLElBQUksQ0FBQyxHQUFkLENBREw7SUFFQSxJQUFBLEVBQU0sSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFJLENBQUMsSUFBZjtFQUZOLENBREY7QUFEMkIsQ0FBN0I7O0FBT007RUFBTixNQUFBLEtBQUE7SUFDRSxXQUFhLENBQUMsT0FBQSxLQUFBLE1BQUEsQ0FBRCxDQUFBO01BQUcsSUFBQyxDQUFBO01BQVEsSUFBQyxDQUFBO01BQUssSUFBQyxDQUFBO0lBQW5COztJQVNiLEtBQU8sQ0FBQSxDQUFBO2FBQ0wsSUFBSSxJQUFKLENBQVMsQ0FBRyxRQUFELElBQUMsQ0FBQSxNQUFILEVBQVksS0FBRCxJQUFDLENBQUEsR0FBWixFQUFrQixNQUFELElBQUMsQ0FBQSxJQUFsQixDQUFUO0lBREs7O0VBVlQ7O0VBR0UsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFDLENBQUEsU0FBWixFQUFnQixDQUNkLElBQUksQ0FBQyxPQUFMLENBQWEsQ0FBQSxDQUFiLENBRGMsQ0FBaEI7O0VBSUEsSUFBQyxDQUFBLElBQUQsR0FBTzs7RUFDUCxJQUFDLENBQUEsTUFBRCxHQUFTLElBQUksQ0FBQyxNQUFMLENBQVksSUFBWjs7Ozs7O0FBTVgsT0FBQTtFQUNFLElBREYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAZGFzaGtpdGUvam95L3R5cGVcIlxuaW1wb3J0IHsgZ2VuZXJpYyB9IGZyb20gXCJAZGFzaGtpdGUvam95L2dlbmVyaWNcIlxuaW1wb3J0ICogYXMgTWFrZSBmcm9tIFwiLi9tYWtlXCJcblxuXG5tYWtlID0gZ2VuZXJpYyBcbiAgbmFtZTogXCJlZGdlIG1ha2VcIlxuICBkZWZhdWx0OiAoIGFyZ3MuLi4gKSAtPiBcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJFZGdlLm1ha2U6IGlucHV0IGlzIG1hbGZvcm1lZCAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuZ2VuZXJpYyBtYWtlLCBUeXBlLmlzT2JqZWN0LCAoIGVkZ2UgKSAtPlxuICBuZXcgRWRnZVxuICAgIGFjY2VwdDogTWFrZS5hY2NlcHQgZWRnZS5hY2NlcHRcbiAgICBydW46IE1ha2UucnVuIGVkZ2UucnVuXG4gICAgbW92ZTogTWFrZS5tb3ZlIGVkZ2UubW92ZVxuXG5cbmNsYXNzIEVkZ2VcbiAgY29uc3RydWN0b3I6ICh7IEBhY2NlcHQsIEBydW4sIEBtb3ZlIH0pIC0+XG5cbiAgTWV0YS5taXhpbiBAOjosIFtcbiAgICBNZXRhLmdldHRlcnMge31cbiAgXVxuXG4gIEBtYWtlOiBtYWtlXG4gIEBpc1R5cGU6IFR5cGUuaXNUeXBlIEBcblxuICBjbG9uZTogLT5cbiAgICBuZXcgRWRnZSB7IEBhY2NlcHQsIEBydW4sIEBtb3ZlIH1cblxuXG5leHBvcnQge1xuICBFZGdlXG59Il19
 //# sourceURL=src/containers/edge/index.coffee

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL2VkZ2UvaW5kZXguY29mZmVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE1ldGEgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvbWV0YWNsYXNzXCJcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5pbXBvcnQgeyBnZW5lcmljIH0gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZ2VuZXJpY1wiXG5pbXBvcnQgKiBhcyBNYWtlIGZyb20gXCIuL21ha2VcIlxuXG5cbm1ha2UgPSBnZW5lcmljIFxuICBuYW1lOiBcImVkZ2UgbWFrZVwiXG4gIGRlZmF1bHQ6ICggYXJncy4uLiApIC0+IFxuICAgIHRocm93IG5ldyBFcnJvciBcIkVkZ2UubWFrZTogaW5wdXQgaXMgbWFsZm9ybWVkICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5nZW5lcmljIG1ha2UsIFR5cGUuaXNPYmplY3QsICggZWRnZSApIC0+XG4gIG5ldyBFZGdlXG4gICAgYWNjZXB0OiBNYWtlLmFjY2VwdCBlZGdlLmFjY2VwdFxuICAgIHJ1bjogTWFrZS5ydW4gZWRnZS5ydW5cbiAgICBtb3ZlOiBNYWtlLm1vdmUgZWRnZS5tb3ZlXG5cblxuY2xhc3MgRWRnZVxuICBjb25zdHJ1Y3RvcjogKHsgQGFjY2VwdCwgQHJ1biwgQG1vdmUgfSkgLT5cblxuICBNZXRhLm1peGluIEA6OiwgW1xuICAgIE1ldGEuZ2V0dGVycyB7fVxuICBdXG5cbiAgQG1ha2U6IG1ha2VcbiAgQGlzVHlwZTogVHlwZS5pc1R5cGUgQFxuXG4gIGNsb25lOiAtPlxuICAgIG5ldyBFZGdlIHsgQGFjY2VwdCwgQHJ1biwgQG1vdmUgfVxuXG5cbmV4cG9ydCB7XG4gIEVkZ2Vcbn0iXSwibmFtZXMiOlsiRWRnZSIsIm1ha2UiLCJNZXRhIiwiVHlwZSIsImdlbmVyaWMiLCJNYWtlIiwibmFtZSIsImRlZmF1bHQiLCJhcmdzIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNPYmplY3QiLCJlZGdlIiwiYWNjZXB0IiwicnVuIiwibW92ZSIsImNvbnN0cnVjdG9yIiwiY2xvbmUiLCJtaXhpbiIsInByb3RvdHlwZSIsImdldHRlcnMiLCJpc1R5cGUiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBLE1BQUFDO0FBQUEsWUFBT0MsVUFBUCwwQkFBQTtBQUNBLFlBQU9DLFVBQVAscUJBQUE7QUFDQSxTQUFTQyxPQUFULFFBQUEsd0JBQUE7QUFDQSxZQUFPQyxVQUFQLFNBQUE7QUFHQUosT0FBT0csUUFDTDtJQUFBRSxNQUFNO0lBQ05DLFNBQVM7UUFBQSxJQUFBLElBQUEsT0FBQSxVQUFBLFFBQUEsQUFBRUMsT0FBRixVQUFBLE9BQUEsT0FBQSxHQUFBLE9BQUEsTUFBQSxPQUFBO1lBQUVBLEtBQUYsUUFBQSxTQUFBLENBQUEsS0FBQTtRQUFFO1FBQ1QsTUFBTSxJQUFJQyxNQUFNLENBQUEsOEJBQUEsRUFBaUNDLEtBQUtDLFNBQUwsQ0FBZUgsTUFBaEQsQ0FBVjtJQURDO0FBRFQ7QUFJRkosUUFBUUgsTUFBTUUsS0FBS1MsUUFBbkIsRUFBNkIsU0FBRUMsSUFBRjtXQUMzQixJQUFJYixLQUNGO1FBQUFjLFFBQVFULEtBQUtTLE1BQUwsQ0FBWUQsS0FBS0MsTUFBakI7UUFDUkMsS0FBS1YsS0FBS1UsR0FBTCxDQUFTRixLQUFLRSxHQUFkO1FBQ0xDLE1BQU1YLEtBQUtXLElBQUwsQ0FBVUgsS0FBS0csSUFBZjtJQUZOO0FBRnlCO0FBT3ZCaEIsT0FBQSxDQUFBO0lBQU4sTUFBQUE7UUFDRWlCLFlBQWMsRUFBQUgsTUFBQSxFQUFBQyxHQUFBLEVBQUFDLElBQUEsRUFBRCxDQUFBO1lBQUcsSUFBQyxDQUFBRixNQUFBLEdBQUFBO1lBQVEsSUFBQyxDQUFBQyxHQUFBLEdBQUFBO1lBQUssSUFBQyxDQUFBQyxJQUFBLEdBQUFBO1FBQW5CO1FBU2JFLFFBQU87bUJBQ0wsSUFBSWxCLEtBQUs7Z0JBQUdjLFFBQUQsSUFBQyxDQUFBQSxNQUFIO2dCQUFZQyxLQUFELElBQUMsQ0FBQUEsR0FBWjtnQkFBa0JDLE1BQUQsSUFBQyxDQUFBQSxJQUFsQjtZQUFBO1FBREo7SUFWVDs7SUFHRWQsS0FBS2lCLEtBQUwsQ0FBV25CLEtBQUNvQixTQUFaLEVBQWdCO1FBQ2RsQixLQUFLbUIsT0FBTCxDQUFhLENBQUE7S0FEZjtJQUlBckIsS0FBQ0MsSUFBRCxHQUFPQTtJQUNQRCxLQUFDc0IsTUFBRCxHQUFTbkIsS0FBS21CLE1BQUwsQ0FBWXRCOzs7QUFNdkIsU0FDRUEsSUFERiJ9