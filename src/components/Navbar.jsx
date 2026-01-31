// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../firebase/auth';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navContent">
        <Link to="/" className="navLogo">
          🎲 RUNARCANA
        </Link>

        <div className="navLinks">
          {isAuthenticated ? (
            <>
              <Link to="/personagens" className="navLink">
                Personagens
              </Link>
              <Link to="/campanhas" className="navLink">
                Campanhas
              </Link>
              
              <div className="navUser">
                <img 
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=d6b35a&color=0a0a0a`} 
                  alt="Avatar"
                  className="navAvatar"
                />
                <span className="navUsername">{user?.displayName || 'Usuário'}</span>
                <button onClick={handleLogout} className="navLogout">
                  Sair
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="navLoginBtn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}