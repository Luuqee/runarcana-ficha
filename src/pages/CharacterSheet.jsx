// src/pages/CharacterSheet.jsx
import { useEffect, useMemo, useState } from "react";
import "../styles/sheet.css";

import {
  STORAGE_KEY,
  defaultState,
  defaultNovoAtaque,
  defaultNovoPoder,
  defaultNovaMagia,
  defaultNovoMisterio,
  ATTRS,
  PROF,
  CRITICOS,
  MULTS,
  TIPOS_DANO,
  ALCANCES_ATAQUE,
  AREAS,
  DURACOES,
  CONJURACOES,
  TIPOS_MAGIA,
  ELEMENTOS,
  MISTERIOS,
} from "../data/sheetConstants.js";

import { mod, clampBar, buildElementMap, getElemVars } from "../utils/sheetUtils.js";
import { loadSheet, saveSheet } from "../utils/sheetStorage.js";

import TabsHeader from "../components/sheets/TabsHeader.jsx";
import TabAttacks from "../components/sheets/TabAttacks.jsx";
import TabPowers from "../components/sheets/TabPowers.jsx";
import TabSpells from "../components/sheets/TabSpells.jsx";
import TabMysteries from "../components/sheets/TabMysteries.jsx";
import TabDescription from "../components/sheets/TabDescription.jsx";
import TabRunes from "../components/sheets/TabRunes.jsx";
import TabItens from "../components/sheets/TabItens.jsx";

import AttackModal from "../components/modals/AttackModal.jsx";
import PowerModal from "../components/modals/PowerModal.jsx";
import SpellModal from "../components/modals/SpellModal.jsx";
import MysteryModal from "../components/modals/MysteryModal.jsx";
import PulseModal from "../components/modals/PulseModal.jsx";
import RuneModal from "../components/modals/RuneModal.jsx";
import ItemModal from "../components/modals/ItemModal.jsx";

import LeftCombatExtras from "../components/sheets/LeftCombatExtras.jsx";

/** Progressão padrão (D&D 5e) */
function profByLevel(nivel) {
  const lv = Math.max(1, Number(nivel || 1));
  if (lv >= 17) return 6;
  if (lv >= 13) return 5;
  if (lv >= 9) return 4;
  if (lv >= 5) return 3;
  return 2;
}

