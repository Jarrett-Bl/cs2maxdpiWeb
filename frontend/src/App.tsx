import './App.css'
import { Table, TextInput, Button } from '@mantine/core'

/** Row shape for mytable / API calculations – extend when API is connected */
export interface CalculationRow {
  id: string
  name: string
  inGameSens: number
  dpi: number
  createdAt: string
}

const placeholderCalculations: CalculationRow[] = [
  { id: '1', name: 'Example', inGameSens: 1.0, dpi: 800, createdAt: '2025-01-28' },
]

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <h1 className="px-4 pt-6 text-center text-xl font-semibold text-zinc-50">
        Use my dpi sensitivity calculator to gain an advantage in CS2!
      </h1>

      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-5 md:p-6">
        {/* Top Left */}
        <section className="rounded-lg border border-zinc-800 p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              className="rounded-md bg-sky-400 px-2 py-1 text-xs font-medium text-zinc-950 hover:bg-sky-500"
              aria-label="Toggle light mode"
            >
              🌙
            </button>
          </div>

          <div className="space-y-3 text-xs leading-5 text-zinc-200">
            <p>
              Your current Counter-Strike 2 dpi is probably not optimal...
            </p>
            <p>
              This calculator allows you to increase your mouse&apos;s dpi while
              maintaining the same eDPI...
            </p>
            <p>
              Latency is lower on high dpi regardless of polling rate...
            </p>
          </div>

          <form className="mt-5 space-y-2">
            <input
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 outline-none focus:border-sky-400"
              placeholder="Name"
            />
            <input
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 outline-none focus:border-sky-400"
              placeholder="Current In-Game Sensitivity"
              type="number"
              step="any"
            />
            <input
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 outline-none focus:border-sky-400"
              placeholder="Current DPI"
              type="number"
            />
            <input
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 outline-none focus:border-sky-400"
              placeholder="Desired DPI"
              type="number"
            />
            <input
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 outline-none focus:border-sky-400"
              placeholder="DPI increment"
              type="number"
            />

            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-md bg-sky-400 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-sky-500"
            >
              Calculate
            </button>
          </form>
        </section>

        {/* Top Right */}
        <section className="rounded-lg border border-zinc-800 p-4 md:p-5">
          <h2 className="mb-3 text-xs font-semibold text-zinc-50">
            Here is your calculated range of game settings:
          </h2>

          <div className="min-h-[220px] rounded-md border border-dashed border-zinc-700 p-3 text-xs text-zinc-400">
            Output area (placeholder)
          </div>
        </section>

        {/* Bottom (spans both columns on md+) – mytable / API data will go here */}
        <section className="rounded-lg border border-zinc-800 p-4 md:col-span-2 md:p-5">
          <h3 className="mb-2 text-sm font-semibold text-zinc-50">
            History of Calculations
          </h3>

          <TextInput
            className="mb-3"
            placeholder="Search"
            aria-label="Search calculations"
          />

          <Table.ScrollContainer minWidth={400} type="native">
            <Table
              data={{
                head: ['Name', 'In-Game Sens', 'DPI', 'Created', ''],
                body: placeholderCalculations.map((row) => [
                  row.name,
                  row.inGameSens.toFixed(2),
                  String(row.dpi),
                  row.createdAt,
                  <Button key={row.id} variant="subtle" color="red" size="xs" type="button">
                    Delete
                  </Button>,
                ]),
              }}
              highlightOnHover
              withTableBorder
              withColumnBorders
            />
          </Table.ScrollContainer>

          <footer className="mt-4 text-center text-xs text-zinc-400">
            © 2025 Jarrett Blackson. All Rights Reserved.
          </footer>
        </section>
      </main>
    </div>
  );
}
