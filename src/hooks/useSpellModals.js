// src/hooks/useSpellModals.js
import { useState, useMemo } from "react";
import { defaultNovaMagia } from "../data/sheetConstants";

export function useSpellModals({ magias, update }) {
  const [openMagia, setOpenMagia] = useState(null);
  const [showMagiaModal, setShowMagiaModal] = useState(false);
  const [editMagiaId, setEditMagiaId] = useState(null);
  const [novaMagia, setNovaMagia] = useState(defaultNovaMagia);

  const magiasById = useMemo(
    () => new Map((magias || []).map((m) => [m.id, m])),
    [magias]
  );

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
        magias: magias.map((m) =>
          m.id === editMagiaId ? { ...m, ...novaMagia, id: editMagiaId } : m
        ),
      });
    } else {
      update({ magias: [...magias, { id: crypto.randomUUID(), ...novaMagia }] });
    }
    fecharModalMagia();
  };

  const removeMagia = (id) => update({ magias: magias.filter((m) => m.id !== id) });

  return {
    openMagia,
    setOpenMagia,
    showMagiaModal,
    editMagiaId,
    novaMagia,
    setNovaMagia,
    abrirModalCriarMagia,
    abrirModalEditarMagia,
    fecharModalMagia,
    salvarMagia,
    removeMagia,
  };
}