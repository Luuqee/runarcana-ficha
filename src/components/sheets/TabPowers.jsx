export default function TabPowers({
  poderes,
  openPoder,
  setOpenPoder,
  abrirModalCriarPoder,
  abrirModalEditarPoder,
  removePoder,
}) {
  const list = Array.isArray(poderes) ? poderes : [];

  const toggle = (id) => setOpenPoder((prev) => (prev === id ? null : id));

  return (
    <div>
      <button className="ataqueAdd" type="button" onClick={abrirModalCriarPoder}>
        + Adicionar Poder
      </button>

      <div className="ataquesList">
        {list.length === 0 ? (
          <div className="hint">Nenhum poder adicionado.</div>
        ) : (
          list.map((p) => {
            const isOpen = openPoder === p.id;

            return (
              <div key={p.id} className="ataqueCard">
                <div className="ataqueHeader" onClick={() => toggle(p.id)} role="button" tabIndex={0}>
                  <span className={`ataqueSeta ${isOpen ? "aberta" : ""}`}>▾</span>

                  <div className="ataqueResumo">
                    <b>{p.nome || "Sem nome"}</b>
                    <span>{p.tag || "Poder"}</span>
                  </div>
                </div>

                {isOpen && (
                  <div className="ataqueBody">
                    {p.tipo?.trim() ? <div className="poderLinha"><b>Tipo:</b> {p.tipo}</div> : null}

                    <div className="poderDesc">{p.desc?.trim() ? p.desc : "-"}</div>

                    <div className="ataqueActions">
                      <button className="ghostBtn" type="button" onClick={() => abrirModalEditarPoder(p.id)}>
                        Editar
                      </button>
                      <button className="danger" type="button" onClick={() => removePoder(p.id)}>
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
