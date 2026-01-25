import { makeAutoObservable, runInAction } from "mobx";
import { generateSensDpiPairs } from "../utils/dpiCalc";
import type { UserFormFields } from "../interfaces/formTypes";
import { userFormSchema, transformStoreValuesToZod } from "../schemas/userFormSchema";

export class UserFormStore implements UserFormFields {
    name: string = "";
    currentSens: number | null = null;
    currentDpi: number | null = null;
    desiredDpi: number | null = null;
    dpiInc: number | null = null;

    submitLocked: boolean = false;
    submitError: string | null = null;
    fieldErrors: Record<string, string | undefined> = {};

    constructor() {
        makeAutoObservable(this);
    }

    setName = (name: string) => {
        this.name = name;
        // Clear error for this field when user starts typing
        if (this.fieldErrors.name) {
            this.fieldErrors.name = undefined;
        }
    };

    setCurrentSens = (sens: number | null) => {
        this.currentSens = sens;
        if (this.fieldErrors.currentSens) {
            this.fieldErrors.currentSens = undefined;
        }
    };

    setCurrentDpi = (dpi: number | null) => {
        this.currentDpi = dpi;
        if (this.fieldErrors.currentDpi) {
            this.fieldErrors.currentDpi = undefined;
        }
    };

    setDesiredDpi = (dpi: number | null) => {
        this.desiredDpi = dpi;
        if (this.fieldErrors.desiredDpi) {
            this.fieldErrors.desiredDpi = undefined;
        }
    };

    setDpiInc = (dpi: number | null) => {
        this.dpiInc = dpi;
        if (this.fieldErrors.dpiInc) {
            this.fieldErrors.dpiInc = undefined;
        }
    };

    validateField = (fieldName: keyof typeof this.fieldErrors): boolean => {
        const values = transformStoreValuesToZod({
            name: this.name,
            currentSens: this.currentSens,
            currentDpi: this.currentDpi,
            desiredDpi: this.desiredDpi,
            dpiInc: this.dpiInc,
        });

        const result = userFormSchema.safeParse(values);

        if (!result.success) {
            //const fieldError = result.error.issues.find((issue) => issue.path.includes(fieldName));
            const fieldError = result.error.issues.find((issue) => issue.path[0] === fieldName);
            this.fieldErrors[fieldName] = fieldError?.message;
            return false;
        }

        this.fieldErrors[fieldName] = undefined;
        return true;
    };

    validateForm = (): boolean => {
        const values = transformStoreValuesToZod({
            name: this.name,
            currentSens: this.currentSens,
            currentDpi: this.currentDpi,
            desiredDpi: this.desiredDpi,
            dpiInc: this.dpiInc,
        });

        const result = userFormSchema.safeParse(values);

        if (!result.success) {
            // Update all field errors
            const newErrors: Record<string, string | undefined> = {};
            result.error.issues.forEach((err) => {
                const fieldName = err.path[0] as string;
                newErrors[fieldName] = err.message;
            });
            this.fieldErrors = newErrors;
            return false;
        }

        // Clear all errors if validation passes
        this.fieldErrors = {};
        return true;
    };

    get canSubmit() {
        // Check if form is valid by checking if there are no field errors
        // and all required fields have values
        const hasErrors = Object.values(this.fieldErrors).some((error) => error !== undefined);
        const hasRequiredFields =
            this.currentSens !== null &&
            this.currentDpi !== null &&
            this.desiredDpi !== null &&
            this.dpiInc !== null;
        return !hasErrors && hasRequiredFields && !this.submitLocked;
    }

    submitForm = async () => {
        // Validate form using Zod - this will update fieldErrors
        if (!this.validateForm()) {
            return;
        }

        if (this.submitLocked) return;

        this.submitError = null;
        this.submitLocked = true;

        try {
            // At this point, Zod validation has passed, so these values are guaranteed to be numbers
            const orgSens = this.currentSens!;
            const currentDpi = this.currentDpi!;
            const desiredDpi = this.desiredDpi!;
            const dpiAcceptableInterval = this.dpiInc!;

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
        this.fieldErrors = {};
    };
}
