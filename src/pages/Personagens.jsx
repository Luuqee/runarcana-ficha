// src/pages/Personagens.jsx
import { useAuth } from '../contexts/AuthContext';

export default function Personagens() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>📋 Meus Personagens</h1>
      <p>Olá, {user?.displayName}!</p>
      <p style={{ marginTop: '30px', opacity: 0.7 }}>
        Esta página será implementada na próxima etapa.<br/>
        Aqui você verá todos os seus personagens e poderá criar novos!
      </p>
    </div>
  );
}