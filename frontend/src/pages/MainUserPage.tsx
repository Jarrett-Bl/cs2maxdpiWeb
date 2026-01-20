import React from "react";
import { useState } from "react";

/**
 * Main user page component.
 */
export default function MainUserPage() {
  const [lightMode, setLightMode] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className={lightMode ? "light_mode" : ""}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={() => setLightMode((v) => !v)}>
          Toggle Light Mode
        </button>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
        />
      </div>
    </div>
  );
}
