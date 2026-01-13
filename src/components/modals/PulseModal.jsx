// src/components/modals/PulseModal.jsx
import { useMemo, useState } from "react";
import { PULSOS } from "../../data/sheetConstants.js";

export default function PulseModal({ open, onClose, onSave, currentKey }) {
  const [key, setKey] = useState(currentKey || "");

  const meta = useMemo(() => PULSOS.find((p) => p.key === key) || null, [key]);

  if (!open) return null;

  return (
    <div className="rkModalOverlay" onMouseDown={onClose}>
      <div className="rkModalCard" onMouseDown={(e) => e.stopPropagation()}>
        <div className="rkModalHeader">
          <h3>Adicionar Pulso Rúnico</h3>
          <button className="rkModalX" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="rkModalBody">
          <div className="rkField">
            <span>Pulso</span>
            <select value={key} onChange={(e) => setKey(e.target.value)}>
              <option value="">— selecione —</option>
              {PULSOS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {meta?.desc && <div className="rkHint">{meta.desc}</div>}
        </div>

        <div className="rkModalFooter">
          <button className="rkBtnGhost" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="rkBtnPrimary" type="button" onClick={() => key && onSave(key)}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
