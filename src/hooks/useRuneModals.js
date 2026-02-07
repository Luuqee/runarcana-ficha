// src/hooks/useRuneModals.js
import { useState } from "react";

export function useRuneModals({ runas, update }) {
  const [openPulse, setOpenPulse] = useState(null);
  const [openRuna, setOpenRuna] = useState(null);
  const [showPulseModal, setShowPulseModal] = useState(false);
  const [showRuneModal, setShowRuneModal] = useState(false);
  const [editRunaId, setEditRunaId] = useState(null);

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

  // ===== PULSO =====
  const abrirModalPulso = () => setShowPulseModal(true);
  const fecharModalPulso = () => setShowPulseModal(false);

  const salvarPulso = (key) => {
    update({
      runas: {
        ...runasSafe,
        pulso: { key },
        pulsoRoll: "",
      },
    });
    fecharModalPulso();
  };

  const removerPulso = () => {
    update({
      runas: {
        ...runasSafe,
        pulso: null,
        pulsoRoll: "",
      },
    });
    setOpenPulse(null);
  };

  // ===== RUNAS / RUNESSÊNCIAS =====
  const abrirModalRuna = (id) => {
    setEditRunaId(id);
    setShowRuneModal(true);
  };

  const fecharModalRuna = () => {
    setShowRuneModal(false);
    setEditRunaId(null);
  };

  const salvarRuna = (form) => {
    const lista = runasSafe.lista || [];

    if (editRunaId) {
      // Editar existente
      update({
        runas: {
          ...runasSafe,
          lista: lista.map((r) =>
            r.id === editRunaId ? { ...form, id: editRunaId } : r
          ),
        },
      });
    } else {
      // Adicionar nova
      update({
        runas: {
          ...runasSafe,
          lista: [...lista, { ...form, id: crypto.randomUUID(), m1Escolha: "", m2Escolha: "" }],
        },
      });
    }
    fecharModalRuna();
  };

  const editarRuna = (id, patch) => {
    const lista = runasSafe.lista || [];
    update({
      runas: {
        ...runasSafe,
        lista: lista.map((r) => (r.id === id ? { ...r, ...patch } : r)),
      },
    });
  };

  const removerRuna = (id) => {
    const lista = runasSafe.lista || [];
    update({
      runas: {
        ...runasSafe,
        lista: lista.filter((r) => r.id !== id),
      },
    });
    if (openRuna === id) setOpenRuna(null);
  };

  const runaToEdit = editRunaId
    ? (runasSafe.lista || []).find((r) => r.id === editRunaId) || null
    : null;

  return {
    openPulse,
    setOpenPulse,
    openRuna,
    setOpenRuna,
    showPulseModal,
    showRuneModal,
    editRunaId,
    runaToEdit,
    abrirModalPulso,
    fecharModalPulso,
    salvarPulso,
    removerPulso,
    abrirModalRuna,
    fecharModalRuna,
    salvarRuna,
    editarRuna,
    removerRuna,
  };
}