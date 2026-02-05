// src/pages/Campanhas.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCampanhasDoUsuario } from '../firebase/campanhas';
import NovaCampanhaModal from '../components/modals/NovaCampanhaModal';
import EntrarCampanhaModal from '../components/modals/EntrarCampanhaModal';
import '../styles/campanhas.css';

export default function Campanhas() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNovaCampanhaModal, setShowNovaCampanhaModal] = useState(false);
  const [showEntrarModal, setShowEntrarModal] = useState(false);
  const [campanhaRecemCriada, setCampanhaRecemCriada] = useState(null);

  // ✅ FUNÇÃO DECLARADA ANTES DO useEffect
  const carregarCampanhas = async () => {
    if (!user) return;

    setLoading(true);
    const result = await getCampanhasDoUsuario(user.uid);

    if (result.success) {
      setCampanhas(result.campanhas);
    }
    setLoading(false);
  };

  const handleCampanhaCriada = (campanha) => {
    setCampanhaRecemCriada(campanha);
    carregarCampanhas();
  };

  const handleEntradaNaCampanha = () => {
    carregarCampanhas();
  };

  const abrirCampanha = (campanha) => {
    if (campanha.euSouMestre) {
      navigate(`/campanha/${campanha.id}/mestre`);
    } else {
      navigate(`/campanha/${campanha.id}`);
    }
  };

  const copiarCodigo = (codigo) => {
    navigator.clipboard.writeText(codigo);
    alert('Código copiado!');
  };

  // ✅ useEffect DEPOIS da declaração da função
  useEffect(() => {
    carregarCampanhas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return (
      <div className="campanhasPage">
        <div className="loadingCampanhas">
          <div className="spinner"></div>
          <p>Carregando campanhas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="campanhasPage">
      {/* Header */}
      <div className="campanhasHeader">
        <div>
          <h1>🎲 Minhas Campanhas</h1>
          <p className="campanhasSubtitle">
            {campanhas.length} {campanhas.length === 1 ? 'campanha' : 'campanhas'}
          </p>
        </div>

        <div className="campanhasHeaderActions">
          <button className="btnHeaderEntrar" onClick={() => setShowEntrarModal(true)}>
            ⚔️ Entrar com Código
          </button>
          <button className="btnHeaderNova" onClick={() => setShowNovaCampanhaModal(true)}>
            + Nova Campanha
          </button>
        </div>
      </div>

      {/* Alert de campanha criada */}
      {campanhaRecemCriada && (
        <div className="alertCampanhaCriada">
          <div className="alertHeader">
            <h3>✅ Campanha criada com sucesso!</h3>
            <button onClick={() => setCampanhaRecemCriada(null)}>×</button>
          </div>
          <p>Compartilhe este código com seus jogadores:</p>
          <div className="codigoBox">
            <span className="codigo">{campanhaRecemCriada.codigo}</span>
            <button className="btnCopiarCodigo" onClick={() => copiarCodigo(campanhaRecemCriada.codigo)}>
              📋 Copiar
            </button>
          </div>
          <small>Os jogadores precisam deste código para entrar na campanha!</small>
        </div>
      )}

      {/* Lista de campanhas */}
      {campanhas.length === 0 ? (
        <div className="campanhasVazio">
          <div className="vazioIcon">🎲</div>
          <h2>Nenhuma campanha ainda</h2>
          <p>Crie uma nova campanha ou entre em uma existente!</p>
          <div className="vazioActions">
            <button className="btnVazioEntrar" onClick={() => setShowEntrarModal(true)}>
              ⚔️ Entrar com Código
            </button>
            <button className="btnVazioCriar" onClick={() => setShowNovaCampanhaModal(true)}>
              + Criar Campanha
            </button>
          </div>
        </div>
      ) : (
        <div className="campanhasGrid">
          {campanhas.map((campanha) => (
            <div key={campanha.id} className="campanhaCard">
              {/* Badge de Role */}
              <div className={`campanhaRole ${campanha.euSouMestre ? 'mestre' : 'jogador'}`}>
                {campanha.euSouMestre ? '👑 Mestre' : '⚔️ Jogador'}
              </div>

              {/* Nome */}
              <h3 className="campanhaNome">{campanha.nome}</h3>

              {/* Descrição */}
              {campanha.descricao && (
                <p className="campanhaDescricao">{campanha.descricao}</p>
              )}

              {/* Info */}
              <div className="campanhaInfoBox">
                <div className="infoRow">
                  <span>Código:</span>
                  <strong className="codigoValue">{campanha.codigo}</strong>
                </div>
                <div className="infoRow">
                  <span>Mestre:</span>
                  <strong>{campanha.mestreNome}</strong>
                </div>
              </div>

              {/* Botão */}
              <button className="btnAbrirCampanha" onClick={() => abrirCampanha(campanha)}>
                {campanha.euSouMestre ? '👑 Abrir Dashboard' : '⚔️ Entrar na Mesa'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modais */}
      {showNovaCampanhaModal && (
        <NovaCampanhaModal
          onClose={() => setShowNovaCampanhaModal(false)}
          onCriada={handleCampanhaCriada}
        />
      )}

      {showEntrarModal && (
        <EntrarCampanhaModal
          onClose={() => setShowEntrarModal(false)}
          onEntrada={handleEntradaNaCampanha}
        />
      )}
    </div>
  );
}