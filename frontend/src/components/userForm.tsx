// This will become the form eventually
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { observer } from "mobx-react-lite";
import { useStores } from "../mobxStore/storeContext";
import React from "react";

export function UserForm() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userForm } = useStores();
    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Click me!
            </button>
        </>
    );
}