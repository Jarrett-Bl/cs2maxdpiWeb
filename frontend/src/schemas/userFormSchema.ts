import { z } from "zod";
import type { UserFormFields } from "../interfaces/formTypes";

// Helper to preprocess number fields: convert empty strings/null to undefined, then validate
const preprocessNumber = (errorMessage: string) =>
    z.preprocess(
        (val) => {
            if (val === "" || val === null || val === undefined) return undefined;
            const num = typeof val === "string" ? Number(val) : val;
            return Number.isFinite(num) ? num : undefined;
        },
        z
            .union([z.number(), z.undefined()])
            .refine((val) => val !== undefined, { error: errorMessage })
            .pipe(z.number().positive({ error: errorMessage }))
    );

const preprocessInteger = (errorMessage: string, positiveMessage: string) =>
    z.preprocess(
        (val) => {
            if (val === "" || val === null || val === undefined) return undefined;
            const num = typeof val === "string" ? Number(val) : val;
            return Number.isFinite(num) ? num : undefined;
        },
        z
            .union([z.number(), z.undefined()])
            .refine((val) => val !== undefined, { error: errorMessage })
            .pipe(
                z
                    .number()
                    .int({ error: "Must be a whole number" })
                    .positive({ error: positiveMessage })
            )
    );
// Zod schema - single source of truth for validation and error messages
export const userFormSchema = z.object({
    name: z
        .string()
        .trim()
        .max(32, { error: "Name must be 32 characters or less" })
        .optional(),
    currentSens: preprocessNumber("Current Sensitivity is required and must be a positive number"),
    currentDpi: preprocessInteger(
        "Current DPI is required and must be a positive whole number",
        "Current DPI must be greater than 0"
    ),
    desiredDpi: preprocessInteger(
        "Desired DPI is required and must be a positive whole number",
        "Desired DPI must be greater than 0"
    ),
    dpiInc: preprocessInteger(
        "DPI Increment is required and must be a positive whole number",
        "DPI Increment must be greater than 0"
    ),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

// Helper function to transform store values to Zod-compatible format
export function transformStoreValuesToZod(values: UserFormFields): z.input<typeof userFormSchema> {
    return {
        name: values.name?.trim() === "" ? undefined : values.name?.trim(),
        currentSens: values.currentSens ?? undefined,
        currentDpi: values.currentDpi ?? undefined,
        desiredDpi: values.desiredDpi ?? undefined,
        dpiInc: values.dpiInc ?? undefined,
    };
}