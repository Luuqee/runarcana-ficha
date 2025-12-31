import { useEffect } from "react";

export default function SpellModal({
  open,
  title,
  novaMagia,
  setNovaMagia,
  onClose,
  onSave,
  TIPOS_MAGIA,
  ELEMENTOS,
  AREAS,
  CONJURACOES,
  DURACOES,
}) {
  // trava scroll quando modal abre (fica bem "modal de verdade")
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const set = (k, v) => setNovaMagia((p) => ({ ...p, [k]: v }));

  const stop = (e) => e.stopPropagation();

  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={stop}>
        <h3>{title || "Adicionar Magia"}</h3>

        <div className="grid2">
          <div className="grid1">
            <label>
              <div className="hint">Nome</div>
              <input
                value={novaMagia.nome || ""}
                onChange={(e) => set("nome", e.target.value)}
                autoComplete="off"
              />
            </label>

            <label>
              <div className="hint">Tipo</div>
              <select value={novaMagia.tipo || TIPOS_MAGIA?.[0]} onChange={(e) => set("tipo", e.target.value)}>
                {(TIPOS_MAGIA || []).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <div className="hint">Elemento</div>
              <select
                value={novaMagia.elementoKey || (ELEMENTOS?.[0]?.key ?? "")}
                onChange={(e) => set("elementoKey", e.target.value)}
              >
                {(ELEMENTOS || []).map((el) => (
                  <option key={el.key} value={el.key}>
                    {el.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <div className="hint">Área</div>
              <select value={novaMagia.area || AREAS?.[0]} onChange={(e) => set("area", e.target.value)}>
                {(AREAS || []).map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid1">
            <label>
              <div className="hint">Conjuração</div>
              <select
                value={novaMagia.conjuracao || CONJURACOES?.[0]}
                onChange={(e) => set("conjuracao", e.target.value)}
              >
                {(CONJURACOES || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <div className="hint">Duração</div>
              <select
                value={novaMagia.duracao || DURACOES?.[0]}
                onChange={(e) => set("duracao", e.target.value)}
              >
                {(DURACOES || []).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <div className="hint">Alvos</div>
              <input
                value={novaMagia.alvos || ""}
                onChange={(e) => set("alvos", e.target.value)}
                autoComplete="off"
              />
            </label>

            <label>
              <div className="hint">Alcance</div>
              <input
                value={novaMagia.alcance || ""}
                onChange={(e) => set("alcance", e.target.value)}
                autoComplete="off"
              />
            </label>
          </div>
        </div>

        <div className="grid1" style={{ marginTop: 10 }}>
          <label>
            <div className="hint">Descrição</div>
            <textarea
              value={novaMagia.desc || ""}
              onChange={(e) => set("desc", e.target.value)}
            />
          </label>
        </div>

        <div className="modalBtns">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" onClick={onSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
