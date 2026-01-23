import { makeAutoObservable, runInAction } from "mobx";
import { generateSensDpiPairs } from "../utils/dpi_test";
import type { UserFormFields } from "../interfaces/formTypes";

export class UserFormStore implements UserFormFields {
    name: string = "";
    currentSens: number | null = null;
    currentDpi: number | null = null;
    desiredDpi: number | null = null;
    dpiInc: number | null = null;

    submitLocked: boolean = false;
    submitError: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setName = (name: string) => {
        this.name = name;
    };

    setCurrentSens = (sens: number | null) => {
        this.currentSens = sens;
    };

    setCurrentDpi = (dpi: number | null) => {
        this.currentDpi = dpi;
    };

    setDesiredDpi = (dpi: number | null) => {
        this.desiredDpi = dpi;
    };

    setDpiInc = (dpi: number | null) => {
        this.dpiInc = dpi;
    };

    get canSubmit() {
        return (
            this.name.trim().length > 0 &&
            this.currentSens !== null &&
            this.currentDpi !== null &&
            this.desiredDpi !== null &&
            this.dpiInc !== null &&
            !this.submitLocked
        );
    }

    submitForm = async () => {
        if (!this.canSubmit) return;

        this.submitError = null;
        this.submitLocked = true;

        try {
            const orgSens = this.currentSens;
            const currentDpi = this.currentDpi;
            const desiredDpi = this.desiredDpi;
            const dpiAcceptableInterval = this.dpiInc;

            if (
                orgSens === null ||
                currentDpi === null ||
                desiredDpi === null ||
                dpiAcceptableInterval === null
            ) {
                throw new Error("Missing required fields.");
            }

            const payload = { orgSens, currentDpi, desiredDpi, dpiAcceptableInterval };

            const resp = generateSensDpiPairs(payload);
            console.log(resp);

            runInAction(() => {
                this.submitLocked = false;
            });
        } catch (error) {
            runInAction(() => {
                this.submitLocked = false;
                this.submitError = error instanceof Error ? error.message : String(error);
            });
        }
    };

    reset = () => {
        this.name = "";
        this.currentSens = null;
        this.currentDpi = null;
        this.desiredDpi = null;
        this.dpiInc = null;
        this.submitLocked = false;
        this.submitError = null;
    };
}
