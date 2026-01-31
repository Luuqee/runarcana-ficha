// src/components/modals/ItemModal.jsx
import { useState, useMemo, useEffect } from "react";
import {
  ARMADURAS,
  ESCUDOS,
  ARMAS_SIMPLES_CORPO,
  ARMAS_SIMPLES_DISTANCIA,
  ARMAS_MARCIAIS_CORPO,
  ARMAS_MARCIAIS_DISTANCIA,
  ARMAS_IMPROPRIAS_CORPO,
  ARMAS_IMPROPRIAS_DISTANCIA,
  ARMAS_CORRENTES,
  ARMAS_FOGO,
  MUNICAO_ARMAS_FOGO,
  EQUIPAMENTOS,
  MONTARIAS,
  VEICULOS_AQUATICOS,
  ARREIOS_VEICULOS,
  COMIDA_BEBIDA_HOSPEDAGEM,
} from "../../data/itemsConstants.js";

export default function ItemModal({ open, title, item, onClose, onSave }) {
  const [modo, setModo] = useState(item?.id ? "editar" : "lista");
  const [categoria, setCategoria] = useState("armaduras");
  const [busca, setBusca] = useState("");
  
  const [formItem, setFormItem] = useState({
    nome: "",
    tipo: "equipamento", // armadura, arma, equipamento, montaria
    peso: 0,
    valor: 0,
    quantidade: 1,
    descricao: "",
    // Campos específicos de armadura
    ca: "",
    rd: "",
    forca: "",
    furtividade: "",
    excecao: "",
    // Campos específicos de arma
    dano: "",
    critico: "",
    maestria: "",
    propriedades: "",
    alcance: "",
    // Campos específicos de montaria
    deslocamento: "",
    capacidadeCarga: "",
  });

  useEffect(() => {
    if (item) {
      setFormItem({ ...formItem, ...item });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const itensPorCategoria = useMemo(() => {
    return {
      armaduras: [...ARMADURAS, ...ESCUDOS],
      armasSimples: [...ARMAS_SIMPLES_CORPO, ...ARMAS_SIMPLES_DISTANCIA],
      armasMarciais: [...ARMAS_MARCIAIS_CORPO, ...ARMAS_MARCIAIS_DISTANCIA],
      armasImproprias: [...ARMAS_IMPROPRIAS_CORPO, ...ARMAS_IMPROPRIAS_DISTANCIA, ...ARMAS_CORRENTES],
      armasFogo: [...ARMAS_FOGO, ...MUNICAO_ARMAS_FOGO],
      equipamentos: EQUIPAMENTOS,
      montarias: MONTARIAS,
      veiculos: [...VEICULOS_AQUATICOS, ...ARREIOS_VEICULOS],
      comida: COMIDA_BEBIDA_HOSPEDAGEM,
    };
  }, []);

  const itensFiltrados = useMemo(() => {
    const lista = itensPorCategoria[categoria] || [];
    if (!busca.trim()) return lista;
    
    const termo = busca.toLowerCase();
    return lista.filter((item) => 
      item.nome?.toLowerCase().includes(termo)
    );
  }, [categoria, busca, itensPorCategoria]);

  const handleSelecionarItem = (itemSelecionado) => {
    // Determina o tipo baseado na categoria
    let tipo = "equipamento";
    
    if (categoria === "armaduras") {
      // Se tem CA, é armadura ou escudo
      if (itemSelecionado.nome?.toLowerCase().includes("escudo") || 
          itemSelecionado.nome?.toLowerCase().includes("broquel")) {
        tipo = "escudo";
      } else {
        tipo = "armadura";
      }
    } else if (categoria.includes("armas") || categoria === "armasFogo") {
      tipo = "arma";
    } else if (categoria === "montarias") {
      tipo = "montaria";
    }

    setFormItem({
      nome: itemSelecionado.nome,
      tipo: tipo,
      peso: itemSelecionado.peso || 0,
      valor: itemSelecionado.preco || 0,
      quantidade: 1,
      descricao: "",
      // Armadura
      ca: itemSelecionado.ca || "",
      rd: itemSelecionado.rd || "",
      forca: itemSelecionado.forca || "",
      furtividade: itemSelecionado.furtividade || "",
      excecao: itemSelecionado.excecao || "",
      // Arma
      dano: itemSelecionado.dano || "",
      critico: itemSelecionado.critico || "",
      maestria: itemSelecionado.maestria || "",
      propriedades: itemSelecionado.propriedades || "",
      alcance: itemSelecionado.alcance || "",
      // Montaria
      deslocamento: itemSelecionado.deslocamento || "",
      capacidadeCarga: itemSelecionado.capacidadeCarga || "",
    });
    setModo("editar");
  };

  const handleSalvar = () => {
    if (!formItem.nome?.trim()) return;
    
    onSave({
      ...formItem,
      peso: Number(formItem.peso) || 0,
      valor: Number(formItem.valor) || 0,
      quantidade: Number(formItem.quantidade) || 1,
    });
  };

  const handleFechar = () => {
    setModo(item?.id ? "editar" : "lista");
    setCategoria("armaduras");
    setBusca("");
    setFormItem({
      nome: "",
      tipo: "equipamento",
      peso: 0,
      valor: 0,
      quantidade: 1,
      descricao: "",
      ca: "", rd: "", forca: "", furtividade: "", excecao: "",
      dano: "", critico: "", maestria: "", propriedades: "", alcance: "",
      deslocamento: "", capacidadeCarga: "",
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="itemModalOverlay" onClick={handleFechar}>
      <div className="itemModalBox" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3>{title}</h3>
          <button className="modalClose" onClick={handleFechar}>✕</button>
        </div>

        <div className="modalBody">
          {!item?.id && modo === "lista" && (
            <>
              <div className="itemModoSelector">
                <button className="btnModo active" onClick={() => setModo("lista")}>
                  Lista de Itens
                </button>
                <button
                  className="btnModo"
                  onClick={() => {
                    setModo("custom");
                    setFormItem({
                      nome: "", tipo: "equipamento", peso: 0, valor: 0, quantidade: 1, descricao: "",
                      ca: "", rd: "", forca: "", furtividade: "", excecao: "",
                      dano: "", critico: "", maestria: "", propriedades: "", alcance: "",
                      deslocamento: "", capacidadeCarga: "",
                    });
                  }}
                >
                  Criar Item Custom
                </button>
              </div>

              <div className="itemCategorias">
                <button className={categoria === "armaduras" ? "active" : ""} onClick={() => setCategoria("armaduras")}>
                  Armaduras/Escudos
                </button>
                <button className={categoria === "armasSimples" ? "active" : ""} onClick={() => setCategoria("armasSimples")}>
                  Armas Simples
                </button>
                <button className={categoria === "armasMarciais" ? "active" : ""} onClick={() => setCategoria("armasMarciais")}>
                  Armas Marciais
                </button>
                <button className={categoria === "armasImproprias" ? "active" : ""} onClick={() => setCategoria("armasImproprias")}>
                  Armas Impróprias
                </button>
                <button className={categoria === "armasFogo" ? "active" : ""} onClick={() => setCategoria("armasFogo")}>
                  Armas de Fogo
                </button>
                <button className={categoria === "equipamentos" ? "active" : ""} onClick={() => setCategoria("equipamentos")}>
                  Equipamentos
                </button>
                <button className={categoria === "montarias" ? "active" : ""} onClick={() => setCategoria("montarias")}>
                  Montarias
                </button>
                <button className={categoria === "veiculos" ? "active" : ""} onClick={() => setCategoria("veiculos")}>
                  Veículos
                </button>
                <button className={categoria === "comida" ? "active" : ""} onClick={() => setCategoria("comida")}>
                  Comida/Hospedagem
                </button>
              </div>

              <div className="itemBusca">
                <input
                  type="text"
                  placeholder="Buscar item..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>

              <div className="itemLista">
                {itensFiltrados.length === 0 ? (
                  <div className="itemListaVazia">Nenhum item encontrado</div>
                ) : (
                  itensFiltrados.map((item, idx) => (
                    <div key={idx} className="itemListaItem" onClick={() => handleSelecionarItem(item)}>
                      <div className="itemListaNome">{item.nome}</div>
                      <div className="itemListaInfo">
                        {item.peso !== undefined && <span>{item.peso} kg</span>}
                        {item.preco !== undefined && <span>{item.preco} PO</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {(modo === "custom" || modo === "editar") && (
            <div className="itemForm">
              <div className="formRow">
                <label>
                  Nome do Item:
                  <input
                    type="text"
                    value={formItem.nome}
                    onChange={(e) => setFormItem({ ...formItem, nome: e.target.value })}
                    placeholder="Ex: Espada Longa"
                  />
                </label>
              </div>

              <div className="formRow">
                <label>
                  Tipo:
                  <select value={formItem.tipo} onChange={(e) => setFormItem({ ...formItem, tipo: e.target.value })}>
                    <option value="equipamento">Equipamento</option>
                    <option value="arma">Arma</option>
                    <option value="armadura">Armadura</option>
                    <option value="escudo">Escudo</option>
                    <option value="montaria">Montaria</option>
                  </select>
                </label>
              </div>

              <div className="formRow formRow2">
                <label>
                  Peso (kg):
                  <input
                    type="number"
                    value={formItem.peso}
                    onChange={(e) => setFormItem({ ...formItem, peso: e.target.value })}
                    min="0"
                    step="0.1"
                  />
                </label>

                <label>
                  Valor (PO):
                  <input
                    type="number"
                    value={formItem.valor}
                    onChange={(e) => setFormItem({ ...formItem, valor: e.target.value })}
                    min="0"
                  />
                </label>
              </div>

              <div className="formRow">
                <label>
                  Quantidade:
                  <input
                    type="number"
                    value={formItem.quantidade}
                    onChange={(e) => setFormItem({ ...formItem, quantidade: e.target.value })}
                    min="1"
                  />
                </label>
              </div>

              {/* Campos específicos de ARMA */}
              {(formItem.tipo === "arma") && (
                <>
                  <div className="formRow formRow2">
                    <label>
                      Dano:
                      <input
                        type="text"
                        value={formItem.dano}
                        onChange={(e) => setFormItem({ ...formItem, dano: e.target.value })}
                        placeholder="Ex: 1d8"
                      />
                    </label>
                    <label>
                      Crítico:
                      <input
                        type="text"
                        value={formItem.critico}
                        onChange={(e) => setFormItem({ ...formItem, critico: e.target.value })}
                        placeholder="Ex: 19-20"
                      />
                    </label>
                  </div>
                  <div className="formRow">
                    <label>
                      Maestria:
                      <input
                        type="text"
                        value={formItem.maestria}
                        onChange={(e) => setFormItem({ ...formItem, maestria: e.target.value })}
                        placeholder="Ex: Ágil"
                      />
                    </label>
                  </div>
                  <div className="formRow">
                    <label>
                      Propriedades:
                      <input
                        type="text"
                        value={formItem.propriedades}
                        onChange={(e) => setFormItem({ ...formItem, propriedades: e.target.value })}
                        placeholder="Ex: Leve, Versátil"
                      />
                    </label>
                  </div>
                </>
              )}

              {/* Campos específicos de ARMADURA/ESCUDO */}
              {(formItem.tipo === "armadura" || formItem.tipo === "escudo") && (
                <>
                  <div className="formRow formRow2">
                    <label>
                      CA:
                      <input
                        type="text"
                        value={formItem.ca}
                        onChange={(e) => setFormItem({ ...formItem, ca: e.target.value })}
                        placeholder="Ex: 16"
                      />
                    </label>
                    <label>
                      RD:
                      <input
                        type="text"
                        value={formItem.rd}
                        onChange={(e) => setFormItem({ ...formItem, rd: e.target.value })}
                        placeholder="Ex: 2"
                      />
                    </label>
                  </div>
                  <div className="formRow formRow2">
                    <label>
                      Força Mínima:
                      <input
                        type="text"
                        value={formItem.forca}
                        onChange={(e) => setFormItem({ ...formItem, forca: e.target.value })}
                        placeholder="Ex: 13"
                      />
                    </label>
                    <label>
                      Furtividade:
                      <input
                        type="text"
                        value={formItem.furtividade}
                        onChange={(e) => setFormItem({ ...formItem, furtividade: e.target.value })}
                        placeholder="Desvantagem?"
                      />
                    </label>
                  </div>
                </>
              )}

              {/* Campos específicos de MONTARIA */}
              {formItem.tipo === "montaria" && (
                <>
                  <div className="formRow formRow2">
                    <label>
                      Deslocamento:
                      <input
                        type="text"
                        value={formItem.deslocamento}
                        onChange={(e) => setFormItem({ ...formItem, deslocamento: e.target.value })}
                        placeholder="Ex: 40 pés"
                      />
                    </label>
                    <label>
                      Capacidade de Carga:
                      <input
                        type="text"
                        value={formItem.capacidadeCarga}
                        onChange={(e) => setFormItem({ ...formItem, capacidadeCarga: e.target.value })}
                        placeholder="Ex: 200 kg"
                      />
                    </label>
                  </div>
                </>
              )}

              <div className="formRow">
                <label>
                  Descrição (opcional):
                  <textarea
                    value={formItem.descricao}
                    onChange={(e) => setFormItem({ ...formItem, descricao: e.target.value })}
                    placeholder="Adicione uma descrição..."
                    rows="3"
                  />
                </label>
              </div>

              {modo === "editar" && !item?.id && (
                <button
                  className="btnVoltar"
                  onClick={() => {
                    setModo("lista");
                    setFormItem({
                      nome: "", tipo: "equipamento", peso: 0, valor: 0, quantidade: 1, descricao: "",
                      ca: "", rd: "", forca: "", furtividade: "", excecao: "",
                      dano: "", critico: "", maestria: "", propriedades: "", alcance: "",
                      deslocamento: "", capacidadeCarga: "",
                    });
                  }}
                >
                  ← Voltar para lista
                </button>
              )}
            </div>
          )}
        </div>

        <div className="modalFooter">
          <button className="btnCancel" onClick={handleFechar}>
            Cancelar
          </button>
          
          {(modo === "custom" || modo === "editar") && (
            <button
              className="btnSave"
              onClick={handleSalvar}
              disabled={!formItem.nome?.trim()}
            >
              {item?.id ? "Salvar Alterações" : "Adicionar Item"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}