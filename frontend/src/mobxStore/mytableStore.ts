import { makeAutoObservable, runInAction } from "mobx";
import type { CalculationRow } from "../interfaces/calculationTypes";
import {
  apiRowToCalculationRow,
  calculationRowToCreateBody,
  type MytableService,
} from "../services/mytableService";

export class MytableStore {
  items: CalculationRow[] = [];
  loading = false;
  error: string | null = null;

  private readonly mytableService: MytableService;

  constructor(mytableService: MytableService) {
    this.mytableService = mytableService;
    makeAutoObservable(this);
  }

  async loadAll(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const rows = await this.mytableService.getAll();
      runInAction(() => {
        this.items = rows.map(apiRowToCalculationRow);
        this.loading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : "Unknown error";
        this.loading = false;
      });
    }
  }

  async removeById(id: string): Promise<void> {
    const numericId = parseInt(id, 10);
    if (Number.isNaN(numericId)) {
      runInAction(() => {
        this.error = "Invalid id";
      });
      return;
    }

    this.loading = true;
    this.error = null;
    try {
      await this.mytableService.deleteById(numericId);
      runInAction(() => {
        this.items = this.items.filter((item) => item.id !== id);
        this.loading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : "Unknown error";
        this.loading = false;
      });
    }
  }

  async addFromCalculation(row: Omit<CalculationRow, "id" | "createdAt">): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const created = await this.mytableService.create(calculationRowToCreateBody(row));
      runInAction(() => {
        const newRow = apiRowToCalculationRow(created);
        // New array reference so table components (MRT) re-render on POST success
        this.items = [...this.items, newRow];
        this.loading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : "Unknown error";
        this.loading = false;
      });
    }
  }
}
