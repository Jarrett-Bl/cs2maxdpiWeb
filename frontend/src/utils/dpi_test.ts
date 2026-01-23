//inputParams
interface DpiParams {
  orgSens: number | null; // Base DPI (original sensitivity)
  currentDpi: number | null; // Current DPI setting on the mouse
  //dpiAcceptableRange: readonly [number, number]; // Acceptable range of DPI values
  desiredDpi: number | null; // Desired DPI setting for the mouse
  dpiAcceptableInterval: number | null; // Interval for generating DPI values
}

//Output type 
interface SensDpiPair {
  inGameSens: number;
  dpi: number;
}

export function generateSensDpiPairs(params: DpiParams): readonly SensDpiPair[] {
  const { orgSens, currentDpi, desiredDpi, dpiAcceptableInterval } = params;
  if (!orgSens || !currentDpi || !desiredDpi || !dpiAcceptableInterval) {
    throw new Error("Invalid input parameters");
  }

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


