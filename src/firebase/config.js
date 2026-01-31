// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQW1E6Df_H_Y8K2Yxd3-WBS8ZMbER4Lz8",
  authDomain: "runarcana-fichas.firebaseapp.com",
  projectId: "runarcana-fichas",
  storageBucket: "runarcana-fichas.firebasestorage.app",
  messagingSenderId: "285246722024",
  appId: "1:285246722024:web:5681e226bf76cffcafde5d"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;