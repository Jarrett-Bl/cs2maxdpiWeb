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
  onDelete?: (id: string) => void;
}

export function CalculationsTable({ data, onDelete }: CalculationsTableProps) {
  const columns = useMemo<MRT_ColumnDef<CalculationRow>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "currentInGameSens",
        header: "In-Game Sens",
        Cell: ({ cell }) => {
          const value = Number(cell.getValue());
          return Number.isFinite(value) ? value.toFixed(2) : "0.00";
        },
      },
      { accessorKey: "previousDpi", header: "Previous DPI" },
      { accessorKey: "desiredDpi", header: "Desired DPI" },
      { accessorKey: "dpiAcceptableInterval", header: "DPI Interval" },
      {
        id: "actions",
        header: "",
        Cell: ({ row }) => (
          <Button
            variant="subtle"
            color="red"
            size="xs"
            type="button"
            onClick={() => onDelete?.(row.original.id)}
          >
            Delete
          </Button>
        ),
      },
    ],
    [onDelete]
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableGlobalFilter: true,
  });

  return <MantineReactTable table={table} />;
}
