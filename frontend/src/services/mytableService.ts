import type { CalculationRow } from "../interfaces/calculationTypes";
import type { ApiClient } from "./ApiClient";

export type MytableApiRow = {
  id: number;
  name: string;
  temp1: number | string;
  temp2: number | string;
  temp3: number | string;
  temp4: number | string;
};

export type MytableCreateBody = {
  name: string;
  temp1: number;
  temp2: number;
  temp3: number;
  temp4: number;
};

export type MytableDeleteResponse = {
  message: string;
  record: MytableApiRow;
};

export function apiRowToCalculationRow(row: MytableApiRow): CalculationRow {
  return {
    id: String(row.id),
    name: row.name,
    currentInGameSens: Number(row.temp1),
    previousDpi: Number(row.temp2),
    desiredDpi: Number(row.temp3),
    dpiAcceptableInterval: Number(row.temp4),
    createdAt: "",
  };
}

export function calculationRowToCreateBody(
  row: Omit<CalculationRow, "id" | "createdAt">
): MytableCreateBody {
  return {
    name: row.name,
    temp1: row.currentInGameSens,
    temp2: row.previousDpi,
    temp3: row.desiredDpi,
    temp4: row.dpiAcceptableInterval,
  };
}

export class MytableService {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  getAll(): Promise<MytableApiRow[]> {
    return this.api.request<MytableApiRow[]>("/api/mytable");
  }

  create(input: MytableCreateBody): Promise<MytableApiRow> {
    return this.api.request<MytableApiRow>("/api/mytable", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  deleteById(id: number): Promise<MytableDeleteResponse> {
    return this.api.request<MytableDeleteResponse>(`/api/mytable/${id}`, {
      method: "DELETE",
    });
  }
}
