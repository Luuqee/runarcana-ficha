export default function TabMysteries({
  misterios,
  openMisterio,
  setOpenMisterio,
  abrirModalCriarMisterio,
  removeMisterio,
  mysteryByKey,
}) {
  const list = Array.isArray(misterios) ? misterios : [];

  const toggle = (id) => setOpenMisterio((prev) => (prev === id ? null : id));

  const resolveColors = (m) => {
    const cat = mysteryByKey?.get?.(m.key);
    const base = m.color ?? cat?.color ?? "#a1a1aa";

    // cria um "elem2" levemente diferente (fica bonito no degradê)
    // se já existir m.color2 no futuro, usa.
    const elem2 = m.color2 ?? cat?.color2 ?? base;

    return { c1: base, c2: elem2 };
  };

  return (
    <div>
      <button className="ataqueAdd" type="button" onClick={abrirModalCriarMisterio}>
        + Adicionar Mistério
      </button>

      <div className="ataquesList" style={{ marginTop: 10 }}>
        {list.length === 0 ? (
          <div className="hint">Nenhum mistério adicionado.</div>
        ) : (
          list.map((m) => {
            const isOpen = openMisterio === m.id;

            const cat = mysteryByKey?.get?.(m.key);
            const label = m.label ?? cat?.label ?? "Mistério";
            const desc = m.desc ?? cat?.desc ?? "";

            const { c1, c2 } = resolveColors(m);

            return (
              <div
                key={m.id}
                className="mysteryCard"
                style={{ "--elem": c1, "--elem2": c2 }}
              >
                <div
                  className="mysteryHeader"
                  onClick={() => toggle(m.id)}
                  role="button"
                  tabIndex={0}
                >
                  <span className={`mysterySeta ${isOpen ? "aberta" : ""}`}>▾</span>

                  <span className="mysteryDot" />

                  <div className="mysteryNameBox">
                    <div className="mysteryName">{label}</div>
                    {isOpen && <div className="mysteryMini">Mistério</div>}
                  </div>
                </div>

                {isOpen && (
                  <div className="mysteryBody">
                    <div className="mysteryDesc">{desc?.trim() ? desc : "-"}</div>

                    <div className="ataqueActions">
                      <button className="danger" type="button" onClick={() => removeMisterio(m.id)}>
                        Remover
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
