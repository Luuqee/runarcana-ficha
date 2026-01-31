// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle, loginWithEmail, registerWithEmail } from '../firebase/auth';
import '../styles/auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const result = await loginWithGoogle();
    
    if (result.success) {
      navigate('/personagens');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let result;
    if (isRegister) {
      if (!nome.trim()) {
        setError('Por favor, insira seu nome');
        setLoading(false);
        return;
      }
      result = await registerWithEmail(email, password, nome);
    } else {
      result = await loginWithEmail(email, password);
    }

    if (result.success) {
      navigate('/personagens');
    } else {
      setError(getErrorMessage(result.error));
    }
    setLoading(false);
  };

  const getErrorMessage = (error) => {
    if (error.includes('user-not-found')) return 'Usuário não encontrado';
    if (error.includes('wrong-password')) return 'Senha incorreta';
    if (error.includes('email-already-in-use')) return 'Email já cadastrado';
    if (error.includes('weak-password')) return 'Senha muito fraca (mínimo 6 caracteres)';
    if (error.includes('invalid-email')) return 'Email inválido';
    return 'Erro ao fazer login. Tente novamente.';
  };

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h1 className="loginTitle">
          🎲 RUNARCANA
        </h1>
        
        <h2 className="loginSubtitle">
          {isRegister ? 'Criar Conta' : 'Entrar'}
        </h2>

        <button 
          className="googleBtn" 
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <span className="googleIcon">🔵</span>
          Entrar com Google
        </button>

        <div className="divider">
          <span>ou</span>
        </div>

        <form onSubmit={handleEmailAuth} className="loginForm">
          {isRegister && (
            <div className="formGroup">
              <label>Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                required
              />
            </div>
          )}

          <div className="formGroup">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="formGroup">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="errorMsg">{error}</div>}

          <button 
            type="submit" 
            className="submitBtn"
            disabled={loading}
          >
            {loading ? 'Carregando...' : (isRegister ? 'Criar Conta' : 'Entrar')}
          </button>
        </form>

        <div className="toggleMode">
          {isRegister ? 'Já tem conta?' : 'Não tem conta?'}
          {' '}
          <button 
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="toggleBtn"
          >
            {isRegister ? 'Entrar' : 'Criar Conta Grátis'}
          </button>
        </div>
      </div>
    </div>
  );
}