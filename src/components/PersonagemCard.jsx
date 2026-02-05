// src/components/PersonagemCard.jsx
import { useNavigate } from 'react-router-dom';
import '../styles/personagemCard.css';

export default function PersonagemCard({ personagem, onDelete }) {
  const navigate = useNavigate();

  const handleOpenFicha = () => {
    navigate(`/ficha/${personagem.id}`);
  };

  const getAvatarUrl = () => {
    if (personagem.avatarUrl) {
      return personagem.avatarUrl;
    }
    // Avatar padrão baseado na primeira letra do nome
    const initial = personagem.nome?.[0]?.toUpperCase() || 'P';
    return `https://ui-avatars.com/api/?name=${initial}&background=d6b35a&color=0a0a0a&size=200&bold=true`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    // Se for Timestamp do Firebase
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="personagemCard">
      <div className="personagemAvatar">
        <img src={getAvatarUrl()} alt={personagem.nome} />
      </div>

      <div className="personagemInfo">
        <h3 className="personagemNome">{personagem.nome}</h3>
        
        <div className="personagemStats">
          {personagem.classe && (
            <span className="personagemClasse">{personagem.classe}</span>
          )}
          {personagem.nivel && (
            <span className="personagemNivel">Nível {personagem.nivel}</span>
          )}
        </div>

        {personagem.criadoEm && (
          <p className="personagemData">
            Criado em {formatDate(personagem.criadoEm)}
          </p>
        )}
      </div>

      <div className="personagemActions">
        <button className="btnAbrirFicha" onClick={handleOpenFicha}>
          Abrir Ficha
        </button>
        
        <button className="btnMenu" onClick={onDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
}