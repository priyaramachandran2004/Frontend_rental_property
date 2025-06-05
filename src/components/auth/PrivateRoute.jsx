import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, userType }) => {
  const isAuthenticated = userType === 'owner' 
    ? sessionStorage.getItem('ownerId')
    : sessionStorage.getItem('tenantId');

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default PrivateRoute;