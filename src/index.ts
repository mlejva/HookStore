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


let globalStore: any = {};

type Getter<G, T> = (store: T) => G;
type Setter<S, T> = (store: T, value: S) => T;

type Selector<G, S, T> = [Getter<G, T>, Setter<S, T>, string]; // string is a name of the store associated with this selector

class Store<T = any> {
  constructor(private _name: string, private _store: T) {
    globalStore[this._name] = this._store;
  }

  createSelector<G, S>(getter: Getter<G, T>, setter: Setter<S, T>): Selector<G, S, T> {
    return [getter, setter, this._name];
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

export function useStore<G, S, T>(selector: Selector<G, S, T>): [G, (p: S) => Promise<void> | void] {
  const [state, dispatch] = useReducer(reducer, globalStore);
  const [getter, setter, storeName] = selector;


  async function wrapper(newValue: S) {
    // TODO: Don't use state but only a substore for this selector
    const newState = setter(state[storeName], newValue);
    dispatch({ name: storeName, value: newState });

    // let value = params;
    // if (typeof params === 'function') {
    //   value = params(selectVal(state));
    // }
    // const newState = await setVal(state, value);
    // dispatch({ val: newState })
  }

  // TODO: Don't use state but only a substore for this selector
  return [getter(state[storeName]) as G, wrapper as (p: S) => Promise<void> | void];
}
