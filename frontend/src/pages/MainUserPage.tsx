import { observer } from "mobx-react-lite";
//import { useStores } from "../mobxStore/storeContext.ts";

const MainUserPage = observer(function MainUserPage() {
  //const { ui } = useStores();

  // return (
  //   <div className={ui.lightMode ? "light_mode" : ""}>
  //     <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  //       <button onClick={ui.toggleLightMode}>Toggle Light Mode</button>

  //       <input
  //         value={ui.search}
  //         onChange={(e) => ui.setSearch(e.target.value)}
  //         placeholder="Search users..."
  //       />
  //     </div>
  //   </div>
  // );

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
          </div>


        </section>

        {/* Top Right */}
        <section className="rounded-lg border border-zinc-800
        p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="shownCalc" className="text-xs leading-5 text-zinc-400">placeholder</label>
          </div>
        </section>



        {/* Bottom (spans both columns on md+) */}
        <section className="rounded-lg border border-zinc-800 p-4 md:col-span-2 md:p-5">
          {/* Content goes here */}
        </section>
      </main>
    </div>
  );
});

export default MainUserPage;
