// src/hooks/usePowerModals.js
import { useState, useMemo } from "react";
import { defaultNovoPoder } from "../data/sheetConstants";

export default function usePowerModals({ poderes, update }) {
  const [openPoder, setOpenPoder] = useState(null);
  const [showPoderModal, setShowPoderModal] = useState(false);
  const [editPoderId, setEditPoderId] = useState(null);
  const [novoPoder, setNovoPoder] = useState(defaultNovoPoder);

  const poderesById = useMemo(
    () => new Map((poderes || []).map((p) => [p.id, p])),
    [poderes]
  );

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
        poderes: poderes.map((p) =>
          p.id === editPoderId ? { ...p, ...novoPoder, id: editPoderId } : p
        ),
      });
    } else {
      update({ poderes: [...poderes, { id: crypto.randomUUID(), ...novoPoder }] });
    }
    fecharModalPoder();
  };

  const removePoder = (id) => update({ poderes: poderes.filter((p) => p.id !== id) });

  return {
    openPoder,
    setOpenPoder,
    showPoderModal,
    editPoderId,
    novoPoder,
    setNovoPoder,
    abrirModalCriarPoder,
    abrirModalEditarPoder,
    fecharModalPoder,
    salvarPoder,
    removePoder,
  };
}