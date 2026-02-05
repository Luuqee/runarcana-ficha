// src/firebase/firestore.js
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
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

// ========== PERSONAGENS ==========

// Criar novo personagem
export const createPersonagem = async (userId, personagemData) => {
  try {
    const personagemId = `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const personagemRef = doc(db, 'personagens', personagemId);
    
    const data = {
      id: personagemId,
      userId,
      nome: personagemData.nome || 'Novo Personagem',
      classe: personagemData.classe || '',
      nivel: personagemData.nivel || 1,
      avatarUrl: personagemData.avatarUrl || null,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
      // Ficha completa (usando o defaultState que você já tem)
      ficha: personagemData.ficha || {},
    };
    
    await setDoc(personagemRef, data);
    return { success: true, id: personagemId };
  } catch (error) {
    console.error('Erro ao criar personagem:', error);
    return { success: false, error: error.message };
  }
};

// Buscar personagens do usuário
export const getPersonagens = async (userId) => {
  try {
    const personagensRef = collection(db, 'personagens');
    const q = query(
      personagensRef,
      where('userId', '==', userId),
      orderBy('criadoEm', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const personagens = [];
    
    snapshot.forEach((doc) => {
      personagens.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, personagens };
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    return { success: false, error: error.message, personagens: [] };
  }
};

// Buscar um personagem específico
export const getPersonagem = async (personagemId) => {
  try {
    const personagemRef = doc(db, 'personagens', personagemId);
    const personagemSnap = await getDoc(personagemRef);
    
    if (personagemSnap.exists()) {
      return { success: true, personagem: { id: personagemSnap.id, ...personagemSnap.data() } };
    } else {
      return { success: false, error: 'Personagem não encontrado' };
    }
  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
    return { success: false, error: error.message };
  }
};

// Atualizar personagem
export const updatePersonagem = async (personagemId, updates) => {
  try {
    const personagemRef = doc(db, 'personagens', personagemId);
    await updateDoc(personagemRef, {
      ...updates,
      atualizadoEm: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar personagem:', error);
    return { success: false, error: error.message };
  }
};

// Deletar personagem
export const deletePersonagem = async (personagemId) => {
  try {
    const personagemRef = doc(db, 'personagens', personagemId);
    await deleteDoc(personagemRef);
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar personagem:', error);
    return { success: false, error: error.message };
  }
};

// Atualizar apenas a ficha do personagem
export const updateFicha = async (personagemId, fichaData) => {
  try {
    const personagemRef = doc(db, 'personagens', personagemId);
    await updateDoc(personagemRef, {
      ficha: fichaData,
      atualizadoEm: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar ficha:', error);
    return { success: false, error: error.message };
  }
};