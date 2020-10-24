import React, { createContext, useContext, useReducer } from 'react';
const noop = () => { };
let initialState = {};
export const ReducerContext = createContext(initialState);
;
function reduce(state, action) {
    return Object.assign(Object.assign({}, state), { [action.sliceName]: action.value });
}
export function useStore(selector) {
    const [getter, setter, sliceName] = selector;
    const { state, dispatch } = useContext(ReducerContext);
    function setValueWrapper(newValue) {
        const value = setter(state[sliceName], newValue);
        dispatch({ sliceName, value });
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
export function createSlice(sliceName, initialValue) {
    initialState[sliceName] = initialValue;
    const createSelector = (getter, setter = noop) => {
        // this.selectors.push([getter, setter]);
        // TODO: This is almost useless.
        return [getter, setter, sliceName];
    };
    return { createSelector };
}
function HookStoreProvider(props) {
    const [state, dispatch] = useReducer(reduce, initialState);
    return (React.createElement(ReducerContext.Provider, { value: { state, dispatch } }, props.children));
}
export default ReducerProvider;
//# sourceMappingURL=index.js.map