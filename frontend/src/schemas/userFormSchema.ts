import { z } from "zod";

// I dont want name to be required
export const userFormSchema = z
    .object({
        name: z.string().trim().min(1, "Name is required").max(32, "Name too long"),
        currentSens: z.number().finite().positive("Current Sens must be > 0"),
        currentDpi: z.number().finite().int("Current DPI must be an integer").positive("Current DPI must be > 0"),
        desiredDpi: z.number().finite().int("Desired DPI must be an integer").positive("Desired DPI must be > 0"),
        dpiInc: z.number().finite().int("DPI Increment must be an integer").positive("DPI Increment must be > 0"),
    })

export type UserFormValues = z.infer<typeof userFormSchema>;
