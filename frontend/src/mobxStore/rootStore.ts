import { UIStore } from "./uiStore";
import { UserFormStore } from "./userFormStores";

export class RootStore {
    ui: UIStore;
    userForm: UserFormStore;

    constructor() {
        this.ui = new UIStore();
        this.userForm = new UserFormStore();
    }
}

export type RootStoreType = RootStore;
