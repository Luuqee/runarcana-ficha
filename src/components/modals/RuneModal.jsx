// src/components/modals/RuneModal.jsx
import { useMemo, useState } from "react";
import { PULSOS, defaultNovaRuna } from "../../data/sheetConstants.js";

export default function RuneModal({ open, title, onClose, onSave, initial }) {
  const [form, setForm] = useState(() => ({
    ...defaultNovaRuna,
    ...(initial || {}),
  }));

  const pulse = useMemo(() => PULSOS.find((p) => p.key === form.pulso) || PULSOS[0], [form.pulso]);

  if (!open) return null;

  return (
    <div className="rkModalOverlay" onMouseDown={onClose}>
      <div className="rkModalCard" onMouseDown={(e) => e.stopPropagation()}>
        <div className="rkModalHeader">
          <h3>{title}</h3>
          <button className="rkModalX" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="rkModalBody">
          <div className="rkGrid2">
            <div className="rkField">
              <span>Nome</span>
              <input value={form.nome} onChange={(e) => setForm((s) => ({ ...s, nome: e.target.value }))} />
            </div>

            <div className="rkField">
              <span>Tipo</span>
              <select value={form.tipo} onChange={(e) => setForm((s) => ({ ...s, tipo: e.target.value }))}>
                <option>Runa</option>
                <option>Runessência</option>
              </select>
            </div>
          </div>

          <div className="rkGrid2">
            <div className="rkField">
              <span>Pulso</span>
              <select value={form.pulso} onChange={(e) => setForm((s) => ({ ...s, pulso: e.target.value }))}>
                {PULSOS.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label}
                  </option>
                ))}
              </select>
              <div className="rkHint">{pulse?.label}</div>
            </div>

            <div className="rkField">
              <span>Pré-requisito</span>
              <input value={form.prereq} onChange={(e) => setForm((s) => ({ ...s, prereq: e.target.value }))} />
            </div>
          </div>

          <div className="rkField">
            <span>Sinergia</span>
            <input value={form.sinergia} onChange={(e) => setForm((s) => ({ ...s, sinergia: e.target.value }))} />
          </div>

          <div className="rkField">
            <span>Uso / Descrição</span>
            <textarea value={form.uso} onChange={(e) => setForm((s) => ({ ...s, uso: e.target.value }))} />
          </div>

          <div className="rkGrid2">
            <div className="rkField">
              <span>Maestria A</span>
              <textarea value={form.maestriaA} onChange={(e) => setForm((s) => ({ ...s, maestriaA: e.target.value }))} />
            </div>
            <div className="rkField">
              <span>Maestria B</span>
              <textarea value={form.maestriaB} onChange={(e) => setForm((s) => ({ ...s, maestriaB: e.target.value }))} />
            </div>
          </div>
        </div>

        <div className="rkModalFooter">
          <button className="rkBtnGhost" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="rkBtnPrimary" type="button" onClick={() => onSave(form)}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
