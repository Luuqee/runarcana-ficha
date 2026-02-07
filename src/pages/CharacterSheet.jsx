// src/pages/CharacterSheet.jsx - VERSÃO REFATORADA
import { useMemo } from "react";
import "../styles/sheet.css";
import "../styles/ItemModal.css";

import {
  defaultState,
  ATTRS,
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

import { buildElementMap, getElemVars } from "../utils/sheetUtils.js";

// Hooks customizados
import { useCharacterState } from "../hooks/useCharacterState";
import { useCharacterCalcs } from "../hooks/useCharacterCalcs";
import { useAttackModals } from "../hooks/useAttackModals";
import usePowerModals from "../hooks/usePowerModals";
import { useSpellModals } from "../hooks/useSpellModals";
import useMysteryModals, { useItemModals, useEscapeKey } from "../hooks/useCharacterModals";
import { useRuneModals } from "../hooks/useRuneModals";

// Componentes de abas
import TabsHeader from "../components/sheets/TabsHeader.jsx";
import TabAttacks from "../components/sheets/TabAttacks.jsx";
import TabPowers from "../components/sheets/TabPowers.jsx";
import TabSpells from "../components/sheets/TabSpells.jsx";
import TabMysteries from "../components/sheets/TabMysteries.jsx";
import TabDescription from "../components/sheets/TabDescription.jsx";
import TabRunes from "../components/sheets/TabRunes.jsx";
import TabItens from "../components/sheets/TabItens.jsx";

// Componentes de modais
import AttackModal from "../components/modals/AttackModal.jsx";
import PowerModal from "../components/modals/PowerModal.jsx";
import SpellModal from "../components/modals/SpellModal.jsx";
import MysteryModal from "../components/modals/MysteryModal.jsx";
import ItemModal from "../components/modals/ItemModal.jsx";
import PulseModal from "../components/modals/PulseModal.jsx";
import RuneModal from "../components/modals/RuneModal.jsx";

// Componentes dos painéis
import LeftPanel from "../components/sheets/LeftPanel.jsx";
import CenterPanel from "../components/sheets/CenterPanel.jsx";

export default function CharacterSheet({ initialState = null, onUpdate = null, personagemId = null }) {
  // Estado e salvamento
  const { state, update, loaded } = useCharacterState({ initialState, onUpdate, personagemId });

  // Cálculos derivados
  const calcs = useCharacterCalcs({ state, update, loaded });
  const { info, nivel, prof, profMode, vidaC, manaC, vidaPct, manaPct, stepBar } = calcs;

  // Dados da ficha
  const attrs = state.attrs || defaultState.attrs;
  const skills = state.skills || defaultState.skills;
  const ataques = state.ataques || [];
  const poderes = state.poderes || [];
  const magias = state.magias || [];
  const magiaStats = state.magiaStats || defaultState.magiaStats;
  const misterios = state.misterios || [];
  const runas = state.runas || defaultState.runas;
  const moedas = state.moedas || defaultState.moedas;
  const inventario = state.inventario || defaultState.inventario;
  const saves = state.saves || defaultState.saves;
  const deathSaves = state.deathSaves || defaultState.deathSaves;
  const exhaustion = state.exhaustion || defaultState.exhaustion;
  const ca = state.ca ?? "";
  const escudo = state.escudo ?? "";
  const tab = state.tab || "magias";

  // Modais de ataques, poderes e magias
  const attackModals = useAttackModals({ ataques, update });
  const powerModals = usePowerModals({ poderes, update });
  const spellModals = useSpellModals({ magias, update });
  const mysteryModals = useMysteryModals({ misterios, update });
  const itemModals = useItemModals({ inventario, update });
  const runeModals = useRuneModals({ runas, update });

  // Elementos e mapas
  const elementByKey = useMemo(() => buildElementMap(ELEMENTOS), []);
  const getVars = (key) => getElemVars(elementByKey, key);

  // Escape key fecha todos os modais
  useEscapeKey([
    attackModals.fecharModalAtaque,
    powerModals.fecharModalPoder,
    spellModals.fecharModalMagia,
    mysteryModals.fecharModalMisterio,
    itemModals.fecharModalItem,
    runeModals.fecharModalPulso,
    runeModals.fecharModalRuna,
  ]);

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
        {/* PAINEL ESQUERDO */}
        <LeftPanel
          attrs={attrs}
          prof={prof}
          profMode={profMode}
          ca={ca}
          escudo={escudo}
          deslocamento={state.deslocamento}
          iniciativa={state.iniciativa}
          skills={skills}
          vidaC={vidaC}
          manaC={manaC}
          vidaPct={vidaPct}
          manaPct={manaPct}
          stepBar={stepBar}
          saves={saves}
          deathSaves={deathSaves}
          exhaustion={exhaustion}
          update={update}
        />

        {/* PAINEL CENTRAL */}
        <CenterPanel skills={skills} attrs={attrs} prof={prof} update={update} />

        {/* PAINEL DIREITO */}
        <div className="right rightWide">
          <TabsHeader tab={tab} setTab={(t) => update({ tab: t })} />

          <div className="tabContent">
            {tab === "ataques" && (
              <TabAttacks
                ataques={ataques}
                openAtaque={attackModals.openAtaque}
                setOpenAtaque={attackModals.setOpenAtaque}
                abrirModalCriarAtaque={attackModals.abrirModalCriarAtaque}
                abrirModalEditarAtaque={attackModals.abrirModalEditarAtaque}
                removeAtaque={attackModals.removeAtaque}
              />
            )}

            {tab === "poderes" && (
              <TabPowers
                poderes={poderes}
                openPoder={powerModals.openPoder}
                setOpenPoder={powerModals.setOpenPoder}
                abrirModalCriarPoder={powerModals.abrirModalCriarPoder}
                abrirModalEditarPoder={powerModals.abrirModalEditarPoder}
                removePoder={powerModals.removePoder}
              />
            )}

            {tab === "magias" && (
              <TabSpells
                magias={magias}
                magiaStats={magiaStats}
                openMagia={spellModals.openMagia}
                setOpenMagia={spellModals.setOpenMagia}
                abrirModalCriarMagia={spellModals.abrirModalCriarMagia}
                abrirModalEditarMagia={spellModals.abrirModalEditarMagia}
                removeMagia={spellModals.removeMagia}
                getElemVars={getVars}
                elementByKey={elementByKey}
                update={update}
              />
            )}

            {tab === "misterios" && (
              <TabMysteries
                misterios={misterios || []}
                openMisterio={mysteryModals.openMisterio}
                setOpenMisterio={mysteryModals.setOpenMisterio}
                abrirModalCriarMisterio={mysteryModals.abrirModalCriarMisterio}
                removeMisterio={mysteryModals.removeMisterio}
                mysteryByKey={mysteryModals.mysteryByKey}
              />
            )}

            {tab === "runas" && (
              <TabRunes
                runas={runas}
                prof={prof}
                nivel={nivel}
                update={update}
                openPulse={runeModals.openPulse}
                setOpenPulse={runeModals.setOpenPulse}
                openRuna={runeModals.openRuna}
                setOpenRuna={runeModals.setOpenRuna}
                abrirModalPulso={runeModals.abrirModalPulso}
                removerPulso={runeModals.removerPulso}
                abrirModalRuna={runeModals.abrirModalRuna}
                editarRuna={runeModals.editarRuna}
                removerRuna={runeModals.removerRuna}
              />
            )}

            {tab === "itens" && (
              <TabItens
                moedas={moedas}
                inventario={inventario}
                attrs={attrs}
                update={update}
                abrirModalAdicionarItem={itemModals.abrirModalAdicionarItem}
                abrirModalEditarItem={itemModals.abrirModalEditarItem}
                openItem={itemModals.openItem}
                setOpenItem={itemModals.setOpenItem}
              />
            )}

            {tab === "descrição" && <TabDescription descricao={state.descricao} update={update} />}
          </div>
        </div>
      </div>

      {/* MODAIS */}
      <AttackModal
        open={attackModals.showAtaqueModal}
        title={attackModals.editAtaqueId ? "Editar Ataque" : "Novo Ataque"}
        novoAtaque={attackModals.novoAtaque}
        setNovoAtaque={attackModals.setNovoAtaque}
        onClose={attackModals.fecharModalAtaque}
        onSave={attackModals.salvarAtaque}
        ATTRS={ATTRS}
        CRITICOS={CRITICOS}
        MULTS={MULTS}
        TIPOS_DANO={TIPOS_DANO}
        ALCANCES_ATAQUE={ALCANCES_ATAQUE}
      />

      <PowerModal
        open={powerModals.showPoderModal}
        title={powerModals.editPoderId ? "Editar Poder" : "Adicionar Poder"}
        novoPoder={powerModals.novoPoder}
        setNovoPoder={powerModals.setNovoPoder}
        onClose={powerModals.fecharModalPoder}
        onSave={powerModals.salvarPoder}
      />

      <SpellModal
        open={spellModals.showMagiaModal}
        title={spellModals.editMagiaId ? "Editar Magia" : "Adicionar Magia"}
        novaMagia={spellModals.novaMagia}
        setNovaMagia={spellModals.setNovaMagia}
        onClose={spellModals.fecharModalMagia}
        onSave={spellModals.salvarMagia}
        TIPOS_MAGIA={TIPOS_MAGIA}
        ELEMENTOS={ELEMENTOS}
        AREAS={AREAS}
        CONJURACOES={CONJURACOES}
        DURACOES={DURACOES}
      />

      <MysteryModal
        open={mysteryModals.showMisterioModal}
        title="Adicionar Mistério"
        novoMisterio={mysteryModals.novoMisterio}
        setNovoMisterio={mysteryModals.setNovoMisterio}
        onClose={mysteryModals.fecharModalMisterio}
        onSave={mysteryModals.salvarMisterio}
        MISTERIOS={MISTERIOS}
      />

      <ItemModal
        open={itemModals.showItemModal}
        title={itemModals.editItemId ? "Editar Item" : "Adicionar Item"}
        item={itemModals.itemToEdit}
        onClose={itemModals.fecharModalItem}
        onSave={itemModals.salvarItem}
      />

      <PulseModal
        open={runeModals.showPulseModal}
        onClose={runeModals.fecharModalPulso}
        onSave={runeModals.salvarPulso}
        currentKey={runas?.pulso?.key || ""}
      />

      <RuneModal
        open={runeModals.showRuneModal}
        title={runeModals.editRunaId ? "Editar Runa" : "Adicionar Runa"}
        onClose={runeModals.fecharModalRuna}
        onSave={runeModals.salvarRuna}
        initial={runeModals.runaToEdit}
      />
    </div>
  );
}