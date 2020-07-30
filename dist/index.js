var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useReducer } from 'react';
var noop = function () { };
var globalStore = {};
var Store = /** @class */ (function () {
    function Store(_name, _store) {
        this._name = _name;
        this._store = _store;
        globalStore[this._name] = this._store;
    }
    // TODO: Setter can be optional because maybe I just want to read from the store.
    Store.prototype.createSelector = function (getter, setter) {
        if (setter) {
            return [getter, setter, this._name];
        }
        else {
            return [getter, noop, this._name];
        }
    };
    return Store;
}());
var stores = [];
export function createStore(name, newStore) {
    var s = new Store(name, newStore);
    stores.push(s);
    return s;
}
function reducer(state, action) {
    // console.log('REDUCER state', state);
    // console.log('REDUCER action', action);
    var _a;
    return __assign(__assign({}, state), (_a = {}, _a[action.name] = action.value, _a));
}
export function useStore(selector) {
    var _a = useReducer(reducer, globalStore), state = _a[0], dispatch = _a[1];
    var getter = selector[0], setter = selector[1], storeName = selector[2];
    function wrapper(param) {
        // TODO: Support an async setter.
        if (setter !== noop) {
            if (typeof param === 'function') {
                var value = param(getter(state[storeName]));
                setter(state[storeName], value);
                dispatch({ name: storeName, value: state[storeName] });
            }
            else {
                setter(state[storeName], param);
                dispatch({ name: storeName, value: state[storeName] });
            }
            // const newState = setter(state[storeName], newValue);
            // dispatch({ name: storeName, value: newState });
            // let value = params;
            // if (typeof params === 'function') {
            //   value = params(selectVal(state));
            // }
            // const newState = await setVal(state, value);
            // dispatch({ val: newState })
        }
    }
    // TODO: Automatically infer whether wrapper is a promise or not
    return [getter(state[storeName]), wrapper];
}