export default function CharacterSheet() {
  const [state, setState] = useState(() => loadSheet(STORAGE_KEY, defaultState));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);
  useEffect(() => {
    if (!loaded) return;
    saveSheet(STORAGE_KEY, state);
  }, [state, loaded]);

  const update = (patch) => setState((s) => ({ ...s, ...patch }));

  const info = state.info || defaultState.info;
  const attrs = state.attrs || defaultState.attrs;
  const skills = state.skills || defaultState.skills;

  const vida = state.vida || defaultState.vida;
  const mana = state.mana || defaultState.mana;

  const ataques = state.ataques || [];
  const poderes = state.poderes || [];
  const magias = state.magias || [];
  const magiaStats = state.magiaStats || defaultState.magiaStats;
  const misterios = state.misterios || [];

  const tab = state.tab || "magias";

  const runas = state.runas || defaultState.runas;
  const ca = state.ca ?? "";
  const escudo = state.escudo ?? "";

  const saves = state.saves || defaultState.saves;
  const deathSaves = state.deathSaves || defaultState.deathSaves;
  const exhaustion = state.exhaustion || defaultState.exhaustion;

  // ✅ NOVO: moedas e inventário
  const moedas = state.moedas || defaultState.moedas;
  const inventario = state.inventario || defaultState.inventario;

  const nivel = Number(info?.nivel || 1);

  const profMode = state.profMode || "auto";
  const profManual = Number.isFinite(Number(state.prof)) ? Number(state.prof) : PROF;
  const profAuto = profByLevel(nivel);
  const prof = profMode === "manual" ? profManual : profAuto;

  useEffect(() => {
    if (!loaded) return;
    if (profMode !== "auto") return;
    setState((s) => ({ ...s, prof: profAuto }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nivel, profMode, loaded]);

  const vidaC = clampBar(vida);
  const manaC = clampBar(mana);

  const vidaPct = vidaC.max ? (Number(vidaC.atual) / Number(vidaC.max)) * 100 : 0;
  const manaPct = manaC.max ? (Number(manaC.atual) / Number(manaC.max)) * 100 : 0;

  const stepBar = (which, dir, big = false) => {
    const step = big ? 5 : 1;
    const k = which === "vida" ? vidaC : manaC;

    const atual = Number(k.atual || 0);
    const max = Number(k.max || 0);
    const next = Math.max(0, Math.min(max, atual + dir * step));

    const payload =
      which === "vida"
        ? { vida: clampBar({ ...k, atual: next }) }
        : { mana: clampBar({ ...k, atual: next }) };

    update(payload);
  };

  const ataquesById = useMemo(() => new Map((ataques || []).map((a) => [a.id, a])), [ataques]);
  const poderesById = useMemo(() => new Map((poderes || []).map((p) => [p.id, p])), [poderes]);
  const magiasById = useMemo(() => new Map((magias || []).map((m) => [m.id, m])), [magias]);

  const elementByKey = useMemo(() => buildElementMap(ELEMENTOS), []);
  const getVars = (key) => getElemVars(elementByKey, key);

  const mysteryByKey = useMemo(() => new Map((MISTERIOS || []).map((m) => [m.key, m])), []);

  const [openAtaque, setOpenAtaque] = useState(null);
  const [showAtaqueModal, setShowAtaqueModal] = useState(false);
  const [editAtaqueId, setEditAtaqueId] = useState(null);
  const [novoAtaque, setNovoAtaque] = useState(defaultNovoAtaque);

  const [openPoder, setOpenPoder] = useState(null);
  const [showPoderModal, setShowPoderModal] = useState(false);
  const [editPoderId, setEditPoderId] = useState(null);
  const [novoPoder, setNovoPoder] = useState(defaultNovoPoder);

  const [openMagia, setOpenMagia] = useState(null);
  const [showMagiaModal, setShowMagiaModal] = useState(false);
  const [editMagiaId, setEditMagiaId] = useState(null);
  const [novaMagia, setNovaMagia] = useState(defaultNovaMagia);

  const [openMisterio, setOpenMisterio] = useState(null);
  const [showMisterioModal, setShowMisterioModal] = useState(false);
  const [novoMisterio, setNovoMisterio] = useState(defaultNovoMisterio);

  const [openPulse, setOpenPulse] = useState(null);
  const [openRuna, setOpenRuna] = useState(null);

  const [showPulseModal, setShowPulseModal] = useState(false);
  const [showRuneModal, setShowRuneModal] = useState(false);
  const [editRuneId, setEditRuneId] = useState(null);

  // ✅ NOVO: modal de itens
  const [showItemModal, setShowItemModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  const abrirModalCriarAtaque = () => {
    setEditAtaqueId(null);
    setNovoAtaque(defaultNovoAtaque);
    setShowAtaqueModal(true);
  };

  const abrirModalEditarAtaque = (id) => {
    const a = ataquesById.get(id);
    if (!a) return;
    setEditAtaqueId(id);
    setNovoAtaque({ ...defaultNovoAtaque, ...a });
    setShowAtaqueModal(true);
  };

  const fecharModalAtaque = () => {
    setShowAtaqueModal(false);
    setEditAtaqueId(null);
    setNovoAtaque(defaultNovoAtaque);
  };

  const salvarAtaque = () => {
    if (!novoAtaque.nome?.trim() || !novoAtaque.dano?.trim()) return;

    if (editAtaqueId) {
      update({
        ataques: ataques.map((a) => (a.id === editAtaqueId ? { ...a, ...novoAtaque, id: editAtaqueId } : a)),
      });
    } else {
      update({ ataques: [...ataques, { id: crypto.randomUUID(), ...novoAtaque }] });
    }
    fecharModalAtaque();
  };

  const removeAtaque = (id) => update({ ataques: ataques.filter((a) => a.id !== id) });

  const abrirModalCriarPoder = () => {
    setEditPoderId(null);
    setNovoPoder(defaultNovoPoder);
    setShowPoderModal(true);
  };

  const abrirModalEditarPoder = (id) => {
    const p = poderesById.get(id);
    if (!p) return;
    setEditPoderId(id);
    setNovoPoder({ ...defaultNovoPoder, ...p });
    setShowPoderModal(true);
  };

  const fecharModalPoder = () => {
    setShowPoderModal(false);
    setEditPoderId(null);
    setNovoPoder(defaultNovoPoder);
  };

  const salvarPoder = () => {
    if (!novoPoder.nome?.trim()) return;

    if (editPoderId) {
      update({
        poderes: poderes.map((p) => (p.id === editPoderId ? { ...p, ...novoPoder, id: editPoderId } : p)),
      });
    } else {
      update({ poderes: [...poderes, { id: crypto.randomUUID(), ...novoPoder }] });
    }
    fecharModalPoder();
  };

  const removePoder = (id) => update({ poderes: poderes.filter((p) => p.id !== id) });

  const abrirModalCriarMagia = () => {
    setEditMagiaId(null);
    setNovaMagia(defaultNovaMagia);
    setShowMagiaModal(true);
  };

  const abrirModalEditarMagia = (id) => {
    const m = magiasById.get(id);
    if (!m) return;
    setEditMagiaId(id);
    setNovaMagia({ ...defaultNovaMagia, ...m });
    setShowMagiaModal(true);
  };

  const fecharModalMagia = () => {
    setShowMagiaModal(false);
    setEditMagiaId(null);
    setNovaMagia(defaultNovaMagia);
  };

  const salvarMagia = () => {
    if (!novaMagia.nome?.trim()) return;

    if (editMagiaId) {
      update({
        magias: magias.map((m) => (m.id === editMagiaId ? { ...m, ...novaMagia, id: editMagiaId } : m)),
      });
    } else {
      update({ magias: [...magias, { id: crypto.randomUUID(), ...novaMagia }] });
    }
    fecharModalMagia();
  };

  const removeMagia = (id) => update({ magias: magias.filter((m) => m.id !== id) });

  const abrirModalCriarMisterio = () => {
    setNovoMisterio(defaultNovoMisterio);
    setShowMisterioModal(true);
  };

  const fecharModalMisterio = () => {
    setShowMisterioModal(false);
    setNovoMisterio(defaultNovoMisterio);
  };

  const salvarMisterio = () => {
    const escolhido = MISTERIOS.find((m) => m.key === novoMisterio.misterioKey);
    if (!escolhido) return;

    if ((misterios || []).some((x) => x.key === escolhido.key)) {
      fecharModalMisterio();
      return;
    }

    update({
      misterios: [
        ...(misterios || []),
        {
          id: crypto.randomUUID(),
          key: escolhido.key,
          label: escolhido.label,
          color: escolhido.color,
          desc: escolhido.desc,
        },
      ],
    });

    fecharModalMisterio();
  };

  const removeMisterio = (id) => update({ misterios: (misterios || []).filter((m) => m.id !== id) });

  const abrirModalPulso = () => setShowPulseModal(true);
  const fecharModalPulso = () => setShowPulseModal(false);

  const salvarPulso = (key) => {
    update({
      runas: {
        ...(runas || {}),
        pulso: { key },
      },
    });
    setOpenPulse(key);
    fecharModalPulso();
  };

  const removerPulso = () => {
    update({
      runas: {
        ...(runas || {}),
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
      },
    });
    setOpenPulse(null);
  };

  const abrirModalRuna = (id = null) => {
    setEditRuneId(id);
    setShowRuneModal(true);
  };

  const fecharModalRuna = () => {
    setShowRuneModal(false);
    setEditRuneId(null);
  };

  const salvarRuna = (form) => {
    if (!form?.nome?.trim()) return;

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

    const list = runasSafe.lista || [];

    if (editRuneId) {
      update({
        runas: {
          ...runasSafe,
          lista: list.map((r) => (r.id === editRuneId ? { ...r, ...form, id: editRuneId } : r)),
        },
      });
      setOpenRuna(editRuneId);
    } else {
      const id = crypto.randomUUID();
      update({
        runas: {
          ...runasSafe,
          lista: [...list, { id, ...form }],
        },
      });
      setOpenRuna(id);
    }

    fecharModalRuna();
  };

  const removerRuna = (id) => {
    const list = runas?.lista || [];
    update({
      runas: {
        ...(runas || {}),
        lista: list.filter((r) => r.id !== id),
      },
    });
    if (openRuna === id) setOpenRuna(null);
  };

  const editarRuna = (id, patch) => {
    const list = runas?.lista || [];
    update({
      runas: {
        ...(runas || {}),
        lista: list.map((r) => (r.id === id ? { ...r, ...patch } : r)),
      },
    });
  };

  const initialRune = useMemo(() => {
    if (!editRuneId) return null;
    return (runas?.lista || []).find((r) => r.id === editRuneId) || null;
  }, [editRuneId, runas]);

  // ✅ NOVO: funções do modal de itens
  const abrirModalAdicionarItem = () => {
    setEditItemId(null);
    setShowItemModal(true);
  };

  const abrirModalEditarItem = (id) => {
    setEditItemId(id);
    setShowItemModal(true);
  };

  const fecharModalItem = () => {
    setShowItemModal(false);
    setEditItemId(null);
  };

  const salvarItem = (item) => {
    if (editItemId) {
      // Editando item existente
      update({
        inventario: inventario.map((i) => (i.id === editItemId ? { ...item, id: editItemId } : i)),
      });
    } else {
      // Adicionando novo item
      update({
        inventario: [...inventario, { id: crypto.randomUUID(), ...item }],
      });
    }
    fecharModalItem();
  };

  const itemToEdit = editItemId ? inventario.find((i) => i.id === editItemId) : null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (showAtaqueModal) fecharModalAtaque();
      if (showPoderModal) fecharModalPoder();
      if (showMagiaModal) fecharModalMagia();
      if (showMisterioModal) fecharModalMisterio();
      if (showPulseModal) fecharModalPulso();
      if (showRuneModal) fecharModalRuna();
      if (showItemModal) fecharModalItem();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAtaqueModal, showPoderModal, showMagiaModal, showMisterioModal, showPulseModal, showRuneModal, showItemModal]);

  return (
    <div className="sheet">
      {/* IDENTIFICAÇÃO */}
      <div className="idLine">
        {Object.keys(info).map((k) => (
          <div key={k} className="idField">
            <span>{k.toUpperCase()}</span>
            <input
              name={`info_${k}`}
              value={info[k]}
              onChange={(e) =>
                update({
                  info: {
                    ...info,
                    [k]: k === "nivel" ? Number(e.target.value || 1) : e.target.value,
                  },
                })
              }
              autoComplete="off"
              inputMode={k === "nivel" ? "numeric" : undefined}
            />
          </div>
        ))}
      </div>

      <div className="layout3">
        {/* ESQUERDA */}
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

          {/* PROFICIÊNCIA + CA (JUNTOS) */}
          <div className="profCaBlock">
            {/* Proficiência à esquerda */}
            <div className="profSide">
              <div className="profBlock">
                <div className="profTitle">BÔNUS DE<br/>PROFICIÊNCIA</div>
                <div className="profHex">
                  <input
                    name="prof"
                    type="number"
                    value={prof}
                    onChange={(e) => update({ prof: Number(e.target.value || 0), profMode: "manual" })}
                    inputMode="numeric"
                    autoComplete="off"
                    disabled={profMode === "auto"}
                  />
                </div>
              </div>
            </div>

            {/* CA à direita */}
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

          {/* HEXÁGONOS: Deslocamento, Iniciativa, Percepção Passiva, Intuição Passiva */}
          <div className="hexBlock">
            <div className="hexItem">
              <div className="hexLabel">DESLOCAMENTO</div>
              <div className="hexagon">
                <input
                  name="deslocamento"
                  type="text"
                  value={state.deslocamento || "9m"}
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
                  value={state.iniciativa || "+0"}
                  onChange={(e) => update({ iniciativa: e.target.value })}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="hexItem">
              <div className="hexLabel">PERCEPÇÃO<br/>PASSIVA</div>
              <div className="hexagon hexCalculado">
                <span>
                  {(() => {
                    const percepcao = skills.find(s => s.name === "Percepção");
                    const bonus = percepcao?.trained ? prof : 0;
                    return 10 + mod(attrs.SAB) + bonus;
                  })()}
                </span>
              </div>
            </div>

            <div className="hexItem">
              <div className="hexLabel">INTUIÇÃO<br/>PASSIVA</div>
              <div className="hexagon hexCalculado">
                <span>
                  {(() => {
                    const intuicao = skills.find(s => s.name === "Intuição");
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
                    onChange={(e) => update({ vida: clampBar({ ...vidaC, atual: e.target.value }) })}
                    inputMode="numeric"
                    autoComplete="off"
                  />
                  <span className="barSlash">/</span>
                  <input
                    name="vida_max"
                    value={vidaC.max}
                    onChange={(e) => update({ vida: clampBar({ ...vidaC, max: e.target.value }) })}
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
                    onChange={(e) => update({ mana: clampBar({ ...manaC, atual: e.target.value }) })}
                    inputMode="numeric"
                    autoComplete="off"
                  />
                  <span className="barSlash">/</span>
                  <input
                    name="mana_max"
                    value={manaC.max}
                    onChange={(e) => update({ mana: clampBar({ ...manaC, max: e.target.value }) })}
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

        {/* CENTRO */}
        <div className="center">
          <div className="skillsTitle">PERÍCIAS</div>
          <div className="skillsHeader">
            <div>Treino</div>
            <div>Perícia</div>
            <div>Atributo</div>
            <div>Bônus</div>
          </div>

          <div className="skillsList">
            {skills.map((s, i) => {
              const bonus = mod(attrs[s.attr]) + (s.trained ? Number(prof || 0) : 0);
              return (
                <div key={s.name} className="skill">
                  <input
                    name={`skill_trained_${i}`}
                    type="checkbox"
                    checked={s.trained}
                    onChange={(e) =>
                      update({
                        skills: skills.map((x, idx) => (idx === i ? { ...x, trained: e.target.checked } : x)),
                      })
                    }
                  />
                  <span>{s.name}</span>
                  <select
                    name={`skill_attr_${i}`}
                    value={s.attr}
                    onChange={(e) =>
                      update({
                        skills: skills.map((x, idx) => (idx === i ? { ...x, attr: e.target.value } : x)),
                      })
                    }
                  >
                    {ATTRS.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                  <b>{bonus >= 0 ? `+${bonus}` : bonus}</b>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIREITA */}
        <div className="right rightWide">
          <TabsHeader tab={tab} setTab={(t) => update({ tab: t })} />

          <div className="tabContent">
            {tab === "ataques" && (
              <TabAttacks
                ataques={ataques}
                openAtaque={openAtaque}
                setOpenAtaque={setOpenAtaque}
                abrirModalCriarAtaque={abrirModalCriarAtaque}
                abrirModalEditarAtaque={abrirModalEditarAtaque}
                removeAtaque={removeAtaque}
              />
            )}

            {tab === "poderes" && (
              <TabPowers
                poderes={poderes}
                openPoder={openPoder}
                setOpenPoder={setOpenPoder}
                abrirModalCriarPoder={abrirModalCriarPoder}
                abrirModalEditarPoder={abrirModalEditarPoder}
                removePoder={removePoder}
              />
            )}

            {tab === "magias" && (
              <TabSpells
                magias={magias}
                magiaStats={magiaStats}
                openMagia={openMagia}
                setOpenMagia={setOpenMagia}
                abrirModalCriarMagia={abrirModalCriarMagia}
                abrirModalEditarMagia={abrirModalEditarMagia}
                removeMagia={removeMagia}
                getElemVars={(key) => getVars(key)}
                elementByKey={elementByKey}
                update={update}
              />
            )}

            {tab === "misterios" && (
              <TabMysteries
                misterios={misterios || []}
                openMisterio={openMisterio}
                setOpenMisterio={setOpenMisterio}
                abrirModalCriarMisterio={abrirModalCriarMisterio}
                removeMisterio={removeMisterio}
                mysteryByKey={mysteryByKey}
              />
            )}

            {tab === "runas" && (
              <TabRunes
                runas={runas}
                prof={prof}
                nivel={nivel}
                update={update}
                openPulse={openPulse}
                setOpenPulse={setOpenPulse}
                openRuna={openRuna}
                setOpenRuna={setOpenRuna}
                abrirModalPulso={abrirModalPulso}
                removerPulso={removerPulso}
                abrirModalRuna={abrirModalRuna}
                editarRuna={editarRuna}
                removerRuna={removerRuna}
              />
            )}

            {tab === "itens" && (
              <TabItens
                moedas={moedas}
                inventario={inventario}
                attrs={attrs}
                update={update}
                abrirModalAdicionarItem={abrirModalAdicionarItem}
                abrirModalEditarItem={abrirModalEditarItem}
                openItem={openItem}
                setOpenItem={setOpenItem}
              />
            )}

            {tab === "descrição" && <TabDescription descricao={state.descricao} update={update} />}
          </div>
        </div>
      </div>

      {/* MODAIS */}
      <AttackModal
        open={showAtaqueModal}
        title={editAtaqueId ? "Editar Ataque" : "Novo Ataque"}
        novoAtaque={novoAtaque}
        setNovoAtaque={setNovoAtaque}
        onClose={fecharModalAtaque}
        onSave={salvarAtaque}
        ATTRS={ATTRS}
        CRITICOS={CRITICOS}
        MULTS={MULTS}
        TIPOS_DANO={TIPOS_DANO}
        ALCANCES_ATAQUE={ALCANCES_ATAQUE}
      />

      <PowerModal
        open={showPoderModal}
        title={editPoderId ? "Editar Poder" : "Adicionar Poder"}
        novoPoder={novoPoder}
        setNovoPoder={setNovoPoder}
        onClose={fecharModalPoder}
        onSave={salvarPoder}
      />

      <SpellModal
        open={showMagiaModal}
        title={editMagiaId ? "Editar Magia" : "Adicionar Magia"}
        novaMagia={novaMagia}
        setNovaMagia={setNovaMagia}
        onClose={fecharModalMagia}
        onSave={salvarMagia}
        TIPOS_MAGIA={TIPOS_MAGIA}
        ELEMENTOS={ELEMENTOS}
        AREAS={AREAS}
        CONJURACOES={CONJURACOES}
        DURACOES={DURACOES}
      />

      <MysteryModal
        open={showMisterioModal}
        title="Adicionar Mistério"
        novoMisterio={novoMisterio}
        setNovoMisterio={setNovoMisterio}
        onClose={fecharModalMisterio}
        onSave={salvarMisterio}
        MISTERIOS={MISTERIOS}
      />

      <PulseModal
        open={showPulseModal}
        currentKey={runas?.pulso?.key || ""}
        onClose={fecharModalPulso}
        onSave={salvarPulso}
      />

      <RuneModal
        key={editRuneId || "nova-runa"}
        open={showRuneModal}
        title={editRuneId ? "Editar Runa / Runessência" : "Adicionar Runa / Runessência"}
        onClose={fecharModalRuna}
        onSave={salvarRuna}
        initial={initialRune}
      />

      <ItemModal
        open={showItemModal}
        title={editItemId ? "Editar Item" : "Adicionar Item"}
        item={itemToEdit}
        onClose={fecharModalItem}
        onSave={salvarItem}
      />
    </div>
  );
}