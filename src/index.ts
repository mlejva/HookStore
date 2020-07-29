import { useReducer } from 'react';

export type Store = any;
// V is a type of the portion of the store that selector returns.
// T is a type of the value that the selector accepts and mutates the store with.
export type Selector<V, T> = () => [(store: Store) => V, (store: Store, newVal: T) => Store]

let store: Store = {};

function reducer(state: any, action: any) {
  return { ...action.val };
}

export function useStore<V, T>(selector: Selector<V, T>) {
  const [state, dispatch] = useReducer(reducer, store);
  const [selectVal, setVal] = selector();

  async function wrapper(params: any) {
    let value = params;
    if (typeof params === 'function') {
      value = params(selectVal(state));
    }
    const newState = await setVal(state, value);
    dispatch({ val: newState })
  }

  return [selectVal(state), wrapper];
}

export function createStore(storeName: string, newStore: Store) {
  store = {
    ...store,
    [storeName]: newStore,
  };
}

