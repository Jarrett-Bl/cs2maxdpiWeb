import { describe, it, expect } from "vitest";
import {
  apiRowToCalculationRow,
  calculationRowToCreateBody,
  type MytableApiRow,
} from "./mytableService";

describe("mytableService mappers", () => {
  it("apiRowToCalculationRow maps temp fields to CalculationRow", () => {
    const row: MytableApiRow = {
      id: 42,
      name: "Test",
      temp1: 1.25,
      temp2: 800,
      temp3: 1000,
      temp4: 50,
    };
    expect(apiRowToCalculationRow(row)).toEqual({
      id: "42",
      name: "Test",
      currentInGameSens: 1.25,
      previousDpi: 800,
      desiredDpi: 1000,
      dpiAcceptableInterval: 50,
      createdAt: "",
    });
  });

  it("calculationRowToCreateBody maps CalculationRow fields to API body", () => {
    expect(
      calculationRowToCreateBody({
        name: "Alice",
        currentInGameSens: 2,
        previousDpi: 400,
        desiredDpi: 800,
        dpiAcceptableInterval: 25,
      })
    ).toEqual({
      name: "Alice",
      temp1: 2,
      temp2: 400,
      temp3: 800,
      temp4: 25,
    });
  });
});
