export default function TabAttacks({
  ataques,
  openAtaque,
  setOpenAtaque,
  abrirModalCriarAtaque,
  abrirModalEditarAtaque,
  removeAtaque,
}) {
  const list = Array.isArray(ataques) ? ataques : [];

  const toggle = (id) => setOpenAtaque((prev) => (prev === id ? null : id));

  return (
    <div>
      <button className="ataqueAdd" type="button" onClick={abrirModalCriarAtaque}>
        + Adicionar Ataque
      </button>

      <div className="ataquesList">
        {list.length === 0 ? (
          <div className="hint">Nenhum ataque adicionado.</div>
        ) : (
          list.map((a) => {
            const isOpen = openAtaque === a.id;

            return (
              <div key={a.id} className="ataqueCard">
                <div className="ataqueHeader" onClick={() => toggle(a.id)} role="button" tabIndex={0}>
                  <span className={`ataqueSeta ${isOpen ? "aberta" : ""}`}>▾</span>

                  <div className="ataqueResumo">
                    <b>{a.nome || "Sem nome"}</b>
                    <span>
                      {a.dano || "-"} • {a.tipoDano || "—"} • {a.alcance || "—"}
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div className="ataqueBody">
                    <div><b>Atributo:</b> {a.attr || "—"}</div>
                    <div><b>Crítico:</b> {a.critico || "—"} {a.mult || ""}</div>
                    <div><b>Bônus:</b> {a.bonus ?? "—"}</div>
                    {a.desc?.trim() ? <div><b>Descrição:</b> {a.desc}</div> : null}

                    <div className="ataqueActions">
                      <button className="ghostBtn" type="button" onClick={() => abrirModalEditarAtaque(a.id)}>
                        Editar
                      </button>
                      <button className="danger" type="button" onClick={() => removeAtaque(a.id)}>
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
