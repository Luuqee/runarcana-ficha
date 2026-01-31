// src/firebase/auth.js
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, googleProvider } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config';

// Login com Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Criar/atualizar perfil do usuário no Firestore
    await createUserProfile(user);
    
    return { success: true, user };
  } catch (error) {
    console.error('Erro no login com Google:', error);
    return { success: false, error: error.message };
  }
};

// Login com Email/Senha
export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Erro no login:', error);
    return { success: false, error: error.message };
  }
};

// Criar conta com Email/Senha
export const registerWithEmail = async (email, password, nome) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Criar perfil do usuário
    await createUserProfile(user, nome);
    
    return { success: true, user };
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    return { success: false, error: error.message };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return { success: false, error: error.message };
  }
};

// Criar/Atualizar perfil do usuário no Firestore
const createUserProfile = async (user, nomeCustom = null) => {
  const userRef = doc(db, 'usuarios', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    // Criar novo perfil
    await setDoc(userRef, {
      nome: nomeCustom || user.displayName || 'Usuário',
      email: user.email,
      avatar: user.photoURL || null,
      criadoEm: new Date().toISOString(),
      plano: 'free',
    });
  } else {
    // Atualizar última vez online
    await setDoc(userRef, {
      ultimoAcesso: new Date().toISOString(),
    }, { merge: true });
  }
};

// Observer de autenticação
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};