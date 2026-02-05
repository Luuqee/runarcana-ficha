// src/components/modals/EntrarCampanhaModal.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { buscarCampanhaPorCodigo, entrarNaCampanha } from '../../firebase/campanhas';
import { getPersonagens } from '../../firebase/firestore';
import '../../styles/modals.css';

export default function EntrarCampanhaModal({ onClose, onEntrada }) {
  const { user } = useAuth();
  const [etapa, setEtapa] = useState('codigo'); // 'codigo' ou 'personagem'
  const [codigo, setCodigo] = useState('');
  const [campanha, setCampanha] = useState(null);
  const [personagens, setPersonagens] = useState([]);
  const [personagemSelecionado, setPersonagemSelecionado] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregarPersonagens = async () => {
    const result = await getPersonagens(user.uid);
    if (result.success) {
      setPersonagens(result.personagens);
      if (result.personagens.length > 0) {
        setPersonagemSelecionado(result.personagens[0].id);
      }
    }
  };

  useEffect(() => {
    if (etapa === 'personagem') {
      carregarPersonagens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etapa]);

  const handleBuscarCampanha = async (e) => {
    e.preventDefault();

    if (!codigo.trim()) {
      setError('Digite o código da campanha');
      return;
    }

    setLoading(true);
    setError('');

    const result = await buscarCampanhaPorCodigo(codigo.trim().toUpperCase());

    if (result.success) {
      setCampanha(result.campanha);
      setEtapa('personagem');
    } else {
      setError(result.error || 'Campanha não encontrada');
    }

    setLoading(false);
  };

  const handleEntrar = async () => {
    if (!personagemSelecionado) {
      setError('Selecione um personagem');
      return;
    }

    setLoading(true);
    setError('');

    const result = await entrarNaCampanha(
      campanha.id,
      user.uid,
      user.displayName || 'Jogador',
      personagemSelecionado
    );

    if (result.success) {
      onEntrada();
      onClose();
    } else {
      setError(result.error || 'Erro ao entrar na campanha');
    }

    setLoading(false);
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2>⚔️ Entrar em Campanha</h2>
          <button className="modalClose" onClick={onClose}>
            ×
          </button>
        </div>

        {etapa === 'codigo' ? (
          <form onSubmit={handleBuscarCampanha} className="modalForm">
            <div className="formGroup">
              <label>Código da Campanha *</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                placeholder="Ex: DRAG-2025"
                required
                autoFocus
                maxLength={10}
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontSize: '20px',
                  fontWeight: '700',
                }}
              />
              <small className="formHint">
                Cole o código fornecido pelo mestre da campanha
              </small>
            </div>

            {error && <div className="errorMsg">{error}</div>}

            <div className="modalActions">
              <button
                type="button"
                className="btnSecondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button type="submit" className="btnPrimary" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar Campanha'}
              </button>
            </div>
          </form>
        ) : (
          <div className="modalForm">
            <div className="campanhaEncontrada">
              <h3>✅ Campanha encontrada!</h3>
              <div className="campanhaInfo">
                <div className="infoItem">
                  <span>Nome:</span>
                  <strong>{campanha.nome}</strong>
                </div>
                <div className="infoItem">
                  <span>Mestre:</span>
                  <strong>{campanha.mestreNome}</strong>
                </div>
                {campanha.descricao && (
                  <p className="campanhaDescricao">{campanha.descricao}</p>
                )}
              </div>
            </div>

            <div className="formGroup">
              <label>Escolha seu Personagem *</label>
              {personagens.length === 0 ? (
                <div className="semPersonagens">
                  <p>Você ainda não tem personagens!</p>
                  <small>Crie um personagem antes de entrar na campanha.</small>
                </div>
              ) : (
                <select
                  value={personagemSelecionado}
                  onChange={(e) => setPersonagemSelecionado(e.target.value)}
                >
                  {personagens.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} ({p.classe} - Nível {p.nivel})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {error && <div className="errorMsg">{error}</div>}

            <div className="modalActions">
              <button
                type="button"
                className="btnSecondary"
                onClick={() => setEtapa('codigo')}
                disabled={loading}
              >
                ← Voltar
              </button>
              <button
                type="button"
                className="btnPrimary"
                onClick={handleEntrar}
                disabled={loading || personagens.length === 0}
              >
                {loading ? 'Entrando...' : '🎲 Entrar na Mesa'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}