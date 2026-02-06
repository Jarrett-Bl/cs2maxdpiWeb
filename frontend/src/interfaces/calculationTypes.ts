//shape will need to be extended when API is connected
//website shows scores as previous calc, so whatever what entered into the form is diplayed 
// name, currentInGameSens, previousDpi, desiredDpi, dpiAcceptableInterval
export interface CalculationRow {
  id: string
  name: string
  currentInGameSens: number
  previousDpi: number
  desiredDpi: number
  dpiAcceptableInterval: number
  createdAt: string
}
