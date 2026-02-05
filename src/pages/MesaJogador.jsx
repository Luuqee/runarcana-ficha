// src/pages/MesaJogador.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  getCampanha, 
  listenMembrosCampanha,
  sairDaCampanha 
} from '../firebase/campanhas';
import { getPersonagem } from '../firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/mesaJogador.css';

export default function MesaJogador() {
  const { id: campanhaId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [campanha, setCampanha] = useState(null);
  const [membros, setMembros] = useState([]);
  const [meuPersonagem, setMeuPersonagem] = useState(null);
  const [outrosJogadores, setOutrosJogadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCampanha();
    
    // Listener em tempo real dos membros
    const unsubscribe = listenMembrosCampanha(campanhaId, (membrosAtualizados) => {
      setMembros(membrosAtualizados);
      carregarPersonagens(membrosAtualizados);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campanhaId]);

  const carregarCampanha = async () => {
    const result = await getCampanha(campanhaId);
    
    if (result.success) {
      setCampanha(result.campanha);
    } else {
      alert('Campanha não encontrada');
      navigate('/campanhas');
    }
    
    setLoading(false);
  };

  const carregarPersonagens = async (membrosAtualizados) => {
    const meuMembro = membrosAtualizados.find(m => m.userId === user.uid);
    
    if (!meuMembro) {
      alert('Você não está nesta campanha!');
      navigate('/campanhas');
      return;
    }

    // Carregar meu personagem
    if (meuMembro.personagemId) {
      const result = await getPersonagem(meuMembro.personagemId);
      if (result.success) {
        setMeuPersonagem(result.personagem);
        
        // ✅ NOVO: Listener em tempo real para minha ficha
        const personagemRef = doc(db, 'personagens', meuMembro.personagemId);
        onSnapshot(personagemRef, (docSnap) => {
          if (docSnap.exists()) {
            setMeuPersonagem({ id: docSnap.id, ...docSnap.data() });
          }
        });
      }
    }

    // Carregar outros jogadores
    const outrosJogadoresList = membrosAtualizados.filter(
      m => m.role === 'jogador' && m.userId !== user.uid
    );
    
    const jogadoresComDados = await Promise.all(
      outrosJogadoresList.map(async (jogador) => {
        if (!jogador.personagemId) {
          return { ...jogador, personagem: null };
        }
        
        const result = await getPersonagem(jogador.personagemId);
        
        if (result.success) {
          // ✅ NOVO: Listener em tempo real
          const personagemRef = doc(db, 'personagens', jogador.personagemId);
          onSnapshot(personagemRef, (docSnap) => {
            if (docSnap.exists()) {
              const personagemAtualizado = { id: docSnap.id, ...docSnap.data() };
              
              setOutrosJogadores(prev => 
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
    
    setOutrosJogadores(jogadoresComDados);
  };

  const handleSairCampanha = async () => {
    if (!window.confirm('Tem certeza que deseja sair desta campanha?')) {
      return;
    }
    
    const result = await sairDaCampanha(campanhaId, user.uid);
    
    if (result.success) {
      alert('Você saiu da campanha!');
      navigate('/campanhas');
    } else {
      alert('Erro ao sair da campanha: ' + result.error);
    }
  };

  const abrirMinhaFicha = () => {
    if (meuPersonagem) {
      navigate(`/ficha/${meuPersonagem.id}`, {
        state: { from: `/campanha/${campanhaId}` }
      });
    }
  };

  if (loading) {
    return (
      <div className="mesaJogador">
        <div className="loadingMesa">
          <div className="spinner"></div>
          <p>Carregando mesa...</p>
        </div>
      </div>
    );
  }

  if (!campanha) return null;

  const totalJogadores = outrosJogadores.length + 1; // +1 é você

  return (
    <div className="mesaJogador">
      {/* Header */}
      <div className="mesaHeader">
        <button className="btnVoltar" onClick={() => navigate('/campanhas')}>
          ← Voltar
        </button>
        
        <div className="mesaHeaderInfo">
          <div className="headerTitulo">
            <h1>⚔️ {campanha.nome}</h1>
            {campanha.descricao && <p>{campanha.descricao}</p>}
          </div>
          
          <div className="headerMestre">
            <span className="mestreLabel">Mestre:</span>
            <span className="mestreNome">👑 {campanha.mestreNome}</span>
          </div>
        </div>
      </div>

      {/* Meu Personagem */}
      <div className="meuPersonagemSection">
        <div className="sectionHeader">
          <h2>🎲 Meu Personagem</h2>
        </div>

        {!meuPersonagem ? (
          <div className="semPersonagem">
            <div className="semPersonagemIcon">👤</div>
            <h3>Nenhum personagem vinculado</h3>
            <p>Você precisa vincular um personagem a esta campanha</p>
            <button className="btnVincular" onClick={() => navigate('/personagens')}>
              Ir para Personagens
            </button>
          </div>
        ) : (
          <div className="meuPersonagemCard">
            <div className="personagemAvatar">
              <img 
                src={meuPersonagem.avatarUrl || `https://ui-avatars.com/api/?name=${meuPersonagem.nome[0]}&background=d6b35a&color=0a0a0a&size=200`}
                alt={meuPersonagem.nome}
              />
            </div>

            <div className="personagemInfo">
              <h3>{meuPersonagem.nome}</h3>
              <p className="personagemClasse">
                {meuPersonagem.classe} • Nível {meuPersonagem.nivel}
              </p>

              {meuPersonagem.ficha && (
                <div className="personagemStats">
                  <div className="statBox vida">
                    <div className="statBoxHeader">
                      <span>❤️ Vida</span>
                      <span className="statValue">
                        {meuPersonagem.ficha.vida?.atual || 0} / {meuPersonagem.ficha.vida?.max || 0}
                      </span>
                    </div>
                    <div className="statBarBg">
                      <div 
                        className="statBarFill"
                        style={{ 
                          width: `${Math.min(100, ((meuPersonagem.ficha.vida?.atual || 0) / (meuPersonagem.ficha.vida?.max || 1)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>

                  <div className="statBox mana">
                    <div className="statBoxHeader">
                      <span>✨ Mana</span>
                      <span className="statValue">
                        {meuPersonagem.ficha.mana?.atual || 0} / {meuPersonagem.ficha.mana?.max || 0}
                      </span>
                    </div>
                    <div className="statBarBg">
                      <div 
                        className="statBarFill"
                        style={{ 
                          width: `${Math.min(100, ((meuPersonagem.ficha.mana?.atual || 0) / (meuPersonagem.ficha.mana?.max || 1)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <button className="btnAbrirFicha" onClick={abrirMinhaFicha}>
                📋 Abrir Ficha Completa
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Outros Jogadores */}
      <div className="outrosJogadoresSection">
        <div className="sectionHeader">
          <h2>🎭 Outros Jogadores ({outrosJogadores.length})</h2>
        </div>

        {outrosJogadores.length === 0 ? (
          <div className="semOutrosJogadores">
            <p>Você é o único jogador nesta mesa por enquanto.</p>
          </div>
        ) : (
          <div className="outrosJogadoresGrid">
            {outrosJogadores.map((jogador) => (
              <div key={jogador.userId} className="outroJogadorCard">
                {!jogador.personagem ? (
                  <div className="jogadorAguardando">
                    <div className="avatarPlaceholder">👤</div>
                    <p>Aguardando personagem...</p>
                  </div>
                ) : (
                  <>
                    <div className="outroJogadorAvatar">
                      <img 
                        src={jogador.personagem.avatarUrl || `https://ui-avatars.com/api/?name=${jogador.personagem.nome[0]}&background=d6b35a&color=0a0a0a&size=120`}
                        alt={jogador.personagem.nome}
                      />
                    </div>
                    <div className="outroJogadorInfo">
                      <h4>{jogador.personagem.nome}</h4>
                      <p>{jogador.personagem.classe} • Nv {jogador.personagem.nivel}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="acoesSection">
        <button className="btnSair" onClick={handleSairCampanha}>
          🚪 Sair da Campanha
        </button>
      </div>
    </div>
  );
}