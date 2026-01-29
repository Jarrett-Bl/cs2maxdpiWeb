import { observer } from "mobx-react-lite";
import { useStores } from "../mobxStore/storeContext";

export const SensDpiResults = observer(function SensDpiResults() {
    const { userForm } = useStores();

    if (!userForm.hasCalculationResults) {
        return (
            <div className="space-y-3 text-xs leading-5 text-zinc-200">
                <h3 className="mb-1 font-semibold">Results</h3>
                <p className="text-zinc-400">Submit the form to see results</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 text-xs leading-5 text-zinc-200">
            <h3 className="mb-1 font-semibold">Results</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-700">
                            <th className="px-3 py-2 text-left text-xs font-semibold text-zinc-400">In-Game Sens</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-zinc-400">DPI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userForm.sensDpiPairs.map((pair, index) => (
                            <tr
                                key={index}
                                className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors"
                            >
                                <td className="px-3 py-2 text-zinc-200">{pair.inGameSens.toFixed(2)}</td>
                                <td className="px-3 py-2 text-zinc-200">{pair.dpi}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
