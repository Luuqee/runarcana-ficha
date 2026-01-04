import { useEffect } from "react";

export default function PowerModal({
  open,
  title,
  novoPoder,
  setNovoPoder,
  onClose,
  onSave,
}) {
  const set = (p) => setNovoPoder((x) => ({ ...x, ...p }));

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
          <h3>{title || "Adicionar Poder"}</h3>
          <button type="button" className="rkModalX" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="rkModalBody">
          <label className="rkField">
            <span>Nome do poder</span>
            <input
              value={novoPoder?.nome ?? ""}
              onChange={(e) => set({ nome: e.target.value })}
              placeholder="Ex: Instinto Predador"
              autoComplete="off"
            />
          </label>

          <div className="rkGrid2">
            <label className="rkField">
              <span>Custo (opcional)</span>
              <input
                value={novoPoder?.custo ?? ""}
                onChange={(e) => set({ custo: e.target.value })}
                placeholder="Ex: 2 mana, 1 ação..."
                autoComplete="off"
              />
            </label>

            <label className="rkField">
              <span>Tipo (opcional)</span>
              <input
                value={novoPoder?.tipo ?? ""}
                onChange={(e) => set({ tipo: e.target.value })}
                placeholder="Ex: Passivo, Ativo..."
                autoComplete="off"
              />
            </label>
          </div>

          <label className="rkField">
            <span>Descrição</span>
            <textarea
              value={novoPoder?.descricao ?? ""}
              onChange={(e) => set({ descricao: e.target.value })}
              placeholder="Descrição completa do poder..."
              rows={6}
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
