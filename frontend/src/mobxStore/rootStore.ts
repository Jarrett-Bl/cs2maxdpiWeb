import { ApiClient } from "../services/ApiClient";
import { MytableService } from "../services/mytableService";
import { MytableStore } from "./mytableStore";
import { UIStore } from "./uiStore";
import { UserFormStore } from "./userFormStores";

export class RootStore {
    ui: UIStore;
    userForm: UserFormStore;
    readonly mytable: MytableStore;

    constructor() {
        this.ui = new UIStore();
        this.userForm = new UserFormStore();

        const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL ?? "");
        const mytableService = new MytableService(apiClient);
        this.mytable = new MytableStore(mytableService);
    }
}

export type RootStoreType = RootStore;
