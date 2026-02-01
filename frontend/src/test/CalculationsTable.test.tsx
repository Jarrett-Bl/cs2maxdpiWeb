import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MantineProvider } from "@mantine/core";
import { CalculationsTable } from "../components/CalculationsTable";
import type { CalculationRow } from "../interfaces/calculationTypes";

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => { },
            removeListener: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => false,
        }),
    });
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

function renderWithProviders(data: CalculationRow[]) {
    return render(
        <MantineProvider defaultColorScheme="dark">
            <CalculationsTable data={data} />
        </MantineProvider>
    );
}

describe("CalculationsTable", () => {
    it("renders column headers with non-empty data", () => {
        const data: CalculationRow[] = [
            { id: "1", name: "Alice", inGameSens: 1.0, dpi: 800, createdAt: "2025-01-28" },
        ];
        renderWithProviders(data);
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("In-Game Sens")).toBeInTheDocument();
        expect(screen.getByText("DPI")).toBeInTheDocument();
        expect(screen.getByText("Created")).toBeInTheDocument();
    });

    it("renders data rows with name, dpi, and createdAt", () => {
        const data: CalculationRow[] = [
            { id: "1", name: "Alice", inGameSens: 1.0, dpi: 800, createdAt: "2025-01-28" },
            { id: "2", name: "Bob", inGameSens: 0.5, dpi: 1600, createdAt: "2025-01-29" },
        ];
        renderWithProviders(data);
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText("800")).toBeInTheDocument();
        expect(screen.getByText("1600")).toBeInTheDocument();
        expect(screen.getByText("2025-01-28")).toBeInTheDocument();
        expect(screen.getByText("2025-01-29")).toBeInTheDocument();
    });

    it("formats in-game sensitivity to 2 decimal places", () => {
        const data: CalculationRow[] = [
            { id: "1", name: "Test", inGameSens: 1.234, dpi: 800, createdAt: "2025-01-28" },
            { id: "2", name: "Test2", inGameSens: 0.5678, dpi: 1600, createdAt: "2025-01-28" },
        ];
        renderWithProviders(data);
        expect(screen.getByText("1.23")).toBeInTheDocument();
        expect(screen.getByText("0.57")).toBeInTheDocument();
    });

    it("renders a Delete button per row", () => {
        const data: CalculationRow[] = [
            { id: "1", name: "Row1", inGameSens: 1.0, dpi: 800, createdAt: "2025-01-28" },
            { id: "2", name: "Row2", inGameSens: 1.0, dpi: 800, createdAt: "2025-01-28" },
        ];
        renderWithProviders(data);
        const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
        expect(deleteButtons).toHaveLength(2);
    });

    it("handles empty data", () => {
        renderWithProviders([]);
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("In-Game Sens")).toBeInTheDocument();
        const deleteButtons = screen.queryAllByRole("button", { name: /delete/i });
        expect(deleteButtons).toHaveLength(0);
    });
});
