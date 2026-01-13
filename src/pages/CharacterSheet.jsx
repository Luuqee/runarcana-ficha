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

import AttackModal from "../components/modals/AttackModal.jsx";
import PowerModal from "../components/modals/PowerModal.jsx";
import SpellModal from "../components/modals/SpellModal.jsx";
import MysteryModal from "../components/modals/MysteryModal.jsx";

export default function CharacterSheet() {
  const [state, setState] = useState(() => loadSheet(STORAGE_KEY, defaultState));
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => setLoaded(true), []);
  useEffect(() => {
    if (!loaded) return;
    saveSheet(STORAGE_KEY, state);
  }, [state, loaded]);

  const {
    info,
    attrs,
    skills,
    vida,
    mana,
    ataques,
    poderes,
    magias,
    magiaStats,
    misterios,
    tab,
    prof, // ✅ NOVO (bônus de proficiência editável no state)
  } = state;

  const update = (p) => setState((s) => ({ ...s, ...p }));

  // --------- VIDA / MANA (clamp + %)
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

  // --------- MAPS
  const ataquesById = useMemo(() => new Map((ataques || []).map((a) => [a.id, a])), [ataques]);
  const poderesById = useMemo(() => new Map((poderes || []).map((p) => [p.id, p])), [poderes]);
  const magiasById = useMemo(() => new Map((magias || []).map((m) => [m.id, m])), [magias]);

  const elementByKey = useMemo(() => buildElementMap(ELEMENTOS), []);
  const getVars = (key) => getElemVars(elementByKey, key);

  const mysteryByKey = useMemo(() => new Map((MISTERIOS || []).map((m) => [m.key, m])), []);

  // --------- ATAQUES
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

  // --------- PODERES
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

  // --------- MAGIAS
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

  // --------- MISTÉRIOS
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

  // ESC fecha
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (showAtaqueModal) fecharModalAtaque();
      if (showPoderModal) fecharModalPoder();
      if (showMagiaModal) fecharModalMagia();
      if (showMisterioModal) fecharModalMisterio();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAtaqueModal, showPoderModal, showMagiaModal, showMisterioModal]);

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
              onChange={(e) => update({ info: { ...info, [k]: e.target.value } })}
              autoComplete="off"
            />
          </div>
        ))}
      </div>

      <div className="layout3">
        {/* ESQUERDA */}
        <div className="left">
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

          {/* ✅ BÔNUS DE PROFICIÊNCIA (aba abaixo dos atributos) */}
          <div className="profBlock">
            <div className="profTitle">BÔNUS DE PROFICIÊNCIA</div>

            <div className="profHex">
              <input
                name="prof"
                type="number"
                value={Number.isFinite(prof) ? prof : PROF}
                onChange={(e) => update({ prof: Number(e.target.value || 0) })}
                inputMode="numeric"
                autoComplete="off"
              />
            </div>
          </div>

          {/* VIDA (✅ AGORA BATE COM TEU CSS) */}
          <div className="barBlock">
            <h4 className="barTitle">VIDA</h4>

            <div className="barOrdem vida" style={{ "--pct": `${vidaPct}%` }}>
              <div className="barCenter">
                <div className="barPad">
                  <button className="barBtn" type="button" onClick={() => stepBar("vida", -1, true)}>
                    «
                  </button>
                  <button className="barBtn" type="button" onClick={() => stepBar("vida", -1, false)}>
                    ‹
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
                    ›
                  </button>
                  <button className="barBtn" type="button" onClick={() => stepBar("vida", +1, true)}>
                    »
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MANA (✅ AGORA BATE COM TEU CSS) */}
          <div className="barBlock">
            <h4 className="barTitle">MANA</h4>

            <div className="barOrdem mana" style={{ "--pct": `${manaPct}%` }}>
              <div className="barCenter">
                <div className="barPad">
                  <button className="barBtn" type="button" onClick={() => stepBar("mana", -1, true)}>
                    «
                  </button>
                  <button className="barBtn" type="button" onClick={() => stepBar("mana", -1, false)}>
                    ‹
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
                    ›
                  </button>
                  <button className="barBtn" type="button" onClick={() => stepBar("mana", +1, true)}>
                    »
                  </button>
                </div>
              </div>
            </div>
          </div>
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
              // ✅ agora usa prof do state (editável), e só soma se treinado
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

            {tab === "descrição" && <TabDescription />}
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
    </div>
  );
}
