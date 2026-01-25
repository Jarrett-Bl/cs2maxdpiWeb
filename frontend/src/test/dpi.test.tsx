import { describe, it, expect } from "vitest";
import type { DpiParams } from "../interfaces/calcTypes";
import { generateSensDpiPairs } from "../utils/dpiCalc";

describe("generateSensDpiPairs", () => {
    it("throws if any required param is null", () => {
        const params: DpiParams = {
            orgSens: 1,
            currentDpi: 800,
            desiredDpi: 1600,
            dpiAcceptableInterval: 100,
        };

        const nullOrgSens = { ...params, orgSens: null };
        expect(() => generateSensDpiPairs(nullOrgSens)).toThrow();

        const nullCurrentDpi = { ...params, currentDpi: null };
        expect(() => generateSensDpiPairs(nullCurrentDpi)).toThrow();

        const nullDesiredDpi = { ...params, desiredDpi: null };
        expect(() => generateSensDpiPairs(nullDesiredDpi)).toThrow();

        const nullInterval = { ...params, dpiAcceptableInterval: null };
        expect(() => generateSensDpiPairs(nullInterval)).toThrow();
    });

    it("throws if dpiAcceptableInterval <= 0", () => {
        const params: DpiParams = {
            orgSens: 1,
            currentDpi: 800,
            desiredDpi: 1600,
            dpiAcceptableInterval: 0,
        };
        expect(() => generateSensDpiPairs(params)).toThrow();

        const invalidInputNeg: DpiParams = { ...params, dpiAcceptableInterval: -100 };
        expect(() => generateSensDpiPairs(invalidInputNeg)).toThrow();
    });

    it("throws if values are not positive", () => {
        const params: DpiParams = {
            orgSens: 1,
            currentDpi: 800,
            desiredDpi: 1600,
            dpiAcceptableInterval: 100,
        };

        expect(() => generateSensDpiPairs({ ...params, orgSens: -1 })).toThrow();
        expect(() => generateSensDpiPairs({ ...params, currentDpi: -800 })).toThrow();
        expect(() => generateSensDpiPairs({ ...params, desiredDpi: -1600 })).toThrow();
    });

    it("throws if DPI values are not integers", () => {
        const params: DpiParams = {
            orgSens: 1,
            currentDpi: 800,
            desiredDpi: 1600,
            dpiAcceptableInterval: 100,
        };

        expect(() => generateSensDpiPairs({ ...params, currentDpi: 800.5 })).toThrow();
        expect(() => generateSensDpiPairs({ ...params, desiredDpi: 1600.7 })).toThrow();
        expect(() => generateSensDpiPairs({ ...params, dpiAcceptableInterval: 100.3 })).toThrow();
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