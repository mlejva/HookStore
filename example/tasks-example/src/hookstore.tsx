import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';

interface State {
    [name: string]: any;
}

type Getter<TSlice, TGetterReturn> = (slice: TSlice) => TGetterReturn;
type Setter<TSlice, TNewValue> = (slice: TSlice, newValue: TNewValue) => TSlice;
type SliceName = string;
type Selector<TGetterReturn, TNewValue, TSlice = any> = [Getter<TSlice, TGetterReturn>, Setter<TSlice, TNewValue>, SliceName];

let initialState: State = {};
export const ReducerContext = createContext(initialState);

interface Action { sliceName: SliceName, value: any };
function reduce(state: State, action: Action): State {
  return {
    ...state,
    [action.sliceName]: action.value,
  };
}

export function useStore<TSlice, TGetterReturn, TNewValue>(
    selector: Selector<TGetterReturn, TNewValue, TSlice>):
    [TGetterReturn, (newValue: TNewValue) => void]
{
    const [getter, setter, sliceName] = selector;
    const { state, dispatch } = useContext(ReducerContext);

    function setValueWrapper(newValue: TNewValue) {
        const value = setter(state[sliceName], newValue);
        dispatch({sliceName, value});
        // Reducer step.
        /*
        const newSlice = setter(state[sliceName], newValue);
        state[sliceName] = { ...newSlice };
        console.log('STATE', state);

        const val = getter(state[sliceName]);
        */
        // setValue(newValue);
    }

    // TODO
    console.log('WILL RETURN', state, selector);
    return [getter(state[sliceName]), setValueWrapper];
}

export function createSlice<TSlice>(sliceName: SliceName, initialValue: TSlice) {
  initialState[sliceName] = initialValue;
  const createSelector = <TGetterReturn, TNewValue>(
    getter: Getter<TSlice, TGetterReturn>,
    setter: Setter<TSlice, TNewValue>) =>
  {
    // this.selectors.push([getter, setter]);
    // TODO: This is almost useless.
    return [getter, setter, sliceName] as Selector<TGetterReturn, TNewValue, TSlice>;
  }
  return { createSelector };
}

interface ReducerProviderProps {
  children: React.ReactNode;
}

function ReducerProvider(props: ReducerProviderProps) {
  const [state, dispatch] = useReducer(reduce, initialState);
  return (
    <ReducerContext.Provider value={{state, dispatch}}>
      {props.children}
    </ReducerContext.Provider>
  );
}

export default ReducerProvider;

