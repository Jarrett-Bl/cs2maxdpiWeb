//inputParams

import type { DpiParams, SensDpiPair } from "../interfaces/calcTypes";
import { dpiParamsSchema } from "../schemas/dpiSchema";


export function generateSensDpiPairs(params: DpiParams): readonly SensDpiPair[] {
  const result = dpiParamsSchema.safeParse(params);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    throw new Error(firstIssue?.message || "Invalid input parameters");
  }

  const { orgSens, currentDpi, desiredDpi, dpiAcceptableInterval } = result.data;
  // Edpi= originalSens * current dpi
  const edpi = orgSens * currentDpi;
  // loop starts at current Dpi and ends at desiredDpi + acceptable interval
  const [loopLimsBegin, loopLimsEnd] = [currentDpi, desiredDpi + (2 * dpiAcceptableInterval)]
  const results: SensDpiPair[] = [];

  for (let dpi = loopLimsBegin; dpi <= loopLimsEnd; dpi += dpiAcceptableInterval) {
    const inGameSens = edpi / dpi;
    //Twq decimal places as CS only allows 2. TODO: Make this better 
    const parts = inGameSens.toString().split(".");
    const ok = parts.length === 1 || (parts.length === 2 && parts[1].length <= 2);
    if (ok) {
      results.push({ inGameSens, dpi });
    }

  }

  return results;
}


