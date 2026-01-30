import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SensDpiResults } from "../components/SensDpiResults";
import { StoreContext } from "../mobxStore/storeContext";
import type { RootStore } from "../mobxStore/rootStore";
import type { UserFormStore } from "../mobxStore/userFormStores";
import type { SensDpiPair } from "../interfaces/calcTypes";

describe("SensDpiResults", () => {
    const createMockUserFormStore = (pairs: SensDpiPair[] = []): Partial<UserFormStore> => {
        return {
            get hasCalculationResults() {
                return pairs.length > 0;
            },
            get sensDpiPairs() {
                return pairs;
            },
        };
    };

    const createMockRootStore = (pairs: SensDpiPair[] = []): Partial<RootStore> => {
        return {
            userForm: createMockUserFormStore(pairs) as UserFormStore,
        };
    };

    const renderWithStore = (store: Partial<RootStore>) => {
        return render(
            <StoreContext.Provider value={store as RootStore}>
                <SensDpiResults />
            </StoreContext.Provider>
        );
    };

    it("displays empty state when there are no calculation results", () => {
        const mockRootStore = createMockRootStore([]);
        renderWithStore(mockRootStore);
        expect(screen.getByText("Results")).toBeInTheDocument();
        expect(screen.getByText("Submit the form to see results")).toBeInTheDocument();
    });

    it("displays table when there are calculation results", () => {
        const mockPairs: SensDpiPair[] = [
            { inGameSens: 1.0, dpi: 800 },
            { inGameSens: 0.5, dpi: 1600 },
            { inGameSens: 0.4, dpi: 2000 },
        ];

        const mockRootStore = createMockRootStore(mockPairs);
        renderWithStore(mockRootStore);
        expect(screen.getByText("In-Game Sens")).toBeInTheDocument();
        expect(screen.getByText("DPI")).toBeInTheDocument();
        expect(screen.getByText("1.00")).toBeInTheDocument();
        expect(screen.getByText("800")).toBeInTheDocument();
        expect(screen.getByText("0.50")).toBeInTheDocument();
        expect(screen.getByText("1600")).toBeInTheDocument();
        expect(screen.getByText("0.40")).toBeInTheDocument();
        expect(screen.getByText("2000")).toBeInTheDocument();
    });

    it("formats in-game sensitivity to 2 decimal places", () => {
        const mockPairs: SensDpiPair[] = [
            { inGameSens: 1.234, dpi: 800 },
            { inGameSens: 0.5678, dpi: 1600 },
        ];

        const mockRootStore = createMockRootStore(mockPairs);
        renderWithStore(mockRootStore);
        expect(screen.getByText("1.23")).toBeInTheDocument();
        expect(screen.getByText("0.57")).toBeInTheDocument();
    });

    it("displays correct number of table rows for given pairs", () => {
        const mockPairs: SensDpiPair[] = [
            { inGameSens: 1.0, dpi: 800 },
            { inGameSens: 0.5, dpi: 1600 },
            { inGameSens: 0.4, dpi: 2000 },
            { inGameSens: 0.33, dpi: 2400 },
        ];

        const mockRootStore = createMockRootStore(mockPairs);
        renderWithStore(mockRootStore);
        const rows = screen.getAllByRole("row");
        expect(rows).toHaveLength(5);
    });

    it("handles empty pairs array correctly", () => {
        const mockRootStore = createMockRootStore([]);
        renderWithStore(mockRootStore);
        expect(screen.getByText("Submit the form to see results")).toBeInTheDocument();
        expect(screen.queryByText("In-Game Sens")).not.toBeInTheDocument();
    });
});
