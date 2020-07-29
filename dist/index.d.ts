export declare type Store = any;
export declare type Selector<V, T> = () => [(store: Store) => V, (store: Store, newVal: T) => Store];
export declare function useStore<V, T>(selector: Selector<V, T>): (V | ((params: any) => Promise<void>))[];
export declare function createStore(storeName: string, newStore: Store): void;
