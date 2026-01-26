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
    fieldErrors: Record<string, string | undefined> = {};

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

    // Generic setter method to reduce duplication
    private setField<K extends keyof UserFormFields>(
        fieldName: K,
        value: UserFormFields[K]
    ) {
        (this[fieldName] as UserFormFields[K]) = value;
        // Clear error for this field when user starts typing
        if (this.fieldErrors[fieldName as string]) {
            this.fieldErrors[fieldName as string] = undefined;
        }
    }

    setName = (name: string) => {
        this.setField("name", name);
    };

    setCurrentSens = (sens: number | null) => {
        this.setField("currentSens", sens);
    };

    setCurrentDpi = (dpi: number | null) => {
        this.setField("currentDpi", dpi);
    };

    setDesiredDpi = (dpi: number | null) => {
        this.setField("desiredDpi", dpi);
    };

    setDpiInc = (dpi: number | null) => {
        this.setField("dpiInc", dpi);
    };

    validateField = (fieldName: keyof typeof this.fieldErrors): boolean => {
        const result = userFormSchema.safeParse(this.validatedFormValues);

        if (!result.success) {
            const fieldError = result.error.issues.find((issue) => issue.path[0] === fieldName);
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
