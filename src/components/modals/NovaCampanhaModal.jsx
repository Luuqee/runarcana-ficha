// src/components/modals/NovaCampanhaModal.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { criarCampanha } from '../../firebase/campanhas';
import '../../styles/modals.css';

export default function NovaCampanhaModal({ onClose, onSuccess }) {
  const { user } = useAuth();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      setError('Por favor, insira um nome para a campanha');
      return;
    }

    setLoading(true);
    setError('');

    const result = await criarCampanha(user.uid, user.displayName || 'Mestre', {
      nome: nome.trim(),
      descricao: descricao.trim(),
    });

    if (result.success) {
      onSuccess(result.codigo);
      onClose();
    } else {
      setError('Erro ao criar campanha: ' + result.error);
    }

    setLoading(false);
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2>🎲 Nova Campanha</h2>
          <button className="modalClose" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modalForm">
          <div className="formGroup">
            <label>Nome da Campanha: *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: A Queda do Dragão"
              required
              autoFocus
            />
          </div>

          <div className="formGroup">
            <label>Descrição:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Uma breve descrição da campanha..."
              rows={4}
            />
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
            <button 
              type="submit" 
              className="btnPrimary"
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Campanha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}