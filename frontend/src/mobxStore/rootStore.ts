import { UIStore } from "./uiStore";

export class RootStore {
    ui: UIStore;

    constructor() {
        this.ui = new UIStore();
    }
}

export type RootStoreType = RootStore;
