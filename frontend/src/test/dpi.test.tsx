import { describe, it, expect } from "vitest";
import type { DpiParamsValues } from "../schemas/dpiSchema";
import { generateSensDpiPairs } from "../utils/dpiCalc";

describe("generateSensDpiPairs", () => {
    // Note: Validation tests have been removed as validation is now handled
    // by the MobX store's computed values. The function accepts pre-validated DpiParamsValues.

    it("loops bound check", () => {
        const params: DpiParamsValues = {
            orgSens: 1,
            currentDpi: 800,
            desiredDpi: 1600,
            dpiAcceptableInterval: 400,
        };

        const res = generateSensDpiPairs(params);

        expect(res.map((x) => x.dpi)).toEqual([800, 1600, 2000]);

        expect(res.find((x) => x.dpi === 800)?.inGameSens).toBe(1);
        expect(res.find((x) => x.dpi === 1600)?.inGameSens).toBe(0.5);
        expect(res.find((x) => x.dpi === 2000)?.inGameSens).toBe(0.4);
    });

    it("includes values with <= 2 decimal places and excludes > 2", () => {
        const params: DpiParamsValues = {
            orgSens: 1.23,
            currentDpi: 1000,
            desiredDpi: 1500,
            dpiAcceptableInterval: 250,
        };

        const res = generateSensDpiPairs(params);

        expect(res.map((x) => x.dpi)).toEqual([1000, 1500]);
        expect(res.map((x) => x.inGameSens)).toEqual([1.23, 0.82]);
    });
});