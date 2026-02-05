// src/pages/Personagens.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getPersonagens, deletePersonagem } from '../firebase/firestore';
import NovoPersonagemModal from '../components/modals/NovoPersonagemModal';
import PersonagemCard from '../components/PersonagemCard';
import '../styles/personagens.css';

export default function Personagens() {
  const { user } = useAuth();
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Carregar personagens
  useEffect(() => {
    loadPersonagens();
  }, [user]);

  const loadPersonagens = async () => {
    if (!user) return;
    
    setLoading(true);
    const result = await getPersonagens(user.uid);
    
    if (result.success) {
      setPersonagens(result.personagens);
    }
    setLoading(false);
  };

  const handleDelete = async (personagemId) => {
    const result = await deletePersonagem(personagemId);
    
    if (result.success) {
      setPersonagens(personagens.filter(p => p.id !== personagemId));
      setDeleteConfirm(null);
    } else {
      alert('Erro ao deletar personagem: ' + result.error);
    }
  };

  if (loading) {
    return (
      <div className="personagensPage">
        <div className="loadingScreen">
          <div className="spinner"></div>
          <p>Carregando personagens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="personagensPage">
      <div className="personagensHeader">
        <div>
          <h1>📋 Meus Personagens</h1>
          <p className="personagensCount">
            {personagens.length} {personagens.length === 1 ? 'personagem' : 'personagens'}
          </p>
        </div>
        
        <button className="btnNovoPersonagem" onClick={() => setShowModal(true)}>
          + Novo Personagem
        </button>
      </div>

      {personagens.length === 0 ? (
        <div className="personagensVazio">
          <div className="vazioIcon">🎲</div>
          <h2>Nenhum personagem ainda</h2>
          <p>Crie seu primeiro personagem para começar!</p>
          <button className="btnVazioCreate" onClick={() => setShowModal(true)}>
            + Criar Personagem
          </button>
        </div>
      ) : (
        <div className="personagensGrid">
          {personagens.map((personagem) => (
            <PersonagemCard
              key={personagem.id}
              personagem={personagem}
              onDelete={() => setDeleteConfirm(personagem)}
            />
          ))}
        </div>
      )}

      {/* Modal de Novo Personagem */}
      {showModal && (
        <NovoPersonagemModal
          onClose={() => setShowModal(false)}
          onSuccess={loadPersonagens}
        />
      )}

      {/* Modal de Confirmação de Exclusão */}
      {deleteConfirm && (
        <div className="modalOverlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modalDelete" onClick={(e) => e.stopPropagation()}>
            <h2>⚠️ Confirmar Exclusão</h2>
            <p>
              Tem certeza que deseja deletar <strong>{deleteConfirm.nome}</strong>?
            </p>
            <p className="deleteWarning">
              Esta ação não pode ser desfeita!
            </p>
            
            <div className="deleteActions">
              <button 
                className="btnCancelar" 
                onClick={() => setDeleteConfirm(null)}
              >
                Cancelar
              </button>
              <button 
                className="btnConfirmarDelete" 
                onClick={() => handleDelete(deleteConfirm.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}