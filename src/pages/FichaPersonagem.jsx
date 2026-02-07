// src/pages/FichaPersonagem.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPersonagem, updateFicha } from '../firebase/firestore';
import CharacterSheet from './CharacterSheet';
import '../styles/fichaPersonagem.css';

export default function FichaPersonagem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const personagemRef = useRef(null);

  // Manter ref atualizada
  useEffect(() => {
    personagemRef.current = personagem;
  }, [personagem]);

  // Carregar personagem
  const loadPersonagem = useCallback(async () => {
    setLoading(true);
    const result = await getPersonagem(id);

    if (result.success) {
      setPersonagem(result.personagem);
    } else {
      setError(result.error || 'Personagem não encontrado');
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadPersonagem();
  }, [loadPersonagem]);

  // Salvar mudanças automaticamente - usando useCallback com ref
  const handleUpdate = useCallback(async (fullState) => {
    const currentPersonagem = personagemRef.current;
    if (!currentPersonagem) return;

    // fullState já é o state completo da ficha
    const novaFicha = fullState;

    // Verificar se mudou nome, classe ou nível na ficha
    const dadosPersonagem = {};
    let precisaAtualizarPersonagem = false;

    if (fullState.info) {
      if (fullState.info.personagem && fullState.info.personagem !== currentPersonagem.nome) {
        dadosPersonagem.nome = fullState.info.personagem;
        precisaAtualizarPersonagem = true;
      }
      if (fullState.info.classe && fullState.info.classe !== currentPersonagem.classe) {
        dadosPersonagem.classe = fullState.info.classe;
        precisaAtualizarPersonagem = true;
      }
      if (fullState.info.nivel && fullState.info.nivel !== currentPersonagem.nivel) {
        dadosPersonagem.nivel = fullState.info.nivel;
        precisaAtualizarPersonagem = true;
      }
    }

    setPersonagem((prev) => ({
      ...prev,
      ...dadosPersonagem,
      ficha: novaFicha,
    }));

    // Salvar no Firebase
    setSaving(true);
    
    await updateFicha(id, novaFicha);
    
    if (precisaAtualizarPersonagem) {
      const { updatePersonagem } = await import('../firebase/firestore');
      await updatePersonagem(id, dadosPersonagem);
    }
    
    setSaving(false);
  }, [id]);

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
        <button onClick={() => {
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate('/personagens');
          }
        }} className="btnVoltarFicha">
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