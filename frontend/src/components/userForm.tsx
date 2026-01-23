// src/components/UserForm.tsx
import React from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../mobxStore/storeContext";

export const UserForm = observer(function UserForm() {
    const { userForm } = useStores();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Optional: native validity gate (required/type="email"/etc.)
        if (!e.currentTarget.checkValidity()) {
            e.currentTarget.reportValidity();
            return;
        }

        await userForm.submitForm();
    };

    // Helper to parse number inputs safely
    const parseNumberOrNull = (v: string) => {
        if (v.trim() === "") return null;
        const n = Number(v);
        return Number.isFinite(n) ? n : null;
    };

    return (
        <form onSubmit={onSubmit} noValidate className="space-y-4 max-w-lg">
            <div className="space-y-1">
                <label className="block text-sm font-medium">Name</label>
                <input
                    name="name"
                    required
                    value={userForm.name}
                    onChange={(e) => userForm.setName(e.target.value)}
                    className="w-full rounded border px-3 py-2"
                    placeholder="Jarrett"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium">Current Sens</label>
                <input
                    name="currentSens"
                    required
                    value={userForm.currentSens}
                    onChange={(e) => userForm.setCurrentSens(e.target.value)}
                    className="w-full rounded border px-3 py-2"
                    placeholder="e.g. 1.25"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium">Current DPI</label>
                <input
                    name="currentDpi"
                    type="number"
                    inputMode="numeric"
                    required
                    value={userForm.currentDpi ?? ""}
                    onChange={(e) => userForm.setCurrentDpi(parseNumberOrNull(e.target.value))}
                    className="w-full rounded border px-3 py-2"
                    placeholder="e.g. 800"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium">Desired DPI</label>
                <input
                    name="desiredDpi"
                    type="number"
                    inputMode="numeric"
                    required
                    value={userForm.desiredDpi ?? ""}
                    onChange={(e) => userForm.setDesiredDpi(parseNumberOrNull(e.target.value))}
                    className="w-full rounded border px-3 py-2"
                    placeholder="e.g. 1600"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium">DPI Increment</label>
                <input
                    name="dpiInc"
                    type="number"
                    inputMode="numeric"
                    required
                    value={userForm.dpiInc ?? ""}
                    onChange={(e) => userForm.setDpiInc(parseNumberOrNull(e.target.value))}
                    className="w-full rounded border px-3 py-2"
                    placeholder="e.g. 50"
                />
            </div>

            {userForm.canSubmit && (
                <div role="alert" className="text-sm text-red-600">
                    {userForm.submitError}
                </div>
            )}

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={!userForm.canSubmit}
                    className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                    {userForm.submitLocked ? "Submitting..." : "Submit"}
                </button>

                <button
                    type="button"
                    onClick={userForm.reset}
                    className="border font-bold py-2 px-4 rounded"
                >
                    Reset
                </button>
            </div>
        </form>
    );
});
