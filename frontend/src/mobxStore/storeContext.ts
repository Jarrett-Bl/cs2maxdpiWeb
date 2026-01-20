import { createContext, useContext } from "react";
import type { RootStore } from "./rootStore";

export const StoreContext = createContext<RootStore | null>(null);

export function useStores() {
    const store = useContext(StoreContext);
    if (!store) throw new Error("useStores must be used within a StoreProvider!!");
    return store;
}
