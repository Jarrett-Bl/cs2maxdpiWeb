import { ApiClient } from "../services/ApiClient";
import { MytableService } from "../services/mytableService";
import { MytableStore } from "./mytableStore";
import { UIStore } from "./uiStore";
import { UserFormStore } from "./userFormStores";


//TODO: Separte API Client into APIService file 
//TODO: User form sumbission successfully, currently not retrieving form the database 

export class RootStore {
    ui: UIStore;
    userForm: UserFormStore;
    readonly mytable: MytableStore;

    constructor() {
        this.ui = new UIStore();

        const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL ?? "");
        const mytableService = new MytableService(apiClient);
        this.mytable = new MytableStore(mytableService);
        this.userForm = new UserFormStore(this.mytable);
    }
}

export type RootStoreType = RootStore;
