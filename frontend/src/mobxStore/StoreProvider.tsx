import { useMemo } from "react";
import { StoreContext } from "./storeContext.ts";
import { RootStore } from "./rootStore";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const store = useMemo(() => new RootStore(), []);
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}
