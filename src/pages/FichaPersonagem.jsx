// src/pages/FichaPersonagem.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getPersonagem, updateFicha } from '../firebase/firestore';
import CharacterSheet from './CharacterSheet';
import '../styles/fichaPersonagem.css';

export default function FichaPersonagem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Carregar personagem
  const loadPersonagem = async () => {
    setLoading(true);
    const result = await getPersonagem(id);

    if (result.success) {
      // Verificar se o personagem pertence ao usuário
      if (result.personagem.userId !== user.uid) {
        setError('Você não tem permissão para acessar este personagem');
        setLoading(false);
        return;
      }

      setPersonagem(result.personagem);
    } else {
      setError(result.error || 'Personagem não encontrado');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPersonagem();
  }, [id]);

  // Salvar mudanças automaticamente
  const handleUpdate = async (updates) => {
    if (!personagem) return;

    // Atualizar estado local imediatamente
    const novaFicha = {
      ...personagem.ficha,
      ...updates,
    };

    // Verificar se mudou nome, classe ou nível na ficha
    const dadosPersonagem = {};
    let precisaAtualizarPersonagem = false;

    if (updates.info) {
      if (updates.info.personagem && updates.info.personagem !== personagem.nome) {
        dadosPersonagem.nome = updates.info.personagem;
        precisaAtualizarPersonagem = true;
      }
      if (updates.info.classe && updates.info.classe !== personagem.classe) {
        dadosPersonagem.classe = updates.info.classe;
        precisaAtualizarPersonagem = true;
      }
      if (updates.info.nivel && updates.info.nivel !== personagem.nivel) {
        dadosPersonagem.nivel = updates.info.nivel;
        precisaAtualizarPersonagem = true;
      }
    }

    setPersonagem({
      ...personagem,
      ...dadosPersonagem,
      ficha: novaFicha,
    });

    // Salvar no Firebase
    setSaving(true);
    
    // Atualizar ficha
    await updateFicha(id, novaFicha);
    
    // Atualizar dados do personagem se necessário
    if (precisaAtualizarPersonagem) {
      const { updatePersonagem } = await import('../firebase/firestore');
      await updatePersonagem(id, dadosPersonagem);
    }
    
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="fichaLoading">
        <div className="spinner"></div>
        <p>Carregando ficha...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fichaError">
        <h2>⚠️ Erro</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/personagens')} className="btnVoltar">
          Voltar para Personagens
        </button>
      </div>
    );
  }

  return (
    <div className="fichaPersonagemPage">
      {/* Header com info do personagem */}
      <div className="fichaHeader">
        <button onClick={() => navigate('/personagens')} className="btnVoltarFicha">
          ← Voltar
        </button>

        <div className="fichaHeaderInfo">
          <img 
            src={personagem.avatarUrl || `https://ui-avatars.com/api/?name=${personagem.nome[0]}&background=d6b35a&color=0a0a0a&size=80`} 
            alt={personagem.nome}
            className="fichaHeaderAvatar"
          />
          <div>
            <h1>{personagem.nome}</h1>
            <p>{personagem.classe} - Nível {personagem.nivel}</p>
          </div>
        </div>

        {saving && (
          <div className="savingIndicator">
            <div className="savingSpinner"></div>
            Salvando...
          </div>
        )}
      </div>

      {/* Ficha do personagem */}
      <CharacterSheet 
        initialState={personagem.ficha}
        onUpdate={handleUpdate}
        personagemId={id}
      />
    </div>
  );
}