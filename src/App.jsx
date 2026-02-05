// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Personagens from './pages/Personagens';
import Campanhas from './pages/Campanhas';
import FichaPersonagem from './pages/FichaPersonagem';
import './styles/base.css';

// Rota protegida (precisa estar logado)
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/personagens" 
          element={
            <ProtectedRoute>
              <Personagens />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/ficha/:id" 
          element={
            <ProtectedRoute>
              <FichaPersonagem />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/campanhas" 
          element={
            <ProtectedRoute>
              <Campanhas />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}