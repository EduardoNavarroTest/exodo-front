import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, prueba } = useContext(AuthContext);
  console.log(isAuthenticated, loading, prueba);

  console.log(isAuthenticated);
  console.log(loading);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
