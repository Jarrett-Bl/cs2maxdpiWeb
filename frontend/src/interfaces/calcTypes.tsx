export interface DpiParams {
    orgSens: number | null; // Base DPI (original sensitivity)
    currentDpi: number | null; // Current DPI setting on the mouse
    //dpiAcceptableRange: readonly [number, number]; // Acceptable range of DPI values
    desiredDpi: number | null; // Desired DPI setting for the mouse
    dpiAcceptableInterval: number | null; // Interval for generating DPI values
}

//Output type 
export interface SensDpiPair {
    inGameSens: number;
    dpi: number;
}