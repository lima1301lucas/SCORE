import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  return usuarioLogado ? children : <Navigate to="/" />;
}

export default PrivateRoute;