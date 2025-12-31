export default function StatusBars({ label, tone = "vida", value, onChange }) {
  const atual = Number(value?.atual) || 0;
  const max = Number(value?.max) || 0;

  const pct = max > 0 ? (atual / max) * 100 : 0;

  const setAtual = (v) => onChange({ atual: v, max });
  const setMax = (v) => onChange({ atual, max: v });

  const stepSmall = (dir) => setAtual(atual + dir * 1);
  const stepBig = (dir) => setAtual(atual + dir * 10);

  return (
    <div className="barBlock">
      <h4 className="barTitle">{label}</h4>

      <div className={`barOrdem ${tone}`} style={{ "--pct": `${pct}%` }}>
        <div className="barCenter barCenterOrdem">
          <button className="barStep" onClick={() => stepBig(-1)} type="button" aria-label="Diminuir 10">
            «
          </button>
          <button className="barStep" onClick={() => stepSmall(-1)} type="button" aria-label="Diminuir 1">
            ‹
          </button>

          <input
            type="number"
            value={atual}
            onChange={(e) => setAtual(e.target.value)}
            inputMode="numeric"
            autoComplete="off"
          />
          <span>/</span>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            inputMode="numeric"
            autoComplete="off"
          />

          <button className="barStep" onClick={() => stepSmall(1)} type="button" aria-label="Aumentar 1">
            ›
          </button>
          <button className="barStep" onClick={() => stepBig(1)} type="button" aria-label="Aumentar 10">
            »
          </button>
        </div>
      </div>
    </div>
  );
}
