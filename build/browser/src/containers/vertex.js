var Vertex, isAction, isNext, isSelector, verify;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
import { oneOf } from "../helpers.js";
isSelector = oneOf([Type.isString, Type.isSymbol, Type.isRegExp, Type.isFunction]);
isNext = oneOf([Type.isString, Type.isSymbol, Type.isFunction]);
isAction = oneOf([Type.isUndefined, Type.isFunction]);
verify = function (options) {
  var action, next, selector;
  ({
    selector,
    next,
    action
  } = options);
  if (!isSelector(selector)) {
    throw new Error(`Vertext.create: invalid selector, ${selector}`);
  }
  if (!isNext(next)) {
    throw new Error(`Vertex.create: invalid next, ${next}`);
  }
  if (!isAction(action)) {
    throw new Error(`Vertex.create: invalid action, ${action}`);
  }
};
Vertex = function () {
  class Vertex {
    constructor({
      selector: selector1,
      next: next1,
      action: action1
    }) {
      this.selector = selector1;
      this.next = next1;
      this.action = action1;
      this;
    }
    static create(options) {
      verify(options);
      return new Vertex(options);
    }
  }
  ;
  Meta.mixin(Vertex.prototype, [Meta.getters({
    test: function () {
      return this._test != null ? this._test : this._test = function () {
        if (Type.isString(this.selector)) {
          return talos => {
            return this.selector === talos.state;
          };
        } else if (Type.isSymbol(this.selector)) {
          return talos => {
            return this.selector === talos.state;
          };
        } else if (Type.isRegExp(this.selector)) {
          return talos => {
            return Type.isString(talos.state) && this.selector.test(talos.state);
          };
        } else if (Type.isRegularFunction(this.selector)) {
          return talos => {
            return this.selector(talos, this);
          };
        } else if (Type.isAsyncFunction(this.selector)) {
          return async talos => {
            return await this.selector(talos, this);
          };
        } else {
          throw new Error("Vertex#test unknown selector test, unable to match state");
        }
      }.call(this);
    },
    hasAsyncSelector: function () {
      return Type.isAsyncFunction(this.test);
    }
  })]);
  Vertex.isType = Type.isType(Vertex);
  return Vertex;
}.call(this);
export { Vertex };