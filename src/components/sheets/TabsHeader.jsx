// src/components/sheets/TabsHeader.jsx
export default function TabsHeader({ tab, setTab }) {
  const tabs = ["ataques", "poderes", "magias", "misterios", "runas", "itens", "descrição"];

  return (
    <div className="rightTabs">
      {tabs.map((t) => (
        <button
          key={t}
          className={tab === t ? "active" : ""}
          type="button"
          onClick={() => setTab(t)}
        >
          {t.toUpperCase()}
        </button>
      ))}
    </div>
  );
}