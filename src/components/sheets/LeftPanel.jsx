// src/components/sheets/LeftPanel.jsx
import { ATTRS } from "../../data/sheetConstants";
import { mod } from "../../utils/sheetUtils";
import LeftCombatExtras from "./LeftCombatExtras";

export default function LeftPanel({
  attrs,
  prof,
  profMode,
  ca,
  escudo,
  deslocamento,
  iniciativa,
  skills,
  vidaC,
  manaC,
  vidaPct,
  manaPct,
  stepBar,
  saves,
  deathSaves,
  exhaustion,
  update,
}) {
  return (
    <div className="left">
      {/* ATRIBUTOS */}
      <div className="attrs">
        {ATTRS.map((a) => (
          <div key={a} className="attr">
            <span>{a}</span>
            <div>
              <b>{(mod(attrs[a]) >= 0 ? "+" : "") + mod(attrs[a])}</b>
              <input
                name={`attr_${a}`}
                type="number"
                value={attrs[a]}
                onChange={(e) => update({ attrs: { ...attrs, [a]: +e.target.value } })}
                autoComplete="off"
              />
            </div>
          </div>
        ))}
      </div>

      {/* PROFICIÊNCIA + CA */}
      <div className="profCaBlock">
        <div className="profSide">
          <div className="profBlock">
            <div className="profTitle">
              BÔNUS DE
              <br />
              PROFICIÊNCIA
            </div>
            <div className="profHex">
              <input
                name="prof"
                type="number"
                value={prof}
                onChange={(e) =>
                  update({ prof: Number(e.target.value || 0), profMode: "manual" })
                }
                inputMode="numeric"
                autoComplete="off"
                disabled={profMode === "auto"}
              />
            </div>
          </div>
        </div>

        <div className="caSide">
          <div className="caTitle">CLASSE DE ARMADURA</div>
          <div className="caGrid2">
            <div className="caField">
              <span>CA</span>
              <input
                name="ca"
                type="number"
                value={ca}
                onChange={(e) => update({ ca: e.target.value })}
                inputMode="numeric"
                autoComplete="off"
              />
            </div>

            <div className="caField">
              <span>Escudo</span>
              <input
                name="escudo"
                type="number"
                value={escudo}
                onChange={(e) => update({ escudo: e.target.value })}
                inputMode="numeric"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>

      {/* HEXÁGONOS */}
      <div className="hexBlock">
        <div className="hexItem">
          <div className="hexLabel">DESLOCAMENTO</div>
          <div className="hexagon">
            <input
              name="deslocamento"
              type="text"
              value={deslocamento || "9m"}
              onChange={(e) => update({ deslocamento: e.target.value })}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="hexItem">
          <div className="hexLabel">INICIATIVA</div>
          <div className="hexagon">
            <input
              name="iniciativa"
              type="text"
              value={iniciativa || "+0"}
              onChange={(e) => update({ iniciativa: e.target.value })}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="hexItem">
          <div className="hexLabel">
            PERCEPÇÃO
            <br />
            PASSIVA
          </div>
          <div className="hexagon hexCalculado">
            <span>
              {(() => {
                const percepcao = skills.find((s) => s.name === "Percepção");
                const bonus = percepcao?.trained ? prof : 0;
                return 10 + mod(attrs.SAB) + bonus;
              })()}
            </span>
          </div>
        </div>

        <div className="hexItem">
          <div className="hexLabel">
            INTUIÇÃO
            <br />
            PASSIVA
          </div>
          <div className="hexagon hexCalculado">
            <span>
              {(() => {
                const intuicao = skills.find((s) => s.name === "Intuição");
                const bonus = intuicao?.trained ? prof : 0;
                return 10 + mod(attrs.SAB) + bonus;
              })()}
            </span>
          </div>
        </div>
      </div>

      {/* VIDA */}
      <div className="barBlock">
        <h4 className="barTitle">VIDA</h4>
        <div className="barOrdem vida" style={{ "--pct": `${vidaPct}%` }}>
          <div className="barCenter">
            <div className="barPad">
              <button className="barBtn" type="button" onClick={() => stepBar("vida", -1, true)}>
                &lt;&lt;
              </button>
              <button className="barBtn" type="button" onClick={() => stepBar("vida", -1, false)}>
                &lt;
              </button>
            </div>

            <div className="barValue">
              <input
                name="vida_atual"
                value={vidaC.atual}
                onChange={(e) =>
                  update({ vida: { ...vidaC, atual: e.target.value } })
                }
                inputMode="numeric"
                autoComplete="off"
              />
              <span className="barSlash">/</span>
              <input
                name="vida_max"
                value={vidaC.max}
                onChange={(e) =>
                  update({ vida: { ...vidaC, max: e.target.value } })
                }
                inputMode="numeric"
                autoComplete="off"
              />
            </div>

            <div className="barPad">
              <button className="barBtn" type="button" onClick={() => stepBar("vida", +1, false)}>
                &gt;
              </button>
              <button className="barBtn" type="button" onClick={() => stepBar("vida", +1, true)}>
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MANA */}
      <div className="barBlock">
        <h4 className="barTitle">MANA</h4>
        <div className="barOrdem mana" style={{ "--pct": `${manaPct}%` }}>
          <div className="barCenter">
            <div className="barPad">
              <button className="barBtn" type="button" onClick={() => stepBar("mana", -1, true)}>
                &lt;&lt;
              </button>
              <button className="barBtn" type="button" onClick={() => stepBar("mana", -1, false)}>
                &lt;
              </button>
            </div>

            <div className="barValue">
              <input
                name="mana_atual"
                value={manaC.atual}
                onChange={(e) =>
                  update({ mana: { ...manaC, atual: e.target.value } })
                }
                inputMode="numeric"
                autoComplete="off"
              />
              <span className="barSlash">/</span>
              <input
                name="mana_max"
                value={manaC.max}
                onChange={(e) =>
                  update({ mana: { ...manaC, max: e.target.value } })
                }
                inputMode="numeric"
                autoComplete="off"
              />
            </div>

            <div className="barPad">
              <button className="barBtn" type="button" onClick={() => stepBar("mana", +1, false)}>
                &gt;
              </button>
              <button className="barBtn" type="button" onClick={() => stepBar("mana", +1, true)}>
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SALVAGUARDAS / MORTE / EXAUSTÃO */}
      <LeftCombatExtras
        attrs={attrs}
        profBonus={prof}
        saves={saves}
        deathSaves={deathSaves}
        exhaustion={exhaustion}
        update={update}
      />
    </div>
  );
}