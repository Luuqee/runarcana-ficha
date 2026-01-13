// src/components/sheets/TabRunes.jsx
import { useMemo } from "react";
import {
  PULSOS,
  TIPOS_DANO_RUNAS,
  DANOS_FISICOS,
  DANOS_ELEMENTAIS,
  PULSO_DICE_TABLE,
} from "../../data/sheetConstants.js";

function clampProfMin2(prof) {
  const p = Number(prof || 0);
  return Math.max(2, p);
}

function halfLevelCeilMin1(level) {
  const lv = Math.max(1, Number(level || 1));
  return Math.max(1, Math.ceil(lv / 2)); // ✅ “pra cima”
}

export default function TabRunes({
  runas,
  prof,
  nivel,
  update,
  openPulse,
  setOpenPulse,
  openRuna,
  setOpenRuna,
  abrirModalPulso,
  removerPulso,
  abrirModalRuna,
  editarRuna,
  removerRuna,
}) {
  // ✅ runas safe (pra storage velho não quebrar)
  const runasSafe = runas || {
    pulso: null,
    pulsoRoll: "",
    escolhas: {
      fisico: "",
      elemental1: "",
      elemental2: "",
      elemental3: "",
      danoRubi: "",
      recurso: "",
    },
    lista: [],
  };

  const profC = clampProfMin2(prof);
  const half = halfLevelCeilMin1(nivel);

  const cd = 8 + Number(profC) + Number(half);
  const atk = Number(profC) + Number(half);

  const diceRow = PULSO_DICE_TABLE[Math.min(6, profC)] || PULSO_DICE_TABLE[2];
  const baseDie = diceRow.base;
  const pulsoDie = diceRow.pulso;

  const pulso = runasSafe.pulso;
  const escolhas = runasSafe.escolhas || {};
  const lista = runasSafe.lista || [];

  const pulseMeta = useMemo(() => {
    if (!pulso?.key) return null;
    return PULSOS.find((p) => p.key === pulso.key) || null;
  }, [pulso]);

  const pulseVars = pulseMeta
    ? { "--elem": pulseMeta.c1, "--elem2": pulseMeta.c2 }
    : { "--elem": "#d6b35a", "--elem2": "#fff2a8" };

  const showElem2 = Number(nivel || 1) >= 9;
  const showElem3 = Number(nivel || 1) >= 17;

  return (
    <div className="runesWrap">
      {/* topo estilo magia */}
      <div className="magiaTop">
        <div className="magiaStat">
          <span>CD RUNAS</span>
          <input value={cd} readOnly />
        </div>
        <div className="magiaStat">
          <span>ATAQUE RUNAS</span>
          <input value={atk} readOnly />
        </div>
      </div>

      {/* dado de pulso */}
      <div className="pulseTable">
        <div className="pulseTableTitle">DADO DE PULSO</div>
        <div className="pulseTableGrid">
          <div className="ptHead">PROF.</div>
          <div className="ptHead">BASE</div>
          <div className="ptHead">PULSO</div>

          <div className="ptVal">{Math.min(6, profC)}</div>
          <div className="ptVal">{baseDie}</div>
          <div className="ptVal">{pulsoDie}</div>
        </div>
      </div>

      {/* pulso rúnico */}
      {!pulso ? (
        <button className="ataqueAdd" type="button" onClick={abrirModalPulso}>
          Adicionar Pulso Rúnico
        </button>
      ) : (
        <div className="pulseCard" style={pulseVars}>
          <div
            className="pulseHeader"
            onClick={() => setOpenPulse(openPulse === pulso.key ? null : pulso.key)}
          >
            <span className={"pulseSeta " + (openPulse === pulso.key ? "aberta" : "")}>▼</span>
            <span className="pulseDot" />
            <div className="pulseNameBox">
              <div className="pulseName">{pulseMeta?.label || "Pulso"}</div>
              <div className="pulseMini">
                Dado de Pulso: <b>{pulsoDie}</b>
              </div>
            </div>
          </div>

          {openPulse === pulso.key && (
            <div className="pulseBody">
              <div className="pulseDesc">{pulseMeta?.desc || ""}</div>

              <div className="pulseRow">
                <span className="pulseLbl">Rolagem (descanso)</span>
                <input
                  className="pulseInput"
                  type="number"
                  value={runasSafe.pulsoRoll ?? ""}
                  onChange={(e) =>
                    update({
                      runas: { ...runasSafe, pulsoRoll: e.target.value },
                    })
                  }
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>

              {pulso.key === "esmeralda" && (
                <div className="pulseGrid">
                  <div className="pulseField">
                    <span>Dano físico</span>
                    <select
                      value={escolhas.fisico || ""}
                      onChange={(e) =>
                        update({
                          runas: {
                            ...runasSafe,
                            escolhas: { ...escolhas, fisico: e.target.value },
                          },
                        })
                      }
                    >
                      <option value="">—</option>
                      {DANOS_FISICOS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pulseField">
                    <span>Dano elemental (1)</span>
                    <select
                      value={escolhas.elemental1 || ""}
                      onChange={(e) =>
                        update({
                          runas: {
                            ...runasSafe,
                            escolhas: { ...escolhas, elemental1: e.target.value },
                          },
                        })
                      }
                    >
                      <option value="">—</option>
                      {DANOS_ELEMENTAIS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {showElem2 && (
                    <div className="pulseField">
                      <span>Dano elemental (2)</span>
                      <select
                        value={escolhas.elemental2 || ""}
                        onChange={(e) =>
                          update({
                            runas: {
                              ...runasSafe,
                              escolhas: { ...escolhas, elemental2: e.target.value },
                            },
                          })
                        }
                      >
                        <option value="">—</option>
                        {DANOS_ELEMENTAIS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {showElem3 && (
                    <div className="pulseField">
                      <span>Dano elemental (3)</span>
                      <select
                        value={escolhas.elemental3 || ""}
                        onChange={(e) =>
                          update({
                            runas: {
                              ...runasSafe,
                              escolhas: { ...escolhas, elemental3: e.target.value },
                            },
                          })
                        }
                      >
                        <option value="">—</option>
                        {DANOS_ELEMENTAIS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {pulso.key === "rubi" && (
                <div className="pulseGrid">
                  <div className="pulseField">
                    <span>Tipo de dano</span>
                    <select
                      value={escolhas.danoRubi || ""}
                      onChange={(e) =>
                        update({
                          runas: {
                            ...runasSafe,
                            escolhas: { ...escolhas, danoRubi: e.target.value },
                          },
                        })
                      }
                    >
                      <option value="">—</option>
                      {TIPOS_DANO_RUNAS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {pulso.key === "ametista" && (
                <div className="pulseGrid">
                  <div className="pulseField">
                    <span>Recurso</span>
                    <select
                      value={escolhas.recurso || ""}
                      onChange={(e) =>
                        update({
                          runas: {
                            ...runasSafe,
                            escolhas: { ...escolhas, recurso: e.target.value },
                          },
                        })
                      }
                    >
                      <option value="">—</option>
                      <option value="Vida">Vida</option>
                      <option value="Mana">Mana</option>
                      <option value="Ki">Ki</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="pulseActions">
                <button className="ghostBtn" type="button" onClick={abrirModalPulso}>
                  Trocar Pulso
                </button>
                <button className="danger" type="button" onClick={removerPulso}>
                  Remover
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* runas / runessências */}
      <button className="ataqueAdd" type="button" onClick={() => abrirModalRuna(null)}>
        Adicionar Runa / Runessência
      </button>

      <div className="ataquesList">
        {lista.map((r) => {
          const meta = PULSOS.find((p) => p.key === r.pulso) || PULSOS[0];
          const vars = { "--elem": meta.c1, "--elem2": meta.c2 };
          const opened = openRuna === r.id;

          return (
            <div key={r.id} className="runaCard" style={vars}>
              <div className="runaHeader" onClick={() => setOpenRuna(opened ? null : r.id)}>
                <span className={"runaSeta " + (opened ? "aberta" : "")}>▼</span>
                <span className="runaDot" />
                <div className="runaNameBox">
                  <div className="runaName">{r.nome}</div>
                  <div className="runaMini">
                    {r.tipo} • {meta.label}
                  </div>
                </div>
              </div>

              {opened && (
                <div className="runaBody">
                  {r.prereq?.trim() && (
                    <div className="spellRow">
                      <div className="spellLbl">Pré-req.</div>
                      <div className="spellVal">{r.prereq}</div>
                    </div>
                  )}

                  {r.sinergia?.trim() && (
                    <div className="spellRow">
                      <div className="spellLbl">Sinergia</div>
                      <div className="spellVal">{r.sinergia}</div>
                    </div>
                  )}

                  {r.uso?.trim() && (
                    <div className="spellDescBlock">
                      <div className="spellLbl">Uso</div>
                      <div className="spellDesc">{r.uso}</div>
                    </div>
                  )}

                  {/* Maestrias (marcação A/B) */}
                  <div className="maestriaBox">
                    <div className="maeTitle">Maestria 1</div>
                    <div className="maeChoices">
                      <label className="maeChoice">
                        <input
                          type="radio"
                          name={`m1_${r.id}`}
                          checked={r.m1Escolha === "A"}
                          onChange={() => editarRuna(r.id, { m1Escolha: "A" })}
                        />
                        <span>A</span>
                      </label>
                      <label className="maeChoice">
                        <input
                          type="radio"
                          name={`m1_${r.id}`}
                          checked={r.m1Escolha === "B"}
                          onChange={() => editarRuna(r.id, { m1Escolha: "B" })}
                        />
                        <span>B</span>
                      </label>
                      <button className="maeClear" type="button" onClick={() => editarRuna(r.id, { m1Escolha: "" })}>
                        limpar
                      </button>
                    </div>

                    <div className="maeText">
                      <div className="maeCol">
                        <div className="maeLbl">A</div>
                        <div className="maeDesc">{r.maestriaA || "—"}</div>
                      </div>
                      <div className="maeCol">
                        <div className="maeLbl">B</div>
                        <div className="maeDesc">{r.maestriaB || "—"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="maestriaBox">
                    <div className="maeTitle">Maestria 2</div>
                    <div className="maeChoices">
                      <label className="maeChoice">
                        <input
                          type="radio"
                          name={`m2_${r.id}`}
                          checked={r.m2Escolha === "A"}
                          onChange={() => editarRuna(r.id, { m2Escolha: "A" })}
                        />
                        <span>A</span>
                      </label>
                      <label className="maeChoice">
                        <input
                          type="radio"
                          name={`m2_${r.id}`}
                          checked={r.m2Escolha === "B"}
                          onChange={() => editarRuna(r.id, { m2Escolha: "B" })}
                        />
                        <span>B</span>
                      </label>
                      <button className="maeClear" type="button" onClick={() => editarRuna(r.id, { m2Escolha: "" })}>
                        limpar
                      </button>
                    </div>

                    <div className="maeText">
                      <div className="maeCol">
                        <div className="maeLbl">A</div>
                        <div className="maeDesc">{r.maestriaA || "—"}</div>
                      </div>
                      <div className="maeCol">
                        <div className="maeLbl">B</div>
                        <div className="maeDesc">{r.maestriaB || "—"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="ataqueActions">
                    <button className="ghostBtn" type="button" onClick={() => abrirModalRuna(r.id)}>
                      Editar
                    </button>
                    <button className="danger" type="button" onClick={() => removerRuna(r.id)}>
                      Remover
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
