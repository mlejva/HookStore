import { useState, useEffect } from 'react';

interface State {
    [name: string]: any;
}

type Getter<TSlice, TGetterReturn> = (slice: TSlice) => TGetterReturn;
type Setter<TSlice, TNewValue> = (slice: TSlice, newValue: TNewValue) => TSlice;
type SliceName = string;
type Selector<TGetterReturn, TNewValue, TSlice = any> = [Getter<TSlice, TGetterReturn>, Setter<TSlice, TNewValue>, SliceName];

let state: State = {};

export function useStore<TSlice, TGetterReturn, TNewValue>(
    selector: Selector<TGetterReturn, TNewValue, TSlice>): 
    [TGetterReturn, (newValue: TNewValue) => void]  
{
    const [getter, setter, sliceName] = selector;
    const [value, setValue] = useState<TGetterReturn>(getter(state[sliceName]));

    useEffect(() => {
        // TODO
    }, [selector]);

    function setValueWrapper(newValue: TNewValue) {
        // Reducer step.
        const newSlice = setter(state[sliceName], newValue);
        state[sliceName] = newSlice;

        const val = getter(state[sliceName]);
        setValue(val);
    }

    // TODO
    return [value, setValueWrapper];
}

// TODO: This class is also almost useless.
class Slice<TSlice> {
    // selectors: Selector[] = [];
    constructor(private name: string, initialState: TSlice) {
        if (state[name]) {
            // TODO: Warning/error that a slice with the name already exists.
        } else {
            state[name] = initialState;
        }
    }

    createSelector<TGetterReturn, TNewValue>(
        getter: Getter<TSlice, TGetterReturn>, 
        setter: Setter<TSlice, TNewValue>)
        : Selector<TGetterReturn, TNewValue, TSlice> 
    {
        // this.selectors.push([getter, setter]);
        // TODO: This is almost useless.
        return [getter, setter, this.name];
    }
}

export function createSlice<TSlice>(name: string, initial: TSlice) {
    return new Slice<TSlice>(name, initial);
}

////////////////////////////////////////////////

// Framework:
// Received a selector as a parameter
// "register" getter and setter


// App:
// useFramework with a selector & return [value, setValue] based on the passed selector

// interface TodoItem {
//     title: string;
//     isCompleted: boolean;
// }

// interface TodoSlice {
//     work: TodoItem[];
//     personal: TodoItem[];
// }

// function initialState(): TodoSlice {
//     return {
//         work: [],
//         personal: [],          
//     }
// }

// const todo = createSlice('todo', initialState());
// const workTodosSelector = todo.createSelector<TodoItem[], TodoItem>(
//     slice => slice.work,
//     // This is basically a reducer action handler.
//     (slice, newWorkTodo) => ({
//         ...slice,
//         work: [...slice.work, newWorkTodo],
//     })
// );

// // addWorkTodo works here as a reducer dispatch. This dispatch is then handled 
// // by the workTodosSelector's setter. As mentioned above, this setter is
// // basically an action handler for this dispatch.
// const [workTodos, addWorkTodo] = useStore(workTodosSelector);

// const workTodo: TodoItem = { title: 'Work Todo', isCompleted: false };
// addWorkTodo(workTodo);
