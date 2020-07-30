declare type Getter<G, T> = (store: T) => G;
declare type Setter<S, T> = (store: T, value: S) => void;
declare type Selector<G, S, T> = [Getter<G, T>, Setter<S, T>, string];
declare class Store<T = any> {
    private _name;
    private _store;
    constructor(_name: string, _store: T);
    createSelector<G, S>(getter: Getter<G, T>, setter?: Setter<S, T>): Selector<G, S, T>;
}
export declare function createStore<T = any>(name: string, newStore: T): Store<T>;
declare type SetterWrapperValue<S> = S | ((value: S) => S);
declare type SetterWrapper<S> = (value: SetterWrapperValue<S>) => void;
export declare function useStore<G, S, T>(selector: Selector<G, S, T>): [G, SetterWrapper<S>];
export {};
