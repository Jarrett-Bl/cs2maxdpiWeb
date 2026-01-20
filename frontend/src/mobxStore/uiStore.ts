import { makeAutoObservable } from "mobx";

export class UIStore {
    lightMode = false;
    search = "";

    constructor() {
        makeAutoObservable(this);
    }

    toggleLightMode = () => {
        this.lightMode = !this.lightMode;
    };

    setSearch = (value: string) => {
        this.search = value;
    };
}
