import { makeAutoObservable, runInAction } from "mobx";
import { generateSensDpiPairs } from "../utils/dpiCalc";
import type { UserFormFields } from "../interfaces/formTypes";
import { userFormSchema, transformStoreValuesToZod } from "../schemas/userFormSchema";
import type { DpiParamsValues } from "../schemas/dpiSchema";
import type { SensDpiPair } from "../interfaces/calcTypes";

export class UserFormStore implements UserFormFields {
    name: string = "";
    currentSens: number | null = null;
    currentDpi: number | null = null;
    desiredDpi: number | null = null;
    dpiInc: number | null = null;

    submitLocked: boolean = false;
    submitError: string | null = null;
    fieldErrors: Partial<Record<keyof UserFormFields, string>> = {};
    private readonly fieldKeys = [
        "name",
        "currentSens",
        "currentDpi",
        "desiredDpi",
        "dpiInc",
    ] as const;

    private isUserFormField(key: unknown): key is keyof UserFormFields {
        return typeof key === "string" && this.fieldKeys.includes(key as (typeof this.fieldKeys)[number]);
    }

    constructor() {
        makeAutoObservable(this);
    }

    // Computed: Returns transformed form values ready for Zod validation
    get validatedFormValues() {
        return transformStoreValuesToZod({
            name: this.name,
            currentSens: this.currentSens,
            currentDpi: this.currentDpi,
            desiredDpi: this.desiredDpi,
            dpiInc: this.dpiInc,
        });
    }

    // Computed: Returns validation result
    get isFormValid() {
        const result = userFormSchema.safeParse(this.validatedFormValues);
        return result.success;
    }

    // Computed: Returns validated DpiParams when form is valid, null otherwise
    get dpiParams(): DpiParamsValues | null {
        if (!this.isFormValid) {
            return null;
        }
        const validated = userFormSchema.parse(this.validatedFormValues);
        return {
            orgSens: validated.currentSens,
            currentDpi: validated.currentDpi,
            desiredDpi: validated.desiredDpi,
            dpiAcceptableInterval: validated.dpiInc,
        };
    }

    // Computed: Automatically calculates sens/dpi pairs when dpiParams is available
    get sensDpiPairs(): readonly SensDpiPair[] {
        const params = this.dpiParams;
        if (!params) {
            return [];
        }
        try {
            return generateSensDpiPairs(params);
        } catch (error) {
            // Return empty array if calculation fails
            return [];
        }
    }

    // Computed: Boolean indicating if calculation results exist
    get hasCalculationResults(): boolean {
        return this.sensDpiPairs.length > 0;
    }

    setName = (name: string) => {
        this.name = name;
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

    validateField = (fieldName: keyof UserFormFields): boolean => {
        const result = userFormSchema.safeParse(this.validatedFormValues);

        if (!result.success) {
            const fieldError = result.error.issues.find(
                (issue) => this.isUserFormField(issue.path[0]) && issue.path[0] === fieldName
            );
            this.fieldErrors[fieldName] = fieldError?.message;
            return false;
        }

        this.fieldErrors[fieldName] = undefined;
        return true;
    };

    validateForm = (): boolean => {
        const result = userFormSchema.safeParse(this.validatedFormValues);

        if (!result.success) {
            // Update all field errors
            const newErrors: Partial<Record<keyof UserFormFields, string>> = {};
            result.error.issues.forEach((err) => {
                const fieldName = err.path[0];
                if (this.isUserFormField(fieldName)) {
                    newErrors[fieldName] = err.message;
                }
            });
            this.fieldErrors = newErrors;
            return false;
        }

        // Clear all errors if validation passes
        this.fieldErrors = {};
        return true;
    };

    get canSubmit() {
        // Use computed isFormValid and check submit lock status
        return this.isFormValid && !this.submitLocked;
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
            // Use computed sensDpiPairs which automatically calculates when form is valid
            const results = this.sensDpiPairs;
            console.log(results);

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
