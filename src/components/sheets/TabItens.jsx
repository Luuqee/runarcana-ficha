// src/components/sheets/TabItens.jsx
import { useMemo } from "react";

export default function TabItens({
  moedas,
  inventario,
  attrs,
  update,
  abrirModalAdicionarItem,
  abrirModalEditarItem,
  openItem,
  setOpenItem,
}) {
  // ========== CONVERSÃO DE MOEDAS ==========
  const riquezaTotal = useMemo(() => {
    const pl = Number(moedas?.platina || 0) * 10;
    const po = Number(moedas?.ouro || 0) * 1;
    const pe = Number(moedas?.electro || 0) * 0.5;
    const pp = Number(moedas?.prata || 0) * 0.1;
    const pc = Number(moedas?.cobre || 0) * 0.01;
    return (pl + po + pe + pp + pc).toFixed(2);
  }, [moedas]);

  // ========== CAPACIDADE DE CARGA ==========
  const forca = Number(attrs?.FOR || 10);
  const capacidadeMax = forca * 7.5;
  const sobrecarga = forca * 5;
  const muitoSobrecarregado = forca * 10;

  const totalMoedas =
    Number(moedas?.platina || 0) +
    Number(moedas?.ouro || 0) +
    Number(moedas?.electro || 0) +
    Number(moedas?.prata || 0) +
    Number(moedas?.cobre || 0);
  const pesoMoedas = totalMoedas / 100;

  const pesoItens = useMemo(() => {
    return (inventario || []).reduce((total, item) => {
      const peso = Number(item.peso || 0);
      const qtd = Number(item.quantidade || 1);
      return total + peso * qtd;
    }, 0);
  }, [inventario]);

  const pesoTotal = pesoMoedas + pesoItens;
  const percentualCarga = (pesoTotal / capacidadeMax) * 100;

  let corStatus = "var(--gold)";
  let avisoStatus = "";

  if (pesoTotal > muitoSobrecarregado) {
    corStatus = "#ff4444";
    avisoStatus = "MUITO SOBRECARREGADO: Deslocamento -20 pés, desvantagem em testes";
  } else if (pesoTotal > sobrecarga) {
    corStatus = "#ff8c00";
    avisoStatus = "SOBRECARREGADO: Deslocamento -10 pés";
  }

  const handleMoedaChange = (tipo, valor) => {
    update({
      moedas: {
        ...moedas,
        [tipo]: Math.max(0, Number(valor) || 0),
      },
    });
  };

  const removerItem = (id) => {
    update({
      inventario: inventario.filter((item) => item.id !== id),
    });
    if (openItem === id) setOpenItem(null);
  };

  return (
    <div className="tabItens">
      {/* MOEDAS */}
      <div className="rkCardMoedas">
        <div className="rkCardTitle">MOEDAS</div>

        <div className="rkMoedasGrid">
          <div className="rkMoeda">
            <div className="rkMoedaIcon platina">PL</div>
            <span className="rkMoedaLabel">Platina</span>
            <input
              type="number"
              value={moedas?.platina || 0}
              onChange={(e) => handleMoedaChange("platina", e.target.value)}
              min="0"
            />
          </div>

          <div className="rkMoeda">
            <div className="rkMoedaIcon ouro">PO</div>
            <span className="rkMoedaLabel">Ouro</span>
            <input
              type="number"
              value={moedas?.ouro || 0}
              onChange={(e) => handleMoedaChange("ouro", e.target.value)}
              min="0"
            />
          </div>

          <div className="rkMoeda">
            <div className="rkMoedaIcon electro">PE</div>
            <span className="rkMoedaLabel">Electro</span>
            <input
              type="number"
              value={moedas?.electro || 0}
              onChange={(e) => handleMoedaChange("electro", e.target.value)}
              min="0"
            />
          </div>

          <div className="rkMoeda">
            <div className="rkMoedaIcon prata">PP</div>
            <span className="rkMoedaLabel">Prata</span>
            <input
              type="number"
              value={moedas?.prata || 0}
              onChange={(e) => handleMoedaChange("prata", e.target.value)}
              min="0"
            />
          </div>

          <div className="rkMoeda">
            <div className="rkMoedaIcon cobre">PC</div>
            <span className="rkMoedaLabel">Cobre</span>
            <input
              type="number"
              value={moedas?.cobre || 0}
              onChange={(e) => handleMoedaChange("cobre", e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className="rkRiquezaTotal">
          <strong>RIQUEZA TOTAL:</strong> {riquezaTotal} PO
        </div>
      </div>

      {/* CAPACIDADE DE CARGA */}
      <div className="rkCardCarga">
        <div className="rkCardTitle">CAPACIDADE DE CARGA</div>

        <div className="rkCargaInfo">
          <div className="rkCargaLinha">
            <span>Peso Atual:</span>
            <strong style={{ color: corStatus }}>{pesoTotal.toFixed(2)} kg</strong>
          </div>
          <div className="rkCargaLinha">
            <span>Capacidade Máxima:</span>
            <strong>{capacidadeMax} kg</strong>
            <span className="rkCargaHint">(FOR × 7.5)</span>
          </div>
        </div>

        <div className="rkCargaBarra">
          <div
            className="rkCargaPreenchimento"
            style={{
              width: `${Math.min(percentualCarga, 100)}%`,
              background: corStatus,
            }}
          />
        </div>

        <div className="rkCargaPercentual" style={{ color: corStatus }}>
          {percentualCarga.toFixed(0)}%
        </div>

        {avisoStatus && <div className="rkCargaAviso">{avisoStatus}</div>}

        <div className="rkCargaLimites">
          <div className="rkCargaLimite">
            <strong>Sobrecarga:</strong> {sobrecarga} kg
          </div>
          <div className="rkCargaLimite">
            <strong>Muito Sobrecarregado:</strong> {muitoSobrecarregado} kg
          </div>
        </div>

        <div className="rkCargaDetalhes">
          <div>Itens: {pesoItens.toFixed(2)} kg</div>
          <div>Moedas: {pesoMoedas.toFixed(2)} kg ({totalMoedas} moedas)</div>
        </div>
      </div>

      {/* INVENTÁRIO */}
      <div className="rkCardInventario">
        <div className="rkInventarioTopo">
          <div className="rkCardTitle">INVENTÁRIO</div>
          <button className="rkBtnAdd" onClick={abrirModalAdicionarItem}>
            + Adicionar Item
          </button>
        </div>

        {!inventario || inventario.length === 0 ? (
          <div className="rkInventarioVazio">
            Nenhum item no inventário. Clique em "Adicionar Item" para começar.
          </div>
        ) : (
          <div className="itemsList">
            {inventario.map((item) => {
              const isOpen = openItem === item.id;
              const quantidade = Number(item.quantidade || 1);

              return (
                <div key={item.id} className={`itemCard ${isOpen ? "open" : ""}`}>
                  {/* Linha do item colapsado */}
                  <div className="itemHeader" onClick={() => setOpenItem(isOpen ? null : item.id)}>
                    <span className="itemToggle">{isOpen ? "▼" : "▶"}</span>
                    <div className="itemNome">{item.nome}</div>
                    <div className="itemQtd">x{quantidade}</div>
                  </div>

                  {/* Conteúdo expandido */}
                  {isOpen && (
                    <div className="itemBody">
                      <div className="itemInfo">
                        {/* INFORMAÇÕES PARA ARMAS */}
                        {item.tipo === "arma" && (
                          <>
                            {item.dano && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">Dano:</span>
                                <span className="itemValor">{item.dano}</span>
                              </div>
                            )}
                            {item.critico && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">Crítico:</span>
                                <span className="itemValor">{item.critico}</span>
                              </div>
                            )}
                            {item.maestria && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">Maestria:</span>
                                <span className="itemValor">{item.maestria}</span>
                              </div>
                            )}
                            {item.propriedades && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">Propriedades:</span>
                                <span className="itemValor">{item.propriedades}</span>
                              </div>
                            )}
                            {item.alcance && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">Alcance:</span>
                                <span className="itemValor">{item.alcance}</span>
                              </div>
                            )}
                          </>
                        )}

                        {/* INFORMAÇÕES PARA ARMADURAS/ESCUDOS */}
                        {(item.tipo === "armadura" || item.tipo === "escudo") && (
                          <>
                            {item.ca && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">CA:</span>
                                <span className="itemValor">{item.ca}</span>
                              </div>
                            )}
                            {item.rd && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">RD:</span>
                                <span className="itemValor">{item.rd}</span>
                              </div>
                            )}
                            {item.forca && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">Força Mínima:</span>
                                <span className="itemValor">{item.forca}</span>
                              </div>
                            )}
                            {item.furtividade && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">Furtividade:</span>
                                <span className="itemValor">{item.furtividade}</span>
                              </div>
                            )}
                          </>
                        )}

                        {/* INFORMAÇÕES PARA MONTARIAS */}
                        {item.tipo === "montaria" && (
                          <>
                            {item.deslocamento && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">Deslocamento:</span>
                                <span className="itemValor">{item.deslocamento}</span>
                              </div>
                            )}
                            {item.capacidadeCarga && (
                              <div className="itemInfoRow">
                                <span className="itemLabel">Capacidade de Carga:</span>
                                <span className="itemValor">{item.capacidadeCarga}</span>
                              </div>
                            )}
                          </>
                        )}

                        {/* INFORMAÇÕES GERAIS (sempre mostrar) */}
                        <div className="itemInfoRow">
                          <span className="itemLabel">Quantidade:</span>
                          <span className="itemValor">{quantidade}</span>
                        </div>

                        {item.descricao && (
                          <div className="itemDescricao">
                            <span className="itemLabel">Descrição:</span>
                            <p>{item.descricao}</p>
                          </div>
                        )}
                      </div>

                      <div className="itemActions">
                        <button className="btnEditar" onClick={() => abrirModalEditarItem(item.id)}>
                          Editar
                        </button>
                        <button className="btnRemover" onClick={() => removerItem(item.id)}>
                          Remover
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}