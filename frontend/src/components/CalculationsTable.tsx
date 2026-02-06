import { useMemo } from "react";
import { Button } from "@mantine/core";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import type { CalculationRow } from "../interfaces/calculationTypes";

export interface CalculationsTableProps {
  data: CalculationRow[];
}

export function CalculationsTable({ data }: CalculationsTableProps) {
  const columns = useMemo<MRT_ColumnDef<CalculationRow>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "currentInGameSens",
        header: "In-Game Sens",
        Cell: ({ cell }) => (cell.getValue<number>() ?? 0).toFixed(2),
      },
      { accessorKey: "previousDpi", header: "Previous DPI" },
      { accessorKey: "desiredDpi", header: "Desired DPI" },
      { accessorKey: "dpiAcceptableInterval", header: "DPI Interval" },
      {
        id: "actions",
        header: "",
        Cell: () => (
          <Button
            variant="subtle"
            color="red"
            size="xs"
            type="button"
            onClick={() => { }}
          >
            Delete
          </Button>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableGlobalFilter: true,
  });

  return <MantineReactTable table={table} />;
}
