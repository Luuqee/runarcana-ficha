// src/hooks/useAttackModals.js
import { useState, useMemo } from "react";
import { defaultNovoAtaque } from "../data/sheetConstants";

export function useAttackModals({ ataques, update }) {
  const [openAtaque, setOpenAtaque] = useState(null);
  const [showAtaqueModal, setShowAtaqueModal] = useState(false);
  const [editAtaqueId, setEditAtaqueId] = useState(null);
  const [novoAtaque, setNovoAtaque] = useState(defaultNovoAtaque);

  const ataquesById = useMemo(
    () => new Map((ataques || []).map((a) => [a.id, a])),
    [ataques]
  );

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
        ataques: ataques.map((a) =>
          a.id === editAtaqueId ? { ...a, ...novoAtaque, id: editAtaqueId } : a
        ),
      });
    } else {
      update({ ataques: [...ataques, { id: crypto.randomUUID(), ...novoAtaque }] });
    }
    fecharModalAtaque();
  };

  const removeAtaque = (id) => update({ ataques: ataques.filter((a) => a.id !== id) });

  return {
    openAtaque,
    setOpenAtaque,
    showAtaqueModal,
    editAtaqueId,
    novoAtaque,
    setNovoAtaque,
    abrirModalCriarAtaque,
    abrirModalEditarAtaque,
    fecharModalAtaque,
    salvarAtaque,
    removeAtaque,
  };
}