import { makeAutoObservable, runInAction } from "mobx";
import { generateSensDpiPairs } from "../utils/dpi_test";

export interface UserFormState {
    name: string;
    currentSens: number | null;
    currentDpi: number | null;
    desiredDpi: number | null;
    dpiInc: number | null;
    submitLocked: boolean;
    submitError: string | null;
}

const DEFAULT_USER_FORM_STATE: UserFormState = {
    name: "",
    currentSens: null,
    currentDpi: null,
    desiredDpi: null,
    dpiInc: null,
    submitLocked: false,
    submitError: null,
};

export class UserFormStore {
    state: UserFormState = { ...DEFAULT_USER_FORM_STATE };

    constructor() {
        makeAutoObservable(this);
    }

    setName(name: string) {
        this.state.name = name;
    }
    setCurrentSens(sens: number | null) {
        this.state.currentSens = sens;
    }
    setCurrentDpi(dpi: number | null) {
        this.state.currentDpi = dpi;
    }
    setDesiredDpi(dpi: number | null) {
        this.state.desiredDpi = dpi;
    }
    setDpiInc(dpi: number | null) {
        this.state.dpiInc = dpi;
    }

    // derived state
    get canSubmit() {
        return (
            this.state.name.trim().length > 0 &&
            this.state.currentSens !== null &&
            this.state.currentDpi !== null &&
            this.state.desiredDpi !== null &&
            this.state.dpiInc !== null &&
            !this.state.submitLocked
        );
    }

    submitForm = async () => {
        if (!this.canSubmit) return;

        this.state.submitError = null;
        this.state.submitLocked = true;

        try {
            const payload = {
                orgSens: this.state.currentSens,
                currentDpi: this.state.currentDpi,
                desiredDpi: this.state.desiredDpi,
                dpiAcceptableInterval: this.state.dpiInc,
            };

            const resp = generateSensDpiPairs(payload);
            console.log(resp);

            runInAction(() => {
                this.state.submitLocked = false;
            });
        } catch (error) {
            runInAction(() => {
                this.state.submitLocked = false;
                this.state.submitError =
                    error instanceof Error ? error.message : String(error);
            });
        }
    };

    reset = () => {
        this.state = { ...DEFAULT_USER_FORM_STATE };
    };
}
