import { useEffect, useMemo } from "react";

export default function MysteryModal({
  open,
  title,
  novoMisterio,
  setNovoMisterio,
  onClose,
  onSave,
  MISTERIOS,
}) {
  // trava scroll quando modal abre
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const selecionado = useMemo(() => {
    const key = novoMisterio?.misterioKey;
    return (MISTERIOS || []).find((m) => m.key === key) || null;
  }, [novoMisterio, MISTERIOS]);

  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={stop}>
        <h3>{title || "Adicionar Mistério"}</h3>

        <div className="grid1">
          <label>
            <div className="hint">Mistério</div>
            <select
              value={novoMisterio?.misterioKey || ""}
              onChange={(e) =>
                setNovoMisterio((p) => ({ ...(p || {}), misterioKey: e.target.value }))
              }
            >
              <option value="" disabled>
                Selecione...
              </option>
              {(MISTERIOS || []).map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>

          <div className="hint" style={{ lineHeight: 1.4 }}>
            {selecionado?.desc
              ? selecionado.desc
              : "Selecione um mistério para ver a descrição."}
          </div>
        </div>

        <div className="modalBtns">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!novoMisterio?.misterioKey}
            style={{ opacity: !novoMisterio?.misterioKey ? 0.5 : 1 }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
