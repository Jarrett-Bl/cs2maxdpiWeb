import { z } from "zod";
import { preprocessNumber, preprocessInteger } from "./userFormSchema";

export const dpiParamsSchema = z.object({
    orgSens: preprocessNumber("Original Sensitivity is required and must be a positive number"),
    currentDpi: preprocessInteger(
        "Current DPI is required and must be a positive whole number",
        "Current DPI must be greater than 0"
    ),
    desiredDpi: preprocessInteger(
        "Desired DPI is required and must be a positive whole number",
        "Desired DPI must be greater than 0"
    ),
    dpiAcceptableInterval: preprocessInteger(
        "DPI Acceptable Interval is required and must be a positive whole number",
        "DPI Acceptable Interval must be greater than 0"
    ),
});

export type DpiParamsValues = z.infer<typeof dpiParamsSchema>;