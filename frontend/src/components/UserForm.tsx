
import React from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../mobxStore/storeContext";

export const UserForm = observer(function UserForm() {
    const { userForm } = useStores();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form using Zod - this will update fieldErrors in the store
        if (!userForm.validateForm()) {
            return;
        }

        await userForm.submitForm();
    };

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
                    value={userForm.name}
                    onChange={(e) => userForm.setName(e.target.value)}
                    onBlur={() => userForm.validateField("name")}
                    className={`w-full rounded border px-3 py-2 ${userForm.fieldErrors.name ? "border-red-500" : ""
                        }`}
                    placeholder="Not Required"
                />
                {userForm.fieldErrors.name && (
                    <div className="text-sm text-red-600">{userForm.fieldErrors.name}</div>
                )}
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium">Current Sens</label>
                <input
                    name="currentSens"
                    type="number"
                    inputMode="decimal"
                    value={userForm.currentSens ?? ""}
                    onChange={(e) => userForm.setCurrentSens(parseNumberOrNull(e.target.value))}
                    onBlur={() => userForm.validateField("currentSens")}
                    className={`w-full rounded border px-3 py-2 ${userForm.fieldErrors.currentSens ? "border-red-500" : ""
                        }`}
                    placeholder="e.g. 1.25"
                />
                {userForm.fieldErrors.currentSens && (
                    <div className="text-sm text-red-600">{userForm.fieldErrors.currentSens}</div>
                )}
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium">Current DPI</label>
                <input
                    name="currentDpi"
                    type="number"
                    inputMode="numeric"
                    value={userForm.currentDpi ?? ""}
                    onChange={(e) => userForm.setCurrentDpi(parseNumberOrNull(e.target.value))}
                    onBlur={() => userForm.validateField("currentDpi")}
                    className={`w-full rounded border px-3 py-2 ${userForm.fieldErrors.currentDpi ? "border-red-500" : ""
                        }`}
                    placeholder="e.g. 800"
                />
                {userForm.fieldErrors.currentDpi && (
                    <div className="text-sm text-red-600">{userForm.fieldErrors.currentDpi}</div>
                )}
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium">Desired DPI</label>
                <input
                    name="desiredDpi"
                    type="number"
                    inputMode="numeric"
                    value={userForm.desiredDpi ?? ""}
                    onChange={(e) => userForm.setDesiredDpi(parseNumberOrNull(e.target.value))}
                    onBlur={() => userForm.validateField("desiredDpi")}
                    className={`w-full rounded border px-3 py-2 ${userForm.fieldErrors.desiredDpi ? "border-red-500" : ""
                        }`}
                    placeholder="e.g. 1600"
                />
                {userForm.fieldErrors.desiredDpi && (
                    <div className="text-sm text-red-600">{userForm.fieldErrors.desiredDpi}</div>
                )}
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium">DPI Increment</label>
                <input
                    name="dpiInc"
                    type="number"
                    inputMode="numeric"
                    value={userForm.dpiInc ?? ""}
                    onChange={(e) => userForm.setDpiInc(parseNumberOrNull(e.target.value))}
                    onBlur={() => userForm.validateField("dpiInc")}
                    className={`w-full rounded border px-3 py-2 ${userForm.fieldErrors.dpiInc ? "border-red-500" : ""
                        }`}
                    placeholder="e.g. 50"
                />
                {userForm.fieldErrors.dpiInc && (
                    <div className="text-sm text-red-600">{userForm.fieldErrors.dpiInc}</div>
                )}
            </div>

            {userForm.submitError && (
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
