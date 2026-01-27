import { mod } from "../../utils/sheetUtils.js";

const SAVE_ATTRS = ["FOR", "DES", "CON", "INT", "SAB", "CAR"];

export default function LeftCombatExtras({
  attrs,
  profBonus,
  saves,
  deathSaves,
  exhaustion,
  update,
}) {
  const pb = Number(profBonus || 0);

  const toggleSaveProf = (a) => {
    update({
      saves: {
        ...saves,
        [a]: { proficient: !saves?.[a]?.proficient },
      },
    });
  };

  const saveBonus = (a) => {
    const base = mod(attrs[a]);
    const isProf = !!saves?.[a]?.proficient;
    return base + (isProf ? pb : 0);
  };

  const toggleDeath = (kind, idx) => {
    const arr = [...(deathSaves?.[kind] || [false, false, false])];
    arr[idx] = !arr[idx];
    update({
      deathSaves: {
        ...deathSaves,
        [kind]: arr,
      },
    });
  };

  const toggleExhaust = (idx) => {
    const arr = [...(exhaustion || [false, false, false, false, false, false])];
    arr[idx] = !arr[idx];
    update({ exhaustion: arr });
  };

  return (
    <div className="rkLeftExtras">
      {/* SALVAGUARDAS */}
      <div className="rkMiniCard">
        <div className="rkMiniTitle">SALVAGUARDAS</div>

        <div className="rkSavesGrid">
          {SAVE_ATTRS.map((a) => {
            const isProf = !!saves?.[a]?.proficient;
            return (
              <div key={a} className="rkSaveRow">
                {/* ✅ CORRIGIDO: bolinhas só visuais, onClick só no pai */}
                <div 
                  className="rkSaveDots" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveProf(a);
                  }} 
                  title="Proficiente"
                >
                  <span className={`rkDot ${isProf ? "on" : ""}`} />
                  <span className={`rkDot ${isProf ? "on" : ""}`} />
                </div>

                <div className="rkSaveLabel">{a}</div>

                <div className="rkSaveValue">{saveBonus(a) >= 0 ? `+${saveBonus(a)}` : saveBonus(a)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SALVAGUARDA CONTRA A MORTE */}
      <div className="rkMiniCard">
        <div className="rkMiniTitle">SALVAGUARDA CONTRA A MORTE</div>

        <div className="rkDeathRow">
          <span className="rkDeathLbl">Sucessos</span>
          <div className="rkDotsLine">
            {(deathSaves?.success || [false, false, false]).map((v, i) => (
              <span
                key={i}
                className={`rkDot ${v ? "on" : ""}`}
                onClick={() => toggleDeath("success", i)}
                role="checkbox"
                aria-checked={v}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? toggleDeath("success", i) : null)}
              />
            ))}
          </div>
        </div>

        <div className="rkDeathRow">
          <span className="rkDeathLbl">Falhas</span>
          <div className="rkDotsLine">
            {(deathSaves?.fail || [false, false, false]).map((v, i) => (
              <span
                key={i}
                className={`rkDot ${v ? "on" : ""}`}
                onClick={() => toggleDeath("fail", i)}
                role="checkbox"
                aria-checked={v}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? toggleDeath("fail", i) : null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* EXAUSTÃO */}
      <div className="rkMiniCard">
        <div className="rkMiniTitle">NÍVEIS DE EXAUSTÃO</div>

        <div className="rkDotsLine">
          {(exhaustion || [false, false, false, false, false, false]).map((v, i) => (
            <span
              key={i}
              className={`rkDot ${v ? "on" : ""}`}
              onClick={() => toggleExhaust(i)}
              role="checkbox"
              aria-checked={v}
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? toggleExhaust(i) : null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}