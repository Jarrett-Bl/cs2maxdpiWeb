import { observer } from "mobx-react-lite";
import { useStores } from "../mobxStore/storeContext.ts";

const MainUserPage = observer(function MainUserPage() {
  const { ui } = useStores();

  return (
    <div className={ui.lightMode ? "light_mode" : ""}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={ui.toggleLightMode}>Toggle Light Mode</button>

        <input
          value={ui.search}
          onChange={(e) => ui.setSearch(e.target.value)}
          placeholder="Search users..."
        />
      </div>
    </div>
  );
});

export default MainUserPage;
