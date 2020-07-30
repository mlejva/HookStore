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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useReducer } from 'react';
// export type GlobalStore = any;
// V is a type of the portion of the store that selector returns.
// T is a type of the value that the selector accepts and mutates the store with.
// export type Selector1<V, T> = () => [(store: any) => V, (store: any, newVal: T) => any]
// let store: GlobalStore = {};
// function reducer1(state: any, action: any) {
//   return { ...action.val };
// }
// export function useStore1<V, T>(selector: Selector1<V, T>) {
//   const [state, dispatch] = useReducer(reducer, store);
//   const [selectVal, setVal] = selector();
//   async function wrapper(params: any) {
//     let value = params;
//     if (typeof params === 'function') {
//       value = params(selectVal(state));
//     }
//     const newState = await setVal(state, value);
//     dispatch({ val: newState })
//   }
//   return [selectVal(state), wrapper];
// }
// export function createStore1(storeName: string, newStore: any) {
//   store = {
//     ...store,
//     [storeName]: newStore,
//   };
// }
// export type Getter<T = any> = (store: Store) => T;
// export type Setter<T = any> = (store: Store, value: T) => Store;
// export function createSelector<G, S>(getter: Getter<G>, setter: Setter<S>) {
//   return [getter, setter];
// }
var globalStore = {};
var Store = /** @class */ (function () {
    function Store(_name, _store) {
        this._name = _name;
        this._store = _store;
        globalStore[this._name] = this._store;
    }
    Store.prototype.createSelector = function (getter, setter) {
        return [getter, setter, this._name];
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
    function wrapper(newValue) {
        return __awaiter(this, void 0, void 0, function () {
            var newState;
            return __generator(this, function (_a) {
                newState = setter(state[storeName], newValue);
                dispatch({ name: storeName, value: newState });
                return [2 /*return*/];
            });
        });
    }
    // TODO: Don't use state but only a substore for this selector
    return [getter(state[storeName]), wrapper];
}
