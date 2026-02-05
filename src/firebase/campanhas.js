// src/firebase/campanhas.js
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

// Gera código único de 6 caracteres (ex: DRAG-2025)
function gerarCodigoCampanha() {
  const prefixos = ['DRAG', 'HERO', 'ARCA', 'RUNE', 'EPIC', 'MYTH', 'SAGE', 'STAR'];
  const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
  const ano = new Date().getFullYear();
  return `${prefixo}-${ano}`;
}

// Verifica se código já existe
async function codigoExiste(codigo) {
  const campanhasRef = collection(db, 'campanhas');
  const q = query(campanhasRef, where('codigo', '==', codigo));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// Gera código único (garante que não existe)
async function gerarCodigoUnico() {
  let codigo = gerarCodigoCampanha();
  let tentativas = 0;
  
  while (await codigoExiste(codigo) && tentativas < 10) {
    codigo = gerarCodigoCampanha();
    tentativas++;
  }
  
  return codigo;
}

// ========== CAMPANHAS ==========

// Criar nova campanha (Mestre)
export const criarCampanha = async (mestreId, mestreNome, dados) => {
  try {
    const codigo = await gerarCodigoUnico();
    const campanhaId = `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const campanhaRef = doc(db, 'campanhas', campanhaId);
    
    const data = {
      id: campanhaId,
      codigo,
      nome: dados.nome || 'Nova Campanha',
      descricao: dados.descricao || '',
      mestreId,
      mestreNome,
      status: 'ativa',
      criadaEm: serverTimestamp(),
      atualizadaEm: serverTimestamp(),
    };
    
    await setDoc(campanhaRef, data);
    
    // Adiciona mestre como membro
    const membroRef = doc(db, `campanhas/${campanhaId}/membros`, mestreId);
    await setDoc(membroRef, {
      role: 'mestre',
      entradaEm: serverTimestamp(),
      ultimoAcesso: serverTimestamp(),
    });
    
    return { success: true, campanha: { ...data, codigo } };
  } catch (error) {
    console.error('Erro ao criar campanha:', error);
    return { success: false, error: error.message };
  }
};

// Buscar campanha por código
export const buscarCampanhaPorCodigo = async (codigo) => {
  try {
    const campanhasRef = collection(db, 'campanhas');
    const q = query(campanhasRef, where('codigo', '==', codigo.toUpperCase()));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { success: false, error: 'Campanha não encontrada' };
    }
    
    const doc = snapshot.docs[0];
    return { success: true, campanha: { id: doc.id, ...doc.data() } };
  } catch (error) {
    console.error('Erro ao buscar campanha:', error);
    return { success: false, error: error.message };
  }
};

// Entrar em campanha (Jogador)
export const entrarNaCampanha = async (campanhaId, userId, userName, personagemId) => {
  try {
    const membroRef = doc(db, `campanhas/${campanhaId}/membros`, userId);
    
    await setDoc(membroRef, {
      role: 'jogador',
      personagemId,
      entradaEm: serverTimestamp(),
      ultimoAcesso: serverTimestamp(),
    });
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao entrar na campanha:', error);
    return { success: false, error: error.message };
  }
};

// Buscar campanhas do usuário (mestre ou jogador)
export const getCampanhasDoUsuario = async (userId) => {
  try {
    // Busca campanhas onde é mestre
    const campanhasRef = collection(db, 'campanhas');
    const qMestre = query(campanhasRef, where('mestreId', '==', userId));
    const snapshotMestre = await getDocs(qMestre);
    
    const campanhasMestre = [];
    snapshotMestre.forEach((doc) => {
      campanhasMestre.push({ id: doc.id, ...doc.data(), euSouMestre: true });
    });
    
    // Busca campanhas onde é jogador
    const campanhasJogador = [];
    const todasCampanhas = await getDocs(campanhasRef);
    
    for (const campanhaDoc of todasCampanhas.docs) {
      const membroRef = doc(db, `campanhas/${campanhaDoc.id}/membros`, userId);
      const membroSnap = await getDoc(membroRef);
      
      if (membroSnap.exists() && membroSnap.data().role === 'jogador') {
        campanhasJogador.push({
          id: campanhaDoc.id,
          ...campanhaDoc.data(),
          euSouMestre: false,
          meuPersonagemId: membroSnap.data().personagemId,
        });
      }
    }
    
    return {
      success: true,
      campanhas: [...campanhasMestre, ...campanhasJogador],
    };
  } catch (error) {
    console.error('Erro ao buscar campanhas:', error);
    return { success: false, error: error.message, campanhas: [] };
  }
};

// Buscar membros da campanha
export const getMembrosCampanha = async (campanhaId) => {
  try {
    const membrosRef = collection(db, `campanhas/${campanhaId}/membros`);
    const snapshot = await getDocs(membrosRef);
    
    const membros = [];
    snapshot.forEach((doc) => {
      membros.push({ userId: doc.id, ...doc.data() });
    });
    
    return { success: true, membros };
  } catch (error) {
    console.error('Erro ao buscar membros:', error);
    return { success: false, error: error.message, membros: [] };
  }
};

// Listener em tempo real para membros da campanha
export const listenMembrosCampanha = (campanhaId, callback) => {
  const membrosRef = collection(db, `campanhas/${campanhaId}/membros`);
  
  return onSnapshot(membrosRef, (snapshot) => {
    const membros = [];
    snapshot.forEach((doc) => {
      membros.push({ userId: doc.id, ...doc.data() });
    });
    callback(membros);
  });
};

// Sair da campanha
export const sairDaCampanha = async (campanhaId, userId) => {
  try {
    const membroRef = doc(db, `campanhas/${campanhaId}/membros`, userId);
    await deleteDoc(membroRef);
    return { success: true };
  } catch (error) {
    console.error('Erro ao sair da campanha:', error);
    return { success: false, error: error.message };
  }
};

// Deletar campanha (apenas mestre)
export const deletarCampanha = async (campanhaId) => {
  try {
    // TODO: Deletar subcoleções (membros, npcs, etc)
    const campanhaRef = doc(db, 'campanhas', campanhaId);
    await deleteDoc(campanhaRef);
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar campanha:', error);
    return { success: false, error: error.message };
  }
};

// Atualizar campanha
export const atualizarCampanha = async (campanhaId, updates) => {
  try {
    const campanhaRef = doc(db, 'campanhas', campanhaId);
    await updateDoc(campanhaRef, {
      ...updates,
      atualizadaEm: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar campanha:', error);
    return { success: false, error: error.message };
  }
};