import { useReducer } from 'react';

const noop = () => { };
let globalStore: any = {};

type Getter<G, T> = (store: T) => G;
// type Setter<S, T> = (store: T, value: S) => T;
type Setter<S, T> = (store: T, value: S) => void;

type Selector<G, S, T> = [Getter<G, T>, Setter<S, T>, string]; // string is a name of the store associated with this selector

class Store<T = any> {
  constructor(private _name: string, private _store: T) {
    globalStore[this._name] = this._store;
  }

  // TODO: Setter can be optional because maybe I just want to read from the store.
  createSelector<G, S>(getter: Getter<G, T>, setter?: Setter<S, T>): Selector<G, S, T> {
    if (setter) {
      return [getter, setter, this._name];
    } else {
      return [getter, noop, this._name];
    }
  }
}

const stores: Store[] = [];

export function createStore<T = any>(name: string, newStore: T) {
  const s = new Store<T>(name, newStore);
  stores.push(s);
  return s;
}

function reducer(state: typeof globalStore, action: any) {
  // console.log('REDUCER state', state);
  // console.log('REDUCER action', action);

  return {
    ...state,
    [action.name]: action.value,
    // ...action.value,
  };
}


// This type is for:
// 1) wrapper('');
// 2) wrapper(current => '');
type SetterWrapperValue<S> = S | ((value: S) => S);
type SetterWrapper<S> = (value: SetterWrapperValue<S>) => void;

export function useStore<G, S, T>(selector: Selector<G, S, T>): [G, SetterWrapper<S>] {
  const [state, dispatch] = useReducer(reducer, globalStore);
  const [getter, setter, storeName] = selector;

  function wrapper(param: any) {
    // TODO: Support an async setter.
    if (setter !== noop) {
      if (typeof param === 'function') {
        const value = param(getter(state[storeName]));
        setter(state[storeName], value);
        dispatch({ name: storeName, value: state[storeName] });
      } else {
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
  return [getter(state[storeName]) as G, wrapper as SetterWrapper<S>];
}
