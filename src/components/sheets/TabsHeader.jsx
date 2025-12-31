export default function TabsHeader({ tab, setTab }) {
  const tabs = ["ataques", "poderes", "magias", "misterios", "descrição"];

  return (
    <div className="rightTabs">
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTab(t)}
          className={tab === t ? "active" : ""}
        >
          {t.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
