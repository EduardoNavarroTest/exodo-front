import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ component: Component }) => {
  const { authenticated } = useAuth();

  console.log(authenticated);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Component />;
};

export default ProtectedRoute;
