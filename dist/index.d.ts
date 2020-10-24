import React from 'react';
interface State {
    [name: string]: any;
}
declare type Noop = () => void;
declare type Getter<TSlice, TGetterReturn> = (slice: TSlice) => TGetterReturn;
declare type Setter<TSlice, TNewValue> = (slice: TSlice, newValue: TNewValue) => TSlice;
declare type SliceName = string;
declare type Selector<TGetterReturn, TNewValue, TSlice = any> = [Getter<TSlice, TGetterReturn>, Setter<TSlice, TNewValue>, SliceName];
export declare const ReducerContext: React.Context<State>;
export declare function useStore<TSlice, TGetterReturn, TNewValue>(selector: Selector<TGetterReturn, TNewValue, TSlice>): [TGetterReturn, (newValue: TNewValue) => void];
export declare function createSlice<TSlice>(sliceName: SliceName, initialValue: TSlice): {
    createSelector: <TGetterReturn, TNewValue = null>(getter: Getter<TSlice, TGetterReturn>, setter?: Noop | Setter<TSlice, TNewValue>) => Selector<TGetterReturn, TNewValue, TSlice>;
};
interface ReducerProviderProps {
    children: React.ReactNode;
}
declare function ReducerProvider(props: ReducerProviderProps): JSX.Element;
export default ReducerProvider;
