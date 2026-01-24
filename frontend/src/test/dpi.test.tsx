import { describe, it, expect } from "vitest";
import type { DpiParams } from "../interfaces/calcTypes";
import { generateSensDpiPairs } from "../utils/dpiTest";
//will be updated when I add zod 
describe("generateSensDpiPairs", () => {
    it("throws if any required param is null", () => {
        const params: DpiParams = {
            orgSens: 1,
            currentDpi: 800,
            desiredDpi: 1600,
            dpiAcceptableInterval: 100,
        };

        expect(() =>
            generateSensDpiPairs({ ...params, orgSens: null }),
        ).toThrowError("Invalid input parameters");

        expect(() =>
            generateSensDpiPairs({ ...params, currentDpi: null }),
        ).toThrowError("Invalid input parameters");

        expect(() =>
            generateSensDpiPairs({ ...params, desiredDpi: null }),
        ).toThrowError("Invalid input parameters");

        expect(() =>
            generateSensDpiPairs({ ...params, dpiAcceptableInterval: null }),
        ).toThrowError("Invalid input parameters");
    });

    it("throws if dpiAcceptableInterval <= 0", () => {
        const params: DpiParams = {
            orgSens: 1,
            currentDpi: 800,
            desiredDpi: 1600,
            dpiAcceptableInterval: 0,
        };
        expect(() => generateSensDpiPairs(params)).toThrowError(
            "dpiAcceptableInterval must be > 0",
        );

        const invalidInputNeg: DpiParams = { ...params, dpiAcceptableInterval: -100 };
        expect(() => generateSensDpiPairs(invalidInputNeg)).toThrowError(
            "dpiAcceptableInterval must be > 0",
        );
    });

    it("loops bound check", () => {
        const params: DpiParams = {
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
        const params: DpiParams = {
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
