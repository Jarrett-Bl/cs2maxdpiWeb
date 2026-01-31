import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "@mantine/core";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { UserForm } from "../components/userForm";
import { SensDpiResults } from "../components/SensDpiResults";
import { mockCalculations } from "../data/mockCalculations";
import type { CalculationRow } from "../interfaces/calculationTypes";
//import { useStores } from "../mobxStore/storeContext.ts";


// should move to a seperate file 
const MainUserPage = observer(function MainUserPage() {
  const columns = useMemo<MRT_ColumnDef<CalculationRow>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "inGameSens",
        header: "In-Game Sens",
        Cell: ({ cell }) => (cell.getValue<number>() ?? 0).toFixed(2),
      },
      { accessorKey: "dpi", header: "DPI" },
      { accessorKey: "createdAt", header: "Created" },
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
    data: mockCalculations,
    enableGlobalFilter: true,
  });



  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <h1 className="px-4 pt-6 text-center text-xl font-semibold text-zinc-50">
        Use my dpi sensitivity calculator to gain an advantage in CS2!
      </h1>

      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-5 md:p-6">
        {/* Top Left */}
        <section className="rounded-lg border border-zinc-800 p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="dpi" className="text-xs leading-5 text-zinc-400">DPI</label>
          </div>

          <div className="space-y-3 text-xs leading-5 text-zinc-200">
            <h3 className="mb-1 font-semibold">Your DPI Sensitivity</h3>
            <UserForm>  </UserForm>
          </div>


        </section>

        {/* Top Right */}
        <section className="rounded-lg border border-zinc-800 p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="shownCalc" className="text-xs leading-5 text-zinc-400">DPI Sensitivity Results</label>
          </div>
          <SensDpiResults />
        </section>



        {/* Bottom (spans both columns on md+) */}
        <section className="rounded-lg border border-zinc-800 p-4 md:col-span-2 md:p-5">
          <h3 className="mb-2 text-sm font-semibold text-zinc-50">
            History of Calculations
          </h3>
          <MantineReactTable table={table} />
        </section>
      </main>
    </div>
  );
});

export default MainUserPage;
