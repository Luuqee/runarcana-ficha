// src/pages/Campanhas.jsx
import { useAuth } from '../contexts/AuthContext';

export default function Campanhas() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>🎲 Minhas Campanhas</h1>
      <p>Olá, {user?.displayName}!</p>
      <p style={{ marginTop: '30px', opacity: 0.7 }}>
        Esta página será implementada na próxima etapa.<br/>
        Aqui você poderá criar campanhas, entrar com código e ver suas mesas!
      </p>
    </div>
  );
}