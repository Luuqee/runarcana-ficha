// src/hooks/useCharacterModals.js
import { useState, useMemo, useEffect } from "react";
import { 
  defaultNovoMisterio, 
  MISTERIOS,
  defaultNovoAtaque,
  defaultNovoPoder,
  defaultNovaMagia
} from "../data/sheetConstants";

// Hook para Mistérios
export default function useMysteryModals({ misterios, update }) {
  const [openMisterio, setOpenMisterio] = useState(null);
  const [showMisterioModal, setShowMisterioModal] = useState(false);
  const [novoMisterio, setNovoMisterio] = useState(defaultNovoMisterio);

  const mysteryByKey = useMemo(
    () => new Map((MISTERIOS || []).map((m) => [m.key, m])),
    []
  );

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

  const removeMisterio = (id) =>
    update({ misterios: (misterios || []).filter((m) => m.id !== id) });

  return {
    openMisterio,
    setOpenMisterio,
    showMisterioModal,
    novoMisterio,
    setNovoMisterio,
    mysteryByKey,
    abrirModalCriarMisterio,
    fecharModalMisterio,
    salvarMisterio,
    removeMisterio,
  };
}

// Hook para Itens
export function useItemModals({ inventario, update }) {
  const [showItemModal, setShowItemModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [openItem, setOpenItem] = useState(null);

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
      update({
        inventario: inventario.map((i) =>
          i.id === editItemId ? { ...item, id: editItemId } : i
        ),
      });
    } else {
      update({
        inventario: [...inventario, { id: crypto.randomUUID(), ...item }],
      });
    }
    fecharModalItem();
  };

  const itemToEdit = editItemId ? inventario.find((i) => i.id === editItemId) : null;

  return {
    showItemModal,
    editItemId,
    openItem,
    setOpenItem,
    itemToEdit,
    abrirModalAdicionarItem,
    abrirModalEditarItem,
    fecharModalItem,
    salvarItem,
  };
}

// Hook para Escape key (fecha qualquer modal aberto)
export function useEscapeKey(modals) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      modals.forEach((closeModal) => closeModal());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modals]);
}