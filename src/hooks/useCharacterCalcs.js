// src/hooks/useCharacterCalcs.js
import { useMemo, useEffect } from "react";
import { PROF } from "../data/sheetConstants";
import { clampBar } from "../utils/sheetUtils";

function profByLevel(nivel) {
  const lv = Math.max(1, Number(nivel || 1));
  if (lv >= 17) return 6;
  if (lv >= 13) return 5;
  if (lv >= 9) return 4;
  if (lv >= 5) return 3;
  return 2;
}

export function useCharacterCalcs({ state, update, loaded }) {
  const info = state.info || {};
  const nivel = Number(info?.nivel || 1);
  
  const profMode = state.profMode || "auto";
  const profManual = Number.isFinite(Number(state.prof)) ? Number(state.prof) : PROF;
  const profAuto = profByLevel(nivel);
  const prof = profMode === "manual" ? profManual : profAuto;

  // Atualiza prof automaticamente quando nível muda
  useEffect(() => {
    if (!loaded) return;
    if (profMode !== "auto") return;
    update({ prof: profAuto });
  }, [nivel, profMode, loaded]);

  const vida = state.vida || { atual: 0, max: 0 };
  const mana = state.mana || { atual: 0, max: 0 };
  
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

    const payload = which === "vida"
      ? { vida: clampBar({ ...k, atual: next }) }
      : { mana: clampBar({ ...k, atual: next }) };

    update(payload);
  };

  return {
    info,
    nivel,
    prof,
    profMode,
    vidaC,
    manaC,
    vidaPct,
    manaPct,
    stepBar,
  };
}