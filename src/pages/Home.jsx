// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/personagens');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="homePage">
      <div className="homeHero">
        <h1 className="homeTitle">
          🎲 FICHA DIGITAL<br />
          <span className="homeGold">RUNARCANA</span>
        </h1>
        
        <p className="homeSubtitle">
          Crie e gerencie personagens de Runarcana<br />
          Jogue online com seus amigos em tempo real
        </p>

        <button className="homeCta" onClick={handleGetStarted}>
          {isAuthenticated ? 'Meus Personagens' : 'Começar Agora'}
        </button>
      </div>

      <div className="homeFeatures">
        <div className="featureCard">
          <div className="featureIcon">📋</div>
          <h3>Fichas Completas</h3>
          <p>Todos os recursos de Runarcana em uma interface intuitiva</p>
        </div>

        <div className="featureCard">
          <div className="featureIcon">🎲</div>
          <h3>Campanhas Online</h3>
          <p>Jogue com amigos, mestre vê todas as fichas em tempo real</p>
        </div>

        <div className="featureCard">
          <div className="featureIcon">☁️</div>
          <h3>Salvo na Nuvem</h3>
          <p>Acesse suas fichas de qualquer dispositivo, nunca perca seus dados</p>
        </div>

        <div className="featureCard">
          <div className="featureIcon">👹</div>
          <h3>NPCs Completos</h3>
          <p>Mestres podem criar fichas completas de NPCs e monstros</p>
        </div>
      </div>
    </div>
  );
}