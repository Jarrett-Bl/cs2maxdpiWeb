import type { SensDpiPair } from "../interfaces/calcTypes";
import type { DpiParamsValues } from "../schemas/dpiSchema";

export function generateSensDpiPairs(params: DpiParamsValues): readonly SensDpiPair[] {
  // Params are pre-validated by computed values in the store, so we can use them directly
  const { orgSens, currentDpi, desiredDpi, dpiAcceptableInterval } = params;
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


