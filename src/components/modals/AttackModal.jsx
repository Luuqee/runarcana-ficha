import { useEffect } from "react";

export default function AttackModal({
  open,
  title,
  novoAtaque,
  setNovoAtaque,
  onClose,
  onSave,
  ATTRS,
  CRITICOS,
  MULTS,
  TIPOS_DANO,
  ALCANCES_ATAQUE,
}) {
  const set = (p) => setNovoAtaque((a) => ({ ...a, ...p }));

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="rkModalOverlay" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="rkModalCard" onMouseDown={(e) => e.stopPropagation()}>
        <div className="rkModalHeader">
          <h3>{title || "Novo Ataque"}</h3>
          <button type="button" className="rkModalX" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="rkModalBody">
          <label className="rkField">
            <span>Nome do ataque</span>
            <input
              value={novoAtaque?.nome ?? ""}
              onChange={(e) => set({ nome: e.target.value })}
              placeholder="Ex: Corte Rápido"
              autoComplete="off"
            />
          </label>

          <div className="rkGrid3">
            <label className="rkField">
              <span>Atributo</span>
              <select value={novoAtaque?.attr ?? ATTRS?.[0] ?? "FOR"} onChange={(e) => set({ attr: e.target.value })}>
                {ATTRS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>

            <label className="rkField">
              <span>Alcance</span>
              <select
                value={novoAtaque?.alcance ?? ALCANCES_ATAQUE?.[0] ?? ""}
                onChange={(e) => set({ alcance: e.target.value })}
              >
                {ALCANCES_ATAQUE.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </label>

            <label className="rkField">
              <span>Tipo de Dano</span>
              <select
                value={novoAtaque?.tipoDano ?? TIPOS_DANO?.[0] ?? ""}
                onChange={(e) => set({ tipoDano: e.target.value })}
              >
                {TIPOS_DANO.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="rkGrid3">
            <label className="rkField">
              <span>Dano</span>
              <input
                value={novoAtaque?.dano ?? ""}
                onChange={(e) => set({ dano: e.target.value })}
                placeholder="Ex: 1d8 + FOR"
                autoComplete="off"
              />
            </label>

            <label className="rkField">
              <span>Crítico</span>
              <select
                value={novoAtaque?.critico ?? CRITICOS?.[0] ?? ""}
                onChange={(e) => set({ critico: e.target.value })}
              >
                {CRITICOS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="rkField">
              <span>Multiplicador</span>
              <select value={novoAtaque?.mult ?? MULTS?.[0] ?? ""} onChange={(e) => set({ mult: e.target.value })}>
                {MULTS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="rkField">
            <span>Descrição (opcional)</span>
            <textarea
              value={novoAtaque?.descricao ?? ""}
              onChange={(e) => set({ descricao: e.target.value })}
              placeholder="Detalhes, efeitos, observações..."
              rows={4}
            />
          </label>

          <div className="rkHint">Dica: ESC fecha. Clique fora também fecha.</div>
        </div>

        <div className="rkModalFooter">
          <button type="button" className="rkBtnGhost" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="rkBtnPrimary" onClick={onSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
