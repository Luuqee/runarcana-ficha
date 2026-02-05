// src/pages/DashboardMestre.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  getCampanha, 
  listenMembrosCampanha,
  deletarCampanha,
  sairDaCampanha 
} from '../firebase/campanhas';
import { getPersonagem } from '../firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/dashboardMestre.css';

export default function DashboardMestre() {
  const { id: campanhaId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [campanha, setCampanha] = useState(null);
  const [membros, setMembros] = useState([]);
  const [jogadoresComFichas, setJogadoresComFichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [codigoVisivel, setCodigoVisivel] = useState(false);

  useEffect(() => {
    carregarCampanha();
    
    // Listener em tempo real dos membros
    const unsubscribe = listenMembrosCampanha(campanhaId, (membrosAtualizados) => {
      setMembros(membrosAtualizados);
      carregarFichasJogadores(membrosAtualizados);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campanhaId]);

  const carregarCampanha = async () => {
    const result = await getCampanha(campanhaId);
    
    if (result.success) {
      // Verificar se é o mestre
      if (result.campanha.mestreId !== user.uid) {
        alert('Você não é o mestre desta campanha!');
        navigate('/campanhas');
        return;
      }
      
      setCampanha(result.campanha);
    } else {
      alert('Campanha não encontrada');
      navigate('/campanhas');
    }
    
    setLoading(false);
  };

  const carregarFichasJogadores = async (membrosAtualizados) => {
    const jogadores = membrosAtualizados.filter(m => m.role === 'jogador');
    
    const jogadoresComDados = await Promise.all(
      jogadores.map(async (jogador) => {
        if (!jogador.personagemId) {
          return { ...jogador, personagem: null };
        }
        
        const result = await getPersonagem(jogador.personagemId);
        
        if (result.success) {
          // ✅ NOVO: Listener em tempo real para esta ficha
          const personagemRef = doc(db, 'personagens', jogador.personagemId);
          onSnapshot(personagemRef, (docSnap) => {
            if (docSnap.exists()) {
              const personagemAtualizado = { id: docSnap.id, ...docSnap.data() };
              
              // Atualiza apenas este jogador no state
              setJogadoresComFichas(prev => 
                prev.map(j => 
                  j.personagemId === jogador.personagemId 
                    ? { ...j, personagem: personagemAtualizado }
                    : j
                )
              );
            }
          });
          
          return { 
            ...jogador, 
            personagem: result.personagem 
          };
        }
        
        return { ...jogador, personagem: null };
      })
    );
    
    setJogadoresComFichas(jogadoresComDados);
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(campanha.codigo);
    alert('Código copiado!');
  };

  const handleDeletarCampanha = async () => {
    if (!window.confirm('Tem certeza que deseja deletar esta campanha? Esta ação não pode ser desfeita.')) {
      return;
    }
    
    const result = await deletarCampanha(campanhaId);
    
    if (result.success) {
      alert('Campanha deletada com sucesso!');
      navigate('/campanhas');
    } else {
      alert('Erro ao deletar campanha: ' + result.error);
    }
  };

  const abrirFichaJogador = (personagemId) => {
    navigate(`/ficha/${personagemId}`, { 
      state: { from: `/campanha/${campanhaId}/mestre` } 
    });
  };

  if (loading) {
    return (
      <div className="dashboardMestre">
        <div className="loadingDashboard">
          <div className="spinner"></div>
          <p>Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!campanha) return null;

  const totalJogadores = jogadoresComFichas.length;
  const jogadoresComPersonagem = jogadoresComFichas.filter(j => j.personagem).length;

  return (
    <div className="dashboardMestre">
      {/* Header */}
      <div className="dashboardHeader">
        <button className="btnVoltar" onClick={() => navigate('/campanhas')}>
          ← Voltar
        </button>
        
        <div className="dashboardHeaderInfo">
          <div className="headerTitulo">
            <h1>👑 {campanha.nome}</h1>
            {campanha.descricao && <p>{campanha.descricao}</p>}
          </div>
          
          <div className="headerStats">
            <div className="statItem">
              <span className="statLabel">Jogadores</span>
              <span className="statValue">{totalJogadores}</span>
            </div>
            <div className="statItem">
              <span className="statLabel">Ativos</span>
              <span className="statValue">{jogadoresComPersonagem}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Código da Campanha */}
      <div className="codigoSection">
        <div className="codigoCard">
          <div className="codigoInfo">
            <span className="codigoLabel">Código da Campanha:</span>
            <button 
              className="codigoToggle"
              onClick={() => setCodigoVisivel(!codigoVisivel)}
            >
              {codigoVisivel ? campanha.codigo : '••••••••'}
            </button>
          </div>
          <button className="btnCopiarCodigo" onClick={copiarCodigo}>
            📋 Copiar Código
          </button>
        </div>
      </div>

      {/* Lista de Jogadores */}
      <div className="jogadoresSection">
        <div className="sectionHeader">
          <h2>⚔️ Jogadores ({totalJogadores})</h2>
        </div>

        {jogadoresComFichas.length === 0 ? (
          <div className="semJogadores">
            <div className="semJogadoresIcon">🎲</div>
            <h3>Nenhum jogador ainda</h3>
            <p>Compartilhe o código da campanha para que jogadores possam entrar!</p>
            <button className="btnCompartilhar" onClick={copiarCodigo}>
              📋 Copiar Código
            </button>
          </div>
        ) : (
          <div className="jogadoresGrid">
            {jogadoresComFichas.map((jogador) => (
              <div key={jogador.userId} className="jogadorCard">
                {!jogador.personagem ? (
                  <div className="jogadorSemPersonagem">
                    <div className="avatarPlaceholder">👤</div>
                    <div className="jogadorInfo">
                      <h3>Aguardando personagem</h3>
                      <p className="jogadorStatus">Jogador ainda não escolheu personagem</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Avatar */}
                    <div className="jogadorAvatar">
                      <img 
                        src={jogador.personagem.avatarUrl || `https://ui-avatars.com/api/?name=${jogador.personagem.nome[0]}&background=d6b35a&color=0a0a0a&size=120`}
                        alt={jogador.personagem.nome}
                      />
                    </div>

                    {/* Info */}
                    <div className="jogadorInfo">
                      <h3>{jogador.personagem.nome}</h3>
                      <p className="jogadorClasse">
                        {jogador.personagem.classe} • Nível {jogador.personagem.nivel}
                      </p>
                    </div>

                    {/* Stats */}
                    {jogador.personagem.ficha && (
                      <div className="jogadorStats">
                        <div className="statBar vida">
                          <div className="statBarLabel">
                            <span>❤️ Vida</span>
                            <span>
                              {jogador.personagem.ficha.vida?.atual || 0} / {jogador.personagem.ficha.vida?.max || 0}
                            </span>
                          </div>
                          <div className="statBarBg">
                            <div 
                              className="statBarFill"
                              style={{ 
                                width: `${Math.min(100, ((jogador.personagem.ficha.vida?.atual || 0) / (jogador.personagem.ficha.vida?.max || 1)) * 100)}%` 
                              }}
                            />
                          </div>
                        </div>

                        <div className="statBar mana">
                          <div className="statBarLabel">
                            <span>✨ Mana</span>
                            <span>
                              {jogador.personagem.ficha.mana?.atual || 0} / {jogador.personagem.ficha.mana?.max || 0}
                            </span>
                          </div>
                          <div className="statBarBg">
                            <div 
                              className="statBarFill"
                              style={{ 
                                width: `${Math.min(100, ((jogador.personagem.ficha.mana?.atual || 0) / (jogador.personagem.ficha.mana?.max || 1)) * 100)}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Ações */}
                    <button 
                      className="btnAbrirFicha"
                      onClick={() => abrirFichaJogador(jogador.personagemId)}
                    >
                      📋 Ver Ficha Completa
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ações da Campanha */}
      <div className="acoesSection">
        <button className="btnDeletar" onClick={handleDeletarCampanha}>
          🗑️ Deletar Campanha
        </button>
      </div>
    </div>
  );
}