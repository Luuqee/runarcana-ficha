// src/components/modals/NovoPersonagemModal.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { createPersonagem } from '../../firebase/firestore';
import { defaultState } from '../../data/sheetConstants';
import '../../styles/modals.css';

export default function NovoPersonagemModal({ onClose, onSuccess }) {
  const { user } = useAuth();
  const [nome, setNome] = useState('');
  const [classe, setClasse] = useState('');
  const [nivel, setNivel] = useState(1);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const classes = [
    'Arcanista',
    'Bodisatva',
    'Caçador',
    'Combatente',
    'Guerreiro',
    'Inventor',
    'Lutador',
    'Paladino',
    'Shaman',
    'Tecmaturgo',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      setError('Por favor, insira um nome para o personagem');
      return;
    }

    setLoading(true);
    setError('');

    // Criar personagem com ficha padrão
    const personagemData = {
      nome: nome.trim(),
      classe: classe || 'Sem Classe',
      nivel: Number(nivel) || 1,
      avatarUrl: avatarUrl.trim() || null,
      ficha: {
        ...defaultState,
        info: {
          ...defaultState.info,
          personagem: nome.trim(),
          classe: classe || '',
          nivel: Number(nivel) || 1,
        },
      },
    };

    const result = await createPersonagem(user.uid, personagemData);

    if (result.success) {
      onSuccess();
      onClose();
    } else {
      setError('Erro ao criar personagem: ' + result.error);
    }

    setLoading(false);
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2>✨ Novo Personagem</h2>
          <button className="modalClose" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modalForm">
          <div className="formGroup">
            <label>Nome do Personagem: *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Thorin Escudo de Ferro"
              required
              autoFocus
            />
          </div>

          <div className="formGroup">
            <label>Classe:</label>
            <select value={classe} onChange={(e) => setClasse(e.target.value)}>
              <option value="">Selecione uma classe</option>
              {classes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label>Nível:</label>
            <input
              type="number"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              min="1"
              max="20"
            />
          </div>

          <div className="formGroup">
            <label>Avatar (URL da imagem):</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.png"
            />
            <small className="formHint">
              Cole a URL de uma imagem da internet (Pinterest, Artstation, etc)
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
            <button 
              type="submit" 
              className="btnPrimary"
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Personagem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}